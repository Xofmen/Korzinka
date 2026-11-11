// Корзинка: сервер без внешних зависимостей. Запуск: ADMIN_PASSWORD=... node server.js
const http=require('http'),fs=require('fs'),path=require('path'),zlib=require('zlib'),crypto=require('crypto');
const PORT=process.env.PORT||3000,DATA=process.env.DATA_DIR||path.join(__dirname,'data'),PASS=process.env.ADMIN_PASSWORD||'',ADMIN=process.env.ADMIN_PATH||'/admin',PUB=path.join(__dirname,'public');
const FILE=path.join(DATA,'catalog.json'),MAXP=1e6;
fs.mkdirSync(DATA,{recursive:true});
const clean=s=>String(s).normalize('NFKC').replace(/[\u200b-\u200f\u2060\ufe0f\ufeff]/g,'').replace(/\s+/g,' ').trim();
const key=s=>clean(s).toLowerCase(),idOf=k=>crypto.createHash('sha1').update(k).digest('base64url').slice(0,8),okP=p=>p>0&&p<MAXP;
let db,cache=null,pending=null;
function load(){
 if(fs.existsSync(FILE))return JSON.parse(fs.readFileSync(FILE,'utf8'));
 const seed=JSON.parse(fs.readFileSync(path.join(__dirname,'seed','catalog.json'),'utf8')),items={};
 for(const [n,p] of seed.items){const k=key(n),id=idOf(k);if(items[id]&&!okP(p))continue;items[id]={n:clean(n),p:okP(p)?p:0,h:okP(p)?[[seed.date,p]]:[]}}
 return {date:seed.date,updated:Date.now(),items,log:[]};
}
function save(){fs.writeFileSync(FILE+'.tmp',JSON.stringify(db));fs.renameSync(FILE+'.tmp',FILE);cache=null}
function payload(){
 if(cache)return cache;
 const items=Object.entries(db.items).filter(([,v])=>!v.x).map(([id,v])=>v.h&&v.h.length>1?[id,v.n,v.p,v.h]:[id,v.n,v.p]);
 const raw=Buffer.from(JSON.stringify({date:db.date,updated:db.updated,items}));
 return cache={raw,gz:zlib.gzipSync(raw),etag:'"'+db.updated+'"'};
}
// ---- чтение xlsx без библиотек (zip + xml) ----
function unzip(buf){
 let e=buf.length-22;while(e>=0&&buf.readUInt32LE(e)!==0x06054b50)e--;
 if(e<0)throw new Error('Это не файл .xlsx');
 let n=buf.readUInt16LE(e+10),o=buf.readUInt32LE(e+16);const out={};
 for(let i=0;i<n;i++){
  const m=buf.readUInt16LE(o+10),cs=buf.readUInt32LE(o+20),nl=buf.readUInt16LE(o+28),xl=buf.readUInt16LE(o+30),cl=buf.readUInt16LE(o+32),lo=buf.readUInt32LE(o+42),name=buf.toString('utf8',o+46,o+46+nl);
  o+=46+nl+xl+cl;const s=lo+30+buf.readUInt16LE(lo+26)+buf.readUInt16LE(lo+28),d=buf.subarray(s,s+cs);
  out[name]=()=>m===8?zlib.inflateRawSync(d):d;
 }
 return out;
}
const un=s=>s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&#(\d+);/g,(_,d)=>String.fromCharCode(d)).replace(/&amp;/g,'&');
const tt=b=>un([...b.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map(x=>x[1]).join(''));
function xlsx(buf){
 const z=unzip(buf),get=n=>z[n]?z[n]().toString('utf8'):'';
 const ss=[...get('xl/sharedStrings.xml').matchAll(/<si>([\s\S]*?)<\/si>/g)].map(m=>tt(m[1]));
 const sheet=Object.keys(z).filter(k=>/^xl\/worksheets\/sheet\d+\.xml$/.test(k)).sort()[0];
 const rows=[];
 for(const m of get(sheet).matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)){
  const r=[];
  for(const c of m[1].matchAll(/<c ([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)){
   const at=c[1],b=c[2]||'',col=(at.match(/r="([A-Z]+)/)||[])[1]||'A',t=(at.match(/t="(\w+)"/)||[])[1];
   let ci=0;for(const ch of col)ci=ci*26+ch.charCodeAt(0)-64;
   let v=(b.match(/<v>([\s\S]*?)<\/v>/)||[])[1];
   if(t==='s')v=ss[+v];else if(t==='inlineStr')v=tt(b);else if(v!==undefined&&t==='str')v=un(v);
   r[ci-1]=v;
  }
  rows.push(r);
 }
 return rows;
}
function rowsFrom(buf){
 const grid=buf.subarray(0,2).toString()==='PK'?xlsx(buf):buf.toString('utf8').split(/\r?\n/).map(l=>l.split(/[;\t]/)),out=[];
 for(const r of grid){
  let n,p;
  for(const c of r){
   if(c==null||c==='')continue;const t=String(c).trim(),num=Number(t.replace(/[\s\u00a0]/g,'').replace(',','.'));
   if(isNaN(num)){if(n===undefined)n=t}else if(p===undefined)p=num;
  }
  if(n&&p!==undefined)out.push({n,p:Math.round(p)});
 }
 return out;
}
// ---- слияние: есть — обновить цену, нет — добавить ----
function merge(rows,date,hide){
 const s={total:rows.length,added:0,changed:0,same:0,bad:0,missing:0,addedS:[],changedS:[]},next=JSON.parse(JSON.stringify(db.items)),seen=new Set();
 for(const r of rows){
  const n=clean(r.n),k=key(n);if(!k)continue;
  const id=idOf(k),cur=next[id],p=r.p;seen.add(id);
  if(!okP(p)){s.bad++;if(!cur){next[id]={n,p:0,h:[]};s.added++}continue}
  if(!cur){next[id]={n,p,h:[[date,p]]};s.added++;if(s.addedS.length<25)s.addedS.push([n,p])}
  else if(cur.p!==p){s.changed++;if(s.changedS.length<40)s.changedS.push([cur.n,cur.p,p]);cur.h=(cur.h||[]).concat([[date,p]]).slice(-30);cur.p=p;delete cur.x}
  else{s.same++;delete cur.x}
 }
 for(const id in next)if(!seen.has(id)){s.missing++;if(hide)next[id].x=1}
 return {s,next};
}
// ---- админ-доступ ----
const secret=crypto.createHash('sha256').update('kz|'+PASS).digest(),sign=e=>crypto.createHmac('sha256',secret).update(String(e)).digest('base64url');
const auth=req=>{const [e,s]=(req.headers.authorization||'').slice(7).split('.');return !!(PASS&&e&&s&&+e>Date.now()&&s.length===sign(e).length&&crypto.timingSafeEqual(Buffer.from(s),Buffer.from(sign(e))))};
const fails={},send=(res,c,o)=>{res.writeHead(c,{'content-type':'application/json'});res.end(JSON.stringify(o))};
const body=(req,max=25e6)=>new Promise((ok,no)=>{const a=[];let n=0;req.on('data',c=>{n+=c.length;if(n>max){no(new Error('Файл слишком большой'));req.destroy()}else a.push(c)});req.on('end',()=>ok(Buffer.concat(a)))});
const mime={'.html':'text/html;charset=utf-8','.js':'text/javascript;charset=utf-8','.css':'text/css;charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.webmanifest':'application/manifest+json','.png':'image/png'};
function serve(res,f,nocache){
 if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);return res.end('Not found')}
 const x=path.extname(f);res.writeHead(200,{'content-type':mime[x]||'application/octet-stream','cache-control':nocache||x==='.html'?'no-cache':'public,max-age=3600'});fs.createReadStream(f).pipe(res);
}
db=load();if(!fs.existsSync(FILE))save();
http.createServer(async(req,res)=>{try{
 const u=new URL(req.url,'http://x'),p=u.pathname;
 if(p==='/api/catalog'){
  const c=payload();if(req.headers['if-none-match']===c.etag){res.writeHead(304);return res.end()}
  const gz=/gzip/.test(req.headers['accept-encoding']||'');
  res.writeHead(200,{'content-type':'application/json','etag':c.etag,'cache-control':'no-cache',...(gz?{'content-encoding':'gzip'}:{})});return res.end(gz?c.gz:c.raw);
 }
 if(p==='/api/login'&&req.method==='POST'){
  const ip=req.socket.remoteAddress,f=fails[ip]||(fails[ip]={n:0,t:Date.now()});
  if(Date.now()-f.t>6e4){f.n=0;f.t=Date.now()}
  if(f.n>=5)return send(res,429,{error:'Слишком много попыток. Подождите минуту.'});
  let pw;try{pw=JSON.parse((await body(req,1e4)).toString()).password}catch(e){}
  if(PASS&&pw===PASS){const e=Date.now()+12*36e5;return send(res,200,{token:e+'.'+sign(e)})}
  f.n++;return send(res,401,{error:PASS?'Неверный пароль':'На сервере не задан ADMIN_PASSWORD'});
 }
 if(p.startsWith('/api/admin/')){
  if(!auth(req))return send(res,401,{error:'auth'});
  if(p==='/api/admin/status')return send(res,200,{date:db.date,count:Object.keys(db.items).length,log:db.log.slice(-10).reverse()});
  if(p==='/api/admin/backup'){res.writeHead(200,{'content-type':'application/json','content-disposition':'attachment; filename=catalog-backup.json'});return res.end(JSON.stringify(db))}
  if(p==='/api/admin/preview'&&req.method==='POST'){
   const rows=rowsFrom(await body(req));if(!rows.length)return send(res,400,{error:'В файле нет строк «название + цена»'});
   const date=u.searchParams.get('date')||new Date().toISOString().slice(0,10),{s,next}=merge(rows,date,u.searchParams.get('hide')==='1');
   pending={next,date,s,t:Date.now()};return send(res,200,s);
  }
  if(p==='/api/admin/apply'&&req.method==='POST'){
   if(!pending||Date.now()-pending.t>36e5)return send(res,400,{error:'Загрузите файл заново'});
   const {total,added,changed,missing}=pending.s;
   db.items=pending.next;db.date=pending.date;db.updated=Date.now();db.log=(db.log||[]).concat({at:new Date().toISOString(),date:pending.date,total,added,changed,missing}).slice(-50);
   pending=null;save();return send(res,200,{ok:true});
  }
  return send(res,404,{error:'not found'});
 }
 if(p===ADMIN||p===ADMIN+'/')return serve(res,path.join(__dirname,'private','admin.html'),true);
 const rel=path.normalize(p==='/'?'index.html':p.slice(1)),f=path.join(PUB,rel);
 if(!f.startsWith(PUB))return send(res,403,{error:'no'});
 serve(res,f,rel==='sw.js');
}catch(e){send(res,500,{error:String(e.message||e)})}}).listen(PORT,()=>console.log('Корзинка: http://localhost:'+PORT+(PASS?'  админка: '+ADMIN:'  ВНИМАНИЕ: ADMIN_PASSWORD не задан')));

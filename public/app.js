(()=>{
const $=s=>document.querySelector(s),C=window.Core;
const CATS=[['dairy','Молочное и яйца','Sut mahsulotlari'],['bread','Хлеб и выпечка','Non va pishiriq'],['meat','Мясо и птица','Go‘sht va parranda'],['deli','Колбасы','Kolbasa mahsulotlari'],['fish','Рыба','Baliq'],['veg','Овощи и фрукты','Sabzavot va mevalar'],['grocery','Бакалея','Oziq-ovqat'],['sauce','Соусы и консервы','Sous va konserva'],['sweet','Сладости и снеки','Shirinlik va sneklar'],['tea','Чай и кофе','Choy va qahva'],['drink','Напитки','Ichimliklar'],['frozen','Заморозка и мороженое','Muzlatilgan'],['home','Для дома','Uy uchun'],['care','Гигиена и уход','Gigiena va parvarish'],['baby','Детям','Bolalar uchun'],['pet','Животным','Hayvonlar uchun'],['other','Другое','Boshqa']];
const CK={};CATS.forEach((c,i)=>CK[c[0]]=i);
const I={dairy:'<path d="M8 3h8l1 4v13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V7z"/><path d="M7 7h10M10 12h4"/>',bread:'<path d="M5 11c0-3 3-6 7-6s7 3 7 6c0 1-.6 1.700-1.500 2V19h-11v-6C5.600 12.700 5 12 5 11z"/><path d="M9 10l1 2M13 9l1 2"/>',meat:'<path d="M15 4a5 5 0 0 1 3 8l-4 4-6-6 4-4a5 5 0 0 1 3-2z"/><path d="M10 15l-4 4M6 14l4 4"/>',deli:'<rect x="2.500" y="9" width="19" height="6" rx="3" transform="rotate(-30 12 12)"/><path d="M9 7.500l2 4M13 6l2 4"/>',fish:'<path d="M3 12c3-5 9-6 13-3l5-3v12l-5-3c-4 3-10 2-13-3z"/><circle cx="8" cy="11" r=".8"/>',veg:'<path d="M16 8L5 19c-1 1 3 1.500 6 0s6-5 5-11z"/><path d="M16 8c0-2 1-4 3-4M16 8c2 0 4-1 4-3"/>',grocery:'<path d="M7 6h10l1 3v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9z"/><path d="M7 6V4h10v2M9 13h6"/>',sauce:'<path d="M10 3h4v4l2 3v10a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V10l2-3z"/><path d="M8 13h8"/>',sweet:'<circle cx="12" cy="12" r="4"/><path d="M8 12l-5-3v6zM16 12l5-3v6z"/>',tea:'<path d="M5 9h12v5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z"/><path d="M17 10h2a2 2 0 0 1 0 5h-2M8 3c0 1.500 1 1.500 1 3M12 3c0 1.500 1 1.500 1 3"/>',drink:'<path d="M7 8h10l-1 12H8z"/><path d="M6 8h12M13 8l2-5h3"/>',frozen:'<path d="M12 3v18M4.200 7.500l15.600 9M19.800 7.500l-15.600 9"/>',home:'<path d="M8 11h6v10H8zM9 11V7h4v4M13 7h4"/><path d="M19 5h.01M19 8h.01"/>',care:'<path d="M12 3s6 6.500 6 11a6 6 0 0 1-12 0c0-4.500 6-11 6-11z"/>',baby:'<path d="M9 4h6v3H9zM8 7h8l1 4v9H7v-9z"/><path d="M7 14h10"/>',pet:'<circle cx="7" cy="10" r="1.600"/><circle cx="11" cy="6.500" r="1.600"/><circle cx="16" cy="7.500" r="1.600"/><circle cx="18.500" cy="12" r="1.600"/><path d="M8 18c0-3 2-5 4-5s5 2 5 5c0 2-2 2-4 1.500-1-.3-2-.3-3 0C9.500 20 8 20 8 18z"/>',other:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.500" cy="8.500" r="1"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.500-3.500"/>',cart:'<path d="M4 5h2l2 10h9l2-7H7"/><circle cx="9" cy="19" r="1.200"/><circle cx="17" cy="19" r="1.200"/>',hist:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',plus:'<path d="M12 5v14M5 12h14"/>',check:'<path d="m5 12 5 5 9-10"/>',star:'<path d="m12 3 2.700 5.600 6.100.8-4.500 4.200 1.100 6.100-5.400-3-5.400 3 1.100-6.100L3.200 9.400l6.100-.8z"/>',trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',swap:'<path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>',share:'<circle cx="6" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="m8 11 8-4M8 13l8 4"/>',house:'<path d="m4 11 8-7 8 7v9H4z"/>',bag:'<path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2"/>',back:'<path d="m15 5-7 7 7 7"/>'};
const ic=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${I[n]}</svg>`;
const T={ru:{search:'Поиск',list:'Список',hist:'История',ph:'Что ищете? кофе, coffee, qahva…',pop:'Часто ищут',cats:'Категории',favs:'Избранное',nores:'Ничего не найдено. Попробуйте другое слово.',budget:'Бюджет',left:'Осталось',over:'Превышение',home:'Дома',shop:'В магазине',total:'Итого',incart:'В корзине',empty:'Список пуст. Найдите товары через поиск.',clear:'Очистить',done:'Завершить поход',share:'Поделиться',cheaper:'Дешевле',noprice:'цена по весу',upd:'Цены от',off:'Офлайн',trips:'Походы',repeat:'Повторить',often:'Покупаете часто',spent:'Траты за месяц',nohist:'Завершите первый поход, и он появится здесь.',more:'Показать ещё',rel:'Подходящие',lo:'Дешевле',hi:'Дороже',unit:'Выгоднее за ед.',sum:'сум',down:'подешевело',up:'подорожало',items:'поз.',copied:'Скопировано',ld:'Загрузка цен…',err:'Не удалось загрузить цены',saved:'Поход сохранён',swapped:'Заменено',pop2:['молоко','хлеб','масло','сахар','яйца','чай','кофе','сыр','вода','курица'],l:'л',kg:'кг',pc:'шт'},
uz:{search:'Qidiruv',list:'Ro‘yxat',hist:'Tarix',ph:'Nima qidiryapsiz? qahva, кофе, coffee…',pop:'Ko‘p qidiriladi',cats:'Toifalar',favs:'Sevimlilar',nores:'Hech narsa topilmadi. Boshqa so‘z yozing.',budget:'Byudjet',left:'Qoldi',over:'Oshib ketdi',home:'Uyda',shop:'Do‘konda',total:'Jami',incart:'Savatda',empty:'Ro‘yxat bo‘sh. Qidiruv orqali mahsulot qo‘shing.',clear:'Tozalash',done:'Xaridni yakunlash',share:'Ulashish',cheaper:'Arzonroq',noprice:'narx tarozida',upd:'Narxlar:',off:'Oflayn',trips:'Xaridlar',repeat:'Takrorlash',often:'Tez-tez olasiz',spent:'Oylik xarajat',nohist:'Birinchi xaridni yakunlang — shu yerda ko‘rinadi.',more:'Yana ko‘rsatish',rel:'Mos',lo:'Arzonroq',hi:'Qimmatroq',unit:'Birligi arzon',sum:'so‘m',down:'arzonladi',up:'qimmatlashdi',items:'ta',copied:'Nusxalandi',ld:'Narxlar yuklanmoqda…',err:'Narxlarni yuklab bo‘lmadi',saved:'Xarid saqlandi',swapped:'Almashtirildi',pop2:['sut','non','moy','shakar','tuxum','choy','qahva','pishloq','suv','tovuq'],l:'l',kg:'kg',pc:'dona'}};
let S={lang:'ru',list:{},favs:[],trips:[],budget:0};
try{Object.assign(S,JSON.parse(localStorage.getItem('kz')||'{}'))}catch(e){}
Object.assign(S,{tab:'search',mode:'home',q:'',cat:null,sort:'rel',alt:null,lim:60});
const save=()=>{try{localStorage.setItem('kz',JSON.stringify({lang:S.lang,list:S.list,favs:S.favs,trips:S.trips,budget:S.budget}))}catch(e){}};
const t=k=>T[S.lang][k],cn=k=>CATS[CK[k]][S.lang==='ru'?1:2];
const fmt=n=>Math.round(n).toLocaleString('ru-RU').replace(/\u00a0/g,' '),esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
let D=null,B={},err=false;
const cur=id=>B[id]?B[id].p:(S.list[id]||{}).p0||0;
const toast=m=>{const e=$('#toast');e.textContent=m;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),1600)};
const lt=()=>Object.entries(S.list).reduce((a,[id,v])=>a+v.q*cur(id),0),dn=()=>Object.entries(S.list).reduce((a,[id,v])=>a+(v.d?v.q*cur(id):0),0),cnt=()=>Object.keys(S.list).length;
const chg=x=>{if(!x.h||x.h.length<2)return'';const d=x.p-x.h[x.h.length-2][1];return d?`<span class="bd ${d<0?'dn':'up'}">${d<0?'↓':'↑'} ${fmt(Math.abs(d))}</span>`:''};
function card(x){
 const q=(S.list[x.id]||{}).q||0,fav=S.favs.includes(x.id);
 return `<div class="card" data-id="${x.id}"><span class="ico">${ic(x.cat)}</span><div class="mid"><b>${esc(x.n)}</b><small>${x.u?`1 ${t(x.u.u)}: ${fmt(x.u.pp)} `:''}${chg(x)}</small></div><div class="pr">${x.p?fmt(x.p)+`<i>${t('sum')}</i>`:`<i>${t('noprice')}</i>`}</div><button data-a="fav" class="${fav?'on':''}">${ic('star')}</button>${q?`<div class="step"><button data-a="dec">−</button><span>${q}</span><button data-a="inc">+</button></div>`:`<button class="add" data-a="inc">${ic('plus')}</button>`}</div>`;
}
function resHTML(){
 if(!D)return`<div class="empty">${ic('cart')}<div>${err?t('err'):t('ld')}</div></div>`;
 let r=null;
 if(S.q.trim())r=C.search(S.q);else if(S.cat)r=C.all().filter(x=>x.cat===S.cat).sort((a,b)=>a.n.localeCompare(b.n,'ru'));
 if(!r){
  const fv=S.favs.map(i=>B[i]).filter(Boolean);
  return `<h3>${t('cats')}</h3><div class="cats">${CATS.slice(0,-1).map(c=>`<button class="cat glass" data-a="cat" data-c="${c[0]}">${ic(c[0])}${cn(c[0])}</button>`).join('')}</div><h3>${t('pop')}</h3><div class="chips">${t('pop2').map(w=>`<button class="chip glass" data-a="q" data-w="${w}">${w}</button>`).join('')}</div>${fv.length?`<h3>${t('favs')}</h3>${fv.map(card).join('')}`:''}`;
 }
 r=C.sortRes(r,S.sort);
 const head=S.cat&&!S.q.trim()?`<div class="acts"><button class="btn g" data-a="cat" data-c="">${ic('back')}${cn(S.cat)}</button></div>`:'';
 const seg=`<div class="seg">${['rel','lo','hi','unit'].map(k=>`<button data-a="sort" data-k="${k}" class="${S.sort===k?'on':''}">${t(k)}</button>`).join('')}</div>`;
 if(!r.length)return head+`<div class="empty">${ic('search')}<div>${t('nores')}</div></div>`;
 return head+seg+r.slice(0,S.lim).map(card).join('')+(r.length>S.lim?`<div class="acts"><button class="btn g" data-a="more">${t('more')} (${r.length-S.lim})</button></div>`:'');
}
function listHTML(){
 const ids=Object.keys(S.list);
 if(!ids.length)return`<div class="empty">${ic('cart')}<div>${t('empty')}</div></div>`;
 const tot=lt(),b=+S.budget||0,pct=b?Math.min(100,tot/b*100):0;
 const groups={};ids.forEach(id=>{const k=B[id]?B[id].cat:'other';(groups[k]=groups[k]||[]).push(id)});
 const shop=S.mode==='shop';
 let h=`<div class="seg"><button data-a="mode" data-m="home" class="${!shop?'on':''}">${t('home')}</button><button data-a="mode" data-m="shop" class="${shop?'on':''}">${t('shop')}</button></div>
 <div class="sum"><div class="row2"><div><small>${shop?t('incart'):t('total')}</small><div class="big">${fmt(shop?dn():tot)} <i>${t('sum')}</i></div>${shop?`<small>${t('total')}: ${fmt(tot)}</small>`:''}</div>
 <label class="bud">${t('budget')}<input id="bud" type="number" inputmode="numeric" value="${b||''}" placeholder="0"></label></div>
 ${b?`<div class="bar ${tot>b?'over':''}"><div style="width:${pct}%"></div></div><small>${tot>b?t('over')+': '+fmt(tot-b):t('left')+': '+fmt(b-tot)}</small>`:''}</div><div class="${shop?'shop':''}">`;
 CATS.forEach(c=>{if(!groups[c[0]])return;h+=`<h3>${cn(c[0])}</h3>`;
  groups[c[0]].forEach(id=>{const v=S.list[id],x=B[id],p=cur(id),d=x&&v.p0&&x.p&&x.p!==v.p0?x.p-v.p0:0;
   h+=`<div class="lrow ${v.d?'done':''}" data-id="${id}"><button data-a="chk" class="ck ${v.d?'on':''}">${v.d?ic('check'):''}</button><div class="mid"><b>${esc(x?x.n:v.n)}</b><small>${fmt(p)} × ${v.q} = ${fmt(p*v.q)} ${d?`<span class="bd ${d<0?'dn':'up'}">${d<0?t('down'):t('up')} ${fmt(Math.abs(d))}</span>`:''}</small></div>
   ${shop?`<div class="pr">×${v.q}</div>`:`<button data-a="alt" title="${t('cheaper')}">${ic('swap')}</button><div class="step"><button data-a="dec">−</button><span>${v.q}</span><button data-a="inc">+</button></div>`}</div>`;
   if(S.alt===id&&x)h+=`<div class="alt">${alts(x).map(a=>`<div class="card" data-id="${a.id}"><div class="mid"><b>${esc(a.n)}</b><small>${a.u?`1 ${t(a.u.u)}: ${fmt(a.u.pp)}`:''}</small></div><div class="pr">${fmt(a.p)}</div><button class="add" data-a="swap" data-from="${id}">${ic('swap')}</button></div>`).join('')||`<small>—</small>`}</div>`;
  })});
 return h+`</div><div class="acts"><button class="btn" data-a="finish">${ic('bag')}${t('done')}</button><button class="btn g" data-a="share">${ic('share')}${t('share')}</button><button class="btn g" data-a="clear">${ic('trash')}${t('clear')}</button></div>`;
}
function alts(x){
 if(x.main<0||!x.p)return[];const m=x.u?v=>v.u&&v.u.u===x.u.u?v.u.pp:Infinity:v=>v.p,me=m(x);
 return C.all().filter(v=>v.id!==x.id&&v.main===x.main&&v.p>0&&m(v)<me).sort((a,b)=>m(a)-m(b)).slice(0,3);
}
function histHTML(){
 const tr=S.trips;if(!tr.length)return`<div class="empty">${ic('hist')}<div>${t('nohist')}</div></div>`;
 const now=new Date(),mo={},fq={};
 tr.forEach(r=>{const d=new Date(r.t);r.items.forEach(i=>{fq[i.id]=(fq[i.id]||{n:i.n,c:0,id:i.id});fq[i.id].c++;if(d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear()){const k=B[i.id]?B[i.id].cat:'other';mo[k]=(mo[k]||0)+i.p*i.q}})});
 const mx=Math.max(1,...Object.values(mo)),top=Object.values(fq).sort((a,b)=>b.c-a.c).slice(0,8);
 return `<h3>${t('spent')}</h3><div class="panel bars">${Object.entries(mo).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<div><em>${cn(k)}</em><span style="width:${v/mx*100}px;max-width:45%"></span><b>${fmt(v)}</b></div>`).join('')||'—'}</div>
 <h3>${t('often')}</h3>${top.map(f=>`<div class="card" data-id="${f.id}"><div class="mid"><b>${esc(f.n)}</b><small>×${f.c}</small></div><button class="add" data-a="inc">${ic('plus')}</button></div>`).join('')}
 <h3>${t('trips')}</h3>${tr.slice().reverse().slice(0,15).map((r,i)=>`<div class="card"><span class="ico">${ic('bag')}</span><div class="mid"><b>${new Date(r.t).toLocaleDateString(S.lang==='ru'?'ru-RU':'uz-UZ')}</b><small>${r.items.length} ${t('items')}</small></div><div class="pr">${fmt(r.tot)}<i>${t('sum')}</i></div><button data-a="rep" data-i="${tr.length-1-i}">${ic('swap')}</button></div>`).join('')}`;
}
function render(){
 const off=!navigator.onLine;
 $('#app').innerHTML=`<div class="top"><div class="brand">${ic('cart')}Корзинка</div><div class="sp"></div>${D?`<span class="upd ${off?'off':''}">${off?t('off')+' · ':''}${t('upd')} ${D.date}</span>`:''}<div class="lang"><button data-a="lang" data-l="ru" class="${S.lang==='ru'?'on':''}">RU</button><button data-a="lang" data-l="uz" class="${S.lang==='uz'?'on':''}">UZ</button></div></div>
 ${S.tab==='search'?`<div class="sbox">${ic('search')}<input id="q" value="${esc(S.q)}" placeholder="${t('ph')}" autocomplete="off" autocapitalize="off" spellcheck="false">${S.q?'<button data-a="qx">×</button>':''}</div><div id="res">${resHTML()}</div>`:S.tab==='list'?listHTML():histHTML()}
 <div class="nav">${[['search','search'],['list','cart'],['hist','hist']].map(([k,i])=>`<button data-a="tab" data-t="${k}" class="${S.tab===k?'on':''}">${ic(i)}${t(k)}${k==='list'&&cnt()?`<b>${cnt()}</b>`:''}</button>`).join('')}</div>`;
 document.documentElement.lang=S.lang;
}
function setQ(v){S.q=v;S.lim=60;$('#res').innerHTML=resHTML()}
const flash=()=>{const q=$('#q');render();const n=$('#q');if(n&&q){n.focus();n.setSelectionRange(n.value.length,n.value.length)}};
document.addEventListener('input',e=>{if(e.target.id==='q'){setQ(e.target.value);const b=document.querySelector('.sbox button');if(!!S.q!==!!b)flash()}});
document.addEventListener('change',e=>{if(e.target.id==='bud'){S.budget=+e.target.value||0;save();render()}});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,row=b.closest('[data-id]'),id=row&&row.dataset.id,x=B[id];
 const keep=()=>{save();S.tab==='search'?($('#res').innerHTML=resHTML()):render();if(S.tab!=='search')return;const n=document.querySelector('.nav b');render2nav()};
 if(a==='tab'){S.tab=b.dataset.t;render()}
 else if(a==='lang'){S.lang=b.dataset.l;save();render()}
 else if(a==='cat'){S.cat=b.dataset.c||null;S.q='';render()}
 else if(a==='q'){S.q=b.dataset.w;flash()}
 else if(a==='qx'){S.q='';flash()}
 else if(a==='sort'){S.sort=b.dataset.k;$('#res').innerHTML=resHTML()}
 else if(a==='more'){S.lim+=60;$('#res').innerHTML=resHTML()}
 else if(a==='fav'){const i=S.favs.indexOf(id);i<0?S.favs.push(id):S.favs.splice(i,1);keep()}
 else if(a==='inc'){const v=S.list[id]||(S.list[id]={q:0,p0:x?x.p:0,n:x?x.n:''});v.q++;keep()}
 else if(a==='dec'){const v=S.list[id];if(v&&--v.q<=0)delete S.list[id];keep()}
 else if(a==='chk'){S.list[id].d=!S.list[id].d;save();render()}
 else if(a==='mode'){S.mode=b.dataset.m;render()}
 else if(a==='alt'){S.alt=S.alt===id?null:id;render()}
 else if(a==='swap'){const f=b.dataset.from,o=S.list[f];delete S.list[f];S.list[id]={q:o.q,p0:x.p,n:x.n};S.alt=null;save();render();toast(t('swapped'))}
 else if(a==='clear'){S.list={};save();render()}
 else if(a==='finish'){const ids=Object.keys(S.list),dd=ids.filter(i=>S.list[i].d),use=dd.length?dd:ids;
  S.trips.push({t:Date.now(),tot:use.reduce((s,i)=>s+S.list[i].q*cur(i),0),items:use.map(i=>({id:i,n:B[i]?B[i].n:S.list[i].n,q:S.list[i].q,p:cur(i)}))});
  use.forEach(i=>delete S.list[i]);save();render();toast(t('saved'))}
 else if(a==='rep'){S.trips[+b.dataset.i].items.forEach(i=>{const v=S.list[i.id]||(S.list[i.id]={q:0,p0:cur(i.id)||i.p,n:i.n});v.q+=i.q});save();S.tab='list';render()}
 else if(a==='share'){const tx=Object.entries(S.list).map(([i,v])=>`${v.d?'✓':'•'} ${B[i]?B[i].n:v.n} × ${v.q} — ${fmt(cur(i)*v.q)}`).join('\n')+`\n${t('total')}: ${fmt(lt())} ${t('sum')}`;
  navigator.share?navigator.share({text:tx}).catch(()=>{}):navigator.clipboard.writeText(tx).then(()=>toast(t('copied')))}
});
function render2nav(){const n=document.querySelector('.nav');if(!n)return;const l=n.querySelector('[data-t=list]');if(!l)return;const bb=l.querySelector('b');if(cnt()){bb?bb.textContent=cnt():l.insertAdjacentHTML('beforeend',`<b>${cnt()}</b>`)}else bb&&bb.remove()}
addEventListener('online',render);addEventListener('offline',render);
(async()=>{render();try{const r=await fetch('/api/catalog');if(!r.ok)throw 0;D=await r.json();const P=D.items.map(C.prep);C.init(P);P.forEach(x=>B[x.id]=x)}catch(e){err=true}render()})();
})();

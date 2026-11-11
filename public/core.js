// Поиск: русский / английский / узбекский (латиница и кириллица), категории, цена за единицу.
(function(g){
const M={а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'e',ж:'j',з:'z',и:'i',й:'i',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'s',ч:'ch',ш:'sh',щ:'sh',ы:'i',э:'e',ю:'u',я:'a',ъ:'',ь:'',ў:'o',қ:'k',ғ:'g',ҳ:'h'};
const AP=/[ʻʼ’‘`´']/g;
// «фонетический ключ»: кофе = coffee = kofe, сут = sut, кефир = kefir
const pk=s=>s.toLowerCase().replace(AP,'').replace(/[а-яёўқғҳ]/g,c=>M[c]??c).replace(/ch/g,'4').replace(/kh|x/g,'h').replace(/ts|c(?=[eiy])/g,'s').replace(/c/g,'k').replace(/4/g,'ch').replace(/ph/g,'f').replace(/w/g,'v').replace(/q/g,'k').replace(/[ey]/g,'i').replace(/ou|oo/g,'u').replace(/(.)\1+/g,'$1').replace(/[^a-z0-9]/g,'');
const tok=s=>s.toLowerCase().replace(AP,'').match(/[a-zа-яёўқғҳ]+|\d+/g)||[];
// категория|термины (ru-основы, en, uz). «$» на конце = слово целиком
const LEX=`dairy|молок,молоч,мол$,milk$,sut,sutli
dairy|кефир,kefir,кисломол
dairy|йогурт,yogurt,yoghurt
dairy|сметан,smetana,qaymoq
dairy|сливк,slivki,qaymoq
dairy|творог,tvorog,cottage
dairy|сыр$,сыра$,сыры$,сыром$,сырн,сырок,сырки$,cheese,pishloq
dairy|яйц,egg,tuxum
dairy|ряженк,катык,qatiq,ayron,айран
bread|хлеб,non$,bread,xleb
bread|батон,baton;лаваш,lavash;самса,samsa;круассан,croissant;булочк,булк,bulka,bun$
bread|торт,tort,cake;пирожн,pirojni;пирог,pirog;кекс,keks;рулет,rulet;эклер,ekler
meat|мяс,meat,gosht,qiyma,фарш,farsh
meat|куриц,курин,chicken,tovuq,цыпл,бройлер;голен;крыл
meat|говядин,beef,mol$;баран,lamb,qoy$;индейк,turkey,kurka;свинин,pork
meat|шашлык,shashlik,kebab,кебаб;котлет,kotlet,cutlet;стейк,steak
deli|колбас,kolbasa,sausage;сосиск,sosiska,sosis,сардельк;ветчин,vetchina,ham$;бекон,bacon;салями,salami;паштет,pashtet
fish|рыб,fish,baliq;форел,forel,trout;лосос,семг,salmon,losos;креветк,krevetka,shrimp;тунец,tuna;сельд,селед,herring;икр,ikra,caviar;краб,crab;скумбри;минтай
veg|огур,bodring,cucumber;помидор,томат,tomato,pomidor;картоф,kartoshka,potato;морков,sabzi,carrot;лук$,лука$,piyoz,onion;капуст,karam,cabbage;чеснок,sarimsoq,garlic;овощ,sabzavot,vegetable;гриб,qoziqorin,mushroom;салат$,salat,salad;зелень,укроп
veg|яблок,яблоч,olma,apple;банан,banana;апельсин,apelsin,orange;лимон$,лимоны$,limon,lemon;груш,pear;виноград,uzum,grape;клубник,qulupnay,strawberry;персик,shaftoli,peach;манго,mango;арбуз,tarvuz,watermelon;дын,qovun,melon;малин,malina,raspberry;вишн,gilos,cherry;гранат,anor;абрикос,orik,apricot;киви,kiwi;ананас,pineapple;фрукт,meva,fruit
grocery|масл,maslo,oil,moy,butter,sariyog
grocery|рис$,риса$,rice,guruch;греч,grechka,buckwheat
grocery|макарон,makaron,pasta$,спагетти,spaghetti,вермишел;лапш,lapsha,noodle,доширак
grocery|мук,muka,flour,un$;сахар,shakar,sugar,qand;соль$,соли$,tuz,salt
grocery|круп,каш,kasha,porridge;хлопь,flakes,cereal;овсян,oat;манн;мюсли,muesli
grocery|мёд,мед$,asal,honey;орех,yongoq,nut$,nuts;миндал,almond;фундук;арахис,peanut;кешью;фисташк,pistachio
grocery|фасол,loviya,beans;горох,nohat;чечевиц,mosh;нут$;изюм,mayiz,raisin;курага,kuraga;чернослив;сухофрукт
grocery|специ,приправ,spice,ziravor;перец$,перца$,pepper;куркум;паприк;корица,cinnamon;ваниль,vanilla;дрожж,yeast;уксус,sirka,vinegar
sauce|кетчуп,ketchup,kechup;майонез,mayonnaise,mayonez,mayones;соус,sauce,sous,аджик,горчиц
sauce|консерв,konserva,canned;горошек;кукуруз,kukuruza;оливк,olive,маслин;тушенк;шпрот;джем,jam$,варень,murabbo,повидл;томатн
sweet|шоколад,шок$,chocolate,shokolad,choco;конфет,конф$,konfet,candy;леденц;карамел,caramel;мармелад,marmelad;зефир,zefir;халва,xalva;пастил;ирис;драже;десерт,dessert;пудинг
sweet|чипс,chips;сухарик;снек,snack;попкорн,popcorn;крекер,cracker;хруст;батончик,bar$,bars;протеин
sweet|печень,pechenye,cookie,cookies,biscuit;бисквит;вафл,vafli,wafer;пряник,pryanik;сушк;бублик;баранк;галет;жев,gum$,saqich
tea|чай$,чая$,чаи$,чайн,tea$,choy
tea|кофе,coffee,qahva,nescafe,нескафе,jacobs,якобс,капучино,cappuccino,латте,latte,эспрессо,espresso,растворим;какао,cocoa,kakao;цикорий
drink|вода$,воды$,воду$,водой$,water,suv,минерал,mineral,gazli
drink|сок$,сока$,соки$,соку$,sok$,juice,sharbat,нектар,nektar,морс
drink|лимонад,limonad,lemonade,газиров,cola$,кола$,кока,pepsi,пепси,fanta,фанта,sprite,спрайт
drink|напит,drink$,ichimlik;энергет,energy,redbull;компот,kompot;квас,kvas;тоник,tonic
drink|пиво,pivo,beer;вино,vino,wine$
frozen|морож,muzqaymoq,icecream;пельмен,pelmeni,dumpling;вареник;манты$;замороз,muzlat,frozen;пицц,pizza;наггетс,nugget
home|порошок,kir$,стирал,laundry,detergent,persil,ariel;посуд,idish,dish$,fairy,фейри;губк,gubka,sponge;чистящ,cleaner;мусор;освежит;отбелив
home|бумаг,qogoz,paper;салфет,salfetka,napkin,tissue;полотенц;пакет,paket,bag$,bags;фольг,foil;пленк;батарей,batarey;лампоч;спичк;свеч;швабр;тряпк;перчатк
care|шампун,shampun,shampoo;мыло,sovun,soap;гель,gel$,душа$,shower;зубн,зуб$,tish,tooth,toothpaste,colgate;крем,krem,cream$;лосьон,lotion;дезодорант,дез$,deo,deodorant;прокладк,pads,bella;тампон;бритв,razor;ватн,cotton;бальзам,balsam;кондиционер
care|краск,dye;волос,soch,hair$;спрей$,spray;щетк,brush;расческ;помад,lipstick;тушь,mascara;маникюр;лак$;парфюм,perfume,духи,одеколон;nivea;garnier;loreal;palette;гигиен;туалетн
baby|подгуз,pampers,huggies,трусик,diaper;baby$,bolalar,детск,детей,дет$;фрутоняня
pet|корм,feed$,petfood,pet$;кошк,mushuk,cats;собак,dog,dogs;kitekat;whiskas;pedigree;chappi`.split('\n');
const PX=new Map(),EX=new Map(),CAT=[];
LEX.forEach(ln=>{const [c,t]=ln.split('|');t.split(';').forEach(g=>{const i=CAT.push(c)-1;g.split(',').forEach(w=>{const ex=w.endsWith('$'),k=pk(ex?w.slice(0,-1):w);if(!k)return;const m=ex||k.length<3?EX:PX;if(!m.has(k))m.set(k,[]);m.get(k).push(i)})})});
const tags=w=>{const s=new Set();for(let L=3;L<=w.length;L++){const a=PX.get(w.slice(0,L));a&&a.forEach(i=>s.add(i))}const e=EX.get(w);e&&e.forEach(i=>s.add(i));return s};
function qcon(w){const s=tags(w);if(w.length>=3){for(const [k,a] of PX)if(k.startsWith(w))a.forEach(i=>s.add(i));for(const [k,a] of EX)if(k.startsWith(w))a.forEach(i=>s.add(i))}return s}
// цена за 1 л / 1 кг / 1 шт из названия
function unit(n,p){
 const m=n.toLowerCase().match(/(\d+(?:[.,]\d+)?)\s*(мл|ml|л|l|литр\w*|кг|kg|гр|г|g|шт|dona)(?![a-zа-я])/);
 if(!m||!(p>0))return null;let v=parseFloat(m[1].replace(',','.')),u=m[2];
 if(u==='мл'||u==='ml'){v/=1000;u='l'}else if(/^(л|l|литр)/.test(u))u='l';else if(u==='кг'||u==='kg')u='kg';else if(/^(гр|г|g)$/.test(u)){v/=1000;u='kg'}else u='pc';
 return v>0?{u,pp:Math.round(p/v)}:null;
}
function prep(a){
 const [id,n,p,h]=a,k=tok(n).map(pk),c=new Set();let cat='other',main=-1,best=99;
 k.forEach((w,i)=>tags(w).forEach(x=>{c.add(x);if(i<best){best=i;cat=CAT[x];main=x}}));
 return {id,n,p,h,k,c,cat,main,u:unit(n,p)};
}
let P=[],V=new Set();
const init=a=>{P=a;V=new Set();a.forEach(x=>x.k.forEach(w=>V.add(w)))};
const near=(a,b)=>{if(Math.abs(a.length-b.length)>1)return false;let i=0;while(i<a.length&&a[i]===b[i])i++;if(a.length===b.length)return a.slice(i+1)===b.slice(i+1);if(a.length>b.length)[a,b]=[b,a];return a.slice(i)===b.slice(i+1)};
const fuzzy=w=>{if(w.length<4||V.has(w))return w;for(const v of V)if(near(w,v))return v;return w};
function run(qs){
 const out=[];
 for(const x of P){
  let sc=0,ok=true;
  for(const {w,c} of qs){
   let b=0;for(const k of x.k){if(k===w){b=4;break}if(k.startsWith(w))b=3}
   if(x.main>=0&&c.has(x.main))b=4.5;else if(!b)for(const i of c)if(x.c.has(i)){b=2;break}
   if(!b){ok=false;break}sc+=b;
  }
  if(ok)out.push([sc,x]);
 }
 return out;
}
function search(q){
 const qt=tok(q).map(pk).filter(Boolean);if(!qt.length)return[];
 let r=run(qt.map(w=>({w,c:qcon(w)})));
 if(!r.length)r=run(qt.map(w=>{const f=fuzzy(w);return {w:f,c:qcon(f)}}));
 return r.sort((a,b)=>b[0]-a[0]||(!a[1].p-!b[1].p)||a[1].n.length-b[1].n.length).map(x=>x[1]);
}
function sortRes(a,m){
 const f=m==='lo'?(x,y)=>(!x.p-!y.p)||x.p-y.p:m==='hi'?(x,y)=>(!x.p-!y.p)||y.p-x.p:m==='unit'?(x,y)=>(!x.u-!y.u)||(x.u&&y.u?x.u.pp-y.u.pp:0):null;
 return f?a.slice().sort(f):a;
}
g.Core={pk,tok,prep,init,search,sortRes,unit,CAT,all:()=>P};
})(typeof window!=='undefined'?window:module.exports);

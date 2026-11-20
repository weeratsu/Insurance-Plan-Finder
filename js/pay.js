/* js/pay.js (Nov 20 2026) — shared premium-payment helpers for bought policies.
 * Data lives inside each contract object of customer.bought[] (Sheet column "bought", JSON) — no new Sheet column:
 *   uid  : contract id            mode : 'y'|'h'|'q'|'m' (default 'y')      py : years to pay (optional)
 *   link : (rider) uid of its main contract                                 pay  : [{id,due,d,amt,ch,rm}]  (log, on the book's main contract)
 */
(function(G){
const MODES={y:['รายปี',12,1],h:['ราย 6 เดือน',6,.52],q:['ราย 3 เดือน',3,.27],m:['รายเดือน',1,.09]};
const CH={transfer:'📲 โอน/QR',card:'💳 บัตรเครดิต',bank:'🏦 หักบัญชี',counter:'🏪 เคาน์เตอร์/สาขา',cash:'💵 เงินสด (ตัวแทน)',other:'📌 อื่นๆ'};
const GRACE=31;
const iso=d=>{const z=new Date(d.getTime()-d.getTimezoneOffset()*6e4);return z.toISOString().slice(0,10)};
const pd=s=>{if(!s)return null;const[y,m,d]=String(s).slice(0,10).split('-').map(Number);return y?new Date(y,m-1,d):null};
const addM=(d,n)=>{const x=new Date(d.getFullYear(),d.getMonth()+n,1),last=new Date(x.getFullYear(),x.getMonth()+1,0).getDate();x.setDate(Math.min(d.getDate(),last));return x};
const today=()=>{const t=new Date();return new Date(t.getFullYear(),t.getMonth(),t.getDate())};
const live=x=>!x.status||['bought','active'].includes(x.status);
function uid(x){return x.uid||(x.uid='p'+Date.now().toString(36)+Math.random().toString(36).slice(2,6))}
function list(c){const b=c&&c.bought;return !b?[]:Array.isArray(b)?b:[b]}
/* book = main contract + its riders (explicit link first, else same purchase date — old rule) */
function books(P){P.forEach(x=>{x.kind=x.kind||(x.rider?'rider':'main');uid(x)});
 const M=P.filter(x=>x.kind==='main').sort((a,b)=>(a.date||'')<(b.date||'')?-1:1),used=new Set(),out=M.map(m=>({main:m,riders:[]}));
 P.filter(r=>r.kind==='rider'&&r.link).forEach(r=>{const b=out.find(o=>o.main.uid===r.link);if(b){b.riders.push(r);used.add(r)}});
 out.forEach(b=>P.filter(r=>r.kind==='rider'&&!used.has(r)&&!r.link&&r.date&&r.date===b.main.date).forEach(r=>{b.riders.push(r);used.add(r)}));
 const rest=P.filter(r=>r.kind==='rider'&&!used.has(r));return{books:out,rest}}
const step=x=>(MODES[x.mode]||MODES.y)[1];
function instAmt(x){return Math.round((+x.prem||0)*(MODES[x.mode]||MODES.y)[2]*100)/100}
/* all installment due dates up to (today + 1 step) */
function dues(x){const st=pd(x.date),a=pd(x.pd)||st;if(!a)return[];const s=step(x),t=today();let k=0,d=a;
 if(st){while(addM(a,(k-1)*s)>=st)k--}
 const endPay=st&&x.py?addM(st,12*x.py):null,end=pd(x.end),o=[];
 for(let i=0;i<1200;i++,k++){d=addM(a,k*s);if(endPay&&d>=endPay)break;if(end&&d>=end)break;o.push(d);if(d>t)break}
 return o}
/* status of a pay-carrying contract (book main or standalone rider) */
function status(x){const D=dues(x),t=today(),L=(x.pay||[]).slice().sort((a,b)=>a.d<b.d?-1:1),paid=new Set(L.map(p=>p.due)),A=instAmt(x);
 if(!D.length)return{s:'none',amt:A,unpaid:[]};
 const past=D.filter(d=>d<=t),cur=past[past.length-1]||D[0],nextFut=D.find(d=>d>t)||null,last=L.length?L[L.length-1]:null;
 const thru=L.length?pd(L.map(p=>p.due).sort().pop()):null;
 if(!L.length)return{s:'nolog',cur,curPaid:null,unpaid:[],next:nextFut,nextFut,thru:null,last:null,days:0,amt:A};
 const first=pd(L.map(p=>p.due).sort()[0]),unpaid=past.filter(d=>d>=first&&!paid.has(iso(d)));
 const finished=!nextFut&&(x.py||x.end)&&!unpaid.length&&paid.has(iso(D[D.length-1]));
 let s='paid',days=0;if(unpaid.length){days=Math.round((t-unpaid[0])/864e5);s=days>GRACE?'late':'due'}if(finished)s='done';
 return{s,cur,curPaid:paid.has(iso(cur))||cur<first,unpaid,next:unpaid.length?unpaid[0]:nextFut,nextFut,thru,last,days,amt:A,grace:unpaid[0]?new Date(+unpaid[0]+GRACE*864e5):null}}
const SB={paid:['✅ จ่ายแล้ว','#dcfce7','#15803d'],due:['🟡 รอชำระ','#fef9c3','#a16207'],late:['🔴 เลยกำหนด','#fee2e2','#b91c1c'],done:['🏁 ชำระครบแล้ว','#e0e7ff','#3730a3'],nolog:['⚪ ยังไม่มีบันทึก','#f3f4f6','#4b5563'],none:['– ไม่มีวันครบกำหนด','#f3f4f6','#6b7280']};
function badge(s){const v=SB[s]||SB.paid;return `<span style="display:inline-block;font-size:12px;font-weight:600;padding:2px 9px;border-radius:10px;background:${v[1]};color:${v[2]};white-space:nowrap">${v[0]}</span>`}
const dT=d=>d?(d instanceof Date?iso(d):String(d)).slice(0,10).split('-').reverse().join('/'):'-';
/* last paid date for the plan page link (main contracts on that page) */
function lastPaidFor(c,page){const P=list(c),{books:B,rest}=books(P);let best='';B.filter(b=>!page||b.main.page===page).forEach(b=>(b.main.pay||[]).forEach(p=>{if(p.d>best)best=p.d}));return best}
G.IPFPAY={MODES,CH,GRACE,iso,pd,addM,today,live,uid,list,books,dues,status,badge,dT,instAmt,lastPaidFor,SB};
})(window);

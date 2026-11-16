/* plan-template.js (Nov 16 2026) — shared layout for all customer plan pages.
 * Customer page defines: const CUST={name:'คุณรุ่ง',icon:'👩',age:45,note:'...'} and const PLANS=[...] then loads this file.
 * Edit THIS file to change the format of every customer page at once. */
(function(){var st=document.createElement('style');st.textContent=".kp{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;margin:16px 0}\n.k{background:var(--card);border:1px solid var(--b);border-radius:12px;padding:14px 16px}\n.k .l{font-size:13px;color:var(--t2)}.k .v{font-size:24px;font-weight:700;margin-top:4px}.k .s{font-size:12px;color:var(--m)}\n.k.g .v{color:#16a34a}.k.r .v{color:var(--aia)}\n.sec{background:var(--card);border:1px solid var(--b);border-radius:12px;padding:16px 18px;margin-top:16px}\n.sec h3{margin:0 0 12px;font-size:16px;color:var(--aia)}\n.tl{display:flex;border-radius:10px;overflow:hidden;font-size:13px;text-align:center}\n.tl div{padding:12px 6px;color:#fff}\n.bar{display:flex;align-items:center;gap:10px;margin:6px 0;font-size:14px}\n.bar .a{width:80px;color:var(--t2)}.bar .t{flex:1;background:var(--aia-bg);border-radius:6px;height:22px;position:relative}\n.bar .t i{display:block;height:100%;background:#16a34a;border-radius:6px}.bar .n{width:150px;text-align:right;font-weight:600}\ndetails summary{cursor:pointer;color:var(--aia);font-weight:600}\n.ft{width:100%;border-collapse:collapse;font-size:13px;margin-top:10px}.ft th{background:var(--aia-bg);color:var(--aia);padding:7px}.ft td{padding:6px;border-bottom:1px solid var(--b);text-align:right}.ft td:first-child{text-align:center}\n.tb{border:1px solid var(--b);background:#fff;padding:8px 14px;border-radius:18px;font:inherit;font-size:14px;cursor:pointer}.tb.on{background:var(--aia);color:#fff;border-color:var(--aia)}\n.cmpT{font-size:14px;border-collapse:separate;border-spacing:0}.cmpT tr.grp td{background:#fff1f2;color:#be123c;font-weight:700;font-size:13px;text-align:left;padding:8px 10px;border-top:10px solid #fff;border-radius:10px 10px 0 0}.cmpT tr.grp+tr td{border-top:1px solid #fecdd3}.cmpT td.lb{text-align:left;color:var(--t2)}\n.cmpT td.win{background:#dcfce7;color:#166534;font-weight:700}\n.bdg{display:inline-block;background:#16a34a;color:#fff;font-size:11px;font-weight:600;padding:2px 7px;border-radius:10px;margin:3px 0 0 6px;white-space:nowrap}\n.hg{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}\n.hc{border:1px solid var(--b);border-radius:10px;padding:12px}.hc .bdg{margin:6px 6px 0 0}.hs{font-size:12px;color:var(--t2);margin-top:8px}";document.head.appendChild(st);})();
window.CUSTLBL=()=>CUST.name||((CUST.icon==='👩'?'เพศหญิง':'เพศชาย'));
(function(){const q=new URLSearchParams(location.search);CUST.name=q.get('n')||'';if(q.get('a'))CUST.age=q.get('a');if(q.get('g'))CUST.icon=q.get('g');})();
document.title=(CUST.title||'แผนออมทรัพย์')+' · '+(CUST.icon==='👩'?'หญิง':'ชาย')+' '+CUST.age+' ปี';
document.body.insertAdjacentHTML('afterbegin','<div class="wrap"><div class="hd"><div><h1 id="t1"></h1><p id="t2"></p></div><div class="cust" style="background:rgba(255,255,255,.18);padding:8px 14px;border-radius:20px">'+CUST.icon+' '+(CUST.name||(CUST.icon==='👩'?'หญิง':'ชาย'))+' · อายุ '+CUST.age+' ปี</div></div>'+
  '<div id="tabs" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:16px"></div><div id="app"></div>'+
  '<div class="note">* เป็นตัวอย่างเพื่อความเข้าใจเท่านั้น รายละเอียดความคุ้มครองจะระบุในกรมธรรม์<br>* '+(CUST.taxNote||'ลดหย่อนภาษีคำนวณตามฐานภาษีในใบเสนอขาย (ใช้สิทธิ์ได้ตามจริงไม่เกิน 100,000 บาท/ปี)')+'<br>* เงินคืนรายงวดจ่าย ณ สิ้นปีกรมธรรม์ ตามอัตรา % ของจำนวนเงินเอาประกันภัย</div></div>');
var t1=document.getElementById('t1'),t2=document.getElementById('t2'),tabs=document.getElementById('tabs'),app=document.getElementById('app');
const f=n=>Math.round(n).toLocaleString('en-US');
const S=p=>{const paid=p.prem*p.payYears,back=p.cash.reduce((a,b)=>a+b,0),end=p.startAge+p.payYears-1,last=p.startAge+p.cash.length-1,fc=p.startAge+p.cash.findIndex(v=>v>0);let cp=0,cr=0,be=null;for(let i=0;i<p.cash.length;i++){if(p.startAge+i<=end)cp+=p.prem;cr+=p.cash[i];if(be===null&&cr>=cp){be=p.startAge+i;break}}return{paid,back,end,last,fc,be,gain:back-paid,x:back/paid}};
// Nov 16 2026: cash-back pattern note — "คืน x% ของทุน ทุก n ปี" (auto from p.cash; p.cashNote overrides)
function pc(x){return (Math.round(x*100)/100).toString()}
function cashNote(p){
 if(p.cashNote)return `<div style="font-size:13px;color:var(--t2);margin:-4px 0 10px">📝 ${p.cashNote}</div>`;
 const g={};p.cash.forEach((v,i)=>{if(v)(g[v]=g[v]||[]).push(p.startAge+i)});
 const L=Object.keys(g).map(v=>{const a=g[v],n=a.length,st=n>1?a[1]-a[0]:0,even=a.every((x,k)=>!k||x-a[k-1]===st);
  const per=p.sa?'<b>'+pc(v/p.sa*100)+'%</b> ของทุน':'';
  const when=n===1?'ครั้งเดียว ที่อายุ '+a[0]:(even?(st===1?'ทุกปี':'ทุก '+st+' ปี')+' อายุ '+a[0]+'–'+a[n-1]+' ('+n+' ครั้ง)':n+' ครั้ง ที่อายุ '+a.join(', '));
  return {a0:a[0],t:'คืน '+per+' ('+f(+v)+' บาท) '+when};}).sort((x,y)=>x.a0-y.a0);
 return L.length?`<div style="font-size:13px;color:var(--t2);margin:-4px 0 10px;line-height:1.7">${L.map(x=>'📝 '+x.t).join('<br>')}</div>`:'';
}
function bands(p){const o=[];p.cash.forEach((v,i)=>{if(!v)return;const a=p.startAge+i,l=o[o.length-1];if(l&&l.v===v&&l.b===a-1&&i<p.cash.length-1)l.b=a;else o.push({a,b:a,v})});return o}
function render(i){document.querySelectorAll('.tb').forEach((b,j)=>b.classList.toggle('on',j===i));
 if(i===PLANS.length)return cmp();
 const p=PLANS[i],s=S(p),bd=bands(p),mx=Math.max(...bd.map(b=>(b.b-b.a+1)*b.v));
 t1.textContent='💰 '+p.code;t2.textContent=p.th+' · คุ้มครอง '+p.cover;
 const L=s.last-p.startAge+1;
 app.innerHTML=`<div class="kp">
 <div class="k"><div class="l">จ่ายเบี้ย</div><div class="v">${f(p.prem)}</div><div class="s">บาท/ปี × ${p.payYears} ปี (อายุ ${p.startAge}–${s.end})</div></div>
 ${isLife()?'':`<div class="k"><div class="l">รวมจ่ายทั้งหมด</div><div class="v">${f(s.paid)}</div><div class="s">บาท</div></div>`}
 ${isLife()?'':`<div class="k r"><div class="l">🎯 จุดคุ้มทุน</div><div class="v">${s.be?"อายุ "+s.be:"–"}</div><div class="s">${s.be?"เงินคืนสะสม ≥ เบี้ยที่จ่าย (ปีที่ "+(s.be-p.startAge+1)+")":"ไม่ถึงจุดคุ้มทุน"}</div></div>`}
 <div class="k g"><div class="l">รวมได้คืน</div><div class="v">${f(s.back)}</div><div class="s">บาท</div></div>
 ${isLife()?'':`<div class="k g"><div class="l">ได้มากกว่าที่จ่าย</div><div class="v">+${f(s.gain)}</div><div class="s">บาท (${s.x.toFixed(2)} เท่า)</div></div>`}
 ${p.tax?`<div class="k r"><div class="l">ลดหย่อนภาษีรวม</div><div class="v">${f(p.tax)}</div><div class="s">บาท (ฐานภาษี ${p.taxRate}%)</div></div>`:''}</div>
 <div class="sec"><h3>🗓️ ภาพรวมตลอดสัญญา</h3>
 <div class="tl" style="margin-bottom:6px"><div style="flex:${p.payYears};background:#7c3aed">จ่ายเบี้ย อายุ ${p.startAge}–${s.end}</div><div style="flex:${L-p.payYears};background:#e5e7eb;color:#555">ไม่ต้องจ่ายแล้ว</div></div>
 <div class="tl"><div style="flex:${s.fc-p.startAge};background:#e5e7eb"></div><div style="flex:${s.last-s.fc+1};background:#16a34a">รับเงินคืน อายุ ${s.fc}–${s.last}</div></div>
 <div style="font-size:13px;color:var(--t2);margin-top:8px">🛡️ คุ้มครองชีวิต ${p.cover}</div></div>
 <div class="sec"><h3>💵 เงินคืนที่ได้รับ</h3>${cashNote(p)}${bd.map(b=>`<div class="bar"><span class="a">อายุ ${b.a}${b.a!==b.b?'–'+b.b:''}</span><span class="t"><i style="width:${(b.b-b.a+1)*b.v/mx*100}%"></i></span><span class="n">${f(b.v)}${b.a!==b.b?'/ปี':''} <small style="color:var(--m)">${p.sa&&!isLife()?pc(b.v/p.sa*100)+'% ของทุน ':''}${b.a!==b.b?'(รวม '+f((b.b-b.a+1)*b.v)+')':''}</small></span></div>`).join('')}</div>
 <div class="sec"><h3>🛡️ ถ้าเสียชีวิต ครอบครัวได้รับ</h3><div style="font-size:14px">สูงสุด <b style="color:var(--aia)">${f(Math.max(...p.death))}</b> บาท · ต่ำสุด ${f(Math.min(...p.death))} บาท</div>
 <details style="margin-top:10px"><summary>ดูตารางรายปี</summary>${(()=>{let cp=0,cr=0,fl=null;const rows=p.death.map((d,i)=>{const a=p.startAge+i;if(a<=s.end)cp+=p.prem;cr+=p.cash[i];const lv=cr-cp,dv=d+(cr-p.cash[i])-cp;if(fl===null&&lv>=0)fl=a;const c=v=>`<td style="color:${v>=0?'#16a34a':'#dc2626'};font-weight:600">${v>=0?'+':''}${f(v)}</td>`;return `<tr${a===fl?' style="background:#dcfce7"':''}><td>${a}${a===fl?' 🎯':''}</td><td>${a<=s.end?f(p.prem):'-'}</td><td>${f(cp)}</td><td style="color:#16a34a">${p.cash[i]?f(p.cash[i]):'-'}</td><td>${cr?f(cr):'-'}</td><td>${f(d)}</td>${c(dv)}</tr>`}).join('');
 return `<div style="font-size:12px;color:var(--t2);margin:8px 0">🎯 = ปีแรกที่เงินคืนสะสม ≥ เบี้ยสะสม (กำไร) · <b>ส่วนต่างกรณีเสียชีวิต</b> = เงินชดเชย + เงินคืนที่รับไปแล้วในปีก่อน ๆ − เบี้ยสะสม (ไม่นับเงินคืนปีที่เสียชีวิต เพราะจะได้อย่างใดอย่างหนึ่ง)</div><div style="overflow-x:auto"><table class="ft"><tr><th>อายุ</th><th>เบี้ย</th><th>เบี้ยสะสม</th><th>เงินคืน</th><th>เงินคืนสะสม</th><th>กรณีเสียชีวิต</th><th>ส่วนต่าง<br>(เสียชีวิต)</th></tr>${rows}</table></div>`})()}</details></div>`}
const isLife=()=>/ชีวิต/.test(CUST.title||'')||PLANS.every(p=>p.type==='ตลอดชีพ');
function cmp(){t1.textContent='⚖️ เปรียบเทียบแผน';t2.textContent='เทียบทุกแผน · '+(CUST.title||'แผนออมทรัพย์');
 let R=[['ประเภท',p=>p.type],
 ['#','💵 ทุน & การจ่าย'],['ทุนประกัน',p=>f(p.sa),p=>p.sa,'max','💎 ทุนสูงสุด'],
 ['จ่ายเบี้ย/ปี',p=>f(p.prem)],
 ['จ่ายกี่ปี',p=>p.payYears+' ปี',p=>p.payYears,'min','⏱️ จ่ายสั้นสุด'],
 ['รวมจ่าย',p=>f(S(p).paid)],
 ['#','⏳ อายุ & ระยะเวลา'],['💰 ได้เงินคืนครบที่อายุ',p=>'อายุ '+S(p).last,p=>S(p).last,'min','💰 ได้ครบไวสุด'],['🎯 จุดคุ้มทุน',p=>S(p).be?'อายุ '+S(p).be:'–',p=>S(p).be||999,'min','🎯 คุ้มทุนไวสุด'],['เริ่มรับเงินคืน',p=>'อายุ '+S(p).fc,p=>S(p).fc,'min','⚡ ได้เงินไวสุด'],
 ['คุ้มครอง',p=>p.cover,p=>S(p).last,'max','🛡️ ยาวสุด'],
 ['#','🎁 ผลประโยชน์'],['รวมได้คืน',p=>f(S(p).back),p=>S(p).back,'max','🏆 ได้คืนมากสุด'],
 ['ได้มากกว่าที่จ่าย',p=>'+'+f(S(p).gain)+' ('+S(p).x.toFixed(2)+' เท่า)',p=>S(p).x,'max','📈 คุ้มสุด'],
 ['คุ้มครองชีวิตสูงสุด',p=>f(Math.max(...p.death)),p=>Math.max(...p.death),'max','❤️ คุ้มครองสูงสุด'],['ลดหย่อนภาษีรวม',p=>p.tax?f(p.tax):'–',p=>p.tax||0,'max','🧾 ลดหย่อนสูงสุด']];
 if(isLife()){const k=R.findIndex(r=>r[0]==='คุ้มครองชีวิตสูงสุด');R.splice(k,0,['คุ้มครองชีวิตเริ่มต้น',p=>f(p.death[0])]);
  const rn=[...new Set(PLANS.flatMap(p=>(p.riders||[]).map(x=>x.n)))];
  if(rn.length){R.push(['#','🎁 สัญญาเพิ่มเติมแถมฟรี']);rn.forEach(n=>R.push([n,p=>{const x=(p.riders||[]).find(y=>y.n===n);return x?`<b>${f(x.sa)}</b><br><small style="color:var(--t2)">${x.d}</small>`:'–'}]))}}
 if(isLife())R=R.filter(r=>!['💰 ได้เงินคืนครบที่อายุ','🎯 จุดคุ้มทุน','เริ่มรับเงินคืน','ได้มากกว่าที่จ่าย','รวมจ่าย'].includes(r[0]));
 const cell=(r,p)=>{if(!r[2])return `<td>${r[1](p)}</td>`;const vs=PLANS.map(r[2]),b=r[3]==='max'?Math.max(...vs):Math.min(...vs),win=r[2](p)===b;
  return win?`<td class="win">${r[1](p)}<span class="bdg">${r[4]}</span></td>`:`<td>${r[1](p)}</td>`};
 const wins=PLANS.map(p=>R.filter(r=>r[0]!=='#'&&r[2]&&(()=>{const vs=PLANS.map(r[2]);return r[2](p)===(r[3]==='max'?Math.max(...vs):Math.min(...vs))})()).map(r=>r[4]));
 app.innerHTML=`<div class="sec" style="overflow-x:auto"><table class="ft cmpT"><tr><th></th>${PLANS.map((p,i)=>`<th style="cursor:pointer" onclick="render(${i})">${p.code} ↗</th>`).join('')}</tr>${R.map(r=>r[0]==='#'?`<tr class="grp"><td colspan="${PLANS.length+1}">${r[1]}</td></tr>`:`<tr><td class="lb">${r[0]}</td>${PLANS.map(p=>cell(r,p)).join('')}</tr>`).join('')}</table></div>${diffSec()}
 <div class="sec"><h3>🏅 จุดเด่นของแต่ละแผน</h3><div class="hg">${PLANS.map((p,i)=>`<div class="hc" style="cursor:pointer" onclick="render(${i})"><b style="color:var(--aia)">${p.code} ↗</b><div>${wins[i].length?wins[i].map(w=>`<span class="bdg">${w}</span>`).join(''):'<span style="color:var(--m);font-size:13px">–</span>'}</div><div class="hs">จ่าย ${f(p.prem)}/ปี × ${p.payYears} ปี · ได้คืน ${f(S(p).back)}</div></div>`).join('')}</div></div>${advice(wins)}`}

function diffSec(){if(PLANS.length<2)return '';const o=PLANS.map((p,i)=>i).sort((a,b)=>PLANS[a].prem-PLANS[b].prem),b=PLANS[o[0]],sb=S(b),
 rows=[['เบี้ย/ปี',p=>p.prem],['เบี้ยรวม',p=>S(p).paid],['ทุนประกัน',p=>p.sa],['คุ้มครองชีวิตเริ่มต้น',p=>p.death[0]],['คุ้มครองชีวิตสูงสุด',p=>Math.max(...p.death)],['รวมได้คืน',p=>S(p).back]];
 (b.riders||[]).forEach((x,k)=>rows.push([x.n,p=>((p.riders||[])[k]||{}).sa||0]));
 const sg=v=>v>0?`<b style="color:var(--g,#16a34a)">+${f(v)}</b>`:v<0?`<b style="color:#dc2626">${f(v)}</b>`:'เท่ากัน';
 return o.slice(1).map(i=>{const p=PLANS[i];const dp=p.prem-b.prem,ds=p.sa-b.sa;
 return `<div class="sec"><h3>📊 ${p.code} เทียบกับ ${b.code}</h3><div style="overflow-x:auto"><table class="ft"><tr><th></th><th>${b.code}</th><th>${p.code}</th><th>ส่วนต่าง</th></tr>${rows.map(r=>`<tr><td class="lb">${r[0]}</td><td>${f(r[1](b))}</td><td>${f(r[1](p))}</td><td>${sg(r[1](p)-r[1](b))}</td></tr>`).join('')}
 <tr><td class="lb">ทุนต่อเบี้ย 1 บาท/ปี</td><td>${(b.sa/b.prem).toFixed(2)}</td><td>${(p.sa/p.prem).toFixed(2)}</td><td>–</td></tr></table></div>
 <div style="font-size:14px;line-height:1.7;margin-top:10px">💡 จ่ายเพิ่ม <b>${f(dp)}</b>/ปี (รวม ${f(dp*p.payYears)}) → ทุนเพิ่ม <b>${f(ds)}</b> · ได้คืนครบสัญญาเพิ่ม <b>${f(S(p).back-sb.back)}</b>${dp?` · ทุกเบี้ยที่จ่ายเพิ่ม 1 บาท/ปี ได้ทุนเพิ่ม ${(ds/dp).toFixed(2)} บาท`:''}</div></div>`}).join('')}
const ADV={'💎 ทุนสูงสุด':'ทุนประกันสูง','⏱️ จ่ายสั้นสุด':'จ่ายเบี้ยสั้นที่สุด','💰 ได้ครบไวสุด':'ได้เงินคืนครบเร็ว','🎯 คุ้มทุนไวสุด':'คุ้มทุนเร็ว','⚡ ได้เงินไวสุด':'เริ่มรับเงินคืนเร็ว','🛡️ ยาวสุด':'คุ้มครองยาวนาน','🏆 ได้คืนมากสุด':'ได้เงินคืนรวมมากที่สุด','📈 คุ้มสุด':'ผลตอบแทนคุ้มที่สุด','❤️ คุ้มครองสูงสุด':'ความคุ้มครองชีวิตสูง','🧾 ลดหย่อนสูงสุด':'ลดหย่อนภาษีได้มากที่สุด'};
function advice(wins){if(PLANS.length<2)return '';const j=a=>a.length<2?a.join(''):a.slice(0,-1).join(' ')+' และ'+a[a.length-1];
 const L=PLANS.map((p,i)=>{const w=[...new Set(wins[i].map(x=>ADV[x]).filter(Boolean))];if(!w.length)return '';const s=S(p);
  return `<li style="margin-bottom:8px">ถ้าต้องการ<b>${j(w)}</b> → เลือก <a href="#" onclick="render(${i});return false" style="color:var(--aia);font-weight:700">${p.code}</a><br><span style="color:var(--t2);font-size:13px">จ่าย ${f(p.prem)}/ปี × ${p.payYears} ปี · ได้คืนรวม ${f(s.back)} · คุ้มครอง ${p.cover}</span></li>`}).join('');
 return L?`<div class="sec"><h3>💬 แผนไหนเหมาะกับคุณ</h3><ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.6">${L}</ul></div>`:''}
tabs.innerHTML=PLANS.map((p,i)=>`<button class="tb" onclick="render(${i})">${i+1}. ${p.code}</button>`).join('')+`<button class="tb" onclick="render(${PLANS.length})">⚖️ เปรียบเทียบ</button>`;
render(PLANS.length);

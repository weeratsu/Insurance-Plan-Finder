
let BASE=2539;
const f=n=>(typeof n==='number'&&!isNaN(n))?n.toLocaleString('en-US'):'รอเสนอ';
const LUMP='<div class="lump">✨ <b>แบบเหมาจ่าย</b> — ทุนสูง ไม่ต้องกังวลวงเงินแยกรายการ</div>';
function tot(r){if(!r)return '<div class="tot"><div class="y" style="font-size:20px">รอเสนอราคา</div></div>';return `<div class="tot"><div class="y">${f(r)}</div><div class="mo">บาท/ปี · เฉลี่ย ~${f(Math.round(r/12))}/เดือน</div></div>`}
function row(a,b,no){return `<div class="row"><span>${a}</span><span${no?' class="no"':''}>${b}</span></div>`}
const END='<div class="lump" style="background:#fdeef2;color:#D31145">⏰ <b>เตรียมปิดการขาย</b> — ขายถึง 30 พ.ย. 2569 เท่านั้น</div>';
const CP=(t,c)=>`<div class="lump" style="background:${c?'#ecfdf5':'#fff7e6'};color:${c?'#065f46':'#92400e'}">${t}</div>`;
function render(d){BASE=d.base||2539;
 const P=[];
 if(d.saver!=null)P.push({k:'saver',best:'มี OPD ไม่จ่ายร่วม',nm:'Health Saver 4000',tag:'⏰ เตรียมปิดการขาย',cls:'',sub:'ครบทั้ง IPD + OPD ในงบสบายกระเป๋า',x:END+CP('✅ <b>ไม่มีค่าใช้จ่ายร่วม</b> ทุก รพ.',1),room:'4,000',opd:d.saverOpd===false?null:'1,500 × 30 ครั้ง/ปี',opdY:d.saverOpd===false?'–':'45,000',cp:'ไม่มี',lim:'–'});
 if(d.h15!=null)P.push({k:'h15',best:'วงเงินสูง เน้น IPD',nm:'Health Happy 15 ล้าน',tag:'⏰ เตรียมปิดการขาย',cls:'',sub:'วงเงินสูง ห้องดี ไม่มี OPD',x:END+LUMP,room:'6,000',opd:null,opdY:'–',cp:'ไม่มี',lim:'15 ล้าน'});
 if(d.h25!=null)P.push({k:'h25',best:'คุ้มครองครบสุด ห้อง 9,000',nm:'Health Happy 25 ล้าน',tag:'⭐ คุ้มครองครบที่สุด',cls:' hl',sub:'วงเงินสูงสุด ห้องดีที่สุด + OPD',x:END+LUMP,room:'9,000',opd:'2,000 × 30 ครั้ง/ปี',opdY:'60,000',cp:'ไม่มี',lim:'25 ล้าน'});
 if(d.starter!=null)P.push({k:'starter',best:'ใน Network ไม่จ่ายร่วม',nm:'Health Starter (Balanced)',tag:'🆕 แผนใหม่',cls:'',sub:'มี OPD · ใช้ รพ. ใน Network ไม่ต้องจ่ายเพิ่ม',x:CP('✅ <b>ใน AIA Smart Network ไม่มีค่าใช้จ่ายร่วม</b><br>นอก Network จ่ายร่วม 20%',1),room:'4,500',opd:'7,000/ปี',opdY:'7,000',cp:'นอก Network 20%',lim:'–'});
 if(d.begin!=null)P.push({k:'begin',best:'เบี้ยถูกสุด',nm:'Health Starter (Begin)',tag:'🆕 แผนใหม่',cls:'',sub:'เบี้ยเริ่มต้น · จ่ายร่วมทุก รพ.',x:CP('⚠️ <b>มีค่าใช้จ่ายร่วม</b><br>ใน Network 10% · นอก Network 30%'),room:'4,500',opd:'7,000/ปี',opdY:'7,000',cp:'ใน 10% · นอก 30%',lim:'–'});
 const mn=Math.min(...P.map(o=>d[o.k]));P.forEach(o=>{if(d[o.k]===mn&&!o.cls)o.tag+=' · 💰 ประหยัดสุด'});
 document.getElementById('grid').innerHTML=P.map(o=>`<div class="c${o.cls}"><span class="tag${o.tag.startsWith('⏰')?'':' g'}">${o.tag}</span><h2>${o.nm}</h2><div class="sub">${o.sub}</div>${o.x}
 ${o.lim!=='–'?row('วงเงินคุ้มครอง',o.lim):''}${row('ค่าห้อง/วัน',o.room)}${o.opd?row('OPD',o.opd):row('OPD','ไม่คุ้มครอง',1)}${row('เบี้ยสุขภาพ',f(d[o.k]))}${tot(d[o.k])}</div>`).join('');
 const dif=v=>v===mn?'–':'+'+f(v-mn),R=(l,fn)=>`<tr><td>${l}</td>${P.map(o=>`<td>${fn(o)}</td>`).join('')}</tr>`;
 document.getElementById('tbl').innerHTML=`<tr><th>รายการ</th>${P.map(o=>`<th>${o.nm}<br><span style="display:inline-block;margin-top:4px;background:#ecfdf5;color:#065f46;border-radius:10px;padding:2px 8px;font-size:11px;font-weight:600">${o.best}</span>${o.x.includes('ปิดการขาย')?'<br><small>⏰ ปิดขาย 30 พ.ย.</small>':''}</th>`).join('')}</tr>`+
 R('ค่าห้อง/วัน',o=>o.room)+R('OPD สูงสุด/ปี',o=>o.opd?`${o.opdY}<br><small style="color:var(--t2)">(${o.opd})</small>`:'–')+R('ค่าใช้จ่ายร่วม',o=>o.cp)+R('เบี้ยสุขภาพ/ปี',o=>`<b>${f(d[o.k])}</b>`)+R('ส่วนต่างจากแผนประหยัดสุด',o=>dif(d[o.k]));
 document.getElementById('note').innerHTML=`* เบี้ยที่แสดงเป็น<b>เบี้ยสุขภาพล้วน</b> ยังไม่รวมเบี้ยสัญญาหลัก ${f(BASE)} บาท/ปี (ต้องซื้อคู่กัน)<br>* เบี้ยประกันสำหรับ${d.lbl} เป็นตัวเลขประมาณการ อาจเปลี่ยนแปลงตามการพิจารณารับประกันของบริษัท<br>* OPD สูงสุด/ปี = วงเงินต่อครั้ง × จำนวนครั้ง · เบี้ยรายเดือนเป็นค่าเฉลี่ย (เบี้ยรายปี ÷ 12)<br>* โปรดศึกษารายละเอียดความคุ้มครองและเงื่อนไขในกรมธรรม์ก่อนตัดสินใจ`;
}

const CID=new URLSearchParams(location.search).get('id');
let C=(typeof CUSTOMERS!=='undefined')&&CUSTOMERS[CID];
const DQ=new URLSearchParams(location.search).get('d');
if(!C&&DQ){try{C=JSON.parse(decodeURIComponent(escape(atob(DQ.replace(/-/g,'+').replace(/_/g,'/')))));}catch(e){C=null}}
if(!C){document.querySelector('.wrap').innerHTML='<div class="base">❌ ไม่พบข้อมูลแผน กรุณาติดต่อตัวแทนของท่าน</div>';}
else{const NM=new URLSearchParams(location.search).get('n');if(NM)C=Object.assign({},C,{name:NM});document.getElementById('who').textContent=C.icon+' '+(C.name?C.name+' · ':'')+C.lbl;document.title='แผนประกัน AIA · '+(C.name||C.lbl);render(C);}

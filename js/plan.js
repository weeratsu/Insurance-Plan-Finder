
const BASE=2539;
const f=n=>(typeof n==='number'&&!isNaN(n))?n.toLocaleString('en-US'):'รอเสนอ';
const LUMP='<div class="lump">✨ <b>แบบเหมาจ่าย</b> — ทุนสูง ไม่ต้องกังวลวงเงินแยกรายการ</div>';
function tot(r){if(!r)return '<div class="tot"><div class="y" style="font-size:20px">รอเสนอราคา</div></div>';const t=r+BASE;return `<div class="tot"><div class="y">${f(t)}</div><div class="mo">บาท/ปี · เฉลี่ย ~${f(Math.round(t/12))}/เดือน</div></div>`}
function row(a,b,no){return `<div class="row"><span>${a}</span><span${no?' class="no"':''}>${b}</span></div>`}
function render(d){
 const st=d.starter!=null;
 const mn=Math.min(d.saver,st?d.starter:Infinity);
 document.getElementById('grid').innerHTML=(st?`
 <div class="c"><span class="tag g">💰 ประหยัดสุด</span><h2>Health Starter (Balance)</h2><div class="sub">เบี้ยต่ำสุด มี OPD · เน้นใช้ รพ. ในเครือข่าย</div>
 <div class="lump" style="background:#fff7e6;color:#92400e">⚠️ <b>มีค่าใช้จ่ายร่วม</b> — รพ. ใน AIA Smart Network ไม่มีค่าใช้จ่ายร่วม · รพ. นอก Network จ่ายร่วม 20%</div>
 ${row('ค่าห้อง/วัน','4,500')}${row('OPD','7,000/ปี')}${row('เบี้ยสัญญาเพิ่มเติม',f(d.starter))}${row('เบี้ยสัญญาหลัก',f(BASE))}${tot(d.starter)}</div>`:'')+`
 <div class="c"><span class="tag g">${st?'⚖️ คุ้มค่า':'💰 ประหยัดสุด'}</span><h2>Health Saver 4000</h2><div class="sub">ครบทั้ง IPD + OPD ในงบสบายกระเป๋า</div>
 ${row('ค่าห้อง/วัน','4,000')}${row('OPD','1,500 × 30 ครั้ง/ปี')}${row('เบี้ยสัญญาเพิ่มเติม',f(d.saver))}${row('เบี้ยสัญญาหลัก',f(BASE))}${tot(d.saver)}</div>
 <div class="c"><span class="tag b">🏥 เน้นผู้ป่วยใน</span><h2>Health Happy 15 ล้าน</h2><div class="sub">วงเงินสูง ห้องดี ไม่มี OPD</div>${LUMP}
 ${row('วงเงินคุ้มครอง','15 ล้าน')}${row('ค่าห้อง/วัน','6,000')}${row('OPD','ไม่คุ้มครอง',1)}${row('เบี้ยสัญญาเพิ่มเติม',f(d.h15))}${row('เบี้ยสัญญาหลัก',f(BASE))}${tot(d.h15)}</div>
 <div class="c hl"><span class="tag">⭐ คุ้มครองครบที่สุด</span><h2>Health Happy 25 ล้าน</h2><div class="sub">วงเงินสูงสุด ห้องดีที่สุด + OPD</div>${LUMP}
 ${row('วงเงินคุ้มครอง','25 ล้าน')}${row('ค่าห้อง/วัน','9,000')}${row('OPD','2,000 × 30 ครั้ง/ปี')}${row('เบี้ยสัญญาเพิ่มเติม',f(d.h25))}${row('เบี้ยสัญญาหลัก',f(BASE))}${tot(d.h25)}</div>`;
 const dif=v=>v===mn?'–':'+'+f(v-mn);
 document.getElementById('tbl').innerHTML=`<tr><th>รายการ</th>${st?'<th>Health Starter</th>':''}<th>Health Saver 4000</th><th>Health Happy 15 ล้าน</th><th>Health Happy 25 ล้าน</th></tr>
 <tr><td>ค่าห้อง/วัน</td>${st?'<td>4,500</td>':''}<td>4,000</td><td>6,000</td><td>9,000</td></tr>
 <tr><td>OPD สูงสุด/ปี</td>${st?'<td>7,000</td>':''}<td>45,000</td><td>–</td><td>60,000</td></tr>
 ${st?'<tr><td>ค่าใช้จ่ายร่วม</td><td>นอก Network 20%</td><td>–</td><td>–</td><td>–</td></tr>':''}
 <tr><td>เบี้ยรวม/ปี</td>${st?`<td><b>${f(d.starter+BASE)}</b></td>`:''}<td><b>${f(d.saver+BASE)}</b></td><td><b>${f(d.h15+BASE)}</b></td><td><b>${f(d.h25+BASE)}</b></td></tr>
 <tr><td>ส่วนต่างจากแผนประหยัดสุด</td>${st?`<td>${dif(d.starter)}</td>`:''}<td>${dif(d.saver)}</td><td>${dif(d.h15)}</td><td>${dif(d.h25)}</td></tr>`;
 document.getElementById('note').innerHTML=`* เบี้ยประกันสำหรับ${d.lbl} เป็นตัวเลขประมาณการ อาจเปลี่ยนแปลงตามการพิจารณารับประกันของบริษัท<br>* OPD สูงสุด/ปี = วงเงินต่อครั้ง × จำนวนครั้ง · เบี้ยรายเดือนเป็นค่าเฉลี่ย (เบี้ยรายปี ÷ 12)<br>* โปรดศึกษารายละเอียดความคุ้มครองและเงื่อนไขในกรมธรรม์ก่อนตัดสินใจ`;
}

const CID=new URLSearchParams(location.search).get('id');
let C=(typeof CUSTOMERS!=='undefined')&&CUSTOMERS[CID];
const DQ=new URLSearchParams(location.search).get('d');
if(!C&&DQ){try{C=JSON.parse(decodeURIComponent(escape(atob(DQ.replace(/-/g,'+').replace(/_/g,'/')))));}catch(e){C=null}}
if(!C){document.querySelector('.wrap').innerHTML='<div class="base">❌ ไม่พบข้อมูลแผน กรุณาติดต่อตัวแทนของท่าน</div>';}
else{const NM=new URLSearchParams(location.search).get('n');if(NM)C=Object.assign({},C,{name:NM});document.getElementById('who').textContent=C.icon+' '+(C.name?C.name+' · ':'')+C.lbl;document.title='แผนประกัน AIA · '+(C.name||C.lbl);render(C);}

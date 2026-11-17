// ===== รายชื่อลูกค้า =====
// เพิ่มลูกค้าใหม่: copy 1 บรรทัด แล้วเปลี่ยน id (ให้เดายาก) + ตัวเลขเบี้ย
// ลิงก์ส่งลูกค้า: .../plan.html?id=<id>
// starter = เบี้ย Health Starter (ถ้าไม่เสนอ ให้ลบ starter ออก)
const CUSTOMERS={
 "f43-k7m2q":{brand:"aia",cat:"health",kind:"rider",rid:"health",g:"f",age:43,plans:[["Health Starter", null, 19500], ["Health Saver 4000", null, 26500], ["Health Happy 15M", null, 42900], ["Health Happy 25M", null, 53600]],url:"plans/health_f43.html",name:"",icon:"👩",lbl:"สุขภาพ · หญิง 43",saver:26500,h15:42900,h25:53600,starter:19500},
 "m25-x9p4t":{brand:"aia",cat:"health",kind:"rider",rid:"health",g:"m",age:25,plans:[["Health Saver 4000", null, 13400], ["Health Happy 15M", null, 21600], ["Health Happy 25M", null, 28000]],url:"plans/health_m25.html",name:"",icon:"👨",lbl:"สุขภาพ · ชาย 25",saver:13400,h15:21600,h25:28000},
 "rung-45":{brand:"aia",cat:"savings",kind:"main",g:"f",age:45,plans:[["AIA Saving Sure (NP)", 100000, 33448], ["AIA Endowment 15/25", 370000, 30710], ["AIA Excellent (Non Par)", 200000, 30980], ["5Pay10 (Non Par)", 35000, 30800]],icon:"👩",lbl:"ออมทรัพย์ · หญิง 45",url:"plans/savings_f45.html"},
 "captain-25":{brand:"aia",cat:"savings",kind:"main",g:"m",age:25,plans:[["5Pay10 (Non Par)", 30000, 26100], ["AIA Endowment 15/25", 350000, 28350], ["AIA Excellent (Non Par)", 170000, 25993]],icon:"👨",lbl:"ออมทรัพย์ · ชาย 25",url:"plans/savings_m25.html"},
 "pirung-74":{brand:"aia",cat:"life",kind:"main",g:"m",age:74,plans:[["Pay Life Plus 20Pay · เบี้ย 30,713", 250000, 30712.5], ["Pay Life Plus 20Pay · เบี้ย 25,000", 203500.2, 25000]],icon:"👨",lbl:"ประกันชีวิต · ชาย 74",url:"plans/life_m74.html"},
 "mae-68":{brand:"aia",cat:"life",kind:"main",g:"f",age:68,plans:[["Pay Life Plus 20Pay (NP)", 250000, 18690]],icon:"👩",lbl:"ประกันชีวิต · หญิง 68",url:"plans/life_f68.html"},
 "vorn-43":{brand:"aia",cat:"life",kind:"main",g:"m",age:43,plans:[["Pay Life Plus 20Pay (NP)", 600000, 20502]],icon:"👨",lbl:"ประกันชีวิต · ชาย 43",url:"plans/life_m43.html"},
 "allianz-self":{brand:"allianz",cat:"life",kind:"main",g:"m",age:39,plans:[["มาย ดับเบิล พลัส 25/20 (มีเงินปันผล)",300000,20652]],icon:"👨",lbl:"Allianz มาย ดับเบิล พลัส 25/20 · ชาย 39",url:"plans/allianz_m_self.html"},
 "toey-f43":{brand:"aia",cat:"life",kind:"main",g:"f",age:43,plans:[["20 Pay Life (NP)", 150000, 3808.5]],icon:"👩",lbl:"ประกันชีวิต · หญิง 43",url:"plans/life_f43.html"},
 "captain-life25":{brand:"aia",cat:"life",kind:"main",g:"m",age:25,plans:[["20 Pay Life (NP)", 100000, 1931]],icon:"👨",lbl:"ประกันชีวิต · ชาย 25",url:"plans/life_m25.html"},
 "maerung-70":{brand:"aia",cat:"life",kind:"main",g:"f",age:70,plans:[["Pay Life Plus 20Pay (NP)", 300000, 24729]],icon:"👩",lbl:"ประกันชีวิต · หญิง 70",url:"plans/life_f70.html"},
 "kung-40":{brand:"aia",cat:"savings",kind:"main",g:"f",age:40,plans:[["AIA Excellent (Non Par)",100000,15360],["5Pay10 (Non Par)",20000,17400],["AIA Endowment 15/25",120481.93,10000]],icon:"👩",lbl:"ออมทรัพย์ · หญิง 40",url:"plans/savings_f40.html"},
 "vorn-45":{brand:"aia",cat:"savings",kind:"main",g:"m",age:45,plans:[["5Pay10 (Non Par)", 28409.09, 25000], ["AIA Excellent (Non Par)", 161394.45, 25000], ["AIA Endowment 15/25", 301204.82, 25000]],icon:"👨",lbl:"ออมทรัพย์ · ชาย 45",url:"plans/savings_m45.html"},
 "rider_mpci_f43":{brand:"aia",cat:"mpci",kind:"rider",rid:"mpci",g:"f",age:43,plans:[["MPCI Plus (MPCI + Total Care)", 200000, 2008]],icon:"👩",lbl:"Multi-Pay CI Plus · หญิง 43",url:"plans/rider_mpci_f43.html"},
 "rider_mpci_m25":{brand:"aia",cat:"mpci",kind:"rider",rid:"mpci",g:"m",age:25,plans:[["MPCI Plus (MPCI + Total Care)", 1150000, 5807.5]],icon:"👨",lbl:"Multi-Pay CI Plus · ชาย 25",url:"plans/rider_mpci_m25.html"},
 "rider_ahc_m25":{brand:"aia",cat:"ahc",kind:"rider",rid:"ahc",g:"m",age:25,plans:[["AIA Health Cancer 10 หน่วย", 10, 1314]],icon:"👨",lbl:"Health Cancer · ชาย 25",url:"plans/rider_ahc_m25.html"},
 "rider_mpci_m43":{brand:"aia",cat:"mpci",kind:"rider",rid:"mpci",g:"m",age:43,plans:[["MPCI Plus (MPCI + Total Care)", 300000, 5061]],icon:"👨",lbl:"Multi-Pay CI Plus · ชาย 43",url:"plans/rider_mpci_m43.html"},
 "rider_ahc_m43":{brand:"aia",cat:"ahc",kind:"rider",rid:"ahc",g:"m",age:43,plans:[["AIA Health Cancer 10 หน่วย", 10, 3254]],icon:"👨",lbl:"Health Cancer · ชาย 43",url:"plans/rider_ahc_m43.html"},
};


// override จากหน้า setup.html (เก็บในเบราว์เซอร์)
(function(){try{const o=JSON.parse(localStorage.getItem('ipf_page_meta')||'{}');for(const k in o)if(CUSTOMERS[k])Object.assign(CUSTOMERS[k],o[k])}catch(e){}})();

const BRANDS={aia:"AIA",allianz:"Allianz Ayudhya"};
const CATS={life:"ประกันชีวิต",savings:"ออมทรัพย์",health:"สุขภาพ",mpci:"MPCI Plus",ahc:"Health Cancer",annuity:"บำนาญ"};

// ข้อมูลจากเอกสารกรมธรรม์จริง (ผูกด้วย page id) — ใช้เติมช่องที่ว่างในหน้าลูกค้า
const POLICY_DOCS={
 "mae-68":{no:"T228396402",date:"2022-01-30",end:"2053-01-30",pm:"card",doc:"policies/mum_aia.html"},
 "vorn-43":{no:"T242653943",date:"2024-12-25",end:"2080-12-25",pm:"card",doc:"policies/wr_aia.html"},
 "allianz-self":{no:"3088463667",date:"2020-11-29",end:"2045-11-29",doc:"policies/wr_allianz.html"}
};

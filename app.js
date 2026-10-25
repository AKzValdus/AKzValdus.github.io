(()=>{
const STORE='aiCheckpointRLBR:v1';
const SUPABASE_URL='https://wvgxvgxrmhntcpwemhqq.supabase.co';
const SUPABASE_KEY='sb_publishable_7aFVVAlAocwzxtHmjkAbfg_ho1BTqIG';
let records=[];
let cloud=null;
try{records=JSON.parse(localStorage.getItem(STORE)||'[]')}catch(e){}
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
function persist(){try{localStorage.setItem(STORE,JSON.stringify(records));return true}catch(e){return false}}
function mean(a){return a.length?a.reduce((x,y)=>x+y,0)/a.length:null}
function state(ok,ready){return ready?(ok?'ผ่าน':'ไม่ผ่าน'):'รอข้อมูล'}
function card(name,value,status,detail){return `<article class="card"><span class="tag">${name} · ${status}</span><div class="metric">${value}</div><p class="muted">${detail}</p></article>`}
function refresh(){if(!cloud){$('#dash').innerHTML=card('ผลประเมิน','กำลังโหลด…','', 'กำลังเชื่อมต่อฐานข้อมูลกลาง');return}const r=cloud.reaction,l=cloud.learning,b=cloud.behavior,z=cloud.results;const reactionForms=Math.floor(r.count/5);$('#dash').innerHTML=card('Reaction',r.average===null?'—':r.average+'/5',state(r.passed,reactionForms>0),`${reactionForms} แบบ · เป้าหมายเฉลี่ย ≥4.20`)+card('Learning',l.percent===null?'—':l.percent+'%',state(l.passed,l.count>0),`ผ่าน ${l.passed_count}/${l.count} คน · เป้าหมาย ≥80%`)+card('Behavior',b.percent===null?'—':b.percent+'%',state(b.passed,b.count>0),`ผ่าน ${b.passed_count}/${b.count} คน · เป้าหมาย ≥70%`)+card('Results',z.percent===null?'—':z.percent+'%',state(z.passed,z.count>0),`ถึงเป้าหมาย ${z.passed_count}/${z.count} ตัวชี้วัด`)}
async function rpc(name,body={}){const response=await fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`,{method:'POST',headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`,'Content-Type':'application/json'},body:JSON.stringify(body)});if(!response.ok)throw new Error(await response.text());return response.json()}
async function loadSummary(){try{cloud=await rpc('get_ai_checkpoint_summary');refresh()}catch(e){$('#dash').innerHTML=card('เชื่อมต่อไม่ได้','—','', 'ลองโหลดผลอีกครั้งเมื่อออนไลน์')}}
function message(btn,text){const box=btn.nextElementSibling;if(box){box.textContent=text;box.classList.add('show')}}
$$('.submit').forEach(btn=>btn.onclick=async()=>{
 const panel=btn.closest('.panel');const kind={reaction:'reaction',learning:'learning',behavior:'behavior',results:'results'}[panel.id];const item={kind,at:new Date().toISOString()};
 if(kind==='reaction'){item.scores=[0,1,2,3,4].map(i=>Array.from(panel.querySelectorAll(`input[name="r${i}"]`)).findIndex(x=>x.checked)+1);if(item.scores.some(n=>n<1||n>5)){message(btn,'กรุณาให้คะแนนครบทุกข้อ');return}item.comment=panel.querySelector('textarea')?.value||''}
 if(kind==='learning'){if($('#score').value===''){message(btn,'กรุณากรอกคะแนนจริงระหว่าง 0 ถึง 10');return}item.score=Number($('#score').value);if(!Number.isFinite(item.score)||item.score<0||item.score>10){message(btn,'กรุณากรอกคะแนนระหว่าง 0 ถึง 10');return}}
 if(kind==='behavior'){item.scores=[0,1,2,3].map(i=>Array.from(panel.querySelectorAll(`input[name="b${i}"]`)).findIndex(x=>x.checked));if(item.scores.some(n=>n<0)){message(btn,'กรุณาให้คะแนนครบทุกข้อ');return}item.evidence=panel.querySelector('textarea')?.value||''}
 if(kind==='results'){const inputs=panel.querySelectorAll('input.text'),a=Number(inputs[0]?.value),b=Number(inputs[1]?.value),metric=panel.querySelector('select')?.selectedIndex||0;if(!inputs[0]?.value||!inputs[1]?.value){message(btn,'กรุณากรอกค่าฐานและค่าหลังอบรม');return}item.baseline=a;item.after=b;item.metric=metric;item.pass=metric===0?b-a>=15:a>0&&(a-b)/a>=.2}
 try{const data=kind==='reaction'?{scores:item.scores,comment:item.comment}:kind==='behavior'?{scores:item.scores,evidence:item.evidence}:kind==='learning'?{score:item.score}:{baseline:item.baseline,after:item.after,metric:item.metric};await rpc('submit_ai_checkpoint_assessment',{p_submission_id:crypto.randomUUID(),p_kind:kind,p_data:data});records.push(item);persist();await loadSummary();message(btn,'ส่งแบบประเมินเข้าสู่ระบบส่วนกลางแล้ว')}catch(e){message(btn,'ยังส่งไม่สำเร็จ กรุณาลองใหม่เมื่อเชื่อมต่ออินเทอร์เน็ตได้')}
});
$('#submit').onclick=()=>{const checked=[...$$('#activity .check input')].filter(x=>x.checked).length,e=$('#ev');e.textContent=checked>=2&&$('#revision').value.trim()?'บันทึกหลักฐานในหน้านี้แล้ว (ไม่มีการส่งข้อมูลออก)':'กรุณาติ๊ก checklist อย่างน้อย 2 ข้อและเขียนจุดที่แก้ไข';e.classList.add('show')};
function download(name,data,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type}));a.download=name;a.click();URL.revokeObjectURL(a.href)}
$('#exportJson').onclick=()=>download('ai-checkpoint-data.json',JSON.stringify({exportedAt:new Date().toISOString(),records},null,2),'application/json');
$('#exportCsv').onclick=()=>{const rows=[['วันที่','ระดับ','คะแนน','รายละเอียด'],...records.map(x=>[x.at,x.kind,x.score??(x.scores||[]).join('|'),x.comment||x.evidence||(x.kind==='results'?`ฐาน=${x.baseline}; หลัง=${x.after}; ผ่าน=${x.pass}`:'')])];download('ai-checkpoint-data.csv','\ufeff'+rows.map(r=>r.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')).join('\r\n'),'text/csv;charset=utf-8')};
$('#reset').onclick=()=>{if(confirm('ลบสำเนาผลประเมินจากเบราว์เซอร์เครื่องนี้หรือไม่?')){records=[];persist();const m=$('#manageMsg');m.textContent='ลบเฉพาะสำเนาในเครื่องนี้ ข้อมูลส่วนกลางยังคงอยู่';m.classList.add('show')}};
$$('.scale input[type="radio"]').forEach(x=>x.checked=false);
$('#refreshSummary').onclick=loadSummary;
loadSummary();
})();

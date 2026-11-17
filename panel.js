const $=id=>document.getElementById(id);
const ids=['name','feat','colors','price0','price1','deal','cta','char','set'];
const cap=s=>s?s[0].toUpperCase()+s.slice(1):s;
const short=s=>s.split(',').slice(0,2).join(',').trim();

function data(){const g=i=>$(i).value.trim();const r={name:g('name'),feat:g('feat'),colors:g('colors'),p0:g('price0'),p1:g('price1'),deal:g('deal'),cta:g('cta')};const k=detect(r.name);r.type=k.t;r.en=k.en
 const sp=r.en||r.name;r.ch=g('char').replaceAll('{sp}',sp);r.set=g('set').replaceAll('{sp}',sp);return r}

// Mỗi loại sản phẩm: cách giới thiệu (s2), cách dùng thử (demo), câu khen (p2, p3)
const TYPES={
 helmet:{demo:'puts one on her head, fastens the chin strap, then flips the clear visor down and up',show:'knocks lightly on the hard shell and turns it to show the visor and inner padding',p2:'đội vô là an tâm liền',p3:'vỏ cứng cáp, kính trong, lót êm, đội cả ngày không bí'},
 cap:{demo:'puts one on and adjusts the strap at the back',show:'turns it to show the stitching and logo',p2:'đội lên là đẹp liền',p3:'khóa sau chỉnh size, ai đội cũng vừa'},
 clothes:{demo:'holds one against her body to show the fit, then stretches the fabric a little toward the camera',show:'rubs the fabric between her fingers and shows the stitching up close',p2:'mặc lên là xinh liền',p3:'vải mềm mát, đường may chắc, mặc thoải mái cả ngày'},
 shoes:{demo:'puts one pair on, takes a few steps toward the camera, then lifts a foot to show the sole',show:'bends the sole and shows the side profile up close',p2:'mang vô là êm chân liền',p3:'đế êm, chống trơn, mang đi cả ngày không mỏi'},
 bag:{demo:'hangs one on her shoulder, opens the zipper and shows the compartments inside',show:'shows the zipper, strap and inner lining up close',p2:'đeo lên là sang liền',p3:'nhiều ngăn, khóa kéo êm, đựng được nhiều đồ'},
 beauty:{demo:'applies a little on the back of her hand and blends it, showing the texture to the camera',show:'opens the cap and shows the texture inside up close',p2:'dùng thử là mê liền',p3:'thấm nhanh, không bết, dùng hằng ngày rất hợp'},
 home:{demo:'demonstrates using it on the table step by step, showing how easy it is',show:'shows the material and the main parts up close',p2:'nhà nào cũng cần nè',p3:'chắc chắn, dễ dùng, dễ vệ sinh'},
 tech:{demo:'turns it on and shows it working, pointing at the main features',show:'shows the ports, buttons and finish up close',p2:'xài là sướng liền',p3:'chạy ổn định, pin trâu, dùng bền'},
 food:{demo:'opens one package, takes a bite and reacts with a delighted expression',show:'shows the package front and the product inside up close',p2:'ăn là ghiền liền',p3:'thơm ngon, đóng gói kỹ, ăn hoài không chán'},
 other:{demo:'picks one up and demonstrates how it is used',show:'turns it slowly to show its details',p2:'xài là mê liền',p3:'hàng chắc chắn, ai dùng cũng ưng'}
};
// Tự nhận loại sản phẩm từ tên tiếng Việt
const DETECT=[
 [/bảo hiểm|nón bh|\bbh\b|fullface|3\/4/i,'helmet','motorcycle helmet'],
 [/lưỡi trai|nón kết|mũ kết|bucket|nón vải|mũ vải/i,'cap','cap'],
 [/giày|dép|sandal|sneaker|guốc|boot/i,'shoes','pair of shoes'],
 [/túi|balo|ba lô|ví\b|bóp|cặp/i,'bag','bag'],
 [/áo|quần|váy|đầm|đồ bộ|đồ ngủ|vớ|tất|khăn/i,'clothes','clothing item'],
 [/kem|son|serum|sữa rửa|dầu gội|sữa tắm|nước hoa|mỹ phẩm|mặt nạ|toner/i,'beauty','beauty product'],
 [/tai nghe|loa|sạc|cáp|pin dự phòng|đồng hồ|quạt|đèn|chuột|bàn phím|điện thoại/i,'tech','electronic gadget'],
 [/nồi|chảo|bát|chén|cốc|kệ|móc|chổi|khay|bình|dao|thớt|gối|chăn|mền|gia dụng/i,'home','household item'],
 [/bánh|kẹo|snack|(^|\s)khô(\s|$)|mứt|(^|\s)trà|cà phê|hạt|đồ ăn|thực phẩm/i,'food','snack package']
];
function detect(n){for(const [re,t,en] of DETECT)if(re.test(n))return{t,en:`${en} (${n})`};return{t:'other',en:n}}
function scenes(d){const T=TYPES[d.type]||TYPES.other,P=d.en||d.name;return[
 {t:'0 to 8 seconds',goal:'Gây chú ý',cam:'medium shot, slow push-in',en:`she spreads her arms toward the huge pile of ${P} behind her, excited and surprised expression, looking straight into the camera`,say:'Trời ơi kho dồn cả ngàn món nè, hôm nay chị xả hết luôn nha!'},
 {t:'8 to 16 seconds',goal:'Giới thiệu sản phẩm',cam:'close-up on the product in her hands, then rack focus to her face',en:`she picks up one ${P}, holds it close to the camera and ${T.show}, smiling`,say:`${cap(d.name)} nè, ${short(d.feat)}, ${T.p2}.`},
 {t:'16 to 24 seconds',goal:'Màu sắc, chất lượng',cam:'medium close-up, slight handheld movement',en:`she shows several ${P} in different colors (${d.colors}) lined up on a table, then ${T.demo}`,say:`Có đủ màu ${d.colors}, ${T.p3} luôn.`},
 {t:'24 to 32 seconds',goal:'Giá và ưu đãi',cam:'medium shot, quick zoom on the price sign',en:`she holds up a cardboard sign with the old price ${d.p0} crossed out and the new price ${d.p1} written big in red marker, amazed expression`,say:`Giá gốc ${d.p0}, giờ xả kho còn ${d.p1} thôi, ${d.deal} luôn nha!`},
 {t:'32 to 40 seconds',goal:'Kêu gọi chốt đơn',cam:'medium shot, static, she leans toward the camera',en:'she points down toward the bottom corner of the frame, winks and waves goodbye with a big smile',say:`Số lượng có hạn, ${d.cta} chốt liền nha cả nhà ơi!`}
]}

function build(d){
 const S=scenes(d);
 return{
  p360:`Dựa trên các ảnh sản phẩm thật tôi tải lên (${d.name}), hãy tạo MỘT ảnh vuông 1:1 dạng "ảnh xoay 360 độ" trên nền trắng tinh, chụp studio, ánh sáng mềm đều, có bóng đổ nhẹ dưới sản phẩm.
Bố cục lưới 3×3 gồm 8 góc nhìn của CÙNG MỘT sản phẩm, đặt vòng quanh ô ở giữa:
- Hàng trên: "Trước Trái 45°" | "Chính Diện" | "Trước Phải 45°"
- Hàng giữa: "Bên Trái" | (ô giữa) | "Bên Phải"
- Hàng dưới: "Sau Trái 45°" | "Chính Sau" | "Sau Phải 45°"
Ô ở giữa: chữ "360°" lớn màu xanh dương đậm, có mũi tên cong xoay vòng màu xanh bao quanh bên dưới.
Dưới mỗi góc nhìn là một nhãn chữ tiếng Việt đúng như trên, đặt trong khung bo tròn màu xám nhạt, chữ xám đậm.
Các góc nhìn được nối với nhau bằng mũi tên nét đứt màu xám theo chiều vòng tròn.
Mỗi góc nhìn sản phẩm có cùng kích thước, căn giữa ô, góc máy ngang tầm sản phẩm.
Giữ CHÍNH XÁC màu sắc, logo, chữ in, tem, họa tiết, chất liệu (${d.feat}), đường nét và tỉ lệ thật của sản phẩm. Không thêm, bớt hay bịa chi tiết nào không có trong ảnh gốc. Phần nào không thấy trong ảnh gốc thì suy ra hợp lý, đồng nhất với các mặt còn lại.`,
  img:S.map((s,i)=>`Vertical 9:16 photorealistic photo, scene ${i+1} of 5. ${d.ch}. Setting: ${d.set}. Action: ${s.en}. The ${d.en||d.name} must look exactly like the attached product reference image (same color, logo, stitching and shape). Camera: ${s.cam}. Natural skin texture, sharp focus, realistic commercial TikTok style, no text other than the sign, no watermark.\nUse the attached product image as exact reference. Keep the same woman as the previous scenes.`),
  veo:S.map((s,i)=>`SCENE ${i+1} — ${s.t}\nVisual/action: ${d.ch}, standing in ${d.set}. ${cap(s.en)}.\nCamera: ${s.cam}, vertical 9:16.\nDialogue (spoken in Vietnamese, exact words): "${s.say}"\nVoice: young Vietnamese woman, Southern Vietnamese accent (Saigon), warm, energetic, natural friendly sales tone, clear pronunciation, lip-sync matches the dialogue.\nAudio: light ambient warehouse sound, no background music.\nStyle: realistic, natural lighting, consistent character and product with the reference image; the product must look exactly like in the reference image. No subtitles, no on-screen text, no captions.`),
  say:S.map(s=>s.goal+': "'+s.say+'"')
 };
}

function status(t){$('st').textContent=t;clearTimeout(status.t);status.t=setTimeout(()=>$('st').textContent='',5000)}

// Hàm này chạy bên trong trang Flow
function fillFlow(text){
 const vis=e=>{const r=e.getBoundingClientRect();return r.width>50&&r.height>15};
 const ok=e=>e&&(e.tagName==='TEXTAREA'||e.isContentEditable||e.getAttribute('role')==='textbox');
 let el=document.activeElement;
 if(!ok(el)){const c=[...document.querySelectorAll('textarea,[contenteditable="true"],[role="textbox"]')].filter(vis);
  el=c.sort((a,b)=>b.getBoundingClientRect().top-a.getBoundingClientRect().top)[0]}
 if(!el)return{ok:false,msg:'Không thấy ô câu lệnh. Bấm vào ô nhập trên Flow rồi thử lại.'};
 el.focus();
 if(el.tagName==='TEXTAREA'){
  Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(el,text);
  el.dispatchEvent(new Event('input',{bubbles:true}));
 }else{document.execCommand('selectAll',false,null);document.execCommand('insertText',false,text)}
 return{ok:true,msg:'Đã dán vào Flow. Kiểm tra ảnh đã gắn rồi bấm tạo video.'};
}

async function toFlow(text){
 const [tab]=await chrome.tabs.query({active:true,currentWindow:true});
 if(!tab||!/^https:\/\/(labs\.google|flow\.google\.com)\//.test(tab.url||'')){status('Hãy mở tab Google Flow (labs.google/flow) rồi bấm lại.');return}
 try{const [r]=await chrome.scripting.executeScript({target:{tabId:tab.id},func:fillFlow,args:[text]});status(r.result.msg)}
 catch(e){status('Không dán được: '+e.message)}
}
async function copy(text){try{await navigator.clipboard.writeText(text);status('Đã copy.')}catch(e){status('Không copy được.')}}

function card(title,text,flow){
 const c=document.createElement('div');c.className='card';
 c.innerHTML='<div class="ch"><b></b><button>Copy</button></div><pre></pre>';
 c.querySelector('b').textContent=title;c.querySelector('pre').textContent=text;
 c.querySelector('button').onclick=()=>copy(text);
 if(flow){const b=document.createElement('button');b.className='go';b.textContent='Dán vào Flow';b.onclick=()=>toFlow(text);c.querySelector('.ch').append(b)}
 return c;
}
function h(t,hint){const o=$('out');const e=document.createElement('h2');e.textContent=t;o.append(e);if(hint){const p=document.createElement('p');p.className='hint';p.textContent=hint;o.append(p)}}

function render(){
 const d=data(),b=build(d);$('out').innerHTML='';
 h('Prompt Veo 3 (Google Flow)','Chuột phải ảnh canhN → Thêm vào câu lệnh → bấm Dán vào Flow ở SCENE N.');
 b.veo.forEach((t,i)=>$('out').append(card('SCENE '+(i+1),t,true)));
 h('Ảnh từng cảnh (ChatGPT)','Mỗi cảnh một tin nhắn, đính kèm ảnh 360°.');
 b.img.forEach((t,i)=>$('out').append(card('Ảnh cảnh '+(i+1),t)));
 h('Ảnh 360° (ChatGPT)');$('out').append(card('Prompt 360°',b.p360));
 h('Lời thoại 5 cảnh');$('out').append(card('Kịch bản',b.say.join('\n')));
 const s={};ids.forEach(i=>s[i]=$(i).value);chrome.storage.local.set({xk:s});
}

chrome.storage.local.get('xk',r=>{if(r.xk)ids.forEach(i=>{if(r.xk[i]!==undefined)$(i).value=r.xk[i]});else $('form').open=true;render()});
ids.forEach(i=>{$(i).addEventListener('input',render);$(i).addEventListener('change',render)});

// ================= TỰ ĐỘNG: ChatGPT (OpenAI API) → Google Flow =================
const IMG_KEYS=['p360','c1','c2','c3','c4','c5'];
let imgs={}; // key -> dataURL
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const toDataURL=b=>new Promise(r=>{const f=new FileReader();f.onload=()=>r(f.result);f.readAsDataURL(b)});
const fromDataURL=async u=>(await fetch(u)).blob();
function stick(t){$('st').textContent=t;clearTimeout(status.t)}

chrome.storage.local.get('xkImgs',r=>{if(r.xkImgs){imgs=r.xkImgs;gallery()}});

function gallery(){
 const g=$('gal');g.innerHTML='';
 IMG_KEYS.slice(1).forEach(k=>{if(!imgs[k])return;
  const f=document.createElement('figure');f.innerHTML='<img><figcaption></figcaption>';
  f.querySelector('img').src=imgs[k];f.querySelector('figcaption').textContent='Cảnh '+k[1];g.append(f)});
}

// Nhận 5 ảnh làm tay từ ChatGPT Plus; sắp theo số trong tên file (canh1…canh5)
$('scenes').onchange=async()=>{
 const num=f=>+(f.name.match(/\d+/)||[99])[0];
 const files=[...$('scenes').files].sort((a,b)=>num(a)-num(b)||a.name.localeCompare(b.name)).slice(0,5);
 imgs={};for(let i=0;i<files.length;i++)imgs['c'+(i+1)]=await toDataURL(files[i]);
 gallery();chrome.storage.local.set({xkImgs:imgs});
 status(files.length<5?`Mới có ${files.length}/5 ảnh, chọn đủ 5 ảnh cảnh.`:'Đã nhận 5 ảnh. Mở Google Flow rồi bấm ②.');
};

// Chạy bên trong trang Flow: tải ảnh → chuột phải "Thêm vào câu lệnh" → dán prompt → bấm →
async function flowScene(dataUrl,fname,text,autoGo){
 const wait=ms=>new Promise(r=>setTimeout(r,ms));
 const vis=e=>{const r=e.getBoundingClientRect();return r.width>8&&r.height>8};
 const lab=e=>((e.getAttribute('aria-label')||'')+' '+(e.getAttribute('title')||'')+' '+e.textContent).replace(/\s+/g,' ').trim().toLowerCase();
 const clickables=()=>[...document.querySelectorAll('button,[role="button"],[role="tab"],[role="radio"],[role="menuitem"],[role="option"],li,a')].filter(vis);
 const findText=re=>clickables().find(b=>re.test(lab(b)));
 const box=()=>[...document.querySelectorAll('textarea,[contenteditable="true"],[role="textbox"]')].filter(vis)
   .sort((a,b)=>b.getBoundingClientRect().top-a.getBoundingClientRect().top)[0];
 const tiles=()=>[...document.querySelectorAll('img,video')].filter(e=>{const r=e.getBoundingClientRect();return r.width>80&&r.height>80&&!e.closest('[role="dialog"]')});
 const log=[];
 // 0) tự chuyển sang chế độ Video (Veo) + 9:16
 const isVid=b=>!!b&&/veo|video\s*·/.test(lab(b));
 const modeBtn=()=>clickables().filter(b=>/nano banana|imagen|veo|video\s*·/.test(lab(b))).sort((a,b)=>b.getBoundingClientRect().top-a.getBoundingClientRect().top)[0];
 const last=(re)=>clickables().filter(b=>re.test(lab(b))).sort((a,b)=>a.textContent.length-b.textContent.length)[0]; // phần tử nhỏ nhất khớp
 let mb=modeBtn();
 if(!isVid(mb)){
  const menuOpen=()=>last(/(^|\s)video$/);
  if(!menuOpen()&&mb){mb.click();await wait(1000)}
  const vt=menuOpen();if(vt){vt.click();await wait(1200)}
  const ratio=last(/(^|\s)9:16$/);if(ratio){ratio.click();await wait(800)}
  mb=modeBtn();
  if(!isVid(mb)){
   const dd=clickables().find(b=>/nano banana|imagen/.test(lab(b)));if(dd){dd.click();await wait(1000);const v=last(/veo/);if(v){v.click();await wait(1000)}}
  }
  document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',code:'Escape',bubbles:true}));
  document.activeElement?.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',code:'Escape',bubbles:true}));
  await wait(800);
  if(last(/(^|\s)video$/)){box()?.click();await wait(600)} // đóng menu nếu còn mở
  mb=modeBtn();
  if(!isVid(mb))return{ok:false,msg:'không tự chuyển được sang chế độ Video (Veo). Hãy chuyển tay 1 lần rồi bấm lại'};
  log.push('đã chuyển sang Veo 9:16');
 }
 // 1) tải ảnh lên + gắn vào câu lệnh
 const blob=await (await fetch(dataUrl)).blob();
 const file=new File([blob],fname,{type:blob.type||'image/png'});
 const mkDT=()=>{const dt=new DataTransfer();dt.items.add(file);return dt};
 const barRect=()=>{const e=box();if(!e)return null;let p=e;for(let k=0;k<6&&p.parentElement;k++){p=p.parentElement;if(p.getBoundingClientRect().height>90)break}return p.getBoundingClientRect()};
 const inBar=()=>{const R=barRect();if(!R)return 0;return [...document.querySelectorAll('img')].filter(i=>{const r=i.getBoundingClientRect();return r.width>10&&r.top>=R.top-80&&r.bottom<=R.bottom+5&&r.left>=R.left-5&&r.right<=R.right+5}).length};
 const before=tiles().length,barBefore=inBar();
 const changed=async(ms)=>{for(let t=0;t<ms/500;t++){if(tiles().length>before||inBar()>barBefore)return true;await wait(500)}return false};
 let up=false;
 // a) ô chọn file có sẵn
 let inp=[...document.querySelectorAll('input[type=file]')].pop();
 if(inp){inp.files=mkDT().files;inp.dispatchEvent(new Event('change',{bubbles:true}));up=await changed(30000);if(up)log.push('tải bằng ô file')}
 // b) kéo thả: ưu tiên giữa trang (chỉ vào thư viện, không trùng), sau đó mới thử ô câu lệnh
 if(!up){
  const mid=document.elementFromPoint(innerWidth/2,innerHeight*0.35);
  for(const [tgt,ms] of [[mid,30000],[box(),20000]]){
   if(!tgt)continue;
   const R=tgt.getBoundingClientRect(),o=()=>({bubbles:true,cancelable:true,composed:true,dataTransfer:mkDT(),clientX:R.left+R.width/2,clientY:R.top+R.height/2});
   for(const ev of ['dragenter','dragover','drop'])tgt.dispatchEvent(new DragEvent(ev,o()));
   if(await changed(ms)){up=true;log.push('tải bằng kéo thả');break}
  }
 }
 // c) bấm "+" ở ô câu lệnh, chặn hộp thoại chọn file của máy
 if(!up){
  const orig=HTMLInputElement.prototype.click;let caught=null;
  HTMLInputElement.prototype.click=function(){if(this.type==='file'){caught=this;return}return orig.call(this)};
  try{
   const R=barRect();
   const plus=R&&[...document.querySelectorAll('button')].filter(b=>{const r=b.getBoundingClientRect();return vis(b)&&r.top>=R.top&&r.bottom<=R.bottom+5&&r.left<R.left+R.width*0.15}).sort((a,b)=>a.getBoundingClientRect().left-b.getBoundingClientRect().left)[0];
   if(plus){plus.click();await wait(1200);
    if(!caught){const u=findText(/tải lên|upload|từ máy|từ thiết bị|computer|device/);if(u){u.click();await wait(1200)}}
    if(!caught)caught=[...document.querySelectorAll('input[type=file]')].pop();
    if(caught){caught.files=mkDT().files;caught.dispatchEvent(new Event('change',{bubbles:true}));up=await changed(30000);if(up)log.push('tải bằng nút +')}
   }
  }finally{HTMLInputElement.prototype.click=orig}
  document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
 }
 if(!up)return{ok:false,msg:'không tải được ảnh lên Flow (đã thử ô file, kéo thả, nút +)'};
 await wait(1500);
 // 2) nếu ảnh chưa nằm trong ô câu lệnh: chuột phải ảnh mới nhất → "Thêm vào câu lệnh"
 if(inBar()<=barBefore){
  const tile=tiles().sort((a,b)=>{const A=a.getBoundingClientRect(),B=b.getBoundingClientRect();return A.top-B.top||A.left-B.left})[0];
  if(!tile)return{ok:false,msg:log.concat('không thấy ảnh vừa tải').join(', ')};
  const r=tile.getBoundingClientRect(),o={bubbles:true,cancelable:true,clientX:r.left+r.width/2,clientY:r.top+r.height/2,button:2};
  tile.dispatchEvent(new PointerEvent('pointerdown',o));tile.dispatchEvent(new MouseEvent('mousedown',o));tile.dispatchEvent(new MouseEvent('contextmenu',o));
  await wait(800);
  const add=findText(/thêm vào câu lệnh|add to prompt/);
  if(!add)return{ok:false,msg:log.concat('không thấy menu "Thêm vào câu lệnh", hãy gắn ảnh tay').join(', ')};
  add.click();await wait(1500);
 }
 log.push('đã gắn ảnh');
 // 3) dán prompt
 const el=box();if(!el)return{ok:false,msg:log.concat('không thấy ô câu lệnh').join(', ')};
 el.focus();
 if(el.tagName==='TEXTAREA'){Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(el,text);el.dispatchEvent(new Event('input',{bubbles:true}))}
 else{document.execCommand('selectAll',false,null);document.execCommand('insertText',false,text)}
 log.push('đã dán prompt');
 if(!autoGo)return{ok:true,msg:log.join(', ')};
 // 4) bấm nút gửi →; nếu Flow đang bận thì chờ và bấm lại (tối đa ~5 phút)
 const findGo=()=>{const e=box();if(!e)return null;const er=e.getBoundingClientRect();
  return [...document.querySelectorAll('button')].filter(b=>vis(b)&&b.getBoundingClientRect().top>er.top-20&&b.getBoundingClientRect().left>er.left+er.width*0.6)
   .sort((a,b)=>b.getBoundingClientRect().right-a.getBoundingClientRect().right||b.getBoundingClientRect().bottom-a.getBoundingClientRect().bottom)[0]};
 const promptEmpty=()=>{const e=box();return (e?.value??e?.textContent??'').trim().length<50};
 const count=()=>tiles().length;
 // Đã gửi = lưới có thêm ô mới HOẶC ô câu lệnh đã trống. Không bấm lại trước 20 giây để tránh tạo trùng.
 for(let t=0;t<15;t++){
  const n0=count();
  const go=findGo();
  if(go&&!go.disabled&&go.getAttribute('aria-disabled')!=='true')go.click();
  for(let k=0;k<20;k++){
   await wait(1000);
   if(count()>n0||promptEmpty()){
    if(!promptEmpty()){const e=box();e.focus();if(e.tagName==='TEXTAREA'){Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(e,'');e.dispatchEvent(new Event('input',{bubbles:true}))}else{document.execCommand('selectAll',false,null);document.execCommand('delete')}}
    log.push('đã gửi'+(t?` (sau ${t} lần thử lại)`:''));return{ok:true,msg:log.join(', ')};
   }
  }
 }
 return{ok:false,msg:log.concat('Flow không nhận lệnh sau 5 phút (có thể hết lượt/tín dụng hoặc đang giới hạn số video cùng lúc)').join(', ')};
}

// Thu thập thông tin giao diện Flow để gửi cho người hỗ trợ sửa lỗi
function flowDiag(){
 const vis=e=>{const r=e.getBoundingClientRect();return r.width>4&&r.height>4};
 const d=e=>{const r=e.getBoundingClientRect();return{tag:e.tagName,aria:e.getAttribute('aria-label'),text:e.textContent.replace(/\s+/g,' ').trim().slice(0,40),x:Math.round(r.left),y:Math.round(r.top),dis:e.disabled||undefined}};
 return JSON.stringify({url:location.href,files:document.querySelectorAll('input[type=file]').length,
  boxes:[...document.querySelectorAll('textarea,[contenteditable="true"],[role="textbox"]')].filter(vis).map(d),
  buttons:[...document.querySelectorAll('button,[role="button"],[role="menuitem"]')].filter(vis).map(d)});
}

$('runFlow').onclick=async()=>{
 if(!IMG_KEYS.slice(1).every(k=>imgs[k])){status('Chưa đủ 5 ảnh cảnh, hãy chọn ảnh canh1…canh5.');return}
 const [tab]=await chrome.tabs.query({active:true,currentWindow:true});
 if(!tab||!/^https:\/\/(labs\.google|flow\.google\.com)\//.test(tab.url||'')){status('Hãy mở dự án Google Flow ở tab đang xem rồi bấm lại.');return}
 const b=build(data()),autoGo=$('autoGo').checked;$('runFlow').disabled=true;
 try{
  const st=Math.min(5,Math.max(1,+$('startAt').value||1))-1;
  for(let i=st;i<5;i++){
   stick(`Flow: đang làm SCENE ${i+1}/5…`);
   const [r]=await chrome.scripting.executeScript({target:{tabId:tab.id},world:'MAIN',func:flowScene,args:[imgs['c'+(i+1)],`canh${i+1}.png`,b.veo[i],autoGo]});
   if(!r.result.ok){$('startAt').value=i+1;stick(`SCENE ${i+1} dừng: ${r.result.msg}. Bấm ② để chạy tiếp từ cảnh ${i+1}.`);return}
   if(!autoGo){stick(`SCENE ${i+1}: ${r.result.msg}. Kiểm tra rồi bấm → trên Flow (bật "Tự bấm" để chạy liền 5 cảnh).`);return}
   await sleep(4000);
  }
  $('startAt').value=1;status('Đã gửi đủ 5 cảnh. Chờ Flow render xong rồi tải từng video về.');
 }catch(e){stick('Lỗi Flow: '+e.message)}
 finally{$('runFlow').disabled=false}
};

$('diag').onclick=async()=>{
 const [tab]=await chrome.tabs.query({active:true,currentWindow:true});
 try{const [r]=await chrome.scripting.executeScript({target:{tabId:tab.id},func:flowDiag});await navigator.clipboard.writeText(r.result);status('Đã copy thông tin chẩn đoán. Dán gửi cho người hỗ trợ.')}
 catch(e){status('Không chẩn đoán được: '+e.message)}
};

// Xóa 5 ảnh cảnh đã chọn
function clearImgs(){imgs={};$('scenes').value='';gallery();chrome.storage.local.remove('xkImgs');$('startAt').value=1}
$('clrImg').onclick=()=>{clearImgs();status('Đã xóa ảnh.')};

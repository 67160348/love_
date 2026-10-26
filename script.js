const screens = [...document.querySelectorAll('.screen')];
const passForm = document.getElementById('passForm');
const passcode = document.getElementById('passcode');
const passError = document.getElementById('passError');
const messages = [
  {title:'เค้ามีเรื่องอยากบอก 💌', text:'เค้ามีเรื่องอยากบอกเธอมาหลายวันแล้ว แต่เค้าไม่รู้จะเริ่มต้นยังไงดี 🥺'},
  {title:'ขอโทษนะคนดี 🥺', text:'สามวันที่ผ่านมา เค้าขอโทษนะที่ชวนทะเลาะกัน เค้ารู้ว่าบางครั้งคำพูดหรือการกระทำของเค้าอาจทำให้เธอเสียใจ'},
  {title:'เค้าขอโทษจริง ๆ 💗', text:'เค้าขอโทษจริง ๆ นะ เค้าอาจจะง้อไม่เก่ง ไม่รู้ว่าต้องพูดยังไงให้เธอหายโกรธ แต่เค้าอยากให้เธอรู้ว่าเค้าแคร์ความรู้สึกของเธอมาก ๆ เลย'},
  {title:'เราค่อย ๆ คุยกันนะ', text:'เค้าไม่อยากให้เรื่องที่เราทะเลาะกันมาทำให้ความรักของเราต้องเหนื่อยไปมากกว่านี้ เค้าอยากให้เราค่อย ๆ คุยกัน รับฟังกัน และเข้าใจกันมากขึ้นนะ'},
  {title:'เริ่มต้นใหม่ด้วยกันนะ ♡', text:'หลังจากนี้เรามาเริ่มต้นกันใหม่อีกครั้งนะ ไม่ต้องรีบหายโกรธก็ได้ เค้าอยากค่อย ๆ ปรับปรุงตัวให้ดีขึ้น เพราะเค้ารักเธอจริง ๆ ขอบคุณที่ยังอยู่ด้วยกันนะ คนเก่งของเค้า 💗'}
];
const opened = new Set();
function showScreen(id) {
  screens.forEach(s => s.classList.toggle('active', s.id === id));
  window.scrollTo({top:0, behavior:'smooth'});
}
passForm.addEventListener('submit', e => {
  e.preventDefault();
  if (passcode.value === '010169') {
    passError.textContent = '';
    burstHearts(18);
    showScreen('bookScreen');
  } else {
    passError.textContent = 'อุ๊ยย รหัสยังไม่ถูกน้า ลองอีกครั้งนะ 🥺';
    passcode.value = '';
    passcode.focus();
    passcode.animate([{transform:'translateX(-4px)'},{transform:'translateX(4px)'},{transform:'translateX(0)'}],{duration:220});
  }
});
document.querySelectorAll('.bubble').forEach(bubble => {
  bubble.addEventListener('click', () => {
    const index = Number(bubble.dataset.message);
    opened.add(index);
    bubble.classList.add('opened');
    document.getElementById('progressText').textContent = `เปิดอ่านแล้ว ${opened.size} / 5 ดวง`;
    document.getElementById('modalTitle').textContent = messages[index].title;
    document.getElementById('modalMessage').textContent = messages[index].text;
    document.getElementById('messageModal').classList.remove('hidden');
    if (opened.size === messages.length) document.getElementById('openFinal').classList.remove('hidden');
    burstHearts(5, bubble);
  });
});
function closeModal(){document.getElementById('messageModal').classList.add('hidden')}
document.getElementById('closeModal').addEventListener('click',closeModal);
document.getElementById('modalDone').addEventListener('click',closeModal);
document.getElementById('messageModal').addEventListener('click',e=>{if(e.target.id==='messageModal')closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
document.getElementById('openFinal').addEventListener('click',()=>{showScreen('finalScreen');burstHearts(14)});
document.getElementById('backToStart').addEventListener('click',()=>showScreen('lockScreen'));
document.getElementById('restartButton').addEventListener('click',()=>{
  opened.clear();
  document.querySelectorAll('.bubble').forEach(b=>b.classList.remove('opened'));
  document.getElementById('progressText').textContent='เปิดอ่านแล้ว 0 / 5 ดวง';
  document.getElementById('openFinal').classList.add('hidden');
  document.getElementById('hugMessage').classList.add('hidden');
  document.getElementById('showAll').textContent='อ่านข้อความทั้งหมดทันที ↓';
  document.getElementById('finalLetter').classList.remove('all-shown');
  showScreen('bookScreen');
});
document.getElementById('hugButton').addEventListener('click',()=>{
  document.getElementById('hugMessage').classList.remove('hidden');
  burstHearts(42);
});
document.getElementById('showAll').addEventListener('click',()=>{
  const letter=document.getElementById('finalLetter');
  letter.classList.toggle('all-shown');
  document.getElementById('showAll').textContent=letter.classList.contains('all-shown')?'ซ่อนข้อความบางส่วน ↑':'อ่านข้อความทั้งหมดทันที ↓';
  if(letter.classList.contains('all-shown')) letter.scrollIntoView({behavior:'smooth',block:'nearest'});
});
function burstHearts(count, source){
  const layer=document.getElementById('confettiLayer');
  const rect=source ? source.getBoundingClientRect() : {left:window.innerWidth/2,top:window.innerHeight*.35,width:0};
  for(let i=0;i<count;i++){
    const heart=document.createElement('span');
    heart.className='confetti-heart';
    heart.textContent=['♥','♡','✦','💗'][Math.floor(Math.random()*4)];
    heart.style.left=Math.max(0,Math.min(window.innerWidth-20,(source?rect.left+rect.width/2:rect.left)+(Math.random()-.5)*(source?120:window.innerWidth*.85)))+'px';
    heart.style.top=(source?rect.top+rect.height/2:rect.top)+'px';
    heart.style.setProperty('--duration',(2+Math.random()*1.8)+'s');
    heart.style.setProperty('--size',(12+Math.random()*18)+'px');
    heart.style.setProperty('--color',['#e98cae','#f2b7ce','#d77ca0','#f6c8d9'][Math.floor(Math.random()*4)]);
    layer.appendChild(heart);
    setTimeout(()=>heart.remove(),4000);
  }
}

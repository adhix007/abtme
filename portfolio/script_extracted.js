
const IMGS = {};


// ── Assign images ──
document.getElementById('hero-bg').style.backgroundImage = `url(${IMGS.img1})`;
document.getElementById('s2-parallax-img').style.backgroundImage = `url(${IMGS.img2})`;

// Masonry
const masonryImgs = [IMGS.img3, IMGS.img4, IMGS.img5, IMGS.img6, IMGS.img7, IMGS.img1];
['m1','m2','m3','m4','m5','m6'].forEach((id,i) => {
  document.getElementById(id).src = masonryImgs[i];
});
const fullscreenSrcs = masonryImgs;

// Polaroids
document.getElementById('pol1').src = IMGS.img1;
document.getElementById('pol2').src = IMGS.img2;
document.getElementById('pol3').src = IMGS.img6;
document.getElementById('pol4').src = IMGS.img8;

// Neon
document.getElementById('neon-img').src = IMGS.img5;

// Cube
document.getElementById('cf').src = IMGS.img1;
document.getElementById('cb').src = IMGS.img2;
document.getElementById('cl').src = IMGS.img3;
document.getElementById('cr').src = IMGS.img6;
document.getElementById('ct').src = IMGS.img7;
document.getElementById('cbot').src = IMGS.img8;

// Blob
document.getElementById('blob-img').src = IMGS.img7;

// Finale
document.getElementById('finale-photo').src = IMGS.img8;

// ── Loader ──
window.addEventListener('load', () => {
  const fill = document.getElementById('loader-fill');
  fill.style.width = '100%';
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2200);
});

// ── Custom cursor ──
const cur = document.getElementById('cursor');
const curRing = document.getElementById('cursor-ring');
let mx=0, my=0, rx=0, ry=0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px'; cur.style.top = my + 'px';
});
(function animRing(){
  rx += (mx-rx)*0.12; ry += (my-ry)*0.12;
  curRing.style.left = rx + 'px'; curRing.style.top = ry + 'px';
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a,button,.masonry-item,.polaroid,.cube-wrapper,.finale-img-wrap,.neon-frame').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width='20px'; cur.style.height='20px';
    curRing.style.width='60px'; curRing.style.height='60px';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width='12px'; cur.style.height='12px';
    curRing.style.width='40px'; curRing.style.height='40px';
  });
});

// ── Theme toggle ──
const themeBtn = document.getElementById('theme-btn');
themeBtn.onclick = () => {
  document.body.classList.toggle('light');
  themeBtn.textContent = document.body.classList.contains('light') ? '◑ DARK' : '◑ LIGHT';
};

// ── Sound ──
let soundOn = true;
const soundBtn = document.getElementById('sound-btn');
let audioCtx;
function getAudio(){
  if(!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)();
  return audioCtx;
}
function playTick(){
  if(!soundOn) return;
  try{
    const ac = getAudio();
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.frequency.value = 800 + Math.random()*400;
    g.gain.setValueAtTime(0.05, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime+0.1);
    o.start(); o.stop(ac.currentTime+0.1);
  }catch(e){}
}
soundBtn.onclick = () => {
  soundOn = !soundOn;
  soundBtn.textContent = soundOn ? '♪ ON' : '♪ OFF';
};
document.querySelectorAll('a,button,.masonry-item').forEach(el => {
  el.addEventListener('mouseenter', playTick);
});

// ── S2 Parallax ──
const s2img = document.getElementById('s2-parallax-img');
window.addEventListener('scroll', () => {
  const s2 = document.getElementById('s2');
  const rect = s2.getBoundingClientRect();
  if(rect.top < window.innerHeight && rect.bottom > 0){
    const p = (rect.top / window.innerHeight);
    s2img.style.transform = `translateY(${p*30}%)`;
  }
});

// ── S2 Particles ──
(function initParticles(){
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles=[];
  function resize(){
    const r = canvas.parentElement.getBoundingClientRect();
    W = canvas.width = r.width; H = canvas.height = r.height;
  }
  resize();
  window.addEventListener('resize', resize);
  for(let i=0;i<50;i++){
    particles.push({
      x:Math.random()*800, y:Math.random()*800,
      vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3,
      r:Math.random()*2+0.5, a:Math.random()
    });
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if(p.x<0||p.x>W) p.vx*=-1;
      if(p.y<0||p.y>H) p.vy*=-1;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(200,169,110,${0.1+p.a*0.3})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── Fullscreen ──
function openFullscreen(i){
  const ov = document.getElementById('fullscreen-overlay');
  document.getElementById('fullscreen-img').src = fullscreenSrcs[i];
  ov.classList.add('active');
}
function closeFullscreen(){
  document.getElementById('fullscreen-overlay').classList.remove('active');
}
document.addEventListener('keydown', e => { if(e.key==='Escape') closeFullscreen(); });

// ── Polaroid drag ──
document.querySelectorAll('.polaroid').forEach(pol => {
  let dragging=false, ox=0, oy=0, cx=0, cy=0;
  // Get initial transform rotation
  const style = window.getComputedStyle(pol);
  const matrix = new DOMMatrix(style.transform);
  let angle = Math.atan2(matrix.b, matrix.a) * 180/Math.PI;
  let posX=0, posY=0;

  pol.addEventListener('mousedown', e => {
    dragging=true;
    ox=e.clientX; oy=e.clientY;
    pol.style.zIndex=100;
    pol.style.transition='box-shadow 0.2s';
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if(!dragging) return;
    const dx=e.clientX-ox, dy=e.clientY-oy;
    posX+=dx; posY+=dy;
    ox=e.clientX; oy=e.clientY;
    pol.style.transform = `translate(${posX}px,${posY}px) rotate(${angle}deg)`;
  });
  document.addEventListener('mouseup', () => {
    if(dragging){
      dragging=false;
      pol.style.zIndex='';
      playTick();
    }
  });
});

// ── Cube mouse control ──
const cubeEl = document.getElementById('cube');
const cubeWrap = document.getElementById('cube-wrapper');
let cubeX=-15, cubeY=20, cubeAnimPaused=false;
cubeWrap.addEventListener('mousemove', e => {
  const r = cubeWrap.getBoundingClientRect();
  const x = (e.clientX - r.left - r.width/2) / r.width;
  const y = (e.clientY - r.top - r.height/2) / r.height;
  cubeEl.style.animation='none';
  cubeEl.style.transform = `rotateX(${-y*30}deg) rotateY(${x*30+20}deg)`;
});
cubeWrap.addEventListener('mouseleave', () => {
  cubeEl.style.animation='cubeFloat 8s ease-in-out infinite';
});

// ── Blob animation ──
const blobPath = document.getElementById('blob-path');
const blobPoints = [
  'M200,50 C300,60 370,130 360,210 C350,290 270,360 190,350 C110,340 50,270 55,190 C60,110 130,40 200,50Z',
  'M210,55 C310,50 380,140 365,220 C350,300 265,365 185,355 C105,345 45,265 50,185 C55,105 110,60 210,55Z',
  'M195,60 C285,55 365,125 355,215 C345,295 260,355 180,350 C100,345 45,275 55,195 C65,115 105,65 195,60Z',
  'M205,55 C295,55 375,130 360,215 C345,300 260,360 185,350 C110,340 50,270 55,190 C60,110 115,55 205,55Z',
];
let blobIdx=0;
setInterval(()=>{
  blobIdx=(blobIdx+1)%blobPoints.length;
  blobPath.setAttribute('d', blobPoints[blobIdx]);
}, 2000);

// ── Blob img clip path ──
function updateBlobClip(){
  const d = blobPath.getAttribute('d');
  // Normalize to 0-100% range for clip-path
}

// ── Finale particle explosion ──
(function initFinale(){
  const canvas = document.getElementById('finale-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('resize',()=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
  });

  // Idle sparkles
  let sparks = [];
  for(let i=0;i<80;i++){
    sparks.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*1.5,
      a: Math.random(),
      va: (Math.random()-0.5)*0.01,
      vy: -0.2 - Math.random()*0.3
    });
  }

  let exploding=false, explodeParticles=[];

  window.triggerExplosion = function(){
    if(!soundOn){ try{ getAudio(); }catch(e){} }
    exploding=true;
    explodeParticles=[];
    const cx=canvas.width/2, cy=canvas.height/2;
    // Heart shape parametric
    for(let t=0;t<Math.PI*2;t+=0.05){
      const hx = cx + 120*(16*Math.sin(t)**3)/16;
      const hy = cy - 120*(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))/16;
      const particle = {
        x:cx, y:cy,
        tx:hx, ty:hy,
        px:cx, py:cy,
        color:`hsl(${Math.random()*60+10},80%,${50+Math.random()*30}%)`,
        r:2+Math.random()*2,
        progress:0,
        speed:0.005+Math.random()*0.01
      };
      explodeParticles.push(particle);
    }
    // Extra random sparkles
    for(let i=0;i<200;i++){
      const angle = Math.random()*Math.PI*2;
      const dist = 100+Math.random()*200;
      explodeParticles.push({
        x:cx, y:cy,
        tx:cx+Math.cos(angle)*dist,
        ty:cy+Math.sin(angle)*dist,
        px:cx, py:cy,
        color:`hsl(${Math.random()*360},70%,70%)`,
        r:1+Math.random()*2,
        progress:0,
        speed:0.008+Math.random()*0.015
      });
    }
    playTick();
    setTimeout(()=>{ exploding=false; }, 4000);
  };

  function lerp(a,b,t){ return a+(b-a)*t; }
  function easeOut(t){ return 1-(1-t)**3; }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Idle
    sparks.forEach(s=>{
      s.y+=s.vy; s.a+=s.va;
      if(s.a<0)s.a=0; if(s.a>1){s.va*=-1}
      if(s.y<-10){ s.y=canvas.height+10; s.x=Math.random()*canvas.width; s.a=0; }
      ctx.beginPath();
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(200,169,110,${s.a*0.4})`;
      ctx.fill();
    });

    if(exploding){
      explodeParticles.forEach(p=>{
        if(p.progress<1){
          p.progress = Math.min(1, p.progress+p.speed);
          p.px = lerp(p.x, p.tx, easeOut(p.progress));
          p.py = lerp(p.y, p.ty, easeOut(p.progress));
        }
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.r, 0, Math.PI*2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.progress > 0.8 ? (1-(p.progress-0.8)/0.2)*0.8 : 0.8;
        ctx.fill();
        ctx.globalAlpha=1;
      });
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

// ── Scroll reveal ──
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity='1';
      e.target.style.transform='translateY(0)';
    }
  });
},{threshold:0.1});

document.querySelectorAll('.s2-title,.s2-body,.s2-tag,.s7-title,.s7-body,.s7-tag,.section-title,.section-label,.s5-info,.finale-title,.finale-sub').forEach(el=>{
  el.style.opacity='0';
  el.style.transform='translateY(30px)';
  el.style.transition='opacity 0.9s ease, transform 0.9s ease';
  obs.observe(el);
});

// ── Neon typing loop ──
const phrases = [
  '> covering my eyes from the light_',
  '> finding beauty in the blur_',
  '> this face, these hands, this life_',
  '> unapologetically here_'
];
let phraseIdx=0;
function cyclePhrase(){
  const el = document.getElementById('neon-type');
  phraseIdx=(phraseIdx+1)%phrases.length;
  el.style.animation='none';
  el.textContent = phrases[phraseIdx];
  void el.offsetWidth;
  el.style.animation='typing 3s steps(40,end) both, blink 0.8s step-end infinite';
}
setInterval(cyclePhrase, 4500);


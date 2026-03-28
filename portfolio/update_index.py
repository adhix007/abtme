import sys

with open(r"c:\Users\adhit\OneDrive\Documents\Adhi!!\portfolio\index.html", "r", encoding="utf-8") as f:
    content = f.read()

target1 = """/* Responsive */
@media(max-width:768px){
  #s2{grid-template-columns:1fr}
  .s2-left{height:50vw}
  .masonry-grid{columns:2}
  nav{padding:1rem 1.5rem}
  .nav-links{display:none}
  #s7{flex-direction:column;align-items:center}
  .blob-container{width:280px;height:280px}
}"""

replacement1 = """/* Responsive */
@media(max-width:768px){
  #s2{grid-template-columns:1fr}
  .s2-left{height:50vw}
  .masonry-grid{columns:2}
  nav{padding:1rem 1.5rem}
  .nav-links{display:none}
  #s7{flex-direction:column;align-items:center}
  .blob-container{width:280px;height:280px}
  .polaroid-container { width: 100%; height: 420px; overflow: hidden; }
  .polaroid img { width: 140px; height: 140px; }
  .polaroid { padding: 8px 8px 25px; }
  .polaroid:nth-child(1){top:20px;left:5%;}
  .polaroid:nth-child(2){top:60px;left:40%;}
  .polaroid:nth-child(3){top:10px;left:55%;}
  .polaroid:nth-child(4){top:180px;left:20%;}
  .cube-wrapper { transform: scale(0.85); }
}
@media (hover: none) and (pointer: coarse) {
  #cursor, #cursor-ring { display: none !important; }
  body, .masonry-item, .polaroid, .btn-explode, .cube-wrapper { cursor: auto !important; }
}"""

target2 = """// ── Polaroid drag ──
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
});"""

replacement2 = """// ── Polaroid drag ──
document.querySelectorAll('.polaroid').forEach(pol => {
  let dragging=false, ox=0, oy=0;
  // Get initial transform rotation
  const style = window.getComputedStyle(pol);
  const matrix = new DOMMatrix(style.transform);
  let angle = Math.atan2(matrix.b, matrix.a) * 180/Math.PI;
  let posX=0, posY=0;

  const startDrag = (x, y) => {
    dragging=true;
    ox=x; oy=y;
    pol.style.zIndex=100;
    pol.style.transition='box-shadow 0.2s';
  };

  const doDrag = (x, y) => {
    if(!dragging) return;
    const dx=x-ox, dy=y-oy;
    posX+=dx; posY+=dy;
    ox=x; oy=y;
    pol.style.transform = `translate(${posX}px,${posY}px) rotate(${angle}deg)`;
  };

  const endDrag = () => {
    if(dragging){
      dragging=false;
      pol.style.zIndex='';
      playTick();
    }
  };

  pol.addEventListener('mousedown', e => {
    startDrag(e.clientX, e.clientY);
    e.preventDefault();
  });
  pol.addEventListener('touchstart', e => {
    if(e.touches.length > 0) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, {passive: false});

  document.addEventListener('mousemove', e => {
    doDrag(e.clientX, e.clientY);
  });
  document.addEventListener('touchmove', e => {
    if(dragging && e.touches.length > 0) {
      doDrag(e.touches[0].clientX, e.touches[0].clientY);
      e.preventDefault();
    }
  }, {passive: false});

  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);
});"""

if target1 not in content:
    print("Warning: target1 not found")
if target2 not in content:
    print("Warning: target2 not found")

content = content.replace(target1, replacement1)
content = content.replace(target2, replacement2)

with open(r"c:\Users\adhit\OneDrive\Documents\Adhi!!\portfolio\index.html", "w", encoding="utf-8") as f:
    f.write(content)
print("Updated successfully")

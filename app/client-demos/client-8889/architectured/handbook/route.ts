import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

const PAGES = [
  "https://framerusercontent.com/images/QDQKylWWIf9VYDvFE8d8MTxUJ1o.png",
  "https://framerusercontent.com/images/cwOkVnjxy6x4U3eWGZEKmj7BBgo.jpg?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/OhGj99mJnab8DPy2PMfd98jhF6I.jpg?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/lAU1MDwSV1dq0S6amUC8jsOg.jpg?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/hv0I9A0DXUdvIK6c42B46rsfzg.jpg?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/cKChIxjzaNsc5t2NxVN78mx8Q.png?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/hFP2svt3lNsx1A9P1zA6bFzdWM.png?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/7q3XJntgf3apOgAI7m0Yai1Mz0.png?scale-down-to=1024&width=768&height=1086",
]

export async function GET() {
  const pages = JSON.stringify(PAGES)
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>NGUYEN Project Handbook</title>
<style>
  *{box-sizing:border-box}
  html,body{margin:0;width:100%;min-height:100%;background:#1d1b18;color:#f5f1ea;font-family:Arial,Helvetica,sans-serif}
  body{overflow-x:hidden}
  .wrap{min-height:700px;padding:46px 22px 34px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 34%,#292620 0,#211f1b 43%,#1b1916 100%)}
  .intro{text-align:center;max-width:760px;margin:0 auto 28px}
  .eyebrow{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#d98a4b;font-weight:700;margin-bottom:12px}
  h2{font-family:Georgia,'Times New Roman',serif;font-size:clamp(38px,5vw,64px);font-weight:400;line-height:1;margin:0 0 13px;letter-spacing:-.025em}
  .sub{margin:0 auto;color:#b5afa7;font-size:14px;line-height:1.55;max-width:560px}
  .stage{width:min(1120px,96vw);display:grid;grid-template-columns:54px minmax(0,1fr) 54px;gap:24px;align-items:center}
  .book-wrap{perspective:2200px;min-width:0}
  .book{position:relative;width:min(900px,100%);aspect-ratio:10/7;margin:auto;transform-style:preserve-3d;filter:drop-shadow(0 30px 36px rgba(0,0,0,.52));touch-action:pan-y;user-select:none;cursor:pointer;outline:none}
  .board{position:absolute;inset:-10px;border-radius:5px;background:#2b2823;box-shadow:0 0 0 1px rgba(255,255,255,.06),0 28px 70px rgba(0,0,0,.48)}
  .base{position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr;z-index:2;background:#fff}
  .base .blank{background:linear-gradient(90deg,#eeeae2,#faf8f3 90%,#d7d0c6)}
  .sheet{position:absolute;left:50%;top:0;width:50%;height:100%;transform-origin:left center;transform-style:preserve-3d;transition:transform .72s cubic-bezier(.28,.17,.18,1);z-index:10}
  .sheet.flipped{transform:rotateY(-180deg)}
  .face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;overflow:hidden;background:#fff;border:1px solid rgba(0,0,0,.08)}
  .face.back{transform:rotateY(180deg)}
  .face img{display:block;width:100%;height:100%;object-fit:cover;object-position:center;background:#fff;pointer-events:none;-webkit-user-drag:none}
  .gutter{position:absolute;z-index:100;left:50%;top:0;bottom:0;width:24px;transform:translateX(-50%);background:linear-gradient(90deg,rgba(0,0,0,.17),rgba(255,255,255,.27),rgba(0,0,0,.14));opacity:.5;pointer-events:none}
  .nav{width:52px;height:52px;border:1px solid rgba(255,255,255,.18);border-radius:50%;background:rgba(49,46,41,.86);color:#fff;font-size:27px;display:grid;place-items:center;cursor:pointer;transition:.18s ease}
  .nav:hover:not(:disabled){background:#3a3630;transform:scale(1.04)}
  .nav:disabled{opacity:.2;cursor:default}
  .footer{text-align:center;margin-top:22px}
  .dots{display:flex;justify-content:center;gap:10px;margin-bottom:10px}
  .dot{width:8px;height:8px;border:0;border-radius:50%;padding:0;background:#66615b;cursor:pointer}.dot.on{background:#d98a4b;transform:scale(1.15)}
  .count{font-size:10px;color:#8d8780;letter-spacing:.14em;text-transform:uppercase}
  @media(max-width:700px){.wrap{min-height:560px;padding:32px 8px 28px}.intro{margin-bottom:18px}.stage{grid-template-columns:1fr;position:relative}.nav{position:absolute;z-index:200;top:47%;width:44px;height:44px;font-size:22px}.prev{left:3px}.next{right:3px}.book{width:94%}.sub{font-size:12px}}
  @media(prefers-reduced-motion:reduce){.sheet{transition-duration:.01ms}}
</style>
</head>
<body>
  <main class="wrap">
    <div class="intro">
      <div class="eyebrow">Project Handbook</div>
      <h2>See Our Work in Detail</h2>
      <p class="sub">Explore our project handbook to see how we approach each detail with purpose and precision.</p>
    </div>
    <div class="stage">
      <button class="nav prev" id="prev" aria-label="Previous pages">‹</button>
      <div class="book-wrap">
        <div class="book" id="book" tabindex="0" aria-label="Interactive NGUYEN project handbook">
          <div class="board"></div>
          <div class="base"><div class="blank"></div><div class="blank"></div></div>
          <div class="gutter"></div>
        </div>
      </div>
      <button class="nav next" id="next" aria-label="Next pages">›</button>
    </div>
    <div class="footer"><div class="dots" id="dots"></div><div class="count" id="count"></div></div>
  </main>
<script>
(()=>{
  const pages=${pages};
  const book=document.getElementById('book'),prev=document.getElementById('prev'),next=document.getElementById('next'),dots=document.getElementById('dots'),count=document.getElementById('count');
  const sheets=[]; let spread=0,startX=null;
  for(let i=0;i<pages.length;i+=2){
    const s=document.createElement('div'); s.className='sheet'; s.style.zIndex=String(100-i);
    s.innerHTML='<div class="face front"><img src="'+pages[i]+'" alt="Handbook page '+(i+1)+'"></div><div class="face back"><img src="'+pages[i+1]+'" alt="Handbook page '+(i+2)+'"></div>';
    book.appendChild(s); sheets.push(s);
    const d=document.createElement('button'); d.className='dot'; d.type='button'; d.setAttribute('aria-label','Go to spread '+(sheets.length)); d.addEventListener('click',()=>{spread=sheets.indexOf(s);render()}); dots.appendChild(d);
  }
  function render(){
    sheets.forEach((s,i)=>{const f=i<spread;s.classList.toggle('flipped',f);s.style.zIndex=f?String(i+1):String(100-i)});
    [...dots.children].forEach((d,i)=>d.classList.toggle('on',i===Math.min(spread,sheets.length-1)));
    prev.disabled=spread===0; next.disabled=spread===sheets.length;
    if(spread===0) count.textContent='Cover · Page 1 of '+pages.length;
    else if(spread===sheets.length) count.textContent='Page '+pages.length+' of '+pages.length;
    else count.textContent='Pages '+(spread*2)+'–'+(spread*2+1)+' of '+pages.length;
    book.style.transform=spread===0?'translateX(-25%)':spread===sheets.length?'translateX(25%)':'translateX(0)';
  }
  function goNext(){spread=Math.min(sheets.length,spread+1);render()}
  function goPrev(){spread=Math.max(0,spread-1);render()}
  next.addEventListener('click',goNext); prev.addEventListener('click',goPrev);
  book.addEventListener('click',e=>{const r=book.getBoundingClientRect();e.clientX<r.left+r.width/2?goPrev():goNext()});
  book.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();goPrev()}if(e.key==='ArrowRight'){e.preventDefault();goNext()}});
  book.addEventListener('pointerdown',e=>startX=e.clientX); book.addEventListener('pointerup',e=>{if(startX===null)return;const d=e.clientX-startX;startX=null;if(Math.abs(d)>40)(d<0?goNext():goPrev)()}); book.addEventListener('pointercancel',()=>startX=null);
  render();
})();
</script>
</body>
</html>`

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0, must-revalidate",
    },
  })
}

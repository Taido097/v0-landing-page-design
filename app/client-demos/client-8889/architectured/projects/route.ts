const SOURCE_URL = 'https://architectured.framer.website/projects';
const DEMO_PATH = '/client-demos/client-8889/architectured';
const PROJECTS_PATH = `${DEMO_PATH}/projects`;

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const CLEANUP = `
<style id="designedbytd-nguyen-projects-cleanup">
  #__framer-badge-container,
  [id^="__framer-editorbar"],
  [class*="framer-editorbar"],
  #template-overlay { display:none!important; visibility:hidden!important; opacity:0!important; pointer-events:none!important; }
  body {
    --token-c8809533-d74e-4474-af14-ef3a211efd13:#061b36!important;
    --token-44dd7634-948b-4475-884c-16fbad7c474d:#f8f7f3!important;
    --token-cef92a4d-d47e-40c4-9eae-b4ff7c06350d:#f1f3f5!important;
    --token-9c090586-7a62-43ef-af9a-db53933ce9ee:#061b36!important;
    --token-f688b0c3-89d4-41da-82a2-fdf0869df82e:#061b36cc!important;
    --token-b8e91d38-56d6-4914-9d4c-c8d64604eb8d:#061b3680!important;
    --token-5d5de10c-51bb-4596-ab88-00139ed62b55:#061b3633!important;
    --token-11ce1999-7b74-4e05-b5ef-93fa4e693a84:#061b361a!important;
    --token-c7cd53d3-de4f-4304-b753-767171c86167:#f8f7f3cc!important;
    --token-ff2a6766-d9d5-4a1d-a552-e969fba53510:#ffffff!important;
    --token-230c3248-009b-4ccd-bda2-d16c47a758d2:#d99a2b!important;
    --token-37033d4e-1ccc-4cf2-bb27-e6ad4c96fbc3:#d99a2b!important;
  }
  a[aria-label="Company Logo"] { width:clamp(132px,21vw,220px)!important; min-width:0!important; max-width:min(220px,calc(100vw - 118px))!important; height:48px!important; overflow:hidden!important; text-decoration:none!important; flex-shrink:1!important; }
  .nguyen-wordmark { width:100%; max-width:100%; height:100%; min-width:0; display:flex; flex-direction:column; justify-content:center; align-items:flex-start; color:#061b36; line-height:1; white-space:nowrap; overflow:hidden; }
  .nguyen-wordmark strong { max-width:100%; overflow:hidden; font-family:Geist,Arial,sans-serif; font-size:clamp(16px,2vw,21px); font-weight:800; letter-spacing:.1em; }
  .nguyen-wordmark span { max-width:100%; margin-top:5px; overflow:hidden; font-family:Geist,Arial,sans-serif; font-size:clamp(6px,.8vw,8px); font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:#d99a2b; }
  [data-nguyen-project-card="true"] { transition:transform .55s cubic-bezier(.2,.75,.2,1),opacity .55s ease!important; will-change:transform,opacity; }
  [data-nguyen-project-card="true"].nguyen-project-enter { opacity:0!important; transform:translateY(42px) scale(.985)!important; }
  [data-nguyen-project-card="true"].nguyen-project-visible { opacity:1!important; transform:translateY(0) scale(1)!important; }
  [data-nguyen-project-card="true"] img { transition:transform .65s cubic-bezier(.2,.75,.2,1)!important; }
  [data-nguyen-project-card="true"]:hover img { transform:scale(1.045)!important; }
  @media(max-width:620px){
    a[aria-label="Company Logo"]{width:clamp(132px,42vw,176px)!important;max-width:calc(100vw - 112px)!important;height:44px!important}
    .nguyen-wordmark strong{font-size:clamp(15px,4.5vw,18px);letter-spacing:.08em}
    .nguyen-wordmark span{font-size:clamp(5.8px,1.75vw,7px);letter-spacing:.11em}
  }
</style>`;

const CLIENT_PATCH = `
<script id="nguyen-projects-page-patch">
(() => {
  const DEMO_PATH = '${DEMO_PATH}';
  const PROJECTS_PATH = '${PROJECTS_PATH}';
  const SOURCE_ORIGIN = 'https://architectured.framer.website';
  const FACEBOOK = 'https://www.facebook.com/profile.php?id=61579114646057&mibextid=wwXIfr&mibextid=wwXIfr';

  const projects = [
    { oldTitle:'Skyline Corporate Hub', title:'Boba Shops & Cafés', image:'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1800&q=92', replacements:{'Office':'Commercial','Central Business District.':'Boba Shops & Cafés','2022':'Project Type','350,000 sq. ft.':'Design • Engineering • Permit'} },
    { oldTitle:'LuxeHaven Villa', title:'Restaurants', image:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=92', replacements:{'Residential':'Commercial','Luxury Villa':'Restaurants','Savannah, Georgia':'Commercial Project','2023':'Project Type','4000sqft':'Design • Engineering • Permit'} },
    { oldTitle:'Celestial Towers Condominiums', title:'Nail & Beauty Salons', image:'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=92', replacements:{'Residential':'Commercial','Apartment and Condo':'Nail & Beauty Salons','New Orleans, Louisiana':'Commercial Project','2024':'Project Type','300,000 sq. ft.':'Design • Engineering • Permit'} },
    { oldTitle:'The Sunny Haven Residence', title:'Retail Stores', image:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=92', replacements:{'Residential':'Commercial','Single Family Home':'Retail Stores','Austin, Texas':'Commercial Project','2023':'Project Type','12000sqft':'Design • Engineering • Permit'} },
    { oldTitle:'SkyBloom Residences', title:'Office & Tenant Improvement', image:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=92', replacements:{'Residential':'Commercial','Multi-Family Residential Complex':'Office & Tenant Improvement','San Francisco, California':'Commercial Project','2024':'Project Type','10000sqft':'Design • Engineering • Permit'} },
    { oldTitle:'SkyBloom Residences', title:'Commercial Remodel & Renovation', image:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=92', replacements:{'Residential':'Commercial','Multi-Family Residential Complex':'Commercial Remodel & Renovation','San Francisco, California':'Commercial Project','2024':'Project Type','10000sqft':'Design • Engineering • Permit'}, clone:true },
    { oldTitle:'Skyline Corporate Hub', title:'New Commercial Buildings', image:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=92', replacements:{'Office':'Commercial','Central Business District.':'New Commercial Buildings','2022':'Project Type','350,000 sq. ft.':'Design • Engineering • Permit'}, clone:true },
    { oldTitle:'LuxeHaven Villa', title:'Tenant Improvement (TI)', image:'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=92', replacements:{'Residential':'Commercial','Luxury Villa':'Tenant Improvement (TI)','Savannah, Georgia':'Commercial Project','2023':'Project Type','4000sqft':'Design • Engineering • Permit'}, clone:true }
  ];

  const exact = new Map([
    ['Explore a collection of spaces we’ve brought to life, each crafted with passion, precision, and a little sprinkle of genius.','Eight commercial project types supported with coordinated design, engineering and permit services.'],
    ['The #1 architecture firm in Texas turning dreams into beautiful, functional spaces. from cozy homes to innovative designs, we bring your vision to life—one detail at a time. let’s create something amazing together!','NGUYEN Architecture & Engineering provides coordinated architecture, engineering and permit support for commercial and residential projects.'],
    ['(217) 555-0134','(209) 233-8888'],
    ['(217) 444-0134','(714) 707-8889'],
    ['architect@email.com','info@nguyenarchitecture.com'],
    ['123 Main Street, Suite 200, Austin, TX 78701','7171 Warner Ave. Ste. B, Huntington Beach, CA 92647'],
    ['Mon to Sat: 9.00am - 8.30pm','Orange County / Southern California'],
    ['Sun: Closed','Design • Engineering • Permit'],
    ['Subscribe to the newsletter','Custom Homes • ADUs • Residential • Commercial'],
    ['Subscribe','Contact NGUYEN'],
    ['Architect','NGUYEN'],
    ['©Template by RealMehedi','© NGUYEN Architecture & Engineering'],
    ['Built in Framer','Design • Engineering • Permit']
  ]);

  function normalize(value){ return (value || '').replace(/\\s+/g,' ').trim(); }

  function getCard(node){
    let card = node.closest && node.closest('a');
    if (card) return card;
    card = node;
    for(let i=0;i<8 && card && !card.querySelector('img');i+=1) card = card.parentElement;
    return card;
  }

  function animateCard(card, index){
    if(!card || card.dataset.nguyenAnimated==='true') return;
    card.dataset.nguyenAnimated='true';
    card.dataset.nguyenProjectCard='true';
    card.classList.add('nguyen-project-enter');
    const show=()=>{ card.classList.remove('nguyen-project-enter'); card.classList.add('nguyen-project-visible'); };
    if('IntersectionObserver' in window){
      const observer=new IntersectionObserver((entries)=>{ entries.forEach((entry)=>{ if(entry.isIntersecting){ setTimeout(show,index*65); observer.disconnect(); } }); },{threshold:.12});
      observer.observe(card);
    }else setTimeout(show,index*65);
  }

  function patchCard(card, config, index){
    if(!card) return;
    const local = new Map([[config.oldTitle,config.title],...Object.entries(config.replacements)]);
    const walker = document.createTreeWalker(card,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())){
      const next = local.get(normalize(node.nodeValue));
      if(next !== undefined) node.nodeValue = next;
    }
    if(card.tagName === 'A') card.setAttribute('href', PROJECTS_PATH);
    const image = card.querySelector('img');
    if(image){
      image.setAttribute('src',config.image);
      image.removeAttribute('srcset');
      image.setAttribute('loading','eager');
      image.setAttribute('decoding','async');
      image.style.objectFit='cover';
      image.style.objectPosition='center';
      const picture=image.closest('picture');
      if(picture) picture.querySelectorAll('source').forEach((source)=>source.removeAttribute('srcset'));
    }
    animateCard(card,index);
  }

  function findCardsByTitle(title){
    const nodes=Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div')).filter((el)=>normalize(el.textContent)===title);
    return [...new Set(nodes.map(getCard).filter(Boolean))];
  }

  function patchProjects(){
    const originals=[];
    projects.slice(0,5).forEach((config,index)=>{
      const cards=findCardsByTitle(config.oldTitle);
      const card=cards.find((candidate)=>!originals.includes(candidate));
      if(card){ originals.push(card); patchCard(card,config,index); }
    });
    const parent=originals[0] && originals[0].parentElement;
    if(!parent) return;
    projects.slice(5).forEach((config,index)=>{
      const marker='project-'+(index+6);
      let clone=parent.querySelector('[data-nguyen-project-clone="'+marker+'"]');
      if(!clone){
        const source=originals[index % originals.length];
        if(!source) return;
        clone=source.cloneNode(true);
        clone.dataset.nguyenProjectClone=marker;
        clone.removeAttribute('data-nguyen-animated');
        clone.removeAttribute('data-nguyen-project-card');
        clone.classList.remove('nguyen-project-enter','nguyen-project-visible');
        parent.appendChild(clone);
      }
      patchCard(clone,config,index+5);
    });
  }

  function goHome(event){
    if(event) event.preventDefault();
    window.location.assign(DEMO_PATH);
  }

  function patchLogo(){
    document.querySelectorAll('a[aria-label="Company Logo"]').forEach((logo)=>{
      logo.setAttribute('href',DEMO_PATH);
      if(logo.dataset.nguyenLogo!=='true'){
        logo.dataset.nguyenLogo='true';
        logo.innerHTML='<div class="nguyen-wordmark"><strong>NGUYEN</strong><span>Architecture &amp; Engineering</span></div>';
        logo.addEventListener('click',goHome);
      }
    });
  }

  function patchNavigation(){
    document.querySelectorAll('a').forEach((anchor)=>{
      const href=anchor.getAttribute('href')||'';
      const label=normalize(anchor.textContent);
      let url=null;
      try{ url=new URL(href,SOURCE_ORIGIN); }catch{}
      if(url && url.origin===SOURCE_ORIGIN){
        if(url.pathname==='/projects' || url.pathname.startsWith('/projects/')) anchor.setAttribute('href',PROJECTS_PATH);
        else if(url.pathname==='/services' || url.pathname.startsWith('/services/')) anchor.setAttribute('href',DEMO_PATH+'#services');
        else if(url.pathname==='/about' || url.pathname.startsWith('/about/')) anchor.setAttribute('href',DEMO_PATH+'#about');
        else if(url.pathname==='/contact' || url.pathname.startsWith('/contact/')) anchor.setAttribute('href','mailto:info@nguyenarchitecture.com');
        else if(url.pathname==='/') anchor.setAttribute('href',DEMO_PATH);
      }
      if(label==='Home' || label==='Back' || label==='Back Home' || label==='Back to Home' || label==='Go Back'){
        anchor.setAttribute('href',DEMO_PATH);
        if(anchor.dataset.nguyenHomeLink!=='true'){
          anchor.dataset.nguyenHomeLink='true';
          anchor.addEventListener('click',goHome);
        }
      }
      if(label==='Projects') anchor.setAttribute('href',PROJECTS_PATH);
      if(label==='Services') anchor.setAttribute('href',DEMO_PATH+'#services');
      if(label==='About' || label==='About us') anchor.setAttribute('href',DEMO_PATH+'#about');
      if(label==='Get Template' || label==='Contact NGUYEN') anchor.setAttribute('href','mailto:info@nguyenarchitecture.com');
      if(['Facebook','Instagram','Linkedin','Twitter/X','Youtube','Pinterest'].includes(label)){
        anchor.setAttribute('href',FACEBOOK);
        anchor.setAttribute('target','_blank');
      }
      if(href.startsWith('mailto:')) anchor.setAttribute('href','mailto:info@nguyenarchitecture.com');
      if(href.startsWith('tel:')) anchor.setAttribute('href','tel:7147078889');
    });
  }

  function patchText(){
    patchLogo();
    patchProjects();
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())){
      const next=exact.get(normalize(node.nodeValue));
      if(next!==undefined && node.nodeValue!==next) node.nodeValue=next;
    }
    patchNavigation();
  }

  try{ history.replaceState({nguyenDemo:true},'',PROJECTS_PATH); }catch{}
  patchText();
  document.addEventListener('DOMContentLoaded',patchText,{once:true});
  let runs=0;
  const timer=setInterval(()=>{ patchText(); runs+=1; if(runs>=48) clearInterval(timer); },250);
})();
</script>`;

async function getSource(){
  let lastError:unknown=null;
  for(let attempt=0;attempt<3;attempt+=1){
    try{
      const response=await fetch(SOURCE_URL,{cache:'no-store',headers:{'User-Agent':'Mozilla/5.0',Accept:'text/html,application/xhtml+xml'}});
      if(response.ok) return response.text();
      lastError=new Error(`Upstream returned ${response.status}`);
    }catch(error){ lastError=error; }
    if(attempt<2) await new Promise((resolve)=>setTimeout(resolve,200*(attempt+1)));
  }
  throw lastError instanceof Error?lastError:new Error('Unable to load source');
}

export async function GET(){
  try{
    let html=await getSource();
    html=html.replace(/<head([^>]*)>/i,`<head$1><base href="https://architectured.framer.website/"><meta name="robots" content="noindex,nofollow,noarchive">${CLEANUP}`);
    html=html.replace(/<title>[^<]*<\/title>/i,'<title>Our Projects — NGUYEN Architecture & Engineering</title>');
    html=html.replace(/<\/body>/i,`${CLIENT_PATCH}</body>`);
    return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store, max-age=0','X-Robots-Tag':'noindex, nofollow, noarchive'}});
  }catch{
    return new Response(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="refresh" content="2"><title>Loading Our Projects</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#061b36;color:#fff;font-family:Arial,sans-serif}p{color:#d99a2b}</style></head><body><main><h1>NGUYEN Architecture & Engineering</h1><p>Loading Our Projects…</p></main></body></html>`,{status:200,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow, noarchive'}});
  }
}

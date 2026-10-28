import sys,os,glob
from playwright.sync_api import sync_playwright
root=os.path.abspath(os.path.join(os.path.dirname(__file__),'..'))
pages=sorted(glob.glob(root+'/*.html'));W=[360,414,768,821,981,1280,1920]
js='''()=>{const o={ov:document.documentElement.scrollWidth-innerWidth,small:[],tap:[],sec:[]};
document.querySelectorAll('main *,footer *,header *').forEach(e=>{if(!e.childNodes.length)return;const t=[...e.childNodes].some(n=>n.nodeType==3&&n.textContent.trim());if(t&&e.offsetParent&&parseFloat(getComputedStyle(e).fontSize)<16&&!e.closest('small,.sur,.pastilles,footer'))o.small.push(e.tagName+':'+e.textContent.trim().slice(0,20))});
document.querySelectorAll('a,button,input,select,textarea').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&(r.height<44-.5)&&!e.closest('p,li:not(nav li)')&&getComputedStyle(e).display!='inline')o.tap.push(e.tagName+':'+(e.textContent||'').trim().slice(0,15)+Math.round(r.height))});
document.querySelectorAll('main>section').forEach(s=>o.sec.push(Math.round(s.getBoundingClientRect().height/innerHeight*100)));
const l=[...document.images].filter(i=>!i.complete||!i.naturalWidth).length;o.broken=l;return o}'''
bad=0
with sync_playwright() as p:
    b=p.chromium.launch()
    for f in pages:
        for w in W:
            pg=b.new_page(viewport={'width':w,'height':800 if w<900 else 900});pg.goto('file://'+f);pg.wait_for_load_state('load')
            pg.evaluate("document.querySelectorAll('img').forEach(i=>i.loading='eager')");pg.wait_for_timeout(300)
            o=pg.evaluate(js)
            if o['ov']>0 or o['small'] or o['broken'] or (o['tap'] and w<981):
                bad+=1;print(os.path.basename(f),w,{k:v for k,v in o.items() if k!='sec' and v})
            if w in(390,1280) or w==414:print(os.path.basename(f),w,'sections%',o['sec'])
            pg.close()
        # liens
        import re
        for h in re.findall(r'(?:href|src)="([^"#:]+)"',open(f).read()):
            if not os.path.exists(os.path.join(root,h.split('?')[0])):print('LIEN',os.path.basename(f),h)
    b.close()
tot=sum(os.path.getsize(i) for i in glob.glob(root+'/images/*'))
print('images',tot//1000,'Ko; anomalies',bad)

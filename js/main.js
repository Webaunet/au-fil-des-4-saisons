(function(){
var b=document.querySelector('.burger'),n=document.getElementById('menu');
if(!b||!n)return;
function f(o){n.classList.toggle('ouvert',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Fermer le menu':'Ouvrir le menu')}
b.addEventListener('click',function(){f(!n.classList.contains('ouvert'))});
n.addEventListener('click',function(e){if(e.target.closest('a'))f(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&n.classList.contains('ouvert')){f(false);b.focus()}});
})();
(function(){
var f=document.getElementById('devis');if(!f)return;
var rec=document.getElementById('recap'),pre=document.getElementById('recap-texte');
function err(i,m){var e=document.getElementById(i.id+'-err');e.textContent=m;if(m)i.setAttribute('aria-invalid','true');else i.removeAttribute('aria-invalid')}
function val(){var ok=true,first=null;
[['nom',function(v){return v.trim().length>=2},'Indiquez votre nom.'],
['tel',function(v){return /^(?:\+33|0033|0)\s?[1-9](?:[\s.-]?\d{2}){4}$/.test(v.trim())},'Indiquez un numéro valide, par exemple 06 12 34 56 78.'],
['commune',function(v){return v.trim().length>=2},'Indiquez votre commune.'],
['besoin',function(v){return v!==''},'Choisissez votre besoin.']].forEach(function(c){var i=document.getElementById(c[0]);var g=c[1](i.value);err(i,g?'':c[2]);if(!g){ok=false;if(!first)first=i}});
if(first)first.focus();return ok}
f.addEventListener('submit',function(e){e.preventDefault();if(!val())return;
var g=function(i){return document.getElementById(i).value.trim()};
var t='Bonjour, demande de devis Au fil des 4 saisons.\nNom : '+g('nom')+'\nTéléphone : '+g('tel')+'\nCommune : '+g('commune')+'\nBesoin : '+g('besoin')+(g('message')?'\nMessage : '+g('message'):'');
pre.textContent=t;rec.classList.add('visible');
document.getElementById('sms').href='sms:+33610208133?body='+encodeURIComponent(t);
rec.scrollIntoView({behavior:'smooth',block:'nearest'});document.getElementById('confirm').focus()});
document.getElementById('copier').addEventListener('click',function(){var b=this,t=pre.textContent;
function ok(){b.textContent='Copié ✓';setTimeout(function(){b.textContent='Copier'},2000)}
if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(ok,function(){});
else{var a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');ok()}catch(x){}a.remove()}});
})();

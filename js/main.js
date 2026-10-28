(function(){
var b=document.querySelector('.burger'),n=document.getElementById('menu');
if(!b||!n)return;
function f(o){n.classList.toggle('ouvert',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Fermer le menu':'Ouvrir le menu')}
b.addEventListener('click',function(){f(!n.classList.contains('ouvert'))});
n.addEventListener('click',function(e){if(e.target.closest('a'))f(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&n.classList.contains('ouvert')){f(false);b.focus()}});
})();

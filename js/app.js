
(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var esc=function(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var peso=function(n){return '\u20B1'+Number(n).toLocaleString('en-PH')};
var slug=function(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')};
/* Facebook links (galing sa js/settings.js) */
/* Tinatanggap ang username, ang numero (ID), o ang buong link ng page */
var FB_ID=String(SHOP.facebookPage||'').replace(/[?#].*$/,'').replace(/\/+$/,'').split('/').pop();
var FB_URL=FB_ID?(/^\d+$/.test(FB_ID)?'https://www.facebook.com/profile.php?id='+FB_ID:'https://www.facebook.com/'+FB_ID):'https://www.facebook.com/search/pages?q='+encodeURIComponent(SHOP.facebookSearch);

/* ---------- menu (galing sa js/menu.js) ---------- */
var BUILT=buildMenu();
var CATS=BUILT.cats, CATBY=BUILT.catBy, ITEMS=BUILT.items, BYID=BUILT.byId;

/* ---------- helpers ---------- */
function minPrice(it){return Math.min.apply(null,it.sizes.map(function(s){return s.p}))}
function isDrink(it){return CATBY[it.cat].g==='drinks'}
function cardHTML(it){
  var sizeLine=it.sizes.length>1?it.sizes.map(function(s){return esc(s.l)}).join(' · '):(it.sizes[0].l==='Set'||it.sizes[0].l==='Meal'?'':esc(it.sizes[0].l));
  var from=it.sizes.length>1?'<small>from</small>':'';
  return '<article class="card">'+itemArt(it)+'<div class="body"><h3>'+esc(it.name)+'</h3>'+(sizeLine?'<p class="sz">'+sizeLine+'</p>':'')+(it.desc?'<p class="desc">'+esc(it.desc)+'</p>':'')
   +'<div class="price">'+from+peso(minPrice(it))+'</div></div><button class="add" type="button" data-open="'+it.id+'" aria-label="Add '+esc(it.name)+' to cart">Add to cart</button></article>';
}

/* ---------- render page sections ---------- */
var nDrinks=ITEMS.filter(isDrink).length, nFood=ITEMS.length-nDrinks;
var lowest=Math.min.apply(null,ITEMS.map(minPrice));
var factsEl=$('#facts');if(factsEl)factsEl.innerHTML=[[nDrinks,'drinks on the menu'],[nFood,'food items'],[peso(lowest),'is our lowest price']].map(function(f){return '<div class="fact"><b>'+f[0]+'</b><span>'+f[1]+'</span></div>'}).join('');

/* Galing sa link: menu.html?type=drinks | ?type=food | ?cat=coffee | ?q=oreo */
var PARAMS=new URLSearchParams(location.search);
var state={cat:'all',q:(PARAMS.get('q')||''),g:''};
(function(){
  var c=PARAMS.get('cat'),t=PARAMS.get('type');
  if(c&&CATBY[c]){state.cat=c;state.g=CATBY[c].g}
  else if(t==='food'||t==='drinks')state.g=t;
  else if(!state.q)state.g='drinks';
})();
var PAGE=document.body.getAttribute('data-page');
function renderChips(){
  var box=$('#chips');if(!box)return;
  function chip(id,name){return '<button class="chip" type="button" data-cat="'+id+'" aria-pressed="'+(state.cat===id)+'">'+esc(name)+'</button>'}
  var g=state.g||'drinks';
  var list=CATS.filter(function(c){return c.g===g}).map(function(c){return chip(c.id,c.name)}).join('');
  box.innerHTML='<div class="crow">'+chip('all','All '+(g==='drinks'?'drinks':'food'))+list+'</div>';
}
function renderMenu(){
  var list=$('#menuList');if(!list)return;
  var q=state.q.trim().toLowerCase(),html='',any=false;
  var title=$('#pageTitle');
  if(title)title.textContent=q?'Search results':(state.g==='food'?'Food':'Drinks');
  CATS.forEach(function(c){
    if(!q&&state.g&&c.g!==state.g)return;
    if(!q&&state.cat!=='all'&&state.cat!==c.id)return;
    var items=ITEMS.filter(function(i){return i.cat===c.id&&(!q||(i.name+' '+c.name+' '+(i.desc||'')+' '+(c.g==='drinks'?'drinks drink beverage beverages inumin':'food foods meal meals pagkain')).toLowerCase().indexOf(q)>-1)});
    if(!items.length)return; any=true;
    html+='<div class="cat" id="cat-'+c.id+'"><span class="tag">'+(c.g==='drinks'?'Drinks':'Food')+'</span><h2>'+esc(c.name)+'</h2>'+(c.blurb?'<p class="blurb">'+esc(c.blurb)+'</p>':'<div style="height:14px"></div>')+'<div class="grid">'+items.map(cardHTML).join('')+'</div>'+(c.info?'<p class="info">'+esc(c.info)+'</p>':'')+'</div>';
  });
  list.innerHTML=any?html:'<p class="empty">Nothing matches “'+esc(state.q)+'”. Try another word, like “wings” or “mocha”.</p>';
}
renderChips();renderMenu();

/* ---------- cart state ---------- */
var CART=[];
try{var saved=JSON.parse(localStorage.getItem('tt1011-cart')||'[]');if(Array.isArray(saved))CART=saved.filter(function(l){return BYID[l.itemId]})}catch(e){}
function persist(){try{localStorage.setItem('tt1011-cart',JSON.stringify(CART))}catch(e){}}
function count(){return CART.reduce(function(a,l){return a+l.qty},0)}
function subtotal(){return CART.reduce(function(a,l){return a+l.unit*l.qty},0)}
var prevN=null;
function updateBadges(){
  var n=count();
  var cc=$('#cartCount');
  cc.textContent=n;
  if(prevN!==null&&n>prevN){cc.classList.remove('bump');void cc.offsetWidth;cc.classList.add('bump')}
  prevN=n;
  var bar=$('#cartBar');
  var drawerOpen=$('#cartOv').classList.contains('on')||$('#dlgOv').classList.contains('on'),itemOpen=$('#itemOv').classList.contains('on');
  bar.classList.toggle('on',n>0&&!drawerOpen&&!itemOpen);
  $('#barText').textContent=n+(n===1?' item':' items')+' · View order';
  $('#barTotal').textContent=peso(subtotal());
}
var toastT;
function toast(msg){var t=$('#toast');t.textContent=msg;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(function(){t.classList.remove('on')},1800)}
function lock(){document.documentElement.classList.toggle('lock',$('#itemOv').classList.contains('on')||$('#cartOv').classList.contains('on')||$('#dlgOv').classList.contains('on'))}

/* ---------- item sheet ---------- */
var M=null,lastFocus=null;
function num(v,size){return Array.isArray(v)?v[size]:v}
function val(gid){var g=M.item.groups.filter(function(x){return x.id===gid})[0];var i=M.sel[gid];return g&&i!=null?g.choices[i].label:null}
function visible(){return M.item.groups.filter(function(g){return !g.showIf||g.showIf(val)})}
function unitPrice(){
  var p=M.item.sizes[M.size].p;
  visible().forEach(function(g){
    var s=M.sel[g.id];
    if(g.type==='radio'){if(s!=null&&g.choices[s].price)p+=g.choices[s].price}
    else s.forEach(function(i){if(g.choices[i].price)p+=g.choices[i].price});
  });
  return p;
}
function openItem(id,trigger){
  var it=BYID[id];if(!it)return;
  lastFocus=trigger||document.activeElement;
  M={item:it,size:0,sel:{},qty:1,note:''};
  it.groups.forEach(function(g){M.sel[g.id]=g.type==='radio'?g.def:[]});
  renderItem();
  $('#itemOv').classList.add('on');lock();updateBadges();
  var f=$('#itemSheet .x');if(f)f.focus();
}
function renderItem(){
  var it=M.item,keep=$('#itemSheet .sheet-body'),st=keep?keep.scrollTop:0;
  var h='<div class="sheet-head"><div><p class="eyebrow">'+esc(CATBY[it.cat].name)+'</p><h2 id="mTitle">'+esc(it.name)+'</h2></div><button class="x" type="button" data-act="closeitem" aria-label="Close">×</button></div><div class="sheet-body">';
  if(it.desc)h+='<p class="desc" style="color:var(--muted)">'+esc(it.desc)+'</p>';
  if(it.sizes.length>1){
    h+='<fieldset><legend>Size</legend><div class="opts">'+it.sizes.map(function(s,i){return '<label class="opt"><input type="radio" name="m-size" id="m-size-'+i+'" data-k="size" data-i="'+i+'"'+(M.size===i?' checked':'')+'><span>'+esc(s.l)+'<small>'+peso(s.p)+'</small></span></label>'}).join('')+'</div></fieldset>';
  }
  visible().forEach(function(g){
    var s=M.sel[g.id];
    if(g.type==='radio'){
      h+='<fieldset><legend>'+esc(g.label)+'</legend><div class="opts">'+g.choices.map(function(c,i){return '<label class="opt"><input type="radio" name="m-'+g.id+'" id="m-'+g.id+'-'+i+'" data-k="radio" data-g="'+g.id+'" data-i="'+i+'"'+(s===i?' checked':'')+'><span>'+esc(c.label)+(c.price?'<small>+'+peso(c.price)+'</small>':'')+'</span></label>'}).join('')+'</div></fieldset>';
    }else{
      var mx=num(g.max,M.size),mn=num(g.min,M.size);
      var hint=mn===mx&&mn>0?'Pick '+mx+' ('+s.length+'/'+mx+')':(mn>0?'Pick '+mn+'+':'Optional');
      h+='<fieldset><legend>'+esc(g.label)+'<small>'+hint+'</small></legend><div class="opts">'+g.choices.map(function(c,i){
        var on=s.indexOf(i)>-1,dis=!on&&s.length>=mx;
        return '<label class="opt"><input type="checkbox" id="m-'+g.id+'-'+i+'" data-k="multi" data-g="'+g.id+'" data-i="'+i+'"'+(on?' checked':'')+(dis?' disabled':'')+'><span>'+esc(c.label)+(c.tag?'<small class="hot">'+esc(c.tag)+'</small>':'')+(c.price?'<small>+'+peso(c.price)+'</small>':'')+'</span></label>';
      }).join('')+'</div></fieldset>';
    }
  });
  h+='<div class="field"><label for="m-note">Notes for the shop <span style="font-weight:500;color:var(--muted)">(optional)</span></label><textarea id="m-note" placeholder="Example: less sweet, no onions">'+esc(M.note)+'</textarea></div>';
  h+='<div class="row2"><strong>Quantity</strong><div class="stepper"><button type="button" data-act="mq" data-d="-1" aria-label="Fewer">−</button><output id="m-qty">'+M.qty+'</output><button type="button" data-act="mq" data-d="1" aria-label="More">+</button></div></div></div>';
  h+='<div class="sheet-foot"><p class="err" id="m-err" role="alert"></p><button class="btn primary wide" type="button" data-act="addline" id="m-add">Add to cart · '+peso(unitPrice()*M.qty)+'</button></div>';
  $('#itemSheet').innerHTML=h;
  var nb=$('#itemSheet .sheet-body');if(nb)nb.scrollTop=st;
}
function closeItem(){
  $('#itemOv').classList.remove('on');lock();updateBadges();M=null;
  if(lastFocus&&lastFocus.focus)try{lastFocus.focus()}catch(e){}
}
function onItemChange(e){
  var t=e.target;if(!t.dataset||!t.dataset.k)return;
  var id=t.id,k=t.dataset.k,i=+t.dataset.i;
  if(k==='size'){
    M.size=i;
    M.item.groups.forEach(function(g){if(g.type==='multi'){var mx=num(g.max,M.size);if(M.sel[g.id].length>mx)M.sel[g.id]=M.sel[g.id].slice(0,mx)}});
  }else if(k==='radio'){
    M.sel[t.dataset.g]=i;
    M.item.groups.forEach(function(g){if(g.showIf&&!g.showIf(val))M.sel[g.id]=g.def});
  }else{
    var arr=M.sel[t.dataset.g],p=arr.indexOf(i);
    if(t.checked&&p<0)arr.push(i);if(!t.checked&&p>-1)arr.splice(p,1);
  }
  renderItem();
  var again=document.getElementById(id);if(again)again.focus();
}
function addLine(){
  var it=M.item,err='';
  var picks=[];
  visible().forEach(function(g){
    var s=M.sel[g.id];
    if(g.type==='radio'){
      if(s==null&&!err)err='Choose an option for “'+g.label+'”.';
      else if(s!=null)picks.push([g.label,g.choices[s].label+(g.choices[s].price?' (+'+peso(g.choices[s].price)+')':'')]);
    }else{
      var mn=num(g.min,M.size);
      if(s.length<mn&&!err)err='Pick '+mn+' for “'+g.label+'” ('+s.length+' chosen).';
      else if(s.length)picks.push([g.label,s.map(function(i){return g.choices[i].label+(g.choices[i].price?' (+'+peso(g.choices[i].price)+')':'')}).join(', ')]);
    }
  });
  if(err){$('#m-err').textContent=err;return}
  var size=it.sizes.length>1?it.sizes[M.size].l:(it.sizes[0].l==='Set'||it.sizes[0].l==='Meal'?'':it.sizes[0].l);
  var note=M.note.trim();
  var key=it.id+'|'+size+'|'+JSON.stringify(picks)+'|'+note;
  var ex=CART.filter(function(l){return l.key===key})[0];
  if(ex)ex.qty+=M.qty;else CART.push({key:key,itemId:it.id,name:it.name,size:size,picks:picks,note:note,unit:unitPrice(),qty:M.qty});
  persist();
  var nm=it.name;closeItem();updateBadges();toast('Added to cart: '+nm);
}

/* ---------- cart drawer ---------- */
function openCart(){
  lastFocus=document.activeElement;
  renderCart();
  $('#cartOv').classList.add('on');lock();updateBadges();
  var f=$('#cartSheet .x');if(f)f.focus();
}
function closeCart(){
  $('#cartOv').classList.remove('on');lock();updateBadges();
  if(lastFocus&&lastFocus.focus)try{lastFocus.focus()}catch(e){}
}
function renderCart(){
  var h='<div class="sheet-head"><div><p class="eyebrow">Review your items</p><h2 id="cTitle">Your cart</h2></div><button class="x" type="button" data-act="closecart" aria-label="Close">×</button></div>';
  if(!CART.length){
    h+='<div class="sheet-body"><p class="empty" style="padding:24px 0">Your cart is empty. Add a drink or a meal from the menu.</p></div><div class="sheet-foot"><button class="btn primary wide" type="button" data-act="closecart" data-go="#menu">Browse the menu</button></div>';
  }else{
    h+='<div class="sheet-body" style="gap:0">'+CART.map(function(l,i){
      var meta=[];if(l.size)meta.push(l.size);l.picks.forEach(function(p){meta.push(p[0]+': '+p[1])});if(l.note)meta.push('Note: '+l.note);
      return '<div class="line"><div><h4>'+esc(l.name)+'</h4><p class="meta">'+meta.map(esc).join(' · ')+'</p></div><div class="tot">'+peso(l.unit*l.qty)+'</div><div class="ctl"><div class="stepper"><button type="button" data-act="lq" data-i="'+i+'" data-d="-1" aria-label="Fewer '+esc(l.name)+'">−</button><output>'+l.qty+'</output><button type="button" data-act="lq" data-i="'+i+'" data-d="1" aria-label="More '+esc(l.name)+'">+</button></div><button class="link-btn" type="button" data-act="rm" data-i="'+i+'">Remove</button></div></div>';
    }).join('')+'</div>';
    h+='<div class="sheet-foot"><div class="sum"><span>Total</span><span>'+peso(subtotal())+'</span></div>'
     +'<button class="btn primary wide" type="button" data-act="checkout">Checkout</button>'
     +'<div class="foot2"><button class="link-btn" type="button" data-act="closecart" data-go="#menu">Add more items</button><button class="link-btn" type="button" data-act="newOrder">Clear cart</button></div></div>';
  }
  $('#cartSheet').innerHTML=h;
}

/* ---------- checkout: tanong (Yes/No) at "order received" ---------- */
var D={step:'',ref:'',items:[],total:0};
function summaryHTML(lines){
  return '<ul class="osum">'+lines.map(function(l){
    var meta=[];if(l.size)meta.push(l.size);l.picks.forEach(function(p){meta.push(p[0]+': '+p[1])});if(l.note)meta.push('Note: '+l.note);
    return '<li><span><b>'+l.qty+'x</b> '+esc(l.name)+(meta.length?'<small>'+meta.map(esc).join(' · ')+'</small>':'')+'</span><span>'+peso(l.unit*l.qty)+'</span></li>';
  }).join('')+'</ul>';
}
function renderDialog(){
  var h='';
  if(D.step==='confirm'){
    h='<div class="dlg-body"><h2 id="dTitle">Place your order?</h2><p class="dlg-q">Is this your final order?</p>'+summaryHTML(CART)+'<div class="sum"><span>Total</span><span>'+peso(subtotal())+'</span></div></div>'
     +'<div class="dlg-foot"><button class="btn wide" type="button" data-act="confirmno">No, go back</button><button class="btn primary wide" type="button" data-act="confirmyes">Yes, place order</button></div>';
  }else if(D.step==='done'){
    h='<div class="dlg-body center"><div class="check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>'
     +'<h2 id="dTitle">Congratulations!</h2><p class="dlg-q">Your order has been received. Thank you for choosing 10-11 Bubble Tea Shop!</p><p class="ref">Order no. <b>'+esc(D.ref)+'</b></p>'+summaryHTML(D.items)+'<div class="sum"><span>Total</span><span>'+peso(D.total)+'</span></div></div>'
     +'<div class="dlg-foot"><button class="btn primary wide" type="button" data-act="donedone">Done</button></div>';
  }
  $('#dlgSheet').innerHTML=h;
}
function openDialog(step){
  D.step=step;renderDialog();
  $('#dlgOv').classList.add('on');lock();updateBadges();
  var b=$('#dlgSheet .btn.primary');if(b)b.focus();
}
function closeDialog(){
  $('#dlgOv').classList.remove('on');D.step='';lock();updateBadges();
}
function startCheckout(){
  if(!CART.length){toast('Your cart is empty');return}
  if($('#cartOv').classList.contains('on'))closeCart();
  if($('#dlgOv').classList.contains('on'))closeDialog();
  else if($('#itemOv').classList.contains('on'))closeItem();
  openDialog('confirm');
}
function placeOrder(){
  D.ref=('T'+Date.now().toString(36).slice(-5)).toUpperCase();
  D.items=CART.slice();D.total=subtotal();
  CART=[];persist();updateBadges();
  D.step='done';renderDialog();
  var b=$('#dlgSheet .btn.primary');if(b)b.focus();
}
function copyText(txt,msgEl){
  function fallback(){
    var pre=$('#orderText');
    if(pre){var r=document.createRange();r.selectNodeContents(pre);var s=window.getSelection();s.removeAllRanges();s.addRange(r)}
    if(msgEl)msgEl.textContent='Select the text above and copy it.';
  }
  try{
    navigator.clipboard.writeText(txt).then(function(){if(msgEl)msgEl.textContent='Copied! Paste it in Messenger and press send.';else toast('Copied')},fallback);
  }catch(e){fallback()}
}

/* ---------- events ---------- */
document.addEventListener('click',function(e){
  var el=e.target.closest('[data-open],[data-act],[data-cat],[data-copy]');
  if(!el)return;
  if(el.dataset.open){openItem(el.dataset.open,el);return}
  if(el.dataset.cat){state.cat=el.dataset.cat;state.q='';[].forEach.call(document.querySelectorAll('[data-sq]'),function(i){i.value=''});renderChips();renderMenu();var m=$('#menuList');if(m)window.scrollTo({top:m.getBoundingClientRect().top+window.scrollY-170,behavior:'smooth'});return}
  if(el.dataset.copy){copyText(el.dataset.copy,null);return}
  var a=el.dataset.act;
  if((a==='closeitem'||a==='closecart'||a==='dlgclose')&&el.classList.contains('overlay')&&e.target!==el)return;
  if(a==='dlgclose'){closeDialog();return}
  if(a==='opencart')openCart();
  else if(a==='closecart'){closeCart();if(el.dataset.go){var t=$(el.dataset.go);if(t)t.scrollIntoView({behavior:'smooth'})}}
  else if(a==='closeitem')closeItem();
  else if(a==='mq'){M.qty=Math.max(1,Math.min(50,M.qty+(+el.dataset.d)));$('#m-qty').textContent=M.qty;$('#m-add').textContent='Add to cart · '+peso(unitPrice()*M.qty)}
  else if(a==='addline')addLine();
  else if(a==='lq'){var l=CART[+el.dataset.i];l.qty=Math.max(1,Math.min(50,l.qty+(+el.dataset.d)));persist();renderCart();updateBadges()}
  else if(a==='rm'){CART.splice(+el.dataset.i,1);persist();renderCart();updateBadges()}
  else if(a==='checkout')startCheckout();
  else if(a==='confirmno'){closeDialog();openCart()}
  else if(a==='confirmyes')placeOrder();
  else if(a==='donedone')closeDialog();
  else if(a==='newOrder'){CART=[];persist();renderCart();updateBadges()}
});
$('#itemSheet').addEventListener('change',onItemChange);
$('#itemSheet').addEventListener('input',function(e){if(e.target.id==='m-note')M.note=e.target.value});
/* Search: sa menu.html live ang filter. Sa home page, dadalhin ka sa menu.html */
function runSearch(v){
  if(PAGE==='menu'){state.q=v;state.cat='all';[].forEach.call(document.querySelectorAll('[data-sq]'),function(i){if(i.value!==v)i.value=v});renderChips();renderMenu();
    var m=$('#menuList');if(v.trim()&&m&&m.getBoundingClientRect().top>window.innerHeight*.6)window.scrollTo({top:m.getBoundingClientRect().top+window.scrollY-170,behavior:'smooth'})}
  else if(v.trim())location.href='menu.html?q='+encodeURIComponent(v.trim());
}
[].forEach.call(document.querySelectorAll('[data-sq]'),function(inp){
  if(state.q)inp.value=state.q;
  var t;
  inp.addEventListener('input',function(){clearTimeout(t);var v=inp.value;t=setTimeout(function(){runSearch(v)},PAGE==='menu'?120:700)});
  inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();clearTimeout(t);runSearch(inp.value)}});
});
document.addEventListener('keydown',function(e){
  if(e.key!=='Escape')return;
  if($('#dlgOv').classList.contains('on'))closeDialog();
  else if($('#itemOv').classList.contains('on'))closeItem();
  else if($('#cartOv').classList.contains('on'))closeCart();
});
var fbl=$('#fbLink');if(fbl)fbl.setAttribute('href',FB_URL);
Array.prototype.forEach.call(document.querySelectorAll('[data-fb]'),function(el){el.setAttribute('href',FB_URL)});

/* shop details (galing sa js/settings.js) */
Array.prototype.forEach.call(document.querySelectorAll('[data-shop]'),function(el){var v=SHOP[el.getAttribute('data-shop')];if(v)el.textContent=v});
Array.prototype.forEach.call(document.querySelectorAll('[data-shop-copy]'),function(el){var v=SHOP[el.getAttribute('data-shop-copy')];if(v)el.setAttribute('data-copy',v)});
Array.prototype.forEach.call(document.querySelectorAll('[data-shop-maps]'),function(el){el.setAttribute('href','https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(SHOP.mapsQuery))});

/* mobile menu */
var hdr=$('#siteHeader'),burger=$('#burger');
function setMenu(open){hdr.classList.toggle('open',open);burger.setAttribute('aria-expanded',String(open));burger.setAttribute('aria-label',open?'Close menu':'Open menu')}
burger.addEventListener('click',function(){setMenu(!hdr.classList.contains('open'))});
$('#mainNav').addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
updateBadges();

/* Hero 2: lumalabas ang text kapag na-scroll na */
try{
  var h2=$('.hero2');
  if(h2&&'IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.documentElement.classList.add('js');
    new IntersectionObserver(function(en,ob){en.forEach(function(x){if(x.isIntersecting){h2.classList.add('in');ob.disconnect()}})},{threshold:.35}).observe(h2);
  }
}catch(e){}

/* active link sa header (home page lang) */
(function(){
  if(PAGE!=='home')return;
  var links=[].slice.call(document.querySelectorAll('#mainNav a'));
  function spy(){var y=window.scrollY+120,cur=links[0];links.forEach(function(a){var id=a.getAttribute('href'),el=id==='#top'?null:document.querySelector(id);if(el&&el.offsetTop<=y)cur=a});links.forEach(function(a){a.classList.toggle('on',a===cur)})}
  window.addEventListener('scroll',spy,{passive:true});spy();
})();

/* ---------- awtomatikong pag-fit ng mga litrato sa loob ng bilog ----------
   1) PNG na transparent ang paligid: iko-center at ila-laki ang laman para magkasya sa loob ng bilog.
   2) Litratong may solid na background (parang kinunan lang): gagawing bilog ang litrato mismo. */
(function(){
  var CUTOUT=false;  /* true = subukang burahin ang solid na background ng litrato; false = gawing bilog na lang */
  var MFILL=0.74;  /* laki ng baso sa loob ng tall card ng menu page (0.74 = 74% ng lapad). Palitan kung gusto mong mas malaki/maliit */
  var FILL=0.66;   /* gaano kalaki ang laman kumpara sa card (0.66 = kasya sa loob ng bilog; ang bilog ay 0.74). Palitan kung gusto mong mas malaki/maliit */
  /* Binubura ang solid na background (flood-fill mula sa gilid). Ibinabalik ang transparent na PNG o null. */
  function cutout(img){
    try{
      var w0=img.naturalWidth,h0=img.naturalHeight,k=Math.min(1,700/Math.max(w0,h0)),w=Math.round(w0*k),h=Math.round(h0*k);
      var c=document.createElement('canvas');c.width=w;c.height=h;
      var x=c.getContext('2d',{willReadFrequently:true});x.drawImage(img,0,0,w,h);
      var im=x.getImageData(0,0,w,h),d=im.data,n=w*h;
      /* kulay ng background: average ng mga gilid */
      var r=0,g=0,b=0,cnt=0,t;
      function add(px,py){var o=(py*w+px)*4;r+=d[o];g+=d[o+1];b+=d[o+2];cnt++}
      for(t=0;t<w;t+=3){add(t,0);add(t,h-1)}for(t=0;t<h;t+=3){add(0,t);add(w-1,t)}
      r/=cnt;g/=cnt;b/=cnt;
      var seen=new Uint8Array(n),q=new Int32Array(n),qh=0,qt=0;
      function near(o,pr,pg,pb){
        var dr=d[o]-r,dg=d[o+1]-g,db=d[o+2]-b;
        if(dr*dr+dg*dg+db*db>38*38)return false;                 /* malayo sa kulay ng background */
        return Math.abs(d[o]-pr)+Math.abs(d[o+1]-pg)+Math.abs(d[o+2]-pb)<=18; /* pantay na pagbabago lang */
      }
      function seed(px,py){var i=py*w+px,o=i*4;if(seen[i])return;var dr=d[o]-r,dg=d[o+1]-g,db=d[o+2]-b;if(dr*dr+dg*dg+db*db<=30*30){seen[i]=1;q[qt++]=i}}
      for(t=0;t<w;t++){seed(t,0);seed(t,h-1)}for(t=0;t<h;t++){seed(0,t);seed(w-1,t)}
      while(qh<qt){
        var i=q[qh++],px=i%w,py=(i-px)/w,o=i*4,nb=[px>0?i-1:-1,px<w-1?i+1:-1,py>0?i-w:-1,py<h-1?i+w:-1];
        for(var j=0;j<4;j++){var m=nb[j];if(m<0||seen[m])continue;if(near(m*4,d[o],d[o+1],d[o+2])){seen[m]=1;q[qt++]=m}}
      }
      var frac=qt/n;
      if(frac<.12||frac>.9)return null;                          /* kakaiba ang resulta, huwag gamitin */
      for(var a=0;a<n;a++){
        if(seen[a]){d[a*4+3]=0}
      }
      /* lambot ng gilid: ang pixel na katabi ng binura ay nagiging half-transparent */
      var edge=[];
      for(a=0;a<n;a++){if(seen[a])continue;var ax=a%w,ay=(a-ax)/w;
        if((ax>0&&seen[a-1])||(ax<w-1&&seen[a+1])||(ay>0&&seen[a-w])||(ay<h-1&&seen[a+w]))edge.push(a)}
      edge.forEach(function(e){d[e*4+3]=110});
      x.putImageData(im,0,0);
      return c.toDataURL('image/png');
    }catch(e){return null}
  }
  function fit(img){
    try{
      var w=img.naturalWidth,h=img.naturalHeight;if(!w||!h)return;
      var k=Math.min(1,160/Math.max(w,h)),cw=Math.max(1,Math.round(w*k)),ch=Math.max(1,Math.round(h*k));
      var c=document.createElement('canvas');c.width=cw;c.height=ch;
      var x=c.getContext('2d',{willReadFrequently:true});x.drawImage(img,0,0,cw,ch);
      var d=x.getImageData(0,0,cw,ch).data,x0=cw,y0=ch,x1=-1,y1=-1,i,y;
      for(y=0;y<ch;y++)for(i=0;i<cw;i++){if(d[(y*cw+i)*4+3]>24){if(i<x0)x0=i;if(i>x1)x1=i;if(y<y0)y0=y;if(y>y1)y1=y}}
      if(x1<0)return;
      var bw=(x1-x0+1)/cw,bh=(y1-y0+1)/ch;
      /* walang transparent na gilid = solid na litrato */
      var corners=[0,(cw-1)*4,((ch-1)*cw)*4,((ch-1)*cw+cw-1)*4].every(function(o){return d[o+3]>200});
      if(corners&&bw>.97&&bh>.97){
        /* solid na background: subukang burahin ang background; kapag hindi kaya, gawing bilog */
        if(CUTOUT&&!img.dataset.cut){var cut=cutout(img);if(cut){img.dataset.cut='1';img.src=cut;return}}
        img.classList.add('round');img.style.transform='';return
      }
      img.classList.remove('round');
      var cx=(x0+x1+1)/2/cw,cy=(y0+y1+1)/2/ch;
      var box=img.parentNode,bW=box.clientWidth,bH=box.clientHeight;if(!bW||!bH)return;
      var sc=Math.min(bW/w,bH/h),rw=w*sc,rh=h*sc;
      var s=PAGE==='menu'?Math.min(MFILL*bW/(bw*rw),(MFILL-.06)*bH/(bh*rh)):Math.min(FILL*bW/Math.hypot(bw*rw,bh*rh),0.9*bW/(bw*rw),0.9*bH/(bh*rh));   /* sa menu page, tall card: halos buong lapad/taas ang gamit */
      s=Math.max(.4,Math.min(s,2.2));
      var tx=-s*(cx-.5)*rw/bW*100,ty=-s*(cy-.5)*rh/bH*100;
      img.style.transform='translate('+tx.toFixed(2)+'%,'+ty.toFixed(2)+'%) scale('+s.toFixed(3)+')';
    }catch(e){/* kapag file:// ang gamit, hindi ito gagana; gamitin ang Live Server */}
  }
  function all(){[].forEach.call(document.querySelectorAll('.pic.photo img'),function(i){if(i.complete)fit(i)})}
  document.addEventListener('load',function(e){var t=e.target;if(t&&t.tagName==='IMG'&&t.parentNode&&t.parentNode.classList.contains('photo'))fit(t)},true);
  all();
  var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(all,200)});
})();

})();

/* ===== ORDERING GUIDE (nakasama na rito, kaya gagana kahit wala ang js/guide.js) ===== */
(function(){
  if(window.__tt1011Guide)return;window.__tt1011Guide=1;   /* para hindi tumakbo nang dalawang beses */
  var GUIDE_ON = true;
  var KEY='tt1011-guide-v2',SKIP='tt1011-guide-skip-v2';   /* bagong susi: binabalewala ang lumang "off" mula sa naunang bersyon */
  function get(){try{return localStorage.getItem(KEY)}catch(e){return null}}
  function set(v){try{v===null?localStorage.removeItem(KEY):localStorage.setItem(KEY,v)}catch(e){}}
  function loadSkip(){try{var a=JSON.parse(localStorage.getItem(SKIP)||'[]');return Array.isArray(a)?a:[]}catch(e){return []}}
  function saveSkip(a){try{a.length?localStorage.setItem(SKIP,JSON.stringify(a)):localStorage.removeItem(SKIP)}catch(e){}}
  if(!GUIDE_ON)return;

  var PAGE=document.body.getAttribute('data-page');
  var skipped=loadSkip(),curN=0,off=get()==='off',key='',target=null,delayUntil=Date.now()+2200;
  var el=document.createElement('div');
  el.id='guide';el.setAttribute('role','status');el.setAttribute('aria-live','polite');el.hidden=true;
  el.innerHTML='<span class="gh" aria-hidden="true">👆</span><div class="gb"><small class="gs"></small><span class="gt"></span><div class="gr"><button type="button" class="gx gskip">Skip this step</button><button type="button" class="gx gx2">Turn off tips</button></div></div>';
  document.body.appendChild(el);
  var hand=el.querySelector('.gh'),gs=el.querySelector('.gs'),gt=el.querySelector('.gt');
  el.querySelector('.gskip').addEventListener('click',function(){if(curN&&skipped.indexOf(curN)<0){skipped.push(curN);saveSkip(skipped)}hide()});
  el.querySelector('.gx2').addEventListener('click',function(){finish()});

  function $(s){return document.querySelector(s)}
  function on(sel){var n=$(sel);return !!(n&&n.classList.contains('on'))}
  function vis(n){return !!(n&&n.offsetParent!==null&&n.getBoundingClientRect().width>0)}
  function inView(n){var r=n.getBoundingClientRect(),h=window.innerHeight,hdr=70;return r.bottom>hdr&&r.top<h-70&&r.right>0&&r.left<window.innerWidth}
  function finish(){off=true;set('off');skipped=[];saveSkip(skipped);hide()}
  function hide(){el.hidden=true;if(target){target.classList.remove('guide-target');target=null}key=''}

  /* alin ang susunod na step? */
  function pick(){
    var count=parseInt(($('#cartCount')||{}).textContent,10)||0;
    if(on('#dlgOv')){
      var yes=$('#dlgSheet [data-act="confirmyes"]');
      if(yes)return{k:'yes',n:5,t:yes,txt:'Tap <b>Yes</b> to place your order.'};
      return{done:true};   /* "Your order has been received" */
    }
    if(on('#cartOv')){
      var co=$('#cartSheet [data-act="checkout"]');
      if(co)return{k:'co2',n:4,t:co,txt:'Looks good? Tap <b>Checkout</b>.'};
      return null;
    }
    if(on('#itemOv')){
      var add=$('#m-add');
      if(add)return{k:'add',n:3,t:add,txt:'Choose your options, then tap <b>Add to cart</b>.'};
      return null;
    }
    if(count>0){
      var cb=$('#checkoutBtn')||$('.checkoutbtn')||$('header [data-act="checkout"]')||$('#cartBar .btn');   /* may fallback kung luma ang index.html */
      if(vis(cb))return{k:'co',n:4,t:cb,txt:'Done choosing? Tap <b>Checkout</b>. You can add more first.'};
      return null;
    }
    if(PAGE==='menu'){
      var cards=[].slice.call(document.querySelectorAll('.card .add'));
      var first=cards.filter(inView)[0];
      if(first)return{k:'card',n:2,t:first,txt:'Pick a drink or meal, then tap <b>Add to cart</b>.'};
      return{k:'scroll',n:2,t:null,txt:'Scroll down and tap <b>Add to cart</b> on what you like.'};
    }
    var hero=$('.hero1 .btn.dark')||$('.hero1 .cta .btn');
    if(vis(hero)&&inView(hero))return{k:'start',n:1,t:hero,txt:'New here? Tap <b>Order now</b> to see the menu.'};
    var links=[].slice.call(document.querySelectorAll('#mainNav a')).filter(function(a){return /menu/i.test(a.textContent)});
    if(links[0]&&vis(links[0]))return{k:'start2',n:1,t:links[0],txt:'Tap <b>Menu</b> to see drinks and food.'};
    return null;
  }

  function place(s){
    var vw=window.innerWidth,vh=window.innerHeight,w=Math.min(250,vw-16);
    el.style.width=w+'px';
    if(!s.t){ /* walang target sa screen: maliit na paalala sa ibaba */
      el.classList.add('pill');hand.textContent='👇';el.style.left=Math.max(8,(vw-w)/2)+'px';el.style.top='auto';el.style.bottom='92px';hand.style.left=(w/2-14)+'px';return;
    }
    el.classList.remove('pill');el.style.bottom='auto';
    var r=s.t.getBoundingClientRect(),cx=r.left+r.width/2,left=Math.min(Math.max(8,cx-w/2),vw-w-8);
    el.style.left=left+'px';
    var h=el.offsetHeight||90,below=r.bottom+h+10<vh-8;
    el.classList.toggle('above',!below);hand.textContent=below?'👆':'👇';
    el.style.top=(below?r.bottom+4:Math.max(8,r.top-h-4))+'px';
    hand.style.left=Math.min(Math.max(6,cx-left-14),w-34)+'px';
  }

  function update(){
    if(off||get()==='off'){if(!el.hidden)hide();return}
    var s=pick();
    if(s&&s.done){off=true;skipped=[];saveSkip(skipped);hide();return}   /* tapos na ang order: nakatago lang hanggang mag-refresh; hindi permanenteng naka-off */
    if(s&&skipped.indexOf(s.n)>-1)s=null;   /* na-skip na ang step na ito */
    if(!s||Date.now()<delayUntil){if(!el.hidden)hide();return}
    if(key!==s.k){
      if(target)target.classList.remove('guide-target');
      key=s.k;curN=s.n;target=s.t;if(target)target.classList.add('guide-target');
      gs.textContent='Step '+s.n+' of 5';gt.innerHTML=s.txt;
    }
    el.hidden=false;place(s);
  }

  /* kapag may ginawa ang user, bigyan ng saglit bago lumabas ang susunod na tip */
  document.addEventListener('click',function(e){
    if(el.contains(e.target))return;
    delayUntil=Date.now()+500;
  },true);
  window.addEventListener('scroll',function(){update()},{passive:true});
  window.addEventListener('resize',update);
  setInterval(update,400);

  /* "Show me how" na button */
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-guide-start]');
    if(!b)return;
    off=false;set(null);skipped=[];saveSkip(skipped);delayUntil=Date.now()+200;key='';
    if(PAGE!=='menu'){window.scrollTo({top:0,behavior:'smooth'})}
    update();
  });
})();

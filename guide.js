/* ==========================================================
   ORDERING GUIDE: kamay na nagtuturo ng susunod na step
   - Lalabas lang sa bagong user, at hindi nakaka-istorbo (maliit, may "Skip tips").
   - "Skip this step" = tatalon lang sa step na ito; lalabas pa rin ang susunod na steps.
   - "Turn off tips" o ang pagtatapos ng unang order = hindi na lalabas ang guide.
   - Para patayin nang buo: ilagay ang  var GUIDE_ON = false;  sa baba.
   - Para ipakita ulit: pindutin ang "Show me how" sa Contact Us.
   ========================================================== */
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
    if(s&&s.done){finish();return}
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
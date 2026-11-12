/* =====================================================================
   STATUS: ang "Open now / Closed now" sa Hero 1.
   ===================================================================== */
(function(){
'use strict';
var DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var SHORT={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};
function t12(h){var s=h>=12?'PM':'AM',x=h%12;if(x===0)x=12;return x+':00 '+s}

/* date -> {open:true/false, text:'...'} */
function shopStatus(date){
  var openDays=SHOP.openDays||[1,2,3,4,5,6],openH=SHOP.openHour==null?8:SHOP.openHour,closeH=SHOP.closeHour==null?20:SHOP.closeHour;
  var parts=new Intl.DateTimeFormat('en-US',{timeZone:SHOP.timezone||'Asia/Manila',weekday:'short',hour:'numeric',minute:'numeric',hourCycle:'h23'}).formatToParts(date||new Date());
  var wd=0,h=0,m=0;
  parts.forEach(function(p){if(p.type==='weekday')wd=SHORT[p.value];if(p.type==='hour')h=(+p.value)%24;if(p.type==='minute')m=+p.value});
  var mins=h*60+m,isDay=openDays.indexOf(wd)>-1;
  if(isDay&&mins>=openH*60&&mins<closeH*60)return {open:true,text:'Open now · until '+t12(closeH)};
  if(isDay&&mins<openH*60)return {open:false,text:'Closed now · opens today at '+t12(openH)};
  for(var i=1;i<=7;i++){
    var d=(wd+i)%7;
    if(openDays.indexOf(d)>-1)return {open:false,text:'Closed now · opens '+(i===1?'tomorrow':DAYS[d])+' at '+t12(openH)};
  }
  return {open:false,text:'Closed now'};
}
window.shopStatus=shopStatus;

var el=document.getElementById('openBadge');
function draw(){
  if(!el)return;
  var s=shopStatus();
  el.className='openbadge'+(s.open?'':' closed');
  el.innerHTML='<i aria-hidden="true"></i><span>'+s.text+'</span>';
}
}
/* Lingguhang oras (galing sa openDays, openHour, closeHour sa js/settings.js) */
/* Lingguhang oras (galing sa openDays, openHour, closeHour sa js/settings.js) */
function drawWeek(){
  var ul=document.getElementById('weekList');if(!ul)return;
  var openDays=SHOP.openDays||[1,2,3,4,5,6],o=SHOP.openHour==null?8:SHOP.openHour,c=SHOP.closeHour==null?20:SHOP.closeHour;
  var order=[1,2,3,4,5,6,0],today=SHORT[new Intl.DateTimeFormat('en-US',{timeZone:SHOP.timezone||'Asia/Manila',weekday:'short'}).format(new Date())];
  /* pagsamahin ang magkakasunod na araw na pareho ang oras: "Monday – Saturday" at "Sunday" */
  var groups=[];
  order.forEach(function(d){
    var on=openDays.indexOf(d)>-1,g=groups[groups.length-1];
    if(g&&g.on===on){g.days.push(d)}else{groups.push({on:on,days:[d]})}
  });
  ul.innerHTML=groups.map(function(g){
    var first=DAYS[g.days[0]],last=DAYS[g.days[g.days.length-1]];
    var label=g.days.length>1?first+' – '+last:first;
    return '<li class="'+(g.days.indexOf(today)>-1?'today':'')+'"><span>'+label+'</span><b>'+(g.on?t12(o)+' – '+t12(c):'Closed')+'</b></li>';
  }).join('');
}
   /* pagsamahin ang magkakasunod na araw na pareho ang oras */
  var groups=[];
  order.forEach(function(d){
    var on=openDays.indexOf(d)>-1,g=groups[groups.length-1];
    if(g&&g.on===on){g.days.push(d)}else{groups.push({on:on,days:[d]})}
  });
  ul.innerHTML=groups.map(function(g){
    var first=DAYS[g.days[0]],last=DAYS[g.days[g.days.length-1]];
    var label=g.days.length>1?first+' – '+last:first;
    return '<li class="'+(g.days.indexOf(today)>-1?'today':'')+'"><span>'+label+'</span><b>'+(g.on?t12(o)+' – '+t12(c):'Closed')+'</b></li>';
  }).join('');
}
draw();drawStatus();drawWeek();setInterval(function(){draw();drawStatus()},60000);
})();

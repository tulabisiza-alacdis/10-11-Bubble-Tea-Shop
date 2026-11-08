
/* ---------- 2) GINUHIT NA LARAWAN ---------- */
var _artN=0;
function cup(c1,c2,o){
  o=o||{}; _artN++; var id='cg'+_artN;
  var pearls=o.pearls?'<g fill="#2b170c"><circle cx="29" cy="88" r="3.4"/><circle cx="38" cy="90" r="3.4"/><circle cx="47" cy="88" r="3.4"/><circle cx="55" cy="90" r="3.2"/><circle cx="33" cy="81" r="3.3"/><circle cx="43" cy="81" r="3.3"/><circle cx="51" cy="80" r="3.2"/><circle cx="38" cy="73" r="3.1"/></g>':'';
  var foam=o.foam?'<path d="M16 26c0-9 8-12 14-10 3-6 14-7 18-1 7-3 14 2 14 9z" fill="'+o.foam+'" stroke="#17140A" stroke-width="3" stroke-linejoin="round"/>':'';
  var shine='<path d="M24 38l3 44" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/>';
  return '<svg viewBox="0 0 80 102" aria-hidden="true" focusable="false"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+c1+'"/><stop offset="1" stop-color="'+c2+'"/></linearGradient></defs>'
   +'<rect x="50" y="1" width="6" height="36" rx="3" transform="rotate(14 53 19)" fill="#1AA7A0" stroke="#17140A" stroke-width="2"/>'
   +foam
   +'<path d="M14 27h52l-6 65a6 6 0 0 1-6 5H26a6 6 0 0 1-6-5z" fill="url(#'+id+')" stroke="#17140A" stroke-width="3" stroke-linejoin="round"/>'
   +pearls+shine
   +'<rect x="10" y="21" width="60" height="9" rx="4.5" fill="#fff" fill-opacity=".92" stroke="#17140A" stroke-width="3"/></svg>';
}
function colorFor(n){
  n=n.toLowerCase();
  if(n.indexOf('sunrise')>-1)return ['#FF9E7A','#7A5BD6'];
  if(n.indexOf('lime')>-1)return ['#C7F27B','#2FA7B5'];
  if(n.indexOf('aurora latte')>-1)return ['#CDBDF7','#4A3A9C'];
  if(n.indexOf('matcha')>-1)return ['#B5DE92','#4F9A3C'];
  if(n.indexOf('white chocolate')>-1)return ['#FBD3E0','#D9577F'];
  if(n.indexOf('strawberry')>-1)return ['#FAD0DC','#E0597F'];
  if(n.indexOf('blueberry')>-1)return ['#C6BFF5','#6A5ACD'];
  if(n.indexOf('oreo')>-1||n.indexOf('cookies')>-1)return ['#E4DFD8','#4a4642'];
  if(n.indexOf('fruity')>-1)return ['#FFC067','#E24A4A'];
  if(n.indexOf('nutella')>-1||n.indexOf('chocolate')>-1||n.indexOf('mocha')>-1)return ['#A06A47','#3e2316'];
  if(n.indexOf('americano')>-1)return ['#7a4a2a','#1d0f08'];
  if(n.indexOf('vanilla')>-1||n.indexOf('classic')>-1)return ['#FFF3D1','#E8C97A'];
  return ['#E8B873','#9A5E24'];
}

var _S='stroke="#17140A" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';
function _svg(inner){return '<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">'+inner+'</svg>'}

function drawWings(){
  function leg(x,y,r){return '<g transform="translate('+x+' '+y+') rotate('+r+')"><rect x="-4" y="22" width="8" height="26" rx="4" fill="#FFF3D1" '+_S+'/><circle cx="-5" cy="49" r="5" fill="#FFF3D1" '+_S+'/><circle cx="5" cy="49" r="5" fill="#FFF3D1" '+_S+'/><path d="M0 -26c20 0 28 14 24 30-3 12-12 20-24 20S-27 16-24 4C-28-12-18-26 0-26z" fill="#D9731F" '+_S+'/><path d="M-14-8c4-6 10-8 16-8" fill="none" stroke="#F5B260" stroke-width="4" stroke-linecap="round"/></g>'}
  return _svg('<ellipse cx="60" cy="108" rx="40" ry="6" fill="#17140A" opacity=".12"/>'+leg(40,38,-18)+leg(80,42,16));
}
function drawPoppers(){
  function n(x,y,r){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="#E39A3B" '+_S+'/><path d="M'+(x-r/2)+' '+(y-r/3)+'q'+(r/3)+' -'+(r/2)+' '+(r*.8)+' -'+(r/3)+'" fill="none" stroke="#F8D186" stroke-width="3" stroke-linecap="round"/>'}
  return _svg('<ellipse cx="60" cy="108" rx="42" ry="6" fill="#17140A" opacity=".12"/>'+n(38,78,17)+n(82,78,17)+n(60,52,18)+n(34,44,0)+n(60,92,14));
}
function drawFries(){
  var sticks='';for(var i=0;i<7;i++){sticks+='<rect x="'+(34+i*8)+'" y="'+(14+(i%3)*6)+'" width="7" height="46" rx="2" fill="#FFC93A" '+_S.replace('stroke-width="3"','stroke-width="2.4"')+' transform="rotate('+((i-3)*5)+' '+(37+i*8)+' 60)"/>'}
  return _svg('<ellipse cx="60" cy="110" rx="36" ry="5" fill="#17140A" opacity=".12"/>'+sticks+'<path d="M28 56h64l-8 52H36z" fill="#E8412F" '+_S+'/><rect x="46" y="70" width="28" height="22" rx="5" fill="#FFD13B" stroke="#17140A" stroke-width="2.5"/>');
}
function drawNachos(){
  function t(x,y,r,c){return '<path d="M0-22L22 16H-22z" transform="translate('+x+' '+y+') rotate('+r+')" fill="'+c+'" '+_S+'/>'}
  return _svg('<ellipse cx="60" cy="108" rx="44" ry="6" fill="#17140A" opacity=".12"/>'+t(36,64,-22,'#F2B84B')+t(84,62,24,'#E9A53A')+t(60,50,0,'#F6C65E')+'<path d="M26 74c14 8 26-4 34 6 8-10 22 0 34-8l-4 22H30z" fill="#FFB52E" '+_S+'/><circle cx="48" cy="88" r="3" fill="#CF3B2B"/><circle cx="72" cy="90" r="3" fill="#2F9E44"/>');
}
function drawSandwich(name){
  var big=/overload/i.test(name||'');
  var extra=big?'<rect x="20" y="58" width="80" height="12" rx="6" fill="#9A4B1F" '+_S+'/><path d="M20 70h80l-4 6H24z" fill="#FFC93A" '+_S+'/><ellipse cx="60" cy="56" rx="38" ry="5" fill="#E8412F" '+_S+'/>':'';
  var y=big?14:0;
  return _svg('<ellipse cx="60" cy="110" rx="44" ry="6" fill="#17140A" opacity=".12"/><g transform="translate(0 '+(big?-4:0)+')"><path d="M18 '+(52)+'c0-24 18-34 42-34s42 10 42 34z" fill="#E6A24C" '+_S+'/><g fill="#FFF3D1"><ellipse cx="46" cy="32" rx="3" ry="1.8"/><ellipse cx="62" cy="27" rx="3" ry="1.8"/><ellipse cx="78" cy="34" rx="3" ry="1.8"/></g><path d="M14 54c8 8 14-4 22 4s14-4 22 4 14-4 22 4 14-4 22-4v6H14z" fill="#5CB85C" '+_S+'/>'+(big?'':'')+'<rect x="18" y="62" width="84" height="14" rx="7" fill="#C97A2B" '+_S+'/><path d="M26 66l6 4M44 66l6 4M62 66l6 4M80 66l6 4" stroke="#7a3d12" stroke-width="2.5" stroke-linecap="round"/>'+extra+'<path d="M18 '+(big?88:78)+'h84l-6 8H24z" fill="#FFC93A" '+_S+'/><path d="M18 '+(big?98:88)+'h84c0 10-8 14-20 14H38c-12 0-20-4-20-14z" fill="#E6A24C" '+_S+'/></g>');
}
function drawTakoyaki(name){
  var n=(name||'').toLowerCase();
  function b(x,y){return '<circle cx="'+x+'" cy="'+y+'" r="15" fill="#D98A3A" '+_S+'/><path d="M'+(x-9)+' '+(y-3)+'q9 -6 18 0" fill="none" stroke="#7a3d12" stroke-width="3.5" stroke-linecap="round" opacity=".8"/><path d="M'+(x-8)+' '+(y+5)+'q8 5 16 0" fill="none" stroke="#FFF3D1" stroke-width="3" stroke-linecap="round"/>'}
  var g='';
  if(n.indexOf('crab')>-1)g='<g '+_S.replace('stroke-width="3"','stroke-width="2.4"')+'><rect x="26" y="40" width="30" height="9" rx="4.5" fill="#fff" transform="rotate(-12 41 44)"/><rect x="26" y="40" width="12" height="9" rx="4.5" fill="#E8412F" transform="rotate(-12 41 44)"/><rect x="62" y="36" width="30" height="9" rx="4.5" fill="#fff" transform="rotate(10 77 40)"/><rect x="62" y="36" width="12" height="9" rx="4.5" fill="#E8412F" transform="rotate(10 77 40)"/></g>';
  else if(n.indexOf('shrimp')>-1)g='<path d="M52 34c10-10 28-6 28 6 0 8-8 10-12 6" fill="#FF9E7A" '+_S+'/><path d="M58 32l4 8M66 30l3 9M74 32l1 8" stroke="#E8412F" stroke-width="2.4" stroke-linecap="round"/>';
  else if(n.indexOf('octo')>-1)g='<path d="M30 44c8-10 18 4 24-4s10 8 14 0 12 2 20-4" fill="none" stroke="#8A5BD6" stroke-width="7" stroke-linecap="round"/><path d="M30 44c8-10 18 4 24-4s10 8 14 0 12 2 20-4" fill="none" stroke="#17140A" stroke-width="1.6" stroke-dasharray="1 7" stroke-linecap="round"/>';
  else if(n.indexOf('ham')>-1)g='<rect x="32" y="36" width="18" height="14" rx="3" fill="#F4A6B0" '+_S+' transform="rotate(-10 41 43)"/><rect x="66" y="32" width="18" height="14" rx="3" fill="#FFD13B" '+_S+' transform="rotate(8 75 39)"/>';
  else g='<path d="M30 50c10-12 16 6 28-2s16 8 30-2" fill="none" stroke="#FFC93A" stroke-width="7" stroke-linecap="round"/>';
  return _svg('<ellipse cx="60" cy="110" rx="44" ry="6" fill="#17140A" opacity=".12"/><path d="M12 62h96l-8 38H20z" fill="#F4E2B8" '+_S+'/>'+b(34,62)+b(60,56)+b(86,62)+b(47,78)+b(73,78)+'<path d="M24 66c10-6 16 6 26-2s16 6 26-2 12 4 20-2" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"/>'+g);
}
function drawNoodles(name){
  var n=(name||'').toLowerCase();
  var col='#F2C64F',thin=false,egg=false,broth=false,veg=true,sauce=false;
  if(n.indexOf('bihon')>-1&&n.indexOf('miki')<0){col='#F7E7B5';thin=true}
  if(n.indexOf('lomi')>-1){broth=true;col='#EBC66B'}
  if(n.indexOf('cabagan')>-1){sauce=true}
  if(n.indexOf('batil')>-1){egg=true;col='#E7A93C'}
  var w='',i,k=thin?9:6;
  for(i=0;i<k;i++){w+='<path d="M'+(24+i*3)+' '+(60+i*4)+'c8-12 16 12 24 0s16 12 24 0 12 8 20 0" fill="none" stroke="'+col+'" stroke-width="'+(thin?3:5.5)+'" stroke-linecap="round"/>'}
  var bits=veg?'<circle cx="46" cy="58" r="3.4" fill="#F28A2E"/><circle cx="74" cy="64" r="3.4" fill="#F28A2E"/><circle cx="60" cy="54" r="3" fill="#43A047"/><circle cx="84" cy="56" r="3" fill="#43A047"/><circle cx="38" cy="70" r="3" fill="#43A047"/>':'';
  var top=egg?'<ellipse cx="62" cy="52" rx="20" ry="14" fill="#fff" '+_S+'/><circle cx="62" cy="52" r="7.5" fill="#FFB52E" stroke="#17140A" stroke-width="2.4"/>'
    :broth?'<ellipse cx="60" cy="62" rx="34" ry="9" fill="#F1D28A" opacity=".95"/><path d="M40 62q20 8 40 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/><circle cx="52" cy="60" r="7" fill="#fff" '+_S.replace('stroke-width="3"','stroke-width="2.4"')+'/><circle cx="52" cy="60" r="3.2" fill="#FFB52E"/>'
    :sauce?'<path d="M34 62c10-6 16 6 26-2s14 6 26-2" fill="none" stroke="#CF3B2B" stroke-width="5" stroke-linecap="round"/><path d="M86 48a10 10 0 0 1-16 0z" fill="#9BD05A" '+_S.replace('stroke-width="3"','stroke-width="2.4"')+'/>'
    :'<path d="M82 52a11 11 0 0 1-18 0z" fill="#9BD05A" '+_S.replace('stroke-width="3"','stroke-width="2.4"')+'/>';
  var dish=broth?'<path d="M14 58h92c0 30-18 46-46 46S14 88 14 58z" fill="#E8412F" '+_S+'/><path d="M26 74h68" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>'
    :'<ellipse cx="60" cy="86" rx="48" ry="20" fill="#fff" '+_S+'/><ellipse cx="60" cy="84" rx="36" ry="13" fill="#F4F1EA" stroke="#17140A" stroke-width="2"/>';
  var pile=broth?'':'<path d="M22 80c0-24 16-40 38-40s38 16 38 40c-12 8-26 10-38 10s-26-2-38-10z" fill="'+col+'" '+_S+'/>';
  var inner=broth?w:'<g clip-path="inherit">'+w.replace(/stroke-width="[\d.]+"/g,function(m){return m})+'</g>';
  return _svg('<ellipse cx="60" cy="112" rx="42" ry="5" fill="#17140A" opacity=".12"/>'+dish+(broth?w:'<g transform="translate(0 -6)">'+w+'</g>')+bits+top+'<path d="M44 20c-4 8 4 10 0 18M62 14c-4 8 4 10 0 20M80 20c-4 8 4 10 0 18" fill="none" stroke="#17140A" stroke-opacity=".28" stroke-width="3" stroke-linecap="round"/>');
}
function drawSiomai(){
  function d(x,y){return '<path d="M'+(x-13)+' '+(y+8)+'c-2-14 6-22 13-22s15 8 13 22z" fill="#F1E3B8" '+_S+'/><circle cx="'+x+'" cy="'+(y-8)+'" r="3.2" fill="#F28A2E" stroke="#17140A" stroke-width="2"/><path d="M'+(x-8)+' '+(y+2)+'v4M'+x+' '+(y+1)+'v5M'+(x+8)+' '+(y+2)+'v4" stroke="#17140A" stroke-opacity=".35" stroke-width="2" stroke-linecap="round"/>'}
  return _svg('<ellipse cx="60" cy="110" rx="44" ry="6" fill="#17140A" opacity=".12"/><ellipse cx="60" cy="78" rx="46" ry="22" fill="#D9A55B" '+_S+'/><path d="M14 78v14c0 12 20 18 46 18s46-6 46-18V78" fill="#E8BE78" '+_S+'/><path d="M30 96v10M50 100v10M70 100v10M90 96v10" stroke="#17140A" stroke-opacity=".35" stroke-width="2.5"/>'+d(40,62)+d(80,62)+d(60,72)+'<path d="M30 30c-4 8 4 10 0 16M60 22c-4 8 4 10 0 18M90 30c-4 8 4 10 0 16" fill="none" stroke="#17140A" stroke-opacity=".25" stroke-width="3" stroke-linecap="round"/>');
}
function drawPizza(name){
  var n=name.toLowerCase(),top='#CF3B2B';
  var dots='<circle cx="60" cy="44" r="7" fill="'+top+'" stroke="#17140A" stroke-width="2.4"/><circle cx="44" cy="70" r="7" fill="'+top+'" stroke="#17140A" stroke-width="2.4"/><circle cx="76" cy="68" r="7" fill="'+top+'" stroke="#17140A" stroke-width="2.4"/>';
  if(n.indexOf('hawaiian')>-1)dots='<rect x="54" y="38" width="12" height="12" rx="3" fill="#FFD13B" stroke="#17140A" stroke-width="2.4"/><rect x="38" y="64" width="12" height="12" rx="3" fill="#FFD13B" stroke="#17140A" stroke-width="2.4"/><circle cx="76" cy="68" r="7" fill="#F4A6B0" stroke="#17140A" stroke-width="2.4"/>';
  else if(n.indexOf('ham')>-1)dots=dots.replace(/#CF3B2B/g,'#F4A6B0');
  else if(n.indexOf('overload')>-1||n.indexOf('supreme')>-1||n.indexOf('all meat')>-1)dots+='<circle cx="60" cy="74" r="5" fill="#2F9E44" stroke="#17140A" stroke-width="2.4"/><circle cx="52" cy="56" r="4" fill="#17140A"/><circle cx="68" cy="56" r="4" fill="#17140A"/>';
  return _svg('<ellipse cx="60" cy="110" rx="36" ry="5" fill="#17140A" opacity=".12"/><path d="M60 108L14 28c28-16 64-16 92 0z" fill="#F6C65E" '+_S+'/><path d="M14 28c28-16 64-16 92 0l-4 7c-26-13-58-13-84 0z" fill="#D9892E" '+_S+'/>'+dots);
}
function drawMeal(name){
  var n=name.toLowerCase(),t;
  var S2=_S.replace('stroke-width="3"','stroke-width="2.4"');
  if(n.indexOf('embutido')>-1)t='<g '+S2+'><ellipse cx="82" cy="46" rx="11" ry="12" fill="#E0848E"/><circle cx="79" cy="43" r="2" fill="#fff"/><circle cx="85" cy="50" r="2" fill="#FFD13B"/><ellipse cx="72" cy="62" rx="11" ry="12" fill="#E0848E"/><circle cx="69" cy="59" r="2" fill="#fff"/><circle cx="75" cy="66" r="2" fill="#FFD13B"/></g>';
  else if(n.indexOf('hungarian')>-1)t='<g '+S2+'><rect x="58" y="42" width="44" height="14" rx="7" fill="#B8442E" transform="rotate(-14 80 49)"/><path d="M70 40l4 16M80 38l4 16M90 36l4 16" stroke="#17140A" stroke-width="1.8" opacity=".5" transform="rotate(-14 80 49)"/></g>';
  else if(n.indexOf('spam')>-1)t='<g '+S2+'><rect x="62" y="40" width="36" height="22" rx="4" fill="#E9A0A0" transform="rotate(-8 80 51)"/><path d="M68 46h24M68 52h24M68 58h24" stroke="#C26A6A" stroke-width="2" stroke-linecap="round" transform="rotate(-8 80 51)"/></g>';
  else if(n.indexOf('ham')>-1)t='<g '+S2+'><rect x="62" y="38" width="32" height="22" rx="5" fill="#F4A6B0" transform="rotate(-10 78 49)"/><rect x="70" y="50" width="32" height="22" rx="5" fill="#F8B8C0" transform="rotate(8 86 61)"/></g>';
  else if(n.indexOf('siomai')>-1)t='<g '+S2+'><path d="M60 62c-2-12 6-18 12-18s14 6 12 18z" fill="#F1E3B8"/><circle cx="72" cy="46" r="2.8" fill="#F28A2E"/><path d="M84 66c-2-12 6-18 12-18s14 6 12 18z" fill="#F1E3B8" transform="translate(-4 -4)"/></g>';
  else if(n.indexOf('beef')>-1)t='<g '+S2+'><ellipse cx="80" cy="52" rx="20" ry="13" fill="#7a3d1c"/><path d="M66 48l8 8M76 44l8 8M86 42l8 8" stroke="#3b1a0a" stroke-width="2" stroke-linecap="round"/></g>';
  else if(n.indexOf('crispy')>-1)t='<g '+S2+'><ellipse cx="80" cy="52" rx="20" ry="13" fill="#E3A23A"/><g fill="#F7D07A"><circle cx="70" cy="48" r="2.2"/><circle cx="80" cy="45" r="2.2"/><circle cx="88" cy="52" r="2.2"/><circle cx="76" cy="57" r="2.2"/></g></g>';
  else if(n.indexOf('wings')>-1)t='<g '+S2+'><path d="M66 56c0-12 10-18 20-14 10 4 12 16 4 22-8 6-24 4-24-8z" fill="#D9731F"/><rect x="88" y="58" width="14" height="6" rx="3" fill="#FFF3D1" transform="rotate(30 90 60)"/></g>';
  else if(n.indexOf('pastil')>-1)t='<g stroke="#8a5a22" stroke-width="3" stroke-linecap="round" fill="none"><path d="M62 54q10-10 20-2M64 62q12-8 24 0M72 46q8-6 16 0M80 66q8-4 14-8"/></g><path d="M56 70c10 10 40 10 52-2" fill="#43A047" stroke="#17140A" stroke-width="2.4" opacity="0"/>';
  else if(n.indexOf('sisig')>-1)t='<g '+S2+'><rect x="62" y="46" width="11" height="9" rx="3" fill="#8a5d34"/><rect x="76" y="40" width="11" height="9" rx="3" fill="#9a6b3e"/><rect x="88" y="50" width="11" height="9" rx="3" fill="#8a5d34"/><rect x="70" y="58" width="11" height="9" rx="3" fill="#9a6b3e"/></g><circle cx="88" cy="38" r="9" fill="#fff" '+_S.replace('stroke-width="3"','stroke-width="2.4"')+'/><circle cx="88" cy="38" r="4" fill="#FFB52E"/>';
  else t='<rect x="62" y="42" width="34" height="18" rx="9" fill="#9A4B1F" '+_S+'/>';
  return _svg('<ellipse cx="60" cy="108" rx="46" ry="6" fill="#17140A" opacity=".12"/><ellipse cx="60" cy="84" rx="48" ry="22" fill="#fff" '+_S+'/><ellipse cx="60" cy="82" rx="36" ry="14" fill="#F4F1EA" stroke="#17140A" stroke-width="2"/><path d="M22 78c0-26 16-42 34-42s30 14 30 36c-8 6-20 10-32 10s-22-2-32-4z" fill="#fff" '+_S+'/><g stroke="#17140A" stroke-opacity=".2" stroke-width="2" fill="none"><path d="M34 56l4 4M44 48l4 4M38 68l4 4M50 62l4 4"/></g>'+t+'<circle cx="94" cy="80" r="3.6" fill="#43A047"/><circle cx="86" cy="86" r="3.6" fill="#F28A2E"/><circle cx="100" cy="86" r="3.2" fill="#43A047"/>');
}
function isDrinkCat(id){return CATEGORIES.some(function(c){return c.id===id&&c.type==='drinks'})}
function drawing(it){
  var c=it.cat,n=it.name;
  if(isDrinkCat(c)){
    var col=colorFor(n);
    if(c==='frappe'||c==='cfrappe')return cup(col[0],col[1],{foam:'#fff'});
    if(c==='cheesecake')return cup(col[0],col[1],{foam:'#FFF7E3',pearls:n==='Oreo'});
    return cup(col[0],col[1],{pearls:c==='special'&&n.indexOf('Brown')>-1});
  }
  if(c==='wings')return n.indexOf('Popper')>-1?drawPoppers():drawWings();
  if(c==='snacks')return n.indexOf('Nacho')>-1?drawNachos():drawFries();
  if(c==='sandwich')return drawSandwich(n);
  if(c==='takoyaki')return drawTakoyaki(n);
  if(c==='siomai')return drawSiomai();
  if(c==='noodles')return drawNoodles(n);
  if(c==='pizza')return drawPizza(n);
  if(c==='meals')return drawMeal(n);
  return drawFries();
}
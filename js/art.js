
/* ---------- 1) TUNAY NA LITRATO ---------- */
/* Format:  'category/Pangalan': 'filename.png',   (may kuwit sa dulo) */
var PHOTOS = {
  /* coffee */
  'coffee/Americano': 'Americano.png',
  'coffee/Cafe Latte': 'Cafe Latte.png',
  'coffee/Iced Mocha': 'Iced Mocha.png',
  'coffee/White Mocha': 'White Mocha.png',
  'coffee/Caramel Macchiato': 'cbcaramelmacchiato.png',
  'coffee/Vanilla Latte': 'Vanilla Latte.png',

  /* frappe */
  'frappe/Cookies n\' Cream': 'frcokies and cream.png',
  'frappe/Matcha Green Tea': 'frmatcha.png',
  'frappe/Dark Chocolate': 'frdarkchoco.png',
  'frappe/White Chocolate Berry': 'frwhitchocolateberry.png',
  'frappe/Vanilla': 'frvanilla.png',
  'frappe/Caramel': 'cbcaramel.png',

  /* cfrappe */
  'cfrappe/Dark Chocolate': 'cb_chocolate.png',
  'cfrappe/Caramel': 'cb_caramel.png',
  'cfrappe/Mocha': 'cb_mocha.png',
  'cfrappe/Vanilla': 'cb_vanilla.png',

  /* aurora */
  'aurora/Aurora Sunrise': 'auradrinkssunrise.png',
  'aurora/Aurora Lime': 'Aurora Lime.png',
  'aurora/Aurora Latte': 'Aurora Latte.png',

  /* cheesecake */
  'cheesecake/Classic': 'CC classic.png',
  'cheesecake/Strawberry': 'CC strawberry.png',
  'cheesecake/Blueberry': 'CC blueberry.png',
  'cheesecake/Oreo': 'CC Oreo.png',
  'cheesecake/Matcha': 'CC matcha.png',

  /* special */
  'special/Matcha Green Tea': 'sdrinksmatchagreentea.png',
  'special/Brown Sugar Latte': 'sdrinksbrownsugarlatte.png',
  'special/Nutella Milk Tea': 'sdrinksnutellamilktea.png',
  'special/Fruity Tea': 'sdrinksfruitea.png',

  /* wings */
  'wings/Chicken Wings': 'Food/Chicken Wings.png',
  'wings/Chicken Poppers': 'Food/Chicken Poppers.png',

  /* snacks */
  'snacks/Potato Fries': 'Food/Potato Fries.png',
  'snacks/Nachos': 'Food/Nachos.png',

  /* sandwich */
  'sandwich/Chicken Sandwich': 'Food/Chicken Sandwich.png',
  'sandwich/Chicken Sandwich Overload': 'Food/chicken sandwich overload.png',

  /* siomai */
  'siomai/Small Siomai': 'Food/Small Siomai.png',
  'siomai/Big Siomai': 'Food/Big Siomai.png',

  /* takoyaki */
  'takoyaki/Cheese Takoyaki': 'Food/Cheese Takoyaki.png',
  'takoyaki/Ham & Cheese Takoyaki': 'Food/Hamandcheesetakoyaki.png',
  'takoyaki/Crab Sticks Takoyaki': 'Food/Crab stick takoyaki.png',
  'takoyaki/Shrimp Sticks Takoyaki': 'Food/Shrimpstickstakoyaki.png',
  'takoyaki/Octobits Takoyaki': 'Food/Octobits Takoyaki.png',

  /* noodles */
  'noodles/Miki Guisado': 'Food/Miki.png',
  'noodles/Bihon Guisado': 'Food/Bihon Guisado.png',
  'noodles/Miki-Bihon Guisado': 'Food/Miki-bihon.png',
  'noodles/Lomi': 'Food/Lomi.png',
  'noodles/Cabagan': 'Food/Cabagan.png',
  'noodles/Batil Patong': 'Food/Batil Patong.png',

  /* pizza */
  'pizza/Ham & Cheese Pizza': 'Food/Ham and cheese.png',
  'pizza/Hawaiian Pizza': 'Food/Hawaian.png',
  'pizza/Pepperoni Pizza': 'Food/Pepperoni.png',
  'pizza/All Meat Pizza': 'Food/All Meat Pizza.png',
  'pizza/Overload Pizza': 'Food/Overload Pizza.png',
  'pizza/Supreme Pizza': 'Food/Supreme Pizza.png',

  /* meals */
  'meals/Embutido Rice': 'Food/Embotidu Rice.png',
  'meals/Ham Rice': 'Food/Ham Rice.png',
  'meals/Spam Rice': 'Food/Spam Rics.png',
  'meals/Hungarian Rice': 'Food/Hungarian Rice.png',
  'meals/Big Siomai Rice': 'Food/Big Siomai Rice.png',
  'meals/Beef Burger Rice': 'Food/Beef Burger Rice.png',
  'meals/Crispy Burger Rice': 'Food/Crispy Burger Rice.png',
  'meals/Wings Rice': 'Food/Wings Rice.png',
  'meals/Pastil Rice': 'Food/Pastil Rice.png',
  'meals/Sisig Rice': 'Food/Sisig Rice.png'
};

/* Korona sa litrato para sa bestseller. Ilagay ang item dito para magkaroon ng korona.
   (Ang salita sa kanan ay lalabas lang kapag itinapat ang mouse.) */
var BADGES = {
  'cheesecake/Oreo':'Bestseller',
  'special/Brown Sugar Latte':'Bestseller',
  'aurora/Aurora Sunrise':'Bestseller',
  'wings/Chicken Wings':'Bestseller',
  'takoyaki/Cheese Takoyaki':'Bestseller',
  'special/Nutella Milk Tea':'Bestseller'
};

/* Kulay ng likod ng litrato bawat category */
var TILE = {
  coffee:'#F1DCC0', frappe:'#FBDDE6', cfrappe:'#E9D2BE', aurora:'#D9D3F7', cheesecake:'#FFF0C2',
  special:'#CDEBDD', wings:'#FFD9B8', snacks:'#FFE9A0', sandwich:'#FFE0C2', siomai:'#E6F2C9',
  takoyaki:'#FFD6C9', noodles:'#FFE7B0', pizza:'#FFD3C2', meals:'#E3EDD0'
};

/* ---------- ang pagbuo ng larawan (huwag galawin) ---------- */
/* Ibinabalik ang HTML ng larawan ng item (litrato kung meron, drawing kung wala) */
function itemArt(it){
  var key=it.cat+'/'+it.name,bg=TILE[it.cat]||'#FFF4C2',p=PHOTOS[key];
  var badge=BADGES[key]?'<span class="badge" title="'+BADGES[key]+'" role="img" aria-label="'+BADGES[key]+'"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8.5l4.6 3.9L12 5l4.4 7.4L21 8.5 19.2 19H4.8z" fill="#17140A" stroke="#17140A" stroke-width="1.6" stroke-linejoin="round"/><circle cx="3" cy="8" r="1.7" fill="#17140A"/><circle cx="12" cy="4.6" r="1.7" fill="#17140A"/><circle cx="21" cy="8" r="1.7" fill="#17140A"/></svg></span>':'';
  var inner=p?'<img src="images/'+p+'" alt="'+it.name.replace(/"/g,'')+'" loading="lazy" decoding="async">'
              :'<div class="art">'+drawing(it)+'</div>';
  return '<div class="pic'+(p?' photo':'')+'" style="background:'+bg+'">'+inner+badge+'</div>';
}

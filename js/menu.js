/* =====================================================================
   MENU: lahat ng pagkain, inumin at presyo
   Dito mo babaguhin ang presyo, pangalan, at magdadagdag o magtatanggal
   ng item. Pagkatapos mag-edit, i-save (Ctrl+S) at i-refresh ang browser.

   MAHALAGA: bawat linya ay may kuwit (,) sa dulo. Huwag kalimutan ito,
   at huwag tanggalin ang mga [ ] at ' ' na panipi.
   ===================================================================== */


/* ---------------------------------------------------------------------
   1) MGA CATEGORY (ang mga grupo ng menu)
   id      = maikling pangalan na ginagamit sa ibaba (walang space)
   name    = pangalang makikita sa website
   type    = 'drinks' o 'food'
   blurb   = maikling paliwanag sa ilalim ng pamagat (pwedeng iwanang '')
   info    = dagdag na tala sa ilalim ng grupo (optional)
   --------------------------------------------------------------------- */
var CATEGORIES = [
  { id: 'coffee',     name: 'Iced Coffee',       type: 'drinks', blurb: 'Cold brew coffee base.' },
  { id: 'frappe',     name: 'Cream Frappe',      type: 'drinks', blurb: 'Blended and creamy.' },
  { id: 'cfrappe',    name: 'Coffee Frappe',     type: 'drinks', blurb: 'Blended with a coffee base.' },
  { id: 'aurora',     name: 'Aurora Drinks',     type: 'drinks', blurb: 'Layered colors, 16 oz or 22 oz.' },
  { id: 'cheesecake', name: 'Cheesecake Drinks', type: 'drinks', blurb: 'Cheesecake cream on top, 16 oz or 22 oz.' },
  { id: 'special',    name: 'Special Drinks',    type: 'drinks', blurb: '22 oz only.' },
  { id: 'wings',      name: 'Wings & Poppers',   type: 'food',   blurb: 'Choose your flavors. A pepper mark means spicy.' },
  { id: 'snacks',     name: 'Snacks',            type: 'food',   blurb: 'Fries come in Cheese, BBQ or Sour Cream.',
                       info: 'Fries & drinks combo is also available in the shop. Ask at the counter.' },
  { id: 'sandwich',   name: 'Sandwich',          type: 'food',   blurb: '' },
  { id: 'siomai',     name: 'Pica-Pica',         type: 'food',   blurb: 'Siomai by the 6, 12 or 24.' },
  { id: 'takoyaki',   name: 'Takoyaki',          type: 'food',   blurb: '5, 10 or 24 pieces.' },
  { id: 'noodles',    name: 'Noodles',           type: 'food',   blurb: 'Regular, Special or Overload.' },
  { id: 'pizza',      name: 'Pizza',             type: 'food',   blurb: 'Regular or Special size.' },
  { id: 'meals',      name: 'Rice Meals',        type: 'food',   blurb: 'Served with buttered vegetables and unlimited soup.' }
];


/* ---------------------------------------------------------------------
   2) MGA ITEM
   Bawat linya ay isang item na ganito ang ayos:

   [ 'category', 'Pangalan', [ ['Size', presyo], ['Size', presyo] ], 'options', 'paliwanag' ],

   - category : ang id ng category sa itaas
   - Pangalan : pangalang makikita
   - Size/presyo : isulat ang presyo bilang numero lang (walang ₱)
   - options  : (optional) ang mga pagpipilian na lalabas kapag pinindot ang Add.
                Tingnan ang listahan sa bahagi 3 sa ibaba. Iwanang '' kung wala.
   - paliwanag: (optional) maikling description sa ilalim ng pangalan
   --------------------------------------------------------------------- */
var MENU = [

  /* ----- Iced Coffee ----- */
  ['coffee', 'Americano',          [['Regular', 70],  ['Large', 90]],  'drinkIce'],
  ['coffee', 'Cafe Latte',         [['Regular', 80],  ['Large', 100]], 'drinkIce'],
  ['coffee', 'Iced Mocha',         [['Regular', 90],  ['Large', 110]], 'drinkIce'],
  ['coffee', 'White Mocha',        [['Regular', 90],  ['Large', 110]], 'drinkIce'],
  ['coffee', 'Caramel Macchiato',  [['Regular', 100], ['Large', 120]], 'drinkIce'],
  ['coffee', 'Vanilla Latte',      [['Regular', 90],  ['Large', 110]], 'drinkIce'],

  /* ----- Cream Frappe ----- */
  ['frappe', "Cookies n' Cream",       [['Regular', 90],  ['Large', 110]], 'drinkNoIce'],
  ['frappe', 'Matcha Green Tea',       [['Regular', 100], ['Large', 120]], 'drinkNoIce'],
  ['frappe', 'Dark Chocolate',         [['Regular', 90],  ['Large', 110]], 'drinkNoIce'],
  ['frappe', 'White Chocolate Berry',  [['Regular', 120], ['Large', 140]], 'drinkNoIce'],
  ['frappe', 'Vanilla',                [['Regular', 100], ['Large', 120]], 'drinkNoIce'],
  ['frappe', 'Caramel',                [['Regular', 110], ['Large', 130]], 'drinkNoIce'],

  /* ----- Coffee Frappe ----- */
  ['cfrappe', 'Dark Chocolate',  [['Regular', 100], ['Large', 120]], 'drinkNoIce'],
  ['cfrappe', 'Caramel',         [['Regular', 120], ['Large', 140]], 'drinkNoIce'],
  ['cfrappe', 'Mocha',           [['Regular', 120], ['Large', 140]], 'drinkNoIce'],
  ['cfrappe', 'Vanilla',         [['Regular', 110], ['Large', 130]], 'drinkNoIce'],

  /* ----- Aurora Drinks ----- */
  ['aurora', 'Aurora Sunrise',  [['16 oz', 110], ['22 oz', 125]], 'drinkIce'],
  ['aurora', 'Aurora Lime',     [['16 oz', 110], ['22 oz', 125]], 'drinkIce'],
  ['aurora', 'Aurora Latte',    [['16 oz', 110], ['22 oz', 125]], 'drinkIce'],

  /* ----- Cheesecake Drinks ----- */
  ['cheesecake', 'Classic',     [['16 oz', 110], ['22 oz', 125]], 'drinkIce'],
  ['cheesecake', 'Strawberry',  [['16 oz', 110], ['22 oz', 125]], 'drinkIce'],
  ['cheesecake', 'Blueberry',   [['16 oz', 110], ['22 oz', 125]], 'drinkIce'],
  ['cheesecake', 'Oreo',        [['16 oz', 110], ['22 oz', 125]], 'drinkIce'],
  ['cheesecake', 'Matcha',      [['16 oz', 110], ['22 oz', 125]], 'drinkIce'],

  /* ----- Special Drinks (22 oz lang) ----- */
  ['special', 'Matcha Green Tea',  [['22 oz', 130]], 'drinkIce'],
  ['special', 'Brown Sugar Latte', [['22 oz', 130]], 'drinkIce'],
  ['special', 'Nutella Milk Tea',  [['22 oz', 140]], 'drinkIce'],
  ['special', 'Fruity Tea',        [['22 oz', 140]], 'drinkIce'],

  /* ----- Wings & Poppers ----- */
  ['wings', 'Chicken Wings',   [['6 pcs', 180], ['12 pcs', 335], ['24 pcs', 615]], 'wingFlavors',
                               '2 flavors for 6 pcs, 3 for 12 pcs, 4 for 24 pcs.'],
  ['wings', 'Chicken Poppers', [['14–16 pcs', 150]], 'popperFlavor'],

  /* ----- Snacks ----- */
  ['snacks', 'Potato Fries',  [['Regular', 99], ['Overload', 129]], 'friesFlavor'],
  ['snacks', 'Nachos',        [['Regular', 99], ['Overload', 149]]],

  /* ----- Sandwich ----- */
  ['sandwich', 'Chicken Sandwich',           [['Regular', 129]],  '', 'Lettuce, chicken fillet, cucumber, tomato, cheese.'],
  ['sandwich', 'Chicken Sandwich Overload',  [['Overload', 159]], '', 'Lettuce, chicken fillet, cucumber, tomato, cheese, pineapple.'],

  /* ----- Pica-Pica (Siomai) ----- */
  ['siomai', 'Small Siomai',  [['6 pcs', 30], ['12 pcs', 55],  ['24 pcs', 105]]],
  ['siomai', 'Big Siomai',    [['6 pcs', 90], ['12 pcs', 175], ['24 pcs', 345]], 'siomaiFlavor'],

  /* ----- Takoyaki ----- */
  ['takoyaki', 'Cheese Takoyaki',        [['5 pcs', 65], ['10 pcs', 110], ['24 pcs', 260]]],
  ['takoyaki', 'Ham & Cheese Takoyaki',  [['5 pcs', 75], ['10 pcs', 130], ['24 pcs', 310]]],
  ['takoyaki', 'Crab Sticks Takoyaki',   [['5 pcs', 75], ['10 pcs', 130], ['24 pcs', 310]]],
  ['takoyaki', 'Shrimp Sticks Takoyaki', [['5 pcs', 75], ['10 pcs', 130], ['24 pcs', 310]]],
  ['takoyaki', 'Octobits Takoyaki',      [['5 pcs', 75], ['10 pcs', 130], ['24 pcs', 310]]],

  /* ----- Noodles ----- */
  ['noodles', 'Miki Guisado',        [['Regular', 55], ['Special', 75], ['Overload', 155]]],
  ['noodles', 'Bihon Guisado',       [['Regular', 55], ['Special', 75], ['Overload', 155]]],
  ['noodles', 'Miki-Bihon Guisado',  [['Regular', 55], ['Special', 75], ['Overload', 155]]],
  ['noodles', 'Lomi',                [['Regular', 55], ['Special', 75], ['Overload', 155]]],
  ['noodles', 'Cabagan',             [['Regular', 55], ['Special', 75], ['Overload', 155]]],
  ['noodles', 'Batil Patong',        [['Regular', 55], ['Special', 75], ['Overload', 155]]],

  /* ----- Pizza ----- */
  ['pizza', 'Ham & Cheese Pizza',  [['Regular', 129], ['Special', 179]]],
  ['pizza', 'Hawaiian Pizza',      [['Regular', 149], ['Special', 199]]],
  ['pizza', 'Pepperoni Pizza',     [['Regular', 169], ['Special', 219]]],
  ['pizza', 'All Meat Pizza',      [['Regular', 179], ['Special', 229]]],
  ['pizza', 'Overload Pizza',      [['Regular', 189], ['Special', 239]]],
  ['pizza', 'Supreme Pizza',       [['Regular', 229], ['Special', 279]]],

  /* ----- Rice Meals (may buttered vegetables at unlimited soup) ----- */
  ['meals', 'Embutido Rice',      [['Meal', 95]],  'mealAddons'],
  ['meals', 'Ham Rice',           [['Meal', 95]],  'mealAddons'],
  ['meals', 'Spam Rice',          [['Meal', 95]],  'mealAddons'],
  ['meals', 'Hungarian Rice',     [['Meal', 95]],  'mealAddons'],
  ['meals', 'Big Siomai Rice',    [['Meal', 95]],  'mealAddons'],
  ['meals', 'Beef Burger Rice',   [['Meal', 95]],  'mealAddons'],
  ['meals', 'Crispy Burger Rice', [['Meal', 95]],  'mealAddons'],
  ['meals', 'Wings Rice',         [['Meal', 150]], 'mealAddons'],
  ['meals', 'Pastil Rice',        [['Meal', 150]], 'mealAddons'],
  ['meals', 'Sisig Rice',         [['Meal', 170]], 'mealAddons']

];


/* ---------------------------------------------------------------------
   3) MGA OPTIONS (ang mga pagpipilian kapag pinindot ang Add)
   Ang pangalan sa kaliwa (halimbawa drinkIce) ang isinusulat sa bahagi 2.

   type: 'radio'  = isa lang ang pipiliin
   type: 'multi'  = pwedeng marami (min = pinakakaunti, max = pinakamarami;
                    kung may [2,3,4], ito ay para sa una, ikalawa, ikatlong size)
   def  : aling pagpipilian ang naka-pili agad (0 = una, 1 = ikalawa...).
          Ang null ay nangangahulugang kailangang pumili ng customer.
   price: dagdag na presyo (optional)
   tag  : maliit na label, halimbawa 'Spicy' (optional)
   --------------------------------------------------------------------- */
var WING_FLAVORS = [
  'Honey Glazed',
  { label: 'Buffalo', tag: 'Spicy' },
  'Barbecue',
  'Soy Garlic',
  'Yangnyeom',
  { label: 'Chili Barbecue', tag: 'Extra spicy' },
  'Teriyaki'
];

var OPTION_SETS = {

  /* Inumin: walang pagpipilian (naka-default na ang sugar at ice) */
  drinkIce: [
  ],

  /* Frappe: walang pagpipilian (naka-default na ang sugar level) */
  drinkNoIce: [
  ],

  /* Wings: 2, 3 o 4 flavors depende sa size */
  wingFlavors: [
    { id: 'flavors', label: 'Flavors', type: 'multi', min: [2, 3, 4], max: [2, 3, 4], choices: WING_FLAVORS }
  ],

  /* Poppers: 1 flavor */
  popperFlavor: [
    { id: 'flavors', label: 'Flavor', type: 'multi', min: 1, max: 1, choices: WING_FLAVORS }
  ],

  friesFlavor: [
    { id: 'flavor', label: 'Flavor', type: 'radio', def: null, choices: ['Cheese', 'BBQ', 'Sour Cream'] }
  ],

  siomaiFlavor: [
    { id: 'flavor', label: 'Flavor', type: 'radio', def: null, choices: ['Beef', 'Chicken', 'Pork'] }
  ],

  /* Add-ons para sa rice meals */
  mealAddons: [
    { id: 'addons', label: 'Add-ons', type: 'multi', min: 0, max: 4, choices: [
      { label: 'Egg (fried or boiled)', price: 15 },
      { label: 'Sauces',                price: 25 },
      { label: 'Gravy',                 price: 25 },
      { label: 'Extra rice',            price: 20 }
    ] }
  ]
};


/* ---------------------------------------------------------------------
   4) "START HERE": ang mga item na lalabas sa itaas ng menu
   Isulat ang ['category', 'Pangalan'] na eksaktong kapareho ng nasa bahagi 2.
   --------------------------------------------------------------------- */
var FEATURED = [
  ['cheesecake', 'Oreo'],
  ['aurora',     'Aurora Sunrise'],
  ['special',    'Brown Sugar Latte'],
  ['wings',      'Chicken Wings'],
  ['takoyaki',   'Cheese Takoyaki'],
  ['special',    'Nutella Milk Tea']
];


/* =====================================================================
   HUWAG NANG GALAWIN ANG NASA BABA NITO.
   Ito ang gumagawa ng listahan mula sa mga nasa itaas.
   ===================================================================== */
function buildMenu() {
  var slug = function (s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); };
  var cats = [], catBy = {}, items = [], byId = {};

  CATEGORIES.forEach(function (c) {
    var x = { id: c.id, name: c.name, g: c.type, blurb: c.blurb || '' };
    if (c.info) x.info = c.info;
    cats.push(x); catBy[c.id] = x;
  });

  function groupsFor(key) {
    if (!key) return [];
    var set = OPTION_SETS[key];
    if (!set) { console.warn('Walang options na may pangalang: ' + key); return []; }
    return set.map(function (g) {
      var o = {};
      for (var k in g) o[k] = g[k];
      o.choices = g.choices.map(function (c) { return typeof c === 'string' ? { label: c } : c; });
      return o;
    });
  }

  MENU.forEach(function (r) {
    if (!catBy[r[0]]) { console.warn('Walang category na may id: ' + r[0] + ' (item: ' + r[1] + ')'); return; }
    var it = {
      id: r[0] + '-' + slug(r[1]), cat: r[0], name: r[1],
      sizes: r[2].map(function (s) { return { l: s[0], p: s[1] }; }),
      groups: groupsFor(r[3])
    };
    if (r[4]) it.desc = r[4];
    items.push(it); byId[it.id] = it;
  });

  var featured = FEATURED.map(function (f) { return f[0] + '-' + slug(f[1]); })
                         .filter(function (id) { return byId[id]; });

  return { cats: cats, catBy: catBy, items: items, byId: byId, featured: featured };
}
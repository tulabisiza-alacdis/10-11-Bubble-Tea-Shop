10-11 BUBBLE TEASHOP: WEBSITE
==============================

PAANO BUKSAN
  - Sa VS Code: i-right-click ang index.html > "Open with Live Server".
  - Pwede ring i-double-click ang index.html.

MGA FILE
  index.html        ang laman ng page (may mga comment para madaling hanapin)
  css/style.css     mga kulay at itsura
  js/settings.js    number, address, FACEBOOK PAGE (dito ilagay ang username para gumana ang Messenger)
  js/menu.js        lahat ng menu at presyo
  js/art.js         mga larawan ng menu (PHOTOS) at "Bestseller" tag (BADGES): ito ang eedit mo
  js/drawings.js    ginuhit na larawan kapag walang litrato. Huwag galawin.
  js/app.js         ang gumagana (cart, Messenger). Huwag nang galawin.
  images/           lahat ng litrato

MGA KARANIWANG EDIT
  1) MESSENGER (importante!)
     Buksan ang js/settings.js. Ilagay ang username ng Facebook page sa facebookPage.
     Halimbawa ang link ay facebook.com/1011bubbleteashop  ->  facebookPage: '1011bubbleteashop',
     Hanggang wala ito, magbubukas lang ng Facebook search ang button.

  2) LITRATO NG SHOP (Hero 1 at Hero 2)
     Ilagay ang litrato mo sa images/shop-front.jpg (parehong pangalan). Iyon ang lalabas sa dalawang hero.
     Gusto ng ibang litrato sa pangalawang hero? Ilagay sa images/counter.jpg.
     Kung masyadong madilim o maliwanag: css/style.css, hanapin ang --hero-shade-1/2/3.

  3) LITRATO NG BAWAT MENU ITEM
     Ilagay ang litrato sa images/ (mas maganda kung square o may transparent na background, mga 600px).
     Buksan ang js/art.js, idagdag sa PHOTOS:   'cheesecake/Oreo': 'oreo.jpg',
     Ang kaliwa ay category/Pangalan, kapareho ng nasa menu.js.
     Kapag walang litrato, may ginuhit na larawan na awtomatikong lalabas.

  4) PRESYO / MENU: js/menu.js
  5) HEADER: dilaw at itim ang kulay. Hanapin ang --hdr-bg sa css/style.css para palitan.

PAANO ANG ORDER
  Customer: pipili ng item > "Your order" > "Copy order & open Messenger" > paste > send.
  Sa Messenger na kinukumpirma ng shop ang total, pickup o delivery, at bayad (cash o GCash).

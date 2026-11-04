/* Seven Stars Books — Propuesta de diseño por CUARSA */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } }
  };

  /* =======================================================
     Textos en inglés (el español se toma del HTML)
     ======================================================= */
  var EN = {
    'skip': 'Skip to content',
    'nav.services': 'Services',
    'nav.process': 'Process',
    'nav.who': 'Who it’s for',
    'nav.books': 'Bookstore',
    'nav.plans': 'Plans',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.toggle': 'Open menu',
    'cta.start': 'Start my project',
    'cart.open': 'Open cart',

    'hero.title': 'Your book deserves a launch, not just a print run.',
    'hero.lead': 'Seven Stars Books walks writers, churches and companies from manuscript to the day the book reaches its readers: editing, design, publishing, audio, video and campaign, coordinated by one team.',
    'hero.cta2': 'Discover Buen día invencible',
    'hero.byline': 'Led by <strong>Steven Bravo</strong>, author and speaker.',
    'hero.bookLabel': 'Buen día invencible, see it in the bookstore',

    'problem.title': 'Writing the book is only the first half.',
    'problem.lead': 'The other half decides whether anyone reads it: a well-edited manuscript, a cover that can compete on a shelf, a clean print and digital edition, and a launch that gets the audience ready. That is where many projects end up stored in a box.',
    'problem.i1': 'The manuscript goes to print without a second professional read.',
    'problem.i2': 'The cover gets solved at the last minute and says nothing about the book.',
    'problem.i3': 'The book comes out, but nobody prepared readers to receive it.',

    'author.title': 'Before offering it, I did it with my own books.',
    'author.p1': 'I’m Steven Bravo, author and speaker. I published <em>Buen día invencible</em> and four other titles going through every stage: rewriting, editing, choosing the cover, printing, presenting in auditoriums and selling copy by copy.',
    'author.p2': 'Seven Stars Books comes from that journey. It’s the guidance I wish I’d had, now with a team behind it: editorial, an audio and video studio, and digital marketing, so your book doesn’t depend on luck.',
    'author.role': 'Author, speaker and founder of Seven Stars Books',
    'author.shelf': 'Books published by Steven Bravo',

    'stars.title': 'Seven stars, one complete launch.',
    'stars.lead': 'Each star is a stage. The first three are the editorial core; the other four make the book seen, heard and sold.',
    's1.t': 'Editing and proofreading', 's1.d': 'Manuscript assessment, line editing and proofreading.',
    's2.t': 'Book design', 's2.d': 'Cover, interior layout and digital edition.',
    's3.t': 'Publishing', 's3.d': 'ISBN, offset or print-on-demand, and Amazon distribution.',
    's4.t': 'Book trailer and video', 's4.d': 'Pieces for social media, presentations and interviews.',
    's5.t': 'Audiobook and music', 's5.d': 'Studio voice recording, editing and original music.',
    's6.t': 'Author website and store', 's6.d': 'Your own site to sell the book and book speaking events.',
    's7.t': 'Launch campaign', 's7.d': 'Pre-sale, Meta and Google ads, and social content.',

    'houses.title': 'A publisher at the center, with its own studio and digital team.',
    'houses.books.kind': 'Publishing',
    'houses.books.p': 'The heart of the project. Your manuscript goes through editing, design and publishing with the judgment of someone who has published and knows what stands out on a shelf.',
    'houses.books.s1': 'Editing and proofreading', 'houses.books.s2': 'Cover and layout', 'houses.books.s3': 'Print and digital publishing',
    'houses.studio.kind': 'Audio and video',
    'houses.studio.p': 'Book trailers, audiobooks and original music for the book launch or for the ministry behind it.',
    'houses.studio.s1': 'Book trailer and video', 'houses.studio.s2': 'Audiobook and music',
    'houses.mkt.kind': 'Digital strategy',
    'houses.mkt.p': 'Author website, online store and paid campaigns so the launch reaches the right people.',
    'houses.mkt.s1': 'Author website and store', 'houses.mkt.s2': 'Launch campaign',

    'process.title': 'From the first coffee to launch day.',
    'p1.t': 'First conversation', 'p1.d': 'We read your manuscript or hear your idea and understand who the book is for.',
    'p2.t': 'Plan and quote', 'p2.d': 'We propose only the stages you need, with timelines and costs in writing.',
    'p3.t': 'Production', 'p3.d': 'Editing, design, audio and video move in parallel with a single point of contact.',
    'p4.t': 'Publishing', 'p4.d': 'ISBN, final files, printing and release on digital stores.',
    'p5.t': 'Launch', 'p5.d': 'Pre-sale, campaign, launch event and sales follow-up.',

    'who.title': 'Who we work with.',
    'who.tabs': 'Audiences',
    'who.t1': 'Writers', 'who.t2': 'Churches and ministries', 'who.t3': 'Companies',
    'who.p1.t': 'Writers with a big project in mind',
    'who.p1.d': 'Fiction, essays, personal growth or memoir. If the book is the door to speaking, courses or a personal brand, we treat it as a launch, not a formality.',
    'who.p1.l1': 'Manuscript assessment', 'who.p1.l2': 'Cover and editing designed to sell', 'who.p1.l3': 'Author website and pre-sale',
    'who.p1.cta': 'Talk about my book',
    'who.p2.t': 'Churches and ministries',
    'who.p2.d': 'The pastor’s book, a devotional for the congregation, or the worship album that goes with a sermon series. All produced with the same quality and a single coordination.',
    'who.p2.l1': 'Devotionals and pastoral books', 'who.p2.l2': 'Audiobook and original worship music', 'who.p2.l3': 'Launch for the congregation and social media',
    'who.p2.cta': 'Talk about the ministry project',
    'who.p3.t': 'Companies and institutions',
    'who.p3.d': 'The company’s story, the founder’s method or a corporate book turned into a piece that positions the brand and that the sales team is proud to hand out.',
    'who.p3.l1': 'Corporate books and institutional memoirs', 'who.p3.l2': 'Video and brand content based on the book', 'who.p3.l3': 'Distribution at events and digital channels',
    'who.p3.cta': 'Talk about the company book',

    'shop.title': 'Books by Steven Bravo.',
    'shop.lead': 'Each one went through the same process we offer. Read them as a sample of what we can do with your book, or simply because they’ll do you good.',
    'bdi.sub': 'Every morning is a decision',
    'bdi.syn': 'A book to start the day with direction. In short chapters, Steven Bravo shares the practices, stories and decisions that held him up in his hardest seasons, and proposes a simple routine so every morning counts.',
    'bdi.k1': 'Pages', 'bdi.k2': 'Language', 'bdi.v2': 'Spanish', 'bdi.k3': 'Shipping', 'bdi.v3': 'Colombia and international',
    'bdi.format': 'Format',
    'fmt.print': 'Paperback', 'fmt.ebook': 'Digital (ePub and PDF)',
    'qty.minus': 'Remove one', 'qty.plus': 'Add one', 'qty.label': 'Quantity',
    'shop.add': 'Add to cart', 'shop.buy': 'Buy now', 'shop.addShort': 'Add',
    'ci.d': 'What you learn before reaching the top.',
    'rp.d': 'Living with direction, not on autopilot.',
    'ln.d': 'Faith for the days that make no sense.',
    'aq.d': '21 devotionals to find calm again.',
    'shop.note': 'Sample titles, covers and prices for this proposal.',

    'plans.title': 'Start where you are.',
    'plans.lead': 'Hire the full process or only the stage you’re missing. We quote based on manuscript length and the services you choose.',
    'plan1.t': 'Essential', 'plan1.f': 'To get the book ready and published.',
    'plan1.l1': 'Line editing and proofreading', 'plan1.l2': 'Cover design', 'plan1.l3': 'Print and digital layout', 'plan1.l4': 'ISBN and Amazon publishing',
    'plan1.cta': 'Quote Essential',
    'plan2.t': 'Launch', 'plan2.f': 'To publish and get noticed.',
    'plan2.l0': 'Everything in Essential', 'plan2.l1': 'First print run', 'plan2.l2': 'Book trailer for social media', 'plan2.l3': 'Author website with store', 'plan2.l4': 'Pre-sale campaign',
    'plan2.cta': 'Quote Launch',
    'plan3.t': 'Seven Stars', 'plan3.f': 'All seven stages with one team.',
    'plan3.l0': 'Everything in Launch', 'plan3.l1': 'Studio-recorded audiobook', 'plan3.l2': 'Original music for the launch', 'plan3.l3': 'Full Meta and Google campaign', 'plan3.l4': 'Support for the launch event',
    'plan3.cta': 'Quote Seven Stars',

    'faq.title': 'Frequently asked questions',
    'faq.q1': 'Do I keep the rights to my book?',
    'faq.a1': 'Yes. Copyright and royalties are yours. Seven Stars Books provides the editorial and production service; the book still belongs to whoever wrote it.',
    'faq.q2': 'Can I hire just part of the process?',
    'faq.a2': 'Yes. Some authors arrive with an edited book and only need design and publishing; others only need the campaign. We build the plan from what you already have.',
    'faq.q3': 'How long until the book is out?',
    'faq.a3': 'It depends on length and the state of the manuscript. After the first conversation you get a written timeline with every stage and its date.',
    'faq.q4': 'Do you work with churches and companies outside Colombia?',
    'faq.a4': 'Yes. Work is coordinated online, in Spanish or English, and printing can be done on demand in the country where your audience is.',
    'faq.q5': 'Who produces the audiobook, video and music?',
    'faq.a5': 'Seven Stars Studio, the platform’s audio and video studio. That way the sound and image of the launch stay in line with the book.',

    'contact.title': 'Tell us about your book.',
    'contact.lead': 'Leave us the basics and we’ll write back to schedule a first conversation.',
    'contact.wa': 'WhatsApp', 'contact.mail': 'Email', 'contact.where': 'Service', 'contact.whereV': 'Online, in Spanish and English',
    'contact.note': 'Sample contact details.',
    'form.name': 'Name', 'form.email': 'Email', 'form.type': 'I’m writing as',
    'form.type1': 'An author', 'form.type2': 'A church or ministry', 'form.type3': 'A company or institution',
    'form.stage': 'Where is the book right now?',
    'form.stage1': 'It’s an idea', 'form.stage2': 'I have a draft', 'form.stage3': 'The manuscript is finished', 'form.stage4': 'It’s published and I want to relaunch it',
    'form.msg': 'Message', 'form.send': 'Send message',

    'footer.line': 'Literary launches from start to finish.',
    'footer.nav': 'Footer',
    'footer.credit': 'Design proposal by CUARSA',

    'cart.title': 'Your cart', 'cart.close': 'Close cart',
    'cart.empty': 'No books yet. Start with <em>Buen día invencible</em>.',
    'cart.subtotal': 'Subtotal', 'cart.pay': 'Payment method', 'pay.card': 'Debit or credit card',
    'cart.checkout': 'Complete purchase',

    'alt.cover1': 'Cover of the book Buen día invencible by Steven Bravo',
    'alt.cover2': 'Cover of the book Cumbres interiores',
    'alt.cover3': 'Cover of the book La ruta del propósito',
    'alt.cover4': 'Cover of the book Luz en la noche',
    'alt.cover5': 'Cover of the book Aguas quietas',
    'alt.author': 'Steven Bravo, author and speaker, founder of Seven Stars Books',
    'alt.pub': 'Spines of printed books lined up on a shelf',
    'alt.studio': 'Recording studio with guitars and an audio console',
    'alt.web': 'Laptop showing a sales metrics dashboard',
    'alt.writers': 'Fountain pen on a notebook',
    'alt.church': 'Congregation with raised hands during worship',
    'alt.business': 'Team reviewing ideas in an office'
  };

  /* Mensajes generados por JS */
  var MSG = {
    es: {
      added: 'Agregado al carrito: ',
      formOk: 'Mensaje listo. En el sitio real llegaría al equipo de Seven Stars Books; en esta demostración no se envían datos.',
      formErr: 'Escribe tu nombre y un correo válido para continuar.',
      checkout: 'Demostración: aquí se conectará la pasarela de pago. No se realizó ningún cobro.',
      wa: 'En el sitio real, este enlace abre una conversación de WhatsApp.',
      print: 'Impreso', ebook: 'Digital',
      remove: 'Quitar', minus: 'Restar uno', plus: 'Sumar uno',
      plan: 'Me interesa el plan ',
      title: 'Seven Stars Books | Lanzamientos literarios de principio a fin'
    },
    en: {
      added: 'Added to cart: ',
      formOk: 'Message ready. On the live site it would reach the Seven Stars Books team; this demo does not send any data.',
      formErr: 'Enter your name and a valid email to continue.',
      checkout: 'Demo: the payment gateway will be connected here. No charge was made.',
      wa: 'On the live site, this link opens a WhatsApp chat.',
      print: 'Paperback', ebook: 'Digital',
      remove: 'Remove', minus: 'Remove one', plus: 'Add one',
      plan: 'I’m interested in the plan: ',
      title: 'Seven Stars Books | Literary launches from start to finish'
    }
  };

  /* =======================================================
     Idioma
     ======================================================= */
  var ES = {};
  var lang = 'es';

  $$('[data-i18n]').forEach(function (el) {
    var k = el.getAttribute('data-i18n');
    if (!(k in ES)) ES[k] = el.innerHTML;
  });
  $$('[data-i18n-attr]').forEach(function (el) {
    el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
      var p = pair.split(':'); var attr = p[0], k = p[1];
      if (!(k in ES)) ES[k] = el.getAttribute(attr);
    });
  });

  function t(k) { var d = lang === 'en' ? EN : ES; return (d[k] != null) ? d[k] : ES[k]; }
  function m(k) { return MSG[lang][k]; }

  function fmt(cop, usd) {
    if (lang === 'en') return '$' + usd + ' USD';
    return '$' + Number(cop).toLocaleString('es-CO') + ' COP';
  }

  function applyLang(next) {
    lang = next === 'en' ? 'en' : 'es';
    document.documentElement.lang = lang;
    document.title = m('title');
    $$('[data-i18n]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':'); el.setAttribute(p[0], t(p[1]));
      });
    });
    $$('.price[data-cop]').forEach(function (el) { el.textContent = fmt(el.dataset.cop, el.dataset.usd); });
    $$('.lang__btn').forEach(function (b) {
      var on = b.dataset.lang === lang;
      b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    renderCart();
    store.set('ssb-lang', lang);
  }

  $$('.lang__btn').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.dataset.lang); });
  });

  /* =======================================================
     Header y menú móvil
     ======================================================= */
  var header = $('.header');
  var nav = $('#nav');
  var burger = $('#burger');

  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('no-scroll', open);
  }
  burger.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  window.addEventListener('resize', function () { if (window.innerWidth >= 1080) setMenu(false); });

  /* =======================================================
     Constelación
     ======================================================= */
  var constellation = $('#constellation');
  $$('.cs', constellation).forEach(function (li, i) { li.style.setProperty('--i', i); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { constellation.classList.add('is-lit'); io.disconnect(); }
      });
    }, { threshold: 0.35 });
    io.observe(constellation);
  } else {
    constellation.classList.add('is-lit');
  }

  /* =======================================================
     Libro con inclinación (respuesta al puntero)
     ======================================================= */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    $$('[data-tilt]').forEach(function (el) {
      el.addEventListener('pointermove', function (ev) {
        var r = el.getBoundingClientRect();
        var x = (ev.clientX - r.left) / r.width - 0.5;
        var y = (ev.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--ry', (-14 + x * 16).toFixed(1) + 'deg');
        el.style.setProperty('--rx', (2 - y * 8).toFixed(1) + 'deg');
      });
      el.addEventListener('pointerleave', function () {
        el.style.removeProperty('--ry'); el.style.removeProperty('--rx');
      });
    });
  }

  /* =======================================================
     Pestañas "Para quién"
     ======================================================= */
  var tabs = $$('.tabs__btn');
  function selectTab(tab, focus) {
    tabs.forEach(function (b) {
      var on = b === tab;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(b.getAttribute('aria-controls'));
      panel.hidden = !on;
      if (on) { panel.classList.remove('is-entering'); void panel.offsetWidth; panel.classList.add('is-entering'); }
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (b, i) {
    b.addEventListener('click', function () { selectTab(b); });
    b.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') n = tabs[0];
      if (e.key === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); selectTab(n, true); }
    });
  });

  /* =======================================================
     Carrito (demostrativo)
     ======================================================= */
  var PRODUCTS = {
    'bdi-print': { title: 'Buen día invencible', fmt: 'print', cop: 59000, usd: 16, img: 'assets/img/libro-buen-dia-invencible.webp' },
    'bdi-ebook': { title: 'Buen día invencible', fmt: 'ebook', cop: 29000, usd: 8, img: 'assets/img/libro-buen-dia-invencible.webp' },
    'ci': { title: 'Cumbres interiores', fmt: 'print', cop: 52000, usd: 14, img: 'assets/img/libro-cumbres-interiores.webp' },
    'rp': { title: 'La ruta del propósito', fmt: 'print', cop: 55000, usd: 15, img: 'assets/img/libro-la-ruta-del-proposito.webp' },
    'ln': { title: 'Luz en la noche', fmt: 'print', cop: 49000, usd: 13, img: 'assets/img/libro-luz-en-la-noche.webp' },
    'aq': { title: 'Aguas quietas', fmt: 'print', cop: 45000, usd: 12, img: 'assets/img/libro-aguas-quietas.webp' }
  };

  var cart = {};
  try { cart = JSON.parse(store.get('ssb-cart') || '{}') || {}; } catch (e) { cart = {}; }
  Object.keys(cart).forEach(function (id) { if (!PRODUCTS[id]) delete cart[id]; });

  var drawer = $('#cart');
  var overlay = $('#drawerOverlay');
  var countEl = $('#cartCount');
  var lastFocus = null;

  function saveCart() { store.set('ssb-cart', JSON.stringify(cart)); }

  function renderCart() {
    var ids = Object.keys(cart);
    var count = 0, cop = 0, usd = 0;
    var list = $('#cartItems');
    list.innerHTML = '';
    ids.forEach(function (id) {
      var p = PRODUCTS[id], q = cart[id];
      count += q; cop += p.cop * q; usd += p.usd * q;
      var li = document.createElement('li');
      li.className = 'item';
      li.innerHTML =
        '<img src="' + p.img + '" alt="" width="56" height="84">' +
        '<div><div class="item__title">' + p.title + '</div>' +
        '<div class="item__meta">' + m(p.fmt) + ' · ' + fmt(p.cop, p.usd) + '</div>' +
        '<div class="item__qty"><button type="button" data-dec="' + id + '" aria-label="' + m('minus') + '">−</button>' +
        '<span>' + q + '</span><button type="button" data-inc="' + id + '" aria-label="' + m('plus') + '">+</button></div></div>' +
        '<div><div class="item__price">' + fmt(p.cop * q, p.usd * q) + '</div>' +
        '<button type="button" class="item__remove" data-rm="' + id + '">' + m('remove') + '</button></div>';
      list.appendChild(li);
    });
    $('#cartEmpty').hidden = ids.length > 0;
    $('#cartFoot').hidden = ids.length === 0;
    $('#cartTotal').textContent = fmt(cop, usd);
    countEl.textContent = count;
    countEl.classList.toggle('has-items', count > 0);
  }

  function addToCart(id, q) {
    cart[id] = Math.min(99, (cart[id] || 0) + (q || 1));
    saveCart(); renderCart();
    countEl.classList.remove('bump'); void countEl.offsetWidth; countEl.classList.add('bump');
    toast(m('added') + PRODUCTS[id].title);
  }

  function openCart() {
    lastFocus = document.activeElement;
    overlay.hidden = false;
    drawer.hidden = false;
    void drawer.offsetWidth;
    overlay.classList.add('is-open'); drawer.classList.add('is-open');
    document.body.classList.add('no-scroll');
    $('#checkoutMsg').textContent = '';
    setTimeout(function () { $('#cartClose').focus(); }, 50);
  }
  function closeCart() {
    overlay.classList.remove('is-open'); drawer.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    setTimeout(function () { overlay.hidden = true; drawer.hidden = true; }, 350);
    if (lastFocus) lastFocus.focus();
  }

  $('#cartOpen').addEventListener('click', openCart);
  $('#cartClose').addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (drawer.classList.contains('is-open')) closeCart();
    else if (nav.classList.contains('is-open')) setMenu(false);
  });

  $('#cartItems').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var id;
    if ((id = b.dataset.inc)) cart[id] = Math.min(99, cart[id] + 1);
    else if ((id = b.dataset.dec)) { cart[id] -= 1; if (cart[id] <= 0) delete cart[id]; }
    else if ((id = b.dataset.rm)) delete cart[id];
    saveCart(); renderCart();
  });

  // Libro destacado
  var qtyInput = $('#bdiQty');
  $$('.qty__btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var v = (parseInt(qtyInput.value, 10) || 1) + parseInt(b.dataset.qty, 10);
      qtyInput.value = Math.max(1, Math.min(20, v));
    });
  });
  function bdiId() { var c = $('input[name="bdi-format"]:checked'); return c && c.value === 'ebook' ? 'bdi-ebook' : 'bdi-print'; }
  function bdiQty() { return Math.max(1, Math.min(20, parseInt(qtyInput.value, 10) || 1)); }
  $('#bdiAdd').addEventListener('click', function () { addToCart(bdiId(), bdiQty()); });
  $('#bdiBuy').addEventListener('click', function () { addToCart(bdiId(), bdiQty()); openCart(); });

  $$('[data-add]').forEach(function (b) {
    b.addEventListener('click', function () { addToCart(b.dataset.add, 1); });
  });

  $('#checkout').addEventListener('click', function () { $('#checkoutMsg').textContent = m('checkout'); });

  /* =======================================================
     Formulario (demostrativo) y CTA de planes
     ======================================================= */
  var form = $('#contactForm');
  var status = $('#formStatus');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#f-name'), email = $('#f-email');
    var okName = name.value.trim().length > 1;
    var okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    name.setAttribute('aria-invalid', okName ? 'false' : 'true');
    email.setAttribute('aria-invalid', okEmail ? 'false' : 'true');
    if (!okName || !okEmail) {
      status.textContent = m('formErr'); status.classList.add('is-error');
      (okName ? email : name).focus();
      return;
    }
    status.classList.remove('is-error');
    status.textContent = m('formOk');
    form.reset();
  });

  $$('[data-plan]').forEach(function (a) {
    a.addEventListener('click', function () {
      $('#f-msg').value = m('plan') + a.textContent.replace(/^(Cotizar|Quote)\s+/, '') + '.';
    });
  });

  /* =======================================================
     WhatsApp de ejemplo y toast
     ======================================================= */
  var toastEl = $('#toast'), toastTimer;
  function toast(text) {
    toastEl.textContent = text;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-visible'); }, 2600);
  }
  $$('[data-demo-wa]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); toast(m('wa')); });
  });

  /* =======================================================
     Inicio
     ======================================================= */
  var params = new URLSearchParams(window.location.search);
  var initial = params.get('lang') || store.get('ssb-lang') || 'es';
  applyLang(initial);
})();

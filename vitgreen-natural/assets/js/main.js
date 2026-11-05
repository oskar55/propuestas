/* VitGreen Natural — interacciones de la demo (en WordPress las resuelven Elementor Pro y WooCommerce) */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var money = function (n) { return '$' + n.toLocaleString('es-CO').replace(/,/g, '.'); };

  /* Header con sombra al hacer scroll */
  var header = $('#header');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 10); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Paneles laterales: menú móvil y carrito */
  var lastFocus = null;
  function openPanel(id) {
    var el = document.getElementById(id);
    lastFocus = document.activeElement;
    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    var f = el.querySelector('button, a, input');
    if (f) setTimeout(function () { f.focus(); }, 50);
    if (id === 'drawer') $('#burger').setAttribute('aria-expanded', 'true');
  }
  function closePanel(id) {
    var el = document.getElementById(id);
    if (!el.classList.contains('is-open')) return;
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    if (id === 'drawer') $('#burger').setAttribute('aria-expanded', 'false');
    if (lastFocus) lastFocus.focus();
  }
  $('#burger').addEventListener('click', function () { openPanel('drawer'); });
  $('#cartBtn').addEventListener('click', function () { openPanel('cart'); });
  $$('.drawer, .cart').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (e.target === el) closePanel(el.id);
    });
  });
  $$('[data-close]').forEach(function (b) {
    b.addEventListener('click', function () { closePanel(b.getAttribute('data-close')); });
  });
  $$('.drawer__nav a').forEach(function (a) {
    a.addEventListener('click', function () { closePanel('drawer'); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closePanel('drawer'); closePanel('cart'); closeMega(); }
  });

  /* Mega menú */
  var megaBtn = $('.nav__mega-btn');
  var mega = $('#mega');
  var megaItem = $('.nav__item--mega');
  var megaTimer;
  function openMega() { clearTimeout(megaTimer); mega.classList.add('is-open'); megaBtn.setAttribute('aria-expanded', 'true'); }
  function closeMega() { mega.classList.remove('is-open'); megaBtn.setAttribute('aria-expanded', 'false'); }
  megaBtn.addEventListener('click', function () { mega.classList.contains('is-open') ? closeMega() : openMega(); });
  megaItem.addEventListener('mouseenter', openMega);
  megaItem.addEventListener('mouseleave', function () { megaTimer = setTimeout(closeMega, 180); });
  $$('a', mega).forEach(function (a) { a.addEventListener('click', closeMega); });
  megaItem.addEventListener('focusout', function (e) { if (!megaItem.contains(e.relatedTarget)) closeMega(); });

  /* Filtro de productos (Elementor: Taxonomy Filter + Loop Grid) */
  var tabs = $$('.tab');
  var cards = $$('.card');
  function filter(key) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-filter') === key;
      t.classList.toggle('is-on', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    cards.forEach(function (c, i) {
      var show = c.getAttribute('data-cat').split(' ').indexOf(key) > -1;
      c.hidden = !show;
      c.classList.remove('is-in');
      if (show) { c.style.animationDelay = (i % 8) * 40 + 'ms'; void c.offsetWidth; c.classList.add('is-in'); }
    });
  }
  tabs.forEach(function (t) {
    t.addEventListener('click', function () { filter(t.getAttribute('data-filter')); });
  });
  $$('[data-goto]').forEach(function (a) {
    a.addEventListener('click', function () { filter(a.getAttribute('data-goto')); });
  });

  /* Carrito de demostración (Elementor: Menu Cart + WooCommerce AJAX add to cart) */
  var products = {};
  cards.forEach(function (c) {
    products[c.getAttribute('data-id')] = {
      name: c.getAttribute('data-name'),
      brand: c.getAttribute('data-brand'),
      price: parseInt(c.getAttribute('data-price'), 10),
      img: c.querySelector('img').getAttribute('src')
    };
  });
  var cart = {};
  var countEl = $('#cartCount');

  function renderCart() {
    var ids = Object.keys(cart);
    var list = $('#cartItems');
    var total = 0, qty = 0;
    list.innerHTML = '';
    ids.forEach(function (id) {
      var p = products[id], q = cart[id];
      total += p.price * q; qty += q;
      var li = document.createElement('li');
      li.className = 'cart__item';
      li.innerHTML =
        '<img src="' + p.img + '" alt="" width="64" height="64">' +
        '<div><p class="cart__item-n">' + p.name + '</p>' +
        '<p class="cart__item-p">' + p.brand + ' · ' + money(p.price) + '</p>' +
        '<div class="qty"><button aria-label="Quitar una unidad" data-q="-1" data-id="' + id + '">−</button><span>' + q + '</span>' +
        '<button aria-label="Agregar una unidad" data-q="1" data-id="' + id + '">+</button></div></div>' +
        '<button class="cart__rm" data-rm="' + id + '">Quitar</button>';
      list.appendChild(li);
    });
    $('#cartTotal').textContent = money(total);
    $('#cartEmpty').hidden = ids.length > 0;
    $('#cartFoot').hidden = ids.length === 0;
    countEl.textContent = qty;
    $('#checkoutMsg').textContent = '';
  }
  function add(id) {
    cart[id] = (cart[id] || 0) + 1;
    renderCart();
    countEl.classList.remove('bump'); void countEl.offsetWidth; countEl.classList.add('bump');
    toast(products[id].name.split(',')[0] + ' agregado al carrito');
  }
  $$('.add').forEach(function (b) {
    b.addEventListener('click', function () {
      add(b.getAttribute('data-id'));
      if (b.classList.contains('card__add')) {
        b.classList.add('is-done');
        b.textContent = 'Agregado ✓';
        setTimeout(function () { b.classList.remove('is-done'); b.textContent = 'Agregar al carrito'; }, 1600);
      }
    });
  });
  $('#cartItems').addEventListener('click', function (e) {
    var t = e.target.closest('button');
    if (!t) return;
    var id = t.getAttribute('data-id') || t.getAttribute('data-rm');
    if (t.hasAttribute('data-rm')) delete cart[id];
    else {
      cart[id] += parseInt(t.getAttribute('data-q'), 10);
      if (cart[id] < 1) delete cart[id];
    }
    renderCart();
  });
  $('#checkoutBtn').addEventListener('click', function () {
    $('#checkoutMsg').textContent = 'Demo: en el sitio real este botón abre el checkout de WooCommerce con la pasarela de pagos.';
  });
  renderCart();

  /* Toast */
  var toastEl = $('#toast'), toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2200);
  }

  /* Formulario demostrativo */
  $('#newsForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = $('#email'), msg = $('#newsMsg');
    if (!input.value || !input.checkValidity()) {
      msg.textContent = 'Escribe un correo válido, por ejemplo nombre@correo.com.';
      input.focus();
      return;
    }
    msg.textContent = 'Listo, quedaste suscrito. (Formulario de demostración: no se envió ningún dato.)';
    input.value = '';
  });

  /* Revelado sutil al hacer scroll */
  var revealEls = $$('.sec-head, .cats__grid, .sport__copy, .sport__visual, .cafe__in, .comm__head, .gallery, .trust__list, .visit__in');
  if ('IntersectionObserver' in window) {
    revealEls.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  }
})();

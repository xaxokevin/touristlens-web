(function(){
'use strict';
var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
var root = document.documentElement;

/* scroll progress var --sp, drives the ambient blobs */
var scrolling = false;
function updateScrollProgress(){
  var h = document.body.scrollHeight - innerHeight;
  root.style.setProperty('--sp', h > 0 ? (scrollY / h).toFixed(4) : 0);
  scrolling = false;
}
addEventListener('scroll', function(){
  if (!scrolling) { scrolling = true; requestAnimationFrame(updateScrollProgress); }
}, {passive:true});
updateScrollProgress();

/* topbar solidify */
var topbar = document.getElementById('topbar');
if (topbar) {
  function onTopbarScroll(){ topbar.classList.toggle('solid', scrollY > 40); }
  addEventListener('scroll', onTopbarScroll, {passive:true});
  onTopbarScroll();
}

/* reveal on scroll */
(function initReveal(){
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  if ('IntersectionObserver' in window && !reduceMotion) {
    var ro = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
      });
    }, {threshold:.18});
    els.forEach(function(el){ ro.observe(el); });
  } else {
    els.forEach(function(el){ el.classList.add('in'); });
  }
})();

/* kinetic headline word reveal */
(function initKinetic(){
  if (reduceMotion) return;
  document.querySelectorAll('[data-kinetic]').forEach(function(el){
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(function(w, i){
      return '<span class="kw" style="transition-delay:' + (i * 45) + 'ms">' + w + '</span>';
    }).join(' ');
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){ el.classList.add('kw-in'); });
    });
  });
})();

/* scroll-tied parallax/tilt on feature screenshots */
(function initParallax(){
  var els = document.querySelectorAll('[data-parallax]');
  if (!els.length || reduceMotion) return;
  var ticking = false;
  function update(){
    var vh = innerHeight;
    els.forEach(function(el){
      var r = el.getBoundingClientRect();
      var center = r.top + r.height / 2;
      var progress = (vh / 2 - center) / vh;
      var clamped = Math.max(-1, Math.min(1, progress));
      var deg = clamped * 4;
      var ty = clamped * -18;
      el.style.transform = 'translateY(' + ty.toFixed(2) + 'px) rotate(' + deg.toFixed(2) + 'deg)';
    });
    ticking = false;
  }
  addEventListener('scroll', function(){
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, {passive:true});
  update();
})();

/* magnetic buttons (desktop hover only) */
(function initMagnetic(){
  if (!matchMedia('(hover: hover)').matches || reduceMotion) return;
  document.querySelectorAll('[data-magnetic]').forEach(function(btn){
    btn.addEventListener('mousemove', function(e){
      var r = btn.getBoundingClientRect();
      var x = e.clientX - r.left - r.width / 2;
      var y = e.clientY - r.top - r.height / 2;
      btn.style.setProperty('--mx', (x * 0.18).toFixed(1) + 'px');
      btn.style.setProperty('--my', (y * 0.28).toFixed(1) + 'px');
    });
    btn.addEventListener('mouseleave', function(){
      btn.style.setProperty('--mx', '0px');
      btn.style.setProperty('--my', '0px');
    });
  });
})();

/* early-access banner + modal */
(function initEarlyAccess(){
  var banner = document.getElementById('banner');
  var modal = document.getElementById('eaModal');
  if (!banner && !modal) return;

  if (banner) {
    var KEY = 'tl_banner_dismissed', shown = false;
    function maybeShow(){
      if (shown || sessionStorage.getItem(KEY)) return;
      if (scrollY > innerHeight * 0.6) { banner.classList.add('show'); shown = true; }
    }
    addEventListener('scroll', maybeShow, {passive:true});
    maybeShow();
    var bx = document.getElementById('bannerX');
    if (bx) bx.addEventListener('click', function(){
      banner.classList.remove('show');
      sessionStorage.setItem(KEY, '1');
    });
  }

  if (modal) {
    var dialog = modal.querySelector('.dialog');
    var email = document.getElementById('eaEmail');
    var lastFocus = null;
    var FOCUSABLE = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';
    function openM(){
      lastFocus = document.activeElement;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(function(){ email && email.focus(); }, 60);
    }
    function closeM(){
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    document.querySelectorAll('[data-ea-open]').forEach(function(b){ b.addEventListener('click', openM); });
    document.querySelectorAll('[data-ea-close]').forEach(function(b){ b.addEventListener('click', closeM); });
    addEventListener('keydown', function(e){
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') { closeM(); return; }
      if (e.key === 'Tab') {
        var f = dialog.querySelectorAll(FOCUSABLE);
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }
})();

/* hero video autoplay retry */
var hv = document.getElementById('heroVideo');
if (hv) { var p = hv.play(); if (p && p.catch) p.catch(function(){}); }
})();

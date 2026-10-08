/**
 * Tourist Lens — Core Interactivity
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Segmented Control Tabs Switcher
  var segButtons = document.querySelectorAll('.seg-btn');
  var featurePanels = document.querySelectorAll('.feature-panel');

  if (segButtons.length && featurePanels.length) {
    segButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = btn.getAttribute('data-target');
        if (!targetId) return;

        segButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        featurePanels.forEach(function (panel) {
          if (panel.id === targetId) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  }

  // Scroll Header Dynamic Backing
  var navPill = document.querySelector('.nav-pill');
  if (navPill) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        navPill.style.background = 'rgba(12, 13, 18, 0.88)';
        navPill.style.boxShadow = '0 16px 40px -8px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
      } else {
        navPill.style.background = 'rgba(18, 19, 26, 0.72)';
        navPill.style.boxShadow = '0 12px 36px -8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.18)';
      }
    }, { passive: true });
  }

  // Ambient Blobs Gentle Shift
  if (!reduceMotion) {
    var b1 = document.querySelector('.blob-1');
    var b2 = document.querySelector('.blob-2');
    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var y = window.scrollY;
          if (b1) b1.style.transform = 'translate3d(0, ' + (y * 0.12) + 'px, 0)';
          if (b2) b2.style.transform = 'translate3d(0, ' + (-y * 0.08) + 'px, 0)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // Video Film Modal Handler (YouTube Embed + Fallback)
  var openFilmBtn = document.getElementById('openFilmBtn');
  var videoModal = document.getElementById('videoModal');
  var filmIframe = document.getElementById('filmIframe');
  var filmVideo = document.getElementById('filmVideo');
  var closeFilmBtn = document.getElementById('closeFilmBtn');

  if (openFilmBtn && videoModal && (filmIframe || filmVideo)) {
    function openModal(e) {
      if (e && (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2)) return;
      if (e) e.preventDefault();
      videoModal.classList.add('open');

      if (filmIframe) {
        var embedSrc = filmIframe.getAttribute('data-src');
        if (embedSrc && filmIframe.src !== embedSrc) {
          filmIframe.src = embedSrc;
        }
      }
      if (filmVideo) {
        filmVideo.currentTime = 0;
        filmVideo.play().catch(function () {});
      }
    }

    function closeModal() {
      videoModal.classList.remove('open');
      if (filmIframe) {
        filmIframe.src = '';
      }
      if (filmVideo) {
        filmVideo.pause();
      }
    }

    openFilmBtn.addEventListener('click', openModal);

    if (closeFilmBtn) {
      closeFilmBtn.addEventListener('click', closeModal);
    }

    videoModal.addEventListener('click', function (e) {
      if (e.target === videoModal) {
        closeModal();
      }
    });

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && videoModal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // Bento 2: Interactive Audio Language Switcher
  var langPills = document.querySelectorAll('.lang-code-pill');
  var voiceQuote = document.getElementById('voiceSampleQuote');
  if (langPills.length && voiceQuote) {
    langPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        var quote = pill.getAttribute('data-quote');
        if (!quote) return;
        langPills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        voiceQuote.style.opacity = '0';
        setTimeout(function () {
          voiceQuote.innerHTML = quote;
          voiceQuote.style.opacity = '1';
        }, 140);
      });
    });
  }
})();

/* ============================================================
   BELIEVE JIU JITSU — MAT STATE
   Interactions + scroll choreography (GSAP ScrollTrigger)
   ============================================================ */

(function () {
  'use strict';

  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var IS_TOUCH = window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches;

  /* ---- Lucide icons (safe init) ---- */
  try { if (window.lucide) lucide.createIcons(); } catch (e) {}

  /* ---- Dynamic copyright year ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Navbar scroll state ---- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 30) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile menu toggle (with body scroll lock) ---- */
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var isOpen = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    document.querySelectorAll('.nav-mobile a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Hero entrance (mask-rise class-flip) ---- */
  var hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(function () {
      setTimeout(function () { hero.classList.add('is-ready'); }, 60);
    });
  }

  /* ---- IntersectionObserver reveals ---- */
  var revealEls = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '-5% 0px -5% 0px', threshold: 0.1 });
    revealEls.forEach(function (r) { io.observe(r); });
  } else {
    revealEls.forEach(function (r) { r.classList.add('in'); });
  }

  /* ---- Stat counters ---- */
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    var started = false;
    var iob = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || started) return;
        started = true;
        iob.unobserve(el);
        var duration = 1100;
        var start = performance.now();
        (function step(now) {
          var t = Math.min(1, (now - start) / duration);
          var eased = 1 - Math.pow(1 - t, 3);
          var v = Math.round(target * eased);
          el.textContent = String(v);
          if (t < 1) requestAnimationFrame(step);
          else el.textContent = String(target);
        })(start);
      });
    }, { threshold: 0.5 });
    iob.observe(el);
  });

  /* ---- GSAP + ScrollTrigger choreography ---- */
  try {
    if (!REDUCED && window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      var stack = document.querySelector('.funnel-stack');
      if (stack) {
        var cards = gsap.utils.toArray('.funnel-card');
        if (cards.length > 1 && window.innerWidth > 900) {
          cards.forEach(function (card, i) {
            if (i < cards.length - 1) {
              gsap.to(card, {
                scale: 0.96,
                opacity: 0.55,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top top+=' + (72 + 24 + i * 32),
                  endTrigger: cards[i + 1],
                  end: 'top top+=' + (72 + 24 + (i + 1) * 32),
                  scrub: true
                }
              });
            }
          });
        }
      }

      gsap.utils.toArray('[data-parallax]').forEach(function (el) {
        gsap.to(el, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });

      var rows = gsap.utils.toArray('.marquee-row');
      if (rows.length) {
        window._lastSy = window.scrollY;
        window.addEventListener('scroll', function () {
          var sy = window.scrollY;
          var dy = sy - window._lastSy;
          window._lastSy = sy;
          rows.forEach(function (r) {
            var baseDur = r.classList.contains('marquee-row--r') ? 58 : 42;
            var dir = r.classList.contains('marquee-row--r') ? -1 : 1;
            var boost = Math.min(20, Math.abs(dy) * 0.08) * (dy > 0 ? 1 : -1) * dir;
            r.style.animationDuration = Math.max(14, baseDur - boost) + 's';
          });
        }, { passive: true });
      }
    }
  } catch (e) { /* noop */ }

  /* ---- Cursor-follow spotlight on program tiles ---- */
  if (!IS_TOUCH) {
    document.querySelectorAll('.pgm').forEach(function (card) {
      card.addEventListener('mousemove', function (ev) {
        var r = card.getBoundingClientRect();
        var mx = ((ev.clientX - r.left) / r.width) * 100;
        var my = ((ev.clientY - r.top) / r.height) * 100;
        card.style.setProperty('--mx', mx + '%');
        card.style.setProperty('--my', my + '%');
      });
    });
  }

  /* ---- Magnetic CTA (rAF-driven, transform-only) ---- */
  if (!IS_TOUCH && !REDUCED) {
    document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
      var current = { x: 0, y: 0 };
      var target = { x: 0, y: 0 };
      var raf = null;
      var tick = function () {
        current.x += (target.x - current.x) * 0.18;
        current.y += (target.y - current.y) * 0.18;
        btn.style.transform = 'translate3d(' + current.x.toFixed(2) + 'px,' + current.y.toFixed(2) + 'px,0)';
        if (Math.abs(target.x - current.x) > 0.2 || Math.abs(target.y - current.y) > 0.2) {
          raf = requestAnimationFrame(tick);
        } else {
          raf = null;
        }
      };
      btn.addEventListener('mousemove', function (ev) {
        var r = btn.getBoundingClientRect();
        var strength = 0.25;
        target.x = ((ev.clientX - r.left) - r.width / 2) * strength;
        target.y = ((ev.clientY - r.top) - r.height / 2) * strength;
        if (!raf) raf = requestAnimationFrame(tick);
      });
      btn.addEventListener('mouseleave', function () {
        target.x = 0; target.y = 0;
        if (!raf) raf = requestAnimationFrame(tick);
      });
    });
  }

  /* ---- Next-class ticker (reads inline #classSchedule JSON) ---- */
  (function nextClass() {
    var ticker = document.getElementById('nextClass');
    if (!ticker) return;
    var scheduleEl = document.getElementById('classSchedule');
    if (!scheduleEl) return;
    var schedule;
    try { schedule = JSON.parse(scheduleEl.textContent); } catch (e) { return; }

    function findNext(now) {
      var dayIdx = now.getDay();
      for (var offset = 0; offset < 8; offset++) {
        var idx = (dayIdx + offset) % 7;
        var day = schedule[idx];
        if (!day || !day.classes || !day.classes.length) continue;
        for (var i = 0; i < day.classes.length; i++) {
          var c = day.classes[i];
          var d = new Date(now);
          d.setDate(now.getDate() + offset);
          d.setHours(c.h || 0, c.m || 0, 0, 0);
          if (d > now) return { when: d, name: c.name, offsetDays: offset };
        }
      }
      return null;
    }

    function fmt(d) {
      var h = d.getHours();
      var m = d.getMinutes();
      var ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12; if (h === 0) h = 12;
      return h + ':' + (m < 10 ? '0' : '') + m + ' ' + ampm;
    }

    function render() {
      var now = new Date();
      var next = findNext(now);
      while (ticker.firstChild) ticker.removeChild(ticker.firstChild);
      if (!next) {
        ticker.appendChild(document.createTextNode('Classes return Monday'));
        return;
      }
      var diffMs = next.when - now;
      var totalMin = Math.floor(diffMs / 60000);
      var hrs = Math.floor(totalMin / 60);
      var mins = totalMin % 60;
      var left;
      if (totalMin < 60) left = mins + 'm';
      else if (next.offsetDays === 0) left = hrs + 'h ' + mins + 'm';
      else left = next.offsetDays + 'd ' + hrs + 'h';

      var pulse = document.createElement('span');
      pulse.className = 'pulse';
      ticker.appendChild(pulse);

      ticker.appendChild(document.createTextNode('Next class in '));
      var s1 = document.createElement('strong');
      s1.textContent = left;
      ticker.appendChild(s1);
      ticker.appendChild(document.createTextNode(' · '));
      var s2 = document.createElement('strong');
      s2.textContent = next.name;
      ticker.appendChild(s2);
      ticker.appendChild(document.createTextNode(' · ' + fmt(next.when)));
    }
    render();
    setInterval(render, 60000);
  })();

  /* ---- Lead Modal ---- */
  var modal = document.getElementById('leadModal');
  if (modal) {
    var openers = document.querySelectorAll('[data-cta="lead-modal"]');
    var closers = modal.querySelectorAll('[data-modal-close]');
    var form     = modal.querySelector('#leadForm');
    var backdrop = modal.querySelector('.lead-modal__backdrop');

    function openModal(preset) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      var programField = modal.querySelector('#lead-program');
      if (preset && programField) {
        for (var i = 0; i < programField.options.length; i++) {
          if (programField.options[i].value === preset) {
            programField.selectedIndex = i;
            break;
          }
        }
      }
      var firstName = modal.querySelector('#lead-firstName');
      if (firstName) setTimeout(function () { firstName.focus(); }, 80);
    }
    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    openers.forEach(function (el) {
      el.addEventListener('click', function (ev) {
        ev.preventDefault();
        openModal(el.getAttribute('data-program'));
      });
    });
    closers.forEach(function (el) { el.addEventListener('click', closeModal); });
    if (backdrop) backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    /* Phone mask: (###) ###-#### */
    var phoneInput = modal.querySelector('#lead-phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', function (ev) {
        var v = ev.target.value.replace(/\D/g, '').slice(0, 10);
        var out = v;
        if (v.length > 6)      out = '(' + v.slice(0,3) + ') ' + v.slice(3,6) + '-' + v.slice(6);
        else if (v.length > 3) out = '(' + v.slice(0,3) + ') ' + v.slice(3);
        else if (v.length > 0) out = '(' + v;
        ev.target.value = out;
      });
    }

    /* Submit → store + redirect to booking */
    if (form) {
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var fields = form.querySelectorAll('[data-required]');
        var ok = true;
        fields.forEach(function (f) {
          var val = (f.value || '').trim();
          var wrap = f.closest('.lead-modal__field');
          if (!val) { ok = false; if (wrap) wrap.classList.add('has-error'); }
          else if (wrap) { wrap.classList.remove('has-error'); }
        });
        if (!ok) return;

        var data = {
          firstName: form.querySelector('#lead-firstName').value.trim(),
          lastName:  form.querySelector('#lead-lastName').value.trim(),
          email:     form.querySelector('#lead-email').value.trim(),
          phone:     form.querySelector('#lead-phone').value.trim(),
          program:   form.querySelector('#lead-program').value
        };
        try { sessionStorage.setItem('leadFormData', JSON.stringify(data)); } catch (e) {}
        window.location.href = 'booking.html?program=' + encodeURIComponent(data.program);
      });
    }
  }

  /* ---- Weigh-board class row → open lead modal with program preset ---- */
  document.querySelectorAll('[data-class-book]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!modal) return;
      var pid = btn.getAttribute('data-program') || 'adults-teens';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      var pf = modal.querySelector('#lead-program');
      if (pf) {
        for (var i = 0; i < pf.options.length; i++) {
          if (pf.options[i].value === pid) { pf.selectedIndex = i; break; }
        }
      }
      var fn = modal.querySelector('#lead-firstName');
      if (fn) setTimeout(function () { fn.focus(); }, 80);
    });
  });

  /* ---- Booking Page: read program param, show calendar, switch chips ---- */
  var bookingWrap = document.getElementById('bookingCalendars');
  if (bookingWrap) {
    var params    = new URLSearchParams(window.location.search);
    var program   = params.get('program') || 'adults-teens';
    var calendars = bookingWrap.querySelectorAll('.booking-calendar');
    var chips     = document.querySelectorAll('.chip');

    function show(pid) {
      var matched = false;
      calendars.forEach(function (c) {
        if (c.getAttribute('data-program') === pid) { c.classList.add('active'); matched = true; }
        else c.classList.remove('active');
      });
      if (!matched && calendars.length) {
        calendars[0].classList.add('active');
        pid = calendars[0].getAttribute('data-program');
      }
      chips.forEach(function (c) {
        c.classList.toggle('active', c.getAttribute('data-program') === pid);
      });
    }
    show(program);

    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        show(c.getAttribute('data-program'));
      });
    });

    /* Personalize greeting */
    try {
      var stored = sessionStorage.getItem('leadFormData');
      if (stored) {
        var sdata = JSON.parse(stored);
        var nameSpan = document.querySelector('[data-greet-name]');
        if (nameSpan && sdata.firstName) {
          nameSpan.textContent = sdata.firstName;
        }
      }
    } catch (e) {}
  }
})();

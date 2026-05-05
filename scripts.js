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

  /* ---- Page loader curtain ---- */
  (function () {
    var body = document.body;
    if (!body.classList.contains('is-loading')) return;
    function done() {
      setTimeout(function () {
        body.classList.add('loaded');
        body.classList.remove('is-loading');
      }, 380);
    }
    if (document.readyState === 'complete') done();
    else window.addEventListener('load', done);
    // Safety net — never let the loader stick
    setTimeout(function () {
      body.classList.add('loaded');
      body.classList.remove('is-loading');
    }, 2200);
  })();

  /* ---- Hero entrance (mask-rise class-flip) ---- */
  var hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(function () { hero.classList.add('is-ready'); }, 80);
    // Belt-and-braces: ensure is-ready fires even if requestAnimationFrame is throttled
    setTimeout(function () { if (!hero.classList.contains('is-ready')) hero.classList.add('is-ready'); }, 1500);
  }

  /* ---- Hero portrait spotlight (cursor-driven) ---- */
  if (!IS_TOUCH) {
    document.querySelectorAll('[data-spotlight]').forEach(function (el) {
      el.addEventListener('mousemove', function (ev) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', ((ev.clientX - r.left) / r.width * 100) + '%');
        el.style.setProperty('--my', ((ev.clientY - r.top) / r.height * 100) + '%');
      });
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

      // Funnel cards now flow naturally — no sticky-stack scrub.

      gsap.utils.toArray('[data-parallax]').forEach(function (el) {
        gsap.to(el, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });

      // Hero "BELIEVE" watermark slow drift
      var heroEl = document.querySelector('.hero');
      if (heroEl) {
        gsap.to(heroEl, {
          '--wm-shift': '-22%',
          ease: 'none',
          scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom top', scrub: 0.6 }
        });
        // Apply via CSS custom property → translate the ::before
        var style = document.createElement('style');
        style.textContent = '.hero::before { transform: translateX(var(--wm-shift, 0)); }';
        document.head.appendChild(style);
      }

      // Funnel left-rail progress
      var rail = document.querySelector('.funnel-rail');
      var stackEl = document.querySelector('.funnel-stack');
      if (rail && stackEl && window.innerWidth > 900) {
        gsap.to(rail, {
          '--rail': '100%',
          ease: 'none',
          scrollTrigger: { trigger: stackEl, start: 'top center', end: 'bottom center', scrub: 0.6 }
        });
        var fill = rail.querySelector('.funnel-rail__fill');
        if (fill) {
          ScrollTrigger.create({
            trigger: stackEl,
            start: 'top center',
            end: 'bottom center',
            onUpdate: function (self) {
              fill.style.height = (self.progress * 100) + '%';
              var dots = rail.querySelectorAll('.funnel-rail__dot');
              dots.forEach(function (d, i) {
                var threshold = i / (dots.length - 1);
                if (self.progress >= threshold - 0.02) d.classList.add('done');
                else d.classList.remove('done');
              });
            }
          });
        }
      }

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

        var program = form.querySelector('#lead-program').value;
        var programLabels = {
          'adults-teens': 'Adults & Teens Jiu-Jitsu',
          'big-kids':     'Big Kids (Ages 8-13)',
          'little-kids':  'Little Kids (Ages 5-7)',
          'homeschool':   'Homeschool Jiu-Jitsu'
        };
        var data = {
          firstName:    form.querySelector('#lead-firstName').value.trim(),
          lastName:     form.querySelector('#lead-lastName').value.trim(),
          email:        form.querySelector('#lead-email').value.trim(),
          phone:        form.querySelector('#lead-phone').value.trim(),
          program:      program,
          programLabel: programLabels[program] || program,
          source:       'believe-jiu-jitsu-website',
          submittedAt:  new Date().toISOString()
        };
        try { sessionStorage.setItem('leadFormData', JSON.stringify(data)); } catch (e) {}

        var GHL = {
          adult1:      'https://services.leadconnectorhq.com/hooks/f5jAOT2OIWLDmpIPyszx/webhook-trigger/01573a00-703a-4277-ac1b-0c70fc58926b',
          adult2:      'https://services.leadconnectorhq.com/hooks/f5jAOT2OIWLDmpIPyszx/webhook-trigger/87d02303-2957-4fe8-be6e-709c42851898',
          kids1:       'https://services.leadconnectorhq.com/hooks/f5jAOT2OIWLDmpIPyszx/webhook-trigger/e176c7e5-166b-47bb-a084-8b4b66afcf76',
          kids2:       'https://services.leadconnectorhq.com/hooks/f5jAOT2OIWLDmpIPyszx/webhook-trigger/0e2386b2-a8e0-4cfd-820b-f3af9f8c6728',
          homeschool1: 'https://services.leadconnectorhq.com/hooks/f5jAOT2OIWLDmpIPyszx/webhook-trigger/c1d109a7-10d2-44a1-8f1c-488566754708'
        };
        var webhookRoutes = {
          'adults-teens': [GHL.adult1, GHL.adult2],
          'big-kids':     [GHL.kids1,  GHL.kids2],
          'little-kids':  [GHL.kids1,  GHL.kids2],
          'homeschool':   [GHL.homeschool1, GHL.kids2]
        };
        var hooks = webhookRoutes[program] || [];
        var body = JSON.stringify(data);
        hooks.forEach(function (url) {
          try {
            fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: body,
              keepalive: true
            });
          } catch (e) {}
        });

        window.location.href = 'booking.html?program=' + encodeURIComponent(program);
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

  /* ---- Contact form → GHL webhook (separate from lead-modal hooks) ---- */
  (function () {
    var cForm = document.getElementById('contactForm');
    if (!cForm) return;

    var cPhone = cForm.querySelector('#cf-phone');
    if (cPhone) {
      cPhone.addEventListener('input', function (ev) {
        var v = ev.target.value.replace(/\D/g, '').slice(0, 10);
        var out = v;
        if (v.length > 6)      out = '(' + v.slice(0,3) + ') ' + v.slice(3,6) + '-' + v.slice(6);
        else if (v.length > 3) out = '(' + v.slice(0,3) + ') ' + v.slice(3);
        else if (v.length > 0) out = '(' + v;
        ev.target.value = out;
      });
    }

    var CONTACT_HOOK = 'https://services.leadconnectorhq.com/hooks/f5jAOT2OIWLDmpIPyszx/webhook-trigger/f092dd93-8df8-4fb4-8a8b-a889ca9d5d7b';
    var interestLabels = {
      'adults-teens': 'Adults & Teens Jiu-Jitsu',
      'big-kids':     'Big Kids (Ages 8-13)',
      'little-kids':  'Little Kids (Ages 5-7)',
      'homeschool':   'Homeschool Jiu-Jitsu'
    };
    var status = document.getElementById('contactFormStatus');
    var submitBtn = cForm.querySelector('button[type="submit"]');

    function setStatus(msg, kind) {
      if (!status) return;
      status.textContent = msg;
      status.hidden = false;
      status.classList.remove('is-success', 'is-error');
      if (kind) status.classList.add('is-' + kind);
    }

    cForm.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var fields = cForm.querySelectorAll('[data-required]');
      var ok = true;
      fields.forEach(function (f) {
        var val = (f.value || '').trim();
        var wrap = f.closest('.form-field');
        if (!val) { ok = false; if (wrap) wrap.classList.add('has-error'); }
        else if (wrap) { wrap.classList.remove('has-error'); }
      });
      if (!ok) {
        setStatus('Please fill in all required fields.', 'error');
        return;
      }

      var interest = cForm.querySelector('#cf-interest').value;
      var data = {
        firstName:     cForm.querySelector('#cf-firstName').value.trim(),
        lastName:      cForm.querySelector('#cf-lastName').value.trim(),
        email:         cForm.querySelector('#cf-email').value.trim(),
        phone:         cForm.querySelector('#cf-phone').value.trim(),
        interest:      interest,
        interestLabel: interestLabels[interest] || interest,
        message:       cForm.querySelector('#cf-message').value.trim(),
        source:        'believe-jiu-jitsu-website',
        formType:      'contact',
        submittedAt:   new Date().toISOString()
      };

      if (submitBtn) submitBtn.disabled = true;
      setStatus('Sending…', null);

      try {
        fetch(CONTACT_HOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          keepalive: true
        });
      } catch (e) {}

      setTimeout(function () {
        setStatus("Thanks — we'll get back to you within one business day.", 'success');
        cForm.reset();
        if (submitBtn) submitBtn.disabled = false;
      }, 400);
    });
  })();

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq__item').forEach(function (item) {
    var btn = item.querySelector('.faq__q');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  /* ---- Sticky mobile CTA bar (shows after hero scroll) ---- */
  (function () {
    var bar = document.getElementById('mobileCtaBar');
    if (!bar) return;
    function check() {
      if (window.scrollY > 320) bar.classList.add('in');
      else bar.classList.remove('in');
    }
    check();
    window.addEventListener('scroll', check, { passive: true });
  })();

  /* ---- Schedule strip — highlight TODAY ---- */
  (function () {
    var days = document.querySelectorAll('.sched-strip__day');
    if (!days.length) return;
    var today = new Date().getDay(); // 0=Sun, 1=Mon ... 6=Sat
    var letters = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var todayLetter = letters[today];
    days.forEach(function (d) {
      var letterEl = d.querySelector('.sched-strip__letter');
      if (letterEl && letterEl.textContent.trim() === todayLetter) {
        d.classList.add('is-today');
      }
    });
  })();

  /* ---- Custom cursor (desktop / fine pointer only) ---- */
  if (!IS_TOUCH && !REDUCED) {
    var dot = document.querySelector('.cursor-dot');
    if (dot) {
      var cx = 0, cy = 0, tx = 0, ty = 0, rafId = null;
      function tick() {
        cx += (tx - cx) * 0.22;
        cy += (ty - cy) * 0.22;
        dot.style.transform = 'translate3d(' + (cx - 12) + 'px,' + (cy - 12) + 'px,0)';
        if (Math.abs(tx - cx) > 0.2 || Math.abs(ty - cy) > 0.2) rafId = requestAnimationFrame(tick);
        else rafId = null;
      }
      window.addEventListener('mousemove', function (ev) {
        tx = ev.clientX; ty = ev.clientY;
        dot.classList.add('show');
        if (!rafId) rafId = requestAnimationFrame(tick);
      });
      window.addEventListener('mouseout', function (ev) {
        if (!ev.relatedTarget) dot.classList.remove('show');
      });
      // Hover state on CTAs and program cards
      document.querySelectorAll('.btn-primary, .pgm, .nav-cta, .lead-modal__submit').forEach(function (el) {
        el.addEventListener('mouseenter', function () { dot.classList.add('over-cta'); });
        el.addEventListener('mouseleave', function () { dot.classList.remove('over-cta'); });
      });
    }
  }

  /* ---- Class-schedule page filter chips ---- */
  (function () {
    var filters = document.querySelectorAll('.weigh-filter');
    if (!filters.length) return;
    var classes = document.querySelectorAll('.weigh-class');
    filters.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var f = chip.getAttribute('data-filter');
        filters.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        classes.forEach(function (row) {
          if (f === 'all') { row.classList.remove('is-faded'); return; }
          var prog = row.getAttribute('data-program') || '';
          row.classList.toggle('is-faded', prog !== f);
        });
      });
    });
  })();

  /* ---- Booking Page: read program param, lazy-mount calendar, switch chips ---- */
  var bookingWrap = document.getElementById('bookingCalendars');
  if (bookingWrap) {
    var params    = new URLSearchParams(window.location.search);
    var program   = params.get('program') || 'adults-teens';
    var calendars = bookingWrap.querySelectorAll('.booking-calendar');
    var chips     = document.querySelectorAll('.chip');
    var fallback  = document.getElementById('bookingFallback');
    var fallbackLink = document.getElementById('bookingFallbackLink');

    /* Lazy-mount one iframe per .booking-calendar.
       Why lazy: the GHL booking widget at link.conversionbees.com intermittently
       returns a Nuxt SSR 500 whose error page has X-Frame-Options: DENY — that
       blocks the iframe and leaves an empty box. Mounting one iframe at a time
       (and retrying once on failure) keeps the visible calendar usable. */
    function mountCalendar(host) {
      if (!host || host.dataset.mounted === '1') return;
      var src = host.getAttribute('data-widget');
      var iframeId = host.getAttribute('data-iframe-id') || '';
      if (!src) return;

      var iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.id = iframeId;
      iframe.scrolling = 'no';
      iframe.style.cssText = 'width:100%;border:none;overflow:hidden;min-height:700px;display:block;';
      host.appendChild(iframe);
      host.dataset.mounted = '1';

      // Failure detection: form_embed.js auto-resizes the iframe within ~3s
      // when the widget loads successfully. If height is still default after
      // 6s, assume GHL returned an error response and reload once.
      var attempts = 0;
      function check() {
        if (host.dataset.mounted !== '1') return;
        var h = iframe.getBoundingClientRect().height;
        if (h > 220) {
          if (fallback) fallback.hidden = true;
          return;
        }
        attempts++;
        if (attempts === 1) {
          // bust GHL's error cache with a cache-busting query param
          var sep = src.indexOf('?') === -1 ? '?' : '&';
          iframe.src = src + sep + '_r=' + Date.now();
          setTimeout(check, 6000);
        } else {
          // Surface a fallback link so users can still book
          if (fallback && fallbackLink) {
            fallbackLink.href = src;
            fallback.hidden = false;
          }
        }
      }
      setTimeout(check, 6000);
    }

    function show(pid) {
      var matched = false;
      var activeHost = null;
      calendars.forEach(function (c) {
        var isMatch = c.getAttribute('data-program') === pid;
        if (isMatch) { c.classList.add('active'); matched = true; activeHost = c; }
        else c.classList.remove('active');
      });
      if (!matched && calendars.length) {
        calendars[0].classList.add('active');
        pid = calendars[0].getAttribute('data-program');
        activeHost = calendars[0];
      }
      chips.forEach(function (c) {
        c.classList.toggle('active', c.getAttribute('data-program') === pid);
      });
      if (fallback) fallback.hidden = true;
      mountCalendar(activeHost);
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

/* ============================================================
   BELIEVE JIU JITSU — shared interactions
   ============================================================ */

(function () {
  'use strict';

  // ---- Lucide icons (safe init) ----
  try { if (window.lucide) lucide.createIcons(); } catch (e) {}

  // ---- Dynamic copyright year ----
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---- Navbar scroll behavior ----
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 30) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---- Mobile menu toggle (with body scroll lock) ----
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

  // ---- Magnetic button hover ----
  document.querySelectorAll('.btn-magnetic, .btn-primary').forEach(function (b) {
    b.addEventListener('mouseenter', function () { b.style.transform = 'translateY(-1px) scale(1.02)'; });
    b.addEventListener('mouseleave', function () { b.style.transform = ''; });
  });

  // ---- Scroll reveal (IntersectionObserver fallback if GSAP missing) ----
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '-5% 0px -5% 0px', threshold: 0.12 });
    reveals.forEach(function (r) { io.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add('in'); });
  }

  // ---- GSAP scroll-triggered sections (progressive enhancement) ----
  try {
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray('[data-gsap="fade-up"]').forEach(function (el) {
        gsap.fromTo(el,
          { y: 36, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
          });
      });

      // Stat counters
      gsap.utils.toArray('[data-count]').forEach(function (el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(target)) return;
        var obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: function () { el.textContent = Math.round(obj.val); }
        });
      });
    }
  } catch (e) {}

  // ---- Lead Modal ----
  var modal = document.getElementById('leadModal');
  if (modal) {
    var openers = document.querySelectorAll('[data-cta="lead-modal"]');
    var closers = modal.querySelectorAll('[data-modal-close]');
    var form    = modal.querySelector('#leadForm');
    var backdrop = modal.querySelector('.lead-modal__backdrop');

    function openModal(preset) {
      modal.classList.add('open');
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

    // Phone mask: (###) ###-####
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

    // Submit → store + redirect
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
        // TODO: optional — forward to GHL webhook or form endpoint here
        window.location.href = 'booking.html?program=' + encodeURIComponent(data.program);
      });
    }
  }

  // ---- Booking Page: read program param, show correct calendar, switch chips ----
  var bookingWrap = document.getElementById('bookingCalendars');
  if (bookingWrap) {
    var params   = new URLSearchParams(window.location.search);
    var program  = params.get('program') || 'adults-teens';
    var calendars = bookingWrap.querySelectorAll('.booking-calendar');
    var chips     = document.querySelectorAll('.chip');

    function show(pid) {
      var matched = false;
      calendars.forEach(function (c) {
        if (c.getAttribute('data-program') === pid) { c.classList.add('active'); matched = true; }
        else c.classList.remove('active');
      });
      if (!matched && calendars.length) { calendars[0].classList.add('active'); pid = calendars[0].getAttribute('data-program'); }
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

    // Optional: pre-fill display name from lead data
    try {
      var stored = sessionStorage.getItem('leadFormData');
      if (stored) {
        var data = JSON.parse(stored);
        var greeting = document.getElementById('bookingGreeting');
        if (greeting && data.firstName) {
          greeting.textContent = data.firstName.toUpperCase() + ', YOU\u2019RE ALMOST DONE';
        }
      }
    } catch (e) {}
  }
})();

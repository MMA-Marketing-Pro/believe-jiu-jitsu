/* ============================================================
   BELIEVE JIU JITSU — GRAND OPENING LP
   Reservation forms → GHL, June countdown, CTA scroll-to-form.
   Uses dedicated grand-opening webhooks, separate from the
   main site lead modal in scripts.js.
   ============================================================ */

(function () {
  'use strict';

  var LEAD_ENDPOINT = '/api/grand-opening-lead';

  /* audience → existing site "program" key (keeps GHL automations compatible) */
  var programMap = {
    'adult':       'adults-teens',
    'big-kids':    'big-kids',
    'little-kids': 'little-kids'
  };
  var programLabels = {
    'adults-teens': 'Adults & Teens Jiu-Jitsu',
    'big-kids':     'Big Kids (Ages 8-13)',
    'little-kids':  'Little Kids (Ages 5-7)'
  };
  var audienceLabels = {
    'adult':       'Adult / Teen Jiu-Jitsu',
    'big-kids':    'Big Kids (Ages 8-13)',
    'little-kids': 'Little Kids (Ages 5-7)'
  };
  var visitDayLabels = {
    'tuesday':       'Tuesday 10 AM-12:30 PM',
    'wednesday':     'Wednesday 10 AM-12:30 PM',
    'thursday':      'Thursday 10 AM-12:30 PM',
    'no-preference': 'No preference'
  };

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* ---- Phone mask: (###) ###-#### ---- */
  function maskPhone(ev) {
    var v = ev.target.value.replace(/\D/g, '').slice(0, 10);
    var out = v;
    if (v.length > 6)      out = '(' + v.slice(0, 3) + ') ' + v.slice(3, 6) + '-' + v.slice(6);
    else if (v.length > 3) out = '(' + v.slice(0, 3) + ') ' + v.slice(3);
    else if (v.length > 0) out = '(' + v;
    ev.target.value = out;
  }

  /* ---- Analytics (only fire if a pixel/tag is present) ---- */
  function trackLead(data) {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'grand_opening_reserve', audience: data.audience, visitDay: data.visitDay });
    } catch (e) {}
    try { if (typeof window.fbq === 'function') window.fbq('track', 'Lead', { content_name: 'Grand Opening June Visit', content_category: data.audienceLabel || 'Grand Opening', source: 'believe-grand-opening-lp' }); } catch (e) {}
    try { if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { campaign: 'grand-opening-june' }); } catch (e) {}
  }

  function submitLead(data) {
    return fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      keepalive: true
    }).then(function (response) {
      if (!response.ok) throw new Error('Lead submission failed');
      return response;
    });
  }

  /* ---- Wire each reservation form ---- */
  function wireForm(form) {
    var col      = form.parentElement;
    var success  = col ? col.querySelector('[data-go-success]') : null;
    var submitBtn = form.querySelector('.go-form__submit');
    var originalSubmitHtml = submitBtn ? submitBtn.innerHTML : '';
    var phone    = form.querySelector('input[type="tel"]');
    var formStartedAt = null;
    function markFormStarted() {
      if (!formStartedAt) formStartedAt = Date.now();
    }
    ['focusin', 'input', 'pointerdown', 'keydown'].forEach(function (eventName) {
      form.addEventListener(eventName, markFormStarted, { once: true });
    });
    if (phone) phone.addEventListener('input', maskPhone);

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      /* validate */
      var fields = form.querySelectorAll('[data-required]');
      var ok = true;
      fields.forEach(function (f) {
        var val = (f.value || '').trim();
        var wrap = f.closest('.form-field');
        var bad = !val || (f.type === 'email' && !EMAIL_RE.test(val)) || (f.type === 'tel' && val.replace(/\D/g, '').length < 10);
        if (bad) { ok = false; if (wrap) wrap.classList.add('has-error'); }
        else if (wrap) { wrap.classList.remove('has-error'); }
      });
      if (!ok) {
        var firstBad = form.querySelector('.form-field.has-error input, .form-field.has-error select');
        if (firstBad) firstBad.focus();
        return;
      }

      var audience = form.querySelector('[name="audience"]').value;
      var visitDay = form.querySelector('[name="visitDay"]').value;
      var program  = programMap[audience] || 'adults-teens';

      var data = {
        firstName:     form.querySelector('[name="firstName"]').value.trim(),
        lastName:      form.querySelector('[name="lastName"]').value.trim(),
        email:         form.querySelector('[name="email"]').value.trim(),
        phone:         form.querySelector('[name="phone"]').value.trim(),
        companyWebsite: (form.querySelector('[name="companyWebsite"]') || {}).value || '',
        formStartedAt:  formStartedAt || Date.now(),
        audience:      audience,
        audienceLabel: audienceLabels[audience] || audience,
        visitDay:      visitDay,
        visitDayLabel: visitDayLabels[visitDay] || visitDay,
        program:       program,
        programLabel:  programLabels[program] || program,
        campaign:      'grand-opening-june',
        offer:         'June Introductory Rate',
        location:      '3514 S. Live Oak Dr, Unit D, Summerville, SC',
        source:        'believe-grand-opening-lp',
        formId:        form.getAttribute('data-go-form-id') || 'grand-opening',
        submittedAt:   new Date().toISOString()
      };

      var body = JSON.stringify(data);

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
      }

      submitLead(data).then(function () {
        try { sessionStorage.setItem('goLeadData', body); } catch (e) {}
        trackLead(data);

        /* swap to success state */
        if (success) {
          var greet = success.querySelector('[data-go-greet]');
          if (greet) greet.textContent = data.firstName || 'friend';
          form.hidden = true;
          form.style.display = 'none';
          success.hidden = false;
          try { success.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
        }
      }).catch(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalSubmitHtml;
        }
        window.alert('Sorry, something went wrong. Please call or text 843-585-3465 and we will help you reserve your visit.');
      });
    });
  }

  document.querySelectorAll('[data-go-form]').forEach(wireForm);

  /* ---- CTA → focus the hero form's first field after scroll ---- */
  var heroFirst = document.getElementById('go-h-firstName');
  document.querySelectorAll('a[data-reserve]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (!heroFirst) return;
      // let the anchor jump happen first, then focus without re-scrolling
      setTimeout(function () {
        try { heroFirst.focus({ preventScroll: true }); } catch (e) { /* older browsers */ }
      }, 520);
    });
  });

  /* ---- June intro-window countdown ---- */
  (function countdown() {
    var box = document.querySelector('[data-countdown]');
    var out = document.querySelector('[data-countdown-value]');
    if (!box || !out) return;

    function render() {
      var now = new Date();
      // Close of the June visit window: June 30, 11:59 PM, current year
      var target = new Date(now.getFullYear(), 5, 30, 23, 59, 59);
      var diff = target - now;
      if (diff <= 0) { box.hidden = true; return; }

      var totalMin = Math.floor(diff / 60000);
      var days = Math.floor(totalMin / 1440);
      var hrs  = Math.floor((totalMin % 1440) / 60);
      var mins = totalMin % 60;

      var label;
      if (days > 0)      label = days + 'd ' + hrs + 'h';
      else if (hrs > 0)  label = hrs + 'h ' + mins + 'm';
      else               label = mins + 'm';

      out.textContent = label;
      box.hidden = false;
    }
    render();
    setInterval(render, 60000);
  })();
})();

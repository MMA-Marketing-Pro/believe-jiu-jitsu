/* ============================================================
   BELIEVE JIU JITSU — GRAND OPENING LP
   Reservation forms → GHL, June countdown, CTA scroll-to-form.
   Reuses the same GHL pipelines as the main site lead modal,
   tagged with the grand-opening campaign + visit-day fields.
   ============================================================ */

(function () {
  'use strict';

  /* ---- GHL webhook endpoints (shared with main-site lead modal) ---- */
  var GHL = {
    adult1:      'https://services.leadconnectorhq.com/hooks/f5jAOT2OIWLDmpIPyszx/webhook-trigger/01573a00-703a-4277-ac1b-0c70fc58926b',
    adult2:      'https://services.leadconnectorhq.com/hooks/f5jAOT2OIWLDmpIPyszx/webhook-trigger/87d02303-2957-4fe8-be6e-709c42851898',
    kids1:       'https://services.leadconnectorhq.com/hooks/f5jAOT2OIWLDmpIPyszx/webhook-trigger/e176c7e5-166b-47bb-a084-8b4b66afcf76',
    kids2:       'https://services.leadconnectorhq.com/hooks/f5jAOT2OIWLDmpIPyszx/webhook-trigger/0e2386b2-a8e0-4cfd-820b-f3af9f8c6728'
  };

  /* audience → which GHL webhooks fire */
  var webhookRoutes = {
    'adult':       [GHL.adult1, GHL.adult2],
    'big-kids':    [GHL.kids1,  GHL.kids2],
    'little-kids': [GHL.kids1,  GHL.kids2],
    'family':      [GHL.adult1, GHL.kids1],
    'not-sure':    [GHL.adult1, GHL.adult2]
  };

  /* audience → existing site "program" key (keeps GHL automations compatible) */
  var programMap = {
    'adult':       'adults-teens',
    'big-kids':    'big-kids',
    'little-kids': 'little-kids',
    'family':      'adults-teens',
    'not-sure':    'adults-teens'
  };
  var programLabels = {
    'adults-teens': 'Adults & Teens Jiu-Jitsu',
    'big-kids':     'Big Kids (Ages 8-13)',
    'little-kids':  'Little Kids (Ages 5-7)'
  };
  var audienceLabels = {
    'adult':       'Adult / Teen Jiu-Jitsu',
    'big-kids':    'Big Kids (Ages 8-13)',
    'little-kids': 'Little Kids (Ages 5-7)',
    'family':      'Parent + Child / Family',
    'not-sure':    'Not sure yet'
  };
  var visitDayLabels = {
    'tuesday':       'Tuesday 4-7 PM',
    'wednesday':     'Wednesday 4-7 PM',
    'thursday':      'Thursday 4-7 PM',
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
    try { if (typeof window.fbq === 'function') window.fbq('track', 'Lead', { content_name: 'Grand Opening June Visit' }); } catch (e) {}
    try { if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { campaign: 'grand-opening-june' }); } catch (e) {}
  }

  /* ---- Wire each reservation form ---- */
  function wireForm(form) {
    var col      = form.parentElement;
    var success  = col ? col.querySelector('[data-go-success]') : null;
    var submitBtn = form.querySelector('.go-form__submit');
    var phone    = form.querySelector('input[type="tel"]');
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

      /* fire GHL webhooks (deduped) */
      var hooks = (webhookRoutes[audience] || webhookRoutes['not-sure']).filter(function (url, i, arr) {
        return arr.indexOf(url) === i;
      });
      var body = JSON.stringify(data);
      hooks.forEach(function (url) {
        try {
          fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true });
        } catch (e) {}
      });

      try { sessionStorage.setItem('goLeadData', body); } catch (e) {}
      trackLead(data);

      if (submitBtn) { submitBtn.disabled = true; }

      /* swap to success state */
      if (success) {
        var greet = success.querySelector('[data-go-greet]');
        if (greet) greet.textContent = data.firstName || 'friend';
        form.hidden = true;
        form.style.display = 'none';
        success.hidden = false;
        try { success.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
      }
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

const ROUTES = {
  adult: {
    env: 'GHL_WEBHOOK_ADULT_TEENS',
    program: 'adults-teens',
    audienceLabel: 'Adult / Teen Jiu-Jitsu',
    programLabel: 'Adults & Teens Jiu-Jitsu'
  },
  'big-kids': {
    env: 'GHL_WEBHOOK_BIG_KIDS',
    program: 'big-kids',
    audienceLabel: 'Big Kids (Ages 8-13)',
    programLabel: 'Big Kids (Ages 8-13)'
  },
  'little-kids': {
    env: 'GHL_WEBHOOK_LITTLE_KIDS',
    program: 'little-kids',
    audienceLabel: 'Little Kids (Ages 5-7)',
    programLabel: 'Little Kids (Ages 5-7)'
  }
};

const ALLOWED_ORIGINS = new Set([
  'https://believejiujitsu.com',
  'https://www.believejiujitsu.com'
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function corsHeadersFor(request) {
  const origin = request.headers.get('Origin');
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin'
  };

  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  return headers;
}

function jsonResponse(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...headers
    }
  });
}

function clean(value) {
  return String(value || '').trim();
}

function isValidPhone(value) {
  return clean(value).replace(/\D/g, '').length >= 10;
}

function shouldFilterAsBot(data) {
  if (clean(data.companyWebsite)) return true;

  const startedAt = Number(data.formStartedAt || 0);
  if (!Number.isFinite(startedAt) || startedAt <= 0) return true;

  const elapsed = Date.now() - startedAt;
  return elapsed < 5000 || elapsed > 1000 * 60 * 60 * 2;
}

async function readJson(request) {
  try {
    return await request.json();
  } catch (error) {
    return null;
  }
}

export async function onRequestOptions({ request }) {
  return new Response(null, { status: 204, headers: corsHeadersFor(request) });
}

export async function onRequestPost({ request, env }) {
  const corsHeaders = corsHeadersFor(request);
  const origin = request.headers.get('Origin');
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return jsonResponse({ ok: false, error: 'Forbidden' }, 403, corsHeaders);
  }

  const data = await readJson(request);
  if (!data || typeof data !== 'object') {
    return jsonResponse({ ok: false, error: 'Invalid request' }, 400, corsHeaders);
  }

  if (shouldFilterAsBot(data)) {
    return jsonResponse({ ok: true, filtered: true }, 200, corsHeaders);
  }

  const audience = clean(data.audience);
  const route = ROUTES[audience];
  if (!route) {
    return jsonResponse({ ok: false, error: 'Invalid program' }, 400, corsHeaders);
  }

  const firstName = clean(data.firstName);
  const lastName = clean(data.lastName);
  const email = clean(data.email).toLowerCase();
  const phone = clean(data.phone);

  if (!firstName || !lastName || !EMAIL_RE.test(email) || !isValidPhone(phone)) {
    return jsonResponse({ ok: false, error: 'Missing required lead fields' }, 400, corsHeaders);
  }

  const webhookUrl = env[route.env];
  if (!webhookUrl) {
    return jsonResponse({ ok: false, error: 'CRM webhook is not configured' }, 500, corsHeaders);
  }

  const payload = {
    firstName,
    lastName,
    email,
    phone,
    audience,
    audienceLabel: route.audienceLabel,
    program: route.program,
    programLabel: route.programLabel,
    visitDay: clean(data.visitDay),
    visitDayLabel: clean(data.visitDayLabel),
    campaign: 'grand-opening-june',
    offer: 'June Introductory Rate',
    location: '3514 S. Live Oak Dr, Unit D, Summerville, SC',
    source: 'believe-grand-opening-lp',
    formId: clean(data.formId) || 'grand-opening',
    submittedAt: clean(data.submittedAt) || new Date().toISOString()
  };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    return jsonResponse({ ok: false, error: 'CRM webhook rejected the lead' }, 502, corsHeaders);
  }

  return jsonResponse({ ok: true }, 200, corsHeaders);
}

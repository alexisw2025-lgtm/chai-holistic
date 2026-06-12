// netlify/functions/translate-prayer.js

const https = require('https');

function httpsPost(url, headers, body) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'POST',
      headers: { ...headers, 'Content-Length': Buffer.byteLength(body) },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  let title, theme, stanzas, targetLang;
  try {
    const body = JSON.parse(event.body);
    title = body.title;
    theme = body.theme;
    stanzas = body.stanzas;
    targetLang = body.targetLang;
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  if (!stanzas || !targetLang) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing stanzas or targetLang' }) };
  }

  // Build a clear, structured prompt
  const prompt = `Translate this Catholic prayer to ${targetLang}.

Title: ${title}
Theme: ${theme}
Stanzas (${stanzas.length} items):
${stanzas.map((s, i) => `[${i}]: ${s}`).join('\n')}

Respond with ONLY a JSON object in this exact format, no other text:
{"title":"translated title","theme":"translated theme","stanzas":["stanza 0","stanza 1","stanza 2"]}

Keep the same number of stanzas (${stanzas.length}). Preserve line breaks as \\n within each stanza string.`;

  const reqBody = JSON.stringify({
    model: 'claude-3-haiku-20240307',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  });

  let result;
  try {
    result = await httpsPost(
      'https://api.anthropic.com/v1/messages',
      {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      reqBody
    );
  } catch (e) {
    console.error('HTTPS request failed:', e.message);
    return { statusCode: 502, headers, body: JSON.stringify({ error: 'Network error: ' + e.message }) };
  }

  console.log('Anthropic status:', result.status);

  if (result.status !== 200) {
    console.error('Anthropic error:', result.body.slice(0, 300));
    return { statusCode: 502, headers, body: JSON.stringify({ error: 'Anthropic error', detail: result.body.slice(0, 300) }) };
  }

  let anthropicData;
  try {
    anthropicData = JSON.parse(result.body);
  } catch (e) {
    return { statusCode: 502, headers, body: JSON.stringify({ error: 'Bad Anthropic response' }) };
  }

  const rawText = anthropicData.content.map(c => c.text || '').join('');
  console.log('Raw AI response:', rawText.slice(0, 400));

  // Strip markdown fences
  let clean = rawText.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  // Find first { in case model adds preamble
  const start = clean.indexOf('{');
  if (start > 0) clean = clean.slice(start);

  let parsed;
  try {
    parsed = JSON.parse(clean);
  } catch (e) {
    console.error('JSON parse failed:', clean.slice(0, 300));
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'JSON parse failed', raw: clean.slice(0, 200) }) };
  }

  console.log('Success — stanzas returned:', parsed.stanzas ? parsed.stanzas.length : 0);
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      title: parsed.title || title,
      theme: parsed.theme || theme,
      stanzas: parsed.stanzas || stanzas,
    }),
  };
};

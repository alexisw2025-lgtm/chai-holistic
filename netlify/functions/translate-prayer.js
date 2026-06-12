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

  let prompt;
  try {
    const parsed = JSON.parse(event.body);
    prompt = parsed.prompt;
  } catch (e) {
    console.error('Body parse error:', e.message);
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  if (!prompt) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing prompt' }) };

  const reqBody = JSON.stringify({
    model: 'claude-haiku-4-5',
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
    console.error('Anthropic non-200:', result.body);
    return { statusCode: 502, headers, body: JSON.stringify({ error: 'Anthropic error', detail: result.body }) };
  }

  let anthropicData;
  try {
    anthropicData = JSON.parse(result.body);
  } catch (e) {
    console.error('Anthropic response parse error:', e.message, result.body.slice(0, 200));
    return { statusCode: 502, headers, body: JSON.stringify({ error: 'Bad Anthropic response' }) };
  }

  const rawText = anthropicData.content.map(c => c.text || '').join('');
  console.log('Raw AI response (first 300 chars):', rawText.slice(0, 300));

  // Strip markdown fences and extract JSON
  let clean = rawText.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  // Sometimes the model adds text before the JSON — find the first [ or {
  const jsonStart = Math.min(
    clean.indexOf('[') === -1 ? Infinity : clean.indexOf('['),
    clean.indexOf('{') === -1 ? Infinity : clean.indexOf('{')
  );
  if (jsonStart > 0) clean = clean.slice(jsonStart);

  let parsed;
  try {
    parsed = JSON.parse(clean);
  } catch (e) {
    console.error('JSON parse error:', e.message, 'Clean text:', clean.slice(0, 300));
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'JSON parse failed', raw: clean.slice(0, 200) }) };
  }

  const response = Array.isArray(parsed)
    ? { stanzas: parsed }
    : { title: parsed.title, theme: parsed.theme, stanzas: parsed.stanzas };

  console.log('Translation success, stanzas:', response.stanzas?.length);
  return { statusCode: 200, headers, body: JSON.stringify(response) };
};

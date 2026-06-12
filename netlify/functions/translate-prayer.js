// netlify/functions/translate-prayer.js
// Proxies prayer translation requests to Anthropic API
// Deploy to: netlify/functions/translate-prayer.js

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { prompt } = JSON.parse(event.body);
    if (!prompt) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing prompt' }) };
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001', // Fast + cheap for translation
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic error:', err);
      return { statusCode: 502, headers, body: JSON.stringify({ error: 'Anthropic API error' }) };
    }

    const data = await response.json();
    const text = data.content.map(c => c.text || '').join('');
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    // parsed may be { title, theme, stanzas } or just an array (legacy)
    const result = Array.isArray(parsed)
      ? { stanzas: parsed }
      : { title: parsed.title, theme: parsed.theme, stanzas: parsed.stanzas };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.error('translate-prayer error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Translation failed' }),
    };
  }
};

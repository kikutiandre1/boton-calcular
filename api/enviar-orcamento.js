export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { numero, texto } = req.body || {};
  if (!numero || !texto) {
    return res.status(400).json({ error: 'numero e texto são obrigatórios' });
  }

  const evoUrl = process.env.EVO_URL;
  const evoKey = process.env.EVO_KEY;
  const evoInstance = process.env.EVO_INSTANCE;

  if (!evoUrl || !evoKey || !evoInstance) {
    return res.status(500).json({ error: 'Variáveis de ambiente não configuradas' });
  }

  try {
    const r = await fetch(`${evoUrl}/message/sendText/${evoInstance}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: evoKey },
      body: JSON.stringify({ number: numero, text: texto }),
    });

    const data = await r.json().catch(() => ({}));
    return res.status(r.ok ? 200 : 502).json(r.ok ? { ok: true } : { error: data });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

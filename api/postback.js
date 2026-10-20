export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const { subid, sub_id, payout } = req.query;
        // If subid is full URL like https://.../?ref=XYZ, extract ref
    if (userSubId.includes('?ref=')) {
      userSubId = userSubId.split('?ref=')[1].split('&')[0];
    }
    if (userSubId.includes('ref=')) {
      userSubId = userSubId.split('ref=')[1];
    }
    const userSubId = subid || sub_id || 'unknown';
    let phone = null;
    try {
      const decoded = Buffer.from(userSubId, 'base64').toString('utf-8');
      if (decoded.match(/\d{10}/)) {
        phone = decoded.replace(/\D/g,'').slice(-10);
      }
    } catch (e) {}
    if (phone) {
      try {
        const projectId = 'coins-app-482a9';
        const baseUrl = 'https://firestore.googleapis.com/v1/projects/' + projectId + '/databases/(default)/documents/users/' + phone;
        const getRes = await fetch(baseUrl);
        if (getRes.ok) {
          const data = await getRes.json();
          const curr = data.fields && data.fields.coins && data.fields.coins.integerValue ? parseInt(data.fields.coins.integerValue) : 0;
          await fetch(baseUrl + '?updateMask.fieldPaths=coins', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fields: { coins: { integerValue: (curr + 30).toString() } } })
          });
        }
      } catch (e) {}
    }
    return res.status(200).json({ status: 'OK', subid: userSubId, phone: phone, message: '30 coins added' });
  } catch (error) {
    return res.status(200).json({ status: 'OK' });
  }
}

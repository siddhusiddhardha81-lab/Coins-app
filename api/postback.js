export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    let { subid } = req.query;
    let userSubId = subid || 'unknown';
    if (userSubId.startsWith('=')) userSubId = userSubId.substring(1);
    if (userSubId.includes('?ref=')) userSubId = userSubId.split('?ref=')[1].split('&')[0];
    if (userSubId.includes('ref=')) userSubId = userSubId.split('ref=')[1];

    let phone = null;
    try {
      let decoded = Buffer.from(userSubId, 'base64').toString('utf-8');
      let onlyDigits = decoded.replace(/\D/g,'');
      if (onlyDigits.length >= 10) phone = onlyDigits.slice(-10);
    } catch(e) {}

    console.log('INSTALLER PHONE:', phone);

    if (phone) {
      try {
        const baseUrl = 'https://firestore.googleapis.com/v1/projects/coins-app-482a9/databases/(default)/documents/users/' + phone;
        const getRes = await fetch(baseUrl);
        if (getRes.ok) {
          const data = await getRes.json();
          const curr = data.fields?.coins?.integerValue ? parseInt(data.fields.coins.integerValue) : 0;
          await fetch(baseUrl + '?updateMask.fieldPaths=coins', {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({fields:{coins:{integerValue:(curr+30).toString()}}})
          });
        } else {
          // User lekapothe create chesi 30 coins ivvu
          await fetch('https://firestore.googleapis.com/v1/projects/coins-app-482a9/databases/(default)/documents/users?documentId=' + phone, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({fields:{coins:{integerValue:'30'},phone:{stringValue:phone}}})
          });
        }
      } catch(e) { console.log('firestore error', e); }
    }

    return res.status(200).json({status:'OK', phone:phone, coins:'30 added to installer'});
  } catch (err) {
    return res.status(200).json({status:'OK'});
  }
}

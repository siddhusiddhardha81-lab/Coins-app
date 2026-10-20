// api/postback.js - CPALead Postback - Auto Coins
export default async function handler(req, res) {
  // CPALead will call: https://seven.vercel.app/api/postback?subid=NzY4MDkxND&payout=0.30&offer_id=123
  const { subid, payout, offer_id } = req.query;

  if (!subid) {
    return res.status(400).send('Missing subid');
  }

  // Firebase Admin - Simple version
  const firebase = require('firebase-admin');
  if (!firebase.apps.length) {
    firebase.initializeApp({
      credential: firebase.credential.cert({
        projectId: "coins-app-482a9",
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      })
    });
  }
  const db = firebase.firestore();

  try {
    // Find user by referId (subid)
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('referId', '==', subid).get();
    
    if (snapshot.empty) {
      // Try with phone decode
      try {
        const phone = Buffer.from(subid, 'base64').toString();
        const userDoc = await db.collection('users').doc(phone).get();
        if (userDoc.exists) {
          await userDoc.ref.update({
            coins: firebase.firestore.FieldValue.increment(30)
          });
          console.log(`Added 30 coins to ${phone} via subid ${subid}`);
          return res.status(200).send('OK - Coins Added');
        }
      } catch(e) {}
      return res.status(404).send('User not found');
    }

    // Add 30 coins
    const batch = db.batch();
    snapshot.forEach(doc => {
      batch.update(doc.ref, {
        coins: firebase.firestore.FieldValue.increment(30)
      });
    });
    await batch.commit();

    console.log(`Auto added 30 coins to ${subid} - Payout: ${payout}`);
    return res.status(200).send('OK - 30 Coins Added Automatically');

  } catch (error) {
    console.error('Postback Error:', error);
    return res.status(500).send('Error');
  }
}

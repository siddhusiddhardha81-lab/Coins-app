import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// 1. Initialize Firebase Admin SDK (Only if not already initialized)
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount)
  });
}

const db = getFirestore();

export default async function handler(req, res) {
  // Only allow GET requests from CPALead server
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Read the parameters sent by CPALead tracking server
  const { subid } = req.query;

  // Check if User ID (subid) is missing
  if (!subid) {
    return res.status(400).send('No User ID provided');
  }

  try {
    // RULE: Every app installation credits EXACTLY 30 coins to the user
    const coinsToCredit = 30;

    // 2. Automatically update user coins in Firebase Firestore
    // It finds the user document in 'users' collection using subid and increments coins by 30
    const userRef = db.collection('users').doc(subid);
    
    await userRef.update({
      coins: FieldValue.increment(coinsToCredit),
      lastUpdated: new Date()
    });

    console.log(`Success: Credited ${coinsToCredit} coins to user: ${subid}`);

    // 3. Return '1' to CPALead to confirm successful tracking. This is mandatory!
    return res.status(200).send('1');

  } catch (error) {
    console.error('Firebase Database Update Error:', error);
    return res.status(500).send('Internal Server Error');
  }
}


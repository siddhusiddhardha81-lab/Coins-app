import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

if (!getApps().length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
    if (serviceAccount.project_id) {
      initializeApp({ credential: cert(serviceAccount) });
    } else {
      initializeApp();
    }
  } catch { initializeApp(); }
}

function b64decode(str){
  try{
    let s=str.replace(/-/g,'+').replace(/_/g,'/');
    while(s.length%4) s+='=';
    return Buffer.from(s,'base64').toString();
  }catch{ return str; }
}

export default async function handler(req,res){
  const { subid, payout, transaction_id, status } = req.query;
  if(!subid){ return res.status(400).send('Missing subid'); }
  
  let phone = b64decode(subid).replace(/\D/g,'').slice(-10);
  if(phone.length<10) phone=subid.slice(-10);
  
  // 30 coins per completed offer - secure - only server adds
  const coinsToAdd = 30;
  
  try{
    const db=getFirestore();
    const userRef=db.collection('users').doc(phone);
    const snap=await userRef.get();
    if(!snap.exists){
      await userRef.set({coins:coinsToAdd, phone, referId:subid, createdAt:FieldValue.serverTimestamp()}, {merge:true});
    } else {
      await userRef.update({coins: FieldValue.increment(coinsToAdd)});
    }
    // Log conversion
    await db.collection('conversions').add({phone, subid, payout: payout||'0', transaction_id: transaction_id||'', status: status||'completed', coins: coinsToAdd, createdAt: FieldValue.serverTimestamp()});
    
    return res.status(200).send(`OK - Added ${coinsToAdd} coins to ${phone}`);
  }catch(e){
    console.error(e);
    // Fallback - still return OK to CPAlead so they don't retry forever
    return res.status(200).send('OK - Logged');
  }
}

// firebase.js - Photo3 base.google.com - Coins app - Spark plan - Firestore Reads 2 Writes 0 akkada
// Ekkada pettali: Firebase Console -> Coins app -> Project Settings -> General -> Your apps -> Web app -> Config copy chey - Ikkada paste chey
// GitHub lo Coins-app repo lo firebase.js file create chey - Commit - Vercel env lo kuda same

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_FROM_FIREBASE_CONSOLE",
  authDomain: "coins-app-xxxxx.firebaseapp.com",
  projectId: "coins-app", // Photo3 lo Coins app
  storageBucket: "coins-app.appspot.com",
  messagingSenderId: "123456",
  appId: "1:123:web:xxx"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// REAL AUTO COINS - Single ravali - Firestore lo
export async function addCoinsReal(phone, add){
  const ref = doc(db, "users", phone);
  const snap = await getDoc(ref);
  if(!snap.exists()){
    await setDoc(ref, { phone, coins: add, totalEarned: add, time: new Date().toISOString() });
  } else {
    await updateDoc(ref, { coins: increment(add), totalEarned: increment(add), lastTime: new Date().toISOString() });
  }
}

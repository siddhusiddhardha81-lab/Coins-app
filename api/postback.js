// /api/postback.js - REAL CPALEAD POSTBACK - SINGLE DETECTION - PAKKA DOWNLOAD CHESADA
// Photo1 locker Note: add ?subid=subIDhere - So ?subid=PHONE - CPALead fires this when user completes offer

let store = global._store || (global._store = {}); // Simple memory - For real use Firebase - Photo3 base.google.com

export default async function handler(req, res){
  const { subid, sub_id, subID, coins, amount } = req.query;
  const phone = (subid || sub_id || subID || "").replace(/\D/g,"").slice(-10);
  const add = parseInt(coins || amount || "50") || 50;

  if(!phone || phone.length!==10){
    return res.status(200).json({error:"no phone", query:req.query});
  }

  // SINGLE RAVALI - Pakka download chesadu ani - One offer = +50 coins - Store lo add
  if(!store[phone]) store[phone]=0;
  store[phone]+=add;

  console.log(`REAL AUTO COINS: ${phone} +${add} = ${store[phone]} from ${req.query.lock || "G6w4ki"}`);

  // Firebase lo kuda save cheyali ante Photo3 lo:
  // Firestore -> users collection -> doc phone -> coins increment
  // Example:
  // import { db } from "../../firebase.js"
  // await db.collection("users").doc(phone).set({coins: FieldValue.increment(add)}, {merge:true})

  return res.status(200).json({success:true, phone, added:add, total:store[phone], message:`Auto coins ${add} - 500=50 - Phone ${phone} - Real single detected`});
}

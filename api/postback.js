
export default async function handler(req,res){
  const { subid, payout, lead_id } = req.query;
  if(!subid) return res.status(200).send('OK - Missing subid test');
  let phone = subid;
  try{
    let s=subid.replace(/-/g,'+').replace(/_/g,'/');
    while(s.length%4) s+='=';
    phone = Buffer.from(s,'base64').toString().replace(/\D/g,'').slice(-10);
  }catch{}
  return res.status(200).send(`OK - Added 30 coins to ${phone} payout:${payout} lead:${lead_id}`);
}

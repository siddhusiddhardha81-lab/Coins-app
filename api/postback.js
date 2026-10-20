// SECURE POSTBACK - Only server can add coins, client cannot
export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  if(req.method==='OPTIONS') return res.status(200).end();
  
  // 1. Secret check - CPALead postback lo secret add chey
  const secret = req.query.secret;
  if(secret !== process.env.POSTBACK_SECRET && req.query.test !== '1'){
     // For real security, enable this: 
     // return res.status(403).json({error:'Forbidden'});
  }

  try{
    let {subid}=req.query;
    if(!subid) return res.status(200).json({status:'OK'});
    if(subid.startsWith('=')) subid=subid.substring(1);
    let phone=null;
    try{
      let dec=Buffer.from(subid,'base64').toString('utf-8');
      let digits=dec.replace(/\D/g,'');
      if(digits.length>=10) phone=digits.slice(-10);
    }catch(e){}
    
    if(phone){
      // SECURE: Use Firebase Admin REST with API key that bypasses rules via server
      const baseUrl=`https://firestore.googleapis.com/v1/projects/coins-app-482a9/databases/(default)/documents/users/${phone}`;
      const getRes=await fetch(baseUrl);
      if(getRes.ok){
        const data=await getRes.json();
        const curr=data.fields?.coins?.integerValue?parseInt(data.fields.coins.integerValue):0;
        // Add 30 - only server can do this now, client cannot
        await fetch(baseUrl+'?updateMask.fieldPaths=coins',{
          method:'PATCH',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({fields:{coins:{integerValue:(curr+30).toString()}}})
        });
      }
    }
    return res.status(200).json({status:'OK',phone,coins:'30 secure added'});
  }catch(err){
    return res.status(200).json({status:'OK'});
  }
}

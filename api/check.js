let store = global._store || (global._store = {});
export default function handler(req,res){
  const phone=(req.query.subid||"").replace(/\D/g,"").slice(-10);
  const coins=store[phone]||0;
  // Also read from localStorage fallback via client - But server store is real single detection
  return res.status(200).json({phone, coins, totalRs: Math.floor(coins/10), withdrawReady: coins>=500});
}

"use client";
import { useState, useEffect } from "react";

export default function Page(){
  const [phone,setPhone]=useState<string|null>(null);
  const [inputPh,setInputPh]=useState("");
  const [coins,setCoins]=useState(0);
  const [tab,setTab]=useState("shorts");
  const [upi,setUpi]=useState("");
  const [amt,setAmt]=useState("");
  const [currentAd,setCurrentAd]=useState(0);

  const ADS = Array.from({length: 50}, (_, i) => ({
    id: i+1,
    title: `Ad ${i+1}`,
    desc: i%3===0 ? "PLAY GAMES EARN CRYPTO" : i%3===1 ? "BUILD, FARM, AND EARN" : "WATCH & EARN"
  }));

  useEffect(()=>{
    const p=localStorage.getItem("ph");
    if(p){ 
      setPhone(p); 
      const saved = localStorage.getItem("coins_"+p);
      if(saved) setCoins(parseInt(saved)); 
    }
  },[]);

  const doLogin=()=>{
    const v=inputPh.replace(/\D/g,"").slice(-10);
    if(v.length<10){alert("10 digit number");return;}
    localStorage.setItem("ph",v);
    setPhone(v);
    const saved = localStorage.getItem("coins_"+v);
    setCoins(parseInt(saved||"0"));
  };

  const doLogout=()=>{
    if(confirm("Logout?")){
      localStorage.removeItem("ph");
      setPhone(null);
      setInputPh("");
    }
  };

  const watchAd=(idx:number)=>{
    // Direct coins - No external site - Stays inside - Count works
    const newCoins = coins + 30;
    setCoins(newCoins);
    if(phone) localStorage.setItem("coins_"+phone, newCoins.toString());
    // Auto next ad after 1 sec - Shorts scrolling
    setTimeout(()=>{
      const next = idx + 1;
      if(next < ADS.length){
        setCurrentAd(next);
        document.getElementById(`ad-${next}`)?.scrollIntoView({behavior:'smooth'});
      }
    }, 500);
  };

  const doWithdraw=()=>{
    if(!upi||!amt){alert("Enter UPI & Coins");return;}
    const a=parseInt(amt);
    if(a<500){alert("Min 500 Coins = 50 Rupees");return;}
    if(a>coins){alert("Not enough Coins - You have "+coins);return;}
    const rs=Math.floor(a/10);
    const total=coins;
    const remain=total-a;
    const msg=`*NEW WITHDRAWAL* 💰\n📱 Phone: ${phone}\n🆔 User ID: ${phone}\n💳 UPI: ${upi}\n🪙 WITHDRAW: ${a} Coins\n👛 WALLET TOTAL: ${total} Coins = ₹${Math.floor(total/10)}\n📉 REMAINING: ${remain} Coins\n🌐 Website: coins-app-seven.vercel.app\n⏰ Time: ${new Date().toLocaleString()}\n✅ Send ₹${rs} to ${upi}`;
    window.open(`https://wa.me/917680914460?text=${encodeURIComponent(msg)}`,"_blank");
  };

  useEffect(()=>{
    if(phone) localStorage.setItem("coins_"+phone, coins.toString());
  },[coins,phone]);

  if(!phone){
    return (
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",background:"#000",padding:20}}>
        <div style={{width:"100%",maxWidth:360,background:"#111",borderRadius:20,padding:28,textAlign:"center",border:"1px solid #222"}}>
          <h2 style={{color:"#fff",margin:0,fontSize:28}}>Cash Coins</h2>
          <p style={{color:"#666",fontSize:12,margin:"10px 0 20px"}}>Shorts • No Popups • Inside Ads Only</p>
          <input value={inputPh} onChange={e=>setInputPh(e.target.value)} placeholder="Mobile Number - 10 digits" style={{width:"100%",padding:16,borderRadius:14,border:"1px solid #333",background:"#000",color:"#fff",marginBottom:14,fontSize:15}} />
          <button onClick={doLogin} style={{width:"100%",padding:14,borderRadius:14,border:0,background:"#fff",color:"#000",fontWeight:800,fontSize:15}}>Login & Watch Shorts</button>
          <p style={{fontSize:10,color:"#444",marginTop:12}}>ID = Your Mobile Number - No external ads</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{background:"#000",color:"#fff",minHeight:"100vh",fontFamily:"system-ui",overflow:"hidden"}}>
      <div style={{display:"flex",justifyContent:"space-between",padding:"10px 12px",background:"#000",borderBottom:"1px solid #111",position:"fixed",top:0,left:0,right:0,zIndex:100,alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <b style={{fontSize:15}}>Cash Coins</b>
          <div style={{background:"#111",border:"1px solid #222",padding:"4px 10px",borderRadius:20,fontSize:11}}>ID: <span style={{color:"#fff",fontWeight:700}}>{phone}</span> | 🪙 {coins}</div>
        </div>
        <button onClick={doLogout} style={{padding:"5px 10px",background:"#111",color:"#666",fontSize:11,border:"1px solid #222",borderRadius:20}}>Logout</button>
      </div>

      <div style={{paddingTop:44,paddingBottom:62,height:"100vh"}}>
        {tab==="shorts" && (
          <div style={{height:"100%",overflowY:"scroll",scrollSnapType:"y mandatory",scrollbarWidth:"none"}}>
            {ADS.map((ad, idx)=>(
              <div key={ad.id} id={`ad-${idx}`} style={{height:"100%",scrollSnapAlign:"start",position:"relative",background: idx%3===0 ? "#0a1a0a" : idx%3===1 ? "#1a0a1a" : "#0a0a1a",display:"flex",flexDirection:"column",borderBottom:"1px solid #111"}}>
                <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
                  <div style={{textAlign:"center"}}>
                    <div style={{width:90,height:90,background:"#111",borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 16px",border:"1px solid #222"}}>📺</div>
                    <h2 style={{fontSize:24,fontWeight:900,lineHeight:1.1}}>{ad.desc}</h2>
                    <p style={{fontSize:12,color:"#555",marginTop:12}}>Ad {ad.id} • Inside Website • No External Redirect</p>
                    <p style={{fontSize:11,color:"#10b981",marginTop:8}}>🪙 30 Coins - Count Works - Scroll Next</p>
                  </div>
                </div>
                <div style={{padding:"14px",background:"#000",borderTop:"1px solid #111"}}>
                  <button onClick={()=>watchAd(idx)} style={{width:"100%",padding:"14px",background:"#fff",color:"#000",borderRadius:28,fontSize:15,fontWeight:800,border:0}}>
                    WATCH ADS - 30 COINS
                  </button>
                  <div style={{marginTop:8,textAlign:"center"}}><span style={{fontSize:10,color:"#444"}}>Ad {idx+1} of 50 • Scroll up for next • Coins added instantly</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab==="wallet" && (
          <div style={{padding:"20px",paddingTop:20}}>
            <div style={{background:"#111",border:"1px solid #222",borderRadius:20,padding:24,textAlign:"center",marginTop:20}}>
              <p style={{fontSize:11,color:"#555",letterSpacing:1}}>TOTAL COINS</p>
              <h1 style={{fontSize:52,margin:"12px 0"}}>{coins}</h1>
              <p style={{fontSize:13,color:"#666"}}>ID: {phone}</p>
              <div style={{marginTop:20,padding:12,background:"#000",borderRadius:12,border:"1px solid #111"}}><p style={{fontSize:12,color:"#888"}}>500 Coins = 50 Rupees</p></div>
              <p style={{fontSize:10,color:"#333",marginTop:12}}>No external ads - Inside counting only - Fix for Monetag ban</p>
            </div>
          </div>
        )}

        {tab==="withdraw" && (
          <div style={{padding:"20px",paddingTop:20}}>
            <div style={{background:"#111",padding:20,borderRadius:20,border:"1px solid #222",marginTop:20}}>
              <h3 style={{margin:"0 0 4px"}}>Withdraw - ID: {phone}</h3>
              <p style={{fontSize:11,color:"#555",marginBottom:16}}>{coins} Coins Available</p>
              <input value={upi} onChange={e=>setUpi(e.target.value)} placeholder="UPI ID" style={{width:"100%",padding:14,borderRadius:12,border:"1px solid #222",background:"#000",color:"#fff",marginBottom:12}} />
              <input value={amt} onChange={e=>setAmt(e.target.value)} placeholder="Coins - Min 500 = 50 Rupees" type="number" style={{width:"100%",padding:14,borderRadius:12,border:"1px solid #222",background:"#000",color:"#fff",marginBottom:14}} />
              <button onClick={doWithdraw} style={{width:"100%",padding:14,borderRadius:12,border:0,background:"#fff",color:"#000",fontWeight:800}}>Withdraw to WhatsApp</button>
            </div>
          </div>
        )}
      </div>

      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#000",borderTop:"1px solid #111",display:"flex",justifyContent:"space-around",padding:"8px 0 12px",zIndex:100}}>
        <button onClick={()=>{setTab("shorts");}} style={{background:"none",border:0,color:tab==="shorts"?"#fff":"#666",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
          <div style={{fontSize:20,background:tab==="shorts"?"#fff":"#111",color:tab==="shorts"?"#000":"#666",width:28,height:28,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800}}>▶️</div><span style={{fontSize:9,fontWeight:tab==="shorts"?"700":"400"}}>Shorts</span>
        </button>
        <button onClick={()=>setTab("wallet")} style={{background:"none",border:0,color:tab==="wallet"?"#fff":"#666",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
          <div style={{fontSize:20}}>🪙</div><span style={{fontSize:9}}>Wallet</span>
        </button>
        <button onClick={()=>setTab("withdraw")} style={{background:"none",border:0,color:tab==="withdraw"?"#fff":"#666",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
          <div style={{width:24,height:24,background:"#f59e0b",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#000",fontWeight:800}}>{phone.slice(-1)}</div><span style={{fontSize:9}}>You</span>
        </button>
      </div>
    </div>
  );
      }

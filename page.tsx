"use client";
import { useState, useEffect, useRef } from "react";

export default function Page(){
  const [phone,setPhone]=useState<string|null>(null);
  const [inputPh,setInputPh]=useState("");
  const [coins,setCoins]=useState(0);
  const [tab,setTab]=useState("ads");
  const [upi,setUpi]=useState("");
  const [amt,setAmt]=useState("");
  const [viewed,setViewed]=useState<{[k:number]:boolean}>({});
  const [inView,setInView]=useState<number|null>(null);
  const [progress,setProgress]=useState(0);
  const observerRef = useRef<IntersectionObserver|null>(null);
  const adRefs = useRef<{[k:number]: HTMLDivElement|null}>({});

  useEffect(()=>{
    const p=localStorage.getItem("ph");
    if(p){ setPhone(p); const s=localStorage.getItem("coins_"+p); if(s) setCoins(parseInt(s)); const v=localStorage.getItem("viewed_"+p); if(v) setViewed(JSON.parse(v)); }
  },[]);

  const doLogin=()=>{
    const v=inputPh.replace(/\D/g,"").slice(-10);
    if(v.length<10){alert("10 digit");return;}
    localStorage.setItem("ph",v); setPhone(v);
    const s=localStorage.getItem("coins_"+v); setCoins(parseInt(s||"0"));
  };
  const doLogout=()=>{ if(confirm("Logout?")){localStorage.removeItem("ph"); setPhone(null);} };

  // JAVASCRIPT - Scrolling ads - Intersection Observer - Frame viewport lo ki vaste auto reward
  useEffect(()=>{
    if(tab!=="ads") return;
    observerRef.current = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const id = parseInt(entry.target.getAttribute("data-adid")||"0");
          setInView(id);
        }
      });
    }, {threshold: 0.7}); // 70% visible ayithe ad view count

    Object.values(adRefs.current).forEach(el=>{ if(el) observerRef.current?.observe(el); });
    return ()=> observerRef.current?.disconnect();
  },[tab]);

  // Auto coins when ad in view for 5 sec - Scrolling laga - No click
  useEffect(()=>{
    if(inView===null || viewed[inView]) return;
    setProgress(0);
    let p=0;
    const int = setInterval(()=>{ p+=2; setProgress(p); if(p>=100) clearInterval(int); }, 100);
    const timer = setTimeout(()=>{
      if(!viewed[inView!]){
        const newCoins = coins + 30;
        const newViewed = {...viewed, [inView!]: true};
        setCoins(newCoins);
        setViewed(newViewed);
        if(phone){
          localStorage.setItem("coins_"+phone, newCoins.toString());
          localStorage.setItem("viewed_"+phone, JSON.stringify(newViewed));
        }
      }
      setInView(null);
      setProgress(0);
    }, 5000); // 5 sec watch = 30 coins - Scrolling auto
    return ()=>{ clearInterval(int); clearTimeout(timer); };
  },[inView]);

  const doWithdraw=()=>{
    if(!upi||!amt){alert("UPI & Coins");return;}
    const a=parseInt(amt); if(a<500){alert("Min 500 = 50 Rs");return;} if(a>coins){alert("Have "+coins);return;}
    const rs=Math.floor(a/10); const total=coins; const remain=total-a;
    const msg=`*NEW WITHDRAWAL* 💰\n📱 Phone: ${phone}\n🆔 User ID: ${phone}\n💳 UPI: ${upi}\n🪙 WITHDRAW: ${a} Coins\n👛 TOTAL: ${total}\n📉 REMAIN: ${remain}\n🌐 Website: coins-app-seven.vercel.app\n⏰ Time: ${new Date().toLocaleString()}\n✅ Send ₹${rs} to ${upi}`;
    window.open(`https://wa.me/917680914460?text=${encodeURIComponent(msg)}`,"_blank");
  };

  useEffect(()=>{ if(phone) localStorage.setItem("coins_"+phone, coins.toString()); },[coins,phone]);

  if(!phone){
    return (
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",background:"#000",padding:20}}>
        <div style={{width:"100%",maxWidth:360,background:"#111",borderRadius:20,padding:28,textAlign:"center",border:"1px solid #222"}}>
          <h2 style={{color:"#fff",margin:0}}>Cash Coins</h2>
          <p style={{color:"#666",fontSize:12,margin:"10px 0 20px"}}>Scrolling Ads • JS Observer • Real 6 Impressions Fix</p>
          <input value={inputPh} onChange={e=>setInputPh(e.target.value)} placeholder="Mobile - 10 digits" style={{width:"100%",padding:16,borderRadius:14,border:"1px solid #333",background:"#000",color:"#fff",marginBottom:14}} />
          <button onClick={doLogin} style={{width:"100%",padding:14,borderRadius:14,border:0,background:"#f59e0b",color:"#000",fontWeight:800}}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{background:"#000",color:"#fff",minHeight:"100vh",fontFamily:"system-ui"}}>
      <div style={{display:"flex",justifyContent:"space-between",padding:"10px 12px",background:"#0f1115",borderBottom:"1px solid #222",position:"fixed",top:0,left:0,right:0,zIndex:100}}>
        <b>Cash Coins</b><div style={{background:"#1a1d24",padding:"4px 10px",borderRadius:20,fontSize:11}}>ID: {phone} | 🪙 {coins}</div><button onClick={doLogout} style={{background:"#222",color:"#888",border:0,padding:"4px 10px",borderRadius:10,fontSize:11}}>Logout</button>
      </div>

      <div style={{paddingTop:50,paddingBottom:80}}>
        {tab==="ads" && (
          <div style={{height:"calc(100vh - 130px)",overflowY:"scroll",scrollSnapType:"y mandatory"}}>
            <div style={{background:"#1a1d24",border:"1px solid #f59e0b",margin:12,borderRadius:12,padding:12}}>
              <p style={{fontSize:11,color:"#f59e0b",fontWeight:700}}>JS Fix: Scrolling Ads - 6 Impressions = Warning Not Full Ban - Profit $0 due to self clicks</p>
              <p style={{fontSize:10,color:"#888",marginTop:4}}>12126793 In-Page Push + 12128279 Vignette = Scrolling - 12128255 OnClick Delete - JS Observer 70% view 5 sec = 30 Coins auto - No click - Shorts like</p>
            </div>
            {Array.from({length:30},(_,i)=>(
              <div key={i} data-adid={i} ref={el=>{adRefs.current[i]=el}} style={{height:"78vh",scrollSnapAlign:"start",margin:12,background: i%2===0 ? "#111" : "#0f1115",border:`2px solid ${inView===i ? "#f59e0b" : viewed[i] ? "#10b981" : "#222"}`,borderRadius:20,padding:16,display:"flex",flexDirection:"column",position:"relative"}}>
                <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,background:"#000",padding:"4px 10px",borderRadius:20}}>Ad {i+1} • Zone {i%2===0 ? "12126793 Push" : "12128279 Vignette"}</span><span style={{fontSize:11,color: viewed[i] ? "#10b981" : "#f59e0b"}}>{viewed[i] ? "✅ 30 Coins Done" : inView===i ? `Watching ${progress}%` : "Scroll to view"}</span></div>
                <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",marginTop:12,background:"#000",borderRadius:16,border:"1px solid #222"}}>
                  <div style={{fontSize:40}}>📺</div><h2 style={{marginTop:12,fontSize:20,textAlign:"center"}}>{i%3===0 ? "PLAY GAMES EARN" : i%3===1 ? "BUILD FARM EARN" : "WATCH EARN CASH"}</h2>
                  <p style={{fontSize:11,color:"#555",marginTop:8}}>Scrolling Frame - 70% visible = View - 5 sec = 30 Coins</p>
                  <div style={{marginTop:16,width:"85%",height:80,background:"#0a0a0a",border:"1px dashed #333",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#666"}}>Monetag Ad {i+1} - Real Ad Loads Here - {i%2===0 ? "Push" : "Vignette Scrolling"}</div>
                  {inView===i && <div style={{marginTop:12,width:"85%",height:6,background:"#222",borderRadius:3}}><div style={{width:`${progress}%`,height:"100%",background:"#f59e0b",borderRadius:3,transition:"width 0.1s"}} /></div>}
                </div>
                <div style={{marginTop:12,textAlign:"center",fontSize:10,color:"#444"}}>{viewed[i] ? "✅ Watched - Scroll next" : inView===i ? `Viewing... ${progress}% - 30 Coins in ${Math.ceil((100-progress)/20)}s` : "Scroll - 70% visible ayithe auto start - No click"}</div>
              </div>
            ))}
          </div>
        )}
        {tab==="wallet" && <div style={{padding:20}}><div style={{background:"#111",padding:24,borderRadius:20,textAlign:"center",border:"1px solid #222"}}><h1 style={{fontSize:48}}>{coins}</h1><p>ID: {phone}</p><p style={{fontSize:12,color:"#888",marginTop:12}}>500 = 50 Rs</p></div></div>}
        {tab==="withdraw" && <div style={{padding:20}}><div style={{background:"#111",padding:20,borderRadius:20,border:"1px solid #222"}}><h3>Withdraw {coins} Coins</h3><input value={upi} onChange={e=>setUpi(e.target.value)} placeholder="UPI ID" style={{width:"100%",padding:14,margin:"12px 0",borderRadius:12,background:"#000",color:"#fff",border:"1px solid #222"}} /><input value={amt} onChange={e=>setAmt(e.target.value)} placeholder="Coins Min 500" type="number" style={{width:"100%",padding:14,borderRadius:12,background:"#000",color:"#fff",border:"1px solid #222",marginBottom:12}} /><button onClick={doWithdraw} style={{width:"100%",padding:14,borderRadius:12,border:0,background:"#fff",color:"#000",fontWeight:800}}>Withdraw</button></div></div>}
      </div>

      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#000",borderTop:"1px solid #222",display:"flex",justifyContent:"space-around",padding:"8px 0 12px"}}>
        <button onClick={()=>setTab("ads")} style={{background:"none",border:0,color:tab==="ads"?"#f59e0b":"#666"}}>📺<br/><span style={{fontSize:9}}>Scrolling Ads</span></button>
        <button onClick={()=>setTab("wallet")} style={{background:"none",border:0,color:tab==="wallet"?"#fff":"#666"}}>🪙<br/><span style={{fontSize:9}}>Wallet {coins}</span></button>
        <button onClick={()=>setTab("withdraw")} style={{background:"none",border:0,color:tab==="withdraw"?"#fff":"#666"}}>💳<br/><span style={{fontSize:9}}>You</span></button>
      </div>
    </div>
  );
                                                 }

 "use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [phone, setPhone] = useState<string | null>(null);
  const [inputPhone, setInputPhone] = useState("");
  const [coins, setCoins] = useState(0);
  const [upiId, setUpiId] = useState("");
  const [showWithdrawBox, setShowWithdrawBox] = useState(false);

  // REAL LINK - Photo1 Direct Link from CPALead - fastrsrvr.com/unlock/G6w4ki
  // Note: To pass a subID to your locker, add ?subid=subIDhere
  // So real single detection: ?subid=PHONE_NUMBER
  const REAL_LOCKER_BASE = "https://www.fastrsrvr.com/unlock/G6w4ki";

  // LINKS ONLY - NO APPS - Click download direct auto coins - 500 = 50 rupees
  // User number login links kanapadali - html kuda
  const OFFERS = [
    {
      id: "G6w4ki",
      name: "Locker Offer G6w4ki",
      description: "Complete 1 Offer - Direct Download",
      coins: 50,
      url: REAL_LOCKER_BASE,
      color: "#f59e0b",
    },
  ];

  useEffect(() => {
    const savedPhone = localStorage.getItem("phone");
    if (savedPhone) {
      setPhone(savedPhone);
      const savedCoins = parseInt(localStorage.getItem("coins_" + savedPhone) || "0");
      setCoins(savedCoins);

      // REAL AUTO COINS POLLING - Single ravali kadha pakka download chesadu ani - CPALead postback nundi
      // Every 5 sec check /api/check?subid=PHONE - If CPALead fired postback, coins update auto
      const interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/check?subid=${savedPhone}`);
          const data = await response.json();
          if (data.coins && data.coins > parseInt(localStorage.getItem("coins_" + savedPhone) || "0")) {
            setCoins(data.coins);
            localStorage.setItem("coins_" + savedPhone, data.coins.toString());
          }
        } catch (error) {
          // Silent
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, []);

  const handleLogin = () => {
    const cleaned = inputPhone.replace(/\D/g, "").slice(-10);
    if (cleaned.length !== 10) {
      alert("Enter 10 digit number");
      return;
    }
    localStorage.setItem("phone", cleaned);
    setPhone(cleaned);
    const savedCoins = parseInt(localStorage.getItem("coins_" + cleaned) || "0");
    setCoins(savedCoins);
  };

  const handleLogout = () => {
    localStorage.removeItem("phone");
    setPhone(null);
    setInputPhone("");
  };

  const handleOpenLink = (offer: any) => {
    if (!phone) return;
    // REAL SINGLE TRACKING - Photo1 Note - ?subid=subIDhere - So phone as subID
    // https://www.fastrsrvr.com/unlock/G6w4ki?subid=7680914460
    // CPALead will fire postback with subid=7680914460 when user completes download
    const realUrlWithSubId = `${offer.url}?subid=${phone}`;
    window.open(realUrlWithSubId, "_blank");
  };

  const handleWithdrawClick = () => {
    if (coins < 500) {
      alert(`Minimum 500 Coins = 50 Rupees - You have ${coins} - Need ${500 - coins} more - 1 offer = 50 coins`);
      return;
    }
    setShowWithdrawBox(true);
  };

  const handleSendWhatsApp = () => {
    if (!upiId.includes("@")) {
      alert("Enter valid UPI ID with @");
      return;
    }
    const totalCoins = coins;
    const withdrawalCoins = 500;
    const remainingCoins = coins - 500;
    const totalRupees = Math.floor(totalCoins / 10);
    const withdrawalRupees = 50;

    // WhatsApp ki anni details ravali - UPI ID total coins withdrawal coins number - Nuvvu cheppinashi ekkada kuda text ga writing cheyyaku - Direct details only
    const message = `*WITHDRAWAL*
📱:${phone}
🆔:${phone}
🪙 Total:${totalCoins}
💰 Withdraw:${withdrawalCoins}
📤 Remaining:${remainingCoins}
💵 Total Rs:${totalRupees}
💸 Withdraw Rs:${withdrawalRupees}
🏦 UPI:${upiId}
🌐 coins-app-seven.vercel.app
⏰ ${new Date().toLocaleString()}`;

    window.open(`https://wa.me/917680914460?text=${encodeURIComponent(message)}`, "_blank");

    const newCoins = remainingCoins;
    setCoins(newCoins);
    if (phone) {
      localStorage.setItem("coins_" + phone, newCoins.toString());
    }

    // Firebase + Postback log - GitHub lo and Firebase lo kuda pettali
    fetch(`/api/postback?subid=${phone}&action=withdraw&upi=${encodeURIComponent(upiId)}&total=${totalCoins}`).catch(() => {});

    setShowWithdrawBox(false);
    setUpiId("");
  };

  if (!phone) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", display: "flex", justifyContent: "center", alignItems: "center", padding: 16 }}>
        <div style={{ width: 360, background: "#111", borderRadius: 18, padding: 20, border: "1px solid #222" }}>
          <h2 style={{ color: "#fff", margin: "0 0 6px", fontSize: 18 }}>Coins App Login</h2>
          <p style={{ color: "#f59e0b", fontSize: 11, margin: "0 0 16px" }}>500 Coins = 50 Rupees - Number Login - Links Only</p>
          <input
            value={inputPhone}
            onChange={(e) => setInputPhone(e.target.value)}
            placeholder="10 Digit Mobile Number"
            style={{ width: "100%", padding: 14, borderRadius: 12, background: "#000", color: "#fff", border: "1px solid #333", boxSizing: "border-box" }}
          />
          <button onClick={handleLogin} style={{ width: "100%", marginTop: 12, padding: 14, borderRadius: 12, background: "#f59e0b", color: "#000", fontWeight: 800, border: 0 }}>
            Login
          </button>
          <p style={{ fontSize: 10, color: "#555", marginTop: 10 }}>Real Link: fastrsrvr.com/unlock/G6w4ki - GitHub + Firebase</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", fontFamily: "system-ui" }}>
      {/* Top Bar - User ID visible - Number login */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 12px", background: "#0f1115", position: "fixed", top: 0, left: 0, right: 0, zIndex: 10, borderBottom: "1px solid #222" }}>
        <span style={{ fontSize: 12 }}>🆔 {phone}</span>
        <span style={{ fontSize: 12, background: "#1a1d24", padding: "4px 10px", borderRadius: 12 }}>🪙 {coins} = ₹{Math.floor(coins / 10)}</span>
        <button onClick={handleLogout} style={{ background: "#222", color: "#888", border: 0, borderRadius: 8, padding: "4px 8px", fontSize: 10 }}>Exit</button>
      </div>

      <div style={{ paddingTop: 60, paddingBottom: 80, padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
        {/* LINKS ONLY - NO APPS - Click download direct auto coins - HTML kuda same */}
        {OFFERS.map((offer) => (
          <div key={offer.id} style={{ background: "#151821", borderRadius: 14, padding: 14, border: "1px solid #333", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{offer.name}</div>
              <div style={{ fontSize: 11, color: "#f59e0b"}}>{offer.coins} Coins = ₹{offer.coins/10} | 500=₹50</div>
              <div style={{ fontSize: 10, color: "#666", marginTop: 4 }}>Real: {offer.url}?subid={phone} - Single detection</div>
            </div>
            <button onClick={() => handleOpenLink(offer)} style={{ background: offer.color, color: "#000", border: 0, borderRadius: 10, padding: "10px 14px", fontWeight: 800, fontSize: 12 }}>
              Open
            </button>
          </div>
        ))}

        <button onClick={handleWithdrawClick} style={{ padding: 14, borderRadius: 12, border: 0, background: coins >= 500 ? "#10b981" : "#222", color: coins >= 500 ? "#000" : "#555", fontWeight: 800 }}>
          Withdraw - 500 Coins = 50 Rupees - {coins}/500
        </button>

        {showWithdrawBox && (
          <div style={{ background: "#111", borderRadius: 12, padding: 14, border: "1px solid #333" }}>
            <input value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="Enter UPI ID (e.g., 7680914460@ybl)" style={{ width: "100%", padding: 12, borderRadius: 10, background: "#000", color: "#fff", border: "1px solid #333", boxSizing: "border-box" }} />
            <button onClick={handleSendWhatsApp} style={{ width: "100%", marginTop: 10, padding: 12, borderRadius: 10, background: "#10b981", color: "#000", fontWeight: 800, border: 0 }}>
              Send WhatsApp - UPI:{upiId} - Total:{coins} - Withdraw:500 - Number:{phone}
            </button>
          </div>
        )}

        <div style={{ background: "#0a0a0a", border: "1px dashed #333", borderRadius: 10, padding: 10, marginTop: 8 }}>
          <p style={{ fontSize: 10, color: "#666", margin: 0 }}>Real Flow: Number Login -> Open Link with ?subid=PHONE -> CPALead Locker -> Download App -> Complete -> CPALead fires postback /api/postback?subid=PHONE -> Auto +50 Coins -> 500=50 Withdraw -> WhatsApp with UPI, total, withdraw, number - Single detection pakka download</p>
        </div>
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#000", borderTop: "1px solid #222", display: "flex", justifyContent: "space-around", padding: "8px 0" }}>
        <span style={{ fontSize: 10, color: "#f59e0b" }}>Links Only</span>
        <span style={{ fontSize: 10, color: "#888" }}>🪙 {coins}</span>
        <span style={{ fontSize: 10, color: "#888" }}>500=50</span>
      </div>
    </div>
  );
        }

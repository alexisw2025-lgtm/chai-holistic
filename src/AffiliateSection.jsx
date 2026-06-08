import { useState, useEffect } from "react";

const TAG = "xiomaka-20";
const amz = (asin) => `https://www.amazon.com/dp/${asin}?tag=${TAG}`;

// ─── SPINNING AMAZON BUTTON ──────────────────────────────────────────────────
function AmazonSpinBtn({ onClick, size = 110 }) {
  const text   = "AMAZON · SHOP NOW · AMAZON · SHOP NOW · ";
  const chars  = text.split("");
  const radius = size * 0.43;
  const total  = chars.length;
  const center = size * 0.615;
  return (
    <div onClick={onClick} title="View on Amazon"
      style={{ position:"relative", width:size, height:size, cursor:"pointer", flexShrink:0 }}>
      <div style={{ position:"absolute", inset:0, borderRadius:"50%", animation:"affSpinCCW 18s linear infinite" }}>
        {chars.map((ch, i) => (
          <span key={i} style={{
            position:"absolute", top:0, left:"50%",
            fontSize: size * 0.072 + "px",
            fontFamily:"Jost,sans-serif", fontWeight:600,
            color:"rgba(196,137,58,.85)", letterSpacing:".04em",
            transformOrigin:`0 ${radius}px`,
            width: size * 0.085 + "px", textAlign:"center",
            marginLeft: -(size * 0.0425) + "px",
            transform:`rotate(${i * (360 / total)}deg)`,
          }}>{ch}</span>
        ))}
      </div>
      <div style={{
        position:"absolute", top:"50%", left:"50%",
        transform:"translate(-50%,-50%)",
        width: center, height: center,
        background:"linear-gradient(135deg,#C8893A,#A06828)",
        borderRadius:"50%",
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        boxShadow:"0 6px 24px rgba(196,137,58,.5)",
        transition:"all .3s",
      }}
      onMouseEnter={e=>{ e.currentTarget.style.transform="translate(-50%,-50%) scale(1.1)"; e.currentTarget.style.boxShadow="0 10px 32px rgba(196,137,58,.7)"; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform="translate(-50%,-50%)"; e.currentTarget.style.boxShadow="0 6px 24px rgba(196,137,58,.5)"; }}>
        <span style={{ fontSize: size * 0.11 + "px", color:"white", lineHeight:1, transform:"rotate(-30deg)", display:"inline-block" }}>↗</span>
        <span style={{ fontSize: size * 0.038 + "px", letterSpacing:".12em", textTransform:"uppercase", color:"rgba(255,255,255,.9)", fontFamily:"Jost,sans-serif", marginTop:3 }}>Shop</span>
      </div>
      <style>{`@keyframes affSpinCCW{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}`}</style>
    </div>
  );
}

// ─── STOCK NOTIFY MODAL ──────────────────────────────────────────────────────
function StockNotifyModal({ product, onClose }) {
  const [email, setEmail]     = useState("");
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);

  const submit = async () => {
    if (!email.includes("@")) return;
    setSending(true);
    try {
      await fetch("https://web-production-4c84.up.railway.app/notify-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, supplement: product.name, brand: product.brand }),
      });
    } catch (_) {}
    setSent(true);
    setSending(false);
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.82)", zIndex:980, display:"flex", alignItems:"center", justifyContent:"center", padding:20, backdropFilter:"blur(8px)" }}
      onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div style={{ background:"#0F140F", border:"1px solid rgba(196,137,58,.3)", borderRadius:20, maxWidth:400, width:"100%", padding:"28px 24px" }}>
        {sent ? (
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:"2rem", marginBottom:12 }}>🫖</div>
            <h3 style={{ fontFamily:"Playfair Display,serif", fontSize:"1.15rem", color:"#F7F2EA", margin:"0 0 10px" }}>We'll let you know</h3>
            <p style={{ fontSize:".8rem", color:"rgba(247,242,234,.55)", lineHeight:1.7, margin:"0 0 20px" }}>
              As soon as <strong style={{ color:"rgba(196,137,58,.85)" }}>{product.name}</strong> is back in stock on Amazon, we'll send you a note.
            </p>
            <button onClick={onClose} style={{ background:"rgba(196,137,58,.15)", border:"1px solid rgba(196,137,58,.3)", color:"rgba(196,137,58,.9)", borderRadius:10, padding:"10px 24px", fontFamily:"Jost,sans-serif", fontSize:".7rem", letterSpacing:".1em", textTransform:"uppercase", cursor:"pointer" }}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div style={{ fontSize:".56rem", letterSpacing:".22em", textTransform:"uppercase", color:"rgba(196,137,58,.7)", marginBottom:10, fontFamily:"Jost,sans-serif", fontWeight:600 }}>
              ✦ Notify Me When Back In Stock
            </div>
            <h3 style={{ fontFamily:"Playfair Display,serif", fontSize:"1.05rem", color:"#F7F2EA", margin:"0 0 8px", lineHeight:1.3 }}>{product.name}</h3>
            <p style={{ fontSize:".78rem", color:"rgba(247,242,234,.5)", lineHeight:1.65, margin:"0 0 16px", fontWeight:300 }}>
              This item may be temporarily unavailable. Leave your email and we'll reach out the moment it's back — one notification, no spam.
            </p>
            <input type="email" placeholder="your@email.com" value={email}
              onChange={e=>setEmail(e.target.value)}
              onKeyDown={e=>{ if(e.key==="Enter") submit(); }}
              autoFocus
              style={{ width:"100%", background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.15)", borderRadius:10, padding:"11px 14px", fontFamily:"Jost,sans-serif", fontSize:".85rem", color:"#F7F2EA", outline:"none", marginBottom:12 }}/>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={submit} disabled={sending || !email.includes("@")} style={{ flex:1, background:"linear-gradient(135deg,#C8893A,#A06828)", border:"none", color:"white", borderRadius:10, padding:"11px", fontFamily:"Jost,sans-serif", fontSize:".7rem", letterSpacing:".1em", textTransform:"uppercase", cursor:"pointer", fontWeight:600, opacity:(!email.includes("@")||sending)?0.5:1 }}>
                {sending ? "Saving…" : "Notify Me ✦"}
              </button>
              <button onClick={onClose} style={{ background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.12)", color:"rgba(247,242,234,.5)", borderRadius:10, padding:"11px 16px", fontFamily:"Jost,sans-serif", fontSize:".7rem", cursor:"pointer" }}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── PRODUCT CARD ────────────────────────────────────────────────────────────
function ProductCard({ product, category, onDetail, onBuy }) {
  const accent = category?.accentColor || "#C8893A";
  return (
    <div style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", borderRadius:18, overflow:"hidden", transition:"transform .2s, box-shadow .2s", cursor:"pointer" }}
      onClick={onDetail}
      onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 14px 40px rgba(0,0,0,.4)"; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>

      <div style={{ height:5, background:`linear-gradient(90deg,${accent},${accent}66)` }}/>

      <div style={{ padding:"18px 20px 16px" }}>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:14 }}>
          <div style={{ fontSize:"1.5rem", flexShrink:0, width:46, height:46, borderRadius:13, background:`${accent}22`, border:`1px solid ${accent}44`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            {product.emoji || "✦"}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:"Playfair Display,serif", fontSize:"1rem", fontWeight:600, color:"#F7F2EA", marginBottom:2, lineHeight:1.2 }}>{product.name}</div>
            <div style={{ fontSize:".68rem", color:accent, fontWeight:500, marginBottom:2 }}>{product.brand}</div>
            <div style={{ fontSize:".7rem", color:"rgba(247,242,234,.45)", fontStyle:"italic", lineHeight:1.3 }}>{product.subtitle}</div>
          </div>
        </div>

        {/* Why excerpt */}
        <p style={{ fontSize:".76rem", color:"rgba(247,242,234,.65)", lineHeight:1.7, marginBottom:14, fontWeight:300 }}>
          {(product.whyThisNutrient||"").slice(0,150)}…
        </p>

        {/* Tea pairings */}
        {product.teaPairing?.length > 0 && (
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:".54rem", letterSpacing:".18em", textTransform:"uppercase", color:"rgba(74,114,80,.8)", marginBottom:7, fontWeight:600 }}>🫖 Pairs with</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
              {product.teaPairing.slice(0,3).map(t=>(
                <span key={t} style={{ background:"rgba(74,114,80,.1)", border:"1px solid rgba(74,114,80,.2)", borderRadius:20, padding:"3px 10px", fontSize:".62rem", color:"rgba(74,114,80,.9)" }}>{t}</span>
              ))}
              {product.teaPairing.length > 3 && <span style={{ fontSize:".62rem", color:"rgba(196,137,58,.5)", padding:"3px 5px" }}>+{product.teaPairing.length - 3} more</span>}
            </div>
          </div>
        )}

        {/* Form + testing */}
        <div style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", borderRadius:10, padding:"10px 12px", marginBottom:14, display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          <div>
            <div style={{ fontSize:".52rem", letterSpacing:".14em", textTransform:"uppercase", color:accent, marginBottom:3 }}>Form</div>
            <div style={{ fontSize:".66rem", color:"rgba(247,242,234,.75)", lineHeight:1.4 }}>{(product.form||"").split("(")[0].trim()}</div>
          </div>
          <div>
            <div style={{ fontSize:".52rem", letterSpacing:".14em", textTransform:"uppercase", color:accent, marginBottom:3 }}>Tested</div>
            <div style={{ fontSize:".66rem", color:"rgba(74,114,80,.9)", lineHeight:1.4 }}>{product.thirdParty}</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8, flexWrap:"wrap" }}>
          <div style={{ fontFamily:"Playfair Display,serif", fontSize:"1rem", color:accent, fontWeight:600 }}>{product.price}</div>
          <div style={{ display:"flex", gap:7, alignItems:"center" }}>
            <button onClick={e=>{ e.stopPropagation(); onDetail(); }}
              style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.15)", color:"rgba(247,242,234,.8)", borderRadius:40, padding:"7px 14px", fontSize:".62rem", letterSpacing:".1em", textTransform:"uppercase", cursor:"pointer", transition:"all .2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,.12)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,.06)"; }}>
              Why This →
            </button>
            <div onClick={e=>e.stopPropagation()}>
              <AmazonSpinBtn onClick={onBuy} size={100}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCT DETAIL MODAL ────────────────────────────────────────────────────
function ProductDetailModal({ product, category, onClose, onBuy, onNav }) {
  const accent = category?.accentColor || "#C8893A";

  useEffect(() => {
    const handler = e => { if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  const Section = ({ label, children }) => (
    <div style={{ marginBottom:18 }}>
      <div style={{ fontSize:".54rem", letterSpacing:".2em", textTransform:"uppercase", color:accent, marginBottom:8, fontWeight:600 }}>{label}</div>
      {children}
    </div>
  );

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.88)", zIndex:950, display:"flex", alignItems:"center", justifyContent:"center", padding:16, backdropFilter:"blur(12px)" }}
      onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div style={{ background:"#0F140F", border:`1px solid ${accent}33`, borderRadius:22, maxWidth:560, width:"100%", maxHeight:"92vh", overflowY:"auto" }}>
        <div style={{ height:6, background:`linear-gradient(90deg,${accent},${accent}55)`, borderRadius:"22px 22px 0 0" }}/>
        <div style={{ padding:"22px 24px 28px" }}>

          {/* Header */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:".56rem", letterSpacing:".22em", textTransform:"uppercase", color:accent, marginBottom:6, fontWeight:600 }}>
                {product.emoji} {category?.label || "Supplement"} · {product.brand}
              </div>
              <h3 style={{ fontFamily:"Playfair Display,serif", fontSize:"1.4rem", fontWeight:700, color:"#F7F2EA", margin:"0 0 4px" }}>{product.name}</h3>
              <div style={{ fontSize:".76rem", fontStyle:"italic", color:accent }}>{product.subtitle}</div>
            </div>
            <button onClick={onClose} style={{ background:"rgba(255,255,255,.08)", border:"none", color:"rgba(247,242,234,.6)", borderRadius:"50%", width:34, height:34, fontSize:"1rem", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginLeft:12 }}>✕</button>
          </div>

          <Section label="Why You Need This">
            <p style={{ fontSize:".8rem", color:"rgba(247,242,234,.75)", lineHeight:1.8, margin:0, fontWeight:300 }}>{product.whyThisNutrient}</p>
          </Section>

          <Section label="Why This Brand Specifically">
            <p style={{ fontSize:".8rem", color:"rgba(247,242,234,.75)", lineHeight:1.8, margin:0, fontWeight:300 }}>{product.whyThisBrand}</p>
          </Section>

          <Section label="Why the Cheap Version Doesn't Work">
            <p style={{ fontSize:".8rem", color:"rgba(247,242,234,.75)", lineHeight:1.8, margin:0, fontWeight:300 }}>{product.whyNotCheap}</p>
          </Section>

          {/* Tea pairing */}
          {product.teaPairing?.length > 0 && (
            <Section label="🫖 Tea Pairing">
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:10 }}>
                {product.teaPairing.map(t=>(
                  <span key={t} style={{ background:"rgba(74,114,80,.12)", border:"1px solid rgba(74,114,80,.25)", borderRadius:20, padding:"4px 12px", fontSize:".68rem", color:"rgba(74,114,80,.9)" }}>{t}</span>
                ))}
              </div>
              <p style={{ fontSize:".76rem", color:"rgba(247,242,234,.5)", lineHeight:1.75, margin:0, fontStyle:"italic", fontWeight:300 }}>{product.teaNote}</p>
            </Section>
          )}

          {/* Specs grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16 }}>
            {[["Form",product.form],["Dose",product.dose],["Third-Party",product.thirdParty],["Price",product.price]].map(([l,v])=>(
              <div key={l} style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)", borderRadius:10, padding:"10px 12px", gridColumn: l==="Form" ? "span 2" : "auto" }}>
                <div style={{ fontSize:".52rem", letterSpacing:".16em", textTransform:"uppercase", color:accent, marginBottom:4 }}>{l}</div>
                <div style={{ fontSize:".74rem", color:"rgba(247,242,234,.8)", lineHeight:1.4 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Safety */}
          {product.caution && (
            <div style={{ background:"rgba(255,180,0,.06)", border:"1px solid rgba(255,180,0,.18)", borderRadius:10, padding:"12px 14px", marginBottom:16 }}>
              <div style={{ fontSize:".54rem", letterSpacing:".16em", textTransform:"uppercase", color:"rgba(255,180,0,.7)", marginBottom:5, fontWeight:600 }}>⚠ Safety Note</div>
              <p style={{ fontSize:".74rem", color:"rgba(255,240,180,.7)", lineHeight:1.65, margin:0, fontWeight:300 }}>{product.caution}</p>
            </div>
          )}

          {/* Personal note */}
          {product.personalNote && (
            <div style={{ background:"rgba(196,137,58,.07)", border:"1px solid rgba(196,137,58,.2)", borderRadius:12, padding:"14px 16px", marginBottom:20 }}>
              <div style={{ fontSize:".54rem", letterSpacing:".18em", textTransform:"uppercase", color:accent, marginBottom:8, fontWeight:600 }}>✦ Alex's Note</div>
              <p style={{ fontSize:".8rem", color:"rgba(247,242,234,.7)", lineHeight:1.75, margin:0, fontStyle:"italic", fontWeight:300 }}>"{product.personalNote}"</p>
            </div>
          )}

          {/* CTA */}
          <div style={{ display:"flex", justifyContent:"center", margin:"8px 0 14px" }}>
            <AmazonSpinBtn onClick={onBuy} size={120}/>
          </div>
          <p style={{ fontSize:".6rem", color:"rgba(247,242,234,.2)", textAlign:"center", margin:0, lineHeight:1.6 }}>
            Affiliate link — we earn a small commission at no cost to you.<br/>
            These statements have not been evaluated by the FDA.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function AffiliateSection({ onNav }) {
  const [affiliateData, setAffiliateData] = useState(null);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [activeCat, setActiveCat]         = useState("all");
  const [selected, setSelected]           = useState(null);
  const [notifyProduct, setNotifyProduct] = useState(null);

  // Load data from public/affiliate-data.json
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/affiliate-data.json?t=" + Date.now());
        if (!res.ok) throw new Error("Could not load affiliate data");
        const d = await res.json();
        setAffiliateData(d);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleBuy = async (product) => {
    if (product.directUrl) { window.open(product.directUrl, "_blank"); return; }
    const url = amz(product.asin);
    const newTab = window.open(url, "_blank");
    // If popup blocked, show notify modal immediately
    if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
      setNotifyProduct(product); return;
    }
    // After 4 seconds, offer notification if they come back
    setTimeout(() => {
      // Only show if the user is still on this tab
      if (!document.hidden) return; // they're still on Amazon tab, don't interrupt
    }, 4000);
  };

  if (loading) return (
    <div style={{ minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(180deg,#0A1A0A,#0D140A)" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:"2rem", marginBottom:12, animation:"spin 2s linear infinite", display:"inline-block" }}>◌</div>
        <div style={{ fontSize:".78rem", color:"rgba(247,242,234,.4)", fontFamily:"Jost,sans-serif" }}>Loading supplements…</div>
      </div>
    </div>
  );

  if (error) return (
    <div style={{ minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(180deg,#0A1A0A,#0D140A)" }}>
      <div style={{ textAlign:"center", padding:24 }}>
        <div style={{ fontSize:"1.5rem", marginBottom:10 }}>⚠</div>
        <div style={{ fontFamily:"Playfair Display,serif", fontSize:"1.1rem", color:"#F7F2EA", marginBottom:8 }}>Could not load supplement data</div>
        <div style={{ fontSize:".76rem", color:"rgba(247,242,234,.4)", maxWidth:400, lineHeight:1.7 }}>
          Make sure <code style={{ color:"rgba(196,137,58,.7)" }}>affiliate-data.json</code> is in your <code style={{ color:"rgba(196,137,58,.7)" }}>public/</code> folder. {error}
        </div>
      </div>
    </div>
  );

  const cats    = (affiliateData?.categories || []).filter(c => c.active).sort((a,b)=>(a.order||99)-(b.order||99));
  const allProds = (affiliateData?.products || []).filter(p => p.active);
  const activeCatObj = cats.find(c => c.id === activeCat);

  const visible = activeCat === "all"
    ? allProds
    : allProds.filter(p => p.categoryId === activeCat);

  const sorted = [...visible].sort((a,b) => (a.order||99)-(b.order||99));

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(180deg,#0A1A0A 0%,#0D140A 40%,#1A1A0D 100%)", paddingBottom:80, fontFamily:"Jost,sans-serif" }}>

      {/* HERO */}
      <div id="sec-aff-top" style={{ textAlign:"center", padding:"64px 24px 48px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at center top, rgba(74,114,80,.18) 0%, transparent 65%)", pointerEvents:"none" }}/>
        <div style={{ fontSize:".6rem", letterSpacing:".28em", textTransform:"uppercase", color:"rgba(196,137,58,.7)", marginBottom:12 }}>✦ Chai Holistic · Supplements</div>
        <h1 style={{ fontFamily:"Playfair Display,serif", fontSize:"clamp(2rem,6vw,3rem)", fontWeight:700, color:"#F7F2EA", margin:"0 0 10px", lineHeight:1.15 }}>Vitamins &amp; Minerals</h1>
        <h2 style={{ fontFamily:"Playfair Display,serif", fontSize:"clamp(1rem,3vw,1.4rem)", fontWeight:400, fontStyle:"italic", color:"rgba(196,137,58,.85)", margin:"0 0 22px" }}>The ones worth spending money on</h2>

        {/* Alex's note */}
        <div style={{ maxWidth:620, margin:"0 auto 28px", background:"rgba(255,255,255,.03)", border:"1px solid rgba(74,114,80,.2)", borderRadius:18, padding:"20px 24px", textAlign:"left" }}>
          <div style={{ fontSize:".56rem", letterSpacing:".2em", textTransform:"uppercase", color:"rgba(196,137,58,.65)", marginBottom:10, fontWeight:600 }}>✦ A note from Alex</div>
          <p style={{ fontSize:".86rem", color:"rgba(247,242,234,.65)", lineHeight:1.85, margin:"0 0 10px", fontWeight:300 }}>
            I use teas, vitamins, and minerals every single day to stay healthy. People spend thousands on cars, vacations, and things that wear out — but resist spending $30 on a supplement that supports every organ in their body. That never made sense to me.
          </p>
          <p style={{ fontSize:".86rem", color:"rgba(247,242,234,.65)", lineHeight:1.85, margin:0, fontWeight:300 }}>
            Every supplement on this page is something I actually take or have researched deeply. There are cheaper versions of all of these. I don't recommend them. Your body deserves what actually works.
          </p>
          <div style={{ marginTop:12, fontSize:".7rem", color:"rgba(74,114,80,.7)", fontStyle:"italic" }}>
            Affiliate links — if you purchase through them, we earn a small commission at no cost to you. We only recommend what we believe in.
          </div>
        </div>

        {/* Quality badges */}
        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
          {[["🔬 Form matters","Bioavailability first"],["🧪 Third-party tested","Not just label claims"],["🚫 No fillers","Clean ingredients only"],["🫖 Tea-paired","Matched to a blend"]].map(([t,s])=>(
            <div key={t} style={{ background:"rgba(74,114,80,.1)", border:"1px solid rgba(74,114,80,.22)", borderRadius:40, padding:"7px 16px", textAlign:"left" }}>
              <div style={{ fontSize:".64rem", color:"rgba(74,114,80,.9)", fontWeight:600 }}>{t}</div>
              <div style={{ fontSize:".57rem", color:"rgba(247,242,234,.35)", marginTop:1 }}>{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div id="sec-aff-grid" style={{ padding:"0 16px 28px", maxWidth:960, margin:"0 auto" }}>
        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4, WebkitOverflowScrolling:"touch", scrollbarWidth:"none" }}>
          <button onClick={()=>setActiveCat("all")} style={{ flexShrink:0, background:activeCat==="all"?"rgba(74,114,80,.85)":"rgba(255,255,255,.05)", border:"1px solid "+(activeCat==="all"?"rgba(74,114,80,.85)":"rgba(255,255,255,.14)"), color:activeCat==="all"?"white":"rgba(247,242,234,.7)", borderRadius:40, padding:"8px 18px", fontSize:".7rem", letterSpacing:".1em", textTransform:"uppercase", cursor:"pointer", transition:"all .2s", whiteSpace:"nowrap", fontWeight:activeCat==="all"?700:400 }}>
            ✦ All ({allProds.length})
          </button>
          {cats.map(c=>(
            <button key={c.id} onClick={()=>setActiveCat(c.id)} style={{ flexShrink:0, background:activeCat===c.id?c.accentColor:"rgba(255,255,255,.05)", border:"1px solid "+(activeCat===c.id?c.accentColor:"rgba(255,255,255,.14)"), color:activeCat===c.id?"#0A0A0A":"rgba(247,242,234,.7)", borderRadius:40, padding:"8px 18px", fontSize:".7rem", letterSpacing:".1em", textTransform:"uppercase", cursor:"pointer", transition:"all .2s", whiteSpace:"nowrap", fontWeight:activeCat===c.id?700:400 }}>
              {c.emoji} {c.label} ({allProds.filter(p=>p.categoryId===c.id).length})
            </button>
          ))}
        </div>

        {/* Category intro if active */}
        {activeCatObj && (
          <div style={{ margin:"16px 0 0", background:"rgba(255,255,255,.03)", border:`1px solid ${activeCatObj.accentColor}33`, borderRadius:14, padding:"14px 18px" }}>
            <div style={{ fontSize:".56rem", letterSpacing:".2em", textTransform:"uppercase", color:activeCatObj.accentColor, marginBottom:6, fontWeight:600 }}>{activeCatObj.emoji} {activeCatObj.label}</div>
            <p style={{ fontSize:".8rem", color:"rgba(247,242,234,.5)", margin:0, lineHeight:1.7, fontWeight:300 }}>{activeCatObj.description}</p>
          </div>
        )}
      </div>

      {/* PRODUCT GRID */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 16px", display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(340px,100%),1fr))", gap:20 }}>
        {sorted.length === 0 ? (
          <div style={{ gridColumn:"span 3", textAlign:"center", padding:"60px 20px", color:"rgba(247,242,234,.25)", fontStyle:"italic" }}>
            No products in this category yet.
          </div>
        ) : sorted.map(p => {
          const cat = (affiliateData?.categories||[]).find(c=>c.id===p.categoryId);
          return (
            <ProductCard
              key={p.id}
              product={p}
              category={cat}
              onDetail={()=>setSelected(p)}
              onBuy={()=>handleBuy(p)}
            />
          );
        })}
      </div>

      {/* WHY THIS MATTERS */}
      <div style={{ maxWidth:720, margin:"52px auto 0", padding:"0 16px" }}>
        <div style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(74,114,80,.18)", borderRadius:18, padding:"26px 28px" }}>
          <div style={{ fontSize:".56rem", letterSpacing:".22em", textTransform:"uppercase", color:"rgba(74,114,80,.75)", marginBottom:12, fontWeight:600 }}>✦ Why form matters more than brand</div>
          <p style={{ fontSize:".82rem", color:"rgba(247,242,234,.6)", lineHeight:1.85, margin:"0 0 12px", fontWeight:300 }}>
            The supplement industry is largely unregulated. A bottle can say "Magnesium" on the front and contain magnesium oxide — a form with roughly 4% bioavailability that mostly passes through your digestive system without doing anything. Same price. Completely different outcome.
          </p>
          <p style={{ fontSize:".82rem", color:"rgba(247,242,234,.6)", lineHeight:1.85, margin:0, fontWeight:300 }}>
            Every pick on this page was chosen first for <em style={{ color:"rgba(196,137,58,.85)" }}>form</em> — the specific molecular structure your body can actually use — and second for third-party testing. The price difference between a good supplement and a great one is usually $10–$20 per month. Your cells work 24 hours a day. They deserve the real thing.
          </p>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div style={{ maxWidth:860, margin:"28px auto 0", padding:"0 16px" }}>
        <p style={{ fontSize:".62rem", color:"rgba(247,242,234,.2)", textAlign:"center", lineHeight:1.75 }}>
          These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before beginning any supplement regimen, especially if you take prescription medications or have an existing health condition. Links on this page are affiliate links — we may earn a commission if you purchase through them at no additional cost to you.
        </p>
      </div>

      {/* MODALS */}
      {selected && (() => {
        const cat = (affiliateData?.categories||[]).find(c=>c.id===selected.categoryId);
        return (
          <ProductDetailModal
            product={selected}
            category={cat}
            onClose={()=>setSelected(null)}
            onBuy={()=>handleBuy(selected)}
            onNav={onNav}
          />
        );
      })()}

      {notifyProduct && (
        <StockNotifyModal product={notifyProduct} onClose={()=>setNotifyProduct(null)}/>
      )}
    </div>
  );
}

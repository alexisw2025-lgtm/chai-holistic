/*
  Testimonials.jsx — Chai Holistic
  © Chai Holistic. All rights reserved. chaiholistic.com

  ─────────────────────────────────────────────────────────────────────────────
  HOW TO ADD THIS TO chaiholistic417.jsx
  ─────────────────────────────────────────────────────────────────────────────
  Like StartHere, this lives INSIDE the Home component — it uses nav via closure.

  1. Paste the TESTIMONIALS data array and the state/ref block into the
     Home component body (before the return statement).
  2. Paste the JSX section into the Home return, right after the StartHere section
     and before <div className="mq">.

  TO SWAP IN REAL TESTIMONIALS: edit the TESTIMONIALS array. Same shape, any length.
  The carousel handles any number automatically.
  ─────────────────────────────────────────────────────────────────────────────
*/

// ─── PASTE THIS DATA + STATE into Home component body (before return) ────────

/*
const TESTIMONIALS = [
  { id:1, quote:"I found Chai Holistic at 2am when I couldn't sleep and couldn't stop crying. I opened the prayer section and something shifted. I just felt less alone. I ordered the Sleep & Surrender blend the next morning.", name:"Monique T.", location:"Atlanta, GA", product:"Sleep & Surrender Blend", icon:"🌙", accent:"#C4893A" },
  { id:2, quote:"As a Jamaican man who grew up watching my grandmother brew bush medicine, this brand brought something back that I didn't know I missed. The ancestral teas section — I actually teared up reading it. This is our heritage being honored.", name:"Devon R.", location:"Brooklyn, NY", product:"Ancestral Teas", icon:"🌿", accent:"#5A8A6A" },
  { id:3, quote:"I gave my husband a Vibe Shift Ring for his birthday and he hasn't taken it off. He told me quietly that he feels more centered when he wears it. That means everything.", name:"Priya K.", location:"Houston, TX", product:"Vibe Shift Ring", icon:"💍", accent:"#A07840" },
  { id:4, quote:"The Men's Wellness section spoke to me in a way that no other health brand ever has. It wasn't about performance or aesthetics — it was about wholeness. The prostate blend has been part of my morning ritual for three months now.", name:"Marcus J.", location:"Chicago, IL", product:"Men's Wellness Blends", icon:"💪", accent:"#7A6A9A" },
  { id:5, quote:"What makes Chai Holistic different is the intention behind everything. You can feel it. The blends actually work, but it's more than that — the ritual of preparing them changed how I start my mornings.", name:"Sophia M.", location:"Miami, FL", product:"Foundational Healing Blends", icon:"✦", accent:"#6A8A7A" },
  { id:6, quote:"I bought the Sip & Rise book for my teenage son and read it myself first. I sat with it for an hour. Every chapter felt like a conversation I'd been trying to have with him for years, written better than I could have said it.", name:"Pastor Leon W.", location:"Charlotte, NC", product:"Sip & Rise", icon:"🙏", accent:"#C4893A" },
];

const [testActive, setTestActive] = React.useState(0);
const [testVisible, setTestVisible] = React.useState(false);
const [testPaused, setTestPaused] = React.useState(false);
const testRef = React.useRef(null);

React.useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) setTestVisible(true); },
    { threshold: 0.1 }
  );
  if (testRef.current) observer.observe(testRef.current);
  return () => observer.disconnect();
}, []);

React.useEffect(() => {
  if (testPaused) return;
  const timer = setInterval(() => setTestActive(a => (a + 1) % TESTIMONIALS.length), 5000);
  return () => clearInterval(timer);
}, [testPaused]);
*/

// ─── PASTE THIS JSX into the Home return, after StartHere section ─────────────

/*
<section
  ref={testRef}
  style={{
    background:"linear-gradient(180deg,#0E1610 0%,#0A0F0B 100%)",
    padding:"72px 20px 80px",
    position:"relative",overflow:"hidden",
    opacity: testVisible ? 1 : 0,
    transform: testVisible ? "translateY(0)" : "translateY(28px)",
    transition:"opacity 0.8s ease, transform 0.8s ease",
  }}
>
  <div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:700,height:250,background:"radial-gradient(ellipse,rgba(90,138,106,0.05) 0%,transparent 70%)",pointerEvents:"none"}}/>

  <div style={{maxWidth:900,margin:"0 auto",position:"relative"}}>

    {/* Header */}
    <div style={{textAlign:"center",marginBottom:44}}>
      <div style={{fontFamily:"Jost,sans-serif",fontSize:10,letterSpacing:"3.5px",textTransform:"uppercase",color:"#C4893A",marginBottom:14,fontWeight:300}}>The Community Speaks</div>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,5.5vw,32px)",fontWeight:400,fontStyle:"italic",color:"#F7F2EA",lineHeight:1.3,marginBottom:10}}>Real people. Real rituals.</h2>
      <p style={{fontFamily:"Jost,sans-serif",fontSize:"clamp(13px,3.2vw,15px)",color:"rgba(247,242,234,0.45)",fontWeight:300,lineHeight:1.7,maxWidth:380,margin:"0 auto"}}>
        Healing happens differently for everyone. Here is how it happened for them.
      </p>
    </div>

    {/* Active card */}
    {(() => {
      const t = TESTIMONIALS[testActive];
      return (
        <div style={{
          background:"linear-gradient(160deg,rgba(22,32,22,0.97),rgba(14,20,14,0.99))",
          border:"1px solid rgba(196,137,58,0.3)",
          borderRadius:24,padding:"36px 32px",
          position:"relative",overflow:"hidden",
          maxWidth:680,margin:"0 auto 32px",
          boxShadow:"0 16px 48px rgba(0,0,0,0.4)",
        }}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#C4893A,transparent)"}}/>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:64,lineHeight:1,color:t.accent,opacity:0.2,position:"absolute",top:10,left:16,userSelect:"none",pointerEvents:"none"}}>"</div>
          <div style={{width:42,height:42,borderRadius:12,background:`${t.accent}20`,border:`1px solid ${t.accent}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:20}}>
            {t.icon}
          </div>
          <blockquote style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(14px,3.5vw,16px)",fontStyle:"italic",color:"rgba(247,242,234,0.88)",lineHeight:1.9,margin:"0 0 24px"}}>
            {t.quote}
          </blockquote>
          <div style={{borderTop:"1px solid rgba(196,137,58,0.12)",paddingTop:16,display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:8}}>
            <div>
              <div style={{fontFamily:"Jost,sans-serif",fontSize:13,color:"#F7F2EA",fontWeight:500,marginBottom:2}}>{t.name}</div>
              <div style={{fontFamily:"Jost,sans-serif",fontSize:10,color:"rgba(247,242,234,0.35)",fontWeight:300,letterSpacing:"0.5px"}}>{t.location}</div>
            </div>
            <div style={{padding:"4px 12px",borderRadius:10,background:`${t.accent}18`,border:`1px solid ${t.accent}30`,fontFamily:"Jost,sans-serif",fontSize:10,color:t.accent,whiteSpace:"nowrap"}}>{t.product}</div>
          </div>
        </div>
      );
    })()}

    {/* Controls */}
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20}}>
      <button
        onClick={()=>{setTestPaused(true);setTestActive(a=>(a-1+TESTIMONIALS.length)%TESTIMONIALS.length);}}
        style={{width:40,height:40,borderRadius:"50%",border:"1px solid rgba(196,137,58,0.3)",background:"transparent",color:"rgba(196,137,58,0.6)",fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}
        onMouseEnter={e=>{e.currentTarget.style.borderColor="#C4893A";e.currentTarget.style.color="#C4893A";e.currentTarget.style.background="rgba(196,137,58,0.08)";}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(196,137,58,0.3)";e.currentTarget.style.color="rgba(196,137,58,0.6)";e.currentTarget.style.background="transparent";}}
      >←</button>

      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        {TESTIMONIALS.map((_,i) => (
          <button key={i} onClick={()=>{setTestPaused(true);setTestActive(i);}}
            style={{width:testActive===i?20:6,height:6,borderRadius:3,background:testActive===i?"#C4893A":"rgba(196,137,58,0.25)",border:"none",cursor:"pointer",transition:"all 0.3s ease",padding:0}}/>
        ))}
      </div>

      <button
        onClick={()=>{setTestPaused(true);setTestActive(a=>(a+1)%TESTIMONIALS.length);}}
        style={{width:40,height:40,borderRadius:"50%",border:"1px solid rgba(196,137,58,0.3)",background:"transparent",color:"rgba(196,137,58,0.6)",fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}
        onMouseEnter={e=>{e.currentTarget.style.borderColor="#C4893A";e.currentTarget.style.color="#C4893A";e.currentTarget.style.background="rgba(196,137,58,0.08)";}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(196,137,58,0.3)";e.currentTarget.style.color="rgba(196,137,58,0.6)";e.currentTarget.style.background="transparent";}}
      >→</button>
    </div>

    <div style={{textAlign:"center",marginTop:44,paddingTop:32,borderTop:"1px solid rgba(196,137,58,0.1)"}}>
      <p style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(13px,3.2vw,15px)",fontStyle:"italic",color:"rgba(247,242,234,0.32)",marginBottom:14}}>Your ritual is waiting.</p>
      <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
        {[["🌿","Explore blends","shop"],["🙏","Daily prayer","prayer"],["💍","Vibe Shift Rings","rings"]].map(([icon,label,page])=>(
          <button key={page} onClick={()=>nav(page)} style={{padding:"8px 18px",borderRadius:20,border:"1px solid rgba(196,137,58,0.2)",background:"transparent",fontFamily:"Jost,sans-serif",fontSize:12,color:"rgba(247,242,234,0.4)",fontWeight:300,cursor:"pointer",transition:"all 0.2s",letterSpacing:"0.3px"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(196,137,58,0.5)";e.currentTarget.style.color="rgba(247,242,234,0.75)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(196,137,58,0.2)";e.currentTarget.style.color="rgba(247,242,234,0.4)";}}>
            {icon}  {label}
          </button>
        ))}
      </div>
    </div>

  </div>
</section>
*/

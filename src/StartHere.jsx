/*
  StartHere.jsx — Chai Holistic
  © Chai Holistic. All rights reserved. chaiholistic.com

  ─────────────────────────────────────────────────────────────────────────────
  HOW TO ADD THIS TO chaiholistic417.jsx
  ─────────────────────────────────────────────────────────────────────────────
  This is NOT a separate imported component — it uses nav, setFinderOpen etc
  from the ChaiHolistic closure, so it must live INSIDE the Home component.

  1. Open chaiholistic417.jsx
  2. Find the Home component (around line 4826):
       const Home = () => {
  3. Find the line after the closing </section> of the hero (around line 4915):
       </section>
       <div className="mq">   ← the marquee ticker
  4. Paste the <StartHereSection /> JSX block (below) BEFORE the <div className="mq">
  5. Paste the StartHereSection function definition (below) INSIDE the Home component,
     before its return statement.

  ─────────────────────────────────────────────────────────────────────────────
  PASTE THIS FUNCTION inside the Home component body, before the return():
  ─────────────────────────────────────────────────────────────────────────────
*/

// ─── PASTE BELOW into Home component body (before the return statement) ──────

const [startHereVisible, setStartHereVisible] = React.useState(false);
const startHereRef = React.useRef(null);
React.useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) setStartHereVisible(true); },
    { threshold: 0.1 }
  );
  if (startHereRef.current) observer.observe(startHereRef.current);
  return () => observer.disconnect();
}, []);

const START_PATHS = [
  { icon:"🌿", label:"I want to heal",     sub:"Body, mind, or spirit — find blends and rituals built for restoration.", action:()=>nav("shop"),           accent:"#5A8A6A", accentLight:"rgba(90,138,106,0.15)" },
  { icon:"🙏", label:"I need to pray",      sub:"It's late. Something is heavy. A prayer is waiting for you right now.",  action:()=>nav("prayer"),         accent:"#C4893A", accentLight:"rgba(196,137,58,0.15)" },
  { icon:"💪", label:"Men's wellness",      sub:"40 blends built for men — body, focus, and faith.",                      action:()=>nav("men"),             accent:"#7A6A9A", accentLight:"rgba(122,106,154,0.15)" },
  { icon:"💍", label:"Vibe Shift Rings",    sub:"Wearable intention. Each ring carries a 417Hz transformation frequency.", action:()=>nav("rings"),          accent:"#A07840", accentLight:"rgba(160,120,64,0.15)" },
  { icon:"✦",  label:"Supplements",         sub:"Carefully chosen allies for your wellness stack, paired with tea rituals.", action:()=>nav("supplements"),  accent:"#6A8A7A", accentLight:"rgba(106,138,122,0.15)" },
  { icon:"🫖", label:"Find my tea",         sub:"Not sure where to start? Answer 3 questions and we'll match you.",        action:()=>setFinderOpen(true),   accent:"#8A6A3A", accentLight:"rgba(138,106,58,0.15)" },
];

// ─── PASTE THIS JSX in the Home return, after </section> (hero) and before <div className="mq"> ───

/*
<section
  ref={startHereRef}
  style={{
    background:"linear-gradient(180deg,#0A0F0B 0%,#0E1610 60%,#0A0F0B 100%)",
    padding:"64px 20px 72px",
    position:"relative",
    overflow:"hidden",
    opacity: startHereVisible ? 1 : 0,
    transform: startHereVisible ? "translateY(0)" : "translateY(24px)",
    transition:"opacity 0.7s ease, transform 0.7s ease",
  }}
>
  <div style={{position:"absolute",top:"10%",left:"50%",transform:"translateX(-50%)",width:600,height:300,background:"radial-gradient(ellipse,rgba(196,137,58,0.06) 0%,transparent 70%)",pointerEvents:"none"}}/>
  <div style={{maxWidth:560,margin:"0 auto",position:"relative"}}>

    <div style={{textAlign:"center",marginBottom:36}}>
      <div style={{fontFamily:"Jost,sans-serif",fontSize:10,letterSpacing:"3.5px",textTransform:"uppercase",color:"#C4893A",marginBottom:14,fontWeight:300}}>New here?</div>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,6vw,34px)",fontWeight:400,fontStyle:"italic",color:"#F7F2EA",lineHeight:1.3,marginBottom:12}}>Where would you like to begin?</h2>
      <p style={{fontFamily:"Jost,sans-serif",fontSize:"clamp(13px,3.5vw,15px)",color:"rgba(247,242,234,0.5)",lineHeight:1.7,fontWeight:300,maxWidth:400,margin:"0 auto"}}>
        Chai Holistic is a living ecosystem — teas, prayers, rings, and rituals rooted in ancestral wisdom. Choose what calls to you.
      </p>
    </div>

    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {START_PATHS.map((path,i) => (
        <button
          key={i}
          onClick={path.action}
          style={{
            display:"flex",alignItems:"center",gap:16,padding:"18px 20px",
            borderRadius:16,
            border:`1px solid rgba(196,137,58,0.18)`,
            background:"rgba(255,255,255,0.025)",
            cursor:"pointer",textAlign:"left",width:"100%",
            transition:"all 0.22s ease",outline:"none",position:"relative",overflow:"hidden",
          }}
          onMouseEnter={e=>{
            e.currentTarget.style.background=path.accentLight;
            e.currentTarget.style.borderColor=path.accent;
            e.currentTarget.style.transform="translateX(4px)";
            e.currentTarget.querySelector('.sh-bar').style.width="3px";
            e.currentTarget.querySelector('.sh-arrow').style.color=path.accent;
            e.currentTarget.querySelector('.sh-arrow').style.transform="translateX(3px)";
          }}
          onMouseLeave={e=>{
            e.currentTarget.style.background="rgba(255,255,255,0.025)";
            e.currentTarget.style.borderColor="rgba(196,137,58,0.18)";
            e.currentTarget.style.transform="translateX(0)";
            e.currentTarget.querySelector('.sh-bar').style.width="0px";
            e.currentTarget.querySelector('.sh-arrow').style.color="rgba(196,137,58,0.3)";
            e.currentTarget.querySelector('.sh-arrow').style.transform="translateX(0)";
          }}
        >
          <div className="sh-bar" style={{position:"absolute",left:0,top:0,bottom:0,width:0,background:path.accent,borderRadius:"16px 0 0 16px",transition:"width 0.2s ease"}}/>
          <div style={{width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.04)",borderRadius:12,border:"1px solid rgba(255,255,255,0.06)",fontSize:"clamp(20px,5vw,24px)",flexShrink:0}}>
            {path.icon}
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(14px,3.8vw,16px)",fontStyle:"italic",color:"rgba(247,242,234,0.9)",marginBottom:3}}>
              {path.label}
            </div>
            <div style={{fontFamily:"Jost,sans-serif",fontSize:"clamp(11px,3vw,13px)",color:"rgba(247,242,234,0.4)",fontWeight:300,lineHeight:1.5}}>
              {path.sub}
            </div>
          </div>
          <div className="sh-arrow" style={{flexShrink:0,fontSize:16,color:"rgba(196,137,58,0.3)",transition:"all 0.22s ease",paddingRight:2}}>→</div>
        </button>
      ))}
    </div>

    <div style={{textAlign:"center",marginTop:36,fontFamily:"'Playfair Display',serif",fontSize:"clamp(12px,3vw,14px)",fontStyle:"italic",color:"rgba(247,242,234,0.25)",lineHeight:1.7}}>
      "You are good enough the way you are."
      <div style={{fontFamily:"Jost,sans-serif",fontStyle:"normal",fontSize:10,letterSpacing:"2px",textTransform:"uppercase",marginTop:6,color:"rgba(196,137,58,0.4)"}}>— Chai Holistic</div>
    </div>

  </div>
</section>
*/

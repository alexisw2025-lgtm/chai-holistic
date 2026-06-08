"""
Chai Holistic — Sip & Heal Report API
Deploy to Railway: railway up
Environment variables needed:
  RESEND_API_KEY      — from resend.com
  ANTHROPIC_API_KEY   — from console.anthropic.com
  ALLOWED_ORIGIN      — https://chaiholistic.com
"""

import os
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import resend
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Chai Holistic API", version="1.0.0")

# ── CORS ──────────────────────────────────────────────────────────────────────
ALLOWED_ORIGIN = os.getenv("ALLOWED_ORIGIN", "https://chaiholistic.com")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ALLOWED_ORIGIN, "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)

resend.api_key = os.getenv("RESEND_API_KEY", "")

# ── Request models ────────────────────────────────────────────────────────────
class CartItem(BaseModel):
    id: Optional[str] = ""
    name: str
    price: float
    qty: int = 1
    emoji: Optional[str] = "🍵"

class SaveRitualRequest(BaseModel):
    to: EmailStr
    ritualUrl: str
    cartTotal: Optional[str] = "0.00"
    itemCount: Optional[int] = 0
    ritualNote: Optional[str] = ""
    items: Optional[List[CartItem]] = []

class ReportRequest(BaseModel):
    name: str
    email: EmailStr
    goal: Optional[str] = ""
    energy: Optional[str] = ""
    stress: Optional[str] = ""
    sleep: Optional[str] = ""
    focus: Optional[str] = ""
    time: Optional[str] = ""
    concerns: Optional[List[str]] = []
    rx_blends: Optional[List[str]] = []
    rx_ritual: Optional[str] = ""

# ── Health check ──────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"status": "Chai Holistic API running", "version": "1.0.0"}

@app.get("/health")
def health():
    return {"status": "ok"}

# ── Save My Ritual ────────────────────────────────────────────────────────────
@app.post("/save-ritual")
async def save_ritual(req: SaveRitualRequest):
    if not resend.api_key:
        raise HTTPException(status_code=500, detail="Email service not configured")

    # Build item rows HTML
    item_rows_html = ""
    for item in (req.items or []):
        item_rows_html += f"""
        <tr>
          <td style="padding:10px 16px;font-size:14px;color:#5A5040;border-bottom:1px solid #F0EBE3;">
            {item.emoji or '🍵'} {item.name}
          </td>
          <td style="padding:10px 16px;font-size:14px;color:#9A8A7A;text-align:center;border-bottom:1px solid #F0EBE3;">
            &times;{item.qty}
          </td>
          <td style="padding:10px 16px;font-size:14px;color:#C8893A;text-align:right;font-weight:600;border-bottom:1px solid #F0EBE3;">
            ${item.price * item.qty:.2f}
          </td>
        </tr>"""

    item_count = req.itemCount or len(req.items or [])
    plural = "" if item_count == 1 else "s"
    ritual_note_block = ""
    if req.ritualNote:
        ritual_note_block = f"""
    <div style="background:#FFF8EE;border-top:3px solid #C8893A;padding:24px 36px;">
      <div style="font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#C8893A;margin-bottom:10px;font-family:sans-serif;font-weight:600;">A note about your ritual</div>
      <p style="margin:0;font-size:15px;color:#5A5040;line-height:1.8;font-style:italic;">&ldquo;{req.ritualNote}&rdquo;</p>
    </div>"""

    html = f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:'Georgia',serif;">
<div style="max-width:580px;margin:0 auto;background:#FAF7F0;">

  <div style="background:linear-gradient(135deg,#2C1F0F,#3A2A18);padding:40px 36px 32px;text-align:center;">
    <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:14px;">&#10022; &nbsp; Chai Holistic &nbsp; &#10022;</div>
    <h1 style="margin:0 0 8px;font-size:28px;font-weight:400;color:#FFFFFF;line-height:1.2;">
      Your Ritual Basket<br/><em style="color:#C8893A;">is waiting for you</em>
    </h1>
    <p style="margin:14px 0 0;font-size:13px;color:rgba(255,255,255,.5);font-weight:300;">
      {item_count} item{plural} saved &middot; Come back whenever you&rsquo;re ready
    </p>
  </div>

  {ritual_note_block}

  <div style="padding:28px 36px 0;">
    <div style="font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#9A8A7A;margin-bottom:14px;font-family:sans-serif;font-weight:600;">Your basket</div>
    <table style="width:100%;border-collapse:collapse;background:white;border-radius:16px;overflow:hidden;border:1px solid #EDE8E0;">
      <thead>
        <tr style="background:#F5F0E8;">
          <th style="padding:10px 16px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#9A8A7A;text-align:left;font-family:sans-serif;">Blend</th>
          <th style="padding:10px 16px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#9A8A7A;text-align:center;font-family:sans-serif;">Qty</th>
          <th style="padding:10px 16px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#9A8A7A;text-align:right;font-family:sans-serif;">Price</th>
        </tr>
      </thead>
      <tbody>{item_rows_html}</tbody>
      <tfoot>
        <tr style="background:#FAF7F0;">
          <td colspan="2" style="padding:12px 16px;font-family:sans-serif;font-size:13px;font-weight:700;color:#2C1F0F;">TOTAL</td>
          <td style="padding:12px 16px;font-size:16px;font-weight:700;color:#C8893A;text-align:right;">${req.cartTotal or "0.00"}</td>
        </tr>
      </tfoot>
    </table>
  </div>

  <div style="padding:32px 36px;text-align:center;">
    <a href="{req.ritualUrl}"
       style="display:inline-block;background:linear-gradient(135deg,#2C1F0F,#3A2A18);color:white;text-decoration:none;padding:16px 40px;border-radius:50px;font-family:sans-serif;font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;box-shadow:0 8px 28px rgba(44,31,15,.35);">
      &#10022; &nbsp; Resume My Ritual &nbsp; &rarr;
    </a>
    <p style="margin:16px 0 0;font-size:12px;color:#B0A090;font-family:sans-serif;">One click restores your entire basket &mdash; no account needed</p>
  </div>

  <div style="height:1px;background:linear-gradient(to right,transparent,#DDD8D0,transparent);margin:0 36px;"></div>

  <div style="padding:28px 36px 36px;text-align:center;">
    <div style="font-size:14px;color:#8A7A6A;font-style:italic;margin-bottom:8px;">&ldquo;You are good enough the way you are.&rdquo;</div>
    <div style="font-size:11px;color:#B0A090;font-family:sans-serif;letter-spacing:1px;margin-bottom:16px;">&mdash; Chai Holistic</div>
    <div style="font-size:11px;color:#C0B0A0;font-family:sans-serif;line-height:1.8;">
      <a href="https://chaiholistic.com" style="color:#C8893A;text-decoration:none;">chaiholistic.com</a><br/>
      You&rsquo;re receiving this because you saved a ritual basket.
    </div>
  </div>

</div>
</body></html>"""

    try:
        params = {
            "from": "Chai Holistic <hello@chaiholistic.com>",
            "to": [req.to],
            "subject": "✦ Your Ritual Basket is waiting for you",
            "html": html,
        }
        email = resend.Emails.send(params)
        return {"success": True, "id": email.get("id")}
    except Exception as e:
        print(f"Resend error (save-ritual): {e}")
        raise HTTPException(status_code=500, detail=f"Email send failed: {str(e)}")


# ── Generate daily intention via Claude ───────────────────────────────────────
async def generate_intention(req) -> str:
    """Generate a deeply personal daily intention using Claude."""
    api_key = os.getenv("ANTHROPIC_API_KEY", "")
    if not api_key:
        return "Today I choose to nourish my body, quiet my mind, and trust the process of healing. Every cup I drink is an act of self-love."

    concerns_str = ", ".join(req.concerns) if req.concerns else "general wellness"
    blends_str = ", ".join(req.rx_blends[:2]) if req.rx_blends else "herbal tea"

    prompt = f"""You are writing a deeply personal daily intention for {req.name}, a Chai Holistic customer.

Their wellness profile:
- Primary goal: {req.goal or "overall wellness"}
- Energy level: {req.energy or "moderate"}
- Stress level: {req.stress or "moderate"}
- Sleep quality: {req.sleep or "fair"}
- Key concerns: {concerns_str}
- Recommended teas: {blends_str}

Write ONE daily intention for them. It should:
- Be 3-5 sentences, spoken in first person (I...)
- Feel deeply personal — reference their specific situation without being clinical
- Be spiritual, grounding, and beautiful
- Connect their tea ritual to their healing journey
- Feel like it was written by someone who truly knows and cares about them
- Be something they would want to read aloud every morning in the shower

Write only the intention text. No quotes, no labels, no explanation."""

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(
                "https://api.anthropic.com/v1/messages",
                headers={
                    "x-api-key": api_key,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json",
                },
                json={
                    "model": "claude-haiku-4-5-20251001",
                    "max_tokens": 300,
                    "messages": [{"role": "user", "content": prompt}],
                },
            )
            data = response.json()
            print(f"Anthropic response: {data}")
            # Handle different response formats
            if "content" in data and len(data["content"]) > 0:
                block = data["content"][0]
                if isinstance(block, dict) and "text" in block:
                    return block["text"].strip()
                elif isinstance(block, str):
                    return block.strip()
            elif "error" in data:
                print(f"Anthropic error: {data['error']}")
            return "Today I choose to nourish my body, quiet my mind, and trust the process of healing. Every cup I drink is an act of self-love."
    except Exception as e:
        print(f"Intention generation error: {e}")
        return "Today I choose to nourish my body, quiet my mind, and trust the process of healing. Every cup I drink is an act of self-love."

# ── Send Sip & Heal Report ────────────────────────────────────────────────────
@app.post("/api/send-report")
async def send_report(req: ReportRequest):
    if not resend.api_key:
        raise HTTPException(status_code=500, detail="Email service not configured")

    # Generate personal daily intention via Claude
    intention = await generate_intention(req)

    # Build the blends list HTML
    blends_html = ""
    if req.rx_blends:
        blends_html = "".join([
            f'<li style="padding:6px 0;border-bottom:1px solid #e8e0d4;color:#3D2B1F;">'
            f'<strong>{blend}</strong></li>'
            for blend in req.rx_blends
        ])
    else:
        blends_html = "<li style='color:#8A7A6A;'>Your personalized blends will be recommended based on your profile.</li>"

    # Build concerns string
    concerns_str = ", ".join(req.concerns) if req.concerns else "general wellness"

    # Build the full HTML email
    html = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Sip & Heal Report</title>
</head>
<body style="margin:0;padding:0;background:#F7F2EA;font-family:'Georgia',serif;">

  <!-- Header -->
  <div style="background:linear-gradient(160deg,#060e07 0%,#0d1a11 40%,#173322 100%);padding:0;text-align:center;position:relative;overflow:hidden;">

    <!-- Top accent line -->
    <div style="height:3px;background:linear-gradient(90deg,transparent,#c08830,#deb96a,#c08830,transparent);"></div>

    <div style="padding:32px 32px 28px;position:relative;">

      <!-- Logo image -->
      <div style="margin-bottom:16px;">
        <img src="https://chaiholistic.com/chai_holistic.jpg"
             alt="Chai Holistic"
             width="72" height="72"
             style="width:72px;height:72px;border-radius:50%;border:1.5px solid rgba(192,136,48,.5);box-shadow:0 0 28px rgba(192,136,48,.25);display:inline-block;"/>
      </div>

      <!-- Eyebrow -->
      <div style="font-family:Georgia,serif;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:rgba(192,136,48,.7);margin-bottom:12px;">
        Chai Holistic · Sip &amp; Heal
      </div>

      <!-- Ornamental divider -->
      <div style="margin-bottom:16px;color:rgba(192,136,48,.4);font-size:13px;letter-spacing:8px;">
        ✦ ✦ ✦
      </div>

      <!-- Main title -->
      <h1 style="font-family:Georgia,serif;font-size:32px;font-weight:400;color:white;margin:0 0 10px;line-height:1.2;letter-spacing:-0.5px;">
        Your Sip &amp; Heal Report
      </h1>

      <!-- Subtitle -->
      <p style="font-family:Georgia,serif;font-size:15px;font-style:italic;color:rgba(255,255,255,.5);margin:0 0 20px;">
        Prepared with intention for <span style="color:rgba(192,136,48,.9);font-style:normal;">{req.name}</span>
      </p>

      <!-- Bottom watermark -->
      <div style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.18);">
        chaiholistic.com
      </div>

    </div>

    <!-- Bottom accent line -->
    <div style="height:3px;background:linear-gradient(90deg,transparent,#c08830,#deb96a,#c08830,transparent);"></div>
  </div>

  <!-- Body -->
  <div style="max-width:600px;margin:0 auto;padding:40px 32px;">

    <!-- Greeting -->
    <div style="margin-bottom:32px;">
      <p style="font-size:17px;color:#3D2B1F;line-height:1.8;margin:0 0 16px;">
        Dear {req.name},
      </p>
      <p style="font-size:15px;color:#5A5040;line-height:1.8;margin:0;">
        Thank you for trusting Chai Holistic with your wellness journey.
        Based on your profile — your goals, your energy, your stress, and what your body is asking for —
        we've prepared your personal Sip & Heal Report below.
      </p>
    </div>

    <!-- Profile Summary -->
    <div style="background:white;border-radius:16px;padding:24px;margin-bottom:24px;border:1px solid #E8E0D4;">
      <h2 style="font-family:Georgia,serif;font-size:14px;letter-spacing:2px;text-transform:uppercase;color:#C4893A;margin:0 0 16px;">
        ✦ Your Wellness Profile
      </h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#8A7A6A;width:40%;border-bottom:1px solid #F0E8DC;">Primary Goal</td>
          <td style="padding:6px 0;font-size:13px;color:#3D2B1F;font-weight:500;border-bottom:1px solid #F0E8DC;">{req.goal or "Whole-body wellness"}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#8A7A6A;width:40%;border-bottom:1px solid #F0E8DC;">Energy Pattern</td>
          <td style="padding:6px 0;font-size:13px;color:#3D2B1F;font-weight:500;border-bottom:1px solid #F0E8DC;">{req.energy or "Varies"}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#8A7A6A;width:40%;border-bottom:1px solid #F0E8DC;">Stress Level</td>
          <td style="padding:6px 0;font-size:13px;color:#3D2B1F;font-weight:500;border-bottom:1px solid #F0E8DC;">{req.stress or "Moderate"}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#8A7A6A;width:40%;border-bottom:1px solid #F0E8DC;">Sleep Quality</td>
          <td style="padding:6px 0;font-size:13px;color:#3D2B1F;font-weight:500;border-bottom:1px solid #F0E8DC;">{req.sleep or "Varies"}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#8A7A6A;width:40%;">Key Concerns</td>
          <td style="padding:6px 0;font-size:13px;color:#3D2B1F;font-weight:500;">{concerns_str}</td>
        </tr>
      </table>
    </div>

    <!-- Recommended Blends -->
    <div style="background:white;border-radius:16px;padding:24px;margin-bottom:24px;border:1px solid #E8E0D4;">
      <h2 style="font-family:Georgia,serif;font-size:14px;letter-spacing:2px;text-transform:uppercase;color:#4A7250;margin:0 0 16px;">
        🍵 Your Recommended Blends
      </h2>
      <ul style="margin:0;padding:0;list-style:none;">
        {blends_html}
      </ul>
    </div>

    <!-- Daily Ritual -->
    <div style="background:linear-gradient(135deg,#f0f7f0,#faf8f3);border-radius:16px;padding:24px;margin-bottom:24px;border:1px solid #C8DEC8;">
      <h2 style="font-family:Georgia,serif;font-size:14px;letter-spacing:2px;text-transform:uppercase;color:#4A7250;margin:0 0 12px;">
        🌿 Your Daily Ritual
      </h2>
      <p style="font-size:14px;color:#5A5040;line-height:1.8;margin:0;font-style:italic;">
        {req.rx_ritual or "Begin each morning with intention. Steep your blend for the recommended time, hold the cup in both hands, and take three slow breaths before your first sip. Let this be your daily act of self-care."}
      </p>
    </div>

    <!-- Daily Intention -->
    <div style="background-color:#f0f7f0;border-radius:16px;padding:28px 28px 24px;margin-bottom:24px;text-align:center;border-left:4px solid #c08830;border-top:1px solid #c8dec8;border-right:1px solid #c8dec8;border-bottom:1px solid #c8dec8;">
      <div style="font-family:Georgia,serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#c08830;margin-bottom:6px;">
        ✦ Your Daily Intention ✦
      </div>
      <div style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a7a6a;margin-bottom:20px;">
        Read this every morning
      </div>
      <p style="font-family:Georgia,serif;font-size:17px;font-style:italic;color:#1a3a22;line-height:1.9;margin:0 0 20px;">
        {intention}
      </p>
      <div style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#4a7250;">
        — Chai Holistic · Written personally for {req.name}
      </div>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:32px;">
      <a href="https://chaiholistic.com?preview=sipheal"
         style="display:inline-block;background:linear-gradient(135deg,#275c3e,#1e4d34);color:white;text-decoration:none;padding:16px 36px;border-radius:50px;font-family:Georgia,serif;font-size:14px;letter-spacing:1px;">
        ✦ Shop Your Blends at Chai Holistic
      </a>
    </div>

    <!-- Quote -->
    <div style="text-align:center;padding:24px;border-top:1px solid #E8E0D4;border-bottom:1px solid #E8E0D4;margin-bottom:32px;">
      <p style="font-family:Georgia,serif;font-size:16px;font-style:italic;color:#8A7A6A;margin:0;line-height:1.8;">
        "Healing is not a destination.<br/>It is a daily practice, one cup at a time."
      </p>
      <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C4893A;margin:12px 0 0;">
        — Chai Holistic
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;">
      <p style="font-size:12px;color:#AAA;line-height:1.6;margin:0;">
        Chai Holistic LLC · chaiholistic.com<br/>
        These statements have not been evaluated by the FDA.<br/>
        Not intended to diagnose, treat, cure, or prevent any disease.<br/>
        <a href="https://chaiholistic.com" style="color:#C4893A;">Unsubscribe</a>
      </p>
    </div>

  </div>

</body>
</html>
"""

    try:
        params = {
            "from": "Chai Holistic <hello@chaiholistic.com>",
            "to": [req.email],
            "subject": f"Your Sip & Heal Report, {req.name} ✦",
            "html": html,
        }
        email = resend.Emails.send(params)
        return {"success": True, "id": email.get("id")}
    except Exception as e:
        print(f"Resend error: {e}")
        raise HTTPException(status_code=500, detail=f"Email send failed: {str(e)}")


# ── SPEAK INTENTION — OpenAI TTS ──────────────────────────────────────────────
class SpeakRequest(BaseModel):
    text: str
    voice: Optional[str] = "nova"   # nova | shimmer | alloy | echo | fable | onyx

@app.post("/speak-intention")
async def speak_intention(req: SpeakRequest):
    """
    Converts a Chai Holistic intention text to natural audio via OpenAI TTS.
    Returns audio/mpeg stream directly to the browser.
    Voice 'nova' is warm and calm — ideal for wellness/spiritual content.
    """
    openai_key = os.getenv("OPENAI_API_KEY", "")
    if not openai_key:
        raise HTTPException(status_code=500, detail="OpenAI API key not configured")

    text = req.text.strip()
    if not text or len(text) > 500:
        raise HTTPException(status_code=400, detail="Text must be 1–500 characters")

    # Prompt the model to speak slowly and warmly — this is the "steerability" feature
    spoken_text = (
        f"[Speak slowly, gently, and warmly — like a prayer being offered to someone "
        f"who needs to hear it. Pause between sentences. Let each word land.]\n\n{text}"
    )

    try:
        async with httpx.AsyncClient(timeout=20.0) as client:
            response = await client.post(
                "https://api.openai.com/v1/audio/speech",
                headers={
                    "Authorization": f"Bearer {openai_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "tts-1-hd",     # hd = higher quality, worth the tiny extra cost
                    "input": spoken_text,
                    "voice": req.voice,       # nova or shimmer for warm feminine tone
                    "speed": 0.82,            # slightly slower than default — more meditative
                    "response_format": "mp3",
                },
            )

        if response.status_code != 200:
            raise HTTPException(
                status_code=502,
                detail=f"OpenAI TTS error: {response.status_code}"
            )

        from fastapi.responses import Response
        return Response(
            content=response.content,
            media_type="audio/mpeg",
            headers={
                "Cache-Control": "no-store",
                "X-Voice": req.voice,
            }
        )

    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="TTS request timed out")
    except Exception as e:
        print(f"TTS error: {e}")
        raise HTTPException(status_code=500, detail=f"TTS failed: {str(e)}")


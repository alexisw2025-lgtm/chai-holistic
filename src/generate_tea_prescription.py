"""
generate_tea_prescription.py
Chai Holistic — Personalized Tea Prescription PDF Generator

Usage:
    python generate_tea_prescription.py --output /path/to/output.pdf

Or import and call generate_prescription(profile) directly in a Supabase Edge Function
(via a Python runtime) or any backend process.

profile dict shape (mirrors wellness_profiles Supabase table):
{
    "name": "Alex",
    "email": "alex@example.com",
    "goal": "stress",
    "energy_pattern": "low",
    "stress_level": "high",
    "sleep_quality": "poor",
    "focus": "scattered",
    "time_of_day": ["morning"],
    "top_concerns": ["Nervous system", "Mood support"],
    "rx_blends": ["Stress Less", "Tulsi Awakening", "Adaptogen Blend"],
    "rx_ritual": "Start every morning before caffeine...",
}
"""

import io
import os
import math
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether
)
from reportlab.platypus.flowables import Flowable
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT

# ─── Brand palette ────────────────────────────────────────────────────────────
FOREST   = colors.HexColor("#0d1a11")
FERN     = colors.HexColor("#173322")
SAGE     = colors.HexColor("#275c3e")
SAGE_LT  = colors.HexColor("#3a7a55")
GOLD     = colors.HexColor("#c08830")
GOLD_LT  = colors.HexColor("#deb96a")
GOLD_PAL = colors.HexColor("#fdf5e4")
CREAM    = colors.HexColor("#fef9ef")
PARCHMT  = colors.HexColor("#f5edda")
INK      = colors.HexColor("#1c1c1a")
MIST     = colors.HexColor("#ebf5ef")
WARM_WH  = colors.HexColor("#fffdf7")
SAGE_BG  = colors.HexColor("#e8f2eb")
GOLD_BG  = colors.HexColor("#fdf0d8")

W, H = letter   # 612 x 792 pts

# ─── Goal metadata ────────────────────────────────────────────────────────────
GOAL_META = {
    "sleep":      {"emoji": "🌙", "label": "Deep Sleep & Rest",          "color": "#3A2A5A"},
    "stress":     {"emoji": "🍃", "label": "Stress & Nervous System",     "color": "#275c3e"},
    "energy":     {"emoji": "☀️",  "label": "Natural Energy & Vitality",   "color": "#8B5A2A"},
    "focus":      {"emoji": "🧠", "label": "Focus & Mental Clarity",      "color": "#2A4A6A"},
    "digestion":  {"emoji": "🔥", "label": "Digestion & Gut Health",      "color": "#4A2A1A"},
    "immunity":   {"emoji": "🛡️", "label": "Immune Defense",              "color": "#2A5A3A"},
    "hormone":    {"emoji": "🌸", "label": "Hormone Balance",             "color": "#7A3A6A"},
    "skin":       {"emoji": "✨", "label": "Skin Glow & Beauty",           "color": "#8B7A2A"},
    "cleanse":    {"emoji": "💧", "label": "Detox & Cleanse",             "color": "#2A5A6A"},
    "anxiety":    {"emoji": "💚", "label": "Anxiety & Calm",              "color": "#3A5A3A"},
    "heart":      {"emoji": "❤️", "label": "Heart & Emotional Wellness",  "color": "#8B2A3A"},
    "joints":     {"emoji": "💪", "label": "Joint & Inflammation Relief", "color": "#5A4A2A"},
}

BLEND_NOTES = {
    "Chamomile & Calm":    "Chamomile, lavender & passionflower — deeply soothing, perfect 30 min before bed.",
    "Valerian Rest":       "Valerian root, hops & passionflower — a powerful natural sleep protocol.",
    "Lavender Moon":       "Lavender, rose & chamomile — soft tension release and peaceful evenings.",
    "Sleepy Spice":        "Cinnamon, nutmeg & valerian — ease from evening warmth into deep rest.",
    "Stress Less":         "Ashwagandha, tulsi & passionflower — adaptogenic stress support trio.",
    "Tulsi Awakening":     "Pure tulsi with cardamom — adaptogenic, grounding, deeply clarifying.",
    "Adaptogen Blend":     "Ashwagandha, reishi & eleuthero — long-term resilience through every season.",
    "Skullcap Serenity":   "Skullcap & oat straw — for days when your mind simply won't stop.",
    "Morning Rise":        "Tulsi, ginger & lemon peel — awaken your senses and spark morning clarity.",
    "Ginger Lemon Sunrise":"Fresh ginger, lemon peel & lemongrass — clean, invigorating brightness.",
    "Black Pepper Chai":   "Black pepper, ginger & cloves — fire up metabolism and circulation.",
    "Lemongrass Lift":     "Lemongrass & mint — light, citrusy, alive.",
    "Brain Boost":         "Ginkgo, rosemary & lion's mane — sharpen focus and deepen memory.",
    "Ashwagandha Morning": "Ashwagandha root with cinnamon & ginger — grounded, resilient start.",
    "Digestive Peace":     "Fennel, ginger & peppermint — calm digestion after meals.",
    "Peppermint Night":    "Peppermint & fennel — digest and release before sleep.",
    "Gut Reset":           "Slippery elm & marshmallow root — coat and heal the gut lining.",
    "Elderberry Shield":   "Elderberry, echinacea & ginger — your immune armor.",
    "Turmeric Tonic":      "Turmeric, black pepper & ashwagandha — the anti-inflammatory powerhouse.",
    "Immune Defense Blend":"Elderberry, echinacea & astragalus — deep immune resilience.",
    "Hormone Harmony":     "Vitex, red clover & ashwagandha — hormonal support through the cycle.",
    "Rose & Hibiscus":     "Rose petals & hibiscus — antioxidant-rich, heart-opening, beautiful.",
    "Skin Glow":           "Burdock root, red clover & calendula — beauty brewed from within.",
    "Blood Purifier":      "Red clover, burdock & yellow dock — classical blood cleansing herbs.",
    "Full Body Detox":     "Dandelion, milk thistle & nettle — complete 28-day system reset.",
    "Liver & Love":        "Dandelion root, milk thistle & turmeric — gentle liver love.",
    "Spring Cleanse":      "Nettle, cleavers & dandelion — bloom from the inside out.",
    "Lemon Balm Dreams":   "Lemon balm & passionflower — quiet anxiety before sleep.",
    "Heart's Ease":        "Hawthorn berry, rose & lemon balm — for the tender days.",
    "Bone & Joint":        "Nettle, oat straw & horsetail — nourish bones and connective tissue.",
}

BREW_GUIDE = {
    "sleep":     "Steep 1–2 tsp in near-boiling water (not boiling) for 7–10 minutes. Drink 30–45 min before bed. Add raw honey.",
    "stress":    "Steep 1–2 tsp in just-off-boil water for 7–9 minutes. Breathe in the steam before sipping. No phone.",
    "energy":    "Steep 1 tsp in freshly boiled water for 5–7 minutes. Drink within 20 minutes of waking. Hold both hands around the cup.",
    "focus":     "Steep 1 tsp in just-off-boil water for 7 minutes. Inhale the steam for 30 seconds before drinking.",
    "digestion": "Steep 1–2 tsp in just-off-boil water for 6–8 minutes. Drink 15–20 minutes after meals.",
    "immunity":  "Simmer 2 tsp in water for 10 minutes, then steep 5 more. Add lemon. Drink daily for 14+ days.",
    "hormone":   "Steep 2 tsp for 7–10 minutes in just-off-boil water. Drink daily, consistently for at least 3 cycles.",
    "skin":      "Steep 1–2 tsp for 8 minutes. Drink morning and evening. Consistency is the medicine.",
    "cleanse":   "Steep 2 tsp for 10–12 minutes. Drink 2 cups daily. Increase water intake. Eat clean.",
    "anxiety":   "Steep 1–2 tsp in near-boiling water for 7 minutes. Cup both hands around your mug. Breathe first.",
    "heart":     "Steep 1–2 tsp for 8 minutes. Sip slowly. This tea is meant to be felt, not rushed.",
    "joints":    "Steep 2 tsp for 10 minutes. Add coconut milk to enhance turmeric absorption. Drink twice daily.",
}

WELLNESS_TIPS = [
    "Drink your morning blend before caffeine — let herbs speak first.",
    "Hold your cup with both hands. The warmth is medicine too.",
    "Steep with intention. What do you want from this cup today?",
    "Consistency matters more than perfection. One cup daily beats seven cups once a week.",
    "Your body communicates. Notice how you feel after 7 days of your ritual.",
    "Pair your evening blend with 5 minutes of quiet — no screens.",
]

GOAL_TIPS = {
    "sleep":     ["Avoid blue screens 60 min before bed.", "Keep your evening brew warm, not hot — signal to your body it's safe to unwind.", "Magnesium glycinate pairs well with your evening blend."],
    "stress":    ["Your blend works best when you're not rushing through it.", "Adaptogenic herbs build their effect over weeks — be patient with the process.", "Consider a short walk in natural light daily."],
    "energy":    ["Herbal energy is subtle and sustained — not a spike.", "Ginger and tulsi work synergistically. Don't skip the steep time.", "Hydrate first thing in the morning before your blend."],
    "focus":     ["Lion's mane and ginkgo reach full effect after 2–4 weeks of consistent use.", "Morning blend + 10 min of silence before screens = clarity all day.", "Minimize sugar — it undermines every focus herb."],
    "digestion": ["Digestive herbs work best just after meals — not on an empty stomach.", "Chew slowly. The blend supports what you start with mindful eating.", "Avoid iced drinks with meals; warmth protects digestive fire."],
    "immunity":  ["Elderberry is antiviral; drink it at the first sign of illness.", "Rotate immune blends seasonally — your body adapts.", "Sleep is your immune system's most powerful partner."],
    "hormone":   ["Hormone herbs require patience — allow 2–3 full cycles.", "Track how you feel through the month — morning, midcycle, and before menstruation.", "Reduce xenoestrogens by choosing glass over plastic."],
    "skin":      ["Skin reflects what's happening in the gut and liver — this blend works both.", "Drink 2L of water daily alongside your ritual.", "Your blend works from the inside; sunscreen works from the outside. Both."],
    "cleanse":   ["Increase water intake by at least 500ml daily during your cleanse.", "Avoid alcohol and processed sugar during your cleanse protocol.", "A 14–21 day protocol is more effective than a weekend cleanse."],
    "anxiety":   ["Your nervous system heals slowly — give the herbs 3–4 weeks.", "Consistency at the same time each day trains your body to expect calm.", "Deep diaphragmatic breathing with your evening cup amplifies the effect."],
    "heart":     ["Hawthorn needs 6–8 weeks of consistent use for cardiovascular benefit.", "This blend supports emotional and physical heart. Both are allowed to be tended.", "Reduce sodium and increase leafy greens alongside your ritual."],
    "joints":    ["Turmeric absorption increases dramatically with fat — add coconut milk.", "Anti-inflammatory results typically appear around week 3–4.", "Cold weather and inactivity worsen joint inflammation — gentle daily movement matters."],
}

# ─── Custom Flowables ─────────────────────────────────────────────────────────

class ColoredRect(Flowable):
    """A full-width colored rectangle as a section divider or background."""
    def __init__(self, height, fill_color, width=None):
        Flowable.__init__(self)
        self.rect_height = height
        self.fill_color  = fill_color
        self.rect_width  = width  # None = use available width

    def draw(self):
        w = self.rect_width or self.canv._pagesize[0]
        self.canv.setFillColor(self.fill_color)
        self.canv.rect(0, 0, w, self.rect_height, fill=1, stroke=0)

    def wrap(self, availWidth, availHeight):
        return (availWidth, self.rect_height)


class BlendCard(Flowable):
    """Renders a single blend prescription card."""
    def __init__(self, number, name, note, width):
        Flowable.__init__(self)
        self.number = number
        self.name   = name
        self.note   = note
        self._width = width

    def wrap(self, availWidth, availHeight):
        self._width = availWidth
        return (availWidth, 84)

    def draw(self):
        c = self.canv
        w = self._width
        h = 80

        # Card background
        c.setFillColor(WARM_WH)
        c.roundRect(0, 0, w, h, 10, fill=1, stroke=0)

        # Left accent bar
        c.setFillColor(SAGE)
        c.rect(0, 0, 5, h, fill=1, stroke=0)

        # Number circle
        cx, cy, r = 30, h/2, 13
        c.setFillColor(GOLD)
        c.circle(cx, cy, r, fill=1, stroke=0)
        c.setFillColor(colors.white)
        c.setFont("Helvetica-Bold", 10)
        c.drawCentredString(cx, cy - 4, str(self.number))

        # Name
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(52, h/2 + 6, self.name)

        # Note
        c.setFont("Helvetica", 8.5)
        c.setFillColor(colors.HexColor("#4a6a5a"))
        # Wrap text
        max_w = w - 60
        words = self.note.split()
        line, lines_out = "", []
        for word in words:
            test = (line + " " + word).strip()
            if c.stringWidth(test, "Helvetica", 8.5) < max_w:
                line = test
            else:
                lines_out.append(line)
                line = word
        if line:
            lines_out.append(line)
        y = h/2 - 8
        for ln in lines_out[:2]:
            c.drawString(52, y, ln)
            y -= 12

        # Divider
        c.setStrokeColor(colors.HexColor("#e8f0eb"))
        c.setLineWidth(0.5)
        c.line(0, 0, w, 0)


class OrnamentalDivider(Flowable):
    """A decorative gold divider line with center ornament."""
    def __init__(self, width=None):
        Flowable.__init__(self)
        self._width = width

    def wrap(self, availWidth, availHeight):
        self._width = availWidth
        return (availWidth, 20)

    def draw(self):
        c = self.canv
        w = self._width
        mid = w / 2
        c.setStrokeColor(GOLD)
        c.setLineWidth(0.6)
        # Left line
        c.line(0, 10, mid - 14, 10)
        # Right line
        c.line(mid + 14, 10, w, 10)
        # Center diamond
        c.setFillColor(GOLD)
        c.saveState()
        c.translate(mid, 10)
        c.rotate(45)
        c.rect(-5, -5, 10, 10, fill=1, stroke=0)
        c.restoreState()


class HeaderBanner(Flowable):
    """Full-width header with forest background, brand name, and tagline."""
    def __init__(self, name, goal_label, goal_emoji, width, height=120):
        Flowable.__init__(self)
        self._width  = width
        self._height = height
        self.name        = name
        self.goal_label  = goal_label
        self.goal_emoji  = goal_emoji

    def wrap(self, availWidth, availHeight):
        return (self._width, self._height)

    def draw(self):
        c = self.canv
        w, h = self._width, self._height

        # Forest bg
        c.setFillColor(FOREST)
        c.rect(0, 0, w, h, fill=1, stroke=0)

        # Subtle gold border at bottom
        c.setStrokeColor(GOLD)
        c.setLineWidth(1.5)
        c.line(0, 0, w, 0)

        # Decorative dots top-right
        c.setFillColor(colors.HexColor("#1a3522"))
        for i in range(6):
            for j in range(3):
                c.circle(w - 20 - i*16, h - 15 - j*16, 3, fill=1, stroke=0)

        # Brand name — CHAI HOLISTIC
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 9)
        # Manually spaced brand name
        brand = "CHAI HOLISTIC"
        x_pos = 30
        for ch in brand:
            c.drawString(x_pos, h - 30, ch)
            x_pos += c.stringWidth(ch, "Helvetica-Bold", 9) + 2.5

        # Tagline
        c.setFillColor(colors.HexColor("#8ab89a"))
        c.setFont("Helvetica", 7.5)
        c.drawString(30, h - 44, "chaiholistic.com  ·  sip & heal")

        # Gold rule
        c.setStrokeColor(colors.HexColor("#c08830"))
        c.setLineWidth(0.5)
        c.line(30, h - 52, w - 30, h - 52)

        # "PERSONALIZED TEA PRESCRIPTION"
        c.setFillColor(colors.HexColor("#c8dece"))
        c.setFont("Helvetica", 8)
        label = "PERSONALIZED TEA PRESCRIPTION"
        x_pos = 30
        for ch in label:
            c.drawString(x_pos, h - 66, ch)
            x_pos += c.stringWidth(ch, "Helvetica", 8) + 1.2

        # Recipient name
        first = self.name.split()[0] if self.name else "You"
        c.setFillColor(colors.white)
        c.setFont("Helvetica-Bold", 22)
        c.drawString(30, h - 92, f"{first}'s Wellness Ritual")

        # Goal pill
        pill_text = f"  {self.goal_label}  "
        pill_w = c.stringWidth(pill_text, "Helvetica", 8) + 16
        c.setFillColor(SAGE)
        c.roundRect(30, 8, pill_w, 18, 6, fill=1, stroke=0)
        c.setFillColor(GOLD_LT)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(38, 14, pill_text.strip())


# ─── PDF generator ────────────────────────────────────────────────────────────

def generate_prescription(profile: dict, output_path: str = None) -> bytes:
    """
    Generate a Tea Prescription PDF.

    Args:
        profile: dict with keys: name, email, goal, energy_pattern, stress_level,
                 sleep_quality, focus, time_of_day, top_concerns, rx_blends, rx_ritual
        output_path: if provided, writes to disk. Always returns bytes.

    Returns:
        PDF bytes
    """
    buf = io.BytesIO()

    doc = SimpleDocTemplate(
        buf,
        pagesize=letter,
        topMargin=0,
        bottomMargin=0.5 * inch,
        leftMargin=0.65 * inch,
        rightMargin=0.65 * inch,
    )

    usable_w = W - 1.3 * inch
    story    = []

    # ── Pull profile data ────────────────────────────────────────────────────
    name     = profile.get("name", "").strip() or "Friend"
    goal_key = profile.get("goal", "stress")
    goal_m   = GOAL_META.get(goal_key, {"emoji": "🌿", "label": "Holistic Wellness", "color": "#275c3e"})
    rx       = profile.get("rx_blends", [])
    ritual   = profile.get("rx_ritual", "")
    concerns = profile.get("top_concerns", [])
    brew     = BREW_GUIDE.get(goal_key, BREW_GUIDE["stress"])
    tips     = GOAL_TIPS.get(goal_key, [])

    # ── Styles ───────────────────────────────────────────────────────────────
    def style(name_s, **kw):
        defaults = dict(fontName="Helvetica", fontSize=10, leading=15,
                        textColor=INK, alignment=TA_LEFT)
        defaults.update(kw)
        return ParagraphStyle(name_s, **defaults)

    s_section = style("section",
        fontName="Helvetica-Bold", fontSize=7.5,
        textColor=SAGE, letterSpacing=1.8, alignment=TA_LEFT,
        spaceBefore=0, spaceAfter=6)

    s_body = style("body", fontSize=9, leading=15, textColor=colors.HexColor("#2a3a2e"),
                   spaceBefore=0, spaceAfter=0)

    s_ritual = style("ritual", fontSize=9.5, leading=16.5,
                     textColor=colors.HexColor("#1c3025"),
                     fontName="Helvetica-Oblique")

    s_tip = style("tip", fontSize=8.5, leading=14, textColor=colors.HexColor("#3a5a48"))

    s_small = style("small", fontSize=7.5, leading=12,
                    textColor=colors.HexColor("#6a8a7a"))

    s_footer = style("footer", fontSize=7, leading=11,
                     textColor=colors.HexColor("#8aaa98"), alignment=TA_CENTER)

    s_label = style("label", fontName="Helvetica-Bold", fontSize=8,
                    textColor=GOLD, letterSpacing=1)

    # ── HEADER BANNER ────────────────────────────────────────────────────────
    story.append(HeaderBanner(name, goal_m["label"], goal_m["emoji"], usable_w + 1.3*inch, height=130))
    story.append(Spacer(1, 18))

    # ── INTRO ────────────────────────────────────────────────────────────────
    first = name.split()[0]
    intro_text = (
        f"This prescription was created specifically for {first} based on a personalized "
        f"wellness profile centered around <b>{goal_m['label']}</b>. "
        f"The blends below are chosen to work with your body's natural rhythms, "
        f"not against them. Drink them consistently, brew them with intention, "
        f"and notice what shifts."
    )
    story.append(Paragraph(intro_text, s_body))
    story.append(Spacer(1, 12))
    story.append(OrnamentalDivider(usable_w))
    story.append(Spacer(1, 14))

    # ── PRESCRIBED BLENDS ────────────────────────────────────────────────────
    story.append(Paragraph("PRESCRIBED BLENDS", s_section))
    story.append(Spacer(1, 6))

    for i, blend_name in enumerate(rx):
        note = BLEND_NOTES.get(blend_name, "A carefully curated blend from the Chai Holistic collection.")
        story.append(BlendCard(i + 1, blend_name, note, usable_w))
        story.append(Spacer(1, 8))

    story.append(Spacer(1, 10))

    # ── BREW GUIDE ───────────────────────────────────────────────────────────
    story.append(OrnamentalDivider(usable_w))
    story.append(Spacer(1, 14))
    story.append(Paragraph("BREWING GUIDE", s_section))
    story.append(Spacer(1, 6))

    brew_table_data = [
        [
            Paragraph("<b>Water Temperature</b>", s_label),
            Paragraph("<b>Steep Time</b>", s_label),
            Paragraph("<b>Amount</b>", s_label),
        ],
        [
            Paragraph("Just off the boil\n(195–205°F)", s_tip),
            Paragraph("7–10 minutes", s_tip),
            Paragraph("1–2 tsp per cup", s_tip),
        ],
    ]
    brew_table = Table(brew_table_data, colWidths=[usable_w/3]*3)
    brew_table.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), SAGE_BG),
        ("BACKGROUND", (0,1), (-1,1), WARM_WH),
        ("BOX",        (0,0), (-1,-1), 0.5, SAGE_LT),
        ("INNERGRID",  (0,0), (-1,-1), 0.3, colors.HexColor("#c8dece")),
        ("TOPPADDING",    (0,0), (-1,-1), 7),
        ("BOTTOMPADDING", (0,0), (-1,-1), 7),
        ("LEFTPADDING",   (0,0), (-1,-1), 10),
        ("RIGHTPADDING",  (0,0), (-1,-1), 10),
    ]))
    story.append(brew_table)
    story.append(Spacer(1, 10))
    story.append(Paragraph(f"<b>Specific instructions for your goal:</b> {brew}", s_tip))
    story.append(Spacer(1, 14))

    # ── DAILY RITUAL ─────────────────────────────────────────────────────────
    story.append(OrnamentalDivider(usable_w))
    story.append(Spacer(1, 14))
    story.append(Paragraph("YOUR DAILY RITUAL", s_section))
    story.append(Spacer(1, 6))

    # Ritual box
    ritual_table = Table(
        [[Paragraph(ritual or "Brew your prescribed blend each day with intention. Hold the cup with both hands, breathe in the steam, and set one intention before your first sip.", s_ritual)]],
        colWidths=[usable_w]
    )
    ritual_table.setStyle(TableStyle([
        ("BACKGROUND",    (0,0), (-1,-1), GOLD_BG),
        ("BOX",           (0,0), (-1,-1), 1.0, GOLD),
        ("TOPPADDING",    (0,0), (-1,-1), 14),
        ("BOTTOMPADDING", (0,0), (-1,-1), 14),
        ("LEFTPADDING",   (0,0), (-1,-1), 16),
        ("RIGHTPADDING",  (0,0), (-1,-1), 16),
    ]))
    story.append(ritual_table)
    story.append(Spacer(1, 14))

    # ── WELLNESS TIPS ─────────────────────────────────────────────────────────
    story.append(OrnamentalDivider(usable_w))
    story.append(Spacer(1, 14))
    story.append(Paragraph(f"TIPS FOR {goal_m['label'].upper()}", s_section))
    story.append(Spacer(1, 6))

    for tip in (tips[:3] if tips else WELLNESS_TIPS[:3]):
        story.append(Paragraph(f"<b>✦</b>  {tip}", s_tip))
        story.append(Spacer(1, 5))

    story.append(Spacer(1, 14))

    # ── AREAS OF FOCUS (if concerns captured) ─────────────────────────────────
    if concerns:
        story.append(OrnamentalDivider(usable_w))
        story.append(Spacer(1, 14))
        story.append(Paragraph("ADDITIONAL FOCUS AREAS", s_section))
        story.append(Spacer(1, 6))
        pills_text = "   ·   ".join(concerns)
        story.append(Paragraph(pills_text, style("pills",
            fontName="Helvetica-Bold", fontSize=8.5,
            textColor=SAGE, leading=18)))
        story.append(Paragraph(
            "These areas are on our radar for you. As your ritual evolves, "
            "explore the Chai Holistic catalog for blends that specifically address each one.",
            s_small))
        story.append(Spacer(1, 14))

    # ── GENERAL WELLNESS REMINDERS ────────────────────────────────────────────
    story.append(OrnamentalDivider(usable_w))
    story.append(Spacer(1, 14))
    story.append(Paragraph("UNIVERSAL WELLNESS REMINDERS", s_section))
    story.append(Spacer(1, 6))

    reminders = [
        "Drink your morning blend before caffeine — let herbs speak first.",
        "Hold your cup with both hands. The warmth is part of the medicine.",
        "Consistency matters more than perfection. One cup daily beats seven cups once.",
        "Notice how your body responds after 7 days. Your symptoms are feedback.",
        "Pair your evening blend with 5 minutes of quiet — no screens.",
    ]
    for r in reminders:
        story.append(Paragraph(f"<b>◆</b>  {r}", s_tip))
        story.append(Spacer(1, 4))

    story.append(Spacer(1, 18))

    # ── WHERE TO SHOP ─────────────────────────────────────────────────────────
    shop_data = [[
        Paragraph("<b>🛍 Shop Your Blends</b>\nchaiholistic.com", style("shop",
            fontName="Helvetica-Bold", fontSize=9, leading=15,
            textColor=SAGE, alignment=TA_CENTER)),
        Paragraph("<b>🌙 2AM Companion</b>\n2amcompanion.com", style("shop2",
            fontName="Helvetica-Bold", fontSize=9, leading=15,
            textColor=colors.HexColor("#3A2A5A"), alignment=TA_CENTER)),
        Paragraph("<b>💫 Vibe Shift Ring</b>\nspiralinterrupt.com", style("shop3",
            fontName="Helvetica-Bold", fontSize=9, leading=15,
            textColor=colors.HexColor("#5A4A2A"), alignment=TA_CENTER)),
    ]]
    shop_table = Table(shop_data, colWidths=[usable_w/3]*3)
    shop_table.setStyle(TableStyle([
        ("BACKGROUND",    (0,0), (0,0), MIST),
        ("BACKGROUND",    (1,0), (1,0), colors.HexColor("#ede8f5")),
        ("BACKGROUND",    (2,0), (2,0), colors.HexColor("#f5ede8")),
        ("BOX",           (0,0), (-1,-1), 0.5, colors.HexColor("#d0d0d0")),
        ("INNERGRID",     (0,0), (-1,-1), 0.3, colors.HexColor("#e0e0e0")),
        ("TOPPADDING",    (0,0), (-1,-1), 12),
        ("BOTTOMPADDING", (0,0), (-1,-1), 12),
        ("LEFTPADDING",   (0,0), (-1,-1), 8),
        ("RIGHTPADDING",  (0,0), (-1,-1), 8),
        ("ALIGN",         (0,0), (-1,-1), "CENTER"),
    ]))
    story.append(shop_table)
    story.append(Spacer(1, 16))

    # ── DISCLAIMER ───────────────────────────────────────────────────────────
    story.append(HRFlowable(width=usable_w, thickness=0.4, color=colors.HexColor("#c8dece")))
    story.append(Spacer(1, 8))
    disclaimer = (
        "These statements have not been evaluated by the FDA. This prescription is for "
        "educational and wellness purposes only and is not intended to diagnose, treat, cure, "
        "or prevent any disease. Consult your healthcare provider before use, especially if you "
        "are pregnant, nursing, or taking prescription medications."
    )
    story.append(Paragraph(disclaimer, s_footer))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        f"© 2026 Chai Holistic LLC  ·  Prepared for {name}  ·  chaiholistic.com",
        s_footer))

    # ── BUILD ─────────────────────────────────────────────────────────────────
    doc.build(story)

    pdf_bytes = buf.getvalue()
    buf.close()

    if output_path:
        with open(output_path, "wb") as f:
            f.write(pdf_bytes)

    return pdf_bytes


# ─── CLI / demo ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    SAMPLE_PROFILE = {
        "name":           "Alex Rivera",
        "email":          "alex@example.com",
        "goal":           "stress",
        "energy_pattern": "low",
        "stress_level":   "high",
        "sleep_quality":  "poor",
        "focus":          "scattered",
        "time_of_day":    ["morning"],
        "top_concerns":   ["Nervous system", "Mood support", "Sleep quality"],
        "rx_blends":      ["Stress Less", "Tulsi Awakening", "Adaptogen Blend"],
        "rx_ritual":      (
            "Start every morning before caffeine with 1 cup of your prescribed blend. "
            "Hold the cup with both hands, breathe in the steam for 30 seconds, "
            "and set one intention for the day before your first sip."
        ),
    }

    out = "/mnt/user-data/outputs/tea_prescription_sample.pdf"
    generate_prescription(SAMPLE_PROFILE, out)
    print(f"✦ PDF generated → {out}")

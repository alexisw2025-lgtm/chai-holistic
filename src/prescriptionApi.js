/**
 * prescriptionApi.js
 * Chai Holistic — call the FastAPI prescription service from the React frontend.
 *
 * Add to your Vite project's .env:
 *   VITE_PRESCRIPTION_API_URL=https://your-api.railway.app
 *   VITE_PRESCRIPTION_API_SECRET=the_same_API_SECRET_from_your_server_env
 *
 * Then call sendPrescription(profile) right after your Supabase insert in
 * WellnessProfileModal.jsx — the server generates the PDF and emails it in the background.
 */

const API_URL    = import.meta.env.VITE_PRESCRIPTION_API_URL;
const API_SECRET = import.meta.env.VITE_PRESCRIPTION_API_SECRET;

/**
 * @param {Object} profile  — the same shape as WellnessProfile in main.py
 * @returns {Promise<void>}
 */
export async function sendPrescription(profile) {
  if (!API_URL) {
    console.warn("[chai] VITE_PRESCRIPTION_API_URL not set — skipping prescription email.");
    return;
  }

  const resp = await fetch(`${API_URL}/generate-prescription`, {
    method:  "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": `Bearer ${API_SECRET}`,
    },
    body: JSON.stringify(profile),
  });

  if (!resp.ok) {
    const text = await resp.text();
    console.error("[chai] Prescription API error:", resp.status, text);
    // Non-fatal — Supabase row already saved; user still gets their on-screen result.
    return;
  }

  console.info("[chai] Prescription queued for", profile.email);
}


// ── Usage in WellnessProfileModal.jsx ─────────────────────────────────────────
//
// import { sendPrescription } from "./prescriptionApi";
//
// // Inside handleNext(), after the Supabase insert:
// if (currentStep.id === "email") {
//   setSaving(true);
//   const rx = prescribeTea(answers);
//   setResult(rx);
//
//   // 1. Save to Supabase
//   const { error: dbErr } = await supabase.from("wellness_profiles").insert([{
//     name:           answers.name,
//     email:          answers.email,
//     goal:           answers.goal,
//     energy_pattern: answers.energy,
//     stress_level:   answers.stress,
//     sleep_quality:  answers.sleep,
//     focus:          answers.focus,
//     time_of_day:    [answers.time],
//     top_concerns:   answers.concerns,
//     rx_blends:      rx.rxBlends,
//     rx_ritual:      rx.ritual,
//   }]);
//
//   // 2. Fire off the PDF email (non-blocking — returns 202 immediately)
//   sendPrescription({
//     name:           answers.name,
//     email:          answers.email,
//     goal:           answers.goal,
//     energy_pattern: answers.energy,
//     stress_level:   answers.stress,
//     sleep_quality:  answers.sleep,
//     focus:          answers.focus,
//     time_of_day:    [answers.time],
//     top_concerns:   answers.concerns,
//     rx_blends:      rx.rxBlends,
//     rx_ritual:      rx.ritual,
//   });
//
//   setSaving(false);
// }

/*
  # Create waitlist_signups table

  Stores email capture submissions from the Tea Library "Order from Chai Holistic" section.

  1. New Tables
    - `waitlist_signups`
      - `id` (uuid, primary key)
      - `email` (text, not null) — the submitter's email address
      - `blend_name` (text, not null) — name of the blend they want (e.g. "Deep Sleep & Calm Blend")
      - `signup_type` (text, not null) — one of: 'tea', 'herbs', 'waitlist'
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `waitlist_signups`
    - Allow anonymous inserts (public-facing signup form, no auth required)
    - No select/update/delete policies for public — data is write-only from client
*/

CREATE TABLE IF NOT EXISTS waitlist_signups (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text        NOT NULL,
  blend_name  text        NOT NULL,
  signup_type text        NOT NULL CHECK (signup_type IN ('tea','herbs','waitlist')),
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a waitlist signup"
  ON waitlist_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

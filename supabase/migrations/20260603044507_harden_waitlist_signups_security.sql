/*
  # Harden waitlist_signups security

  Fixes three security issues introduced by the initial migration:

  1. Overly-permissive INSERT policy
     - Old: WITH CHECK (true) — allows any row with no server-side validation
     - New: WITH CHECK that enforces non-empty email matching basic RFC format,
       non-empty blend_name, and valid signup_type values

  2. No email format validation at the column level
     - Adds a CHECK constraint requiring email to match a basic pattern
       (contains @ and at least one dot after the @)

  3. No duplicate prevention
     - Adds a UNIQUE constraint on (email, blend_name, signup_type) so the same
       address cannot spam-register for the same blend+type combination

  Security changes summary:
    - DROP old permissive policy "Anyone can submit a waitlist signup"
    - ADD column-level CHECK constraint: email must look like an email address
    - ADD UNIQUE constraint: (email, blend_name, signup_type)
    - ADD tight RLS INSERT policy with explicit field validation
*/

-- 1. Drop the permissive policy
DROP POLICY IF EXISTS "Anyone can submit a waitlist signup" ON waitlist_signups;

-- 2. Add column-level email format constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'waitlist_signups'
      AND constraint_name = 'waitlist_signups_email_format'
  ) THEN
    ALTER TABLE waitlist_signups
      ADD CONSTRAINT waitlist_signups_email_format
      CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');
  END IF;
END $$;

-- 3. Add unique constraint to prevent duplicate signups
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'waitlist_signups'
      AND constraint_name = 'waitlist_signups_unique_signup'
  ) THEN
    ALTER TABLE waitlist_signups
      ADD CONSTRAINT waitlist_signups_unique_signup
      UNIQUE (email, blend_name, signup_type);
  END IF;
END $$;

-- 4. Add tight INSERT policy — validates all user-supplied fields at the policy level
CREATE POLICY "Anon can insert valid waitlist signup"
  ON waitlist_signups
  FOR INSERT
  TO anon
  WITH CHECK (
    -- email must be non-empty and match basic format
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    -- blend_name must be non-empty and reasonably sized
    AND length(trim(blend_name)) > 0
    AND length(blend_name) <= 200
    -- signup_type must be one of the allowed values
    AND signup_type IN ('tea', 'herbs', 'waitlist')
  );

-- 2026-04-22 : pricing 3 tiers (Essentiel / Pro / Premium)

ALTER TABLE restaurants
  ADD COLUMN IF NOT EXISTS tier TEXT
    CHECK (tier IN ('essentiel', 'pro', 'premium'));

ALTER TABLE restaurants
  ADD COLUMN IF NOT EXISTS billing_cycle TEXT
    CHECK (billing_cycle IN ('monthly', 'annual'));

ALTER TABLE restaurants
  ADD COLUMN IF NOT EXISTS is_launch_offer BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE restaurants
  ADD COLUMN IF NOT EXISTS launch_offer_locked_price NUMERIC(10,2);

ALTER TABLE restaurants
  ADD COLUMN IF NOT EXISTS trial_choose_plan_sent BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN restaurants.tier IS 'NULL pendant trialing ; essentiel|pro|premium après choix du plan';
COMMENT ON COLUMN restaurants.launch_offer_locked_price IS 'Prix HT mensuel verrouillé à vie pour les bénéficiaires du coupon LANCEMENT_GENEVOIS (ex: 24.00)';

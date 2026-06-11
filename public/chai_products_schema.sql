-- ============================================================
-- Chai Holistic — Products Table
-- Run this in your Supabase SQL editor
-- ============================================================

create table if not exists products (
  id            uuid primary key default gen_random_uuid(),
  sku           text unique not null,
  name          text not null,
  category      text not null,  -- tea | tea_cleanse | tea_mens | ring | bundle | tool
  price         numeric(10,2) not null,
  compare_price numeric(10,2),  -- original price for sale display
  in_stock      boolean not null default true,
  stock_qty     integer default 50,
  emoji         text default '',
  tagline       text default '',
  array_key     text not null,  -- maps to JS array name (BLENDS, RINGS, etc.)
  shopify_id    text,           -- populated when you connect Shopify
  updated_at    timestamptz default now(),
  created_at    timestamptz default now()
);

-- Auto-update timestamp
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at
  before update on products
  for each row execute function update_updated_at();

-- RLS: public can read, only authenticated (you) can write
alter table products enable row level security;

create policy "Public read products"
  on products for select using (true);

create policy "Authenticated write products"
  on products for all
  using (auth.role() = 'authenticated');

-- ============================================================
-- Seed data — all 81 products
-- ============================================================
insert into products (sku, name, category, price, in_stock, stock_qty, emoji, tagline, array_key)
values
  ('CH-TEA-MORNINGRISE', 'Morning Rise', 'tea', 17.99, true, 50, '', 'Greet the day with intention', 'BLENDS'),
  ('CH-TEA-GRANDMOTHERS', 'Grandmother''s Cerasee', 'tea', 16.99, true, 50, '', 'Blood cleanser. Sugar balancer. A grandmother''s remedy.', 'BLENDS'),
  ('CH-TEA-CERASEEGINGE', 'Cerasee & Ginger Blend', 'tea', 17.99, true, 50, '', 'The bitterness softened. The medicine intact.', 'BLENDS'),
  ('CH-TEA-CERASEEBLOOD', 'Cerasee Blood Cleanse', 'tea', 19.99, true, 50, '', 'The complete blood and liver protocol.', 'BLENDS'),
  ('CH-TEA-2AMRESET', '2AM Reset', 'tea', 18.99, true, 50, '', 'For restless nights & racing minds', 'BLENDS'),
  ('CH-TEA-CINNAMONCLOV', 'Cinnamon & Cloves', 'tea', 15.99, true, 50, '', 'Warm spice, ancient remedy', 'BLENDS'),
  ('CH-TEA-GINGERLEMONS', 'Ginger Lemon Sunrise', 'tea', 16.99, true, 50, '', 'A sharp, bright awakening', 'BLENDS'),
  ('CH-TEA-TULSIAWAKENI', 'Tulsi Awakening', 'tea', 17.99, true, 50, '', 'The sacred herb, every morning', 'BLENDS'),
  ('CH-TEA-BLACKPEPPERC', 'Black Pepper Chai', 'tea', 18.99, true, 50, '', 'Bold. Warming. Alive.', 'BLENDS'),
  ('CH-TEA-LEMONGRASSLI', 'Lemongrass Lift', 'tea', 15.99, true, 50, '', 'Light, citrusy, alive', 'BLENDS'),
  ('CH-TEA-ASHWAGANDHAM', 'Ashwagandha Morning', 'tea', 20.99, true, 50, '', 'Strength from the root up', 'BLENDS'),
  ('CH-TEA-CHAMOMILECAL', 'Chamomile & Calm', 'tea', 16.99, true, 50, '', 'Slow down. Breathe. Be still.', 'BLENDS'),
  ('CH-TEA-SLEEPYSPICE', 'Sleepy Spice', 'tea', 18.99, true, 50, '', 'Drift off, warmly', 'BLENDS'),
  ('CH-TEA-LEMONBALMDRE', 'Lemon Balm Dreams', 'tea', 16.99, true, 50, '', 'Gentle calm before sleep', 'BLENDS'),
  ('CH-TEA-ROSEHIBISCUS', 'Rose & Hibiscus', 'tea', 17.99, true, 50, '', 'Floral, tart & deeply nourishing', 'BLENDS'),
  ('CH-TEA-VALERIANREST', 'Valerian Rest', 'tea', 19.99, true, 50, '', 'The deep sleep protocol', 'BLENDS'),
  ('CH-TEA-LAVENDERMOON', 'Lavender Moon', 'tea', 17.99, true, 50, '', 'Soften into the night', 'BLENDS'),
  ('CH-TEA-PEPPERMINTNI', 'Peppermint Night', 'tea', 15.99, true, 50, '', 'Digest, release, sleep', 'BLENDS'),
  ('CH-TEA-SKULLCAPSERE', 'Skullcap Serenity', 'tea', 18.99, true, 50, '', 'Quiet the chatter', 'BLENDS'),
  ('CH-TEA-TURMERICTONI', 'Turmeric Tonic', 'tea', 20.99, true, 50, '', 'Golden medicine in every cup', 'BLENDS'),
  ('CH-TEA-ELDERBERRYSH', 'Elderberry Shield', 'tea', 21.99, true, 50, '', 'Your immune armor', 'BLENDS'),
  ('CH-TEA-AUTUMNHARVES', 'Autumn Harvest', 'tea', 17.99, true, 50, '', 'Warm as the falling leaves', 'BLENDS'),
  ('CH-TEA-SPRINGCLEANS', 'Spring Cleanse', 'tea', 18.99, true, 50, '', 'Bloom from the inside out', 'BLENDS'),
  ('CH-TEA-WINTERWARMTH', 'Winter Warmth', 'tea', 17.99, true, 50, '', 'A hug in a cup', 'BLENDS'),
  ('CH-TEA-SUMMERHIBISC', 'Summer Hibiscus', 'tea', 16.99, true, 50, '', 'Bright, tart, alive', 'BLENDS'),
  ('CH-TEA-ADAPTOGENBLE', 'Adaptogen Blend', 'tea', 24.99, true, 50, '', 'Strengthen your foundation', 'BLENDS'),
  ('CH-TEA-DIGESTIVEPEA', 'Digestive Peace', 'tea', 15.99, true, 50, '', 'Settle, soothe, restore', 'BLENDS'),
  ('CH-TEA-HEARTSEASE', 'Heart''s Ease', 'tea', 18.99, true, 50, '', 'For the tender days', 'BLENDS'),
  ('CH-TEA-BRAINBOOST', 'Brain Boost', 'tea', 22.99, true, 50, '', 'Think clearly, remember deeply', 'BLENDS'),
  ('CH-TEA-HORMONEHARMO', 'Hormone Harmony', 'tea', 21.99, true, 50, '', 'Balance from within', 'BLENDS'),
  ('CH-TEA-BONEJOINT', 'Bone & Joint', 'tea', 17.99, true, 50, '', 'Move with ease', 'BLENDS'),
  ('CH-TEA-SKINGLOW', 'Skin Glow', 'tea', 19.99, true, 50, '', 'Beauty brewed from within', 'BLENDS'),
  ('CH-TEA-STRESSLESS', 'Stress Less', 'tea', 20.99, true, 50, '', 'Breathe. Release. Continue.', 'BLENDS'),
  ('CH-TEA-LIVERLOVE', 'Liver & Love', 'tea_cleanse', 19.99, true, 50, '', 'Your body''s filter deserves care', 'CLEANSING'),
  ('CH-TEA-KIDNEYFLUSH', 'Kidney Flush', 'tea_cleanse', 19.99, true, 50, '', 'Clear the channels, flow freely', 'CLEANSING'),
  ('CH-TEA-DEEPLIVERCLE', 'Deep Liver Cleanse', 'tea_cleanse', 21.99, true, 50, '', 'The full liver reset', 'CLEANSING'),
  ('CH-TEA-KIDNEYSTONES', 'Kidney Stone Support', 'tea_cleanse', 22.99, true, 50, '', 'Dissolve, flush, heal', 'CLEANSING'),
  ('CH-TEA-LYMPHMOVER', 'Lymph Mover', 'tea_cleanse', 18.99, true, 50, '', 'Keep it flowing', 'CLEANSING'),
  ('CH-TEA-GUTRESET', 'Gut Reset', 'tea_cleanse', 19.99, true, 50, '', 'Start fresh from the inside', 'CLEANSING'),
  ('CH-TEA-BLOODPURIFIE', 'Blood Purifier', 'tea_cleanse', 19.99, true, 50, '', 'Clean blood, clear life', 'CLEANSING'),
  ('CH-TEA-FULLBODYDETO', 'Full Body Detox', 'tea_cleanse', 24.99, true, 50, '', 'The complete reset', 'CLEANSING'),
  ('CH-TEA-LIVERBILEFLO', 'Liver Bile Flow', 'tea_cleanse', 20.99, true, 50, '', 'Move what needs to move', 'CLEANSING'),
  ('CH-TEA-URINARYTRACT', 'Urinary Tract Clear', 'tea_cleanse', 19.99, true, 50, '', 'Heal, flush, protect', 'CLEANSING'),
  ('CH-TEA-IRONWILLMORN', 'Iron Will Morning', 'tea_mens', 19.99, true, 50, '', 'Rise with purpose and power', 'MEN_BLENDS'),
  ('CH-TEA-DEEPRECHARGE', 'Deep Recharge Sleep', 'tea_mens', 18.99, true, 50, '', 'Testosterone-restoring deep sleep', 'MEN_BLENDS'),
  ('CH-TEA-ALPHABRAINFO', 'Alpha Brain Focus', 'tea_mens', 20.99, true, 50, '', 'Clarity without caffeine or crash', 'MEN_BLENDS'),
  ('CH-TEA-HEARTOFAKING', 'Heart of a King', 'tea_mens', 18.99, true, 50, '', 'Cardiovascular protection', 'MEN_BLENDS'),
  ('CH-TEA-TESTOSTERONE', 'Testosterone Harmony', 'tea_mens', 21.99, true, 50, '', 'Hormonal balance and cortisol control', 'MEN_BLENDS'),
  ('CH-TEA-PRIMALFIRELI', 'Primal Fire Libido', 'tea_mens', 22.99, true, 50, '', 'Vitality and desire restoration', 'MEN_BLENDS'),
  ('CH-TEA-PROSTATESHIE', 'Prostate Shield', 'tea_mens', 20.99, true, 50, '', 'Prevention and long-term prostate health', 'MEN_BLENDS'),
  ('CH-TEA-STRESSARMOUR', 'Stress Armour', 'tea_mens', 19.99, true, 50, '', 'The physiological reality of male stress', 'MEN_BLENDS'),
  ('CH-TEA-MUSCLEANDREC', 'Muscle and Recovery', 'tea_mens', 19.99, true, 50, '', 'Post-training repair and inflammation', 'MEN_BLENDS'),
  ('CH-TEA-BLOODPRESSUR', 'Blood Pressure Balance', 'tea_mens', 18.99, true, 50, '', 'The silent killer addressed directly', 'MEN_BLENDS'),
  ('CH-TEA-MEDITATIONAN', 'Meditation and Stillness', 'tea_mens', 17.99, true, 50, '', 'Permission to go inward', 'MEN_BLENDS'),
  ('CH-TEA-BONEANDJOINT', 'Bone and Joint Fortress', 'tea_mens', 18.99, true, 50, '', 'Structural health for the long game', 'MEN_BLENDS'),
  ('CH-TEA-METABOLICRES', 'Metabolic Reset', 'tea_mens', 19.99, true, 50, '', 'Visceral fat and insulin sensitivity', 'MEN_BLENDS'),
  ('CH-TEA-FATHERSCALME', 'Father''s Calm Evening', 'tea_mens', 17.99, true, 50, '', 'Intentional decompression', 'MEN_BLENDS'),
  ('CH-TEA-PREGAMEPERFO', 'Pre-Game Performance', 'tea_mens', 21.99, true, 50, '', 'Peak output when it matters most', 'MEN_BLENDS'),
  ('CH-TEA-GUTANDDIGEST', 'Gut and Digestion Restore', 'tea_mens', 18.99, true, 50, '', 'The gut-brain axis for men', 'MEN_BLENDS'),
  ('CH-TEA-LIVERDETOXRE', 'Liver Detox Recovery', 'tea_mens', 19.99, true, 50, '', 'Repair without shame', 'MEN_BLENDS'),
  ('CH-TEA-VISIONANDEYE', 'Vision and Eye Protection', 'tea_mens', 18.99, true, 50, '', 'Screen damage addressed directly', 'MEN_BLENDS'),
  ('CH-TEA-BROTHERHOODC', 'Brotherhood Connection', 'tea_mens', 17.99, true, 50, '', 'For the men carrying it alone', 'MEN_BLENDS'),
  ('CH-TEA-THEELDERSWIS', 'The Elder''s Wisdom', 'tea_mens', 22.99, true, 50, '', 'Longevity, depth, and ageing with power', 'MEN_BLENDS'),
  ('CH-RIN-THESPIRAL', 'The Spiral', 'ring', 38.0, true, 50, '', 'Spin your focus back', 'RINGS'),
  ('CH-RIN-THESAGE', 'The Sage', 'ring', 52.0, true, 50, '', 'For the quiet overthinker', 'RINGS'),
  ('CH-RIN-THEANCHOR', 'The Anchor', 'ring', 44.0, true, 50, '', 'Grounded. Present. Locked in.', 'RINGS'),
  ('CH-RIN-THEWHISPER', 'The Whisper', 'ring', 42.0, true, 50, '', 'Carry your calm quietly', 'RINGS'),
  ('CH-RIN-THEINTERRUPT', 'The Interrupt', 'ring', 48.0, true, 50, '', 'Break the pattern. Right now.', 'RINGS'),
  ('CH-RIN-THEFLUX', 'The Flux', 'ring', 46.0, true, 50, '', 'Flow through the noise', 'RINGS'),
  ('CH-BUN-THECLEANSEBU', 'The Cleanse Bundle', 'bundle', 49.99, true, 50, '✦', '', 'BUNDLES'),
  ('CH-BUN-MORNINGEVENI', 'Morning & Evening Ritual', 'bundle', 44.99, true, 50, '☀', '', 'BUNDLES'),
  ('CH-BUN-BLENDYOUROWN', 'Blend-Your-Own Starter', 'bundle', 39.99, true, 50, '🌿', '', 'BUNDLES'),
  ('CH-BUN-IMMUNEFORTRE', 'Immune Fortress', 'bundle', 54.99, true, 50, '🛡', '', 'BUNDLES'),
  ('CH-BUN-SLEEPDEEPBUN', 'Sleep Deep Bundle', 'bundle', 47.99, true, 50, '🌙', '', 'BUNDLES'),
  ('CH-BUN-FULLBODYRESE', 'Full Body Reset', 'bundle', 57.99, true, 50, '🔄', '', 'BUNDLES'),
  ('CH-TOO-CARVEDWOODCU', 'Carved Wood Cup', 'tool', 34.0, true, 50, '🪵', 'The ritual starts in the hands', 'BREW_TOOLS'),
  ('CH-TOO-MATTECERAMIC', 'Matte Ceramic Cup', 'tool', 28.0, true, 50, '☕', 'Earthy. Grounding. Beautiful.', 'BREW_TOOLS'),
  ('CH-TOO-DOUBLEWALLGL', 'Double-Wall Glass Cup', 'tool', 24.0, true, 50, '🫙', 'Watch your brew come alive', 'BREW_TOOLS'),
  ('CH-TOO-STAINLESSFIN', 'Stainless Fine Mesh Strainer', 'tool', 14.0, true, 50, '✦', 'No rushing. No compromises.', 'BREW_TOOLS'),
  ('CH-TOO-CLAYTEAPOT', 'Clay Teapot', 'tool', 58.0, true, 50, '🫖', 'The vessel that holds the ceremony', 'BREW_TOOLS'),
  ('CH-TOO-BAMBOOHONEYD', 'Bamboo Honey Dipper', 'tool', 9.0, true, 50, '🍯', 'One small sweetness', 'BREW_TOOLS')
on conflict (sku) do nothing;

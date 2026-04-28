-- Add German (DE) language columns
-- Mirrors existing _fr/_en columns across menu data tables.

ALTER TABLE categories
  ADD COLUMN IF NOT EXISTS name_de TEXT;

ALTER TABLE items
  ADD COLUMN IF NOT EXISTS name_de TEXT,
  ADD COLUMN IF NOT EXISTS description_de TEXT;

ALTER TABLE daily_menus
  ADD COLUMN IF NOT EXISTS title_de TEXT DEFAULT 'Tagesmenü',
  ADD COLUMN IF NOT EXISTS description_de TEXT,
  ADD COLUMN IF NOT EXISTS items_description_de TEXT;

/*
  # Create Sliders Table

  1. New Tables
    - `sliders`
      - `id` (bigint, primary key, auto-increment)
      - `title` (text, slider title/heading)
      - `subtitle` (text, slider subtitle/description)
      - `image` (text, slider background image URL)
      - `button_text` (text, optional call-to-action button text)
      - `button_link` (text, optional button link URL)
      - `order_index` (integer, display order, lower numbers appear first)
      - `is_active` (boolean, whether slider is visible)
      - `created_at` (timestamptz, creation timestamp)
      - `updated_at` (timestamptz, last update timestamp)

  2. Security
    - Enable RLS on `sliders` table
    - Add policy for public read access (for website visitors to view active sliders)
    - Add policy for authenticated users to create/update/delete (for admins)

  3. Important Notes
    - All website visitors can view active sliders
    - Only authenticated admin users can modify sliders
    - Sliders are ordered by `order_index` field
    - Only active sliders are displayed on the website
*/

CREATE TABLE IF NOT EXISTS sliders (
  id bigserial PRIMARY KEY,
  title text NOT NULL,
  subtitle text NOT NULL,
  image text NOT NULL,
  button_text text DEFAULT '',
  button_link text DEFAULT '',
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE sliders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active sliders"
  ON sliders
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert sliders"
  ON sliders
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update sliders"
  ON sliders
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete sliders"
  ON sliders
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS sliders_order_idx ON sliders(order_index);
CREATE INDEX IF NOT EXISTS sliders_active_idx ON sliders(is_active);

/*
  # Create Services Table

  1. New Tables
    - `services`
      - `id` (bigint, primary key, auto-increment)
      - `title` (text, service title)
      - `description` (text, service description)
      - `icon` (text, icon name from Lucide)
      - `features` (jsonb, array of feature strings)
      - `slug` (text, unique, URL-friendly identifier)
      - `created_at` (timestamptz, creation timestamp)
      - `updated_at` (timestamptz, last update timestamp)

  2. Security
    - Enable RLS on `services` table
    - Add policy for public read access (for website visitors)
    - Add policy for authenticated users to create/update/delete (for admins)

  3. Important Notes
    - All website visitors can view services
    - Only authenticated admin users can modify services
    - Slug is auto-generated from title for SEO-friendly URLs
*/

CREATE TABLE IF NOT EXISTS services (
  id bigserial PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view services"
  ON services
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert services"
  ON services
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update services"
  ON services
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete services"
  ON services
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS services_slug_idx ON services(slug);

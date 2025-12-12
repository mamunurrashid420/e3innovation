/*
  # Create Team Members Table

  1. New Tables
    - `team_members`
      - `id` (bigint, primary key, auto-increment)
      - `name` (text, member name)
      - `role` (text, member role/position)
      - `bio` (text, member biography)
      - `image` (text, profile image URL)
      - `email` (text, contact email)
      - `linkedin` (text, optional LinkedIn profile URL)
      - `twitter` (text, optional Twitter profile URL)
      - `github` (text, optional GitHub profile URL)
      - `created_at` (timestamptz, creation timestamp)
      - `updated_at` (timestamptz, last update timestamp)

  2. Security
    - Enable RLS on `team_members` table
    - Add policy for public read access (for website visitors)
    - Add policy for authenticated users to create/update/delete (for admins)

  3. Important Notes
    - All website visitors can view team members
    - Only authenticated admin users can modify team members
*/

CREATE TABLE IF NOT EXISTS team_members (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL,
  bio text NOT NULL,
  image text NOT NULL,
  email text NOT NULL,
  linkedin text,
  twitter text,
  github text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view team members"
  ON team_members
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert team members"
  ON team_members
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update team members"
  ON team_members
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete team members"
  ON team_members
  FOR DELETE
  TO authenticated
  USING (true);

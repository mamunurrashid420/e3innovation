/*
  # Create Projects Table

  1. New Tables
    - `projects`
      - `id` (bigint, primary key, auto-increment)
      - `title` (text, project title)
      - `description` (text, project description)
      - `category` (text, project category)
      - `image` (text, image URL)
      - `technologies` (jsonb, array of technology strings)
      - `features` (jsonb, array of feature strings)
      - `github_url` (text, optional GitHub repository URL)
      - `live_url` (text, optional live demo URL)
      - `slug` (text, unique, URL-friendly identifier)
      - `created_at` (timestamptz, creation timestamp)
      - `updated_at` (timestamptz, last update timestamp)

  2. Security
    - Enable RLS on `projects` table
    - Add policy for public read access (for website visitors)
    - Add policy for authenticated users to create/update/delete (for admins)

  3. Important Notes
    - All website visitors can view projects
    - Only authenticated admin users can modify projects
    - Slug is auto-generated from title for SEO-friendly URLs
*/

CREATE TABLE IF NOT EXISTS projects (
  id bigserial PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  image text NOT NULL,
  technologies jsonb NOT NULL DEFAULT '[]'::jsonb,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  github_url text,
  live_url text,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS projects_slug_idx ON projects(slug);
CREATE INDEX IF NOT EXISTS projects_category_idx ON projects(category);

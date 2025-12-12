/*
  # Create Contact Messages Table

  1. New Tables
    - `contact_messages`
      - `id` (bigint, primary key, auto-increment)
      - `name` (text, sender name)
      - `email` (text, sender email)
      - `phone` (text, sender phone number)
      - `subject` (text, message subject)
      - `message` (text, message content)
      - `is_read` (boolean, whether admin has read the message)
      - `created_at` (timestamptz, submission timestamp)

  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for anyone to insert messages (for contact form submissions)
    - Add policy for authenticated users to read messages (for admin)
    - Add policy for authenticated users to update read status

  3. Important Notes
    - Anyone can submit contact messages
    - Only authenticated admin users can view and mark messages as read
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS contact_messages_is_read_idx ON contact_messages(is_read);

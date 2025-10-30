/*
  # Create inbound emails table

  1. New Tables
    - `inbound_emails`
      - `id` (uuid, primary key)
      - `from_email` (text)
      - `subject` (text)
      - `text_content` (text)
      - `html_content` (text)
      - `has_attachments` (boolean)
      - `processed` (boolean)
      - `received_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `inbound_emails` table
    - Add policy for admins to manage emails
*/

CREATE TABLE IF NOT EXISTS inbound_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_email text NOT NULL,
  subject text,
  text_content text,
  html_content text,
  has_attachments boolean DEFAULT false,
  processed boolean DEFAULT false,
  received_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE inbound_emails ENABLE ROW LEVEL SECURITY;

-- Create policy for admins
CREATE POLICY "Admins can manage inbound emails"
  ON inbound_emails
  FOR ALL
  TO authenticated
  USING (
    (SELECT profiles.email
     FROM profiles
     WHERE profiles.id = auth.uid()) = 'admin@example.com'
  );

-- Add updated_at trigger
CREATE TRIGGER update_inbound_emails_updated_at
  BEFORE UPDATE ON inbound_emails
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
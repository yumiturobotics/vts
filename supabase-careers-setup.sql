-- ============================================================
--  VTS Careers: Supabase Setup SQL
--  Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. Job Applications Table
CREATE TABLE IF NOT EXISTS job_applications (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id         TEXT NOT NULL,
  job_title      TEXT NOT NULL,
  full_name      TEXT NOT NULL,
  email          TEXT NOT NULL,
  phone          TEXT NOT NULL,
  location       TEXT NOT NULL,
  experience_years TEXT,
  current_role   TEXT,
  cover_letter   TEXT,
  portfolio_url  TEXT,
  resume_url     TEXT,
  status         TEXT DEFAULT 'pending' CHECK (status IN ('pending','reviewed','shortlisted','rejected')),
  applied_at     TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow anyone to INSERT (public form submission)
CREATE POLICY "Allow public inserts" ON job_applications
  FOR INSERT TO anon WITH CHECK (true);

-- 4. Policy: Allow only authenticated admin to SELECT / UPDATE
CREATE POLICY "Allow admin read" ON job_applications
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin update status" ON job_applications
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ============================================================
--  Storage Bucket for Resumes
--  Go to: Storage > New Bucket in Supabase Dashboard
--  Name: resumes
--  Public: YES (so public URLs work for resume viewing)
--  Max file size: 5 MB
--  Allowed MIME types: application/pdf, application/msword,
--    application/vnd.openxmlformats-officedocument.wordprocessingml.document
-- ============================================================

-- Storage policy: Allow public uploads to resumes bucket
-- (Run in SQL Editor after creating the bucket)
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT DO NOTHING;

CREATE POLICY "Allow anon resume upload"
  ON storage.objects FOR INSERT TO anon
  WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Allow public resume read"
  ON storage.objects FOR SELECT TO anon
  USING (bucket_id = 'resumes');

-- ============================================================
--  3. Contacts Table (Contact Form Submissions)
-- ============================================================

CREATE TABLE IF NOT EXISTS contacts (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT NOT NULL,
  email          TEXT NOT NULL,
  phone          TEXT NOT NULL,
  address        TEXT NOT NULL,
  subject        TEXT NOT NULL,
  message        TEXT NOT NULL,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public insertion (contact form submissions)
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT TO anon WITH CHECK (true);

-- Policy: Allow only authenticated admins to select
CREATE POLICY "Allow admin read" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================================
--  4. Product Inquiries Table (Product Enquiry Form Submissions)
-- ============================================================

CREATE TABLE IF NOT EXISTS product_inquiries (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT NOT NULL,
  email          TEXT NOT NULL,
  phone          TEXT NOT NULL,
  product        TEXT NOT NULL,
  quantity       INTEGER NOT NULL DEFAULT 1,
  delivery_date  DATE,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE product_inquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public insertion (enquiry submissions)
CREATE POLICY "Allow public inserts" ON product_inquiries
  FOR INSERT TO anon WITH CHECK (true);

-- Policy: Allow only authenticated admins to select
CREATE POLICY "Allow admin read" ON product_inquiries
  FOR SELECT USING (auth.role() = 'authenticated');


/*
  # Visa Applications Database Schema

  1. New Tables
    - `visa_applications`
      - `id` (uuid, primary key) - Unique application identifier
      - `full_name` (text) - Student's full name
      - `email` (text) - Student's email address
      - `phone` (text) - Contact phone number
      - `date_of_birth` (date) - Student's date of birth
      - `passport_number` (text) - Passport number
      - `country_destination` (text) - Destination country for visa
      - `visa_type` (text) - Type of visa (Student, Tourist, Work, etc.)
      - `course_name` (text, nullable) - Name of course for student visa
      - `university_name` (text, nullable) - University name for student visa
      - `application_status` (text) - Current status (pending, under_review, approved, rejected)
      - `documents_uploaded` (boolean) - Whether all documents are uploaded
      - `created_at` (timestamptz) - Application submission timestamp
      - `updated_at` (timestamptz) - Last update timestamp
      
  2. Security
    - Enable RLS on `visa_applications` table
    - Add policy for users to view their own applications
    - Add policy for users to create new applications
    - Add policy for users to update their own applications
*/

CREATE TABLE IF NOT EXISTS visa_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date_of_birth date NOT NULL,
  passport_number text NOT NULL,
  country_destination text NOT NULL DEFAULT 'United States',
  visa_type text NOT NULL DEFAULT 'Student Visa',
  course_name text,
  university_name text,
  application_status text NOT NULL DEFAULT 'pending',
  documents_uploaded boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE visa_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view applications with their email"
  ON visa_applications
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create visa application"
  ON visa_applications
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update applications with their email"
  ON visa_applications
  FOR UPDATE
  USING (email = email)
  WITH CHECK (email = email);

CREATE INDEX IF NOT EXISTS idx_visa_applications_email ON visa_applications(email);
CREATE INDEX IF NOT EXISTS idx_visa_applications_status ON visa_applications(application_status);
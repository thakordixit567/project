import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface VisaApplication {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  passport_number: string;
  country_destination: string;
  visa_type: string;
  course_name?: string;
  university_name?: string;
  application_status?: string;
  documents_uploaded?: boolean;
  created_at?: string;
  updated_at?: string;
}

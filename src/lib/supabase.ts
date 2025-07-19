
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface UserProfile {
  id: string
  email: string
  role: 'admin' | 'doctor' | 'patient'
  created_at: string
}

export interface AdminProfile {
  user_id: string
  name: string
  created_at: string
}

export interface DoctorProfile {
  user_id: string
  name: string
  qualifications: string
  years_of_experience: number
  created_at: string
}

export interface PatientProfile {
  user_id: string
  name: string
  gender: 'male' | 'female' | 'other'
  date_of_birth: string
  unique_id: string
  created_at: string
}

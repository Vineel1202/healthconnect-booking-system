
import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, UserProfile, AdminProfile, DoctorProfile, PatientProfile } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  userRole: 'admin' | 'doctor' | 'patient' | null
  userProfile: AdminProfile | DoctorProfile | PatientProfile | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, role: 'admin' | 'doctor' | 'patient', profileData: any) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (profileData: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<'admin' | 'doctor' | 'patient' | null>(null)
  const [userProfile, setUserProfile] = useState<AdminProfile | DoctorProfile | PatientProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserProfile(session.user.id)
      } else {
        setUserRole(null)
        setUserProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      // First, get user role from user_profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', userId)
        .single()

      if (profileError) throw profileError

      const role = profileData.role
      setUserRole(role)

      // Then fetch role-specific profile
      let profileQuery
      switch (role) {
        case 'admin':
          profileQuery = supabase.from('admin_profiles').select('*').eq('user_id', userId).single()
          break
        case 'doctor':
          profileQuery = supabase.from('doctor_profiles').select('*').eq('user_id', userId).single()
          break
        case 'patient':
          profileQuery = supabase.from('patient_profiles').select('*').eq('user_id', userId).single()
          break
        default:
          throw new Error('Invalid user role')
      }

      const { data: roleProfile, error: roleError } = await profileQuery
      if (roleError) throw roleError

      setUserProfile(roleProfile)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, role: 'admin' | 'doctor' | 'patient', profileData: any) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) throw authError
      if (!authData.user) throw new Error('No user returned from signup')

      // Create user profile record
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([{ id: authData.user.id, email, role }])

      if (profileError) throw profileError

      // Create role-specific profile
      let roleProfileData
      let tableName
      
      switch (role) {
        case 'admin':
          tableName = 'admin_profiles'
          roleProfileData = {
            user_id: authData.user.id,
            name: profileData.name
          }
          break
        case 'doctor':
          tableName = 'doctor_profiles'
          roleProfileData = {
            user_id: authData.user.id,
            name: profileData.name,
            qualifications: profileData.qualifications,
            years_of_experience: profileData.yearsOfExperience
          }
          break
        case 'patient':
          tableName = 'patient_profiles'
          roleProfileData = {
            user_id: authData.user.id,
            name: profileData.name,
            gender: profileData.gender,
            date_of_birth: profileData.dateOfBirth,
            unique_id: profileData.uniqueId
          }
          break
        default:
          throw new Error('Invalid role')
      }

      const { error: roleError } = await supabase
        .from(tableName)
        .insert([roleProfileData])

      if (roleError) throw roleError

    } catch (error) {
      console.error('Error during signup:', error)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const updateProfile = async (profileData: any) => {
    if (!user || !userRole) throw new Error('No authenticated user')

    let tableName
    switch (userRole) {
      case 'admin':
        tableName = 'admin_profiles'
        break
      case 'doctor':
        tableName = 'doctor_profiles'
        break
      case 'patient':
        tableName = 'patient_profiles'
        break
      default:
        throw new Error('Invalid user role')
    }

    const { error } = await supabase
      .from(tableName)
      .update(profileData)
      .eq('user_id', user.id)

    if (error) throw error

    // Refresh profile data
    await fetchUserProfile(user.id)
  }

  const value = {
    user,
    userRole,
    userProfile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

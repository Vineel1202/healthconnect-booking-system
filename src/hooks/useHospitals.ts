
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/contexts/AuthContext'

export interface Hospital {
  id: string
  name: string
  location: string
  admin_id: string
  created_at: string
  updated_at: string
}

export interface Department {
  id: string
  name: string
  hospital_id: string
  created_at: string
  updated_at: string
}

export interface CommonDepartment {
  id: string
  name: string
  description?: string
}

export const useHospitals = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const { data: hospitals, isLoading, error } = useQuery({
    queryKey: ['hospitals', user?.id],
    queryFn: async () => {
      if (!user) return []
      
      const { data, error } = await (supabase as any)
        .from('hospitals')
        .select('*')
        .eq('admin_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as Hospital[]
    },
    enabled: !!user,
  })

  const createHospitalMutation = useMutation({
    mutationFn: async ({ name, location }: { name: string; location: string }) => {
      if (!user) throw new Error('User not authenticated')
      
      const { data, error } = await (supabase as any)
        .from('hospitals')
        .insert([{ name, location, admin_id: user.id }])
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hospitals'] })
    },
  })

  const updateHospitalMutation = useMutation({
    mutationFn: async ({ id, name, location }: { id: string; name: string; location: string }) => {
      const { data, error } = await (supabase as any)
        .from('hospitals')
        .update({ name, location })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hospitals'] })
    },
  })

  const deleteHospitalMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any)
        .from('hospitals')
        .delete()
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hospitals'] })
    },
  })

  return {
    hospitals: hospitals || [],
    isLoading,
    error,
    createHospital: createHospitalMutation.mutate,
    updateHospital: updateHospitalMutation.mutate,
    deleteHospital: deleteHospitalMutation.mutate,
  }
}

export const useDepartments = (hospitalId?: string) => {
  const queryClient = useQueryClient()

  const { data: departments, isLoading, error } = useQuery({
    queryKey: ['departments', hospitalId],
    queryFn: async () => {
      if (!hospitalId) return []
      
      const { data, error } = await (supabase as any)
        .from('departments')
        .select('*')
        .eq('hospital_id', hospitalId)
        .order('name', { ascending: true })

      if (error) throw error
      return data as Department[]
    },
    enabled: !!hospitalId,
  })

  const { data: commonDepartments } = useQuery({
    queryKey: ['common-departments'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('common_departments')
        .select('*')
        .order('name', { ascending: true })

      if (error) throw error
      return data as CommonDepartment[]
    },
  })

  const createDepartmentMutation = useMutation({
    mutationFn: async ({ name, hospitalId: hId }: { name: string; hospitalId: string }) => {
      const { data, error } = await (supabase as any)
        .from('departments')
        .insert([{ name, hospital_id: hId }])
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments', hospitalId] })
    },
  })

  const deleteDepartmentMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any)
        .from('departments')
        .delete()
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments', hospitalId] })
    },
  })

  return {
    departments: departments || [],
    commonDepartments: commonDepartments || [],
    isLoading,
    error,
    createDepartment: createDepartmentMutation.mutate,
    deleteDepartment: deleteDepartmentMutation.mutate,
  }
}

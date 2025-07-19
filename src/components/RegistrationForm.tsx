import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/hooks/use-toast'

const adminSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const doctorSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  qualifications: z.string().min(2, 'Qualifications are required'),
  yearsOfExperience: z.number().min(0, 'Years of experience must be positive'),
})

const patientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.date(),
  uniqueId: z.string().min(5, 'Unique ID is required'),
})

interface RegistrationFormProps {
  role: 'admin' | 'doctor' | 'patient'
  onBack: () => void
}

export const RegistrationForm = ({ role, onBack }: RegistrationFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { signUp } = useAuth()

  const getSchema = () => {
    switch (role) {
      case 'admin': return adminSchema
      case 'doctor': return doctorSchema
      case 'patient': return patientSchema
    }
  }

  const form = useForm({
    resolver: zodResolver(getSchema()),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      ...(role === 'doctor' && { qualifications: '', yearsOfExperience: 0 }),
      ...(role === 'patient' && { gender: undefined, dateOfBirth: undefined, uniqueId: '' }),
    }
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      await signUp(data.email, data.password, role, data)
      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account.",
      })
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleTitle = () => {
    switch (role) {
      case 'admin': return 'Hospital Administrator'
      case 'doctor': return 'Doctor'
      case 'patient': return 'Patient'
    }
  }

  return (
    <Card className="max-w-md mx-auto shadow-medical">
      <CardHeader className="text-center">
        <CardTitle className="text-medical-navy">Register as {getRoleTitle()}</CardTitle>
        <CardDescription>
          Create your account to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="Enter your full name"
            />
            {form.formState.errors.name?.message && (
              <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...form.register('email')}
              placeholder="Enter your email"
            />
            {form.formState.errors.email?.message && (
              <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...form.register('password')}
              placeholder="Enter your password"
            />
            {form.formState.errors.password?.message && (
              <p className="text-sm text-red-600">{form.formState.errors.password.message}</p>
            )}
          </div>

          {role === 'doctor' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="qualifications">Qualifications</Label>
                <Input
                  id="qualifications"
                  {...form.register('qualifications')}
                  placeholder="e.g., MBBS, MD, MS"
                />
                {form.formState.errors.qualifications?.message && (
                  <p className="text-sm text-red-600">{form.formState.errors.qualifications.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Input
                  id="yearsOfExperience"
                  type="number"
                  min="0"
                  {...form.register('yearsOfExperience', { valueAsNumber: true })}
                  placeholder="Enter years of experience"
                />
                {form.formState.errors.yearsOfExperience?.message && (
                  <p className="text-sm text-red-600">{form.formState.errors.yearsOfExperience.message}</p>
                )}
              </div>
            </>
          )}

          {role === 'patient' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => form.setValue('gender', value as 'male' | 'female' | 'other')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.gender?.message && (
                  <p className="text-sm text-red-600">{form.formState.errors.gender.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !form.watch('dateOfBirth') && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.watch('dateOfBirth') ? format(form.watch('dateOfBirth'), "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={form.watch('dateOfBirth')}
                      onSelect={(date) => form.setValue('dateOfBirth', date as Date)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                {form.formState.errors.dateOfBirth?.message && (
                  <p className="text-sm text-red-600">{form.formState.errors.dateOfBirth.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="uniqueId">Unique ID (Aadhar/Passport)</Label>
                <Input
                  id="uniqueId"
                  {...form.register('uniqueId')}
                  placeholder="Enter your Aadhar or Passport number"
                />
                {form.formState.errors.uniqueId?.message && (
                  <p className="text-sm text-red-600">{form.formState.errors.uniqueId.message}</p>
                )}
              </div>
            </>
          )}

          <div className="space-y-3">
            <Button 
              type="submit" 
              className="w-full bg-gradient-medical hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={onBack}
            >
              Back to Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

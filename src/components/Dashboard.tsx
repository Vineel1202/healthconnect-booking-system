
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Stethoscope, User } from 'lucide-react'

export const Dashboard = () => {
  const { userRole, userProfile, signOut } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const getRoleName = () => {
    switch (userRole) {
      case 'admin': return 'Hospital Administrator'
      case 'doctor': return 'Doctor'
      case 'patient': return 'Patient'
      default: return 'User'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-medical p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-medical-navy">MediCare System</h1>
                <p className="text-sm text-muted-foreground">{getRoleName()} Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {userProfile?.name || 'User'}
              </span>
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {getRoleName()} Dashboard
              </CardTitle>
              <CardDescription>
                Welcome to your personalized dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-medical-navy mb-2">Profile Information</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Name:</strong> {userProfile?.name}</p>
                    <p><strong>Role:</strong> {getRoleName()}</p>
                    {userRole === 'doctor' && (
                      <>
                        <p><strong>Qualifications:</strong> {(userProfile as any)?.qualifications}</p>
                        <p><strong>Experience:</strong> {(userProfile as any)?.years_of_experience} years</p>
                      </>
                    )}
                    {userRole === 'patient' && (
                      <>
                        <p><strong>Gender:</strong> {(userProfile as any)?.gender}</p>
                        <p><strong>Date of Birth:</strong> {(userProfile as any)?.date_of_birth}</p>
                        <p><strong>Unique ID:</strong> {(userProfile as any)?.unique_id}</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    More features will be available in the next development phases.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

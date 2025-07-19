
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Building2, Stethoscope, Users, Calendar, TrendingUp } from 'lucide-react';
import { LoginForm } from '@/components/LoginForm';
import { RegistrationForm } from '@/components/RegistrationForm';
import { Dashboard } from '@/components/Dashboard';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationRole, setRegistrationRole] = useState<'admin' | 'doctor' | 'patient'>('admin');
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Dashboard />;
  }

  if (showRegistration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-medical-navy mb-4">Create Your Account</h1>
            <p className="text-muted-foreground text-lg">Join the MediCare System</p>
          </div>
          <RegistrationForm 
            role={registrationRole} 
            onBack={() => setShowRegistration(false)} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 p-4 rounded-full">
                <Stethoscope className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              MediCare System
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Comprehensive Hospital & Appointment Management Platform for Hospitals, Doctors, and Patients
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center text-white/90 bg-white/20 px-4 py-2 rounded-full">
                <Building2 className="h-5 w-5 mr-2" />
                Hospital Management
              </div>
              <div className="flex items-center text-white/90 bg-white/20 px-4 py-2 rounded-full">
                <Stethoscope className="h-5 w-5 mr-2" />
                Doctor Scheduling
              </div>
              <div className="flex items-center text-white/90 bg-white/20 px-4 py-2 rounded-full">
                <Calendar className="h-5 w-5 mr-2" />
                Appointment Booking
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-medical-navy mb-4">Access Your Account</h2>
          <p className="text-muted-foreground text-lg">Login to your dashboard or create a new account</p>
        </div>

        <Tabs defaultValue="admin" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Admin
            </TabsTrigger>
            <TabsTrigger value="doctor" className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4" />
              Doctor
            </TabsTrigger>
            <TabsTrigger value="patient" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Patient
            </TabsTrigger>
          </TabsList>

          <TabsContent value="admin">
            <Card className="max-w-md mx-auto shadow-medical">
              <CardHeader className="text-center">
                <div className="bg-gradient-medical p-3 rounded-full w-fit mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-medical-navy">Hospital Administrator</CardTitle>
                <CardDescription>
                  Manage hospitals, departments, and view analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm role="admin" />
                <div className="mt-4 text-center">
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setRegistrationRole('admin');
                      setShowRegistration(true);
                    }}
                    className="text-medical-blue"
                  >
                    Don't have an account? Register here
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doctor">
            <Card className="max-w-md mx-auto shadow-medical">
              <CardHeader className="text-center">
                <div className="bg-gradient-medical p-3 rounded-full w-fit mx-auto mb-4">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-medical-navy">Doctor</CardTitle>
                <CardDescription>
                  Manage your schedule, appointments, and availability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm role="doctor" />
                <div className="mt-4 text-center">
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setRegistrationRole('doctor');
                      setShowRegistration(true);
                    }}
                    className="text-medical-blue"
                  >
                    Don't have an account? Register here
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patient">
            <Card className="max-w-md mx-auto shadow-medical">
              <CardHeader className="text-center">
                <div className="bg-gradient-medical p-3 rounded-full w-fit mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-medical-navy">Patient</CardTitle>
                <CardDescription>
                  Book appointments and manage your health records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm role="patient" />
                <div className="mt-4 text-center">
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setRegistrationRole('patient');
                      setShowRegistration(true);
                    }}
                    className="text-medical-blue"
                  >
                    Don't have an account? Register here
                  </Button>
                </div>                
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-medical-navy mb-4">Platform Features</h2>
            <p className="text-muted-foreground text-lg">Everything you need to manage healthcare operations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center shadow-card-custom hover:shadow-medical transition-shadow">
              <CardHeader>
                <div className="bg-medical-blue/10 p-3 rounded-full w-fit mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-medical-blue" />
                </div>
                <CardTitle className="text-medical-navy">Hospital Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete hospital administration with department management, doctor associations, and revenue tracking.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card-custom hover:shadow-medical transition-shadow">
              <CardHeader>
                <div className="bg-medical-green/10 p-3 rounded-full w-fit mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-medical-green" />
                </div>
                <CardTitle className="text-medical-navy">Smart Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced scheduling system with conflict detection, availability management, and automated booking.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card-custom hover:shadow-medical transition-shadow">
              <CardHeader>
                <div className="bg-medical-teal/10 p-3 rounded-full w-fit mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-medical-teal" />
                </div>
                <CardTitle className="text-medical-navy">Revenue Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive revenue tracking with automatic fee distribution and detailed analytics reporting.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

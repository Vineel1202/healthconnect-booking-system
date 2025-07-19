import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign, 
  UserPlus, 
  Plus,
  Calendar,
  Stethoscope,
  Edit,
  Trash2
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock data
const mockHospitals = [
  { id: 1, name: 'Central Medical Center', location: 'Downtown', doctors: 15, revenue: 45000 },
  { id: 2, name: 'St. Mary\'s Hospital', location: 'Uptown', doctors: 22, revenue: 67000 },
];

const mockDepartments = [
  { id: 1, name: 'Cardiology', hospitalId: 1, doctors: 5, revenue: 18000 },
  { id: 2, name: 'Orthopedics', hospitalId: 1, doctors: 4, revenue: 15000 },
  { id: 3, name: 'Pediatrics', hospitalId: 1, doctors: 6, revenue: 12000 },
  { id: 4, name: 'Cardiology', hospitalId: 2, doctors: 8, revenue: 28000 },
  { id: 5, name: 'Neurology', hospitalId: 2, doctors: 6, revenue: 22000 },
  { id: 6, name: 'Emergency', hospitalId: 2, doctors: 8, revenue: 17000 },
];

const mockDoctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiology', hospitalId: 1, experience: 8, earnings: 12000 },
  { id: 2, name: 'Dr. Michael Chen', specialization: 'Orthopedics', hospitalId: 1, experience: 12, earnings: 10800 },
  { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'Pediatrics', hospitalId: 1, experience: 6, earnings: 8400 },
  { id: 4, name: 'Dr. David Kumar', specialization: 'Cardiology', hospitalId: 2, experience: 15, earnings: 16800 },
  { id: 5, name: 'Dr. Lisa Thompson', specialization: 'Neurology', hospitalId: 2, experience: 10, earnings: 14400 },
];

export const AdminDashboard = () => {
  const [selectedHospital, setSelectedHospital] = useState<number>(1);
  const [newHospital, setNewHospital] = useState({ name: '', location: '' });
  const [newDepartment, setNewDepartment] = useState('');

  const currentHospital = mockHospitals.find(h => h.id === selectedHospital);
  const hospitalDepartments = mockDepartments.filter(d => d.hospitalId === selectedHospital);
  const hospitalDoctors = mockDoctors.filter(d => d.hospitalId === selectedHospital);

  const totalRevenue = mockHospitals.reduce((sum, h) => sum + h.revenue, 0);
  const totalDoctors = mockHospitals.reduce((sum, h) => sum + h.doctors, 0);
  const totalConsultations = 324; // Mock data

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-medical-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medical-navy">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hospitals</CardTitle>
            <Building2 className="h-4 w-4 text-medical-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medical-navy">{mockHospitals.length}</div>
            <p className="text-xs text-muted-foreground">
              Across multiple locations
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
            <Stethoscope className="h-4 w-4 text-medical-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medical-navy">{totalDoctors}</div>
            <p className="text-xs text-muted-foreground">
              +3 new this month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Consultations</CardTitle>
            <Calendar className="h-4 w-4 text-medical-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medical-navy">{totalConsultations}</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value="hospitals" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="hospitals" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-medical-navy">Hospital Management</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-medical hover:opacity-90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Hospital
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Register New Hospital</DialogTitle>
                  <DialogDescription>Add a new hospital to the system</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="hospital-name">Hospital Name</Label>
                    <Input 
                      id="hospital-name" 
                      value={newHospital.name}
                      onChange={(e) => setNewHospital({...newHospital, name: e.target.value})}
                      placeholder="Enter hospital name" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="hospital-location">Location</Label>
                    <Input 
                      id="hospital-location" 
                      value={newHospital.location}
                      onChange={(e) => setNewHospital({...newHospital, location: e.target.value})}
                      placeholder="Enter hospital location" 
                    />
                  </div>
                  <Button className="w-full bg-gradient-medical hover:opacity-90">
                    Register Hospital
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {mockHospitals.map((hospital) => (
              <Card key={hospital.id} className="shadow-card-custom hover:shadow-medical transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-medical-navy">{hospital.name}</CardTitle>
                      <CardDescription>{hospital.location}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-medical-blue">{hospital.doctors}</div>
                      <div className="text-sm text-muted-foreground">Doctors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-medical-green">${hospital.revenue.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Revenue</div>
                    </div>
                    <div className="text-center">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedHospital(hospital.id)}
                        className={selectedHospital === hospital.id ? 'bg-medical-blue text-white' : ''}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-medical-navy">Department Management</h3>
              <p className="text-sm text-muted-foreground">
                Managing departments for: {currentHospital?.name}
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-medical hover:opacity-90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Department
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Department</DialogTitle>
                  <DialogDescription>Create a new department for {currentHospital?.name}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="dept-name">Department Name</Label>
                    <Input 
                      id="dept-name" 
                      value={newDepartment}
                      onChange={(e) => setNewDepartment(e.target.value)}
                      placeholder="e.g. Cardiology, Orthopedics" 
                    />
                  </div>
                  <Button className="w-full bg-gradient-medical hover:opacity-90">
                    Create Department
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {hospitalDepartments.map((dept) => (
              <Card key={dept.id} className="shadow-card-custom">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-medical-navy">{dept.name}</h4>
                      <p className="text-sm text-muted-foreground">{dept.doctors} doctors assigned</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-medical-green">${dept.revenue.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Revenue</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="doctors" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-medical-navy">Doctor Overview</h3>
              <p className="text-sm text-muted-foreground">
                Doctors at: {currentHospital?.name}
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {hospitalDoctors.map((doctor) => (
              <Card key={doctor.id} className="shadow-card-custom">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-medical p-2 rounded-full">
                        <Stethoscope className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-medical-navy">{doctor.name}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{doctor.specialization}</Badge>
                          <span className="text-sm text-muted-foreground">{doctor.experience} years exp.</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-medical-green">${doctor.earnings.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Monthly earnings</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-medical-navy mb-4">Revenue Analytics</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle className="text-medical-navy">Revenue by Hospital</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockHospitals.map((hospital) => (
                    <div key={hospital.id} className="flex justify-between items-center">
                      <span className="text-sm">{hospital.name}</span>
                      <span className="font-semibold text-medical-green">${hospital.revenue.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle className="text-medical-navy">Revenue by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hospitalDepartments.map((dept) => (
                    <div key={dept.id} className="flex justify-between items-center">
                      <span className="text-sm">{dept.name}</span>
                      <span className="font-semibold text-medical-green">${dept.revenue.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
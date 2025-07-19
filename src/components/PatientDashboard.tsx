import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar,
  Stethoscope,
  Clock,
  Search,
  Plus,
  Building2,
  User,
  History
} from 'lucide-react';

// Mock data
const mockDoctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiology', hospital: 'Central Medical Center', experience: 8, fee: 200, available: true },
  { id: 2, name: 'Dr. Michael Chen', specialization: 'Orthopedics', hospital: 'Central Medical Center', experience: 12, fee: 180, available: true },
  { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'Pediatrics', hospital: 'St. Mary\'s Hospital', experience: 6, fee: 150, available: false },
];

const mockAppointments = [
  { id: 1, doctorName: 'Dr. Sarah Johnson', hospital: 'Central Medical Center', date: '2024-01-20', time: '10:00 AM', status: 'upcoming', fee: 200 },
  { id: 2, doctorName: 'Dr. Michael Chen', hospital: 'Central Medical Center', date: '2024-01-10', time: '2:00 PM', status: 'completed', fee: 180 },
];

export const PatientDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  const upcomingAppointments = mockAppointments.filter(apt => apt.status === 'upcoming').length;
  const totalConsultations = mockAppointments.filter(apt => apt.status === 'completed').length;

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-medical-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medical-navy">{upcomingAppointments}</div>
            <p className="text-xs text-muted-foreground">Scheduled consultations</p>
          </CardContent>
        </Card>

        <Card className="shadow-card-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Consultations</CardTitle>
            <Stethoscope className="h-4 w-4 text-medical-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medical-navy">{totalConsultations}</div>
            <p className="text-xs text-muted-foreground">Completed visits</p>
          </CardContent>
        </Card>

        <Card className="shadow-card-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Records</CardTitle>
            <History className="h-4 w-4 text-medical-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medical-navy">{mockAppointments.length}</div>
            <p className="text-xs text-muted-foreground">Medical records</p>
          </CardContent>
        </Card>
      </div>

      {/* Doctor Search */}
      <Card className="shadow-card-custom">
        <CardHeader>
          <CardTitle className="text-medical-navy">Find a Doctor</CardTitle>
          <CardDescription>Search and book appointments with available doctors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-gradient-medical hover:opacity-90">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Doctors */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-medical-navy">Available Doctors</h3>
        {mockDoctors.map((doctor) => (
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
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Building2 className="h-3 w-3 mr-1" />
                      {doctor.hospital}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-semibold text-medical-green">${doctor.fee}</div>
                    <div className="text-sm text-muted-foreground">Consultation</div>
                  </div>
                  <Button 
                    disabled={!doctor.available}
                    className="bg-gradient-medical hover:opacity-90 disabled:opacity-50"
                  >
                    {doctor.available ? 'Book Appointment' : 'Not Available'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Appointment History */}
      <Card className="shadow-card-custom">
        <CardHeader>
          <CardTitle className="text-medical-navy">Appointment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAppointments.map((appointment) => (
              <div key={appointment.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div>
                  <div className="font-medium text-medical-navy">{appointment.doctorName}</div>
                  <div className="text-sm text-muted-foreground">{appointment.hospital}</div>
                  <div className="text-sm text-muted-foreground">{appointment.date} at {appointment.time}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-semibold">${appointment.fee}</div>
                  </div>
                  <Badge className={appointment.status === 'completed' ? 'bg-medical-green' : 'bg-medical-blue'}>
                    {appointment.status === 'completed' ? 'Completed' : 'Upcoming'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
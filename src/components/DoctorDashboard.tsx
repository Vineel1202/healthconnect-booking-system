import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { 
  DollarSign, 
  Calendar,
  Stethoscope,
  Clock,
  Users,
  Plus,
  Building2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock data
const mockHospitals = [
  { id: 1, name: 'Central Medical Center', location: 'Downtown' },
  { id: 2, name: 'St. Mary\'s Hospital', location: 'Uptown' },
  { id: 3, name: 'City General Hospital', location: 'Midtown' },
];

const mockAssociations = [
  { hospitalId: 1, consultationFee: 200, specialization: 'Cardiology' },
  { hospitalId: 2, consultationFee: 250, specialization: 'Cardiology' },
];

const mockAppointments = [
  { id: 1, patientName: 'John Smith', hospitalId: 1, date: '2024-01-15', time: '10:00 AM', fee: 200, status: 'completed' },
  { id: 2, patientName: 'Sarah Johnson', hospitalId: 1, date: '2024-01-15', time: '2:00 PM', fee: 200, status: 'upcoming' },
  { id: 3, patientName: 'Michael Brown', hospitalId: 2, date: '2024-01-16', time: '11:00 AM', fee: 250, status: 'upcoming' },
  { id: 4, patientName: 'Emily Davis', hospitalId: 1, date: '2024-01-16', time: '3:00 PM', fee: 200, status: 'completed' },
];

const mockAvailability = [
  { hospitalId: 1, date: '2024-01-15', slots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'] },
  { hospitalId: 2, date: '2024-01-16', slots: ['10:00 AM', '11:00 AM', '1:00 PM'] },
];

export const DoctorDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedHospital, setSelectedHospital] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState('');
  const [consultationFee, setConsultationFee] = useState('');

  const totalEarnings = mockAppointments
    .filter(apt => apt.status === 'completed')
    .reduce((sum, apt) => sum + (apt.fee * 0.6), 0); // Doctor gets 60%

  const totalConsultations = mockAppointments.filter(apt => apt.status === 'completed').length;
  const upcomingAppointments = mockAppointments.filter(apt => apt.status === 'upcoming').length;

  const getHospitalName = (hospitalId: number) => {
    return mockHospitals.find(h => h.id === hospitalId)?.name || 'Unknown Hospital';
  };

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-medical-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medical-navy">${totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              60% of consultation fees
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultations</CardTitle>
            <Stethoscope className="h-4 w-4 text-medical-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medical-navy">{totalConsultations}</div>
            <p className="text-xs text-muted-foreground">
              Completed this month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-medical-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medical-navy">{upcomingAppointments}</div>
            <p className="text-xs text-muted-foreground">
              Appointments scheduled
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hospitals</CardTitle>
            <Building2 className="h-4 w-4 text-medical-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medical-navy">{mockAssociations.length}</div>
            <p className="text-xs text-muted-foreground">
              Associated with
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-medical-navy">Availability Management</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-medical hover:opacity-90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Availability
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Set Availability</DialogTitle>
                  <DialogDescription>Add new time slots for patient consultations</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Select Hospital</Label>
                      <Select value={selectedHospital} onValueChange={setSelectedHospital}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose hospital" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockHospitals.map((hospital) => (
                            <SelectItem key={hospital.id} value={hospital.id.toString()}>
                              {hospital.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Time Slot</Label>
                      <Select value={timeSlot} onValueChange={setTimeSlot}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                          <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                          <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                          <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                          <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                          <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="fee">Consultation Fee</Label>
                      <Input 
                        id="fee" 
                        type="number"
                        value={consultationFee}
                        onChange={(e) => setConsultationFee(e.target.value)}
                        placeholder="Enter fee amount" 
                      />
                    </div>
                    <Button className="w-full bg-gradient-medical hover:opacity-90">
                      Add Time Slot
                    </Button>
                  </div>
                  <div>
                    <Label>Select Date</Label>
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border shadow-sm"
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {mockAvailability.map((availability, index) => (
              <Card key={index} className="shadow-card-custom">
                <CardHeader>
                  <CardTitle className="text-medical-navy flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    {availability.date} - {getHospitalName(availability.hospitalId)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {availability.slots.map((slot, slotIndex) => (
                      <Badge key={slotIndex} variant="outline" className="px-3 py-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {slot}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-medical-navy">Appointment Overview</h3>
            <p className="text-sm text-muted-foreground">Manage your scheduled consultations</p>
          </div>

          <div className="space-y-4">
            {mockAppointments.map((appointment) => (
              <Card key={appointment.id} className="shadow-card-custom">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-medical p-2 rounded-full">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-medical-navy">{appointment.patientName}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{appointment.date}</span>
                          <span>•</span>
                          <span>{appointment.time}</span>
                          <span>•</span>
                          <span>{getHospitalName(appointment.hospitalId)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-semibold text-medical-green">${appointment.fee}</div>
                        <div className="text-sm text-muted-foreground">Consultation fee</div>
                      </div>
                      <div className="flex items-center">
                        {appointment.status === 'completed' ? (
                          <Badge className="bg-medical-green">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        ) : (
                          <Badge className="bg-medical-blue">
                            <Clock className="h-3 w-3 mr-1" />
                            Upcoming
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hospitals" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-medical-navy">Hospital Associations</h3>
            <Button className="bg-gradient-medical hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Associate with Hospital
            </Button>
          </div>

          <div className="grid gap-4">
            {mockAssociations.map((association, index) => {
              const hospital = mockHospitals.find(h => h.id === association.hospitalId);
              return (
                <Card key={index} className="shadow-card-custom">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-medical p-2 rounded-full">
                          <Building2 className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-medical-navy">{hospital?.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{association.specialization}</Badge>
                            <span className="text-sm text-muted-foreground">{hospital?.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-medical-green">${association.consultationFee}</div>
                        <div className="text-sm text-muted-foreground">Consultation fee</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-medical-navy">Earnings Breakdown</h3>
            <p className="text-sm text-muted-foreground">Track your revenue across all hospitals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle className="text-medical-navy">Earnings by Hospital</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAssociations.map((association, index) => {
                    const hospital = mockHospitals.find(h => h.id === association.hospitalId);
                    const hospitalEarnings = mockAppointments
                      .filter(apt => apt.hospitalId === association.hospitalId && apt.status === 'completed')
                      .reduce((sum, apt) => sum + (apt.fee * 0.6), 0);
                    
                    return (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{hospital?.name}</span>
                        <span className="font-semibold text-medical-green">${hospitalEarnings.toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle className="text-medical-navy">Monthly Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Consultations</span>
                    <span className="font-semibold">{totalConsultations}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Fee</span>
                    <span className="font-semibold">
                      ${totalConsultations > 0 ? ((totalEarnings / 0.6) / totalConsultations).toFixed(2) : '0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Your Share (60%)</span>
                    <span className="font-semibold text-medical-green">${totalEarnings.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
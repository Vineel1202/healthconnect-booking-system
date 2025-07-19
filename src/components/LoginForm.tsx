import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface LoginFormProps {
  role: 'admin' | 'doctor' | 'patient';
  onLogin: (role: 'admin' | 'doctor' | 'patient', email: string) => void;
}

export const LoginForm = ({ role, onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(role, email);
    }
  };

  // Demo credentials for each role
  const demoCredentials = {
    admin: { email: 'admin@hospital.com', password: 'admin123' },
    doctor: { email: 'doctor@hospital.com', password: 'doctor123' },
    patient: { email: 'patient@hospital.com', password: 'patient123' },
  };

  const loadDemo = () => {
    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="space-y-3">
        <Button type="submit" className="w-full bg-gradient-medical hover:opacity-90">
          Login as {role.charAt(0).toUpperCase() + role.slice(1)}
        </Button>
        
        <Card className="bg-muted/50">
          <CardContent className="p-3">
            <div className="text-xs text-muted-foreground mb-2">
              Demo Credentials:
            </div>
            <div className="text-xs space-y-1">
              <div>Email: {demoCredentials[role].email}</div>
              <div>Password: {demoCredentials[role].password}</div>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={loadDemo}
              className="w-full mt-2"
            >
              Use Demo Credentials
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
};
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { BusinessCategory } from '@/types';

interface SignupFormProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const businessCategories: { value: BusinessCategory; label: string }[] = [
  { value: 'kirana', label: 'Kirana Store' },
  { value: 'boutique', label: 'Boutique' },
  { value: 'pharmacy', label: 'Pharmacy' },
  { value: 'hardware', label: 'Hardware Store' },
  { value: 'other', label: 'Other' },
];

export const SignupForm: React.FC<SignupFormProps> = ({ onClose, onSwitchToLogin }) => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    companyName: '',
    businessCategory: '' as BusinessCategory,
    otherCategory: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        businessCategory: formData.businessCategory === 'other' ? formData.otherCategory : formData.businessCategory,
        role: 'admin' as const,
        password: formData.password
      };

      const success = await signup(userData);
      if (success) {
        toast({
          title: "Account created!",
          description: "Welcome to InvenTrak. Your account has been created successfully.",
        });
        onClose();
      } else {
        toast({
          title: "Signup failed",
          description: "Unable to create account. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto card-gradient border-0 shadow-xl animate-scale-in">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold text-gradient">Join InvenTrak</CardTitle>
        <CardDescription className="text-muted-foreground">
          Create your account to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="input-field"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="input-field"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="input-field pr-10"
                required
                minLength={6}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="input-field"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Business Name</Label>
            <Input
              id="companyName"
              placeholder="Your store/business name"
              value={formData.companyName}
              onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              className="input-field"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessCategory">Business Category</Label>
            <Select
              value={formData.businessCategory}
              onValueChange={(value: BusinessCategory) => 
                setFormData(prev => ({ ...prev, businessCategory: value }))
              }
            >
              <SelectTrigger className="input-field">
                <SelectValue placeholder="Select your business type" />
              </SelectTrigger>
              <SelectContent>
                {businessCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.businessCategory === 'other' && (
            <div className="space-y-2">
              <Label htmlFor="otherCategory">Specify Category</Label>
              <Input
                id="otherCategory"
                placeholder="Enter your business category"
                value={formData.otherCategory}
                onChange={(e) => setFormData(prev => ({ ...prev, otherCategory: e.target.value }))}
                className="input-field"
                required
              />
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full btn-primary py-3 rounded-xl"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <button
            type="button"
            className="text-primary hover:underline font-medium"
            onClick={onSwitchToLogin}
          >
            Sign in here
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
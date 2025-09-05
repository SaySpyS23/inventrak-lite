import React from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { LogIn, UserPlus } from 'lucide-react';

interface NavbarProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onSignupClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLoginClick}
              className="text-foreground hover:text-primary"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button
              size="sm"
              onClick={onSignupClick}
              className="btn-primary rounded-full px-6"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
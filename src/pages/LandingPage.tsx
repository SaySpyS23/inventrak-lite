import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/landing/Hero';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export const LandingPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginClick = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const handleSignupClick = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const switchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar 
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
      />
      
      <Hero 
        onGetStarted={handleSignupClick}
        onLogin={handleLoginClick}
      />

      {/* Login Modal */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="p-0 bg-transparent border-0 shadow-none max-w-md">
          <LoginForm 
            onClose={handleCloseModals}
            onSwitchToSignup={switchToSignup}
          />
        </DialogContent>
      </Dialog>

      {/* Signup Modal */}
      <Dialog open={showSignup} onOpenChange={setShowSignup}>
        <DialogContent className="p-0 bg-transparent border-0 shadow-none max-w-md">
          <SignupForm 
            onClose={handleCloseModals}
            onSwitchToLogin={switchToLogin}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
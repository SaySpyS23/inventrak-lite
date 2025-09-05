import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Package, ShoppingCart, Users } from 'lucide-react';
import heroImage from '@/assets/hero-illustration.jpg';

interface HeroProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onLogin }) => {
  const features = [
    {
      icon: ShoppingCart,
      title: 'Smart POS System',
      description: 'Fast & intuitive point-of-sale for quick transactions'
    },
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'Track stock levels and get low-stock alerts instantly'
    },
    {
      icon: BarChart3,
      title: 'Sales Reports',
      description: 'Detailed analytics to understand your business better'
    },
    {
      icon: Users,
      title: 'Multi-User Access',
      description: 'Role-based access for owners and cashiers'
    }
  ];

  return (
    <section className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gradient">Smart POS</span> &{' '}
                <span className="text-gradient">Inventory</span>
                <br />
                <span className="text-foreground">Management</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Streamline your small business operations with InvenTrak's intuitive 
                point-of-sale system and real-time inventory tracking.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={onGetStarted}
                className="btn-primary px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={onLogin}
                className="px-8 py-4 rounded-xl text-lg font-semibold border-2 hover:bg-primary-light transition-all duration-300"
              >
                Sign In
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Trusted by 1000+</span> small retailers
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-hover border-2 border-white shadow-sm" />
                ))}
              </div>
            </div>
          </div>

          <div className="relative animate-slide-up">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Small retailer using InvenTrak on laptop"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-2xl" />
            </div>
            
            {/* Floating Stats Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 animate-pulse">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded-full" />
                <span className="text-sm font-medium">Sales: ↗ 25%</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 animate-pulse">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Stock: 95% Optimal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group p-6 card-gradient rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <p className="text-muted-foreground mb-8">Perfect for all types of small businesses</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            {['Kirana Stores', 'Boutiques', 'Pharmacies', 'Hardware Stores', 'Local Retailers'].map((business) => (
              <span key={business} className="text-sm font-medium px-4 py-2 bg-muted rounded-full">
                {business}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Search, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DashboardHeaderProps {
  title: string;
  onToggleSidebar: () => void;
  collapsed: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  onToggleSidebar,
  collapsed
}) => {
  return (
    <header 
      className="h-16 bg-white border-b border-border flex items-center justify-between px-4 transition-all duration-300"
      style={{ marginLeft: collapsed ? '4rem' : '16rem' }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="p-2"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div>
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Global Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products, sales..."
            className="pl-10 w-64 bg-muted/50 border-0 focus:bg-white"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative p-2">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs" />
        </Button>
      </div>
    </header>
  );
};
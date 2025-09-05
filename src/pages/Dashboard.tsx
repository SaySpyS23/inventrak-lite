import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { POSTab } from '@/components/dashboard/tabs/POSTab';
import { InventoryTab } from '@/components/dashboard/tabs/InventoryTab';
import { useAuth } from '@/contexts/AuthContext';

// Placeholder components for other tabs
const ReportsTab: React.FC = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Sales Reports</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-card p-6 rounded-lg border">
        <h3 className="font-semibold mb-2">Daily Sales</h3>
        <p className="text-2xl font-bold text-primary">₹12,450</p>
        <p className="text-sm text-muted-foreground">+15% from yesterday</p>
      </div>
      <div className="bg-card p-6 rounded-lg border">
        <h3 className="font-semibold mb-2">Monthly Sales</h3>
        <p className="text-2xl font-bold text-primary">₹3,45,600</p>
        <p className="text-sm text-muted-foreground">+8% from last month</p>
      </div>
      <div className="bg-card p-6 rounded-lg border">
        <h3 className="font-semibold mb-2">Best Seller</h3>
        <p className="text-lg font-medium">Rice (1kg)</p>
        <p className="text-sm text-muted-foreground">45 units sold</p>
      </div>
    </div>
  </div>
);

const AlertsTab: React.FC = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Low Stock Alerts</h2>
    <div className="space-y-4">
      <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
        <h3 className="font-semibold text-warning">Tea Powder (250g)</h3>
        <p className="text-sm text-muted-foreground">Only 3 units left - Threshold: 5 units</p>
      </div>
      <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
        <h3 className="font-semibold text-warning">Shampoo (200ml)</h3>
        <p className="text-sm text-muted-foreground">Only 2 units left - Threshold: 5 units</p>
      </div>
    </div>
  </div>
);

const MarketplaceTab: React.FC = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Marketplace</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow">
        <h3 className="font-semibold mb-2">Wholesale Rice Supplier</h3>
        <p className="text-muted-foreground text-sm mb-4">Premium quality rice at wholesale prices</p>
        <button className="btn-primary px-4 py-2 rounded">Contact Supplier</button>
      </div>
      <div className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow">
        <h3 className="font-semibold mb-2">Oil Distributor</h3>
        <p className="text-muted-foreground text-sm mb-4">Cooking oil in bulk quantities</p>
        <button className="btn-primary px-4 py-2 rounded">Contact Supplier</button>
      </div>
    </div>
  </div>
);

const ProfileTab: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Profile & Settings</h2>
      <div className="bg-card p-6 rounded-lg border max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Name</label>
            <p className="text-lg">{user?.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <p className="text-lg">{user?.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Role</label>
            <p className="text-lg capitalize">{user?.role}</p>
          </div>
          {user?.companyName && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Business Name</label>
              <p className="text-lg">{user.companyName}</p>
            </div>
          )}
          {user?.businessCategory && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Business Category</label>
              <p className="text-lg capitalize">{user.businessCategory}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getTabTitle = (tab: string): string => {
  switch (tab) {
    case 'pos': return 'Point of Sale';
    case 'inventory': return 'Inventory Management';
    case 'reports': return 'Sales Reports';
    case 'alerts': return 'Low Stock Alerts';
    case 'marketplace': return 'Marketplace';
    case 'profile': return 'Profile & Settings';
    default: return 'Dashboard';
  }
};

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pos');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'pos':
        return <POSTab />;
      case 'inventory':
        return <InventoryTab />;
      case 'reports':
        return <ReportsTab />;
      case 'alerts':
        return <AlertsTab />;
      case 'marketplace':
        return <MarketplaceTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <POSTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex flex-col">
        <DashboardHeader
          title={getTabTitle(activeTab)}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          collapsed={sidebarCollapsed}
        />
        
        <main 
          className="flex-1 transition-all duration-300"
          style={{ marginLeft: sidebarCollapsed ? '4rem' : '16rem' }}
        >
          <div className="animate-fade-in">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
};
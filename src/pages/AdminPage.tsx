import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UsersList } from '@/components/admin/UsersList';
import { SubscriptionStats } from '@/components/admin/SubscriptionStats';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export function AdminPage() {
  const { user } = useAuth();

  // Redirect if not admin
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="mb-8">
        <SubscriptionStats />
      </div>
      
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="mt-6">
          <UsersList />
        </TabsContent>
        <TabsContent value="subscriptions" className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Subscription Management</h2>
            <p className="text-gray-500">
              This section will allow you to manage subscription plans, pricing, and features.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="settings" className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Admin Settings</h2>
            <p className="text-gray-500">
              Configure global settings for your application.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SubscriptionDetails } from '@/components/subscription/SubscriptionDetails';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { PricingPlans } from '@/components/subscription/PricingPlans';

export function DashboardPage() {
  const { user } = useAuth();
  const { subscription } = useSubscription();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid gap-8 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              {user?.full_name || 'User'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {subscription 
                ? `You are currently on the ${subscription.prices?.products?.name || 'Premium'} plan.` 
                : 'You are currently on the Free plan.'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
            <CardDescription>
              Your current usage statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>API Calls</span>
                <span>1,234 / 5,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '25%' }}></div>
              </div>
              
              <div className="flex justify-between mt-4">
                <span>Storage</span>
                <span>2.1 GB / 10 GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '21%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-gray-100 rounded-md">
                View API Keys
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-100 rounded-md">
                Update Profile
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-100 rounded-md">
                View Documentation
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-100 rounded-md">
                Contact Support
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Tabs defaultValue="subscription">
          <TabsList>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="plans">Available Plans</TabsTrigger>
          </TabsList>
          <TabsContent value="subscription" className="mt-6">
            <SubscriptionDetails />
          </TabsContent>
          <TabsContent value="plans" className="mt-6">
            <PricingPlans />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

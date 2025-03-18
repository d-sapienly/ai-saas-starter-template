import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { createPortalSession } from '@/lib/stripe';
import { formatDate } from '@/lib/utils';

export function SubscriptionDetails() {
  const { subscription, loading } = useSubscription();

  const handleManageSubscription = async () => {
    try {
      await createPortalSession();
    } catch (error) {
      console.error('Error creating portal session:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Active Subscription</CardTitle>
          <CardDescription>You don't have an active subscription</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Subscribe to a plan to access premium features.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => window.location.href = '/pricing'}>
            View Plans
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Details</CardTitle>
        <CardDescription>Manage your subscription</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <p className="capitalize">{subscription.status}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Plan</p>
            <p>{subscription.prices?.products?.name || 'Unknown'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Current Period</p>
            <p>{formatDate(subscription.current_period_start)} - {formatDate(subscription.current_period_end)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Renewal</p>
            <p>{subscription.cancel_at_period_end ? 'Cancels on period end' : 'Renews automatically'}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleManageSubscription}>
          Manage Subscription
        </Button>
      </CardFooter>
    </Card>
  );
}

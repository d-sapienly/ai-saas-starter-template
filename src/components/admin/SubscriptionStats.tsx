import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

type SubscriptionStats = {
  total: number;
  active: number;
  trialing: number;
  canceled: number;
  revenue: number;
};

export function SubscriptionStats() {
  const [stats, setStats] = useState<SubscriptionStats>({
    total: 0,
    active: 0,
    trialing: 0,
    canceled: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Get all subscriptions
      const { data: subscriptions, error } = await supabase
        .from('subscriptions')
        .select('*, prices(unit_amount)');
      
      if (error) {
        throw error;
      }
      
      // Calculate stats
      const total = subscriptions.length;
      const active = subscriptions.filter(s => s.status === 'active').length;
      const trialing = subscriptions.filter(s => s.status === 'trialing').length;
      const canceled = subscriptions.filter(s => s.status === 'canceled').length;
      
      // Calculate monthly revenue (from active subscriptions)
      const revenue = subscriptions
        .filter(s => s.status === 'active')
        .reduce((sum, sub) => sum + (sub.prices?.unit_amount || 0) * sub.quantity, 0);
      
      setStats({
        total,
        active,
        trialing,
        canceled,
        revenue,
      });
    } catch (error) {
      console.error('Error fetching subscription stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch subscription statistics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.active}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Trial Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.trialing}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${(stats.revenue / 100).toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  );
}

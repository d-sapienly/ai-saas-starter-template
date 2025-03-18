import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

type UserWithProfile = {
  id: string;
  email: string;
  created_at: string;
  profile: {
    full_name: string;
    avatar_url: string;
    role: 'user' | 'admin';
    stripe_customer_id: string | null;
  };
  subscription?: {
    status: string;
    price_id: string;
    current_period_end: string;
  };
};

export function UsersList() {
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Get all users from auth.users
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        throw authError;
      }
      
      // Get profiles for all users
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
      
      if (profilesError) {
        throw profilesError;
      }
      
      // Get subscriptions for all users
      const { data: subscriptions, error: subscriptionsError } = await supabase
        .from('subscriptions')
        .select('*')
        .in('status', ['trialing', 'active']);
      
      if (subscriptionsError) {
        throw subscriptionsError;
      }
      
      // Combine the data
      const usersWithProfiles = authUsers.users.map(user => {
        const profile = profiles.find(p => p.id === user.id) || {
          full_name: 'Unknown',
          avatar_url: null,
          role: 'user',
          stripe_customer_id: null,
        };
        
        const subscription = subscriptions.find(s => s.user_id === user.id);
        
        return {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
          profile,
          subscription,
        };
      });
      
      setUsers(usersWithProfiles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
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
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>Manage your users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">User</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Joined</th>
                <th className="text-left py-3 px-4">Subscription</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.profile.avatar_url || ''} alt={user.profile.full_name} />
                        <AvatarFallback>{user.profile.full_name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{user.profile.full_name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">{user.profile.role}</td>
                  <td className="py-3 px-4">{formatDate(user.created_at)}</td>
                  <td className="py-3 px-4">
                    {user.subscription ? (
                      <div>
                        <span className="capitalize">{user.subscription.status}</span>
                        <span className="text-xs text-muted-foreground block">
                          Until {formatDate(user.subscription.current_period_end)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No subscription</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

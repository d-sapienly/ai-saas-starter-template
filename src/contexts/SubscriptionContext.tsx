import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import type { Subscription, Price, Product, PricingPlan } from '@/types';

interface SubscriptionContextType {
  subscription: Subscription | null;
  loading: boolean;
  prices: Price[];
  products: Product[];
  pricingPlans: PricingPlan[];
  loadPrices: () => Promise<void>;
  loadSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [prices, setPrices] = useState<Price[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSubscription = async () => {
    try {
      if (!user) {
        setSubscription(null);
        return;
      }

      setLoading(true);
      
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*, prices(*)')
        .eq('user_id', user.id)
        .in('status', ['trialing', 'active'])
        .single();
      
      if (error) {
        if (error.code !== 'PGRST116') { // PGRST116 is the error code for no rows returned
          console.error('Error loading subscription:', error);
        }
        setSubscription(null);
      } else {
        setSubscription(data);
      }
    } catch (error) {
      console.error('Error in loadSubscription:', error);
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  };

  const loadPrices = async () => {
    try {
      setLoading(true);
      
      // Load products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .order('name');
      
      if (productsError) {
        throw productsError;
      }
      
      setProducts(productsData || []);
      
      // Load prices
      const { data: pricesData, error: pricesError } = await supabase
        .from('prices')
        .select('*, products(*)')
        .eq('active', true)
        .order('unit_amount');
      
      if (pricesError) {
        throw pricesError;
      }
      
      setPrices(pricesData || []);
      
      // Create pricing plans
      const plans: PricingPlan[] = pricesData
        .filter(price => price.products)
        .map(price => {
          const product = price.products!;
          const features = product.metadata?.features 
            ? JSON.parse(product.metadata.features) 
            : [];
          
          return {
            id: price.id,
            name: product.name,
            description: product.description || '',
            price,
            features,
          };
        });
      
      setPricingPlans(plans);
    } catch (error) {
      console.error('Error loading prices:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrices();
  }, []);

  useEffect(() => {
    loadSubscription();
  }, [user]);

  const value = {
    subscription,
    loading,
    prices,
    products,
    pricingPlans,
    loadPrices,
    loadSubscription,
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

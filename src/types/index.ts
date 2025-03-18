export type User = {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  role: 'user' | 'admin';
  stripe_customer_id?: string;
};

export type Subscription = {
  id: string;
  user_id: string;
  status: 'trialing' | 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'unpaid';
  price_id: string;
  quantity: number;
  cancel_at_period_end: boolean;
  current_period_start: string;
  current_period_end: string;
  ended_at: string | null;
  cancel_at: string | null;
  canceled_at: string | null;
  trial_start: string | null;
  trial_end: string | null;
  prices?: Price;
  products?: Product;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  image: string | null;
  metadata: Record<string, any> | null;
};

export type Price = {
  id: string;
  product_id: string;
  active: boolean;
  description: string | null;
  unit_amount: number;
  currency: string;
  type: 'one_time' | 'recurring';
  interval: 'day' | 'week' | 'month' | 'year' | null;
  interval_count: number | null;
  trial_period_days: number | null;
  metadata: Record<string, any> | null;
  products?: Product;
};

export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  price: Price;
  features: string[];
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { formatCurrency } from '@/lib/utils';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  description: string;
  features: string[];
  highlighted?: boolean;
  aiFeatures?: string[];
}

export function PricingPlans() {
  const { user } = useAuth();
  const { createCheckoutSession, subscription } = useSubscription();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<string | null>(null);

  const plans: Plan[] = [
    {
      id: 'price_basic',
      name: 'Basic',
      price: 0,
      interval: 'month',
      description: 'Essential features for getting started',
      features: [
        'Authentication system',
        'User dashboard',
        'Profile management',
        'Email notifications',
      ],
    },
    {
      id: 'price_pro',
      name: 'Pro',
      price: 1900,
      interval: 'month',
      description: 'Everything in Basic plus advanced features',
      features: [
        'All Basic features',
        'Priority support',
        'Advanced analytics',
        'Custom branding',
        'Team collaboration',
      ],
      highlighted: true,
      aiFeatures: [
        'Basic AI completions (100k tokens/mo)',
        'AI chat (limited)',
      ],
    },
    {
      id: 'price_enterprise',
      name: 'Enterprise',
      price: 4900,
      interval: 'month',
      description: 'Advanced features for power users',
      features: [
        'All Pro features',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantees',
        'Advanced security',
      ],
      aiFeatures: [
        'Advanced AI completions (1M tokens/mo)',
        'Unlimited AI chat',
        'Vision AI capabilities',
        'Custom AI model fine-tuning',
      ],
    },
  ];

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsLoading(planId);
    try {
      await createCheckoutSession(planId);
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const isCurrentPlan = (planId: string) => {
    return subscription?.price_id === planId;
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <Card 
          key={plan.id} 
          className={`flex flex-col ${
            plan.highlighted 
              ? 'relative border-indigo-200 shadow-lg' 
              : ''
          }`}
        >
          {plan.highlighted && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                Most Popular
              </span>
            </div>
          )}
          <CardHeader>
            <CardTitle className={plan.highlighted ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600' : ''}>
              {plan.name}
            </CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <div className="mt-2">
              <span className="text-3xl font-bold">
                {plan.price === 0 ? 'Free' : formatCurrency(plan.price)}
              </span>
              {plan.price > 0 && (
                <span className="text-gray-500 ml-2">/{plan.interval}</span>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
              {plan.aiFeatures && (
                <>
                  <li className="mt-4 mb-2 border-t border-gray-100 pt-2">
                    <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                      AI Features
                    </span>
                  </li>
                  {plan.aiFeatures.map((feature, index) => (
                    <li key={`ai-${index}`} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleSubscribe(plan.id)}
              disabled={isLoading === plan.id || isCurrentPlan(plan.id)}
              className={`w-full ${
                plan.highlighted
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                  : plan.price === 0
                  ? 'bg-gray-900 hover:bg-gray-800'
                  : ''
              }`}
            >
              {isLoading === plan.id
                ? 'Processing...'
                : isCurrentPlan(plan.id)
                ? 'Current Plan'
                : plan.price === 0
                ? 'Get Started'
                : 'Subscribe'}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

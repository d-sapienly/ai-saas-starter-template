import React from 'react';
import { PricingPlans } from '@/components/subscription/PricingPlans';

export function PricingPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Choose the plan that's right for you and start building your SaaS today.
          </p>
        </div>
        <div className="mt-16">
          <PricingPlans />
        </div>
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900">
            Frequently asked questions
          </h2>
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Can I cancel my subscription at any time?
                </h3>
                <p className="mt-2 text-gray-500">
                  Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Do you offer a free trial?
                </h3>
                <p className="mt-2 text-gray-500">
                  Yes, we offer a 14-day free trial on all plans. No credit card required.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Can I change my plan later?
                </h3>
                <p className="mt-2 text-gray-500">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be applied immediately.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  What payment methods do you accept?
                </h3>
                <p className="mt-2 text-gray-500">
                  We accept all major credit cards, including Visa, Mastercard, and American Express.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

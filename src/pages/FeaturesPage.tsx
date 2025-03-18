import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Zap, Users, Database, Code, CreditCard, BarChart, Settings } from 'lucide-react';

export function FeaturesPage() {
  const features = [
    {
      title: 'Authentication',
      description: 'Secure user authentication with email/password, social logins, and password reset functionality.',
      icon: Shield,
    },
    {
      title: 'Subscription Management',
      description: 'Integrated Stripe subscriptions with multiple pricing tiers, trials, and billing portal.',
      icon: CreditCard,
    },
    {
      title: 'User Dashboard',
      description: 'Beautiful and responsive user dashboard with profile management and subscription details.',
      icon: Users,
    },
    {
      title: 'Admin Panel',
      description: 'Comprehensive admin panel to manage users, subscriptions, and view analytics.',
      icon: BarChart,
    },
    {
      title: 'Database Integration',
      description: 'Seamless integration with Supabase for real-time database functionality.',
      icon: Database,
    },
    {
      title: 'API Integration',
      description: 'Built-in API endpoints for extending functionality and integrating with other services.',
      icon: Code,
    },
    {
      title: 'Role-Based Access Control',
      description: 'Granular control over user permissions and access to features.',
      icon: Settings,
    },
    {
      title: 'Performance Optimized',
      description: 'Optimized for speed and performance to provide the best user experience.',
      icon: Zap,
    },
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Features
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Everything you need to build and scale your SaaS application.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <div className="bg-gray-50 rounded-lg shadow-md p-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Technical Specifications
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our SaaS starter kit is built with modern technologies to ensure scalability and performance.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Frontend</h3>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>React.js with TypeScript</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Tailwind CSS for styling</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Framer Motion for animations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>React Router for navigation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Context API for state management</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">Backend</h3>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Supabase for authentication</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>PostgreSQL database</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Stripe for payment processing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Supabase Edge Functions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Webhook handlers for events</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

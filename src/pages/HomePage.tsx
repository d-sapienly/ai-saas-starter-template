import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Rocket, Shield, Zap, Brain, Code, MessageSquare, Image, Sparkles, Bot } from 'lucide-react';

export function HomePage() {
  return (
    <div>
      {/* Hero Section with AI Gradient */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              className="lg:w-1/2 lg:pr-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 leading-tight">
                Build AI-Powered SaaS Faster
              </h1>
              <p className="mt-4 text-xl text-gray-700 max-w-2xl">
                Everything you need to launch your AI-enabled SaaS product. Authentication, payments, subscriptions, and powerful AI capabilities out of the box.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50" asChild>
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div 
              className="lg:w-1/2 mt-10 lg:mt-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur-sm"></div>
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="SaaS Dashboard" 
                  className="relative rounded-lg shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center px-4 py-1 mb-4 rounded-full bg-indigo-100 text-indigo-700">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">AI-Powered Features</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Supercharge Your SaaS with AI
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Integrate powerful AI capabilities into your application with just a few lines of code.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6 border border-indigo-100 hover:border-indigo-300 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">AI Completions</h3>
              <p className="mt-2 text-gray-600">
                Generate text, code, and creative content using state-of-the-art language models from OpenAI and Anthropic.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-lg shadow-md p-6 border border-indigo-100 hover:border-indigo-300 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">AI Chat</h3>
              <p className="mt-2 text-gray-600">
                Build conversational experiences with multi-turn chat capabilities powered by Claude and GPT models.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-lg shadow-md p-6 border border-indigo-100 hover:border-indigo-300 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                <Image className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Vision AI</h3>
              <p className="mt-2 text-gray-600">
                Analyze images and generate descriptions with multimodal AI models that understand both text and visuals.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need to build your SaaS
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Our starter kit includes all the essential features to get your SaaS up and running quickly.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Authentication</h3>
              <p className="mt-2 text-gray-600">
                Secure user authentication with email/password, social logins, and password reset functionality.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Subscription Management</h3>
              <p className="mt-2 text-gray-600">
                Integrated Stripe subscriptions with multiple pricing tiers, trials, and billing portal.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">User Dashboard</h3>
              <p className="mt-2 text-gray-600">
                Beautiful and responsive user dashboard with profile management and subscription details.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Demo Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              className="lg:w-1/2 lg:pr-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                See AI in action
              </h2>
              <p className="mt-4 text-xl text-indigo-100 max-w-2xl">
                Experience the power of our AI capabilities with interactive demos. Generate text, chat with AI assistants, and analyze images.
              </p>
              <div className="mt-8">
                <Button size="lg" variant="secondary" className="bg-white text-indigo-900 hover:bg-indigo-100" asChild>
                  <Link to="/ai">Try AI Demo</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div 
              className="lg:w-1/2 mt-10 lg:mt-0"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-indigo-800 p-6 rounded-lg shadow-xl border border-indigo-700">
                <div className="flex items-center mb-4">
                  <Bot className="h-6 w-6 text-indigo-300 mr-2" />
                  <div className="text-lg font-medium">AI Assistant</div>
                </div>
                <div className="space-y-4">
                  <div className="bg-indigo-700 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    How can I help you build your AI application today?
                  </div>
                  <div className="bg-indigo-600 p-3 rounded-lg rounded-tr-none max-w-[80%] ml-auto">
                    I need to generate product descriptions from images
                  </div>
                  <div className="bg-indigo-700 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    I can help with that! You can use our Vision AI API to analyze product images and generate detailed descriptions. Would you like to see a code example?
                  </div>
                  <div className="bg-indigo-600 p-3 rounded-lg rounded-tr-none max-w-[80%] ml-auto">
                    Yes, please show me a code example
                  </div>
                  <div className="bg-indigo-700 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <div className="font-mono text-sm bg-indigo-800 p-2 rounded">
                      <pre>{`const response = await getAICompletion({
  provider: 'claude',
  prompt: 'Describe this product image',
  model: 'claude-3-opus-20240229',
  fileContent: imageBase64,
  fileType: 'image/jpeg'
});`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to build with AI?
            </h2>
            <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto">
              Join thousands of developers already using our AI-powered SaaS starter kit.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" variant="secondary" className="bg-white text-indigo-700 hover:bg-indigo-50" asChild>
                <Link to="/register">Sign up for free</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Trusted by AI developers worldwide
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              See what our customers have to say about our AI-powered SaaS starter kit.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-600 italic">
                "This starter kit saved me weeks of development time. The AI integration is seamless and powerful."
              </p>
              <div className="mt-4 flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Sarah Johnson" 
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">AI Engineer, Acme Inc</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-600 italic">
                "The integration with Claude and GPT models is fantastic. I was able to build an AI chatbot in hours, not weeks."
              </p>
              <div className="mt-4 flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Tom Wilson" 
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Tom Wilson</p>
                  <p className="text-sm text-gray-500">CTO, AI Startup</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-600 italic">
                "The AI capabilities are production-ready and the subscription management is flawless. Best investment for my AI SaaS."
              </p>
              <div className="mt-4 flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Michael Brown" 
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Michael Brown</p>
                  <p className="text-sm text-gray-500">Founder, AI Solutions</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

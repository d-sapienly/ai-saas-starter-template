import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AICompletionForm } from '@/components/ai/AICompletionForm';
import { AIChatForm } from '@/components/ai/AIChatForm';
import { Brain, MessageSquare, Image, Sparkles } from 'lucide-react';

export function AIPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      {/* Subtle gradient background */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      
      <div className="relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center px-4 py-1 mb-4 rounded-full bg-indigo-100 text-indigo-700">
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">AI Capabilities</span>
          </div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Explore Our AI Features
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Experience the power of AI with our integrated capabilities. Generate text, have conversations, and analyze images with state-of-the-art models.
          </p>
        </div>
        
        <Tabs defaultValue="completion" className="max-w-3xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="completion" className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Brain className="h-4 w-4" />
              <span>AI Completion</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <MessageSquare className="h-4 w-4" />
              <span>AI Chat</span>
            </TabsTrigger>
            <TabsTrigger value="vision" className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Image className="h-4 w-4" />
              <span>Vision AI</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <TabsContent value="completion">
              <AICompletionForm />
            </TabsContent>
            
            <TabsContent value="chat">
              <AIChatForm />
            </TabsContent>
            
            <TabsContent value="vision">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Image className="h-5 w-5 text-indigo-600" />
                    <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Vision AI</h2>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Analyze images and generate descriptions with multimodal AI models.
                  </p>
                </div>
                
                <div className="flex items-center justify-center h-64 border-2 border-dashed border-indigo-200 rounded-md bg-indigo-50">
                  <div className="text-center">
                    <p className="text-indigo-600 font-medium">Coming Soon</p>
                    <p className="text-gray-500 text-sm mt-1">Vision AI capabilities will be available in the next update.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

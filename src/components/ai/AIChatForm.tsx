import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { getAICompletion } from '@/lib/ai';
import { MessageSquare, Loader2, Bot, User } from 'lucide-react';

const formSchema = z.object({
  message: z.string().min(1, { message: 'Message is required' }),
});

type FormData = z.infer<typeof formSchema>;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIChatForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    // Add user message to chat
    const userMessage: Message = { role: 'user', content: data.message };
    setMessages(prev => [...prev, userMessage]);
    
    try {
      // Prepare conversation history for API
      const history = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Add current message
      history.push({
        role: 'user',
        content: data.message
      });
      
      const response = await getAICompletion({
        provider: 'anthropic',
        messages: history,
        model: 'claude-3-opus-20240229',
      });
      
      // Add AI response to chat
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: response.message 
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Clear the input
      reset();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-indigo-600" />
          <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">AI Chat</h2>
        </div>
        <p className="text-gray-500 text-sm">
          Have a conversation with an AI assistant powered by Claude or GPT.
        </p>
      </div>
      
      <div className="border border-indigo-100 rounded-md bg-white overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-indigo-600" />
            <span className="font-medium">AI Assistant</span>
          </div>
        </div>
        
        <div className="p-4 h-80 overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-none' 
                    : 'bg-gray-100 rounded-tl-none'
                }`}
              >
                <div className="flex items-start">
                  {message.role === 'assistant' && (
                    <Bot className="h-4 w-4 mr-2 mt-1 text-indigo-600 flex-shrink-0" />
                  )}
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  {message.role === 'user' && (
                    <User className="h-4 w-4 ml-2 mt-1 text-white flex-shrink-0" />
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 rounded-tl-none">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-indigo-600" />
                  <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                  <span className="text-sm text-gray-500">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-indigo-100">
          <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-2">
            <Textarea
              id="message"
              placeholder="Type your message..."
              {...register('message')}
              className="flex-grow border-indigo-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none h-10 py-2"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Send'
              )}
            </Button>
          </form>
          {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
        </div>
      </div>
    </div>
  );
}

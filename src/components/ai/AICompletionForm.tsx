import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { getAICompletion } from '@/lib/ai';
import { Brain, Loader2 } from 'lucide-react';

const formSchema = z.object({
  prompt: z.string().min(1, { message: 'Prompt is required' }),
});

type FormData = z.infer<typeof formSchema>;

export function AICompletionForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [completion, setCompletion] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setCompletion(null);
    
    try {
      const response = await getAICompletion({
        provider: 'openai',
        prompt: data.prompt,
        model: 'gpt-4',
      });
      
      setCompletion(response.text);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate completion',
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
          <Brain className="h-5 w-5 text-indigo-600" />
          <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">AI Completion</h2>
        </div>
        <p className="text-gray-500 text-sm">
          Generate text completions using state-of-the-art AI models.
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt">Prompt</Label>
          <Textarea
            id="prompt"
            placeholder="Enter your prompt here..."
            rows={4}
            {...register('prompt')}
            className="border-indigo-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none"
          />
          {errors.prompt && <p className="text-sm text-red-500">{errors.prompt.message}</p>}
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Completion'
          )}
        </Button>
      </form>
      
      {completion && (
        <div className="mt-6">
          <Label>Completion</Label>
          <div className="mt-2 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-md border border-indigo-100">
            <p className="whitespace-pre-wrap">{completion}</p>
          </div>
        </div>
      )}
    </div>
  );
}

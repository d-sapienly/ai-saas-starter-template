import { supabase } from './supabase';

export type AIProvider = 'claude' | 'openai';

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string | Array<{type: string, [key: string]: any}>;
}

export interface CompletionRequest {
  provider: AIProvider;
  prompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  fileContent?: string;
  fileType?: string;
}

export interface ChatRequest {
  provider: AIProvider;
  messages: Message[];
  model?: string;
  maxTokens?: number;
  temperature?: number;
  conversationId?: string;
}

export interface AIResponse {
  provider: AIProvider;
  model: string;
  content: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  conversationId?: string;
}

export interface Conversation {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  provider: AIProvider;
  title: string;
  is_archived: boolean;
}

export interface AIMessage {
  id: string;
  created_at: string;
  conversation_id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  model?: string;
  tokens?: number;
}

export const defaultModels = {
  claude: 'claude-3-opus-20240229',
  openai: 'gpt-4'
};

export async function getAICompletion(request: CompletionRequest): Promise<AIResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('ai-completion', {
      body: request,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error getting AI completion:', error);
    throw error;
  }
}

export async function getAIChatResponse(request: ChatRequest): Promise<AIResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('ai-chat', {
      body: request,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error getting AI chat response:', error);
    throw error;
  }
}

export async function getConversations(): Promise<Conversation[]> {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error getting conversations:', error);
    throw error;
  }
}

export async function getConversationMessages(conversationId: string): Promise<AIMessage[]> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error getting conversation messages:', error);
    throw error;
  }
}

export async function createConversation(provider: AIProvider, title: string): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        provider,
        title,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data.id;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
}

export async function updateConversationTitle(conversationId: string, title: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('conversations')
      .update({ title })
      .eq('id', conversationId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error updating conversation title:', error);
    throw error;
  }
}

export async function archiveConversation(conversationId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('conversations')
      .update({ is_archived: true })
      .eq('id', conversationId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error archiving conversation:', error);
    throw error;
  }
}

export async function deleteConversation(conversationId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', conversationId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting conversation:', error);
    throw error;
  }
}

export function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Failed to read file as base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
}

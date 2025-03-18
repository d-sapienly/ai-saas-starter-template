// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string | Array<{type: string, [key: string]: any}>;
}

interface ChatRequest {
  provider: 'claude' | 'openai';
  messages: Message[];
  model?: string;
  maxTokens?: number;
  temperature?: number;
  conversationId?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Missing Authorization header')
    }

    // Extract the JWT token from the Authorization header
    const token = authHeader.replace('Bearer ', '')

    // Verify the JWT token and get the user
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)
    if (userError || !user) {
      throw new Error('Invalid token or user not found')
    }

    // Check if the user has an active subscription
    const { data: subscription, error: subscriptionError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .in('status', ['trialing', 'active'])
      .single()

    if (subscriptionError) {
      // Allow free tier with limited usage
      console.log('User does not have an active subscription, using free tier limits')
    }

    // Parse the request body
    const { 
      provider, 
      messages, 
      model, 
      maxTokens = 1000, 
      temperature = 0.7,
      conversationId
    }: ChatRequest = await req.json()

    if (!provider || !messages || !messages.length) {
      throw new Error('Provider and messages are required')
    }

    let response
    let updatedConversationId = conversationId

    // If conversationId is provided, retrieve previous messages
    if (conversationId) {
      const { data: conversation, error: conversationError } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', conversationId)
        .eq('user_id', user.id)
        .single()

      if (conversationError) {
        console.log('Error retrieving conversation:', conversationError.message)
      } else if (conversation) {
        // Append new messages to existing conversation
        console.log('Retrieved existing conversation')
      }
    } else {
      // Create a new conversation
      const { data: newConversation, error: newConversationError } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          provider,
          title: extractConversationTitle(messages),
        })
        .select()
        .single()

      if (newConversationError) {
        console.log('Error creating conversation:', newConversationError.message)
      } else if (newConversation) {
        updatedConversationId = newConversation.id
        console.log('Created new conversation with ID:', updatedConversationId)
      }
    }

    // Handle request based on provider
    if (provider === 'claude') {
      response = await callClaudeAPI(messages, model, maxTokens, temperature)
    } else if (provider === 'openai') {
      response = await callOpenAIAPI(messages, model, maxTokens, temperature)
    } else {
      throw new Error('Invalid provider specified')
    }

    // Store the message in the database
    if (updatedConversationId) {
      const { error: messageError } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: updatedConversationId,
            role: 'user',
            content: typeof messages[messages.length - 1].content === 'string' 
              ? messages[messages.length - 1].content 
              : JSON.stringify(messages[messages.length - 1].content),
          },
          {
            conversation_id: updatedConversationId,
            role: 'assistant',
            content: response.content,
            model: response.model,
          }
        ])

      if (messageError) {
        console.log('Error storing messages:', messageError.message)
      }
    }

    return new Response(
      JSON.stringify({ ...response, conversationId: updatedConversationId }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

function extractConversationTitle(messages: Message[]): string {
  // Find the first user message to use as the conversation title
  const userMessage = messages.find(m => m.role === 'user')
  if (userMessage && typeof userMessage.content === 'string') {
    // Truncate to first 50 characters
    return userMessage.content.substring(0, 50) + (userMessage.content.length > 50 ? '...' : '')
  }
  return 'New conversation'
}

async function callClaudeAPI(
  messages: Message[], 
  model = 'claude-3-opus-20240229', 
  maxTokens = 1000, 
  temperature = 0.7
) {
  const CLAUDE_API_KEY = Deno.env.get('CLAUDE_API_KEY')
  if (!CLAUDE_API_KEY) {
    throw new Error('CLAUDE_API_KEY is not set')
  }

  const apiUrl = 'https://api.anthropic.com/v1/messages'
  
  // Format messages for Claude API
  const claudeMessages = messages.map(message => {
    if (message.role === 'system') {
      // Claude handles system messages differently
      return {
        role: 'user',
        content: `<system>\n${message.content}\n</system>`
      }
    }
    return message
  })

  const requestBody = {
    model,
    messages: claudeMessages,
    max_tokens: maxTokens,
    temperature
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify(requestBody)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Claude API error: ${errorData.error?.message || response.statusText}`)
  }

  const data = await response.json()
  return {
    provider: 'claude',
    model: data.model,
    content: data.content[0].text,
    usage: {
      prompt_tokens: data.usage.input_tokens,
      completion_tokens: data.usage.output_tokens,
      total_tokens: data.usage.input_tokens + data.usage.output_tokens
    }
  }
}

async function callOpenAIAPI(
  messages: Message[], 
  model = 'gpt-4', 
  maxTokens = 1000, 
  temperature = 0.7
) {
  const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set')
  }

  const apiUrl = 'https://api.openai.com/v1/chat/completions'

  const requestBody = {
    model,
    messages,
    max_tokens: maxTokens,
    temperature
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify(requestBody)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`)
  }

  const data = await response.json()
  return {
    provider: 'openai',
    model: data.model,
    content: data.choices[0].message.content,
    usage: data.usage
  }
}

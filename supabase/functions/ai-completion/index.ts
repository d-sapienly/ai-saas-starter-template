// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CompletionRequest {
  provider: 'claude' | 'openai';
  prompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  fileContent?: string;
  fileType?: string;
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
      prompt, 
      model, 
      maxTokens = 1000, 
      temperature = 0.7,
      fileContent,
      fileType
    }: CompletionRequest = await req.json()

    if (!provider || !prompt) {
      throw new Error('Provider and prompt are required')
    }

    let response

    // Handle request based on provider
    if (provider === 'claude') {
      response = await callClaudeAPI(prompt, model, maxTokens, temperature, fileContent, fileType)
    } else if (provider === 'openai') {
      response = await callOpenAIAPI(prompt, model, maxTokens, temperature, fileContent, fileType)
    } else {
      throw new Error('Invalid provider specified')
    }

    return new Response(
      JSON.stringify(response),
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

async function callClaudeAPI(
  prompt: string, 
  model = 'claude-3-opus-20240229', 
  maxTokens = 1000, 
  temperature = 0.7,
  fileContent?: string,
  fileType?: string
) {
  const CLAUDE_API_KEY = Deno.env.get('CLAUDE_API_KEY')
  if (!CLAUDE_API_KEY) {
    throw new Error('CLAUDE_API_KEY is not set')
  }

  const apiUrl = 'https://api.anthropic.com/v1/messages'
  
  const messages = []
  
  // Add system message if provided
  if (prompt.includes('system:')) {
    const parts = prompt.split('system:')
    const systemMessage = parts[1].split('user:')[0].trim()
    const userMessage = parts[1].split('user:')[1]?.trim() || parts[0].trim()
    
    messages.push({
      role: 'system',
      content: systemMessage
    })
    
    if (userMessage) {
      if (fileContent && fileType) {
        messages.push({
          role: 'user',
          content: [
            { type: 'text', text: userMessage },
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: fileType,
                data: fileContent
              }
            }
          ]
        })
      } else {
        messages.push({
          role: 'user',
          content: userMessage
        })
      }
    }
  } else {
    // No system message, just user message
    if (fileContent && fileType) {
      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: fileType,
              data: fileContent
            }
          }
        ]
      })
    } else {
      messages.push({
        role: 'user',
        content: prompt
      })
    }
  }

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
  prompt: string, 
  model = 'gpt-4', 
  maxTokens = 1000, 
  temperature = 0.7,
  fileContent?: string,
  fileType?: string
) {
  const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set')
  }

  const apiUrl = 'https://api.openai.com/v1/chat/completions'
  
  const messages = []
  
  // Add system message if provided
  if (prompt.includes('system:')) {
    const parts = prompt.split('system:')
    const systemMessage = parts[1].split('user:')[0].trim()
    const userMessage = parts[1].split('user:')[1]?.trim() || parts[0].trim()
    
    messages.push({
      role: 'system',
      content: systemMessage
    })
    
    if (userMessage) {
      if (fileContent && fileType) {
        messages.push({
          role: 'user',
          content: [
            { type: 'text', text: userMessage },
            {
              type: 'image_url',
              image_url: {
                url: `data:${fileType};base64,${fileContent}`
              }
            }
          ]
        })
      } else {
        messages.push({
          role: 'user',
          content: userMessage
        })
      }
    }
  } else {
    // No system message, just user message
    if (fileContent && fileType) {
      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          {
            type: 'image_url',
            image_url: {
              url: `data:${fileType};base64,${fileContent}`
            }
          }
        ]
      })
    } else {
      messages.push({
        role: 'user',
        content: prompt
      })
    }
  }

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

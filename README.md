# SaaS Starter with Supabase, Stripe, and AI Integration

A comprehensive SaaS starter template with React, TypeScript, Supabase, Stripe integration, and AI capabilities.

## Features

- **Authentication**: Complete authentication flow with Supabase Auth
- **Subscription Management**: Stripe integration for subscription billing
- **Role-Based Access Control**: User and admin roles with protected routes
- **User Dashboard**: Profile management and subscription details
- **Admin Dashboard**: User management and subscription analytics
- **AI Integration**: Support for both Claude and OpenAI APIs
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Modern UI**: Built with Shadcn UI components and Framer Motion animations

## AI Capabilities

- **Multiple AI Providers**: Support for both Claude (Anthropic) and OpenAI
- **Chat Interface**: Full-featured chat interface with conversation history
- **Completion API**: Single-prompt completions with advanced options
- **Image Support**: Upload and analyze images with multimodal AI models
- **Conversation Management**: Save, browse, and delete conversation history
- **Advanced Settings**: Control temperature, max tokens, and other parameters

## Tech Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: Supabase (Auth, Database, Storage, Edge Functions)
- **Payments**: Stripe for subscription management
- **AI**: Claude and OpenAI API integrations
- **Routing**: React Router for navigation
- **State Management**: React Context API and Zustand

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Supabase account
- Stripe account
- Claude API key (Anthropic)
- OpenAI API key

### Environment Setup

1. Clone this repository
2. Copy `.env.example` to `.env` and fill in your credentials:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
VITE_STRIPE_SECRET_KEY=your-stripe-secret-key
VITE_STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
CLAUDE_API_KEY=your-claude-api-key
OPENAI_API_KEY=your-openai-api-key
VITE_APP_URL=http://localhost:5173
```

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Supabase Setup

1. Create a new Supabase project
2. Run the migration scripts in `supabase/migrations` to set up your database schema
3. Run the seed script in `supabase/seed.sql` to populate initial data
4. Deploy the Edge Functions in `supabase/functions` to your Supabase project

```bash
supabase functions deploy create-checkout-session
supabase functions deploy create-portal-session
supabase functions deploy stripe-webhook
supabase functions deploy ai-completion
supabase functions deploy ai-chat
```

### Stripe Setup

1. Create a Stripe account and get your API keys
2. Set up webhook endpoints to point to your Supabase Edge Function
3. Create products and prices in Stripe that match the ones in your seed data

### AI Provider Setup

1. Get API keys from Anthropic (Claude) and OpenAI
2. Add these keys to your Supabase project's environment variables

## Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── admin/          # Admin-specific components
│   │   ├── ai/             # AI-related components
│   │   ├── auth/           # Authentication components
│   │   ├── layout/         # Layout components
│   │   ├── profile/        # User profile components
│   │   ├── subscription/   # Subscription management components
│   │   └── ui/             # UI components (Shadcn)
│   ├── contexts/           # React contexts
│   ├── lib/                # Utility functions and libraries
│   ├── pages/              # Page components
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main App component
│   └── main.tsx            # Entry point
├── supabase/
│   ├── functions/          # Supabase Edge Functions
│   │   ├── ai-chat/        # AI chat endpoint
│   │   ├── ai-completion/  # AI completion endpoint
│   │   ├── create-checkout-session/ # Stripe checkout
│   │   ├── create-portal-session/   # Stripe customer portal
│   │   └── stripe-webhook/  # Stripe webhook handler
│   ├── migrations/         # Database migration scripts
│   └── seed.sql            # Database seed data
├── .env.example            # Example environment variables
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## AI Features Usage

### Chat Interface

The chat interface allows users to have conversations with AI models:

1. Navigate to the AI page and select the "Chat" tab
2. Choose your preferred AI provider (Claude or OpenAI)
3. Type your message and press Enter or click the Send button
4. View the AI's response and continue the conversation
5. Upload images for analysis by clicking the upload button
6. Adjust model settings by clicking the settings icon

### Completion Interface

The completion interface is designed for single-prompt interactions:

1. Navigate to the AI page and select the "Completion" tab
2. Choose your preferred AI provider
3. Enter your prompt in the text area
4. Optionally upload an image for analysis
5. Click "Generate Completion" to get a response
6. Use the "Advanced" tab to configure system prompts and other parameters

## Deployment

### Frontend Deployment

You can deploy the frontend to any static hosting service like Vercel, Netlify, or GitHub Pages.

```bash
# Build for production
npm run build
```

### Supabase Deployment

Deploy your Supabase Edge Functions:

```bash
supabase functions deploy create-checkout-session
supabase functions deploy create-portal-session
supabase functions deploy stripe-webhook
supabase functions deploy ai-completion
supabase functions deploy ai-chat
```

## License

This project is licensed under the MIT License.

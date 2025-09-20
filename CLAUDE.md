# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production app with Turbopack
- `pnpm start` - Start production server
- `pnpm tsc --noEmit` - Run TypeScript compiler to check for type errors

## Code Quality

**IMPORTANT**: Always run `pnpm tsc --noEmit` after writing or modifying any code to ensure there are no TypeScript errors before considering the task complete.

## Package Manager

This project strictly uses **pnpm**. Do not use npm or yarn.

## Architecture

This is a TypeScript Next.js 15 starter template for AI-powered travel assistant applications:

### Core Stack
- **Next.js 15** with App Router
- **AI SDK 5** with OpenAI GPT-5 integration
- **shadcn/ui** components (New York style, neutral base color)
- **Tailwind CSS v4** for styling

### Key Directories
- `app/` - Next.js App Router pages and API routes
- `app/api/chat/` - AI chat endpoint using non-streaming `generateText()` with web search tools
- `components/ui/` - shadcn/ui components
- `components/ai-elements/` - Vercel AI Elements for chat interface
- `components/chat/` - Main chat interface component
- `components/agent/` - System prompt configuration for travel agent
- `lib/utils.ts` - Utility functions including `cn()` for className merging

### AI Integration
- Uses AI SDK 5's `generateText()` for non-streaming responses
- Configured for GPT-5 via OpenAI provider with web search tools
- API route at `/api/chat` expects `{ messages: Array<{role, content}> }` and returns `{ response: string, sources: Array, toolCalls: Array }`
- Chat interface handles conversation history, sources display, and tool execution
- System prompt configured as travel destination agent in `components/agent/prompt.ts`
- Requires `OPENAI_API_KEY` in `.env.local`

### Chat Architecture & Data Flow

```text
ChatAssistant (Client)        →   /api/chat (Server)          →   OpenAI GPT-5 + Web Search
- AI Elements UI              →   - Validates messages array  →   - generateText() with tools
- Conversation history        →   - Calls AI SDK             →   - Web search capability
- Sources & tool display      →   - Returns response + data  →   - Travel agent system prompt
```

The chat interface:
1. Maintains conversation history as message array
2. Sends full conversation context to API
3. Displays AI responses with sources and tool executions
4. Handles loading states and error scenarios

### UI Components
- **shadcn/ui** configured with:
  - New York style
  - Neutral base color with CSS variables
  - Import aliases: `@/components`, `@/lib/utils`, `@/components/ui`
  - Lucide React for icons
- **AI Elements** from Vercel:
  - Pre-built components for AI applications
  - Located in `components/ai-elements/`
  - Key components: Conversation, Message, PromptInput, Sources, Tool
  - Main chat interface in `components/chat/chat-assistant.tsx`

### Adding Components
- shadcn/ui: `pnpm dlx shadcn@latest add [component-name]`
- AI Elements: `pnpm dlx ai-elements@latest` (adds all components)

## Environment Setup

Create `.env.local` with:
```
OPENAI_API_KEY=your_openai_api_key_here
```
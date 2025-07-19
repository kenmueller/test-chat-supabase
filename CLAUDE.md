# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development server:**

```bash
npm run dev          # Start development server with Turbopack
```

**Build and production:**

```bash
npm run build        # Build for production
npm start           # Start production server
```

**Code quality:**

```bash
npm run lint        # Run ESLint
```

## Project Architecture

This is a **Next.js 15 + Supabase authentication demo** using the App Router and Server Actions. The project follows Supabase's official Next.js SSR authentication pattern with cookie-based session management.

### Key Architecture Components

**Supabase Client Setup (Server vs Client):**

- `utils/supabase/server.ts` - Server-side client with cookie handling for SSR
- `utils/supabase/client.ts` - Browser client for client-side components
- `utils/supabase/middleware.ts` - Middleware helper for auth state management

**Authentication Flow:**

- Cookie-based sessions managed automatically by Supabase SSR
- Server Actions handle auth operations (`app/login/actions.ts`)
- Middleware protects routes and manages session updates (`middleware.ts`)
- Protected routes redirect to `/login` when unauthenticated

**Route Protection:**

- `/private/*` routes require authentication (configured in middleware)
- Authentication state checked on every request via middleware
- Automatic redirects to login page for protected routes

### UI Framework

**shadcn/ui + Tailwind CSS:**

- Components in `components/ui/` follow shadcn/ui patterns
- Tailwind config uses CSS variables for theming
- Lucide React for icons

## Environment Setup

Required environment variables in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Authentication Usage Patterns

**Server Components:**

```typescript
import { createClient } from '@/utils/supabase/server'
const supabase = await createClient()
```

**Client Components:**

```typescript
import { createClient } from '@/utils/supabase/client'
const supabase = createClient()
```

**Server Actions:**
Use the server client in Server Actions for auth operations like login/signup.

## Important Notes

- Always use the server client for SSR and Server Actions
- Always use the client client for client-side components
- The middleware handles session updates automatically - do not modify cookie logic
- Email confirmation requires updating Supabase email templates to use `/auth/confirm` route

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

This is a Star Wars-themed educational game built with Next.js 15 and TypeScript. Players learn facts across different subjects through an interactive card-flipping interface.

### Core Stack
- **Next.js 15** with App Router and Turbopack
- **TypeScript 5** for type safety
- **Tailwind CSS v4** for styling with custom utilities
- **Radix UI** primitives for accessible components

### Key Directories
- `app/` - Next.js App Router pages and layout
- `components/` - React components for game functionality
- `components/ui/` - Reusable UI components (shadcn/ui)
- `lib/facts-data.ts` - Educational content and game data
- `public/` - Static assets (images, videos, sounds)

### Game Architecture

The game consists of five main components working together:

1. **LearningDashboard** (`components/learning-dashboard.tsx`)
   - Central game controller and layout manager
   - Manages completion state across all subjects
   - Controls R2-D2 reward video playback
   - Handles global progress tracking and reset functionality
   - Triggers weather effects based on completion milestones

2. **SubjectCircle** (`components/subject-circle.tsx`)
   - Individual subject learning interface with card flip animations
   - 90-second timer per subject
   - Fact randomization using Fisher-Yates shuffle algorithm
   - Randomly selects 4 facts from a pool of 10 per subject each game session
   - Dynamic quiz generation based on presented facts
   - Sound effects using Web Audio API

3. **Facts Data** (`lib/facts-data.ts`)
   - Structured educational content across three subjects:
     - Galactic Science (space and physics facts)
     - AI Facts (artificial intelligence information)
     - Earth History (historical events and discoveries)
   - Each subject contains 10 facts with keywords for quiz generation
   - Facts are randomly selected (4 per game session) ensuring unique gameplay

4. **RainAnimation** (`components/rain-animation.tsx`)
   - Heavy rain visual effect with 250 animated raindrops
   - Continuous rain sound generated using Web Audio API (pink noise)
   - Triggers after completing 2 subjects

5. **LightningAnimation** (`components/lightning-animation.tsx`)
   - Random lightning flashes with full-screen white/blue effects
   - Thunder sound effects synthesized with Web Audio API
   - Triggers after completing all 3 subjects (alongside rain)

### Game Flow
1. Player clicks on any of the three subject circles
2. Four random facts are selected from the subject's pool of 10 facts
3. Facts are displayed through card flip animations
4. Player progresses through facts by clicking (90 seconds per subject)
5. After all facts, player answers a dynamically generated multiple choice question based on the presented facts
6. Correct answer completes the subject and plays R2-D2 video
7. After 2nd subject completion: Heavy rain with sound effects begins
8. After 3rd subject completion: Lightning and thunder effects are added to the rain
9. Game completion occurs when all three subjects are finished

### UI Components & Styling
- Custom fonts: Orbitron (futuristic), Exo 2 (modern), Rajdhani (technical)
- Grey slate marble-textured background with subtle gradient
- 3D flip animations using CSS transforms and preserve-3d
- Star Wars themed icons and imagery
- Responsive design for mobile and desktop
- Sound effects and video rewards for engagement
- Dynamic weather animations (rain and lightning) triggered by game progression

### Static Assets Structure
- `/public/images/` - Subject icons and Star Wars imagery
- `/public/videos/` - R2-D2 reward video (MP4)
- `/public/sounds/` - Winner celebration audio (MP3)
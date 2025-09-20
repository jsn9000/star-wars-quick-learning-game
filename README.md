# Star Wars Quick Learning Game

An interactive educational game built with Next.js 15, TypeScript, and themed around the Star Wars universe. Players learn fascinating facts across different subjects while racing against time.

## Features

- **Interactive Learning Circles**: Click to flip and reveal fascinating facts across three subjects
- **Time-Based Challenge**: 90-second timer per subject keeps the pace exciting
- **Multiple Choice Questions**: Test your knowledge with Star Wars-themed questions
- **Visual Rewards**: R2-D2 video plays when you complete subjects
- **Progress Tracking**: Visual indicators show your learning progress
- **Sound Effects**: Engaging audio feedback including winning celebration sounds
- **Star Wars Theming**: Mandalorian helmet, Rebel Alliance, and X-Wing symbols

## How to Play

### Game Rules
1. **Choose Your Subject**: Click on any of the three learning circles to begin
2. **Learn the Facts**: Each subject contains multiple educational facts to discover
3. **Beat the Clock**: You have 90 seconds per subject to learn all facts
4. **Answer the Question**: Complete each subject by correctly answering a multiple choice question
5. **Win the Game**: Complete all three subjects to unlock your R2-D2 reward!

### Subjects Available
- **Galactic Science** (Mandalorian helmet icon): Space and science facts
- **AI Facts** (Rebel Alliance symbol): Artificial intelligence and technology
- **Earth History** (X-Wing symbol): Historical events and discoveries

### Game Mechanics
- Click a circle to start learning that subject
- Click again to flip between the subject title and fact content
- Progress through all facts in sequence
- Answer the final question correctly to complete the subject
- Wrong answers end the current attempt - but you can try again!
- Complete all subjects to trigger the winning celebration

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create `.env.local` file:

   ```bash
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env.local
   ```

3. Start development:
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) to start playing the Star Wars Quick Learning Game!

## Technical Stack

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [AI SDK 5](https://ai-sdk.dev/) - AI integration toolkit
- [AI Elements](https://ai-sdk.dev/elements/overview) - Pre-built AI components

## Game Assets

- **Images**: Mandalorian helmet, Rebel Alliance symbol, X-Wing fighter icons
- **Video**: R2-D2 reward animation (MP4 format)
- **Audio**: Winner celebration sound effects (MP3 format)
- **Fonts**: Star Wars themed typography (Orbitron, Rajdhani, Exo)

## Game Architecture

```text
+---------------------------+            +-------------------------+            +------------------+
|    Learning Dashboard     |            |    Subject Circle       |            |   Facts Data     |
|   `learning-dashboard.tsx`|            | `subject-circle.tsx`    |            | `facts-data.ts`  |
|  - Manages game state     |            |  - Individual subject   |            |  - Game content  |
|  - Global timer (5 min)   |            |  - 90s timer per circle |            |  - Questions     |
|  - Completion tracking    |            |  - Flip animations      |            |  - Subjects      |
|  - R2-D2 reward video     |            |  - Sound effects        |            |                  |
+---------------------------+            +-------------------------+            +------------------+
            |                                         |                                        |
            | 1) User clicks circle                   |                                        |
            |<----------------------------------------|                                        |
            |    handleSubjectComplete()              |                                        |
            |                                         | 2) Load facts from data               |
            |                                         |--------------------------------------->|
            |                                         |                                        |
            | 3) Update completed subjects            |                3) Return facts         |
            | 4) Play R2-D2 video                     |<---------------------------------------|
            | 5) Check if all completed               |                                        |
            | 6) Play winner sound + show reward     |                                        |
            v                                         v                                        v

Game Flow: Click → Learn Facts → Answer Question → Complete Subject → Win Game
Assets: /public/images/, /public/videos/, /public/sounds/
```

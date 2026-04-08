# OpenAI Chat App

A full-stack AI chat application with a React frontend and Node.js/Express backend integrated with OpenAI API.

## Tech Stack

**Frontend:**
- React 18+
- TypeScript
- Vite
- CSS Modules

**Backend:**
- Node.js
- TypeScript
- Express.js
- OpenAI API

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components (ChatMessage, ChatWindow, etc.)
│   │   ├── services/      # chatService.ts for API calls
│   │   ├── styles/        # Global styles and theme
│   │   ├── types/         # TypeScript types
│   │   └── App.tsx
│   └── package.json
├── Src/                   # Node.js backend
│   ├── controllers/       # Request handlers (aiController.ts)
│   ├── routes/           # API routes
│   ├── services/         # Business logic (openaiService.ts)
│   ├── config/           # Configuration (env.ts)
│   ├── types/            # TypeScript types
│   ├── utils/            # Utility functions
│   └── server.ts
└── package.json
```

## Prerequisites

- Node.js 16+ installed
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

## Setup

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../Src && npm install
cd ..
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 3. Running the Application

**Development Mode (both client and server):**

```bash
# Terminal 1: Start the backend
npm run dev:server

# Terminal 2: Start the frontend
npm run dev:client
```

**Production Mode:**

```bash
npm run build
npm start
```

## Available Commands

**Root:**
- `npm install` - Install all dependencies
- `npm run dev:server` - Start backend development server
- `npm run dev:client` - Start frontend development server

**Client:**
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Server:**
- `npm run dev` - Start with nodemon
- `npm run build` - Compile TypeScript
- `npm start` - Run compiled server

## API Documentation

### POST `/api/ai/chat`

Send a message to the OpenAI API and get a response.

**Request:**
```json
{
  "prompt": "Explain Generative AI in simple words"
}
```

**Response:**
```json
{
  "success": true,
  "message": "...",
  "data": {
    "response": "Generative AI refers to..."
  }
}
```

## Features

- Real-time chat interface
- TypeScript support for type safety
- Environment-based configuration
- Modular component architecture
- Responsive UI with CSS Modules


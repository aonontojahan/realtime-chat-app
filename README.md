# Realtime Chat App

A Slack-like, real-time chat application with user authentication, WebSocket messaging, channels, private messages, reactions, typing indicators, and file uploads.

## Tech Stack

### Backend
- FastAPI
- PostgreSQL
- SQLAlchemy
- WebSockets
- JWT Authentication

### Frontend
- Next.js (App Router)
- TailwindCSS
- shadcn/ui

## Features
- Sign up / sign in with JWT
- Public channels + private messaging
- Real-time message delivery over WebSockets
- Message history
- Typing indicators
- Online/offline status
- File uploads
- Emoji reactions

## Prerequisites
- Python 3.10+ (recommended)
- Node.js 18+ 
- PostgreSQL running (or provide your own DB connection details via environment variables)

## How to Run Locally

This project uses **two terminals**: one for the backend and one for the frontend.

### 1) Backend (FastAPI)

From the project root:
```bash
cd backend

# Create and activate virtual environment (Windows)
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn app.main:app --reload
```

Backend will be available at: `http://localhost:8000`.

### 2) Frontend (Next.js)

In a second terminal:
```bash
cd frontend

npm install
npm run dev
```
The frontend application will be accessible at `http://localhost:3000`.
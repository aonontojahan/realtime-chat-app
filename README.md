# Real-Time Chat Application

A professional Slack-like real-time chat application built with modern full-stack technologies.

## Backend
- FastAPI
- PostgreSQL
- SQLAlchemy
- WebSockets
- JWT Authentication.

## Frontend
- Next.js
- TailwindCSS
- Shadcn UI

## Features
- User authentication
- Channel creation
- Real-time messaging
- Private messaging
- Message history
- Typing indicators
- Online/offline status
- File uploads
- Emoji reactions

## Architecture
- Scalable backend structure
- WebSocket manager
- Clean service architecture
- Reusable frontend components

## Deployment
- Docker
- VPS deployment

## How to Run Locally

You will need two separate terminal windows in VS Code to run both the frontend and backend.

### 1. Backend (FastAPI)
Open a new terminal and run:
```bash
cd backend
# Create and activate virtual environment (Windows)
python -m venv venv
source venv/Scripts/activate
# For Mac/Linux use: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn app.main:app --reload
```
The backend API will be running at `http://localhost:8000`.

### 2. Frontend (Next.js)
Open another terminal and run:
```bash
cd frontend
# Install dependencies
npm install

# Run the frontend development server
npm run dev
```
The frontend application will be accessible at `http://localhost:3000`.

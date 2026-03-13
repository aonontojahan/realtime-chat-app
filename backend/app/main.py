from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routers import auth, users, channels, messages, reactions, uploads, ws

app = FastAPI(
    title="Real-Time Chat API",
    description="Slack-like chat application backend",
    version="1.0.0"
)

# CORS FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(channels.router)
app.include_router(messages.router)
app.include_router(reactions.router)
app.include_router(uploads.router)
app.include_router(ws.router)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


@app.get("/")
def root():
    return {"message": "Real-time chat server running"}
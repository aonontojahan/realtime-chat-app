from fastapi import FastAPI
from app.routers import auth, users, channels, messages, reactions, ws

app = FastAPI(
    title="Real-Time Chat API",
    description="Slack-like chat application backend",
    version="1.0.0"
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(channels.router)
app.include_router(messages.router)
app.include_router(reactions.router)
app.include_router(ws.router)


@app.get("/")
def root():
    return {"message": "Real-time chat server running"}
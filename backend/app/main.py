from fastapi import FastAPI
from app.routers import auth

app = FastAPI(
    title="Real-Time Chat API",
    description="Slack-like chat application backend",
    version="1.0.0"
)

app.include_router(auth.router)


@app.get("/")
def root():
    return {"message": "Real-time chat server running"}
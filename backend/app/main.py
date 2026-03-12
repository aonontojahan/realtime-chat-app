from fastapi import FastAPI

app = FastAPI(
    title="Real-Time Chat API",
    description="Slack-like chat application backend",
    version="1.0.0"
)

@app.get("/")
def root():
    return {"message": "Real-time chat server running"}
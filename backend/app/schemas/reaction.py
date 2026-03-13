from pydantic import BaseModel


class ReactionCreate(BaseModel):
    emoji: str
    message_id: int


class ReactionResponse(BaseModel):
    id: int
    emoji: str
    user_id: int
    message_id: int

    class Config:
        from_attributes = True
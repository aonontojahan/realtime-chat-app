from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class MessageCreate(BaseModel):
    content: str
    channel_id: int
    reply_to_id: Optional[int] = None


class MessageReplyPreview(BaseModel):
    id: int
    content: str
    email: Optional[str] = None
    
    class Config:
        from_attributes = True


class MessageResponse(BaseModel):
    id: int
    content: str
    user_id: int
    channel_id: int
    reply_to_id: Optional[int] = None
    reply_to_message: Optional[MessageReplyPreview] = None
    email: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
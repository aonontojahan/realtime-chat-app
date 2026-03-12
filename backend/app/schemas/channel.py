from pydantic import BaseModel
from datetime import datetime


class ChannelCreate(BaseModel):
    name: str


class ChannelResponse(BaseModel):
    id: int
    name: str
    created_at: datetime

    class Config:
        from_attributes = True


class ChannelMemberResponse(BaseModel):
    user_id: int
    channel_id: int

    class Config:
        from_attributes = True
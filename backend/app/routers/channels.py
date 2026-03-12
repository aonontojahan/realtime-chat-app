from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.channel import ChannelCreate, ChannelResponse
from app.services.channel_service import create_channel, get_channels, join_channel

router = APIRouter(prefix="/channels", tags=["Channels"])


@router.post("/", response_model=ChannelResponse)
def create(channel: ChannelCreate,
           db: Session = Depends(get_db),
           current_user: User = Depends(get_current_user)):

    return create_channel(db, channel)


@router.get("/", response_model=list[ChannelResponse])
def list_channels(db: Session = Depends(get_db),
                  current_user: User = Depends(get_current_user)):

    return get_channels(db)


@router.post("/{channel_id}/join")
def join(channel_id: int,
         db: Session = Depends(get_db),
         current_user: User = Depends(get_current_user)):

    return join_channel(db, current_user.id, channel_id)
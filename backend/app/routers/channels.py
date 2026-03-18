from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.channel import ChannelCreate, ChannelResponse, ChannelMemberResponse
from app.services.channel_service import (
    create_channel,
    get_channels,
    join_channel,
    get_channel_members
)

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


@router.post("/{channel_id}/join", response_model=ChannelMemberResponse)
def join(channel_id: int,
         db: Session = Depends(get_db),
         current_user: User = Depends(get_current_user)):

    return join_channel(db, current_user.id, channel_id)


@router.get("/{channel_id}/members", response_model=list[ChannelMemberResponse])
def members(channel_id: int,
            db: Session = Depends(get_db),
            current_user: User = Depends(get_current_user)):

    return get_channel_members(db, channel_id)


@router.post("/dm/{other_user_id}", response_model=ChannelResponse)
def get_or_create_dm(other_user_id: int,
                     db: Session = Depends(get_db),
                     current_user: User = Depends(get_current_user)):

    from app.services.channel_service import get_or_create_dm_channel
    return get_or_create_dm_channel(db, current_user.id, other_user_id)
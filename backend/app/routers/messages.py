from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.message import MessageCreate, MessageResponse
from app.services.message_service import create_message, get_channel_messages

router = APIRouter(prefix="/messages", tags=["Messages"])


@router.post("/", response_model=MessageResponse)
def send_message(message: MessageCreate,
                 db: Session = Depends(get_db),
                 current_user: User = Depends(get_current_user)):

    return create_message(db, current_user.id, message)


@router.get("/channels/{channel_id}", response_model=list[MessageResponse])
def get_messages(channel_id: int,
                 db: Session = Depends(get_db),
                 current_user: User = Depends(get_current_user)):

    return get_channel_messages(db, channel_id)
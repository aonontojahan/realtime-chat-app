from sqlalchemy.orm import Session
from app.models.message import Message
from app.schemas.message import MessageCreate


def create_message(db: Session, user_id: int, message: MessageCreate):
    new_message = Message(
        content=message.content,
        user_id=user_id,
        channel_id=message.channel_id
    )

    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return new_message


def get_channel_messages(db: Session, channel_id: int):
    return db.query(Message).filter(
        Message.channel_id == channel_id
    ).order_by(Message.created_at.asc()).all()
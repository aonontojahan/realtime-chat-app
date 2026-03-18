from sqlalchemy.orm import Session
from app.models.message import Message
from app.models.user import User
from app.schemas.message import MessageCreate


def create_message(db: Session, user_id: int, message: MessageCreate):

    new_message = Message(
        content=message.content,
        channel_id=message.channel_id,
        user_id=user_id,
        reply_to_id=message.reply_to_id
    )

    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return new_message


def get_channel_messages(db: Session, channel_id: int):

    messages = (
        db.query(Message)
        .join(User, Message.user_id == User.id)
        .filter(Message.channel_id == channel_id)
        .order_by(Message.id)
        .all()
    )

    result = []

    for msg in messages:
        reply_preview = None
        if msg.reply_to_message:
            reply_preview = {
                "id": msg.reply_to_message.id,
                "content": msg.reply_to_message.content,
                "email": msg.reply_to_message.user.email
            }

        result.append({
            "id": msg.id,
            "content": msg.content,
            "user_id": msg.user_id,
            "channel_id": msg.channel_id,
            "reply_to_id": msg.reply_to_id,
            "reply_to_message": reply_preview,
            "email": msg.user.email,
            "created_at": msg.created_at
        })

    return result
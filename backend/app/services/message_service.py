from sqlalchemy.orm import Session
from app.models.message import Message
from app.models.user import User
from app.schemas.message import MessageCreate


def create_message(db: Session, user_id: int, message: MessageCreate):

    new_message = Message(
        content=message.content,
        channel_id=message.channel_id,
        user_id=user_id
    )

    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return new_message


def get_channel_messages(db: Session, channel_id: int):

    messages = (
        db.query(Message, User.email)
        .join(User, Message.user_id == User.id)
        .filter(Message.channel_id == channel_id)
        .order_by(Message.id)
        .all()
    )

    result = []

    for msg, email in messages:

        result.append({
            "id": msg.id,
            "content": msg.content,
            "user_id": msg.user_id,
            "channel_id": msg.channel_id,
            "email": email
        })

    return result
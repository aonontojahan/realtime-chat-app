from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)

    content = Column(String, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"))
    channel_id = Column(Integer, ForeignKey("channels.id"))
    reply_to_id = Column(Integer, ForeignKey("messages.id"), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")
    reply_to_message = relationship("Message", remote_side=[id])
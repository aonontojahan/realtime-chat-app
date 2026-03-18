from sqlalchemy import Column, Integer, ForeignKey
from app.core.database import Base


class ChannelMember(Base):
    __tablename__ = "channel_members"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    channel_id = Column(Integer, ForeignKey("channels.id"))
    last_read_message_id = Column(Integer, ForeignKey("messages.id"), nullable=True)
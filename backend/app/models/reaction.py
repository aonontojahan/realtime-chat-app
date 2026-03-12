from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base


class Reaction(Base):
    __tablename__ = "reactions"

    id = Column(Integer, primary_key=True, index=True)

    emoji = Column(String)

    user_id = Column(Integer, ForeignKey("users.id"))
    message_id = Column(Integer, ForeignKey("messages.id"))
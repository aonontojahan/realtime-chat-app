from sqlalchemy.orm import Session
from app.models.channel import Channel
from app.schemas.channel import ChannelCreate


def create_channel(db: Session, channel: ChannelCreate):
    new_channel = Channel(name=channel.name)

    db.add(new_channel)
    db.commit()
    db.refresh(new_channel)

    return new_channel


def get_channels(db: Session):
    return db.query(Channel).all()
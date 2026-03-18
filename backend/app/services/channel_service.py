from sqlalchemy.orm import Session
from app.models.channel import Channel
from app.models.channel_member import ChannelMember
from app.schemas.channel import ChannelCreate


def create_channel(db: Session, channel: ChannelCreate):
    new_channel = Channel(name=channel.name)

    db.add(new_channel)
    db.commit()
    db.refresh(new_channel)

    return new_channel


def get_channels(db: Session):
    return db.query(Channel).all()


def join_channel(db: Session, user_id: int, channel_id: int):
    existing = db.query(ChannelMember).filter(
        ChannelMember.user_id == user_id,
        ChannelMember.channel_id == channel_id
    ).first()

    if existing:
        return existing

    member = ChannelMember(
        user_id=user_id,
        channel_id=channel_id
    )

    db.add(member)
    db.commit()
    db.refresh(member)

    return member


def get_channel_members(db: Session, channel_id: int):
    return db.query(ChannelMember).filter(
        ChannelMember.channel_id == channel_id
    ).all()


def get_or_create_dm_channel(db: Session, user1_id: int, user2_id: int):
    name1 = f"dm_{user1_id}_{user2_id}"
    name2 = f"dm_{user2_id}_{user1_id}"
    
    existing = db.query(Channel).filter(
        (Channel.name == name1) | (Channel.name == name2)
    ).first()
    
    if existing:
        return existing
        
    new_channel = Channel(name=name1, is_direct=True)
    db.add(new_channel)
    db.flush()
    
    m1 = ChannelMember(user_id=user1_id, channel_id=new_channel.id)
    m2 = ChannelMember(user_id=user2_id, channel_id=new_channel.id)
    db.add_all([m1, m2])
    db.commit()
    db.refresh(new_channel)
    
    return new_channel
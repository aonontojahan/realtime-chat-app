from sqlalchemy.orm import Session
from app.models.reaction import Reaction
from app.schemas.reaction import ReactionCreate


def add_reaction(db: Session, user_id: int, reaction: ReactionCreate):

    existing = db.query(Reaction).filter(
        Reaction.user_id == user_id,
        Reaction.message_id == reaction.message_id,
        Reaction.emoji == reaction.emoji
    ).first()

    if existing:
        return existing

    new_reaction = Reaction(
        emoji=reaction.emoji,
        user_id=user_id,
        message_id=reaction.message_id
    )

    db.add(new_reaction)
    db.commit()
    db.refresh(new_reaction)

    return new_reaction


def get_message_reactions(db: Session, message_id: int):

    return db.query(Reaction).filter(
        Reaction.message_id == message_id
    ).all()
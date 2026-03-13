from sqlalchemy.orm import Session
from app.models.user import User


def set_user_online(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()

    if user:
        user.is_online = True
        db.commit()


def set_user_offline(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()

    if user:
        user.is_online = False
        db.commit()
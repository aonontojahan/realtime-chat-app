from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.core.security import hash_password, verify_password


def create_user(db: Session, user: UserCreate):
    # check if email already exists
    existing_email = db.query(User).filter(User.email == user.email).first()
    if existing_email:
        raise ValueError("Email already registered")

    # check if username already exists
    existing_username = db.query(User).filter(User.username == user.username).first()
    if existing_username:
        raise ValueError("Username already taken")

    hashed_password = hash_password(user.password)

    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def authenticate_user(db: Session, user: UserLogin):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        return None

    if not verify_password(user.password, db_user.hashed_password):
        return None

    return db_user
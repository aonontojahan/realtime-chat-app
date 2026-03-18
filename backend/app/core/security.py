import bcrypt
import hashlib
from datetime import datetime, timedelta
from jose import jwt
from app.core.config import settings


def hash_password(password: str) -> str:
    # Use SHA-256 to guarantee we never exceed bcrypt's 72-byte limit
    hashed_sha256 = hashlib.sha256(password.encode()).hexdigest()
    # bcrypt expects bytes for both password and salt
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(hashed_sha256.encode(), salt).decode()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        hashed_sha256 = hashlib.sha256(plain_password.encode()).hexdigest()
        return bcrypt.checkpw(hashed_sha256.encode(), hashed_password.encode())
    except (ValueError, TypeError):
        return False


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )

    return encoded_jwt
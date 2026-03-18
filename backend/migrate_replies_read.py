from app.core.database import engine
from sqlalchemy import text
import sys

try:
    with engine.connect() as conn:
        conn.execute(text("ALTER TABLE messages ADD COLUMN reply_to_id INTEGER REFERENCES messages(id);"))
        conn.execute(text("ALTER TABLE channel_members ADD COLUMN last_read_message_id INTEGER REFERENCES messages(id);"))
        conn.commit()
    print("Migration done successfully")
except Exception as e:
    print(f"Error: {e}")

from app.core.database import engine
from sqlalchemy import text
import sys

try:
    with engine.connect() as conn:
        conn.execute(text("ALTER TABLE channels ADD COLUMN is_direct BOOLEAN DEFAULT FALSE;"))
        conn.commit()
    print("Migration done successfully")
except Exception as e:
    if "already exists" in str(e).lower():
        print("Column already exists")
    else:
        print(f"Error: {e}")
        sys.exit(1)

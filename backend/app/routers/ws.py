from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session

from app.websocket.manager import manager
from app.core.database import SessionLocal
from app.schemas.message import MessageCreate
from app.services.message_service import create_message
from app.services.presence_service import set_user_online, set_user_offline
from app.models.user import User
from app.models.channel_member import ChannelMember

router = APIRouter()


@router.websocket("/ws/channels/{channel_id}")
async def websocket_endpoint(websocket: WebSocket, channel_id: int):

    db: Session = SessionLocal()

    user_id = int(websocket.query_params.get("user_id"))

    await manager.connect(channel_id, websocket)

    set_user_online(db, user_id)

    user = db.query(User).filter(User.id == user_id).first()

    try:
        while True:

            data = await websocket.receive_json()

            # MESSAGE EVENT
            if data.get("type") == "message":

                content = data.get("message")
                reply_to_id = data.get("reply_to_id")

                message_data = MessageCreate(
                    content=content,
                    channel_id=channel_id,
                    reply_to_id=reply_to_id
                )

                saved_message = create_message(
                    db=db,
                    user_id=user_id,
                    message=message_data
                )
                
                reply_preview = None
                if saved_message.reply_to_message:
                    reply_preview = {
                        "id": saved_message.reply_to_message.id,
                        "content": saved_message.reply_to_message.content,
                        "email": saved_message.reply_to_message.user.email
                    }

                await manager.broadcast(channel_id, {
                    "type": "message",
                    "id": saved_message.id,
                    "content": saved_message.content,
                    "user_id": saved_message.user_id,
                    "email": user.email,
                    "reply_to_id": saved_message.reply_to_id,
                    "reply_to_message": reply_preview,
                    "channel_id": saved_message.channel_id
                })

            # MARK READ EVENT
            if data.get("type") == "mark_read":
                message_id = data.get("message_id")
                
                member = db.query(ChannelMember).filter(
                    ChannelMember.user_id == user_id, 
                    ChannelMember.channel_id == channel_id
                ).first()
                if member:
                    if not member.last_read_message_id or message_id > member.last_read_message_id:
                        member.last_read_message_id = message_id
                        db.commit()
                        
                        await manager.broadcast(channel_id, {
                            "type": "read_receipt",
                            "user_id": user_id,
                            "email": user.email,
                            "message_id": message_id
                        })

            # TYPING EVENT
            if data.get("type") == "typing":

                await manager.broadcast(channel_id, {
                    "type": "typing",
                    "user_id": user_id
                })

            # REACTION EVENT
            if data.get("type") == "reaction":

                await manager.broadcast(channel_id, {
                    "type": "reaction",
                    "message_id": data.get("message_id"),
                    "emoji": data.get("emoji"),
                    "user_id": user_id
                })

    except WebSocketDisconnect:

        manager.disconnect(channel_id, websocket)

        set_user_offline(db, user_id)
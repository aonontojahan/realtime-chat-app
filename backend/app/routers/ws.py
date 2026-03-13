from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session

from app.websocket.manager import manager
from app.core.database import SessionLocal
from app.schemas.message import MessageCreate
from app.services.message_service import create_message

router = APIRouter()


@router.websocket("/ws/channels/{channel_id}")
async def websocket_endpoint(websocket: WebSocket, channel_id: int):

    await manager.connect(channel_id, websocket)

    db: Session = SessionLocal()

    try:
        while True:
            data = await websocket.receive_json()

            event_type = data.get("type")

            # Typing indicator
            if event_type == "typing":

                await manager.broadcast(channel_id, {
                    "type": "typing",
                    "user_id": data.get("user_id")
                })

            # Chat message
            if event_type == "message":

                message_data = MessageCreate(
                    content=data.get("message"),
                    channel_id=channel_id
                )

                saved_message = create_message(
                    db=db,
                    user_id=data.get("user_id"),
                    message=message_data
                )

                broadcast_data = {
                    "type": "message",
                    "id": saved_message.id,
                    "content": saved_message.content,
                    "user_id": saved_message.user_id,
                    "channel_id": saved_message.channel_id,
                    "created_at": str(saved_message.created_at)
                }

                await manager.broadcast(channel_id, broadcast_data)

    except WebSocketDisconnect:
        manager.disconnect(channel_id, websocket)
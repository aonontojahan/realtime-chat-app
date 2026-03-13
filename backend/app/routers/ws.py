from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session

from app.websocket.manager import manager
from app.core.database import SessionLocal
from app.schemas.message import MessageCreate
from app.services.message_service import create_message
from app.services.presence_service import set_user_online, set_user_offline

router = APIRouter()


@router.websocket("/ws/channels/{channel_id}")
async def websocket_endpoint(websocket: WebSocket, channel_id: int):

    db: Session = SessionLocal()

    user_id = int(websocket.query_params.get("user_id"))

    await manager.connect(channel_id, websocket)

    set_user_online(db, user_id)

    try:
        while True:

            data = await websocket.receive_json()

            # MESSAGE EVENT
            if data.get("type") == "message":

                content = data.get("message")

                message_data = MessageCreate(
                    content=content,
                    channel_id=channel_id
                )

                saved_message = create_message(
                    db=db,
                    user_id=user_id,
                    message=message_data
                )

                await manager.broadcast(channel_id, {
                    "type": "message",
                    "id": saved_message.id,
                    "content": saved_message.content,
                    "user_id": saved_message.user_id,
                    "channel_id": saved_message.channel_id
                })

            # TYPING EVENT
            if data.get("type") == "typing":

                await manager.broadcast(channel_id, {
                    "type": "typing",
                    "user_id": user_id
                })

    except WebSocketDisconnect:

        manager.disconnect(channel_id, websocket)

        set_user_offline(db, user_id)
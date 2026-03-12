from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.websocket.manager import manager

router = APIRouter()


@router.websocket("/ws/channels/{channel_id}")
async def websocket_endpoint(websocket: WebSocket, channel_id: int):

    await manager.connect(channel_id, websocket)

    try:
        while True:
            data = await websocket.receive_json()

            message = {
                "channel_id": channel_id,
                "message": data.get("message")
            }

            await manager.broadcast(channel_id, message)

    except WebSocketDisconnect:
        manager.disconnect(channel_id, websocket)
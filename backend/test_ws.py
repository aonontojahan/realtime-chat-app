import asyncio
import websockets
import json


async def test():
    uri = "ws://127.0.0.1:8000/ws/channels/1"

    async with websockets.connect(uri) as websocket:
        message = {
            "message": "Hello from client"
        }

        await websocket.send(json.dumps(message))

        response = await websocket.recv()
        print("Received:", response)


asyncio.run(test())
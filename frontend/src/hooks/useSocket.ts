import { useEffect, useRef } from "react"

export default function useSocket(channelId: number, userId: number) {

  const socket = useRef<WebSocket | null>(null)

  useEffect(() => {

    socket.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/channels/${channelId}?user_id=${userId}`
    )

    socket.current.onmessage = (event) => {
      console.log("Message received:", event.data)
    }

    return () => {
      socket.current?.close()
    }

  }, [channelId, userId])

  return socket

}
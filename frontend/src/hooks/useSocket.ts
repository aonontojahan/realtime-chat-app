"use client"

import { useEffect, useRef, useState } from "react"

export default function useSocket(channelId: number, userId: number) {

  const socket = useRef<WebSocket | null>(null)
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {

    socket.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/channels/${channelId}?user_id=${userId}`
    )

    socket.current.onmessage = (event) => {

      const data = JSON.parse(event.data)

      if (data.type === "message") {
        setMessages((prev) => [...prev, data])
      }

    }

    return () => {
      socket.current?.close()
    }

  }, [channelId, userId])

  const sendMessage = (message: string) => {

    socket.current?.send(
      JSON.stringify({
        type: "message",
        message
      })
    )

  }

  return { messages, sendMessage }

}
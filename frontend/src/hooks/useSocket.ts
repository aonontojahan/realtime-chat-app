"use client"

import { useEffect, useRef, useState } from "react"
import { getChannelMessages } from "@/services/channel"

export default function useSocket(channelId:number,userId:number){

  const socketRef = useRef<WebSocket | null>(null)
  const [messages,setMessages] = useState<any[]>([])
  const [typingUser,setTypingUser] = useState<number | null>(null)

  useEffect(()=>{

    async function loadHistory(){

      const history = await getChannelMessages(channelId)

      setMessages(history)

    }

    loadHistory()

    const ws = new WebSocket(
      `ws://127.0.0.1:8000/ws/channels/${channelId}?user_id=${userId}`
    )

    socketRef.current = ws

    ws.onmessage = (event)=>{

      const data = JSON.parse(event.data)

      if(data.type === "message"){

        setMessages(prev => [...prev,data])

      }

      if(data.type === "typing"){

        setTypingUser(data.user_id)

        setTimeout(()=>{
          setTypingUser(null)
        },2000)

      }

    }

    return ()=>{
      ws.close()
    }

  },[channelId,userId])


  const sendMessage = (message:string)=>{

    socketRef.current?.send(JSON.stringify({
      type:"message",
      message:message,
      user_id:userId
    }))

  }

  const sendTyping = ()=>{

    socketRef.current?.send(JSON.stringify({
      type:"typing"
    }))

  }

  return {messages,sendMessage,sendTyping,typingUser}

}
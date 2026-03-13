"use client"

import { useEffect, useRef, useState } from "react"

export default function useSocket(channelId:number,userId:number){

  const socketRef = useRef<WebSocket | null>(null)
  const [messages,setMessages] = useState<any[]>([])

  useEffect(()=>{

    const ws = new WebSocket(
      `ws://127.0.0.1:8000/ws/channels/${channelId}?user_id=${userId}`
    )

    socketRef.current = ws

    ws.onopen = () => {
      console.log("WebSocket connected")
    }

    ws.onmessage = (event)=>{

      const data = JSON.parse(event.data)

      console.log("Incoming:",data)

      if(data.type === "message"){
        setMessages(prev => [...prev,data])
      }

    }

    ws.onclose = () => {
      console.log("WebSocket closed")
    }

    ws.onerror = (err)=>{
      console.log("WebSocket error",err)
    }

    return ()=>{
      ws.close()
    }

  },[channelId,userId])


  const sendMessage = (message:string)=>{

    if(!socketRef.current) return

    if(socketRef.current.readyState !== WebSocket.OPEN){
      console.log("Socket not ready")
      return
    }

    socketRef.current.send(JSON.stringify({
      type:"message",
      message:message,
      user_id:userId
    }))

  }

  return {messages,sendMessage}

}
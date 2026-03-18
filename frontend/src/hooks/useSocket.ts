"use client"

import { useEffect, useRef, useState } from "react"
import { getChannelMessages } from "@/services/channel"

export default function useSocket(channelId:number,userId:number){

  const socketRef = useRef<WebSocket | null>(null)

  const [messages,setMessages] = useState<any[]>([])
  const [typingUser,setTypingUser] = useState<number | null>(null)
  const [readReceipts, setReadReceipts] = useState<Record<number, {email: string, message_id: number}>>({})

  useEffect(()=>{

    async function loadHistory(){
      const history = await getChannelMessages(channelId)
      setMessages(history)
      // Automatically mark latest message as read on load
      if(history.length > 0) {
        setTimeout(() => {
          socketRef.current?.send(JSON.stringify({
            type: "mark_read",
            message_id: history[history.length - 1].id,
            user_id: userId
          }))
        }, 500)
      }
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
        // Mark as read when receiving a new message if it's not from us
        if (data.user_id !== userId) {
            ws.send(JSON.stringify({
                type: "mark_read",
                message_id: data.id,
                user_id: userId
            }))
        }
      }

      if(data.type === "typing"){
        setTypingUser(data.user_id)
        setTimeout(()=>setTypingUser(null),2000)
      }

      if(data.type === "read_receipt"){
        setReadReceipts(prev => ({
          ...prev,
          [data.user_id]: { email: data.email, message_id: data.message_id }
        }))
      }
    }

    return ()=> ws.close()

  },[channelId,userId])


  const sendMessage = (message:string, replyToId?: number)=>{
    socketRef.current?.send(JSON.stringify({
      type:"message",
      message:message,
      user_id:userId,
      reply_to_id: replyToId
    }))
  }

  const sendTyping = ()=>{
    socketRef.current?.send(JSON.stringify({
      type:"typing"
    }))
  }

  const markRead = (messageId: number) => {
    socketRef.current?.send(JSON.stringify({
      type: "mark_read",
      message_id: messageId,
      user_id: userId
    }))
  }

  return {messages,sendMessage,sendTyping,typingUser,readReceipts, markRead}

}
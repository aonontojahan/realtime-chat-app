"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import ChatLayout from "@/components/layout/ChatLayout"

export default function Home() {

  const router = useRouter()

  useEffect(()=>{

    const token = localStorage.getItem("token")

    if(!token){
      router.push("/login")
    }

  },[])

  return <ChatLayout/>

}
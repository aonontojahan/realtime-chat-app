import Sidebar from "./Sidebar"
import ChatWindow from "../chat/ChatWindow"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ChatLayout() {
  const router = useRouter()
  const [activeChannel, setActiveChannel] = useState<any>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }
    const userId = localStorage.getItem("userId")
    const username = localStorage.getItem("username")
    const email = localStorage.getItem("email")
    setCurrentUser({ id: Number(userId), username, email })
  }, [router])

  if (!currentUser) return <div className="h-screen bg-zinc-950 flex flex-col items-center justify-center text-white">Loading...</div>

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden font-sans">
      <Sidebar 
        onSelectChannel={(channel: any) => setActiveChannel(channel)} 
        activeChannelId={activeChannel?.id} 
      />
      
      <div className="flex-1 flex flex-col bg-zinc-900 shadow-2xl z-10 m-2 ml-0 rounded-2xl overflow-hidden border border-white/10 ring-1 ring-white/5">
        {activeChannel ? (
          <ChatWindow channel={activeChannel} currentUser={currentUser} key={activeChannel.id} />
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col text-zinc-500 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/50 to-zinc-900">
            <div className="w-32 h-32 mb-8 rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-white/5 backdrop-blur-3xl shadow-2xl">
              <span className="text-5xl drop-shadow-lg">✨</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-zinc-200 to-zinc-500 bg-clip-text text-transparent">Your Messages</h2>
            <p className="mt-3 text-zinc-500 font-medium">Select a chat from the sidebar to start messaging.</p>
          </div>
        )}
      </div>
    </div>
  )
}
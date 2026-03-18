"use client"
import { useEffect, useState } from "react"
import { fetchUsers } from "@/services/users"
import { fetchChannels, createGroup, getOrCreateDirectMessage } from "@/services/channels"
import { useRouter } from "next/navigation"

export default function Sidebar({ onSelectChannel, activeChannelId }: any) {
  const [users, setUsers] = useState<any[]>([])
  const [groups, setGroups] = useState<any[]>([])
  const [tab, setTab] = useState<"dms" | "groups">("dms")
  const [newGroupName, setNewGroupName] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()

  const loadData = async () => {
    try {
      const ms = await fetchUsers()
      const chs = await fetchChannels()
      setUsers(ms)
      setGroups(chs.filter((c:any) => !c.is_direct))
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleUserClick = async (user: any) => {
    try {
      const channel = await getOrCreateDirectMessage(user.id)
      onSelectChannel({...channel, displayName: user.username})
    } catch {
      alert("Failed to open DM")
    }
  }

  const handleGroupClick = (group: any) => {
    onSelectChannel({...group, displayName: `# ${group.name}`})
  }

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return
    try {
      const g = await createGroup(newGroupName)
      setGroups([...groups, g])
      setNewGroupName("")
      setIsCreating(false)
      handleGroupClick(g)
    } catch {
      alert("Failed to create group")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("email")
    localStorage.removeItem("username")
    router.push("/login")
  }

  const currentUser = typeof window !== "undefined" ? localStorage.getItem("username") : ""

  return (
    <div className="w-80 bg-zinc-950 flex flex-col h-full border-r border-zinc-900">
      
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-black tracking-tight bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-sm">
            Messenger
          </h1>
          <button onClick={handleLogout} className="text-xs font-semibold px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700/80 rounded-lg text-zinc-300 transition-all active:scale-95 shadow-inner border border-white/5">
            Logout
          </button>
        </div>
        
        <div className="flex bg-zinc-900 rounded-xl p-1 gap-1 border border-white/5 shadow-inner">
          <button 
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === 'dms' ? 'bg-zinc-700/80 text-white shadow-md border-t border-white/10' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30'}`}
            onClick={()=>setTab("dms")}
          >
            Direct
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === 'groups' ? 'bg-zinc-700/80 text-white shadow-md border-t border-white/10' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30'}`}
            onClick={()=>setTab("groups")}
          >
            Groups
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-1">
        {tab === "dms" ? (
          users.length === 0 ? (
            <div className="text-center text-zinc-500 mt-10 text-sm font-medium">No users found</div>
          ) : (
            users.map((u) => (
              <div 
                key={u.id} 
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${activeChannelId === u.id ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/20' : 'hover:bg-zinc-900 text-zinc-300 border border-transparent'}`}
                onClick={() => handleUserClick(u)}
              >
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md border border-white/10">
                    {u.username.charAt(0).toUpperCase()}
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-zinc-950 rounded-full ${u.is_online ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-zinc-600'}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate text-zinc-200">{u.username}</div>
                  <div className="text-xs text-zinc-500 truncate font-medium">{u.email}</div>
                </div>
              </div>
            ))
          )
        ) : (
          <>
            {isCreating ? (
              <div className="mb-4 p-3 bg-zinc-900 rounded-xl border border-zinc-700 shadow-xl">
                <input 
                  autoFocus
                  placeholder="Group name..." 
                  value={newGroupName} 
                  onChange={(e)=>setNewGroupName(e.target.value)}
                  className="w-full bg-zinc-950 text-sm p-2.5 rounded-lg text-white outline-none focus:ring-2 ring-indigo-500 border border-zinc-800 transition-all font-medium"
                />
                <div className="flex gap-2 mt-3">
                  <button onClick={handleCreateGroup} className="flex-1 text-xs font-bold bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg transition-all shadow-md active:scale-95">Create</button>
                  <button onClick={()=>setIsCreating(false)} className="flex-1 text-xs font-bold bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded-lg transition-all active:scale-95">Cancel</button>
                </div>
              </div>
            ) : (
              <button 
                onClick={()=>setIsCreating(true)}
                className="w-full p-3 border border-dashed border-zinc-700/60 text-zinc-400 rounded-xl hover:text-white hover:border-zinc-500 hover:bg-zinc-900 transition-all font-semibold text-sm mb-3 shadow-sm"
              >
                + Create New Group
              </button>
            )}
            
            {groups.map((g) => (
              <div 
                key={g.id} 
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${activeChannelId === g.id ? 'bg-purple-600/20 text-purple-200 border border-purple-500/20' : 'hover:bg-zinc-900 text-zinc-300 border border-transparent'}`}
                onClick={() => handleGroupClick(g)}
              >
                <div className="w-11 h-11 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold border border-white/5 shadow-inner">
                  #
                </div>
                <div className="font-semibold truncate flex-1">{g.name}</div>
              </div>
            ))}
          </>
        )}
      </div>
      
      {/* Bottom Profile */}
      <div className="p-5 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
        <div className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold border border-zinc-700 shadow-inner group-hover:bg-zinc-700 transition-colors">
            {currentUser?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">{currentUser}</div>
            <div className="text-xs font-semibold text-green-400/90 flex items-center gap-1.5 mt-0.5">
               <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></span>
               Online
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
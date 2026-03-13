"use client"

import { useRouter } from "next/navigation"

export default function Sidebar() {

  const router = useRouter()

  const logout = () => {

    localStorage.removeItem("token")

    router.push("/login")

  }

  return (

    <div className="w-20 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center py-4 justify-between">

      <div className="text-white font-bold text-lg">
        Chat
      </div>

      <div className="space-y-4">

        <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-zinc-700">
          #
        </div>

        <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-zinc-700">
          +
        </div>

      </div>

      <button
        onClick={logout}
        className="text-red-400 text-sm"
      >
        Logout
      </button>

    </div>

  )

}
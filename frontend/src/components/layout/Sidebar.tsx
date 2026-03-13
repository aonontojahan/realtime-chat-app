"use client"

export default function Sidebar() {

  return (

    <div className="w-20 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center justify-between py-4">

      {/* Top Logo */}
      <div className="text-white font-bold text-lg">
        Chat
      </div>

      {/* Channel Buttons */}
      <div className="flex flex-col items-center gap-4">

        <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white hover:bg-zinc-700 cursor-pointer">
          #
        </div>

        <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white hover:bg-zinc-700 cursor-pointer">
          +
        </div>

      </div>

      {/* Bottom Avatar */}
      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
        U
      </div>

    </div>

  )

}
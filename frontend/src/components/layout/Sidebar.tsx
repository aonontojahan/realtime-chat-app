export default function Sidebar() {
  return (
    <div className="w-20 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center py-4">
      <div className="text-white font-bold text-lg mb-6">Chat</div>

      <div className="space-y-4">
        <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-zinc-700">
          #
        </div>

        <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-zinc-700">
          +
        </div>
      </div>
    </div>
  )
}
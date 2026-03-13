export default function MessageInput() {
  return (
    <div className="p-4 border-t border-zinc-800">

      <input
        type="text"
        placeholder="Type a message..."
        className="w-full bg-zinc-800 text-white rounded-lg px-4 py-2 outline-none"
      />

    </div>
  )
}
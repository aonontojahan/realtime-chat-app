import MessageList from "./MessageList"
import MessageInput from "./MessageInput"

export default function ChatWindow() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-900">

      <div className="border-b border-zinc-800 p-4 text-white font-semibold">
        # general
      </div>

      <MessageList />

      <MessageInput />

    </div>
  )
}
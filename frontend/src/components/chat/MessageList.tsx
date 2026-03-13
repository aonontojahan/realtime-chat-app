export default function MessageList() {

  const messages = [
    { id: 1, user: "John", text: "Hello everyone!" },
    { id: 2, user: "Sarah", text: "Hi John 👋" }
  ]

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">

      {messages.map((msg) => (
        <div key={msg.id}>
          <span className="text-blue-400 font-medium">
            {msg.user}
          </span>

          <span className="text-zinc-300 ml-2">
            {msg.text}
          </span>
        </div>
      ))}

    </div>
  )
}
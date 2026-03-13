"use client"

export default function MessageList({ messages }: any) {

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">

      {messages.map((msg: any) => (

        <div key={msg.id} className="flex flex-col">

          <span className="text-blue-400 font-medium">
            User {msg.user_id}
          </span>

          <span className="text-zinc-300">
            {msg.content}
          </span>

        </div>

      ))}

    </div>
  )

}
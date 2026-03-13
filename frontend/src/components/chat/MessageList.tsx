"use client"

export default function MessageList({ messages }: any) {

  const currentUserId = 1

  return (

    <div className="flex-1 overflow-y-auto p-6 space-y-4">

      {messages.map((msg:any)=>{

        const isMe = msg.user_id === currentUserId

        return (

          <div
            key={msg.id}
            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
          >

            <div
              className={`px-4 py-2 rounded-xl max-w-xs ${
                isMe
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-white"
              }`}
            >

              {msg.content}

            </div>

          </div>

        )

      })}

    </div>

  )

}
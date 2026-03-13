"use client"

export default function MessageList({ messages, reactions, sendReaction }: any) {

  return (

    <div className="flex-1 overflow-y-auto p-6 space-y-4">

      {messages.map((msg:any)=>{

        const msgReactions = reactions.filter(
          (r:any)=> r.message_id === msg.id
        )

        return (

          <div key={msg.id} className="space-y-1">

            {/* Sender Email */}
            <div className="text-xs text-zinc-400">
              {msg.email}
            </div>

            {/* Message Bubble */}
            <div className="bg-zinc-800 text-white px-4 py-2 rounded-lg max-w-xs">

              {msg.content}

            </div>

            {/* Reactions */}
            <div className="flex gap-2 text-sm">

              {msgReactions.map((r:any,i:number)=>(
                <span key={i}>
                  {r.emoji}
                </span>
              ))}

              <button
                onClick={()=>sendReaction(msg.id,"👍")}
                className="text-zinc-400 hover:text-white"
              >
                +
              </button>

            </div>

          </div>

        )

      })}

    </div>

  )

}
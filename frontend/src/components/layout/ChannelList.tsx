"use client"

import { useEffect, useState } from "react"
import { getChannels } from "@/services/channel"

export default function ChannelList() {

  const [channels, setChannels] = useState<any[]>([])

  useEffect(() => {

    async function loadChannels() {

      const data = await getChannels()

      setChannels(data)

    }

    loadChannels()

  }, [])

  return (
    <div className="w-60 bg-zinc-950 border-r border-zinc-800 p-4">

      <h2 className="text-white font-semibold mb-4">
        Channels
      </h2>

      <div className="space-y-2">

        {channels.map((channel) => (

          <div
            key={channel.id}
            className="text-zinc-300 hover:bg-zinc-800 p-2 rounded cursor-pointer"
          >
            # {channel.name}
          </div>

        ))}

      </div>

    </div>
  )
}
export default function ChannelList() {

  const channels = ["general", "development", "random"]

  return (
    <div className="w-60 bg-zinc-950 border-r border-zinc-800 p-4">

      <h2 className="text-white font-semibold mb-4">
        Channels
      </h2>

      <div className="space-y-2">
        {channels.map((channel) => (
          <div
            key={channel}
            className="text-zinc-300 hover:bg-zinc-800 p-2 rounded cursor-pointer"
          >
            # {channel}
          </div>
        ))}
      </div>

    </div>
  )
}
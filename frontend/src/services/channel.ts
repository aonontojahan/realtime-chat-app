import api from "./api"

export async function getChannels() {
  const res = await api.get("/channels")
  return res.data
}

export async function getChannelMessages(channelId: number) {
  const res = await api.get(`/messages/channels/${channelId}`)
  return res.data
}
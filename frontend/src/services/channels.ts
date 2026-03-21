import api from "./api"

export async function fetchChannels() {
  const res = await api.get("/channels/")
  return res.data
}

export async function createGroup(name: string) {
  const res = await api.post("/channels/", { name, is_direct: false })
  return res.data
}

export async function getOrCreateDirectMessage(otherUserId: number) {
  const res = await api.post(`/channels/dm/${otherUserId}`, {})
  return res.data
}

import axios from "axios"

const API = "http://127.0.0.1:8000"

const getHeaders = () => {
  const token = localStorage.getItem("token")
  return { Authorization: `Bearer ${token}` }
}

export async function fetchChannels() {
  const res = await axios.get(`${API}/channels/`, { headers: getHeaders() })
  return res.data
}

export async function createGroup(name: string) {
  const res = await axios.post(`${API}/channels/`, { name, is_direct: false }, { headers: getHeaders() })
  return res.data
}

export async function getOrCreateDirectMessage(otherUserId: number) {
  const res = await axios.post(`${API}/channels/dm/${otherUserId}`, {}, { headers: getHeaders() })
  return res.data
}

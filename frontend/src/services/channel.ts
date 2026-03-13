import api from "./api"

export async function getChannels() {

  const token = localStorage.getItem("token")

  const res = await api.get("/channels", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.data
}

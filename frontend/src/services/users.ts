import api from "./api"

export async function fetchUsers() {
  const res = await api.get("/users/")
  return res.data
}

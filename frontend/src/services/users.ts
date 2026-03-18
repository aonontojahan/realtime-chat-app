import axios from "axios"

const API = "http://127.0.0.1:8000"

export async function fetchUsers() {
  const token = localStorage.getItem("token")
  if (!token) return []

  const res = await axios.get(`${API}/users/`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

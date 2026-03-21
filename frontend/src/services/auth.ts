import api from "./api"

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", {
    email,
    password
  })

  const token = res.data.access_token

  if (typeof window !== "undefined") {
    localStorage.setItem("token", token)
    localStorage.setItem("email", email)
    localStorage.setItem("userId", res.data.user.id.toString())
    localStorage.setItem("username", res.data.user.username)
  }

  return res.data
}

export async function register(username: string, email: string, password: string) {
  const res = await api.post("/auth/register", {
    username,
    email,
    password
  })

  return res.data
}
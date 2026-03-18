import axios from "axios"

const API = "http://127.0.0.1:8000"

export async function login(email: string, password: string) {

  const res = await axios.post(`${API}/auth/login`, {
    email,
    password
  })

  const token = res.data.access_token

  localStorage.setItem("token", token)
  localStorage.setItem("email", email)
  localStorage.setItem("userId", res.data.user.id.toString())
  localStorage.setItem("username", res.data.user.username)

  return res.data
}


export async function register(username: string, email: string, password: string) {

  const res = await axios.post(`${API}/auth/register`, {
    username,
    email,
    password
  })

  return res.data
}
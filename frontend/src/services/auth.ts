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

  return res.data
}


export async function register(email: string, password: string) {

  const res = await axios.post(`${API}/auth/register`, {
    email,
    password
  })

  return res.data
}
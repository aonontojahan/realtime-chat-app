import axios from "axios"

const API = "http://127.0.0.1:8000"

export async function login(email: string, password: string) {

  const response = await axios.post(`${API}/auth/login`, {
    email: email,
    password: password
  })

  const token = response.data.access_token

  localStorage.setItem("token", token)

  return token
}


export async function register(
  username: string,
  email: string,
  password: string
) {

  const response = await axios.post(`${API}/auth/register`, {
    username,
    email,
    password
  })

  return response.data

}
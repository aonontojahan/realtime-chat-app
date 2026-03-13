import api from "./api"

export async function login(email: string, password: string) {

  const res = await api.post("/auth/login", {
    email,
    password
  })

  const token = res.data.access_token

  localStorage.setItem("token", token)

  return token
}

export async function register(
  username: string,
  email: string,
  password: string
) {

  return api.post("/auth/register", {
    username,
    email,
    password
  })

}
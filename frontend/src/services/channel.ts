import axios from "axios"

const API = "http://127.0.0.1:8000"

function getAuthHeaders() {

  const token = localStorage.getItem("token")

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

}

export async function getChannels() {

  const res = await axios.get(
    `${API}/channels`,
    getAuthHeaders()
  )

  return res.data
}

export async function getChannelMessages(channelId:number){

  const res = await axios.get(
    `${API}/messages/channels/${channelId}`,
    getAuthHeaders()
  )

  return res.data
}
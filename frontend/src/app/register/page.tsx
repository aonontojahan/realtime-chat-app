"use client"

import { useState } from "react"
import { register } from "@/services/auth"
import { useRouter } from "next/navigation"

export default function RegisterPage() {

  const router = useRouter()

  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleRegister = async () => {

    try {

      await register(username,email,password)

      router.push("/login")

    } catch {

      alert("Register failed")

    }

  }

  return (

    <div className="flex items-center justify-center h-screen bg-zinc-900">

      <div className="bg-zinc-800 p-8 rounded-xl w-96 space-y-4">

        <h1 className="text-white text-2xl font-bold text-center">
          Register
        </h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          className="w-full p-2 bg-zinc-700 text-white rounded"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full p-2 bg-zinc-700 text-white rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full p-2 bg-zinc-700 text-white rounded"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 p-2 rounded text-white"
        >
          Register
        </button>

      </div>

    </div>

  )

}
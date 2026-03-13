"use client"

import { useState } from "react"
import { login } from "@/services/auth"
import { useRouter } from "next/navigation"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {

    try {

      await login(email, password)

      router.push("/")

    } catch (error) {

      alert("Login failed")

    }

  }

  return (

    <div className="flex items-center justify-center h-screen bg-zinc-900">

      <div className="bg-zinc-800 p-8 rounded-xl w-96 space-y-4">

        <h1 className="text-white text-2xl font-bold text-center">
          Login
        </h1>

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
          onClick={handleLogin}
          className="w-full bg-blue-600 p-2 rounded text-white"
        >
          Login
        </button>

      </div>

    </div>

  )

}
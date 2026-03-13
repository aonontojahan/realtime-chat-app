"use client"

import { useState } from "react"
import { login } from "@/services/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {

  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")

  const handleLogin = async () => {

    try {

      await login(email,password)

      router.push("/")

    } catch(err:any) {

      setError("Invalid email or password")

    }

  }

  return (

    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800">

      <div className="bg-zinc-900 border border-zinc-700 p-10 rounded-2xl w-96 shadow-xl space-y-6">

        <h1 className="text-3xl font-bold text-center text-white">
          Chat Login
        </h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none"
        />

        {error && (
          <p className="text-red-400 text-sm text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white font-semibold"
        >
          Login
        </button>

        <p className="text-zinc-400 text-sm text-center">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-400">
            Sign up
          </Link>
        </p>

      </div>

    </div>

  )

}
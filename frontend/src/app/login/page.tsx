"use client"

import { useState } from "react"
import { login } from "@/services/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/layout/Navbar"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    
    setLoading(true)
    setError("")
    
    try {
      await login(email, password)
      router.push("/chat")
    } catch (err: any) {
      setError("Invalid email or password")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-indigo-500/30 font-sans relative flex flex-col items-center justify-center">
      <Navbar />

      {/* Decorative Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[400px] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none -z-10" />

      <main className="w-full max-w-md px-6 relative z-10 pt-20">
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/5 p-8 sm:p-10 rounded-[2rem] shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black tracking-tight mb-2">Welcome Back</h1>
            <p className="text-zinc-400 text-sm font-medium">Log in to your workspace</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-zinc-950/50 border border-white/5 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-zinc-600 font-medium"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider" htmlFor="password">Password</label>
                <span className="text-xs text-indigo-400 cursor-pointer hover:text-indigo-300 font-medium">Forgot?</span>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-zinc-950/50 border border-white/5 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-zinc-600 font-medium"
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center font-medium bg-red-400/10 p-2.5 rounded-lg border border-red-400/20">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 py-3.5 rounded-xl text-white font-bold tracking-wide shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-white/5">
            <p className="text-zinc-500 text-sm font-medium">
              New to Nexus?{" "}
              <Link href="/register" className="text-indigo-400 hover:text-indigo-300 transition-colors font-semibold">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
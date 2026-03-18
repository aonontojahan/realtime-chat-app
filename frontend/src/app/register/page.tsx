"use client"

import { useState } from "react"
import { register } from "@/services/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/layout/Navbar"

export default function RegisterPage() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !email || !password) return

    setLoading(true)
    setError("")

    try {
      await register(username, email, password)
      router.push("/login")
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-indigo-500/30 font-sans relative flex flex-col items-center justify-center">
      <Navbar />

      {/* Decorative Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none -z-10" />

      <main className="w-full max-w-md px-6 relative z-10 pt-20">
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/5 p-8 sm:p-10 rounded-[2rem] shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black tracking-tight mb-2">Create Account</h1>
            <p className="text-zinc-400 text-sm font-medium">Join Nexus workspace today</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2" htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="display_name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-zinc-950/50 border border-white/5 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-zinc-600 font-medium"
                required
              />
            </div>
            
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
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-zinc-950/50 border border-white/5 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-zinc-600 font-medium"
                required
              />
              <p className="text-xs text-zinc-500 mt-2">Any length is supported securely.</p>
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
              {loading ? "Creating account..." : "Continue"}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-white/5">
            <p className="text-zinc-500 text-sm font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
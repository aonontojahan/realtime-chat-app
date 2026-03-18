"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    setIsLogged(!!localStorage.getItem("token"))
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group drop-shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:-rotate-6 group-hover:scale-105 transition-all">
            ✨
          </div>
          <span className="text-2xl font-black tracking-tighter bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">Nexus</span>
        </Link>
        <div className="flex items-center gap-4">
          {isLogged ? (
            <Link href="/chat" className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-sm tracking-wide hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Open App →
            </Link>
          ) : (
            <>
              <Link href="/login" className="px-5 py-2.5 rounded-full text-zinc-300 font-semibold text-sm hover:text-white hover:bg-white/5 transition-all">
                Login
              </Link>
              <Link href="/register" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all">
                Sign up free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

import Navbar from "@/components/layout/Navbar"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-indigo-500/30 font-sans selection:text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none -z-10" />
      
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-20 text-center relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-zinc-300 mb-8 backdrop-blur-md shadow-xl">
          <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
          Nexus is now live and stable
        </div>

        <h1 className="text-6xl md:text-[5.5rem] font-black tracking-tighter mb-8 leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-500 drop-shadow-sm max-w-5xl">
          Where your team <br/> 
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-md">
            connects instantly.
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mb-12 leading-relaxed font-medium">
          A lightning-fast, beautifully designed workspace built for the modern era. Stop switching apps and start doing your best work.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/register" className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-white text-black font-bold text-lg flex items-center justify-center hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-95">
            Start for free
          </Link>
          <Link href="/login" className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-zinc-900/50 border border-white/10 text-white font-bold text-lg flex items-center justify-center hover:bg-zinc-800 transition-all backdrop-blur-md active:scale-95 hover:border-white/20">
            Log into workspace
          </Link>
        </div>
      </main>
      
      {/* Decorative Bottom Graphic */}
      <div className="max-w-6xl mx-auto mt-20 relative z-10 px-6">
        <div className="rounded-t-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl h-[400px] border-b-0 shadow-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950 z-10 pointer-events-none"></div>
          {/* Mock UI Header */}
          <div className="h-14 border-b border-white/5 flex items-center px-6 gap-2 bg-black/20">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
          </div>
          {/* Mock content representation */}
          <div className="flex h-full">
            <div className="w-1/4 border-r border-white/5 p-4 flex flex-col gap-3">
              <div className="h-6 w-full rounded bg-white/5"></div>
              <div className="h-6 w-3/4 rounded bg-white/5"></div>
              <div className="h-6 w-5/6 rounded bg-white/5"></div>
            </div>
            <div className="flex-1 p-8 flex flex-col gap-4">
              <div className="h-20 w-3/4 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 self-end border border-white/5"></div>
              <div className="h-16 w-1/2 rounded-xl bg-white/5 self-start border border-white/5"></div>
              <div className="h-24 w-2/3 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 self-end border border-white/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
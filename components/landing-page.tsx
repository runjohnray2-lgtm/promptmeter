"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PromptAnalyzer } from "@/components/prompt-analyzer";
import { 
  Zap, DollarSign, BarChart3, Layers, Clock, Shield, 
  ChevronDown, CheckCircle2, ArrowRight, Mail, Sparkles
} from "lucide-react";

const FEATURES = [
  {
    icon: DollarSign,
    title: "Real Pricing, Not Guesses",
    desc: "Live API prices from 15+ providers — OpenAI, Anthropic, Google, DeepSeek, Runway, ElevenLabs and more.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
  },
  {
    icon: BarChart3,
    title: "Side-by-Side Provider Compare",
    desc: "See exactly how much the same prompt costs on each LLM. Pick the cheapest, fastest, or best for your budget.",
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
  },
  {
    icon: Zap,
    title: "Instant Optimization",
    desc: "One click to rewrite your prompt leaner — cut costs up to 60% without losing quality.",
    color: "text-violet-400",
    bg: "bg-violet-400/10 border-violet-400/20",
  },
  {
    icon: Layers,
    title: "Works for Any AI Task",
    desc: "Images, video, audio, text generation — PromptMeter understands all types and prices them accurately.",
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
  },
  {
    icon: Clock,
    title: "Know Before You Generate",
    desc: "Stop getting surprised by credit bills. See the cost estimate in 2 seconds — before you commit.",
    color: "text-rose-400",
    bg: "bg-rose-400/10 border-rose-400/20",
  },
  {
    icon: Shield,
    title: "No Account Needed",
    desc: "Paste your prompt and go. No signup walls, no credit card required to get your first estimate.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/20",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Paste Your Prompt",
    desc: "Drop in whatever you were about to send to an AI tool — image, video, text, voice.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    num: "02",
    title: "See the Cost Breakdown",
    desc: "PromptMeter analyzes it and shows you the credit cost across every major provider in plain English.",
    color: "from-violet-500 to-purple-500",
  },
  {
    num: "03",
    title: "Choose Your Move",
    desc: "Run as-is, get an optimized version, or grab the budget rewrite. Your call — your money.",
    color: "from-emerald-500 to-teal-500",
  },
];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "",
    desc: "See how it works",
    features: ["10 analyses per day", "3 provider comparisons", "Basic optimization", "Email support"],
    cta: "Start Free",
    highlight: false,
    ctaStyle: "border border-white/20 text-white hover:bg-white/5",
  },
  {
    name: "Pro",
    price: "$9",
    period: "/mo",
    desc: "For active AI users",
    features: ["Unlimited analyses", "All 15+ providers", "Smart optimization engine", "Budget rewrite mode", "API access", "Priority support"],
    cta: "Join Waitlist",
    highlight: true,
    ctaStyle: "bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:opacity-90",
    badge: "MOST POPULAR",
  },
  {
    name: "Team",
    price: "$29",
    period: "/mo",
    desc: "For agencies & studios",
    features: ["Everything in Pro", "5 team seats", "Admin dashboard", "Usage analytics", "Slack alerts", "Dedicated support"],
    cta: "Join Waitlist",
    highlight: false,
    ctaStyle: "border border-white/20 text-white hover:bg-white/5",
  },
];

function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMsg(data.message);
      } else {
        setStatus("error");
        setMsg(data.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setMsg("Network error — try again");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-6 py-4 text-emerald-400 font-medium"
      >
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
        <span>{msg}</span>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className={`flex ${compact ? "flex-col sm:flex-row" : "flex-col"} gap-3`}>
      {!compact && (
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      )}
      <input
        type="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Joining...</span>
        ) : (
          <><Mail className="w-4 h-4" />Get Early Access</>
        )}
      </button>
      {status === "error" && <p className="text-rose-400 text-sm">{msg}</p>}
    </form>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="PromptMeter" width={32} height={32} className="rounded-lg" />
          <span className="font-bold text-white text-lg tracking-tight">PromptMeter</span>
        </div>
        <div className="hidden sm:flex items-center gap-8 text-sm text-gray-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <a
          href="#try-it"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Try Free →
        </a>
      </div>
    </nav>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] bg-violet-500/10 rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Stop Burning Credits on Expensive Prompts
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.05]"
          >
            Know Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400">
              AI Cost
            </span>
            <br />
            Before You Generate
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            PromptMeter analyzes your AI prompt and shows the exact credit cost across 15+ providers in seconds. 
            Compare, optimize, and save — before you spend a single credit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#try-it"
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
            >
              <Zap className="w-5 h-5" />
              Try It Free — No Signup
            </a>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-colors font-medium"
            >
              See How It Works
              <ChevronDown className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex items-center justify-center gap-6 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" />Free to start</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" />15+ providers</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" />Results in 2 seconds</div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Three steps. Two seconds. Zero surprises on your bill.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative bg-white/3 border border-white/8 rounded-2xl p-8 text-center"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} text-white font-black text-xl mb-5`}>
                  {step.num}
                </div>
                <h3 className="font-bold text-white text-xl mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-14 -right-4 text-gray-600">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE TOOL */}
      <section id="try-it" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Try It Right Now</h2>
            <p className="text-gray-400 text-lg">No account. No credit card. Just paste and see.</p>
          </div>
          <div className="bg-[#12121a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <PromptAnalyzer />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Everything You Need</h2>
            <p className="text-gray-400 text-lg">Built for AI power users who hate unexpected bills.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className={`rounded-2xl border p-6 ${f.bg}`}
              >
                <f.icon className={`w-7 h-7 ${f.color} mb-4`} />
                <h3 className="font-bold text-white text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Simple, Honest Pricing</h2>
            <p className="text-gray-400 text-lg">Start free. Upgrade when you're ready.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative rounded-2xl border p-8 flex flex-col ${
                  plan.highlight
                    ? "border-blue-500/40 bg-gradient-to-b from-blue-500/10 to-violet-500/10"
                    : "border-white/10 bg-white/3"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xs font-bold">
                    {plan.badge}
                  </div>
                )}
                <div className="mb-6">
                  <div className="text-sm text-gray-400 font-medium mb-1">{plan.name}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{plan.desc}</div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className={`w-full py-3 rounded-xl font-semibold text-center text-sm transition-all ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST CTA */}
      <section id="waitlist" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Be First in Line 🚀
            </h2>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              PromptMeter Pro is launching soon. Join the waitlist and get early access, 
              a founder discount, and direct input on features.
            </p>
            <WaitlistForm />
            <p className="text-xs text-gray-600 mt-4">No spam. Unsubscribe anytime. We hate surprise bills too.</p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="PromptMeter" width={24} height={24} className="rounded" />
            <span className="text-gray-400 font-medium">PromptMeter</span>
            <span className="text-gray-600">— Know the cost. Keep the credit.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

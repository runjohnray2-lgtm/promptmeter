# PromptMeter Launch Materials
*Created: May 22, 2025 — Ray's original idea*

---

## 🌐 Domain
**Buy NOW at Namecheap.com:** `promptmeter.com` (~$12/year)
- Also snag: promptmeter.io, getpromptmeter.com as backups
- Point DNS to Vercel after deployment

---

## 🚀 Product Hunt Launch Post

**Tagline:**
> Know your AI cost before you click generate

**Description (280 chars):**
> PromptMeter analyzes your AI prompt and shows the exact credit cost across 15+ providers — OpenAI, Anthropic, Google, DeepSeek, Runway & more. Compare, optimize for cheaper, or get a budget rewrite. Stop getting surprised by credit bills.

**Full description:**
> Every AI user has been burned. You write a detailed prompt, hit generate, and BOOM — half your credits gone. No warning. No chance to reconsider.
>
> PromptMeter solves this.
>
> Paste your prompt → see the cost on every major provider → choose how to proceed.
>
> 🔵 Run as-is (you know the cost now)
> 🟣 Optimize it (same quality, up to 60% cheaper)  
> 🟢 Budget version (minimum viable prompt for lowest cost)
>
> Works for: image generation (DALL-E, Midjourney, Flux, Stable Diffusion), video (Runway, Sora, Kling), audio (ElevenLabs, OpenAI TTS), and text (GPT-4o, Claude, Gemini, DeepSeek).
>
> **Who built this:** A maker from the Pacific Northwest who got tired of surprise credit bills and decided to do something about it.

---

## 📱 Reddit Launch Posts

### r/artificial (500K+ members)
**Title:** I built a tool that shows you exactly how much your AI prompt will cost — before you generate

> *[screenshot of the tool]*
>
> Got tired of credit surprises. Built PromptMeter — paste your prompt, see the cost breakdown across all the major providers, then decide whether to run it, optimize it, or get a cheaper version.
>
> Free to use, no account needed: [promptmeter.com]
>
> Would love feedback from this community — especially curious if the provider comparisons match what you're seeing in the wild.

---

### r/ChatGPT (4M+ members)
**Title:** Finally made a tool to see what my ChatGPT prompts actually cost (and compare vs Claude/Gemini/DeepSeek)

> You've probably noticed ChatGPT Plus vs API pricing is confusing. Built PromptMeter to cut through it:
> - Paste your prompt
> - See exact cost per provider
> - Get an optimized version that costs less
>
> [promptmeter.com] — free, no signup
>
> The DeepSeek comparison alone is eye-opening. Same prompt, 10x cheaper.

---

### r/SideProject
**Title:** Built a prompt cost analyzer in a weekend — feedback welcome

> Idea: before you waste credits on an AI prompt, know what it'll cost.
> 
> PromptMeter does this for 15+ providers. Free, open use.
> 
> Looking for brutal feedback — what's missing, what's wrong, what would make you actually use this daily?

---

## 🎬 YouTube Video #1 Script (First Video = Proof of Creation)

**Title:** "I Built a Tool That Shows Your AI Credit Cost Before You Pay (+ How I Made It With AI)"

**Hook (0-15 sec):**
> "How many times have you hit generate on an AI tool and watched your credits disappear with no warning? I built something that fixes that. And I'm going to show you the whole thing — built almost entirely with AI."

**Section 1 — The Problem (15-60 sec):**
> "Every AI platform charges differently. OpenAI has tokens. Midjourney has generations. Runway has seconds. ElevenLabs has characters. And none of them show you the cost BEFORE you generate. I wanted to fix that."

**Section 2 — Demo (60-180 sec):**
> - Paste a complex image prompt → show the meter go to orange
> - Open the provider comparison → show price differences
> - Click Optimize → show the rewritten prompt + cheaper estimate
> - Click Budget → show the bare-minimum version

**Section 3 — How I built it (180-300 sec):**
> "Here's the wild part — I gave the idea to an AI and said 'build this as good as you possibly can using everything you know.' This is what came back in about 20 minutes. [show code briefly] Next.js, real API pricing data for 15+ providers, animated cost meter, the whole thing."

**Section 4 — What's Next (300-360 sec):**
> "Right now it's free. I'm building Pro features: full API access, Slack alerts when costs spike, team dashboards. Join the waitlist at promptmeter.com. Drop your feedback in the comments — I read every one."

**CTA:** "Like if this is useful. Subscribe if you want to watch this whole thing get built in public."

---

## 📧 Launch Email (to waitlist)

**Subject:** PromptMeter is live — you're first 🎉

> Hey [Name],
>
> You signed up to be first — here you go.
>
> **PromptMeter is live:** [promptmeter.com]
>
> Quick reminder of what it does:
> - Paste any AI prompt
> - See the exact cost across 15+ providers
> - Optimize for cheaper with one click
>
> You're in the founding wave. That means:
> ✅ 50% off Pro for life when we launch paid features
> ✅ Direct line to suggest features (reply to this email)
> ✅ Early access to the API
>
> Tell me honestly — what's the #1 thing that would make you use this every day?
>
> — Ray
> Builder, PromptMeter

---

## 🛡️ Idea Protection Checklist

- [ ] **Buy the domain TODAY** — promptmeter.com on Namecheap (~$12)
- [ ] **Create GitHub repo** — make it public, first commit is proof of creation date
- [ ] **Post first YouTube video** — timestamp + Google index = public record you created this
- [ ] **File for copyright** — copyright.gov, ~$65, protects the specific code/design
- [ ] **Deploy to Vercel** — get a live URL under your account
- [ ] **Post to Reddit/Product Hunt** — public timestamps with your name attached
- [ ] **Consider trademark** — "PromptMeter" trademark application, USPTO.gov, ~$350, do this if it starts getting traction

---

## 🚀 Vercel Deployment (Step by Step)

1. Go to **vercel.com** — create free account
2. Click **"Add New Project"**
3. Connect your GitHub (push this code there first)
4. Select the PromptMeter repo
5. Framework: **Next.js** (auto-detected)
6. Add environment variable: `ADMIN_TOKEN` = (make up a secret password)
7. Click **Deploy** — done in ~90 seconds

**To view your waitlist:**
> https://your-vercel-url.vercel.app/api/waitlist?token=YOUR_ADMIN_TOKEN

---

## 💰 Revenue Roadmap

**Month 1-2: Build Audience**
- Free tool, collect emails
- Post to Reddit, Product Hunt
- Start YouTube channel (build in public)
- Goal: 500 waitlist signups

**Month 3: Launch Pro ($9/mo)**
- Unlimited analyses
- All providers  
- API access
- Goal: 50 paying users = $450/mo

**Month 6: Team Plan ($29/mo)**
- Team seats
- Usage analytics
- Slack integration
- Goal: 200 users = $3,000-5,000/mo

**Month 12: API Business**
- Route users to cheaper providers
- 15% markup on API calls
- Goal: passive $1,000+/mo from routing alone

---

*This document was created May 22, 2025 — all rights reserved.*

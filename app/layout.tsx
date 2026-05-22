import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PromptMeter — Know Your AI Cost Before You Generate",
  description:
    "PromptMeter analyzes your AI prompt and shows the exact credit cost across 15+ providers. Compare OpenAI, Anthropic, Google, DeepSeek, Runway, and more — then optimize for cheaper before you spend a single credit.",
  keywords: [
    "AI cost calculator",
    "prompt cost estimator",
    "AI credit calculator",
    "ChatGPT cost",
    "Midjourney cost",
    "AI pricing comparison",
    "prompt optimizer",
    "LLM pricing",
    "AI API cost",
    "prompt analyzer",
  ],
  openGraph: {
    title: "PromptMeter — Know Your AI Cost Before You Generate",
    description:
      "See the exact credit cost for your AI prompt across 15+ providers. Optimize and save before you generate.",
    type: "website",
    url: "https://promptmeter.com",
    images: [
      {
        url: "/logo.png",
        width: 1024,
        height: 1024,
        alt: "PromptMeter Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptMeter — Know Your AI Cost Before You Generate",
    description: "See the exact credit cost for your AI prompt across 15+ providers.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0a0f] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Serenity Villa | NGUYEN Architecture & Engineering",
  description: "Serenity Villa residential architecture project.",
  robots: { index: false, follow: false },
}

export default function SerenityVillaLayout({ children }: { children: React.ReactNode }) {
  return children
}

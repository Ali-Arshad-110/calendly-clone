import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { userId } = auth()
  if (userId != null) redirect("/")

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-soft animation-delay-2" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-4">
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              📅
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Calendly Clone</h1>
          <p className="text-muted-foreground text-sm mt-2">Professional scheduling made simple</p>
        </div>

        {children}
      </div>
    </div>
  )
}

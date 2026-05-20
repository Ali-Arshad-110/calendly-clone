import { Button } from "@/components/ui/button"
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Calendar, CheckCircle, Zap } from "lucide-react"

export default function HomePage() {
  const { userId } = auth()
  if (userId != null) redirect("/events")

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-2xl text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-block mb-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Modern Scheduling</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
              Schedule Better
            </span>
            <br />
            <span className="text-foreground">Manage Your Time Smarter</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto">
            Create beautiful, shareable scheduling pages. Let clients book time with you effortlessly.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-md mx-auto">
            <div className="flex flex-col items-center">
              <div className="mb-2 p-3 rounded-lg bg-primary/10">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Easy Setup</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-2 p-3 rounded-lg bg-accent/10">
                <CheckCircle className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm font-medium text-foreground">Smart Sync</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-2 p-3 rounded-lg bg-secondary/10">
                <Zap className="w-5 h-5 text-secondary" />
              </div>
              <span className="text-sm font-medium text-foreground">Real-time</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="animate-slide-up">
              <SignUpButton>
                Get Started Free
              </SignUpButton>
            </Button>
            <Button size="lg" variant="outline" asChild className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <SignInButton>
                Sign In
              </SignInButton>
            </Button>
          </div>

          {/* User Profile */}
          <div className="mt-12">
            <UserButton />
          </div>
        </div>
      </div>

      {/* Footer Accent */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary/50"></div>
    </div>
  )
}

import { NavLink } from "@/components/NavLink"
import { UserButton } from "@clerk/nextjs"
import { CalendarRange } from "lucide-react"
import { ReactNode } from "react"

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-border/50 bg-background/80">
        <nav className="font-medium flex items-center text-sm gap-6 container py-4">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold mr-auto group cursor-pointer">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-200">
              <CalendarRange className="size-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent sr-only md:not-sr-only">
              Calendly Clone
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/schedule">Schedule</NavLink>
          </div>

          {/* User Button */}
          <div className="ml-auto size-10">
            <UserButton
              appearance={{ elements: { userButtonAvatarBox: "size-full" } }}
            />
          </div>
        </nav>
      </header>
      <main className="container my-8 mb-12">{children}</main>
    </>
  )
}

"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentProps } from "react"

export function NavLink({ className, ...props }: ComponentProps<typeof Link>) {
  const path = usePathname()
  const isActive = path === props.href

  return (
    <Link
      {...props}
      className={cn(
        "relative px-2 py-1 font-semibold transition-all duration-200 group",
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {props.children}
      
      {/* Underline animation */}
      <span className={cn(
        "absolute bottom-0 left-2 right-2 h-1 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300",
        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-75"
      )} />
    </Link>
  )
}

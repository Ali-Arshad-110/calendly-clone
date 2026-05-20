import { CopyEventButton } from "@/components/CopyEventButton"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { db } from "@/drizzle/db"
import { EventTable } from "@/drizzle/schema"
import { InferModel } from "drizzle-orm"
import { formatEventDescription } from "@/lib/formatters"
import { cn } from "@/lib/utils"
import { auth } from "@clerk/nextjs/server"
import { CalendarPlus, CalendarRange } from "lucide-react"
import Link from "next/link"

export const revalidate = 0

export default async function EventsPage() {
  const { userId, redirectToSignIn } = auth()

  if (userId == null) return redirectToSignIn()

  type Event = InferModel<typeof EventTable>

  let events: Event[] = []
  let dbError: string | null = null

  try {
    events = await db.query.EventTable.findMany({
      where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
      orderBy: ({ createdAt }, { desc }) => desc(createdAt),
    })
  } catch (error) {
    dbError = error instanceof Error ? error.message : String(error)
  }

  if (dbError) {
    return (
      <div className="space-y-6 py-20 px-4 text-center">
        <h1 className="text-3xl font-bold">Unable to load events</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          There was a problem connecting to the database.
          <br />
          Please verify your `DATABASE_URL` and ensure the database is reachable.
        </p>
        <div className="mt-6 rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-left text-sm text-destructive">
          <p className="font-semibold">Connection error:</p>
          <pre className="whitespace-pre-wrap">{dbError}</pre>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-2 pb-8">
        <div className="flex gap-4 items-center justify-between flex-wrap">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Your Events
            </h1>
            <p className="text-muted-foreground mt-2">
              {events.length > 0
                ? `You have ${events.length} event${events.length !== 1 ? "s" : ""}`
                : "Get started by creating your first event"}
            </p>
          </div>
          <Button asChild size="lg" className="animate-slide-up">
            <Link href="/events/new">
              <CalendarPlus className="mr-2 size-5" /> New Event
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      {events.length > 0 ? (
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(380px,1fr))]">
          {events.map((event, index) => (
            <div key={event.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              <EventCard {...event} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 py-20 px-4 text-center">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10">
            <CalendarRange className="size-16 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">No events yet</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Create your first event to get started with scheduling. Your clients will love the simplicity!
            </p>
          </div>
          <Button size="lg" className="text-lg" asChild>
            <Link href="/events/new">
              <CalendarPlus className="mr-2 size-5" /> Create First Event
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

type EventCardProps = {
  id: string
  isActive: boolean
  name: string
  description: string | null
  durationInMinutes: number
  clerkUserId: string
}

function EventCard({
  id,
  isActive,
  name,
  description,
  durationInMinutes,
  clerkUserId,
}: EventCardProps) {
  return (
    <Card className={cn(
      "flex flex-col overflow-hidden group",
      !isActive && "opacity-75 border-destructive/30 bg-destructive/5"
    )}>
      {/* Status Badge */}
      {!isActive && (
        <div className="h-1 bg-gradient-to-r from-destructive to-destructive/50"></div>
      )}
      {isActive && (
        <div className="h-1 bg-gradient-to-r from-primary to-accent"></div>
      )}

      <CardHeader className={cn(!isActive && "opacity-70")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className={cn(!isActive && "text-destructive")}>{name}</CardTitle>
            <CardDescription className="mt-1">
              {formatEventDescription(durationInMinutes)}
            </CardDescription>
          </div>
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap",
            isActive
              ? "bg-primary/10 text-primary"
              : "bg-destructive/10 text-destructive"
          )}>
            {isActive ? "Active" : "Inactive"}
          </div>
        </div>
      </CardHeader>
      
      {description != null && (
        <CardContent className={cn("flex-1 py-2", !isActive && "opacity-70")}>
          <p className="text-sm line-clamp-2">{description}</p>
        </CardContent>
      )}
      
      <CardFooter className="flex justify-end gap-2 mt-auto">
        {isActive && (
          <CopyEventButton
            variant="outline"
            eventId={id}
            clerkUserId={clerkUserId}
          />
        )}
        <Button asChild>
          <Link href={`/events/${id}/edit`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

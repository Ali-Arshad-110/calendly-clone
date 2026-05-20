import { EventForm } from "@/components/forms/EventForm"
import { ScheduleForm } from "@/components/forms/ScheduleForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/drizzle/db"
import { auth } from "@clerk/nextjs/server"

export const revalidate = 0

export default async function SchedulePage() {
  const { userId, redirectToSignIn } = auth()
  if (userId == null) return redirectToSignIn()

  const schedule = await db.query.ScheduleTable.findFirst({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    with: { availabilities: true },
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Your Schedule
        </h1>
        <p className="text-muted-foreground">
          Set your availability so clients can book time with you
        </p>
      </div>

      {/* Form Card */}
      <Card className="max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle>Availability Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <ScheduleForm schedule={schedule} />
        </CardContent>
      </Card>
    </div>
  )
}

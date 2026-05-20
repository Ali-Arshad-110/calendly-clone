# Calendly Clone

A modern, production-ready scheduling application built with Next.js, React, and Tailwind CSS. Features real-time event management, calendar integration, and seamless booking experience.

## Features

- 📅 **Event Management** - Create, edit, and manage scheduling events
- 🔐 **Authentication** - Secure user authentication with Clerk
- 📱 **Responsive Design** - Beautiful UI optimized for all devices
- 🎨 **Modern Animations** - Smooth transitions and micro-interactions
- 📊 **Calendar Integration** - Google Calendar synchronization
- 🌙 **Dark Mode** - Full dark mode support
- ⚡ **Real-time Updates** - Live availability and booking status

## Tech Stack

- **Framework**: Next.js 14.2.7
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Authentication**: Clerk
- **Forms**: React Hook Form + Zod
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (Neon recommended)
- Clerk account for authentication

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd calendly-clone
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

5. Initialize database:
```bash
npm run db:generate
npm run db:migrate
```

6. Start development server:
```bash
npm run dev
```

Visit http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Apply database migrations
- `npm run db:studio` - Open Drizzle Studio

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── (auth)/         # Authentication pages
│   ├── (private)/      # Protected routes
│   ├── (public)/       # Public booking pages
│   └── globals.css     # Global styles and theme
├── components/
│   ├── ui/            # Reusable UI components
│   ├── forms/         # Form components
│   └── NavLink.tsx    # Navigation component
├── drizzle/           # Database schema and migrations
├── lib/               # Utility functions
├── schema/            # Data validation schemas
└── server/            # Server actions
```

## Database Schema

### Events Table
- Stores user event templates
- Includes duration, description, and active status

### Schedule Table
- User availability/schedule settings
- Timezone and availability rules

### Meetings Table
- Booked meetings/appointments
- Guest information and confirmation status

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["npm", "start"]
```

## Performance Optimization

- ✅ Image optimization with Next.js
- ✅ Automatic code splitting
- ✅ CSS minification via Tailwind
- ✅ Database query optimization
- ✅ Caching strategies
- ✅ Edge caching ready

## Security

- ✅ CSRF protection via Next.js
- ✅ Secure authentication with Clerk
- ✅ Environment variable protection
- ✅ Input validation with Zod
- ✅ SQL injection prevention via ORM

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a feature branch
2. Commit changes
3. Push to branch
4. Open pull request

## License

MIT License - See LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.

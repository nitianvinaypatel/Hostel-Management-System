# Hostel Management System (HMS)

A comprehensive web-based hostel management system built with Next.js 15, TypeScript, and Tailwind CSS. This application provides role-based access control for managing hostel operations including student accommodations, complaints, requisitions, mess management, and administrative tasks.

## Features

### Role-Based Access Control
The system supports five distinct user roles, each with specific permissions and functionalities:

#### Student
- View and manage personal dashboard
- Submit and track complaints
- Make hostel-related requests
- View mess menu
- Manage payments

#### Caretaker
- Manage hostel complaints
- Handle requisitions
- Manage mess operations
- View caretaker dashboard

#### Warden
- Approve/reject requisitions
- Review and approve requests
- Generate reports
- Monitor hostel operations

#### Admin
- Manage users and roles
- Manage hostel information
- View system-wide reports
- Handle requisitions
- Full system access

#### Dean
- Review requisitions
- Access comprehensive reports
- Manage announcements
- Oversee hostel operations

## Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with PostCSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Build Tool**: Turbopack
- **Runtime**: React 19.1.0

## Project Structure

```
hms/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Authentication routes
│   │   ├── (roles)/         # Role-based routes
│   │   │   ├── admin/
│   │   │   ├── caretaker/
│   │   │   ├── dean/
│   │   │   ├── student/
│   │   │   └── warden/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── common/          # Shared components
│   │   ├── forms/           # Form components
│   │   ├── role-based/      # Role-specific components
│   │   └── ui/              # UI primitives
│   ├── constants/           # App constants and enums
│   ├── data/                # Static data
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility libraries
│   ├── services/            # API services by role
│   ├── styles/              # Global styles
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Helper functions
│   └── middleware.ts        # Next.js middleware
├── public/                  # Static assets
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hms
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Authentication

The application uses a role-based authentication system. Users are redirected to the login page by default and routed to their respective dashboards based on their assigned role.

## Middleware

The middleware handles route protection and authentication checks. Public routes include:
- `/login`
- `/register`
- `/forgot-password`

All other routes require authentication.

## UI Components

The project uses Radix UI primitives for accessible, unstyled components including:
- Avatar
- Dropdown Menu
- Collapsible
- Label
- Separator
- Slot

Components are styled with Tailwind CSS and support theme toggling.

## Development

### Path Aliases

The project uses TypeScript path aliases for cleaner imports:
```typescript
import { Component } from '@/components/Component'
```

### Styling

- Tailwind CSS 4 with PostCSS
- Custom animations via `tailwindcss-animate`
- Class variance authority for component variants
- Theme support (light/dark mode)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the development team.

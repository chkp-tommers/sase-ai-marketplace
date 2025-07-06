# System Patterns

_Describes system architecture, key technical decisions, and design patterns in use._

## Architecture Overview

This project is a static AI marketplace. There is no backend, server-side logic, database, or authentication. All content is served as static files (HTML, CSS, JS, JSON). Any dynamic behavior is implemented client-side only.

## Key Technical Decisions

- Static site architecture (no server-side code)
- All data is loaded from static JSON or other static assets
- No user authentication or protected routes
- No server-side file uploads or API endpoints
- No database or persistent storage

## Design Patterns

- Component-based UI (e.g., React/Next.js if used)
- Static data-driven rendering (e.g., from JSON files)
- Client-side filtering, sorting, and search
- Responsive design for all devices
- Accessibility best practices

## Component Relationships

- UI components consume static data and render marketplace listings
- Navigation and filtering are handled client-side
- No server-client data flow; all logic is in the browser

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

- The project now uses a static deployment pattern with GitHub Pages (`deploy-pages.yml`).
- Dynamic CI/CD workflows (Node.js/MongoDB/Next.js/Vercel) are not in use.

- All guides (Cursor, Windsurf, Claude) now follow a unified, example-driven documentation pattern for major features and workflows.

## 2024-06-09: Copilot AI Usage Patterns

- Adopted role-based chatmodes (e.g., architect, mentor, planner) for Copilot Chat, as provided by the `awesome-copilot` repo.
- Integrated modular prompt templates and instructional best practices for consistent, effective AI-assisted development.

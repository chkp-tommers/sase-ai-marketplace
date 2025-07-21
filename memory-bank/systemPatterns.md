# System Patterns

_Describes system architecture, key technical decisions, and design patterns in use._

## Architecture Overview

This project is a static AI marketplace organized around directory-based content management. There is no backend, server-side logic, database, or authentication. All content is served as static files (HTML, CSS, JS, JSON). Dynamic behavior is implemented client-side with real-time directory scanning for accurate content counts.

## Data Architecture Patterns

- **Directory-Based Organization**: Each content type has its own directory structure
  - `chatmodes/chatmodes-list/` - Chat mode definitions (*.chatmode.md)
  - `prompts/prompts-list/` - Prompt templates (*.prompt.md)  
  - `rules/rules-list/` - Development rules (*.instructions.md)
  - `assets/data/` - Static configuration files (categories.json, tools.json)

- **Dynamic Content Counting**: Homepage stats reflect real file counts via client-side directory scanning
- **Hybrid Data Loading**: Combines static JSON metadata with dynamic directory enumeration

## Key Technical Decisions

- Static site architecture (no server-side code)
- Directory-based content organization over centralized data files
- Client-side directory scanning for dynamic content counting
- Real-time stats that reflect actual file counts
- HTML parsing for directory enumeration (no server directory listing)
- Categories metadata in JSON combined with directory-based content
- No user authentication or protected routes
- No server-side file uploads or API endpoints
- No database or persistent storage

## Design Patterns


## System Patterns Update (July 2025)

The application uses a consistent pattern of resource-specific index pages. Each main section (Chat Modes, Teams, Rules, Prompts, MCPs) features:
- Search and filter functionality
- Stats banners for quick overview
- Responsive grids of resource cards
- Install/copy actions for easy adoption
- Community contribution options (where applicable)

The Guides section provides onboarding and best-practice documentation for each supported platform, ensuring users can quickly get started and maximize value from the marketplace.
## Component Relationships

- **Homepage Stats**: Dynamically calculated from directory file counts + static metadata
- The project now uses a static deployment pattern with GitHub Pages (`deploy-pages.yml`).
- All guides (Cursor, Windsurf, Claude) now follow a unified, example-driven documentation pattern for major features and workflows.
## 2024-06-09: Copilot AI Usage Patterns

- Adopted role-based chatmodes (e.g., architect, mentor, planner) for Copilot Chat, as provided by the `awesome-copilot` repo.
- Integrated modular prompt templates and instructional best practices for consistent, effective AI-assisted development.

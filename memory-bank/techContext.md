# Tech Context

_Describes technologies used, development setup, technical constraints, and dependencies._

## Technology Stack

- **Frontend**: Static HTML/CSS/JavaScript with client-side data management
- **Styling**: Tailwind CSS for utility-first responsive design
- **Data Sources**: 
  - Static JSON files in `assets/data/` (categories.json, tools.json)
  - Directory-based content files (*.chatmode.md, *.prompt.md, *.instructions.md)
- **Content Management**: File-based organization with dynamic counting
- **Deployment**: GitHub Pages static hosting

## Development Setup

- **Local Development**: Use any static file server (Live Server, Python http.server, etc.)
- **Data Management**: 
  - Categories: Edit `assets/data/categories.json` for metadata
  - Content: Add files to respective directories (chatmodes-list/, prompts-list/, rules-list/)
- **File Counting**: Automatic via client-side directory scanning
- **No Backend**: No server setup, database, or authentication required

## Technical Constraints

- No server-side code or dynamic backend
- No authentication or user sessions
- No persistent storage or database
- No server-side file uploads

## Dependencies

- **Core**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Tailwind CSS framework
- **Data Files**: 
  - `assets/data/categories.json` - Category metadata and configuration
  - `assets/data/tools.json` - MCP tools and featured content  
  - `assets/data/instructions-index.json` - Generated index (not actively used)
- **Content Directories**:
  - `chatmodes/chatmodes-list/` - Chat mode definition files
  - `prompts/prompts-list/` - Prompt template files
  - `rules/rules-list/` - Development instruction files
- **Build Tools**: None required (static files only)

## 2024-06-09: Copilot Resource Integration

- Now using markdown-based chatmodes, instructional guides, and prompt templates from the `awesome-copilot` repository.
- Introduced new scripts and automation utilities (e.g., update-readme.js) for maintaining Copilot resources.

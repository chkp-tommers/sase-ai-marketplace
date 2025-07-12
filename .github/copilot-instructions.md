# SASE Marketplace - AI Coding Assistant Instructions

## Project Overview

SASE Marketplace is a web application that catalogs AI tools, chatmodes, guides, and prompts for AI assistants like GitHub Copilot, Claude, Cursor, and Windsurf. The project is primarily a static web application with JavaScript-based functionality for filtering, searching, and displaying these resources.

## Architecture & Structure

### Key Components

- **Static Website**: HTML/CSS/JS-based frontend displaying the marketplace
- **Data Layer**: JSON files in `assets/data/` define categories and tools
- **Resource Collections**:
  - `awesome-copilot/`: Collection of chatmodes and instructions for GitHub Copilot
  - `chatmodes/`: Custom chat modes for AI assistants
  - `guides/`: Guidance documents for different AI tools
  - `mcps/`: Marketplace collections
  - `memory-bank/`: Context files for AI assistants
  - `prompt-engineering/`: Resources for prompt engineering
  - `prompts/`: Reusable prompts for AI assistants
  - `tools/`: Tools that integrate with AI assistants

### Data Flow

1. `assets/js/main.js` loads tool and category data from JSON files
2. The UI renders tools based on user filtering and search criteria
3. External data may be stored in JSONBin (see `jsonbin-service.js` and `JSONBIN_SETUP.md`)

## Development Workflow

### Local Development

1. Serve the project locally using any static file server
2. Edit HTML, CSS, and JS files directly - changes are visible on refresh
3. New resources should be added to their respective directories and referenced in appropriate index files

### Data Management

- **Adding New Tools**: Update `assets/data/tools.json` with new entries
- **Adding New Categories**: Update `assets/data/categories.json`
- **External Storage**: The application can use JSONBin for external storage (see `JSONBIN_SETUP.md` for setup)

## Project Conventions

### File Organization

- HTML files are located at the root of each section
- Section-specific resources are in subdirectories
- Each major section has an `index.html` entry point

### Resource Format

- **Chatmodes**: Stored as markdown files in `chatmodes/` and `awesome-copilot/chatmodes/`
- **Instructions**: Stored as markdown files in `awesome-copilot/instructions/`
- **Prompts**: Stored as JSON (`awesome-copilot-prompts.json`) and text files

### Integration Points

- GitHub Pages for hosting (see `GITHUB_PAGES_SETUP.md`)
- JSONBin for potential external data storage

## Memory Bank Usage

The `memory-bank/` directory contains context files that help AI assistants understand the project:
- `productContext.md`: Product-level context
- `techContext.md`: Technical context
- `activeContext.md`: Active development context
- `projectbrief.md`: Project brief
- `systemPatterns.md`: System patterns

## Common Tasks

1. **Adding a new tool**: Add entry to `assets/data/tools.json`
2. **Adding a new category**: Add entry to `assets/data/categories.json`
3. **Adding a new chatmode**: Create markdown file in appropriate `chatmodes/` directory
4. **Updating guides**: Edit HTML files in the `guides/` directory
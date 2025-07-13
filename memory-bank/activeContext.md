# Active Context

_Tracks current work focus, recent changes, next steps, and active decisions._

## Current Focus

- Implementing dynamic file counting for homepage stats from actual directories
- Refactoring data loading to use directory-based structure instead of centralized JSON
- Improving homepage statistics accuracy with real-time counts
- Maintaining directory-based organization for chatmodes, prompts, rules, and MCPs

## Recent Changes

- **2024-07-13: Homepage Stats Dynamic Counting**
  - Updated homepage to display accurate counts for Rules (added as 5th category)
  - Changed from 4-column to 5-column layout in stats section
  - Implemented real directory-based counting for all categories
  - Modified `updateStats()` to use `categories.json` counts instead of `tools.json` filtering

- **2024-07-13: Data Loading Architecture Refactor**
  - Restructured `loadData()` method to count actual files in directories
  - Added `countDirectoryFiles()` method to scan directory contents via HTML parsing
  - Implemented directory-based counting for:
    - `chatmodes/chatmodes-list/` (*.chatmode.md files) - 31 files
    - `prompts/prompts-list/` (*.prompt.md files) - 42 files  
    - `rules/rules-list/` (*.instructions.md files) - 36 files
  - Added `updateCategoryCounts()` to sync real counts with category metadata

- **2024-07-13: Directory Structure Analysis**
  - Confirmed file organization across directories:
    - Chatmodes: 31 `.chatmode.md` files in `chatmodes/chatmodes-list/`
    - Prompts: 42 `.prompt.md` files in `prompts/prompts-list/`
    - Rules: 36 `.instructions.md` files in `rules/rules-list/`
  - Homepage stats now reflect actual file counts instead of static numbers

## 2024-07-12: Prompts Directory Maintenance

- Verified and confirmed the `prompts/` directory is actively used throughout the project.
- The directory is referenced in navigation links across multiple pages (index.html, guides, rules, etc.).
- The `prompts/index.html` file dynamically loads content from `awesome-copilot/prompts/` directory.
- URLs and file paths to the prompts directory are used in multiple JavaScript functions for installation and loading.
- Documentation in AWESOME_COPILOT_SYNC.md confirms the prompts directory is a key component of the project structure.

## 2024-06-09: Copilot Best Practices Integration

- Added and analyzed the official `awesome-copilot` GitHub repository.
- Indexed its chatmodes, instructions, and prompt templates for Copilot and Copilot Chat.
- Integrated its resources as the project's primary reference for Copilot best practices, prompt engineering, and role-based chatmodes.

## 2024-06-09: Prompts Page Enhancement

- Integrated all prompts from the awesome-copilot repository into the prompts page.
- Each prompt is now displayed as a card with title, description, preview, and tags for all plausible platforms (Copilot, Claude, Cursor, Windsurf).
- Added interactive actions: View (modal with full prompt) and Copy (copies full prompt to clipboard).

## 2024-07-12: GitHub Pages Deployment Configuration

- Updated the GitHub Pages deployment workflow to correctly deploy from the repository root
- Created a `.nojekyll` file to ensure proper asset handling by GitHub Pages
- Updated the GITHUB_PAGES_SETUP.md documentation to reflect the current repository structure
- Configured GitHub Actions to automatically deploy changes to the `main` branch

## Next Steps

- Consider migrating MCP data to directory structure similar to other categories
- Enhance error handling for directory scanning in production environments
- Implement fallback mechanisms when directory counting fails
- Add automated tests for dynamic counting functionality
- Optimize performance of directory scanning for large file sets

## Active Decisions

- No backend, authentication, or server-side features will be added
- All features must be implemented client-side or as static assets
- Directory-based organization is preferred over centralized JSON files
- Real-time counting from directories is prioritized over static counts
- Each category maintains its own directory structure for better organization

# Active Context

_Tracks current work focus, recent changes, next steps, and active decisions._

## Current Focus

- Building and refining the static AI marketplace UI
- Managing and updating static data (e.g., tools.json)
- Improving client-side search and filtering
- Maintaining and enhancing the prompts directory functionality

## Recent Changes

- Updated documentation to reflect static-only architecture
- Removed backend, database, and authentication references from all docs
- Removed `.github/workflows/ci-cd.yml` as it was not relevant for the current static site deployment approach.
- Retained `.github/workflows/deploy-pages.yml` for GitHub Pages deployment.
- Added a comprehensive GitHub Copilot guide at guides/copilot.html, matching the structure and UX of the Windsurf guide.
- Updated guides/index.html so the GitHub Copilot card now features a 'Read Guide' link, styled consistently with Windsurf, and links to the new guide.
- The new guide covers Copilot setup, prompt engineering, custom templates, code review, best practices, and MCP integration.
- Improves documentation, onboarding, and discoverability for Copilot users.
- Updated guides/llms.html with a dedicated Cursor LLMs section, model selection/switching, and best practices.
- Updated prompts/index.html with advanced prompt engineering for Cursor (rules, memories, @-symbols), examples, and best practices.
- Updated mcps/index.html with Cursor MCP setup, configuration, agent usage, and best practices.
- All updates include references and examples from official Cursor documentation.
- Created a dedicated Cursor guide page (guides/cursor.html) with sections for overview, installation, LLMs, prompt engineering, MCP integration, agent features, and best practices.
- Updated guides/index.html to add a 'Read Guide' link to the Cursor card, matching the style of Copilot and Windsurf.
- Users can now access comprehensive Cursor onboarding and advanced usage guidance from the Guides page.
- Cursor Guide now includes practical, copyable examples for every major feature (LLMs, prompt engineering, MCP, agent features, best practices), matching the Windsurf and Claude guides in structure and style.

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

- Add more static data and improve UI components
- Enhance accessibility and responsiveness
- Document static site deployment process

## Active Decisions

- No backend, authentication, or server-side features will be added
- All features must be implemented client-side or as static assets

# AI Tools Marketplace Domain Patterns (Static Site)

## Tool Types & Categories

### Tool Type Definitions

- MCP: Model Control Protocol tools
- Prompt: AI prompt templates
- Rule: Coding standards & guidelines
- Chat Mode: Specialized AI assistants

### Categories

- Data Science
- NLP
- Computer Vision
- Automation
- Development Tools
- Other

## Static Data Structure

- All tool data is stored in static JSON files (e.g., assets/data/tools.json)
- Each tool entry includes: name, description, type, category, tags, and (optionally) a public link

## Search & Discovery (Client-Side)

- Users can search, filter, and sort tools using client-side JavaScript
- No server-side search, analytics, or recommendations
- All filtering and sorting is performed in the browser

## User Experience

- No login, registration, or user accounts
- No ratings, comments, or analytics
- No file uploads or downloads managed by the site
- All content is public and static

## Business Rules

- All content must be suitable for public, static display
- Tool data is curated and updated via static file edits
- No moderation or dynamic content features

## Example Tool Data (JSON)

```json
{
  "name": "Example Tool",
  "description": "A sample AI tool for demonstration purposes.",
  "type": "prompt",
  "category": "NLP",
  "tags": ["language", "text", "demo"],
  "link": "https://example.com/tool"
}
```

# AI Tools Hub - Static Site

A lightweight, fast static website for discovering and installing AI development tools including MCP servers, AI prompts, chat modes, and cursor rules.

## 🚀 Features

- **MCP Tools**: One-click installation commands for Model Context Protocol servers
- **AI Prompts**: Copy-to-clipboard professional AI prompts for development
- **Chat Modes**: Pre-configured AI assistant modes for specialized tasks
- **Cursor Rules**: Development rules and configurations for AI-powered coding
- **Dark Mode**: Toggle between light and dark themes
- **Search & Filter**: Real-time search across all tools and categories
- **Responsive Design**: Works perfectly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Heroicons SVG icons
- **Fonts**: Google Fonts (Inter)
- **Storage**: JSONBin.io for community contributions
- **Deployment**: GitHub Pages with automated CI/CD

## 📁 Project Structure

```
ai-tools-static/
├── index.html              # Homepage
├── assets/
│   ├── js/
│   │   ├── main.js          # Main JavaScript functionality
│   │   └── jsonbin-service.js # JSONBin API integration
│   └── data/
│       ├── tools.json       # Tool database
│       └── categories.json  # Category definitions
├── tools/
│   └── index.html          # Tools browser page
├── mcps/
│   └── index.html          # MCP tools page
├── prompts/
│   └── index.html          # AI prompts page
├── chatmodes/
│   └── index.html          # Chat modes page
├── guides/
│   ├── index.html          # Installation guides overview
│   └── windsurf.html       # Windsurf setup guide
└── .github/
    └── workflows/
        └── deploy-pages.yml # GitHub Actions deployment
```

## 🎯 Platform Support

- **Windsurf**: Complete setup guides and tool configurations
- **Cursor**: AI-powered code editor integration
- **GitHub Copilot**: Enhanced with custom prompts and modes
- **Claude**: Direct chat mode configurations

## 🚀 Quick Start

### Local Development

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd ai-tools-static
   ```

2. **Start local server**

   ```bash
   # Using Python (recommended)
   python -m http.server 8000

   # Or using Node.js
   npx http-server -p 8000

   # Or using VS Code Live Server extension
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### GitHub Pages Deployment

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Deploy AI tools static site"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Set Source to "GitHub Actions"
   - Your site will be available at: `https://yourusername.github.io/yourrepository`

## 🔧 Configuration

### JSONBin Setup (Optional)

For community tool submissions, configure JSONBin.io:

1. Create account at [jsonbin.io](https://jsonbin.io)
2. Create a new bin with the sample data structure
3. Update `assets/js/jsonbin-service.js` with your BIN_ID
4. See `JSONBIN_SETUP.md` for detailed instructions

### Adding New Tools

Tools are stored in `assets/data/tools.json`:

```json
{
  "id": "your-tool-id",
  "name": "Tool Name",
  "description": "Tool description",
  "type": "mcp|prompt|chatmode|rule",
  "platforms": ["windsurf", "cursor", "claude"],
  "installCommand": "installation command",
  "category": "development",
  "featured": false
}
```

## 🎨 Features Overview

### MCP Tools

- **Playwright MCP**: Browser automation and testing
- **Filesystem MCP**: File system operations
- **Git MCP**: Git repository management
- Platform-specific installation commands
- Configuration examples

### AI Prompts

- **Code Review Assistant**: Comprehensive code analysis
- **API Design Expert**: REST API design guidance
- **Database Expert**: SQL optimization and design
- Copy-to-clipboard functionality
- Modal preview with syntax highlighting

### Chat Modes

- **API Architect**: Backend development specialist
- **Security Auditor**: Security analysis and recommendations
- **Performance Optimizer**: Performance tuning expert
- Pre-configured AI assistant roles
- Easy configuration copying

### Cursor Rules

- **TypeScript Strict**: Strict TypeScript configurations
- **React Best Practices**: React development patterns
- **API Security**: Security-focused development rules
- Direct integration with Cursor editor

## 🎭 Dark Mode

The site features a smart dark mode toggle:

- Respects system preference on first visit
- Remembers user choice in localStorage
- Smooth transitions between themes
- Consistent across all pages

## 🔍 Search & Filtering

Advanced search capabilities:

- Real-time search across all tools
- Filter by type (MCP, Prompts, Chat Modes, Rules)
- Filter by platform compatibility
- Category-based browsing
- URL parameter support for deep linking

## 🤝 Contributing

1. **Fork the repository**
2. **Add your tool** to `assets/data/tools.json`
3. **Test locally** to ensure everything works
4. **Submit a pull request**

Or use the "Add New" buttons on each category page to submit tools via the web interface.

## 📚 Documentation

- `GITHUB_PAGES_SETUP.md` - GitHub Pages deployment guide
- `JSONBIN_SETUP.md` - JSONBin configuration for community tools
- `guides/` - Platform-specific installation guides

## 🔧 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [Tailwind CSS](https://tailwindcss.com)
- Icons by [Heroicons](https://heroicons.com)
- Fonts by [Google Fonts](https://fonts.google.com)
- Storage by [JSONBin.io](https://jsonbin.io)

---

**Ready to supercharge your AI development workflow?** 🚀

Visit the live site or run locally to discover and install the best AI development tools!

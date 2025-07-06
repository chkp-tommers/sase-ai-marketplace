// Main JavaScript for AI Tools Hub
class AIToolsHub {
  constructor() {
    this.data = {
      tools: [],
      categories: [],
      featuredTools: [],
    };
    this.init();
  }

  async init() {
    // Initialize dark mode
    this.initDarkMode();

    // Load data
    await this.loadData();

    // Initialize search
    this.initSearch();

    // Populate homepage if we're on the homepage
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html"
    ) {
      this.populateHomepage();
    }
  }

  // Dark mode functionality
  initDarkMode() {
    const themeToggle = document.getElementById("theme-toggle");
    const html = document.documentElement;

    // Check for saved theme preference or default to 'system'
    const savedTheme = localStorage.getItem("theme") || "system";

    // Apply theme
    if (
      savedTheme === "dark" ||
      (savedTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    // Toggle theme
    themeToggle?.addEventListener("click", () => {
      html.classList.toggle("dark");
      const isDark = html.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // Load data from JSON files
  async loadData() {
    try {
      // Initialize JSONBin service if available
      const jsonBinService = window.JSONBinService
        ? new window.JSONBinService()
        : null;

      const [toolsData, categoriesRes] = await Promise.all([
        jsonBinService
          ? jsonBinService.fetchTools()
          : fetch("assets/data/tools.json").then((r) => r.json()),
        fetch("assets/data/categories.json"),
      ]);

      if (toolsData && Array.isArray(toolsData)) {
        this.data.tools = toolsData;
        this.data.featuredTools = this.data.tools.filter(
          (tool) => tool.featured
        );
      }

      if (categoriesRes.ok) {
        this.data.categories = await categoriesRes.json();
      }
    } catch (error) {
      console.error("Error loading data:", error);
      // Fallback to hardcoded data
      this.loadFallbackData();
    }
  }

  // Fallback data when JSON files aren't available
  loadFallbackData() {
    this.data.categories = [
      { id: "mcp", name: "MCP Tools", icon: "cpu", count: 15, color: "blue" },
      {
        id: "prompt",
        name: "Prompts",
        icon: "chat",
        count: 25,
        color: "green",
      },
      {
        id: "chatmode",
        name: "Chat Modes",
        icon: "code",
        count: 10,
        color: "purple",
      },
      {
        id: "rule",
        name: "Rules",
        icon: "document",
        count: 8,
        color: "orange",
      },
    ];

    this.data.featuredTools = [
      {
        id: "playwright-mcp",
        name: "Playwright MCP",
        description:
          "Browser automation and testing MCP server for web scraping and testing",
        type: "mcp",
        category: "automation",
        platforms: ["windsurf", "cursor", "claude"],
        featured: true,
      },
      {
        id: "code-review-prompt",
        name: "Code Review Assistant",
        description:
          "Comprehensive code review prompt with security and performance focus",
        type: "prompt",
        category: "development",
        platforms: ["cursor", "copilot", "claude"],
        featured: true,
      },
      {
        id: "api-architect",
        name: "API Architect",
        description: "Chat mode for designing and documenting RESTful APIs",
        type: "chatmode",
        category: "architecture",
        platforms: ["windsurf", "cursor", "claude"],
        featured: true,
      },
    ];
  }

  // Initialize search functionality
  initSearch() {
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
          this.performSearch(query);
        }
      });

      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          const query = e.target.value.trim();
          if (query) {
            window.location.href = `tools/?search=${encodeURIComponent(query)}`;
          }
        }
      });
    }
  }

  // Perform search
  performSearch(query) {
    const results = this.data.tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query) ||
        tool.type.toLowerCase().includes(query)
    );

    // For now, just redirect to tools page with search query
    // In a full implementation, you might show a dropdown of results
    console.log("Search results:", results);
  }

  // Populate homepage content
  populateHomepage() {
    // this.populateCategories(); // Removed - using static category cards now
    this.populateFeaturedTools();
    this.updateStats();
  }

  // Populate categories grid
  populateCategories() {
    const categoriesGrid = document.getElementById("categories-grid");
    if (!categoriesGrid) return;

    categoriesGrid.innerHTML = this.data.categories
      .map(
        (category) => `
      <a href="/tools/?type=${category.id}" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${category.name}</h3>
          ${this.getIconSVG(category.icon, `h-8 w-8 text-${category.color}-600 dark:text-${category.color}-400`)}
        </div>
        <p class="text-gray-600 dark:text-gray-300 text-sm mb-2">${category.count} tools available</p>
        <div class="flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium">
          <span>Browse ${category.name}</span>
          <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </a>
    `
      )
      .join("");
  }

  // Populate featured tools
  populateFeaturedTools() {
    const featuredTools = document.getElementById("featured-tools");
    if (!featuredTools) return;

    featuredTools.innerHTML = this.data.featuredTools
      .map(
        (tool) => `
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-3">
          <span class="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-medium rounded-full">
            ${tool.type.toUpperCase()}
          </span>
          <div class="flex space-x-1">
            ${tool.platforms
              .map(
                (platform) => `
              <img src="/assets/images/platforms/${platform}.svg" alt="${platform}" class="w-4 h-4" title="${platform}" />
            `
              )
              .join("")}
          </div>
        </div>
        
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">${tool.name}</h3>
        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">${tool.description}</p>
        
        <div class="flex space-x-2">
          <button onclick="aiToolsHub.installTool('${tool.id}')" class="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
            Install
          </button>
          <a href="/tools/${tool.id}.html" class="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium text-center">
            View Details
          </a>
        </div>
      </div>
    `
      )
      .join("");
  }

  // Update stats
  updateStats() {
    const mcpCount = this.data.tools.filter(
      (tool) => tool.type === "mcp"
    ).length;
    const promptCount = this.data.tools.filter(
      (tool) => tool.type === "prompt"
    ).length;
    const chatmodeCount = this.data.tools.filter(
      (tool) => tool.type === "chatmode"
    ).length;

    document.getElementById("mcp-count").textContent = mcpCount + "+";
    document.getElementById("prompt-count").textContent = promptCount + "+";
    document.getElementById("chatmode-count").textContent = chatmodeCount + "+";
  }

  // Get SVG icon by name
  getIconSVG(iconName, className = "h-6 w-6") {
    const icons = {
      cpu: `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>`,
      chat: `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>`,
      code: `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>`,
      document: `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>`,
    };
    return icons[iconName] || icons.document;
  }

  // Install tool functionality
  installTool(toolId) {
    const tool =
      this.data.tools.find((t) => t.id === toolId) ||
      this.data.featuredTools.find((t) => t.id === toolId);

    if (!tool) {
      console.error("Tool not found");
      return;
    }

    // Generate installation based on tool type
    switch (tool.type) {
      case "mcp":
        this.installMCP(tool);
        break;
      case "prompt":
        this.copyPrompt(tool);
        break;
      case "chatmode":
        this.copyChatMode(tool);
        break;
      case "rule":
        this.copyRule(tool);
        break;
      default:
        console.error("Unknown tool type");
    }
  }

  // Install MCP tool
  installMCP(tool) {
    const config = {
      mcpServers: {
        [tool.id]: {
          command: tool.command || "npx",
          args: tool.args || [`@${tool.id}`],
          env: tool.env || {},
        },
      },
    };

    this.downloadJSON(config, `${tool.id}-mcp-config.json`);
  }

  // Copy prompt to clipboard
  copyPrompt(tool) {
    const promptText =
      tool.content ||
      `# ${tool.name}\n\n${tool.description}\n\n[Prompt content would be here]`;
    navigator.clipboard
      .writeText(promptText)
      .then(() => {
        console.log(`Prompt "${tool.name}" copied to clipboard!`);
      })
      .catch(() => {
        console.error("Failed to copy prompt");
      });
  }

  // Copy chat mode configuration
  copyChatMode(tool) {
    const config =
      tool.systemPrompt ||
      `System prompt for ${tool.name}:\n\n${tool.description}`;
    navigator.clipboard
      .writeText(config)
      .then(() => {
        console.log(`Chat mode "${tool.name}" copied to clipboard!`);
      })
      .catch(() => {
        console.error("Failed to copy chat mode");
      });
  }

  // Copy rule configuration
  copyRule(tool) {
    const ruleText =
      tool.content ||
      `# ${tool.name}\n\n${tool.description}\n\n[Rule content would be here]`;
    navigator.clipboard
      .writeText(ruleText)
      .then(() => {
        console.log(`Rule "${tool.name}" copied to clipboard!`);
      })
      .catch(() => {
        console.error("Failed to copy rule");
      });
  }

  // Download JSON file
  downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Initialize the app
const aiToolsHub = new AIToolsHub();

// Export for global access
window.aiToolsHub = aiToolsHub;

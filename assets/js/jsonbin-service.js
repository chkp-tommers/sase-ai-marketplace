// JSONBin Service for AI Tools Hub
class JSONBinService {
  constructor() {
    // Your actual JSONBin details
    this.binId = "686963f18561e97a50321037"; // Replace with actual BIN ID from Step 2
    this.apiKey =
      "$2a$10$.YI3SyQ078HHkWUwOMwj8eT38PcOinHYe.UDM2XKFHebSorwRztra"; // Your X-MASTER-KEY
    this.baseUrl = "https://api.jsonbin.io/v3/b";
  }

  // Initialize JSONBin with sample data
  async initializeBin() {
    const sampleData = {
      tools: [
        {
          id: "peekaboo-mcp",
          name: "Peekaboo",
          description:
            "A macOS-only MCP server that enables AI agents to capture screenshots of applications, or the entire system, with optional visual question answering through local or remote AI models.",
          type: "mcp",
          category: "automation",
          platforms: ["windsurf", "cursor", "claude"],
          featured: true,
          command: "npm",
          args: ["install", "-g", "@peekaboo/mcp-server"],
          author: "Peekaboo Team",
          createdAt: "2024-01-15",
          rating: 4.8,
          downloads: 15420,
        },
        {
          id: "typescript-expert-prompt",
          name: "TypeScript Expert",
          description:
            "You are an expert in TypeScript, Node.js, Next.js App Router, React, and Modern UI/UX frameworks. Follow the user's requirements carefully & to the letter.",
          type: "prompt",
          category: "development",
          platforms: ["cursor", "copilot", "claude"],
          featured: true,
          content:
            "You are an expert in TypeScript, Node.js, Next.js App Router, React, and Modern UI/UX frameworks...",
          author: "CodeRabbit",
          createdAt: "2024-01-10",
          rating: 4.9,
          uses: 12450,
        },
        {
          id: "frontend-developer-chatmode",
          name: "Front-End Developer",
          description:
            "Specialized AI assistant configuration for front-end development with modern frameworks and best practices",
          type: "chatmode",
          category: "development",
          platforms: ["windsurf", "cursor", "claude"],
          featured: true,
          systemPrompt:
            "You are a Senior Front-End Developer and an Expert in ReactJS, NextJS, and Modern UI/UX frameworks...",
          author: "Frontend Guild",
          createdAt: "2024-01-08",
          rating: 4.8,
          uses: 8750,
        },
      ],
      lastUpdated: new Date().toISOString(),
    };

    return await this.updateBin(sampleData);
  }

  // Fetch tools from JSONBin
  async fetchTools() {
    try {
      const response = await fetch(`${this.baseUrl}/${this.binId}/latest`, {
        headers: {
          "X-Master-Key": this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.record.tools || [];
    } catch (error) {
      console.error("Error fetching tools from JSONBin:", error);
      return this.getFallbackTools();
    }
  }

  // Update tools in JSONBin
  async updateTools(tools) {
    try {
      const data = {
        tools: tools,
        lastUpdated: new Date().toISOString(),
      };

      const response = await fetch(`${this.baseUrl}/${this.binId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": this.apiKey,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating tools in JSONBin:", error);
      throw error;
    }
  }

  // Add a new tool
  async addTool(newTool) {
    try {
      const currentTools = await this.fetchTools();
      const updatedTools = [
        ...currentTools,
        {
          ...newTool,
          id: Date.now().toString(),
          createdAt: new Date().toISOString().split("T")[0],
        },
      ];

      await this.updateTools(updatedTools);
      return updatedTools;
    } catch (error) {
      console.error("Error adding tool:", error);
      throw error;
    }
  }

  // Update bin with new data
  async updateBin(data) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.binId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": this.apiKey,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating JSONBin:", error);
      throw error;
    }
  }

  // Fallback data when JSONBin is unavailable
  getFallbackTools() {
    return [
      {
        id: "peekaboo-mcp",
        name: "Peekaboo",
        description:
          "A macOS-only MCP server that enables AI agents to capture screenshots",
        type: "mcp",
        category: "automation",
        platforms: ["windsurf", "cursor", "claude"],
        featured: true,
        command: "npm",
        args: ["install", "-g", "@peekaboo/mcp-server"],
      },
    ];
  }

  // Get bin statistics
  async getBinStats() {
    try {
      const response = await fetch(`${this.baseUrl}/${this.binId}`, {
        headers: {
          "X-Master-Key": this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        totalTools: data.record.tools?.length || 0,
        lastUpdated: data.record.lastUpdated,
        version: data.version,
      };
    } catch (error) {
      console.error("Error fetching bin stats:", error);
      return null;
    }
  }
}

// Export for use in other files
window.JSONBinService = JSONBinService;

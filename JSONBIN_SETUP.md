# JSONBin Setup Guide for AI Tools Hub

This guide will help you set up JSONBin.io for public tool storage, allowing users to add tools that are visible to everyone.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create JSONBin Account

1. Go to [jsonbin.io](https://jsonbin.io)
2. Click "Sign Up" (free account gives 100,000 requests/month)
3. Verify your email

### Step 2: Create API Key

1. Go to [API Keys section](https://jsonbin.io/api-keys)
2. Click "Create Access Key"
3. Name it "AI Tools Hub"
4. Copy the API key (starts with `$2a$10$...`)

### Step 3: Create Initial Data Bin

1. Go to [Create Bin](https://jsonbin.io/bins/create)
2. Paste this initial data:

```json
{
  "tools": [
    {
      "id": "peekaboo-mcp",
      "name": "Peekaboo",
      "description": "A macOS-only MCP server that enables AI agents to capture screenshots of applications, or the entire system, with optional visual question answering through local or remote AI models.",
      "type": "mcp",
      "category": "automation",
      "platforms": ["windsurf", "cursor", "claude"],
      "featured": true,
      "command": "npm",
      "args": ["install", "-g", "@peekaboo/mcp-server"],
      "author": "Peekaboo Team",
      "createdAt": "2024-01-15",
      "rating": 4.8,
      "downloads": 15420
    },
    {
      "id": "typescript-expert-prompt",
      "name": "TypeScript Expert",
      "description": "You are an expert in TypeScript, Node.js, Next.js App Router, React, and Modern UI/UX frameworks. Follow the user's requirements carefully & to the letter.",
      "type": "prompt",
      "category": "development",
      "platforms": ["cursor", "copilot", "claude"],
      "featured": true,
      "content": "You are an expert in TypeScript, Node.js, Next.js App Router, React, and Modern UI/UX frameworks (e.g., TailwindCSS, Shadcn, Radix). You are thoughtful, give nuanced answers, and are brilliant at reasoning. You carefully provide accurate, factual, thoughtful answers, and are a genius at reasoning.\n\n- Follow the user's requirements carefully & to the letter.\n- First think step-by-step - describe your plan for what to build in pseudocode, written out in great detail.\n- Confirm, then write code!\n- Always write correct, best practice, DRY principle (Don't Repeat Yourself), bug free, fully functional and working code also it should be aligned to listed rules down below at Code Implementation Guidelines.\n- Focus on easy and readability code, over being performant.\n- Fully implement all requested functionality.\n- Leave NO todo's, placeholders or missing pieces.\n- Ensure code is complete! Verify thoroughly finalised.\n- Include all required imports, and ensure proper naming or key components.\n- Be concise Minimize any other prose.\n- If you think there might not be a correct answer, you say so, instead of guessing.\n- If you do not know the answer, say so, instead of guessing.",
      "author": "CodeRabbit",
      "createdAt": "2024-01-10",
      "rating": 4.9,
      "uses": 12450
    },
    {
      "id": "frontend-developer-chatmode",
      "name": "Front-End Developer",
      "description": "Specialized AI assistant configuration for front-end development with modern frameworks and best practices",
      "type": "chatmode",
      "category": "development",
      "platforms": ["windsurf", "cursor", "claude"],
      "featured": true,
      "systemPrompt": "You are a Senior Front-End Developer and an Expert in ReactJS, NextJS, and Modern UI/UX frameworks (e.g., TailwindCSS, Shadcn, Radix). You are thoughtful, give nuanced answers, and are brilliant at reasoning. You carefully provide accurate, factual, thoughtful answers, and are a genius at reasoning.",
      "author": "Frontend Guild",
      "createdAt": "2024-01-08",
      "rating": 4.8,
      "uses": 8750
    }
  ],
  "lastUpdated": "2024-01-20T10:00:00.000Z"
}
```

3. Click "Create"
4. Copy the **Bin ID** from the URL (e.g., `67890abcdef12345678901234`)

### Step 4: Configure Your Site

1. Open `ai-tools-static/assets/js/jsonbin-service.js`
2. Replace the placeholders:

```javascript
constructor() {
  this.binId = '67890abcdef12345678901234'; // Your actual Bin ID
  this.apiKey = '$2a$10$your-actual-api-key-here'; // Your actual API key
  this.baseUrl = 'https://api.jsonbin.io/v3/b';
}
```

### Step 5: Test the Integration

1. Open your site locally: `python -m http.server 8000`
2. Navigate to the MCPs page
3. Verify tools load from JSONBin
4. Try adding a new tool
5. Refresh the page to confirm it persists

## 🔧 Configuration Options

### Public vs Private Bins

**Public Bins** (Recommended for community tools):

- No API key required for reading
- Anyone can view the data
- Requires API key for writing

**Private Bins**:

- API key required for both reading and writing
- More secure but limits accessibility

### Rate Limits

**Free Tier**:

- 100,000 requests/month
- 1,000 requests/day
- 100 requests/minute

**Pro Tier** ($4/month):

- 1,000,000 requests/month
- 10,000 requests/day
- 1,000 requests/minute

## 🛠️ Advanced Configuration

### Environment Variables (for production)

Instead of hardcoding API keys, use environment variables:

```javascript
constructor() {
  this.binId = process.env.JSONBIN_BIN_ID || 'fallback-bin-id';
  this.apiKey = process.env.JSONBIN_API_KEY || 'fallback-api-key';
  this.baseUrl = 'https://api.jsonbin.io/v3/b';
}
```

### Multiple Bins for Different Environments

```javascript
constructor() {
  const environment = window.location.hostname.includes('localhost') ? 'dev' : 'prod';

  this.config = {
    dev: {
      binId: 'dev-bin-id',
      apiKey: 'dev-api-key'
    },
    prod: {
      binId: 'prod-bin-id',
      apiKey: 'prod-api-key'
    }
  };

  this.binId = this.config[environment].binId;
  this.apiKey = this.config[environment].apiKey;
}
```

### Error Handling & Fallbacks

The service includes automatic fallback to local data if JSONBin is unavailable:

```javascript
getFallbackTools() {
  return [
    // Local fallback data
  ];
}
```

## 🔒 Security Considerations

### API Key Security

- ✅ API keys are visible in client-side code
- ✅ Use public bins with read-only access when possible
- ✅ Monitor usage on JSONBin dashboard
- ❌ Don't use sensitive production APIs client-side

### Data Validation

The service includes basic validation:

- Required fields check
- Data type validation
- XSS prevention through proper escaping

### Rate Limiting

Implement client-side rate limiting:

```javascript
class RateLimiter {
  constructor(maxRequests = 10, timeWindow = 60000) {
    this.requests = [];
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
  }

  canMakeRequest() {
    const now = Date.now();
    this.requests = this.requests.filter(
      (time) => now - time < this.timeWindow
    );
    return this.requests.length < this.maxRequests;
  }

  recordRequest() {
    this.requests.push(Date.now());
  }
}
```

## 🚀 Alternative Solutions

If JSONBin doesn't meet your needs:

### 1. Supabase (Free tier)

```javascript
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("your-url", "your-anon-key");
```

### 2. Firebase Firestore

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
```

### 3. GitHub API (Version controlled)

```javascript
const response = await fetch(
  "https://api.github.com/repos/user/repo/contents/tools.json",
  {
    headers: { Authorization: "token your-github-token" },
  }
);
```

### 4. Airtable (Spreadsheet-like)

```javascript
const response = await fetch("https://api.airtable.com/v0/your-base/Tools", {
  headers: { Authorization: "Bearer your-api-key" },
});
```

## 📊 Monitoring & Analytics

### JSONBin Dashboard

- Monitor request usage
- View bin access logs
- Track data changes
- Download backups

### Custom Analytics

Add usage tracking:

```javascript
async addTool(newTool) {
  // Track addition
  this.trackEvent('tool_added', {
    type: newTool.type,
    category: newTool.category,
    author: newTool.author
  });

  return await this.jsonBinService.addTool(newTool);
}
```

## 🎯 Next Steps

1. **Complete Setup**: Configure your JSONBin credentials
2. **Test Locally**: Verify everything works on localhost
3. **Deploy**: Push to GitHub Pages or your hosting platform
4. **Monitor**: Keep an eye on usage and errors
5. **Scale**: Consider upgrading to Pro tier if needed

## 🆘 Troubleshooting

**Tools not loading?**

- Check browser console for errors
- Verify Bin ID and API key are correct
- Ensure CORS is enabled (JSONBin enables this by default)

**Can't add new tools?**

- Verify API key has write permissions
- Check if you've hit rate limits
- Ensure JSON structure is valid

**Data not persisting?**

- Check network tab for failed requests
- Verify bin permissions
- Look for validation errors in console

Need help? Check the [JSONBin documentation](https://jsonbin.io/api-reference) or create an issue in the repository.

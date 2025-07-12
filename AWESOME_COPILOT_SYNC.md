# Content Pages Auto-Update (Rules, Prompts, Chat Modes)

All three content pages automatically load content from the `awesome-copilot` directory.

## How It Works

1. **Automatic Loading**: 
   - Rules page dynamically loads all instruction files from `awesome-copilot/instructions/`
   - Prompts page dynamically loads all prompt files from `awesome-copilot/prompts/`
   - Chat Modes page dynamically loads all chatmode files from `awesome-copilot/chatmodes/`
2. **Git Pull Updates**: When you `git pull` the awesome-copilot repository, new files are automatically available
3. **No Manual Sync**: No need to manually copy files between directories

## Updating the Content

If you add new files to any of the awesome-copilot directories, you have these options:

### Option 1: Comprehensive Script (Recommended)
```bash
node update-awesome-copilot.js
```

This script will:
- Scan all three awesome-copilot directories (`instructions/`, `prompts/`, `chatmodes/`)
- Automatically update Rules and Prompts pages to include all files
- Verify Chat Modes page is properly configured for dynamic loading
- Display a comprehensive summary of all updates

### Option 2: Individual Scripts
```bash
# Update only Rules page
node update-rules.js

# Or update Rules and verify Prompts manually
node update-rules.js && node update-awesome-copilot.js
```

### Option 3: Manual Update (Rules & Prompts only)
Edit the respective HTML files and add new filenames to the file arrays:
- `/rules/index.html` - Add to `ruleFiles` array in `loadRulesFromFiles()` function
- `/prompts/index.html` - Add to `promptFiles` array in `loadPromptsFromFiles()` function
- `/chatmodes/index.html` - Already configured for full dynamic loading, no manual updates needed

## File Structure
```
sase-marketplace/
├── awesome-copilot/
│   ├── instructions/                 # Source for Rules page
│   ├── prompts/                      # Source for Prompts page
│   └── chatmodes/                    # Source for Chat Modes page
├── rules/index.html                  # Rules page loads from awesome-copilot/instructions
├── prompts/index.html                # Prompts page loads from awesome-copilot/prompts
├── chatmodes/index.html              # Chat Modes page loads from awesome-copilot/chatmodes
├── update-awesome-copilot.js         # Comprehensive auto-update script
└── update-rules.js                   # Rules-only update script
```

## Benefits
- ✅ Single source of truth (awesome-copilot repo)
- ✅ Automatic updates via git pull
- ✅ No duplicate file management
- ✅ Always stays current with latest content
- ✅ Comprehensive automation script for easy maintenance
- ✅ All three content types (Rules, Prompts, Chat Modes) synchronized
- ✅ Chat Modes fully dynamic with no manual file list management needed

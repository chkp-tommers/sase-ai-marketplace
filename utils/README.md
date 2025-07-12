# SASE Marketplace File Fetcher Utility

A Node.js utility to programmatically access and fetch file names from the SASE Marketplace project directories. This utility can be used both within the project and from external applications.

## Features

- ✅ Fetch file names from any directory within the project
- ✅ Recursive directory scanning
- ✅ Detailed file metadata (size, modification date, extension)
- ✅ Project structure overview
- ✅ External usage support
- ✅ Local-only operation (no network requests)

## Installation

### Using within the SASE Marketplace project:

```javascript
const { getToolsFileNames } = require('./utils/file-fetcher');
```

### Using from an external project:

1. Copy the `utils/file-fetcher.js` file to your project
2. Update the require path accordingly

```javascript
const { getToolsFileNames } = require('/path/to/sase-marketplace/utils/file-fetcher');
```

## API Reference

### `getToolsFileNames(targetDir)`

Fetches all file names from a specified directory.

**Parameters:**
- `targetDir` (string, optional): Directory name relative to project root. Defaults to 'tools'.

**Returns:** `Promise<string[]>` - Array of file names

**Example:**
```javascript
const files = await getToolsFileNames('tools');
console.log(files); // ['index.html', 'test.html']
```

### `getToolsFileNamesRecursive(targetDir)`

Fetches all file names recursively from a directory and its subdirectories.

**Parameters:**
- `targetDir` (string, optional): Directory name relative to project root. Defaults to 'tools'.

**Returns:** `Promise<string[]>` - Array of relative file paths

**Example:**
```javascript
const files = await getToolsFileNamesRecursive('awesome-copilot');
console.log(files); // ['README.md', 'chatmodes/4.1-Beast.chatmode.md', ...]
```

### `getToolsFileDetails(targetDir)`

Gets detailed information about files in a directory.

**Parameters:**
- `targetDir` (string, optional): Directory name relative to project root. Defaults to 'tools'.

**Returns:** `Promise<Object[]>` - Array of file objects with metadata

**Example:**
```javascript
const details = await getToolsFileDetails('tools');
console.log(details);
// [{ name: 'index.html', size: 44595, modified: Date, extension: '.html', path: '...' }]
```

### `getProjectStructure()`

Gets an overview of the entire project structure with file counts.

**Returns:** `Promise<Object>` - Object with directory names and file counts

**Example:**
```javascript
const structure = await getProjectStructure();
console.log(structure);
// { tools: 2, prompts: 1, chatmodes: 1, ... }
```

## Usage Examples

### Basic Usage

```javascript
const { getToolsFileNames } = require('./utils/file-fetcher');

async function listToolFiles() {
  try {
    const files = await getToolsFileNames();
    console.log('Tool files:', files);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

listToolFiles();
```

### External Usage

```javascript
// From external project
const { getToolsFileNames } = require('/Users/tommers/Documents/sase-marketplace/utils/file-fetcher');

async function fetchSASEData() {
  const tools = await getToolsFileNames('tools');
  const prompts = await getToolsFileNames('prompts');
  const chatmodes = await getToolsFileNames('chatmodes');
  
  return { tools, prompts, chatmodes };
}
```

### Advanced Usage

```javascript
const { 
  getToolsFileNames, 
  getToolsFileDetails,
  getProjectStructure 
} = require('./utils/file-fetcher');

async function comprehensiveAnalysis() {
  // Get overview
  const structure = await getProjectStructure();
  
  // Get detailed analysis of specific directories
  const toolDetails = await getToolsFileDetails('tools');
  const promptDetails = await getToolsFileDetails('prompts');
  
  // Calculate total sizes
  const totalSize = toolDetails.reduce((sum, file) => sum + file.size, 0);
  
  console.log('Project Structure:', structure);
  console.log('Tools total size:', totalSize, 'bytes');
}
```

## Testing

Run the included example to test the functionality:

```bash
npm run demo
# or
node example-usage.js
```

For external usage testing:

```bash
npm run external-demo
# or
node external-usage-example.js
```

## Requirements

- Node.js >= 12.0.0
- File system access to the SASE Marketplace project directory

## Error Handling

All functions throw descriptive errors when:
- Directory doesn't exist
- Permission denied
- Invalid path provided

```javascript
try {
  const files = await getToolsFileNames('nonexistent-dir');
} catch (error) {
  console.error('Failed to read directory:', error.message);
}
```

## Contributing

This utility is part of the SASE Marketplace project. For contributions, please refer to the main project's contribution guidelines.

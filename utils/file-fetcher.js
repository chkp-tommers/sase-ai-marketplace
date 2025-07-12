const fs = require('fs').promises;
const path = require('path');

/**
 * Fetches all file names from any directory
 * @param {string} targetPath - Absolute or relative path to the directory
 * @returns {Promise<string[]>} Array of file names
 */
async function getFileNames(targetPath) {
  try {
    // Resolve the absolute path
    const dirPath = path.resolve(targetPath);
    
    // Read the directory contents
    const files = await fs.readdir(dirPath);
    
    // Filter only files (not directories)
    const fileStats = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(dirPath, file);
        const stat = await fs.stat(filePath);
        return { name: file, isFile: stat.isFile() };
      })
    );
    
    return fileStats
      .filter(item => item.isFile)
      .map(item => item.name);
      
  } catch (error) {
    throw new Error(`Failed to read directory: ${error.message}`);
  }
}

/**
 * Fetches all file names from the tools directory (legacy function)
 * @param {string} targetDir - Optional: specify a different directory within the project
 * @returns {Promise<string[]>} Array of file names
 */
async function getToolsFileNames(targetDir = 'tools') {
  try {
    // Get the project root directory (where this utility is located)
    const projectRoot = path.resolve(__dirname, '..');
    
    // Build the target directory path
    const dirPath = path.join(projectRoot, targetDir);
    
    return await getFileNames(dirPath);
      
  } catch (error) {
    throw new Error(`Failed to read directory: ${error.message}`);
  }
}

/**
 * Fetches all file names recursively from a directory
 * @param {string} targetDir - Directory to scan
 * @returns {Promise<string[]>} Array of file paths relative to the target directory
 */
async function getToolsFileNamesRecursive(targetDir = 'tools') {
  try {
    const projectRoot = path.resolve(__dirname, '..');
    const dirPath = path.join(projectRoot, targetDir);
    
    async function scanDirectory(currentPath, relativePath = '') {
      const files = await fs.readdir(currentPath);
      const results = [];
      
      for (const file of files) {
        const fullPath = path.join(currentPath, file);
        const relativeFilePath = path.join(relativePath, file);
        const stat = await fs.stat(fullPath);
        
        if (stat.isFile()) {
          results.push(relativeFilePath);
        } else if (stat.isDirectory()) {
          const subFiles = await scanDirectory(fullPath, relativeFilePath);
          results.push(...subFiles);
        }
      }
      
      return results;
    }
    
    return await scanDirectory(dirPath);
    
  } catch (error) {
    throw new Error(`Failed to read directory recursively: ${error.message}`);
  }
}

/**
 * Gets file names with additional metadata
 * @param {string} targetDir - Directory to scan
 * @returns {Promise<Object[]>} Array of file objects with name, size, and modified date
 */
async function getToolsFileDetails(targetDir = 'tools') {
  try {
    const projectRoot = path.resolve(__dirname, '..');
    const dirPath = path.join(projectRoot, targetDir);
    
    const files = await fs.readdir(dirPath);
    
    const fileDetails = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(dirPath, file);
        const stat = await fs.stat(filePath);
        
        if (stat.isFile()) {
          return {
            name: file,
            size: stat.size,
            modified: stat.mtime,
            extension: path.extname(file),
            path: filePath
          };
        }
        return null;
      })
    );
    
    return fileDetails.filter(Boolean);
    
  } catch (error) {
    throw new Error(`Failed to get file details: ${error.message}`);
  }
}

/**
 * Gets all directories and their file counts
 * @returns {Promise<Object>} Object with directory names as keys and file counts as values
 */
async function getProjectStructure() {
  try {
    const projectRoot = path.resolve(__dirname, '..');
    const items = await fs.readdir(projectRoot);
    
    const structure = {};
    
    for (const item of items) {
      const itemPath = path.join(projectRoot, item);
      const stat = await fs.stat(itemPath);
      
      if (stat.isDirectory() && !item.startsWith('.')) {
        try {
          const files = await fs.readdir(itemPath);
          const fileCount = files.length;
          structure[item] = fileCount;
        } catch (error) {
          structure[item] = 'Error reading directory';
        }
      }
    }
    
    return structure;
    
  } catch (error) {
    throw new Error(`Failed to get project structure: ${error.message}`);
  }
}

module.exports = {
  getFileNames,
  getToolsFileNames,
  getToolsFileNamesRecursive,
  getToolsFileDetails,
  getProjectStructure
};

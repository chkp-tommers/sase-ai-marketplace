const path = require('path');
const { 
  getToolsFileNames, 
  getToolsFileNamesRecursive, 
  getToolsFileDetails,
  getProjectStructure 
} = require('./utils/file-fetcher');

/**
 * Example usage of the file fetcher utility
 * This demonstrates how to use the utility from within the project or externally
 */
async function exampleUsage() {
  try {
    console.log('=== SASE Marketplace File Fetcher Demo ===\n');
    
    // 1. Get simple file names from tools directory
    console.log('1. Files in tools directory:');
    const toolFiles = await getToolsFileNames();
    console.log(toolFiles);
    console.log(`Found ${toolFiles.length} files\n`);
    
    // 2. Get files from a different directory
    console.log('2. Files in chatmodes directory:');
    const chatmodeFiles = await getToolsFileNames('chatmodes');
    console.log(chatmodeFiles);
    console.log(`Found ${chatmodeFiles.length} files\n`);
    
    // 3. Get files recursively from awesome-copilot directory
    console.log('3. Files recursively in awesome-copilot directory:');
    const awesomeFiles = await getToolsFileNamesRecursive('awesome-copilot');
    console.log(awesomeFiles.slice(0, 10)); // Show first 10 files
    console.log(`Found ${awesomeFiles.length} files total\n`);
    
    // 4. Get detailed file information
    console.log('4. Detailed file information for tools:');
    const fileDetails = await getToolsFileDetails();
    fileDetails.forEach(file => {
      console.log(`${file.name} - ${file.size} bytes - ${file.extension} - Modified: ${file.modified.toLocaleDateString()}`);
    });
    console.log();
    
    // 5. Get project structure overview
    console.log('5. Project structure overview:');
    const structure = await getProjectStructure();
    Object.entries(structure).forEach(([dir, count]) => {
      console.log(`${dir}: ${count} items`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the example if this file is executed directly
if (require.main === module) {
  exampleUsage();
}

module.exports = { exampleUsage };

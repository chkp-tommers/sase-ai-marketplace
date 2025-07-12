/**
 * External Usage Example
 * 
 * This file demonstrates how to use the SASE Marketplace file fetcher
 * from an external project or different directory.
 * 
 * To use this from outside the project:
 * 1. Copy this file to your external project
 * 2. Update the require path to point to the correct location
 * 3. Run: node external-usage-example.js
 */

// Update this path to match where you've placed the sase-marketplace project
const SASE_PROJECT_PATH = '/Users/tommers/Documents/sase-marketplace';

// Import the file fetcher utility
const { 
  getToolsFileNames, 
  getToolsFileNamesRecursive, 
  getToolsFileDetails,
  getProjectStructure 
} = require(`${SASE_PROJECT_PATH}/utils/file-fetcher`);

async function fetchSASEFiles() {
  try {
    console.log('🔍 Fetching files from SASE Marketplace...\n');
    
    // Get all tool files
    const tools = await getToolsFileNames();
    console.log('📁 Tools directory files:', tools);
    
    // Get all prompt files
    const prompts = await getToolsFileNames('prompts');
    console.log('📁 Prompts directory files:', prompts);
    
    // Get chatmode files
    const chatmodes = await getToolsFileNames('chatmodes');
    console.log('📁 Chatmodes directory files:', chatmodes);
    
    // Get project overview
    const structure = await getProjectStructure();
    console.log('\n📊 Project structure:');
    console.table(structure);
    
    // Get detailed info for tools
    const toolDetails = await getToolsFileDetails();
    console.log('\n📋 Tool file details:');
    toolDetails.forEach(file => {
      console.log(`  ${file.name} (${file.size} bytes, modified: ${file.modified.toDateString()})`);
    });
    
    return {
      tools,
      prompts,
      chatmodes,
      structure,
      toolDetails
    };
    
  } catch (error) {
    console.error('❌ Error fetching SASE files:', error.message);
    throw error;
  }
}

// Export for use in other modules
module.exports = { fetchSASEFiles, SASE_PROJECT_PATH };

// Run if executed directly
if (require.main === module) {
  fetchSASEFiles()
    .then(result => {
      console.log('\n✅ Successfully fetched all files!');
      console.log(`Total tools: ${result.tools.length}`);
      console.log(`Total prompts: ${result.prompts.length}`);
      console.log(`Total chatmodes: ${result.chatmodes.length}`);
    })
    .catch(error => {
      console.error('Failed to fetch files:', error.message);
      process.exit(1);
    });
}

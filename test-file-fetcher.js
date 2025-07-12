// Example of how to use the file fetcher from any external location
const { getFileNames } = require('./utils/file-fetcher');

async function testFileFetcher() {
  try {
    // Get files from tools directory using absolute path
    const toolsPath = '/Users/tommers/Documents/sase-marketplace/tools';
    const toolsFiles = await getFileNames(toolsPath);
    console.log('Files in tools directory:', toolsFiles);
    
    // Get files from any other directory using relative path
    const utilsFiles = await getFileNames('./utils');
    console.log('Files in utils directory:', utilsFiles);
    
    // Get files from current directory
    const currentDirFiles = await getFileNames('.');
    console.log('Files in current directory:', currentDirFiles);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the test
testFileFetcher();

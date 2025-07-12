#!/usr/bin/env node

/**
 * Update Instructions Index
 * 
 * This script scans the awesome-copilot/instructions directory and creates
 * a local index file that can be used for dynamic discovery without
 * modifying the external repo.
 */

const fs = require('fs');
const path = require('path');

const INSTRUCTIONS_DIR = './awesome-copilot/instructions';
const OUTPUT_FILE = './assets/data/instructions-index.json';

function scanInstructionsDirectory() {
  try {
    if (!fs.existsSync(INSTRUCTIONS_DIR)) {
      console.error(`Directory ${INSTRUCTIONS_DIR} does not exist`);
      return [];
    }

    const files = fs.readdirSync(INSTRUCTIONS_DIR);
    const instructionFiles = files.filter(file => 
      file.endsWith('.instructions.md') || 
      (file.endsWith('.md') && !file.startsWith('README'))
    );

    return instructionFiles.sort();
  } catch (error) {
    console.error('Error scanning instructions directory:', error);
    return [];
  }
}

function createIndex() {
  const files = scanInstructionsDirectory();
  
  const index = {
    description: "Index of instruction files from awesome-copilot/instructions directory",
    lastUpdated: new Date().toISOString().split('T')[0],
    sourceDirectory: "awesome-copilot/instructions/",
    files: files,
    count: files.length,
    generatedBy: "update-instructions-index.js"
  };

  // Ensure assets/data directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the index file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
  
  console.log(`✅ Created index with ${files.length} instruction files`);
  console.log(`📁 Index saved to: ${OUTPUT_FILE}`);
  console.log(`📋 Files found:`);
  files.forEach(file => console.log(`   - ${file}`));
  
  return index;
}

// Run the script
if (require.main === module) {
  console.log('🔍 Scanning awesome-copilot instructions directory...');
  createIndex();
}

module.exports = { scanInstructionsDirectory, createIndex };

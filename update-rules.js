#!/usr/bin/env node

/**
 * Update Rules Page with Latest Files from awesome-copilot/instructions
 * 
 * This script automatically updates the Rules page to include any new
 * instruction files added to the awesome-copilot/instructions directory.
 * 
 * Run this script after pulling updates from the awesome-copilot repository
 * to ensure the Rules page stays synchronized with the latest content.
 */

const fs = require('fs');
const path = require('path');

// Paths
const instructionsDir = path.join(__dirname, 'awesome-copilot', 'instructions');
const rulesIndexPath = path.join(__dirname, 'rules', 'index.html');

// Get all instruction files
function getInstructionFiles() {
    try {
        const files = fs.readdirSync(instructionsDir)
            .filter(file => file.endsWith('.instructions.md') || file.endsWith('.md'))
            .sort();
        return files;
    } catch (error) {
        console.error('Error reading instructions directory:', error);
        return [];
    }
}

// Update the Rules page HTML file
function updateRulesPage() {
    try {
        const files = getInstructionFiles();
        
        if (files.length === 0) {
            console.log('No instruction files found.');
            return;
        }

        // Read the current Rules page
        let htmlContent = fs.readFileSync(rulesIndexPath, 'utf8');

        // Generate the new file list
        const fileListString = files.map(file => `            '${file}'`).join(',\n');
        const newFilesList = `          const ruleFiles = [\n${fileListString}\n          ];`;

        // Replace the file list in the HTML
        const fileListRegex = /const ruleFiles = \[\s*[\s\S]*?\s*\];/;
        
        if (fileListRegex.test(htmlContent)) {
            htmlContent = htmlContent.replace(fileListRegex, newFilesList);
            
            // Write the updated content back
            fs.writeFileSync(rulesIndexPath, htmlContent, 'utf8');
            
            console.log(`✅ Updated Rules page with ${files.length} instruction files:`);
            files.forEach(file => console.log(`   - ${file}`));
            console.log('\n📝 Rules page is now synchronized with awesome-copilot/instructions!');
        } else {
            console.error('❌ Could not find file list in Rules page to update.');
        }
        
    } catch (error) {
        console.error('Error updating Rules page:', error);
    }
}

// Main execution
console.log('🔄 Synchronizing Rules page with awesome-copilot/instructions...\n');
updateRulesPage();

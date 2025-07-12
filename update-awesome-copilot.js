#!/usr/bin/env node

/**
 * Update Prompts, Rules, and Chat Modes Pages with Latest Files from awesome-copilot
 * 
 * This script automatically updates all three content pages to include
 * any new files added to the awesome-copilot repository directories.
 * 
 * Run this script after pulling updates from the awesome-copilot repository
 * to ensure all pages stay synchronized with the latest content.
 */

const fs = require('fs');
const path = require('path');

// Paths
const instructionsDir = path.join(__dirname, 'awesome-copilot', 'instructions');
const promptsDir = path.join(__dirname, 'awesome-copilot', 'prompts');
const chatmodesDir = path.join(__dirname, 'awesome-copilot', 'chatmodes');
const rulesIndexPath = path.join(__dirname, 'rules', 'index.html');
const promptsIndexPath = path.join(__dirname, 'prompts', 'index.html');
const chatmodesIndexPath = path.join(__dirname, 'chatmodes', 'index.html');
const toolsIndexPath = path.join(__dirname, 'tools', 'index.html');

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

// Get all prompt files
function getPromptFiles() {
    try {
        const files = fs.readdirSync(promptsDir)
            .filter(file => file.endsWith('.prompt.md') || file.endsWith('.md'))
            .sort();
        return files;
    } catch (error) {
        console.error('Error reading prompts directory:', error);
        return [];
    }
}

// Get all chatmode files
function getChatmodeFiles() {
    try {
        const files = fs.readdirSync(chatmodesDir)
            .filter(file => file.endsWith('.chatmode.md') || file.endsWith('.md'))
            .sort();
        return files;
    } catch (error) {
        console.error('Error reading chatmodes directory:', error);
        return [];
    }
}

// Update the Rules page HTML file
function updateRulesPage() {
    try {
        const files = getInstructionFiles();
        
        if (files.length === 0) {
            console.log('❌ No instruction files found.');
            return false;
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
            return true;
        } else {
            console.error('❌ Could not find file list in Rules page to update.');
            return false;
        }
        
    } catch (error) {
        console.error('Error updating Rules page:', error);
        return false;
    }
}

// Update the Prompts page HTML file
function updatePromptsPage() {
    try {
        const files = getPromptFiles();
        
        if (files.length === 0) {
            console.log('❌ No prompt files found.');
            return false;
        }

        // Read the current Prompts page
        let htmlContent = fs.readFileSync(promptsIndexPath, 'utf8');

        // Generate the new file list
        const fileListString = files.map(file => `            '${file}'`).join(',\n');
        const newFilesList = `          const promptFiles = [\n${fileListString}\n          ];`;

        // Replace the file list in the HTML
        const fileListRegex = /const promptFiles = \[\s*[\s\S]*?\s*\];/;
        
        if (fileListRegex.test(htmlContent)) {
            htmlContent = htmlContent.replace(fileListRegex, newFilesList);
            
            // Write the updated content back
            fs.writeFileSync(promptsIndexPath, htmlContent, 'utf8');
            
            console.log(`✅ Updated Prompts page with ${files.length} prompt files:`);
            files.forEach(file => console.log(`   - ${file}`));
            return true;
        } else {
            console.error('❌ Could not find file list in Prompts page to update.');
            return false;
        }
        
    } catch (error) {
        console.error('Error updating Prompts page:', error);
        return false;
    }
}

// Update the Tools page HTML file
function updateToolsPage() {
    try {
        const files = getInstructionFiles();
        
        if (files.length === 0) {
            console.log('❌ No instruction files found.');
            return false;
        }

        // Read the current Tools page
        let htmlContent = fs.readFileSync(toolsIndexPath, 'utf8');

        // Generate the new file list
        const fileListString = files.map(file => `            '${file}'`).join(',\n');
        const newFilesList = `          const ruleFiles = [\n${fileListString}\n          ];`;

        // Replace the file list in the HTML
        const fileListRegex = /const ruleFiles = \[\s*[\s\S]*?\s*\];/;
        
        if (fileListRegex.test(htmlContent)) {
            htmlContent = htmlContent.replace(fileListRegex, newFilesList);
            
            // Write the updated content back
            fs.writeFileSync(toolsIndexPath, htmlContent, 'utf8');
            
            console.log(`✅ Updated Tools page with ${files.length} rule files:`);
            files.forEach(file => console.log(`   - ${file}`));
            return true;
        } else {
            console.log('❌ Could not find ruleFiles array in Tools page HTML');
            return false;
        }
        
    } catch (error) {
        console.error('Error updating Tools page:', error);
        return false;
    }
}

// Update the Chat Modes page - verify configuration
function updateChatModesPage() {
    try {
        const files = getChatmodeFiles();
        
        if (files.length === 0) {
            console.log('❌ No chatmode files found.');
            return false;
        }

        // Read the current Chat Modes page to verify it's configured for awesome-copilot
        let htmlContent = fs.readFileSync(chatmodesIndexPath, 'utf8');

        // Check if the page is configured to load from awesome-copilot
        const isConfigured = htmlContent.includes('awesome-copilot/chatmodes/') && 
                           htmlContent.includes('loadChatModesFromFiles()');

        if (isConfigured) {
            console.log(`✅ Chat Modes page is properly configured for dynamic loading.`);
            console.log(`   Found ${files.length} chatmode files in awesome-copilot directory:`);
            files.slice(0, 5).forEach(file => console.log(`   - ${file}`));
            if (files.length > 5) {
                console.log(`   ... and ${files.length - 5} more files`);
            }
            return true;
        } else {
            console.error('❌ Chat Modes page is not configured for awesome-copilot loading.');
            return false;
        }
        
    } catch (error) {
        console.error('Error checking Chat Modes page:', error);
        return false;
    }
}

// Main execution
console.log('🔄 Synchronizing pages with awesome-copilot content...\n');

let rulesUpdated = updateRulesPage();
console.log(''); // Add spacing
let promptsUpdated = updatePromptsPage();
console.log(''); // Add spacing
let toolsUpdated = updateToolsPage();
console.log(''); // Add spacing
let chatmodesUpdated = updateChatModesPage();

console.log('\n📊 Summary:');
console.log(`   Rules page: ${rulesUpdated ? '✅ Updated' : '❌ Failed'}`);
console.log(`   Prompts page: ${promptsUpdated ? '✅ Updated' : '❌ Failed'}`);
console.log(`   Tools page: ${toolsUpdated ? '✅ Updated' : '❌ Failed'}`);
console.log(`   Chat Modes page: ${chatmodesUpdated ? '✅ Configured' : '❌ Failed'}`);

if (rulesUpdated && promptsUpdated && toolsUpdated && chatmodesUpdated) {
    console.log('\n🎉 All pages are now synchronized with awesome-copilot content!');
} else {
    console.log('\n⚠️  Some pages could not be updated. Please check the error messages above.');
}

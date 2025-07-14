# Shared Navigation Component

This project uses a JavaScript-based shared navigation component to avoid duplicating navigation HTML across multiple pages.

## How it works

1. **Navigation Component**: Located at `/assets/js/navigation.js`
2. **HTML Container**: Each page includes `<div id="navigation-container"></div>` where navigation will be injected
3. **Auto-initialization**: The navigation automatically loads when the page loads

## Using the Shared Navigation

### Step 1: Include the Navigation Script
Add this to your HTML `<head>` section:
```html
<!-- Navigation Component -->
<script src="../assets/js/navigation.js"></script>
```

### Step 2: Add the Navigation Container
Replace your existing `<nav>` element with:
```html
<!-- Navigation Container -->
<div id="navigation-container"></div>
```

### Step 3: Remove Duplicate Scripts
Remove any duplicate theme toggle JavaScript since it's handled by the navigation component.

## Features

- **Automatic Active State**: Highlights the current section based on URL path
- **Dynamic Base Path**: Automatically determines correct relative paths (`../` or `./`)
- **Theme Toggle**: Includes dark mode functionality
- **Responsive Design**: Works on all screen sizes

## File Structure
```
/assets/js/navigation.js     # Shared navigation component
/tools/index.html           # Uses shared navigation
/guides/index.html          # Uses shared navigation  
/guides/prompt.html         # Uses shared navigation
```

## Adding New Pages

To add the shared navigation to a new page:

1. Include the navigation script in the `<head>`
2. Add the navigation container div
3. Make sure the relative path to `/assets/js/navigation.js` is correct

## Benefits

- **DRY Principle**: No duplicate navigation HTML
- **Easy Updates**: Change navigation in one place
- **Consistent Behavior**: Same theme toggle and active states everywhere
- **GitHub Pages Compatible**: Works with static hosting

## Alternative Approaches

If you need more sophisticated solutions:

1. **Jekyll Includes** (requires Jekyll setup)
2. **Build Process** with templates (requires build pipeline)
3. **Server-Side Includes** (requires server configuration)

The JavaScript approach is chosen because it works well with GitHub Pages static hosting without requiring additional build tools.

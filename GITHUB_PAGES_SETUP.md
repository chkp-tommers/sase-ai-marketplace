# GitHub Pages Setup Guide

## Automatic Deployment Setup

Your static site is now configured for automatic deployment to GitHub Pages using GitHub Actions.

## Setup Steps

### 1. Push Your Code to GitHub

```bash
git add .
git commit -m "Add static site with GitHub Pages deployment"
git push origin main
```

### 2. Enable GitHub Pages in Your Repository

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Save the changes

### 3. Automatic Deployment

- The workflow will automatically trigger when you push to the `main` branch
- It will deploy the contents of the repository root (the static site files)
- Your site will be available at: `https://yourusername.github.io/yourrepository`

## Files Created

- `.github/workflows/deploy-pages.yml` - GitHub Actions workflow
- `.nojekyll` - Prevents Jekyll processing

## Repository Structure

This repository is already set up as a standalone static site:

1. All static site files are at the repository root
2. The `.github/workflows/deploy-pages.yml` file handles deployment
3. The `.nojekyll` file ensures proper handling of assets

## Manual Deployment

You can also manually trigger the deployment:

1. Go to the **Actions** tab in your repository
2. Click on "Deploy Static Site to GitHub Pages"
3. Click **Run workflow**

## Troubleshooting

- Check the **Actions** tab for deployment logs
- Ensure your repository root contains the static site files
- Verify GitHub Pages is set to "GitHub Actions" source
- Make sure the repository is public (or you have GitHub Pro for private repos)

## Local Testing

Before deploying, test locally:

```bash
python -m http.server 8000
# Visit http://localhost:8000
```

This will serve all files from your repository root, exactly as they'll be deployed.

Your static site will be automatically deployed whenever you push changes to the main branch!

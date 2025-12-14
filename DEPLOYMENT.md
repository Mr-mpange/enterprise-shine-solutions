# GitHub Pages Deployment Guide

## Quick Setup

1. **Create a GitHub repository** for your project
2. **Update the base path** in `vite.config.ts` - replace `your-repo-name` with your actual repository name
3. **Push your code** to GitHub
4. **Enable GitHub Pages** in repository settings

## Detailed Steps

### 1. Create GitHub Repository
- Go to GitHub and create a new repository
- Name it something like `your-business-website`
- Make it public (required for free GitHub Pages)

### 2. Update Base Path
In `vite.config.ts`, replace `your-repo-name` with your actual repository name:
```typescript
base: mode === "production" ? "/your-business-website/" : "/",
```

### 3. Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 4. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically deploy your site

### 5. Access Your Site
Your site will be available at:
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Manual Deployment (Alternative)
If you prefer manual deployment:
```bash
npm run deploy
```

## Notes
- The site updates automatically when you push to the main branch
- Build takes 2-3 minutes to complete
- Changes may take a few minutes to appear on the live site
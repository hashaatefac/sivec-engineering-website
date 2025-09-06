# Deployment Instructions

## GitHub Setup

### Method 1: Using GitHub Web Interface (Recommended)

1. **Create GitHub Repository:**
   - Go to https://github.com/new
   - Repository name: `sivec-engineering-website`
   - Description: `Modern website for SIVEC Engineering - Innovative Engineering Solutions for Sustainable Future`
   - Set to Public (or Private if preferred)
   - Do NOT initialize with README (we already have one)
   - Click "Create repository"

2. **Push Local Code to GitHub:**
   ```bash
   cd "/Users/harshanawarathna/Desktop/Claude-Code/Web page - SIVEC Engineering"
   git remote add origin https://github.com/YOUR_USERNAME/sivec-engineering-website.git
   git branch -M main
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` with your actual GitHub username.

### Method 2: Using GitHub CLI (if you want to install it)

```bash
# Install GitHub CLI (if not already installed)
brew install gh

# Authenticate with GitHub
gh auth login

# Create repository and push
cd "/Users/harshanawarathna/Desktop/Claude-Code/Web page - SIVEC Engineering"
gh repo create sivec-engineering-website --public --description "Modern website for SIVEC Engineering - Innovative Engineering Solutions for Sustainable Future"
git remote add origin https://github.com/$(gh api user --jq .login)/sivec-engineering-website.git
git push -u origin main
```

## Netlify Deployment

### Method 1: Connect GitHub Repository (Recommended)

1. **Sign up/Login to Netlify:**
   - Go to https://netlify.com
   - Sign up with GitHub account for easy integration

2. **Deploy from GitHub:**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your repositories
   - Select `sivec-engineering-website` repository
   - Build settings:
     - Build command: (leave empty)
     - Publish directory: (leave empty or put `.`)
   - Click "Deploy site"

3. **Custom Domain (Optional):**
   - Go to Site settings → Domain management
   - Add custom domain: `sivecengineering.com` (or your preferred domain)
   - Follow DNS configuration instructions

### Method 2: Manual Deploy

1. **Drag and Drop:**
   - Go to https://netlify.com
   - Drag the entire project folder to the deploy area
   - Netlify will automatically deploy your static site

### Environment Variables (if needed for chatbot)
- Go to Site settings → Environment variables
- Add any API keys or configuration variables

## Expected Results

After successful deployment:

- **GitHub Repository:** All code will be version controlled and publicly available
- **Netlify URL:** You'll get a random URL like `https://amazing-name-123456.netlify.app`
- **Custom Domain:** Optional custom domain like `https://sivecengineering.com`
- **SSL Certificate:** Automatically provided by Netlify
- **CDN:** Global content delivery network for fast loading

## Benefits Achieved

✅ **Version Control:** Full Git history and collaboration
✅ **Continuous Deployment:** Auto-deploy on GitHub pushes  
✅ **Global CDN:** Fast loading worldwide
✅ **SSL Certificate:** Secure HTTPS connection
✅ **Custom Domain:** Professional domain name
✅ **Form Handling:** Netlify can handle contact form submissions
✅ **Analytics:** Built-in Netlify analytics
✅ **Performance:** Optimized static site hosting
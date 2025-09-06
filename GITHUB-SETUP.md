# GitHub Setup Commands

## Push to Your GitHub Repository

Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual GitHub details:

```bash
# Navigate to your project directory
cd "/Users/harshanawarathna/Desktop/Claude-Code/Web page - SIVEC Engineering"

# Add your GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Example (replace with your actual details):
```bash
# If your GitHub username is 'harshanawarathna' and repository is 'sivec-engineering-website'
git remote add origin https://github.com/harshanawarathna/sivec-engineering-website.git
git branch -M main
git push -u origin main
```

## After Pushing to GitHub

Your repository will contain:
- ✅ Complete website code
- ✅ AI chatbot integration
- ✅ Netlify configuration
- ✅ Documentation
- ✅ Deployment instructions

## Next: Deploy to Netlify

1. **Go to Netlify**: https://netlify.com
2. **Sign in with GitHub**
3. **New site from Git** → Choose GitHub
4. **Select your repository**: `YOUR_REPOSITORY_NAME`
5. **Deploy settings**:
   - Build command: (leave empty)
   - Publish directory: (leave empty)
6. **Click Deploy**

### Custom Domain (Optional)
After deployment, you can add a custom domain like:
- `sivecengineering.com`
- `www.sivecengineering.com`

## Repository Features

Your GitHub repository now includes:

### 🏗️ **Complete Website**
- Modern responsive design
- Professional styling
- Interactive elements

### 🤖 **AI Chatbot**
- Intelligent customer support
- SIVEC-specific knowledge base
- Mobile-responsive interface

### 🚀 **Deployment Ready**
- Netlify configuration
- Optimized performance
- Security headers

### 📚 **Documentation**
- Setup instructions
- Deployment guide
- Feature documentation

## Benefits

✅ **Version Control**: Track all changes  
✅ **Collaboration**: Team can contribute  
✅ **Backup**: Secure cloud storage  
✅ **Deployment**: Auto-deploy on push  
✅ **Professional**: Industry-standard setup
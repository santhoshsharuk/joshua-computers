# Security Policy

## 🔒 Reporting a Security Vulnerability

If you discover a security vulnerability in this project, please report it by:
- Opening a [GitHub Security Advisory](https://github.com/santhoshsharuk/joshua-computers/security/advisories/new)
- Or emailing the maintainers directly

## ⚠️ API Key Exposure - What to Do

If you've accidentally committed API keys or secrets to this repository, follow these steps immediately:

### 1. Regenerate All Exposed API Keys

**For Firebase:**

⚠️ **Important:** Firebase Web API keys are designed to be public, but only if you have proper security rules. The real issue is usually weak Firestore security rules, not the API key itself.

**Recommended approach:**
1. **First, verify your Firestore security rules** (in `firestore.rules`)
2. **Enable Firebase App Check** to protect against abuse:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project > Build > App Check
   - Register your web app with reCAPTCHA
   - Enable enforcement

**Only if absolutely necessary:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > General
4. Under "Your apps", delete the web app (⚠️ will break your site!)
5. Create a new web app with fresh credentials
6. Update your `.env` file with the new credentials

**For Google Gemini AI:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Delete the exposed API key
3. Create a new API key
4. Update your `.env` file with the new key

### 2. Update Your Environment Variables

**Local Development:**
```bash
# Edit your .env file (never commit this!)
nano .env
```

**Deployment Platforms:**
- **Cloudflare Pages:** Settings > Environment Variables
- **Vercel:** Settings > Environment Variables
- **Netlify:** Site settings > Build & deploy > Environment

### 3. Clean Git History (if keys were committed)

If the keys were committed to Git, you need to remove them from history:

```bash
# Install BFG Repo-Cleaner (recommended)
# Download from: https://rtyley.github.io/bfg-repo-cleaner/

# Or use git-filter-repo (alternative)
pip install git-filter-repo

# Remove sensitive files from all commits
bfg --delete-files .env
bfg --delete-folders dist

# Or with git-filter-repo
git filter-repo --path .env --invert-paths
git filter-repo --path dist --invert-paths

# Force push (WARNING: This rewrites history!)
git push --force --all
```

**⚠️ Warning:** Rewriting Git history affects all collaborators. Coordinate with your team before doing this.

### 4. Verify the Fix

1. Check that `.env` is in `.gitignore`
2. Check that `dist/` is in `.gitignore`
3. Run `git status` to ensure these files are not staged
4. Rebuild your project and verify no keys in `dist/` folder

## 🛡️ Best Practices

### DO:
- ✅ Use environment variables for all sensitive data
- ✅ Keep `.env` in `.gitignore`
- ✅ Use `.env.example` to document required variables
- ✅ Set environment variables in your deployment platform
- ✅ Use different API keys for development and production
- ✅ Regularly rotate API keys
- ✅ Review code before committing

### DON'T:
- ❌ Hardcode API keys in source code
- ❌ Commit `.env` files to Git
- ❌ Commit `dist/` or build folders to Git
- ❌ Share API keys in chat, email, or documentation
- ❌ Use production keys in development
- ❌ Commit secrets in any form (comments, test files, etc.)

## 🔍 How We Protect Secrets

This project uses:

1. **Vite Environment Variables**: All secrets use `import.meta.env.VITE_*` pattern
2. **`.gitignore`**: Excludes `.env` and `dist/` folders
3. **`.env.example`**: Documents required variables without exposing values
4. **Build-time Injection**: Environment variables are injected during build, not hardcoded

## 📚 Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Firebase Security Best Practices](https://firebase.google.com/docs/rules/basics)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning)
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)

## 🚨 Emergency Contacts

If you've exposed production API keys:
1. Regenerate keys immediately
2. Monitor for unauthorized usage
3. Check Firebase Console > Usage for unusual activity
4. Report to project maintainers

## 📝 Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < 1.0   | :x:                |

## 🔐 Security Updates

We take security seriously. Updates will be:
- Published in GitHub Security Advisories
- Noted in release notes
- Communicated to users via project README

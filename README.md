# Scrollix Landing Page

This directory contains the landing page and privacy policy for scrollix.app, hosted on GitHub Pages.

## Files

- `index.html` - Main landing page (Coming Soon)
- `privacy-policy.html` - Privacy Policy page
- `Scrollix_LOGO_Transparent.png` - Scrollix logo (transparent background)

## GitHub Pages Setup Instructions

### Step 1: Create GitHub Repository

1. Go to GitHub and create a new repository named `scrollix-landing` (or any name you prefer)
2. Make it **Public** (required for free GitHub Pages)
3. Do NOT initialize with README (we already have files)

### Step 2: Push Files to GitHub

From this directory (`/Users/johnkitchin/AI/Scrollix/landing-page`), run:

```bash
cd /Users/johnkitchin/AI/Scrollix/landing-page
git init
git add .
git commit -m "Initial commit: Scrollix landing page and privacy policy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/scrollix-landing.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. GitHub will deploy your site to `https://YOUR_USERNAME.github.io/scrollix-landing/`

### Step 4: Configure Custom Domain (scrollix.app)

#### 4a. Add Custom Domain in GitHub

1. Still in **Settings → Pages**
2. Under **Custom domain**, enter: `scrollix.app`
3. Click **Save**
4. GitHub will create a `CNAME` file in your repository
5. Check **Enforce HTTPS** (after DNS propagation)

#### 4b. Configure DNS at GoDaddy

1. Log in to GoDaddy
2. Go to **My Products** → **DNS** for `scrollix.app`
3. Add the following DNS records:

**A Records (for apex domain scrollix.app):**
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 600 seconds

Type: A
Name: @
Value: 185.199.109.153
TTL: 600 seconds

Type: A
Name: @
Value: 185.199.110.153
TTL: 600 seconds

Type: A
Name: @
Value: 185.199.111.153
TTL: 600 seconds
```

**CNAME Record (for www subdomain - optional):**
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
TTL: 1 hour
```

4. Save all records
5. Wait 10-60 minutes for DNS propagation

#### 4c. Verify Custom Domain

1. Go back to GitHub **Settings → Pages**
2. Under **Custom domain**, you should see:
   - ✅ DNS check successful
3. Check **Enforce HTTPS**
4. Visit `https://scrollix.app` - you should see your landing page!

## File Structure After Deployment

```
scrollix.app/
├── index.html           → https://scrollix.app/
├── privacy-policy.html  → https://scrollix.app/privacy-policy.html
└── Scrollix_LOGO_Transparent.png
```

## Testing Locally

You can test the pages locally before deploying:

```bash
# Option 1: Python 3
cd /Users/johnkitchin/AI/Scrollix/landing-page
python3 -m http.server 8000
# Visit: http://localhost:8000

# Option 2: Node.js (if you have http-server installed)
npx http-server -p 8000
# Visit: http://localhost:8000
```

## Updating the Site

To update the landing page or privacy policy:

```bash
cd /Users/johnkitchin/AI/Scrollix/landing-page
# Make your changes to index.html or privacy-policy.html
git add .
git commit -m "Update landing page"
git push
```

GitHub Pages will automatically rebuild and deploy within 1-2 minutes.

## Meta App Review Configuration

Once `https://scrollix.app` is live:

1. Go to Meta Developer Console
2. Navigate to your Scrollix app
3. Click **Settings** → **Basic**
4. Scroll to bottom, click **Add Platform**
5. Select **Website**
6. Enter Site URL: `https://scrollix.app`
7. Save changes

This will unlock the **Reviewer Instructions** section for App Review submission.

## Notes

- **GitHub Pages is FREE** for public repositories
- **Custom domain** is supported at no additional cost
- **HTTPS** is automatically provided by GitHub Pages
- **Build time** is typically 1-2 minutes after push
- **DNS propagation** can take 10-60 minutes (sometimes up to 24 hours)

## Troubleshooting

**Issue: "DNS check failed" in GitHub Pages**
- Wait longer (DNS can take up to 24 hours to propagate)
- Verify A records are correctly pointing to GitHub's IPs
- Try removing and re-adding the custom domain in GitHub Settings

**Issue: "404 Not Found" when visiting scrollix.app**
- Check that DNS has propagated: `dig scrollix.app` or use https://dnschecker.org
- Verify GitHub Pages is enabled (Settings → Pages)
- Verify `CNAME` file exists in repository root (created automatically by GitHub)

**Issue: "Certificate error" or "Not Secure"**
- DNS must fully propagate before HTTPS certificate is issued
- Wait 24 hours after DNS configuration
- Try disabling and re-enabling "Enforce HTTPS" in GitHub Settings → Pages

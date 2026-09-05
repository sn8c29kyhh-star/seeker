# 🌐 Comprehensive Guide: Setting Up GitHub Pages

GitHub Pages turns your repository's Markdown documents into an interactive, beautifully styled website that anyone (mentors, candidates, team members) can access without cloning the repository.

---

## 🚀 How to Enable GitHub Pages (Two Methods)

### Method A: Deploy via GitHub Actions (Recommended & Automated)

We have already configured an automated workflow file at [`.github/workflows/pages.yml`](../.github/workflows/pages.yml).

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: initial curriculum and docs setup"
   git branch -M main
   git remote add origin git@github.com:<your-username-or-org>/<repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Click on the **Settings** tab (top menu bar).
   - In the left sidebar, click on **Pages** (under the "Code and automation" section).
   - Under **Build and deployment** -> **Source**, click the dropdown and select:
     👉 **`GitHub Actions`**.
3. That's it! GitHub Actions will trigger automatically on every push to `main` and deploy your docs site.
4. Your site will be live at:
   `https://<your-username-or-org>.github.io/<repo-name>/`

---

### Method B: Deploy Directly from the `/docs` Folder (Alternative)

If you do not want to use GitHub Actions:

1. Push your repository to GitHub.
2. In your GitHub repository:
   - Go to **Settings** -> **Pages**.
   - Under **Build and deployment** -> **Source**, choose **Deploy from a branch**.
   - Under **Branch**, select `main` and change the folder dropdown from `/ (root)` to **`/docs`**.
   - Click **Save**.
3. Within 1–2 minutes, your site URL will appear at the top of the Pages settings page!

---

## 💻 How to Preview Locally on Your Laptop

Before pushing changes to GitHub, you can preview the website locally on your computer.

### Option 1: Using Python (Built-in on macOS & Linux)
From the root of this repository, run:
```bash
python3 -m http.server 3000 --directory docs
```
Open your browser and navigate to:
👉 [http://localhost:3000](http://localhost:3000)

### Option 2: Using Docsify CLI (Live Reload)
If you have Node.js installed:
```bash
npx docsify-cli serve docs
```
This starts a live-reloading dev server at `http://localhost:3000`. Any edits made to Markdown files are instantly refreshed in your browser!

---

## 🎨 How to Customize the Documentation Site

All site configurations are stored in [`docs/index.html`](../docs/index.html):

- **Repository Link**: Change `repo: ''` to your GitHub URL (e.g. `'https://github.com/your-username/seeker'`). An interactive Octocat icon will appear in the top-right corner.
- **Site Name**: Change `name: '🚀 Jumpstart SWE'` to your program or team name.
- **Theme Color**: In the `<style>` block, change `--theme-color: #2563eb;` to your preferred brand color.
- **Adding Pages to the Sidebar**: Simply edit [`docs/_sidebar.md`](../docs/_sidebar.md) and add standard markdown links.

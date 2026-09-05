# 🛠️ Device & Workstation Setup Guide

Before beginning Day 1, each learner must prepare their workstation to ensure a standardized, frictionless development environment.

---

## 📋 Setup Checklist

Complete the setup in the following sequence:

1. **[01. Terminal & Shell Configuration](01-terminal-and-shell.md)**
   - Package manager installation (Homebrew for macOS, WSL2/Ubuntu for Windows).
   - Modern shell (`zsh` or `bash`) and prompt customization.
   - Command-line utilities (`curl`, `jq`, `ripgrep`, `tree`).
2. **[02. Git & GitHub Configuration](02-git-and-github.md)**
   - Installing Git CLI.
   - Configuring user name, email, and default branch (`main`).
   - Generating and attaching SSH keys for authentication.
   - GPG signing (optional/recommended).
3. **[03. IDE & Developer Tools](03-ide-and-extensions.md)**
   - Visual Studio Code (or preferred IDE) installation.
   - Essential extensions (GitLens, Prettier, ESLint, Markdown All in One, Docker).
   - Recommended font with programming ligatures (e.g., Fira Code, JetBrains Mono).
   - Workspace settings configuration (`settings.json`).

---

## 🧪 Verification Script

After completing the 3 setup guides, run the following verification snippet in your terminal to confirm everything is installed:

```bash
echo "=== System Check ==="
uname -a
echo "=== Git Version ==="
git --version
git config --get user.name
git config --get user.email
echo "=== Shell ==="
echo $SHELL
echo "=== Essential Tools ==="
which curl && curl --version | head -n 1
which jq && jq --version
which code && code --version | head -n 1
echo "✅ Environment check complete!"
```

If any command reports `command not found`, re-visit the corresponding setup guide or consult your mentor.

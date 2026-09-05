# 💻 Optional: IDE & Developer Extensions

> These developer tools are optional. The Manual QA course can be followed using a browser, Sheets, Jira, and Postman; you do not need an IDE or code extensions.

A well-configured Integrated Development Environment (IDE) enhances productivity, enforces code formatting, and catches bugs before they reach code review.

---

## 1. Install Visual Studio Code

1. Download and install **[Visual Studio Code](https://code.visualstudio.com/)**.
2. Enable the `code` command line launcher:
   - Open VS Code.
   - Open the Command Palette (`Cmd+Shift+P` on macOS or `Ctrl+Shift+P` on Windows/Linux).
   - Type `Shell Command: Install 'code' command in PATH` and press Enter.
   - Test in your terminal: `code .` should open VS Code in the current folder.

---

## 2. Recommended Extensions

Install these extensions via the Extensions Marketplace (`Cmd+Shift+X` / `Ctrl+Shift+X`):

| Extension | ID | Purpose |
| :--- | :--- | :--- |
| **GitLens** | `eamodio.gitlens` | Supercharge Git inside VS Code, line-by-line blame, visual history |
| **GitHub Pull Requests and Issues** | `github.vscode-pull-requests-github` | Review PRs and create issues directly from the editor |
| **Prettier - Code Formatter** | `esbenp.prettier-vscode` | Opinionated code formatter |
| **ESLint** | `dbaeumer.vscode-eslint` | JavaScript/TypeScript linter |
| **Markdown All in One** | `yzhang.markdown-all-in-one` | Keyboard shortcuts, table of contents, preview |
| **Docker** | `ms-azuretools.vscode-docker` | Manage containers, images, Dockerfiles |
| **Even Better TOML / YAML** | `redhat.vscode-yaml` | Schema validation and auto-completion |

Quick terminal install for all extensions:
```bash
code --install-extension eamodio.gitlens
code --install-extension github.vscode-pull-requests-github
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension yzhang.markdown-all-in-one
code --install-extension ms-azuretools.vscode-docker
code --install-extension redhat.vscode-yaml
```

---

## 3. Recommended Editor Settings

Add the following to your VS Code `settings.json` (`Cmd+,` -> click top-right "Open Settings (JSON)" icon):

```json
{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.fontFamily": "'JetBrains Mono', 'Fira Code', Menlo, Monaco, 'Courier New', monospace",
  "editor.fontLigatures": true,
  "editor.renderWhitespace": "selection",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "git.autofetch": true,
  "git.confirmSync": false
}
```

---

## ✅ You're Ready!

Your workstation is now configured for software development.
Proceed to **[Day 1: Curriculum & Exercises](../days/phase-1/day-01/README.md)**.

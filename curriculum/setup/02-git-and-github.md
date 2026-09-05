# 🐙 Setup Step 2: Git & GitHub Configuration

Git is the backbone of modern software engineering. We need to configure identity, defaults, and authentication keys.

---

## 1. Set Global Git Identity

Configure your name and work/personal email:
```bash
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

Set the default branch name to `main`:
```bash
git config --global init.defaultBranch main
```

Enable colorful CLI output and clean rebase defaults:
```bash
git config --global color.ui auto
git config --global pull.rebase false
git config --global core.editor "code --wait"
```

Verify your configuration:
```bash
git config --list --show-origin
```

---

## 2. Generate SSH Key for GitHub

Using SSH keys prevents constant password/token prompts when pushing and pulling code.

1. Generate an `ed25519` key (modern standard):
   ```bash
   ssh-keygen -t ed25519 -C "your.email@example.com"
   ```
   *Press Enter to accept the default file location (`~/.ssh/id_ed25519`), and set a secure passphrase.*

2. Start the ssh-agent and add your key:
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

3. Copy the public key to your clipboard:
   - **macOS**:
     ```bash
     pbcopy < ~/.ssh/id_ed25519.pub
     ```
   - **Linux / WSL**:
     ```bash
     cat ~/.ssh/id_ed25519.pub
     # Copy the output manually
     ```

4. Add to GitHub:
   - Go to [GitHub Settings -> SSH and GPG keys](https://github.com/settings/keys).
   - Click **New SSH key**.
   - Title: `My Laptop (MacBook / WSL)`
   - Key type: `Authentication Key`
   - Paste into the **Key** field and click **Add SSH key**.

---

## 3. Test GitHub Connection

Test your connection from your terminal:
```bash
ssh -T git@github.com
```

You should see:
```text
Hi <username>! You've successfully authenticated, but GitHub does not provide shell access.
```

---

## 4. Install GitHub CLI (`gh`)

The official GitHub CLI lets you manage pull requests, issues, and projects straight from your terminal:

- **macOS**: `brew install gh`
- **Linux**: `sudo apt install gh`

Authenticate:
```bash
gh auth login
```
Select `GitHub.com` -> `SSH` -> Authenticate with a web browser.

Proceed to [Step 3: IDE & Developer Tools](03-ide-and-extensions.md).

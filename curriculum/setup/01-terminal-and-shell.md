# 🖥️ Setup Step 1: Terminal & Shell Configuration

A productive software engineer spends hours every day inside the command line. Having a comfortable, responsive, and properly configured terminal is crucial.

---

## 1. Operating System Preparation

### macOS
1. Open **Terminal** (located in `/Applications/Utilities`).
2. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
3. Install **Homebrew** (the macOS package manager):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
4. Follow the on-screen instructions to add Homebrew to your `PATH` in `~/.zprofile`.
5. Recommended Terminal Emulator: [iTerm2](https://iterm2.com/) or [Ghostty](https://ghostty.org/) (or macOS Terminal with zsh).

### Windows (WSL2)
1. Open PowerShell as Administrator and run:
   ```powershell
   wsl --install
   ```
2. Restart your computer if prompted.
3. Launch **Ubuntu** from the Start menu and create your UNIX username and password.
4. Update the package lists:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```
5. Install [Windows Terminal](https://aka.ms/terminal) from the Microsoft Store for a modern tabbed terminal experience.

---

## 2. Shell Configuration (Zsh)

macOS defaults to `zsh`. On Ubuntu/WSL2, verify or install `zsh`:
```bash
sudo apt install -y zsh
chsh -s $(which zsh)
```

### Optional & Recommended: Oh My Zsh
To get useful aliases and plugins:
```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Recommended plugins in `~/.zshrc`:
```bash
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

---

## 3. Essential Command-Line Utilities

Install these standard command-line tools used across engineering teams:

### macOS (via Homebrew)
```bash
brew install git curl wget jq tree ripgrep bat htop
```

### Ubuntu / Debian (via apt)
```bash
sudo apt install -y git curl wget jq tree ripgrep bat htop
```

---

## 🎯 Verification

Run:
```bash
echo "Shell in use: $SHELL"
git --version
jq --version
tree --version
```
If versions are returned without errors, proceed to [Step 2: Git & GitHub Configuration](02-git-and-github.md).

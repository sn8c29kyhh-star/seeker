# 📅 Day 1: Developer Environment & Command-Line Mastery

Welcome to **Day 1** of your onboarding! Today is focused on transforming your relationship with the terminal from a basic shell into an intuitive, high-velocity developer workbench.

---

## 🎯 Learning Objectives

By the end of Day 1, you will:
- [ ] Understand the Unix file system hierarchy, permissions, and environment variables (`PATH`, `SHELL`, `HOME`).
- [ ] Master navigation and file manipulation using standard CLI commands without touching the GUI.
- [ ] Learn I/O redirection (`>`, `>>`, `<`), pipes (`|`), and text processing tools (`grep`, `find`, `sed`, `awk`, `cut`).
- [ ] Write, chmod, and execute your first POSIX-compliant automation shell script.
- [ ] Complete the hands-on Day 1 exercises and log your progress in your daily GitHub Issue.

---

## ⏱️ Daily Schedule

| Time Slot | Module | Focus Area |
| :--- | :--- | :--- |
| **09:00 - 10:00** | Standup & Environment Check | Run environment verification script, review Day 1 goals, create GitHub Issue. |
| **10:00 - 11:30** | Deep Dive: Unix File System | Directory navigation, absolute vs relative paths, file permissions (`chmod`, `chown`). |
| **11:30 - 13:00** | Text Processing & Pipelines | Combining `cat`, `head`, `tail`, `grep`, `awk`, `sort`, `uniq`, and `wc`. |
| **13:00 - 14:00** | *Lunch Break* | — |
| **14:00 - 15:30** | Environment Variables & Shells | Customizing `.zshrc`/`.bashrc`, modifying `$PATH`, subshells vs sourcing. |
| **15:30 - 17:00** | Hands-On Exercise | Complete the [Day 1 Exercises](exercises/README.md) (Automated Log Analyzer Script). |
| **17:00 - 18:00** | Review & Submission | Open PR / commit solution, complete self-assessment checklist, close Daily Issue. |

---

## 📖 Core Concepts

### 1. The Unix Philosophy
> *"Write programs that do one thing and do it well. Write programs to work together. Write programs to handle text streams, because that is a universal interface."* — Doug McIlroy

Every modern backend service, cloud container (Docker/Kubernetes), and serverless runtime runs on Linux. As a software engineer, proficiency in the terminal is non-negotiable.

### 2. Standard Streams & Redirection
- **Standard Input (`stdin`, File Descriptor 0)**: Reads data (default: keyboard).
- **Standard Output (`stdout`, File Descriptor 1)**: Emits normal output (default: terminal screen).
- **Standard Error (`stderr`, File Descriptor 2)**: Emits error messages (default: terminal screen).

```bash
# Redirect stdout to a file (overwrite)
echo "Hello World" > output.txt

# Redirect stdout to a file (append)
echo "Line 2" >> output.txt

# Redirect stderr to a file
ls /nonexistent_folder 2> errors.log

# Combine stdout and stderr into one file
./my_script.sh > all_logs.log 2>&1

# Pipe stdout of command 1 as stdin to command 2
cat app.log | grep "ERROR" | wc -l
```

### 3. File Permissions
Every file in Unix has permissions broken down into **User (u)**, **Group (g)**, and **Others (o)**:
- `r` = Read (4)
- `w` = Write (2)
- `x` = Execute (1)

Example:
```bash
chmod +x deploy.sh        # Make deploy.sh executable
chmod 755 run.sh          # rwxr-xr-x
chmod 600 ~/.ssh/id_ed25519 # rw------- (Strictly private)
```

---

## 🛠️ Hands-On Deliverables for Today

1. Complete the [Day 1 Exercise: Log Analyzer Shell Script](exercises/README.md).
2. Commit your solution to your branch.
3. Review the curated resources in [resources.md](resources.md).

---

## ❓ Self-Assessment & Review Questions

Answer these in your daily issue or notes:
1. What is the difference between `.` and `..` in a directory path?
2. Why is it dangerous to run `chmod 777` on files in production?
3. What happens when you run `export MY_VAR="123"` vs `MY_VAR="123"` without `export`?
4. How does `>` differ from `>>` when redirecting output?

---

## 🏁 Day 1 Completion Checklist

- [ ] Created GitHub Issue: **"Day 01: Developer Environment & Command-Line Mastery"**.
- [ ] Moved issue to `In Progress` on the Kanban board.
- [ ] Completed environment verification script from [Setup Guide](../../setup/README.md).
- [ ] Implemented and tested the Day 1 log analysis script.
- [ ] Pushed code to GitHub with a descriptive commit message.
- [ ] Answered the self-assessment questions in the Issue comments.
- [ ] Closed the issue and moved the card to `Done`.

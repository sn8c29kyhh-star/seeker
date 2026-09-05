# 🧪 Day 1 Hands-On Exercises: Server Log Analyzer

In this exercise, you will create an automated shell script that parses a web server log file to extract actionable metrics (similar to real production troubleshooting).

---

## 🎯 Task Description

Create an executable shell script named `log_analyzer.sh` in this folder.

### Requirements:
1. The script must accept the path to a log file as an argument:
   ```bash
   ./log_analyzer.sh sample_access.log
   ```
2. If no file is provided or the file doesn't exist, exit with an error message and status code `1`.
3. The script should analyze the file and output:
   - **Total requests processed**
   - **Total unique IP addresses**
   - **Top 3 most requested endpoints / URLs**
   - **Count of HTTP 4xx (Client Error) and HTTP 5xx (Server Error) responses**
4. Format the output cleanly with headers and dividers.

---

## 📄 Sample Test Data

Save the following sample lines to `sample_access.log` to test your script:

```text
192.168.1.10 - - [05/Sep/2026:10:00:01] "GET /api/v1/users HTTP/1.1" 200 452
192.168.1.11 - - [05/Sep/2026:10:00:05] "POST /api/v1/login HTTP/1.1" 200 128
192.168.1.10 - - [05/Sep/2026:10:00:12] "GET /api/v1/products HTTP/1.1" 200 2048
192.168.1.14 - - [05/Sep/2026:10:01:00] "GET /api/v1/products HTTP/1.1" 304 0
192.168.1.15 - - [05/Sep/2026:10:02:15] "GET /admin HTTP/1.1" 403 89
192.168.1.10 - - [05/Sep/2026:10:03:22] "GET /api/v1/checkout HTTP/1.1" 500 512
192.168.1.16 - - [05/Sep/2026:10:04:10] "GET /nonexistent HTTP/1.1" 404 140
192.168.1.11 - - [05/Sep/2026:10:04:45] "GET /api/v1/products HTTP/1.1" 200 2048
```

---

## 💡 Hints & Useful Commands

- `awk '{print $1}' sample_access.log | sort | uniq | wc -l` (Count unique IPs)
- `grep -E '" [45][0-9]{2} ' sample_access.log | wc -l` (Count error responses)
- Use standard bash argument check:
  ```bash
  if [ -z "$1" ] || [ ! -f "$1" ]; then
    echo "Usage: $0 <path_to_logfile>"
    exit 1
  fi
  ```

---

## 🚀 Verification

Make your script executable and run:
```bash
chmod +x log_analyzer.sh
./log_analyzer.sh sample_access.log
```
Check that output matches the expected counts from the sample log.

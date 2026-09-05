# 💻 Day 0: Laptop Setup, AI Workstation & Core Tooling

Before touching testing theory, configure your Windows machine with the necessary AI tools, productivity suites, and testing utilities.

---

## 🤖 Step 1: Install & Set Up AI Assistants

### 1. Google Gemini Desktop App
- **Install**: Download the native Windows desktop client directly from [gemini.google.com](https://gemini.google.com) (or install it via Google Chrome by clicking the **Install App / PWA** icon in the address bar).
- **Configuration**: Sign in with your primary Google account. Pin the app to the Windows Taskbar for single-click access.
- **Usage Purpose**: Use Gemini as an on-demand QA mentor to convert requirements into test cases, explain confusing concepts, and generate realistic test data.

### 2. Google Antigravity Setup
- **Install**: Download the Windows installer from `antigravity.google`.
- **Configuration**: Sign in with your Google account and select the default workspace layout.
- **No-Coding Usage**: Configure it as an autonomous agent workspace where you can feed project requirements, generate test documentation artifacts, run scheduled tasks, and review automated walkthrough summaries.

---

## 📊 Step 2: Productivity & Documentation Setup (Free)

### 1. Google Docs & Google Sheets
- Bookmark Google Drive, Docs, and Sheets in your browser.
- Install the **Google Docs Offline Chrome extension** to ensure uninterrupted work even during network dips.
- **Usage**: Google Sheets will be your primary workbench for designing manual test suites, Test Scenarios, and Requirement Traceability Matrices (RTM).

### 2. Microsoft Office Free (Web & Windows Integration)
- Open the default Windows **Microsoft 365 (Office)** app or navigate to [office.com](https://office.com).
- Sign in with a free Microsoft Outlook/Hotmail account to access free web versions of Excel, Word, and PowerPoint.
- **Usage**: Exporting client-ready Excel test sheets and drafting Weekly Status Reports (WSR).

---

## 🛠️ Step 3: Manual QA Prerequisite Utilities

### 1. Google Chrome & DevTools Configuration
- Set **Google Chrome** as your default browser.
- Learn the key shortcut **`F12`** (or `Ctrl + Shift + I`):
  - **Elements tab**: Inspect web elements, attributes, and CSS.
  - **Console tab**: View JavaScript errors and warnings.
  - **Network tab**: Inspect HTTP status codes (200, 404, 500) and API calls.
  - **Device Toolbar (`Ctrl + Shift + M`)**: Toggle mobile and tablet emulator views.

### 2. Screenshot & Annotation Tool
- Ensure Windows **Snipping Tool** is configured with shortcut **`Win + Shift + S`**.
- *(Optional & Recommended)*: Install **[Lightshot](https://app.prntscr.com/)** or **[Flameshot](https://flameshot.org/)** for instant arrow, box, and number callouts on UI bugs.

### 3. Structured Workspace Directories
Open Windows File Explorer and create this clean folder structure on your local drive:
```text
C:\QA_Training\
├── 01_Requirements\
├── 02_Test_Cases\
├── 03_Defect_Screenshots\
├── 04_SQL_Scripts\
└── 05_Postman_Collections\
```

---

## 🧪 Step 4: Day 0 AI Dry-Run Exercise

Execute this hands-on prompt test to verify your AI tools are fully operational for QA tasks:

1. Open **Google Gemini Desktop**.
2. Submit this exact prompt:
   > *"I am a manual QA tester. Generate 5 negative test scenarios for an Indian mobile number login screen (10 digits, +91 country code, OTP verification)."*
3. Copy the output.
4. Open a new **Google Sheet**.
5. Format the output into standard columns:
   - `Scenario ID`
   - `Scenario Description`
   - `Test Steps`
   - `Test Data`
   - `Expected Result`
6. Save and export the file as `Indian_Mobile_Login_Negative_Scenarios.xlsx` in:  
   `C:\QA_Training\02_Test_Cases\`

---

## ✅ Verification Checklist

- [ ] Google Gemini Desktop installed, signed in, and pinned to taskbar.
- [ ] Google Antigravity installed and set to default workspace layout.
- [ ] Google Drive and Sheets bookmarked with offline extension enabled.
- [ ] Chrome DevTools shortcut (`F12`) tested and verified.
- [ ] Snipping tool shortcut (`Win + Shift + S`) verified.
- [ ] `C:\QA_Training\` directory structure created with all 5 subfolders.
- [ ] Day 0 AI Dry-Run exercise completed and saved to `02_Test_Cases`.

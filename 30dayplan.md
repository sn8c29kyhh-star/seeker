30-Day Day-by-Day Manual QA Training Plan

This schedule is designed for zero coding. It focuses strictly on test design techniques, real project documentation, hands-on Jira tracking, no-code API testing via Postman, and back-end database validation using SQL.

System Setup

Day 0: Laptop Setup, AI Workstation & Core Tooling

Before touching testing theory, configure his Windows machine with the necessary AI tools, productivity suites, and testing utilities.

Step 1: Install & Set Up AI Assistants

⚬ Google Gemini Desktop App
⚬ Install: Download the native Windows desktop client directly from gemini.google.com (or install it via Chrome by clicking the Install App / PWA icon in the address bar).
⚬ Configuration: Sign in with his primary Google account. Pin the app to the Windows Taskbar for single-click access.
⚬ Usage Purpose: Use Gemini as an on-demand QA mentor to convert requirements into test cases, explain confusing concepts, and write test data.
⚬ Google Antigravity Setup
⚬ Install: Download the Windows installer from antigravity.google.
⚬ Configuration: Sign in with his Google account and select the default workspace layout.
⚬ No-Coding Usage: He will not use it for code development. Configure it as an autonomous agent workspace where he can feed project requirements, generate test documentation artifacts, run scheduled tasks, and review automated walkthrough summaries.

Step 2: Productivity & Documentation Setup (Free)

⚬ Google Docs & Google Sheets
⚬ Bookmark Google Drive, Docs, and Sheets.
⚬ Install the Google Docs Offline Chrome extension to ensure uninterrupted work.
⚬ Usage: Google Sheets will be his primary workbench for designing manual test suites, Test Scenarios, and Requirement Traceability Matrices (RTM).
⚬ Microsoft Office Free (Web & Windows Integration)
⚬ Open the default Windows Microsoft 365 (Office) app or navigate to office.com.
⚬ Sign in with a free Microsoft Outlook/Hotmail account to access free web versions of Excel, Word, and PowerPoint.
⚬ Usage: Exporting client-ready Excel test sheets and drafting weekly status reports (WSR).

Step 3: Manual QA Prerequisite Utilities

⚬ Google Chrome & DevTools Configuration
⚬ Set Google Chrome as the default browser.
⚬ Teach the basic shortcut F12 (or Ctrl + Shift + I) to inspect web elements, view console logs, and toggle the mobile emulator tool.
⚬ Screenshot & Annotation Tool
⚬ Ensure Windows Snipping Tool is configured with shortcut Win + Shift + S.
⚬ (Optional) Install Lightshot or Flameshot for instant arrow/box callouts on UI bugs.
⚬ Structured Workspace Directories
⚬ Create a clean folder structure in Windows Explorer:
⚬ C:\QA_Training\01_Requirements
⚬ C:\QA_Training\02_Test_Cases
⚬ C:\QA_Training\03_Defect_Screenshots
⚬ C:\QA_Training\04_SQL_Scripts
⚬ C:\QA_Training\05_Postman_Collections

Step 4: Day 1 AI Dry-Run Exercise

Have him execute this hands-on prompt test to verify his AI tools are fully working for QA tasks:

1. Open Gemini Desktop.
2. Submit this prompt:
   "I am a manual QA tester. Generate 5 negative test scenarios for an Indian mobile number login screen (10 digits, +91 country code, OTP verification)."
3. Copy the output, open a new Google Sheet, format the output into columns (Scenario ID, Scenario Description, Expected Result), and save the file in C:\QA_Training\02_Test_Cases.

Phase 1: Core Testing Foundations & Design Techniques (Days 1–7)

⚬ Day 1: Software Landscape & QA Fundamentals
⚬ Core differences between QA, QC, and Software Testing.
⚬ Understanding Verification vs. Validation.
⚬ Overview of Waterfall vs. Agile Scrum models.
⚬ Day 2: SDLC vs. STLC In-Depth
⚬ Breakdown of the Software Development Life Cycle (SDLC).
⚬ Software Testing Life Cycle (STLC) phases: Requirement Analysis, Test Planning, Test Case Development, Test Environment Setup, Test Execution, Test Closure.
⚬ Day 3: Levels of Testing
⚬ Unit, Integration, System, and User Acceptance Testing (UAT).
⚬ Understanding the tester's exact role in System & Acceptance testing.
⚬ Day 4: Functional vs. Non-Functional Testing
⚬ Smoke vs. Sanity testing.
⚬ Regression vs. Re-testing (classic interview question).
⚬ High-level concepts: Performance, Usability, Cross-Browser, and Compatibility testing.
⚬ Day 5: Test Scenarios & Test Case Architecture
⚬ Translating Software Requirement Specifications (SRS) / User Stories into Test Scenarios.
⚬ Standard test case template: ID, Description, Pre-conditions, Test Steps, Test Data, Expected vs. Actual Result, Status.
⚬ Day 6: Black-Box Test Design Techniques
⚬ Equivalence Class Partitioning (ECP).
⚬ Boundary Value Analysis (BVA).
⚬ Practical exercises on boundary limits (e.g., age validation, input field lengths).
⚬ Day 7: Advanced Test Design & Traceability
⚬ Decision Table testing and State Transition diagrams.
⚬ Creating a Requirement Traceability Matrix (RTM) to ensure 100% test coverage.

Phase 2: Defect Management & Jira Tool Mastery (Days 8–14)

⚬ Day 8: Defect Life Cycle (Bug Life Cycle)
⚬ Bug states: New, Assigned, Open, Fixed, Retest, Verified, Closed, Reopened, Rejected, Deferred.
⚬ Anatomy of a high-quality bug report.
⚬ Day 9: Defect Classification
⚬ Severity vs. Priority (definitions, matrix, and interview scenarios).
⚬ Gathering logs, taking screenshots, and writing reproducible steps.
⚬ Day 10: Introduction to Jira Software
⚬ Navigating Jira Cloud: Projects, Boards, Backlog, and Sprints.
⚬ Issue types: Epics, User Stories, Tasks, and Bugs.
⚬ Day 11: Hands-on Jira Execution
⚬ Logging into a free Atlassian Jira workspace.
⚬ Creating sample bug tickets with proper severity, priority, steps to reproduce, environment info, and attachments.
⚬ Day 12: Jira Test Management Integrations
⚬ Understanding Test Management plugins (Zephyr Squad or Xray overview).
⚬ Writing and organizing test cases directly within Jira.
⚬ Day 13: Agile Scrum Ceremonies from a QA View
⚬ Daily Standups (What did I test? What will I test? Impediments/Blockers).
⚬ Sprint Planning, Backlog Refinement, Sprint Review, and Retrospectives.
⚬ Day 14: Practical Sprint Simulation
⚬ Simulating a 2-day sprint on an open-source demo web application (e.g., OrangeHRM or Sauce Demo).
⚬ Logging 5 distinct functional defects in Jira.

Phase 3: SQL for Data Validation & Backend Testing (Days 15–20)

⚬ Day 15: Database Testing Fundamentals
⚬ Why testers need SQL: Verifying UI actions reflect correctly in the backend database.
⚬ Installing MySQL Workbench or using SQLite online sandboxes.
⚬ Day 16: Basic Data Retrieval
⚬ Syntax and usage: SELECT, FROM, WHERE, DISTINCT.
⚬ Filtering operators: AND, OR, NOT, BETWEEN, IN, LIKE.
⚬ Day 17: Aggregations & Grouping
⚬ Aggregate functions: COUNT(), SUM(), AVG(), MIN(), MAX().
⚬ Using GROUP BY, HAVING, and ORDER BY for QA data integrity checks.
⚬ Day 18: SQL Joins for QA
⚬ Understanding relational keys (Primary Key, Foreign Key).
⚬ Writing INNER JOIN, LEFT JOIN, and RIGHT JOIN to compare related tables.
⚬ Day 19: Data Mutation & Rollbacks
⚬ Understanding INSERT, UPDATE, and DELETE queries (and precautions in production/staging environments).
⚬ Day 20: Real-World Database Validation Practice
⚬ Mapping front-end forms (e.g., user signup, cart checkout) to backend SQL tables.
⚬ Writing verification queries to confirm UI updates match backend records.

Phase 4: No-Code API Testing via Postman (Days 21–25)

⚬ Day 21: Client-Server Architecture & HTTP Basics
⚬ How the web works: Clients, Servers, APIs, and JSON format.
⚬ Common HTTP methods: GET, POST, PUT, PATCH, DELETE.
⚬ Day 22: HTTP Status Codes & Responses
⚬ Understanding 2xx (Success), 3xx (Redirection), 4xx (Client Error), and 5xx (Server Error) responses.
⚬ Anatomy of headers, payloads, and parameters.
⚬ Day 23: Postman Setup & Basic Requests
⚬ Installing Postman and setting up workspaces.
⚬ Sending GET and POST requests using public mock APIs (e.g., ReqRes or JSONPlaceholder).
⚬ Day 24: Postman Collections & Validation
⚬ Grouping endpoints into Collections and Folders.
⚬ Performing visual status checks, response time checks, and response body inspections without writing scripts.
⚬ Day 25: Postman Environments & Bug Reporting
⚬ Setting up Environment Variables (Base URLs).
⚬ Reporting API-level bugs (e.g., wrong 500 status instead of 400 bad request, incorrect payload fields).

Phase 5: Live Project Execution & Hyderabad Job Prep (Days 26–30)

⚬ Day 26: End-to-End Live Web Testing Project
⚬ Pick an active web portal (e.g., an e-commerce demo store).
⚬ Read the requirements, build a comprehensive Excel test suite (50+ test cases covering functional, edge, and negative scenarios).
⚬ Day 27: Cross-Browser, Mobile Responsiveness & Defect Logging
⚬ Test the application across Chrome, Edge, and mobile emulators (DevTools).
⚬ Push all found bugs into your personal Jira portfolio board.
⚬ Day 28: Resume Building for Manual QA
⚬ Highlight core strengths: STLC, Test Design, Jira, SQL Backend Validation, Postman API Testing, Agile/Scrum.
⚬ Structure portfolio links: Shareable Google Drive links containing sample Test Case sheets, RTM, and Jira bug export PDFs.
⚬ Day 29: Hyderabad Job Market Strategy
⚬ Optimize profiles on Naukri.com, LinkedIn, and Foundit (targeting keywords: Manual Tester, QA Analyst, Functional Tester, STLC, Jira, SQL Testing).
⚬ Target IT hubs: HITEC City, Madhapur, Gachibowli, and Financial District.
⚬ Day 30: Comprehensive Mock Technical Interview
⚬ Drill classic conceptual questions (ECP vs. BVA, Severity vs. Priority, Defect Life Cycle, JOINs vs. Subqueries).
⚬ Practice situational testing prompts (e.g., "How would you test a pen?", "How would you test an ATM withdrawal screen?", "What do you do if a developer rejects your bug?").

Would you like to review sample test case templates and interview question sets for the Week 1 modules first?

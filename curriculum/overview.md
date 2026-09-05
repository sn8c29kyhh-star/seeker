# 🗺️ 30-Day Day-by-Day Manual QA Training Plan

This schedule is designed for **zero coding**. It focuses strictly on test design techniques, real project documentation, hands-on Jira tracking, no-code API testing via Postman, and back-end database validation using SQL.

---

## 🛠️ System Setup: Day 0 (Laptop Setup, AI Workstation & Core Tooling)

Before touching testing theory, configure the Windows machine with the necessary AI tools, productivity suites, and testing utilities:
- **Step 1: Install & Set Up AI Assistants**: Google Gemini Desktop App, Google Antigravity Setup.
- **Step 2: Productivity & Documentation Setup (Free)**: Google Docs & Google Sheets (with offline mode), Microsoft Office Free (Web & Windows Integration).
- **Step 3: Manual QA Prerequisite Utilities**: Google Chrome & DevTools (`F12`), Screenshot & Annotation tools (Snipping Tool `Win + Shift + S`, Lightshot), Structured Workspace Directories (`C:\QA_Training\...`).
- **Step 4: Day 1 AI Dry-Run Exercise**: Hands-on prompt test in Gemini to generate negative test scenarios for an Indian mobile number login screen.

👉 [View Day 0 Detailed Setup Guide](setup/README.md)

---

## 📘 Phase 1: Core Testing Foundations & Design Techniques (Days 1–7)

*Master test design fundamentals, SDLC vs STLC, and test specification techniques.*

- **[Day 1: Software Landscape & QA Fundamentals](days/phase-1/day-01/README.md)**
  - Core differences between QA, QC, and Software Testing.
  - Understanding Verification vs. Validation.
  - Overview of Waterfall vs. Agile Scrum models.
- **[Day 2: SDLC vs. STLC In-Depth](days/phase-1/day-02.md)**
  - Breakdown of the Software Development Life Cycle (SDLC).
  - Software Testing Life Cycle (STLC) phases: Requirement Analysis, Test Planning, Test Case Development, Test Environment Setup, Test Execution, Test Closure.
- **[Day 3: Levels of Testing](days/phase-1/day-03.md)**
  - Unit, Integration, System, and User Acceptance Testing (UAT).
  - Understanding the tester's exact role in System & Acceptance testing.
- **[Day 4: Functional vs. Non-Functional Testing](days/phase-1/day-04.md)**
  - Smoke vs. Sanity testing.
  - Regression vs. Re-testing (classic interview question).
  - High-level concepts: Performance, Usability, Cross-Browser, and Compatibility testing.
- **[Day 5: Test Scenarios & Test Case Architecture](days/phase-1/day-05.md)**
  - Translating Software Requirement Specifications (SRS) / User Stories into Test Scenarios.
  - Standard test case template: ID, Description, Pre-conditions, Test Steps, Test Data, Expected vs. Actual Result, Status.
- **[Day 6: Black-Box Test Design Techniques](days/phase-1/day-06.md)**
  - Equivalence Class Partitioning (ECP).
  - Boundary Value Analysis (BVA).
  - Practical exercises on boundary limits (e.g., age validation, input field lengths).
- **[Day 7: Advanced Test Design & Traceability](days/phase-1/day-07.md)**
  - Decision Table testing and State Transition diagrams.
  - Creating a Requirement Traceability Matrix (RTM) to ensure 100% test coverage.

---

## 🐞 Phase 2: Defect Management & Jira Tool Mastery (Days 8–14)

*Master bug reporting, severity/priority triage, and hands-on Jira Scrum workflows.*

- **[Day 8: Defect Life Cycle (Bug Life Cycle)](days/phase-2/day-08.md)**
  - Bug states: New, Assigned, Open, Fixed, Retest, Verified, Closed, Reopened, Rejected, Deferred.
  - Anatomy of a high-quality bug report.
- **[Day 9: Defect Classification](days/phase-2/day-09.md)**
  - Severity vs. Priority (definitions, matrix, and interview scenarios).
  - Gathering logs, taking screenshots, and writing reproducible steps.
- **[Day 10: Introduction to Jira Software](days/phase-2/day-10.md)**
  - Navigating Jira Cloud: Projects, Boards, Backlog, and Sprints.
  - Issue types: Epics, User Stories, Tasks, and Bugs.
- **[Day 11: Hands-on Jira Execution](days/phase-2/day-11.md)**
  - Logging into a free Atlassian Jira workspace.
  - Creating sample bug tickets with proper severity, priority, steps to reproduce, environment info, and attachments.
- **[Day 12: Jira Test Management Integrations](days/phase-2/day-12.md)**
  - Understanding Test Management plugins (Zephyr Squad or Xray overview).
  - Writing and organizing test cases directly within Jira.
- **[Day 13: Agile Scrum Ceremonies from a QA View](days/phase-2/day-13.md)**
  - Daily Standups (What did I test? What will I test? Impediments/Blockers).
  - Sprint Planning, Backlog Refinement, Sprint Review, and Retrospectives.
- **[Day 14: Practical Sprint Simulation](days/phase-2/day-14.md)**
  - Simulating a 2-day sprint on an open-source demo web application (e.g., OrangeHRM or Sauce Demo).
  - Logging 5 distinct functional defects in Jira.

---

## 🗄️ Phase 3: SQL for Data Validation & Backend Testing (Days 15–20)

*Validate backend databases to verify that UI actions accurately persist in database tables.*

- **[Day 15: Database Testing Fundamentals](days/phase-3/day-15.md)**
  - Why testers need SQL: Verifying UI actions reflect correctly in the backend database.
  - Installing MySQL Workbench or using SQLite online sandboxes.
- **[Day 16: Basic Data Retrieval](days/phase-3/day-16.md)**
  - Syntax and usage: `SELECT`, `FROM`, `WHERE`, `DISTINCT`.
  - Filtering operators: `AND`, `OR`, `NOT`, `BETWEEN`, `IN`, `LIKE`.
- **[Day 17: Aggregations & Grouping](days/phase-3/day-17.md)**
  - Aggregate functions: `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`.
  - Using `GROUP BY`, `HAVING`, and `ORDER BY` for QA data integrity checks.
- **[Day 18: SQL Joins for QA](days/phase-3/day-18.md)**
  - Understanding relational keys (Primary Key, Foreign Key).
  - Writing `INNER JOIN`, `LEFT JOIN`, and `RIGHT JOIN` to compare related tables.
- **[Day 19: Data Mutation & Rollbacks](days/phase-3/day-19.md)**
  - Understanding `INSERT`, `UPDATE`, and `DELETE` queries (and precautions in production/staging environments).
- **[Day 20: Real-World Database Validation Practice](days/phase-3/day-20.md)**
  - Mapping front-end forms (e.g., user signup, cart checkout) to backend SQL tables.
  - Writing verification queries to confirm UI updates match backend records.

---

## 🔌 Phase 4: No-Code API Testing via Postman (Days 21–25)

*Verify backend APIs, inspect JSON payloads, headers, and status codes without programming.*

- **[Day 21: Client-Server Architecture & HTTP Basics](days/phase-4/day-21.md)**
  - How the web works: Clients, Servers, APIs, and JSON format.
  - Common HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
- **[Day 22: HTTP Status Codes & Responses](days/phase-4/day-22.md)**
  - Understanding 2xx (Success), 3xx (Redirection), 4xx (Client Error), and 5xx (Server Error) responses.
  - Anatomy of headers, payloads, and parameters.
- **[Day 23: Postman Setup & Basic Requests](days/phase-4/day-23.md)**
  - Installing Postman and setting up workspaces.
  - Sending `GET` and `POST` requests using public mock APIs (e.g., ReqRes or JSONPlaceholder).
- **[Day 24: Postman Collections & Validation](days/phase-4/day-24.md)**
  - Grouping endpoints into Collections and Folders.
  - Performing visual status checks, response time checks, and response body inspections without writing scripts.
- **[Day 25: Postman Environments & Bug Reporting](days/phase-4/day-25.md)**
  - Setting up Environment Variables (Base URLs).
  - Reporting API-level bugs (e.g., wrong 500 status instead of 400 bad request, incorrect payload fields).

---

## 💼 Phase 5: Live Project Execution & Hyderabad Job Prep (Days 26–30)

*Consolidate all skills into a live project portfolio, polish resume, and practice interviews.*

- **[Day 26: End-to-End Live Web Testing Project](days/phase-5/day-26.md)**
  - Pick an active web portal (e.g., an e-commerce demo store).
  - Read the requirements, build a comprehensive Excel test suite (50+ test cases covering functional, edge, and negative scenarios).
- **[Day 27: Cross-Browser, Mobile Responsiveness & Defect Logging](days/phase-5/day-27.md)**
  - Test the application across Chrome, Edge, and mobile emulators (DevTools).
  - Push all found bugs into your personal Jira portfolio board.
- **[Day 28: Resume Building for Manual QA](days/phase-5/day-28.md)**
  - Highlight core strengths: STLC, Test Design, Jira, SQL Backend Validation, Postman API Testing, Agile/Scrum.
  - Structure portfolio links: Shareable Google Drive links containing sample Test Case sheets, RTM, and Jira bug export PDFs.
- **[Day 29: Hyderabad Job Market Strategy](days/phase-5/day-29.md)**
  - Optimize profiles on Naukri.com, LinkedIn, and Foundit (targeting keywords: Manual Tester, QA Analyst, Functional Tester, STLC, Jira, SQL Testing).
  - Target IT hubs: HITEC City, Madhapur, Gachibowli, and Financial District.
- **[Day 30: Comprehensive Mock Technical Interview](days/phase-5/day-30.md)**
  - Drill classic conceptual questions (ECP vs. BVA, Severity vs. Priority, Defect Life Cycle, JOINs vs. Subqueries).
  - Practice situational testing prompts (e.g., "How would you test a pen?", "How would you test an ATM withdrawal screen?", "What do you do if a developer rejects your bug?").

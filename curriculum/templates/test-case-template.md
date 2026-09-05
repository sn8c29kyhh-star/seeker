# 📋 Production Manual Test Case Template

This is the standard corporate test case template used across IT companies. You can replicate these columns directly in Google Sheets or Microsoft Excel.

---

## 📊 Google Sheets / Excel Column Structure

| Column Header | Description | Example Value |
| :--- | :--- | :--- |
| **Test Case ID** | Unique identifier with module code | `TC_AUTH_001` |
| **Module / Component** | Feature area being tested | `User Authentication` |
| **Test Scenario** | High-level user goal | `Verify user login with valid credentials` |
| **Test Case Description** | Specific check being performed | `Check login with registered email and correct password` |
| **Severity** | Impact on system (Critical, High, Medium, Low) | `High` |
| **Priority** | Execution urgency (P1, P2, P3, P4) | `P1` |
| **Pre-conditions** | Prerequisites required before executing steps | `1. User is registered.<br>2. Browser on login page.` |
| **Test Steps** | Numbered, step-by-step instructions | `1. Enter email in Email field.<br>2. Enter password.<br>3. Click 'Login' button.` |
| **Test Data** | Exact inputs used | `Email: testuser@example.com<br>Password: Pass@1234` |
| **Expected Result** | What should happen according to SRS / User Story | `User redirected to Dashboard. Welcome banner displayed.` |
| **Actual Result** | What actually happened during test execution | `User redirected to Dashboard successfully.` |
| **Status** | Pass, Fail, Blocked, Skipped | `Pass` |
| **Defect ID** | Jira Bug ID if status is Fail | `BUG-104` (or N/A) |
| **Executed By** | Tester's name | `Ramesh QA` |
| **Execution Date** | Date of test run | `2026-09-06` |
| **Comments / Notes** | Any observations or environment notes | `Tested on Chrome v128 on Windows 11` |

---

## 💡 Best Practices for Test Case Authoring

1. **Atomic Steps**: Keep each step concise and unambiguous.
2. **Clear Expected Result**: Avoid vague descriptions like *"It should work"*. Specify exact UI changes, error messages, or redirections.
3. **Traceability**: Always link the test case back to the requirement or user story ID.

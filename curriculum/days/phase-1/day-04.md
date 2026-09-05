# 📅 Day 4: Functional vs. Non-Functional Testing & Critical Test Types

> **Theme**: Mastering the most frequently asked testing classifications: Functional vs Non-Functional, Smoke vs Sanity, and Regression vs Re-testing.

---

## 🎯 Learning Objectives

By the end of today, you will:
- [ ] Differentiate between **Functional Testing** (what the system does) and **Non-Functional Testing** (how well the system performs).
- [ ] Understand **Smoke Testing** vs **Sanity Testing** with clear entry criteria.
- [ ] Master the critical distinction between **Regression Testing** and **Re-Testing**.
- [ ] Understand high-level concepts: Performance, Usability, Cross-Browser, and Compatibility testing.

---

## 📖 Core Concepts

### 1. Regression Testing vs. Re-Testing (Top Interview Question!)

| Attribute | Re-Testing | Regression Testing |
| :--- | :--- | :--- |
| **Purpose** | To confirm that a specific reported bug has been fixed by the developer. | To ensure that fixing a bug or adding a feature didn't break existing, unchanged features. |
| **Trigger** | Executed immediately after a bug status changes to "Fixed". | Executed whenever a new build with code changes is deployed. |
| **Scope** | Restricted to the failed test case and specific defect steps. | Broader scope covering dependent modules and critical paths. |
| **Priority** | High priority, executed before regression. | Follows successful re-testing. |
| **Example** | Bug: 'Submit button does not respond on click'. Re-test: Click submit button to confirm it now responds. | Test all other forms, navigation links, and session cookies to ensure the fix didn't introduce new side-effects. |

---

### 2. Smoke Testing vs. Sanity Testing

- **Smoke Testing (Build Verification Testing)**:
  - *"Is the build stable enough for further testing?"*
  - Shallow and wide: checks critical path functions (can the user login? can they view the dashboard?).
  - If smoke tests fail, the build is rejected and sent back to developers immediately.
- **Sanity Testing**:
  - *"Are the recent bug fixes and minor changes working sensibly?"*
  - Narrow and deep: verifies specific bug fixes or minor enhancements on a stable build.
  - Performed when release deadlines are tight and full regression is not feasible.

---

### 3. Functional vs Non-Functional Testing

- **Functional Testing**: Validates software behavior against specifications (e.g., input validation, calculations, data flows, business logic).
- **Non-Functional Testing**: Validates quality characteristics (e.g., load testing, response times under 1,000 users, usability, cross-browser compatibility on Chrome/Edge/Firefox, mobile screen responsiveness).

---

## 🛠️ Hands-On Task for Today

1. Open Google Sheets.
2. Build a comparative matrix with real e-commerce examples for:
   - Smoke Test Cases (3 examples)
   - Sanity Test Cases (3 examples)
   - Re-Testing vs Regression Scenarios (2 side-by-side examples)
3. Save to `C:\QA_Training\02_Test_Cases\Day04_Test_Types_Matrix.xlsx`.

---

## ❓ Interview Questions

1. A developer says: "I only changed one line of code in the checkout page, why do you need to run regression tests?" How do you respond?
2. What will you do if a build fails smoke testing on staging?
3. What is the difference between Load Testing and Stress Testing?

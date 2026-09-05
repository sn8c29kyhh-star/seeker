# 📅 Day 5: Test Scenarios & Test Case Architecture

> **Theme**: Transitioning from broad product requirements into structured Test Scenarios and atomic, repeatable Test Cases.

---

## 🎯 Learning Objectives

By the end of today, you will:
- [ ] Understand the difference between a **Test Scenario** (High-Level "What to test") and a **Test Case** (Detailed "How to test").
- [ ] Master the 10+ standard fields of a professional corporate Test Case template.
- [ ] Write unambiguous Pre-conditions, Step-by-Step Actions, Test Data, and Expected Results.
- [ ] Transform a Software Requirement Specification (SRS) / User Story into comprehensive positive and negative test cases.

---

## 📖 Core Concepts

### 1. Test Scenario vs. Test Case

- **Test Scenario**: A high-level description of what needs to be verified.
  - *Format*: `"Verify [feature/functionality] [under condition]"`
  - *Example*: `TS_LOGIN_01`: Verify user login functionality.
- **Test Case**: A detailed set of pre-conditions, inputs, execution steps, and expected results to test one specific aspect of the scenario.
  - *Example 1*: `TC_LOGIN_001`: Verify login with valid registered email and correct password (Positive).
  - *Example 2*: `TC_LOGIN_002`: Verify login with unregistered email and valid password (Negative).
  - *Example 3*: `TC_LOGIN_003`: Verify password field masks input characters as asterisks/dots (Security/UI).
  - *Example 4*: `TC_LOGIN_004`: Verify account lockout after 5 consecutive failed attempts (Security).

---

### 2. Anatomy of a High-Quality Test Case

Review the template at [curriculum/templates/test-case-template.md](../../templates/test-case-template.md):
- **Test Case ID**: Standard prefix + number (e.g. `TC_CART_001`).
- **Pre-Conditions**: Exact state needed before executing step 1.
- **Test Steps**: Explicit sequential steps (e.g. `1. Open URL... 2. Click... 3. Enter...`).
- **Test Data**: Literal data strings used (e.g. `user@example.com`, `P@ssword123`).
- **Expected Result**: Clear assertion without ambiguity (e.g. `System displays green success toast: 'Item added to cart' and badge increments by 1`).

---

## 🛠️ Hands-On Task for Today

1. Use the [Test Case Template](../../templates/test-case-template.md).
2. Requirement to test: **ATM Cash Withdrawal Feature**.
   - Rule: User enters 4-digit PIN, enters amount in multiples of ₹100/₹500, daily limit is ₹20,000.
3. Write **8 detailed test cases** covering:
   - 2 Positive test cases (valid PIN, normal withdrawal).
   - 6 Negative / Edge test cases (incorrect PIN 3 times, amount not multiple of 100, exceeding daily limit, insufficient balance, ATM cash shortage, power/network drop).
4. Save the completed sheet to `C:\QA_Training\02_Test_Cases\Day05_ATM_Test_Cases.xlsx`.

---

## ❓ Interview Questions

1. What is the difference between a Test Scenario and a Test Case?
2. What are the essential parameters of a standard Test Case?
3. How do you decide when to stop writing test cases for a feature?

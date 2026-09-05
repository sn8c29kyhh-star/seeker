# 📅 Day 26: End-to-End Live Web Testing Project

> **Theme**: Executing a comprehensive manual testing project on a live web portal, authoring a complete 50+ test case suite, and building a professional portfolio asset.

---

## 🎯 Learning Objectives

By the end of today, you will:
- [ ] Choose an active target e-commerce / SaaS demo portal (e.g. SauceDemo, Automation Exercise, or OrangeHRM).
- [ ] Analyze functional requirements from a real user perspective.
- [ ] Build a comprehensive **50+ Test Case Suite in Google Sheets / Excel** covering positive, negative, boundary, security, and UI flows.
- [ ] Format the sheet professionally with standard corporate columns.

---

## 🛠️ Hands-On Deliverable for Today

### Target Portal: [Automation Exercise](https://automationexercise.com/) or [SauceDemo](https://www.saucedemo.com/)
Build your **Capstone Test Suite** in Google Sheets using the [Test Case Template](../../templates/test-case-template.md).

### Module Breakdown (Target: 50 Test Cases):
1. **User Authentication & Signup (10 Test Cases)**:
   - Valid signup, duplicate email, missing required fields, weak passwords, SQL injection characters in inputs.
2. **Product Browsing & Search (10 Test Cases)**:
   - Search by brand, search with typos, empty search, price filter slider, category navigation.
3. **Cart & Quantity Management (10 Test Cases)**:
   - Add single item, add multiple items, update quantity to 0, exceed inventory limit, persistence after page reload.
4. **Checkout & Address Validation (10 Test Cases)**:
   - Incomplete address, invalid pincode format, phone number length checks, order summary calculations.
5. **Payment & Confirmation (10 Test Cases)**:
   - Card expiry in past, invalid CVV, UPI cancellation, successful order placement, invoice receipt download.

Save to:  
`C:\QA_Training\02_Test_Cases\Capstone_E2E_Test_Suite_50_Cases.xlsx`

---

## ❓ Review & Check

- Are all test cases categorized with severity and priority?
- Are test steps clear enough for an external auditor to replicate without guidance?
- Are all expected results specific and measurable?

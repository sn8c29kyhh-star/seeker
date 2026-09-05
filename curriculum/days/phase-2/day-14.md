# 📅 Day 14: Practical Sprint Simulation: OrangeHRM & Sauce Demo

> **Theme**: Executing an end-to-end sprint simulation on real open-source demo web applications and logging 5 distinct functional defects in Jira.

---

## 🎯 Learning Objectives

By the end of today, you will:
- [ ] Execute hands-on manual exploratory testing on standard industry demo portals:
  - **[SauceDemo](https://www.saucedemo.com/)** (E-Commerce Web Application)
  - **[OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/)** (Enterprise HRMS Portal)
- [ ] Identify 5 genuine or simulated defects covering UI, business logic, and error validation.
- [ ] Log all 5 defects into your Jira Cloud workspace with complete steps, screenshots, and logs.
- [ ] Review Phase 2 milestones.

---

## 🛠️ Hands-On Task for Today

### Step 1: Open Target Test Application
- Go to **[https://www.saucedemo.com/](https://www.saucedemo.com/)**.
- Test with provided user accounts:
  - `standard_user`
  - `locked_out_user`
  - `problem_user`
  - `performance_glitch_user`
  - `error_user`

### Step 2: Test Execution & Defect Discovery
Explore the following flows:
1. Login with invalid credentials and locked-out user accounts.
2. Product catalog sorting (Price low-to-high, Name Z-to-A).
3. Add multiple items to cart -> Remove item -> Verify badge counter.
4. Checkout flow: First name, Last name, Zip code validations.
5. Inspect Developer Tools Console (`F12`) while using `problem_user` and `error_user` to observe client errors.

### Step 3: Log 5 Defects in Jira
Create 5 tickets in your Jira project:
1. `[Login] Locked-out user error message layout misalignment.`
2. `[Cart] Cart badge counter does not decrement when removing item from product detail page.`
3. `[Checkout] Zip code field accepts invalid alphabets without validation alert.`
4. `[Catalog] Product images fail to load for problem_user account (returns broken image 404).`
5. `[Checkout] Clicking 'Finish' on error_user checkout displays red unhandled exception banner.`

### Step 4: Evidence Export
Export your Jira defects list as PDF or Excel.  
Save to `C:\QA_Training\03_Defect_Screenshots\Day14_SauceDemo_Jira_Bugs.pdf`.

---

## 🏆 Phase 2 Milestone Verification

You have completed Phase 2! Before moving to Phase 3 (SQL Data Validation), verify:
- [x] You can recite the Defect Life Cycle without hesitation.
- [x] You can explain Severity vs Priority with 4 distinct quadrant examples.
- [x] You have an active Jira Cloud board with Epics, Stories, and 5+ logged bugs.
- [x] You know how to answer sprint standup and ceremony questions.

# 📅 Day 27: Cross-Browser, Mobile Responsiveness & Portfolio Defect Logging

> **Theme**: Testing web portals across Chrome, Edge, and mobile device emulators, identifying layout/functional bugs, and pushing them to your Jira portfolio.

---

## 🎯 Learning Objectives

By the end of today, you will:
- [ ] Perform Cross-Browser Testing comparing behavior across **Google Chrome** and **Microsoft Edge**.
- [ ] Use Chrome DevTools Device Mode (`Ctrl + Shift + M`) to simulate iPhone 14, Samsung Galaxy S20, and iPad viewports.
- [ ] Test viewport rendering: hamburger menus, sticky footers, touch targets, and overlapping text.
- [ ] Push 5 new defects into your Jira Cloud portfolio board with full evidence.

---

## 🛠️ Hands-On Task for Today

1. Open your target application from Day 26 in **Google Chrome**.
2. Press `F12` -> Click the **Toggle Device Toolbar** icon (`Ctrl + Shift + M`).
3. Select **iPhone 14 Pro** and test the following:
   - Does the top navigation collapse into a responsive hamburger menu?
   - Are buttons large enough for thumb taps?
   - Does scrolling horizontally trigger unwanted horizontal scrollbars?
4. Repeat the test on **Microsoft Edge**.
5. Identify 5 defects (layout overlaps, missing mobile headers, broken buttons).
6. Log all 5 bugs in Jira with:
   - Device Name & Viewport dimensions (e.g. `390x844`).
   - Annotated mobile screenshots showing the visual defect.
7. Save evidence to:  
   `C:\QA_Training\03_Defect_Screenshots\Day27_Mobile_CrossBrowser_Bugs\`.

---

## ❓ Interview Questions

1. How do you test mobile responsiveness without having physical mobile test devices?
2. What are the common issues discovered during Cross-Browser testing?
3. How does screen resolution impact UI testing?

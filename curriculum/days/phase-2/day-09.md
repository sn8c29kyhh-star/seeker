# 📅 Day 9: Defect Classification: Severity vs. Priority

> **Theme**: Mastering the most famous QA interview scenario: defining and contrasting Severity and Priority with practical real-world scenarios.

---

## 🎯 Learning Objectives

By the end of today, you will:
- [ ] Define **Severity** (Technical impact of defect on system functionality).
- [ ] Define **Priority** (Business urgency of fixing defect).
- [ ] Understand who sets Severity (QA) vs Priority (Product Owner / Project Manager / QA Lead).
- [ ] Master the 4 quadrant scenarios:
  1. High Severity & High Priority
  2. High Severity & Low Priority
  3. Low Severity & High Priority
  4. Low Severity & Low Priority

---

## 📖 Core Concepts: The 4 Quadrants Matrix

| Severity \ Priority | High Priority (P1) | Low Priority (P3/P4) |
| :--- | :--- | :--- |
| **High Severity (Critical/Blocker)** | **High Severity + High Priority**: <br>• Server crashes when user clicks 'Place Order'.<br>• Entire login system throws HTTP 500 error.<br>• Data corruption during checkout. | **High Severity + Low Priority**: <br>• Application crashes on legacy Windows 98 or Internet Explorer 8.<br>• Deep, rarely used historical tax calculation module crashes.<br>• Minor OS build with <0.01% user base. |
| **Low Severity (Minor/Cosmetic)** | **Low Severity + High Priority**: <br>• Company logo is missing or misspells company brand name on login page.<br>• CEO's name is spelled incorrectly in the header.<br>• Copyright text reads "2019" on homepage. | **Low Severity + Low Priority**: <br>• Text font size in footer is 11px instead of 12px.<br>• Minor spelling mistake in Privacy Policy page ("the" spelled as "teh").<br>• Slight misalignment of a button by 2 pixels. |

---

## 🛠️ Hands-On Exercise for Today

1. Open Google Sheets.
2. Read the following 6 scenarios and assign **Severity** (Critical, Major, Minor) and **Priority** (P1, P2, P3) with justification:
   - Scenario 1: A user clicks 'Forget Password' and receives no email link.
   - Scenario 2: On the homepage, the brand name "Nike" is spelled "Niek".
   - Scenario 3: Clicking 'Export to Excel' on a report containing > 50,000 records causes memory overflow on the client.
   - Scenario 4: The 'Terms & Conditions' link in the footer opens a blank page.
   - Scenario 5: When paying with credit card, the transaction succeeds but no confirmation email or order ID is generated.
   - Scenario 6: The tooltip text on the logout icon has an extra space.
3. Save to `C:\QA_Training\03_Defect_Screenshots\Day09_Severity_Priority_Matrix.xlsx`.

---

## ❓ Interview Questions

1. Give a real-world example of a High Severity, Low Priority bug.
2. Give a real-world example of a Low Severity, High Priority bug.
3. If there is a dispute between developer and tester regarding bug severity, how is it resolved?

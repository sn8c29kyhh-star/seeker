# 📅 Day 7: Decision Tables, State Transition & Requirement Traceability (RTM)

> **Theme**: Complex business logic testing techniques and closing Phase 1 with a full Requirement Traceability Matrix (RTM).

---

## 🎯 Learning Objectives

By the end of today, you will:
- [ ] Construct a **Decision Table (Cause-Effect Matrix)** to test combinations of complex business conditions.
- [ ] Understand **State Transition Testing** (testing software state changes, e.g., ATM card pin attempts).
- [ ] Build a corporate **Requirement Traceability Matrix (RTM)** to guarantee 100% test coverage.
- [ ] Review Phase 1 milestones and complete Week 1 self-assessment.

---

## 📖 Core Concepts

### 1. Decision Table Testing
When system behavior depends on combinations of multiple input conditions, a decision table systematically captures all permutations ($2^n$).

**Example**: Credit Card Application Approval
- Conditions:
  - C1: Monthly Income >= ₹50,000? (Y/N)
  - C2: Credit Score >= 750? (Y/N)
  - C3: Existing Loan Default? (Y/N)
- Actions:
  - A1: Approve Card
  - A2: Request Manual Underwriter Review
  - A3: Reject Application

| Rule | C1: Income >= 50k | C2: Score >= 750 | C3: Loan Default | Action |
| :--- | :--- | :--- | :--- | :--- |
| **R1** | Y | Y | N | A1 (Approve) |
| **R2** | Y | Y | Y | A3 (Reject) |
| **R3** | Y | N | N | A2 (Manual Review) |
| **R4** | N | Y | N | A2 (Manual Review) |
| **R5** | N | N | Any | A3 (Reject) |

---

### 2. Requirement Traceability Matrix (RTM)
Review the template at [curriculum/templates/rtm-template.md](../../templates/rtm-template.md).
- Maps every business requirement to its corresponding test scenarios and test cases.
- Proves to clients and audit teams that no requirement was skipped during testing.
- Tracks execution status and linked defect tickets.

---

## 🛠️ Hands-On Task for Today

1. Pick an e-commerce feature: **"Apply Promo Code at Checkout"**.
   - Rules: Minimum cart total ₹1000, New User Only, Expires on 31-Dec.
2. Build a **Decision Table** in Google Sheets covering all 8 combinations ($2^3$).
3. Build a complete **RTM (Requirement Traceability Matrix)** linking 5 business requirements to 12 test cases using the [RTM Template](../../templates/rtm-template.md).
4. Save to `C:\QA_Training\01_Requirements\Day07_RTM_and_DecisionTable.xlsx`.

---

## 🏆 Phase 1 Milestone Verification

You have completed Phase 1! Before moving to Phase 2 (Jira & Defect Management), verify you can:
- [x] Explain QA vs QC and Verification vs Validation effortlessly.
- [x] Differentiate SDLC vs STLC phases and deliverables.
- [x] Apply ECP and BVA to any given input field.
- [x] Structure professional test cases and an RTM in Google Sheets.

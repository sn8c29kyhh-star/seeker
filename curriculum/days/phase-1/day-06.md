# 📅 Day 6: Black-Box Test Design: Equivalence Partitioning & Boundary Value Analysis

> **Theme**: Mastering the two most important mathematical test design techniques to maximize test coverage with the minimum number of test cases.

---

## 🎯 Learning Objectives

By the end of today, you will:
- [ ] Understand why exhaustive testing is impossible and how test design techniques solve it.
- [ ] Master **Equivalence Class Partitioning (ECP)**: dividing inputs into valid and invalid equivalence classes.
- [ ] Master **Boundary Value Analysis (BVA)**: identifying bugs at the boundaries (Min, Min+1, Nom, Max-1, Max).
- [ ] Solve real-world boundary calculation problems asked in software company interviews.

---

## 📖 Core Concepts

### 1. Equivalence Class Partitioning (ECP)
ECP divides input data into partitions of equivalent data from which test cases can be derived. The assumption is that if one value in a partition passes/fails, all values in that partition will behave similarly.

**Example**: An employee age validation field accepts ages from **18 to 60** years:
- **Valid Partition**: `18 <= Age <= 60` (Test with: `35`) -> Expected: Accepted
- **Invalid Partition 1 (Too young)**: `Age < 18` (Test with: `15`) -> Expected: Error
- **Invalid Partition 2 (Too old)**: `Age > 60` (Test with: `65`) -> Expected: Error
- **Invalid Partition 3 (Non-numeric)**: Special characters / text (Test with: `abc`, `-5`) -> Expected: Error

---

### 2. Boundary Value Analysis (BVA)
Studies show that the vast majority of software defects occur at the **boundaries** of input ranges (e.g., developers typing `<` instead of `<=`).

**Rules for 2-Value BVA**:
For a range `[A to B]`:
- Test values: `A-1` (Invalid), `A` (Valid), `B` (Valid), `B+1` (Invalid).

**Rules for 3-Value (Robust) BVA**:
- Test values: `A-1`, `A`, `A+1`, `Nominal (middle)`, `B-1`, `B`, `B+1`.

**Example**: For the Age field `[18 to 60]`:
- Boundary test inputs: `17` (Invalid), `18` (Valid min), `19` (Valid min+1), `35` (Nominal), `59` (Valid max-1), `60` (Valid max), `61` (Invalid).

---

## 🛠️ Hands-On Exercise for Today

Solve these 2 real-world test design problems in Google Sheets:

### Problem 1: Password Length
- Requirement: A password field must accept between **8 and 16 characters**.
- Identify:
  1. Valid and Invalid Equivalence Classes.
  2. The exact Boundary Test Values to test.

### Problem 2: Order Quantity Discount
- Requirement:
  - 1 to 9 items: No discount
  - 10 to 49 items: 5% discount
  - 50 to 99 items: 10% discount
  - 100+ items: 15% discount (Max order limit is 500 items)
- Calculate all boundaries and write test cases for each boundary value.

Save sheet to `C:\QA_Training\02_Test_Cases\Day06_ECP_BVA_Exercises.xlsx`.

---

## ❓ Interview Questions

1. Why is Boundary Value Analysis considered more effective than random input testing?
2. If a text field accepts 1 to 255 characters, what are the exact boundary values you will test?
3. How does 2-value BVA differ from 3-value BVA?

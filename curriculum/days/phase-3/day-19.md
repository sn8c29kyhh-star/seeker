# 📅 Day 19: Data Mutation & Rollbacks: INSERT, UPDATE, DELETE

> **Theme**: Creating, modifying, and cleaning up test data in staging databases safely without corrupting shared environments.

---

## 🎯 Learning Objectives

By the end of today, you will:
- [ ] Understand SQL Data Manipulation Language (DML): `INSERT`, `UPDATE`, and `DELETE`.
- [ ] Understand the extreme danger of running `UPDATE` or `DELETE` without a `WHERE` clause!
- [ ] Learn how to set up pre-test data fixtures before test runs and clean up after execution.
- [ ] Understand Database Transactions (`BEGIN TRANSACTION`, `COMMIT`, `ROLLBACK`).

---

## 📖 Core Concepts

### 1. Data Mutation Syntax
```sql
-- Insert a new customer for testing
INSERT INTO customers (customer_id, first_name, last_name, email, city, is_active)
VALUES (101, 'Test', 'User', 'testqa@example.com', 'Hyderabad', 1);

-- Update status of specific test user (ALWAYS use WHERE!)
UPDATE customers
SET is_active = 0
WHERE customer_id = 101;

-- Clean up test customer after testing is complete
DELETE FROM customers
WHERE customer_id = 101;
```

### 2. Transactions & Rollbacks (Safety Net)
In staging/QA databases, transactions prevent accidental data corruption:
```sql
BEGIN TRANSACTION;

-- Perform test mutations
UPDATE products SET price = 999 WHERE product_id = 50;

-- Verify results...
-- If you want to undo the changes completely:
ROLLBACK;

-- If changes are intended and permanent:
-- COMMIT;
```

---

## 🛠️ Hands-On Task for Today

1. Write SQL scripts to:
   - Insert 2 mock users with email `@testqa.com`.
   - Update their cities from 'Hyderabad' to 'Bengaluru'.
   - Delete all test accounts created with email ending in `@testqa.com`.
2. Practice running a transaction with `ROLLBACK` in SQLiteOnline to confirm data returns to its original state.
3. Save to `C:\QA_Training\04_SQL_Scripts\Day19_Data_Mutation.sql`.

---

## ❓ Interview Questions

1. What happens if you execute `DELETE FROM customers;` without a `WHERE` clause?
2. What is the difference between `DELETE`, `TRUNCATE`, and `DROP`?
3. How do transactions (`COMMIT` and `ROLLBACK`) help testers manage test data?

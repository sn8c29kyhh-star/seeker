# 📅 Day 16: Basic Data Retrieval: SELECT, WHERE, Operators & Filtering

> **Theme**: Writing precise SQL read queries to locate specific test data and inspect database records.

---

## 🎯 Learning Objectives

By the end of today, you will:
- [ ] Master basic retrieval syntax: `SELECT`, `FROM`, `DISTINCT`.
- [ ] Filter records using the `WHERE` clause.
- [ ] Combine conditions using logical operators: `AND`, `OR`, `NOT`.
- [ ] Use comparison and pattern matching operators: `=`, `!=`, `<`, `>`, `BETWEEN`, `IN`, `LIKE` (`%` wildcard).

---

## 📖 Core Syntax Cheatsheet

```sql
-- Select specific columns
SELECT first_name, email FROM customers;

-- Remove duplicates
SELECT DISTINCT city FROM customers;

-- Filter by exact match
SELECT * FROM customers WHERE city = 'Hyderabad';

-- Filter by multiple conditions
SELECT * FROM customers WHERE city = 'Hyderabad' AND is_active = 1;

-- Check a list of values
SELECT * FROM customers WHERE city IN ('Hyderabad', 'Bengaluru', 'Chennai');

-- Check numeric or date range
SELECT * FROM orders WHERE total_amount BETWEEN 500 AND 2000;

-- Pattern matching (starts with 'R', or email ending with '@example.com')
SELECT * FROM customers WHERE first_name LIKE 'R%';
SELECT * FROM customers WHERE email LIKE '%@example.com';
```

---

## 🛠️ Hands-On Task for Today

Using [SQLiteOnline](https://sqliteonline.com/) with a sample dataset (or your `customers` table from Day 15):
1. Write a query to find all active customers located in 'Hyderabad'.
2. Write a query to find customers whose last name starts with 'S'.
3. Write a query to find all orders placed between '2026-01-01' and '2026-06-30' with total amount > 1000.
4. Save your SQL queries to `C:\QA_Training\04_SQL_Scripts\Day16_Select_Queries.sql`.

---

## ❓ Interview Questions

1. What is the difference between `WHERE` and `HAVING` in SQL? (Preview for tomorrow)
2. How does `LIKE 'A%'` differ from `LIKE '%A'`?
3. What is the difference between `IN` and `BETWEEN`?

# 📅 Day 17: Aggregations & Grouping for QA Data Integrity

> **Theme**: Calculating metrics, row counts, and data consistency using aggregate functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) and grouping.

---

## 🎯 Learning Objectives

By the end of today, you will:
- [ ] Count records and verify UI badge numbers using `COUNT()`.
- [ ] Calculate totals and averages using `SUM()` and `AVG()`.
- [ ] Group rows using `GROUP BY` to check count per category/status.
- [ ] Filter grouped rows using `HAVING` (and explain why `WHERE` cannot be used here).
- [ ] Sort test results using `ORDER BY ASC/DESC`.

---

## 📖 Core Concepts

### Aggregate Functions Cheatsheet
```sql
-- Count total users
SELECT COUNT(*) FROM users;

-- Count distinct cities
SELECT COUNT(DISTINCT city) FROM customers;

-- Calculate total order revenue
SELECT SUM(order_total) FROM orders WHERE order_status = 'Completed';

-- Count how many orders exist in each status
SELECT order_status, COUNT(*) AS total_orders
FROM orders
GROUP BY order_status
ORDER BY total_orders DESC;

-- Filter groups using HAVING (e.g. cities with more than 5 customers)
SELECT city, COUNT(*) AS customer_count
FROM customers
GROUP BY city
HAVING COUNT(*) > 5;
```

---

## 🛠️ Hands-On Task for Today

1. In SQLiteOnline, query a sample `orders` table.
2. Write queries to solve these QA validation scenarios:
   - Scenario 1: The UI dashboard says "Total Revenue: ₹4,50,000". Write the SQL query to verify if the sum of all 'Completed' orders matches this figure.
   - Scenario 2: Find all customers who have placed more than 3 orders.
   - Scenario 3: Find the minimum and maximum order amount placed in the last 30 days.
3. Save to `C:\QA_Training\04_SQL_Scripts\Day17_Aggregations.sql`.

---

## ❓ Interview Questions

1. Explain the difference between `WHERE` and `HAVING` with a practical SQL query.
2. What is the difference between `COUNT(*)` and `COUNT(column_name)`?
3. How do you sort results from highest to lowest in SQL?

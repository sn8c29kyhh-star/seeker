# 📅 Day 24: Postman Collections & Visual Validation

> **Theme**: Grouping endpoints into structured Collections and executing multi-request test suites without writing scripts.

---

## 🎯 Learning Objectives

By the end of today, you will:
- [ ] Understand **Postman Collections** (organizing API requests by module, e.g., Auth, Users, Products, Checkout).
- [ ] Use Postman Folders for logical separation (Positive Scenarios vs Negative Scenarios).
- [ ] Use the built-in **Collection Runner** to run all requests in sequence with a single click.
- [ ] Perform visual validations on response headers, response sizes, status codes, and body schemas.

---

## 📖 Core Concepts

### Collection Hierarchy in Postman
```text
📦 ReqRes API Test Suite (Collection)
├── 📁 01_Authentication
│   ├── ⚡ POST Register - Successful (Expect 200)
│   ├── ⚡ POST Register - Missing Password (Expect 400)
│   └── ⚡ POST Login - Unregistered User (Expect 400)
├── 📁 02_User_Management
│   ├── ⚡ GET List Users (Expect 200)
│   ├── ⚡ GET Single User (Expect 200)
│   ├── ⚡ GET User Not Found (Expect 404)
│   └── ⚡ POST Create User (Expect 201)
```

---

## 🛠️ Hands-On Task for Today

1. In Postman, click **New** -> **Collection**.
2. Name: `ReqRes Full Regression Suite`.
3. Create 2 subfolders: `01_Users` and `02_Auth`.
4. Add 6 requests inside:
   - 3 Positive requests (expecting 200 or 201).
   - 3 Negative requests (expecting 400 or 404).
5. Click on the collection name -> click **Run Collection**.
6. Observe the Collection Runner execution summary:
   - Total requests executed: 6.
   - Status codes received for each.
7. Export the collection as a JSON file:
   - Click `...` next to the collection -> **Export** -> Collection v2.1.
   - Save to: `C:\QA_Training\05_Postman_Collections\ReqRes_Regression_Collection.json`.

---

## ❓ Interview Questions

1. What is a Collection in Postman and why is it useful in a QA team?
2. How does the Postman Collection Runner work?
3. How do you share your API test collections with other QA team members?

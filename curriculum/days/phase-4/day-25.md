# 📅 Day 25: Postman Environments & API Bug Reporting

> **Theme**: Using Environment Variables to switch between QA, Staging, and Production environments seamlessly, and reporting API defects effectively.

---

## 🎯 Learning Objectives

By the end of today, you will:
- [ ] Understand **Postman Environments** (Local, QA, Staging, Production).
- [ ] Define and use Environment Variables like `{{base_url}}` and `{{auth_token}}` to avoid hardcoding URLs.
- [ ] Identify common API bugs: wrong status codes, missing payload fields, data type mismatches, slow latency.
- [ ] Draft an API Defect Report with request/response payloads attached.
- [ ] Review Phase 4 milestones.

---

## 📖 Core Concepts

### Environment Variables
Instead of hardcoding:
`https://qa-api.example.com/api/users`  
Use variables in Postman:
`{{base_url}}/api/users`

When switching the environment dropdown from **QA** to **Staging**, Postman automatically swaps the variable:
- In `QA Environment`: `base_url` = `https://qa-api.example.com`
- In `Staging Environment`: `base_url` = `https://staging-api.example.com`

---

## 🛠️ Hands-On Task for Today

1. In Postman, click **Environments** on the left menu -> **+ Create Environment**.
2. Name: `ReqRes Sandbox`.
3. Add variable:
   - Variable: `base_url`
   - Initial value: `https://reqres.in`
   - Current value: `https://reqres.in`
4. Update your requests from Day 24 to use `{{base_url}}/api/users`.
5. Run the requests and confirm they execute successfully.
6. Draft a sample **API Bug Report** for an API issue:
   - *Issue*: `POST /api/login with invalid password returns HTTP 500 Internal Server Error instead of HTTP 400 Bad Request.`
   - Include: Endpoint URL, Request Headers, Request JSON body, Actual Response (`500`), Expected Response (`400`).
   - Save to: `C:\QA_Training\05_Postman_Collections\Day25_API_Defect_Report.docx`.

---

## 🏆 Phase 4 Milestone Verification

You have completed Phase 4! Before moving to Phase 5 (Live Project & Job Prep), verify:
- [x] You know the 5 HTTP status code families by heart.
- [x] You know the difference between 401 and 403.
- [x] You have created, executed, and exported a Postman Collection.
- [x] You know how to configure `{{base_url}}` in Postman environments.

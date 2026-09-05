# 📅 Day 23: Postman Setup & Basic Requests

> **Theme**: Installing Postman, navigating the workspace, and sending your first no-code GET, POST, and DELETE requests.

---

## 🎯 Learning Objectives

By the end of today, you will:
- [ ] Download, install, and configure **Postman Desktop** on Windows (or use Postman Web).
- [ ] Create a personal testing workspace inside Postman.
- [ ] Send `GET` requests to public mock APIs and inspect Response Body, Headers, Status Code, and Response Time.
- [ ] Send `POST` requests with JSON raw bodies and verify `201 Created` responses.

---

## 📖 Setup & Core Usage

1. **Install Postman**:
   - Download from [https://www.postman.com/downloads/](https://www.postman.com/downloads/).
   - Sign up for a free account.
2. **Public Mock APIs for Practice**:
   - **ReqRes**: `https://reqres.in/` (Mock REST API for testing)
   - **JSONPlaceholder**: `https://jsonplaceholder.typicode.com/`

---

## 🛠️ Hands-On Task for Today

Before sending requests, create your own ReqRes API key using the [ReqRes setup guide](https://reqres.in/docs). In Postman, add a header named `x-api-key` with your key as its value to **every** request below. Do not include the key in screenshots, public issues, or exported portfolio files. If you receive 401 or 403, check your key and the current service instructions before reporting a bug.

Open Postman and execute these 4 requests:

### Request 1: Get User List (GET)
- Method: `GET`
- URL: `https://reqres.in/api/users?page=2`
- Click **Send**.
- Check: Status code (`200 OK`), Response Time (record the observed value; your network affects it), and inspect the list of user objects.

### Request 2: Get Single User Not Found (GET - Negative)
- Method: `GET`
- URL: `https://reqres.in/api/users/23`
- Click **Send**.
- Check: Status code (`404 Not Found`) and empty body `{}`.

### Request 3: Create User (POST)
- Method: `POST`
- URL: `https://reqres.in/api/users`
- Headers: `Content-Type: application/json`
- Body -> raw -> JSON:
  ```json
  {
    "name": "Ramesh Kumar",
    "job": "Manual QA Engineer"
  }
  ```
- Click **Send**.
- Check: Status code (`201 Created`), response returns `id` and `createdAt` timestamp.

### Request 4: Delete User (DELETE)
- Method: `DELETE`
- URL: `https://reqres.in/api/users/2`
- Click **Send**.
- Check: Status code (`204 No Content`).

Take screenshots of each response and save to:  
`C:\QA_Training\05_Postman_Collections\Day23_Basic_Requests\`.

---

## ❓ Interview Questions

1. Walk me through how you test an API in Postman without writing any code.
2. Where do you pass authentication headers in a Postman request?
3. What is the difference between Query Parameters (in URL) and Request Body (in JSON)?

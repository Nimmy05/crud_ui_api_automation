# ✅ MERN Todo App with Automated UI & API Testing

This project is a full-stack Todo application built with the **MERN** stack: **MongoDB**, **Express.js**, **React.js**, and **Node.js**. It supports secure login and full CRUD functionality for managing todo items.

To demonstrate QA automation skills, this app includes **Playwright-based UI tests** and **API tests** for verifying both frontend and backend functionality.

---

## 🚀 Features

- 🔐 User registration and login with JWT-based authentication.
- ✅ CRUD functionality for todo items.
- 🔒 Protected routes for authenticated users only.
- 🔁 Optional WebSocket integration for real-time updates.
- 🧪 UI automation with Playwright.
- 🧪 API testing with Postman or Supertest.

---

## 🛠️ Tech Stack

| Layer         | Technology               |
|---------------|--------------------------|
| Frontend      | React.js                 |
| Backend       | Node.js + Express.js     |
| Database      | MongoDB (Mongoose)       |
| Auth          | JWT                      |
| UI Testing    | Playwright               |
| API Testing   | Postman / Newman / Supertest |
| Dev Tools     | Git, GitHub, VS Code     |

---

## 📂 Project Structure

```bash
crud_ui_api_automation/
└── MERN_Todo_App/
    ├── client/               # React frontend
    │   ├── public/
    │   ├── src/
    │   ├── tests/            # Playwright tests
    │   ├── playwright.config.ts
    │   └── ...
    ├── server/               # Node.js + Express backend
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── ...
    └── README.md


## 🧭 Getting Started

1. Clone the repository

```bash
git clone https://github.com/Nimmy05/crud_ui_api_automation.git
cd crud_ui_api_automation/MERN_Todo_App
   
2. Install dependencies:
Frontend (client):

 ```bash
   cd client
   npm install

Backend (server):

 ```bash
   cd ../server
   npm install

3. Set up environment variables:

 - Create a .env file inside the server/ directory:
 - Add the following variables to the .env file:

   ```bash
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET_KEY=<your-jwt-secret>
 
4.Start the Aplication
Start MongoDB locally or connect to MongoDB 
Backend:

   ```bash
   cd server
   npm run dev

In another terminal, run frontend:

 ```bash
   cd client
   npm start

The app will be accessible at:
🌐 Frontend - React App: http://localhost:3000
🔗 Backend API: http://localhost:3001

🧪 UI Tests – Playwright
✅ Scenarios Automated
Login (valid & invalid credentials)

Create a todo

Edit a todo

Delete a todo

UI validation for state changes and error handling

Assertion for the element

📦 Setup & Run
1. Navigate to client folder:

```bash
cd client

2. Install Playwright:

```bash
npm init playwright@latest


3. Run all tests:

```bash
npx playwright test

4. Open Playwright Test UI:

```bash
npx playwright test --ui

5.View HTML test report:

```bash
npx playwright show-report
✅ Ensure both frontend (localhost:3000) and backend (localhost:3001) servers are running before executing UI tests.

API Tests (Postman or Newman)
Run collection from Postman or CLI:

```bash
newman run postman_collection.json

📄 Test Strategy
A brief test plan is included under /tests or /docs:

Coverage areas

Tools used

How to run

Assumptions and limitations

🙋 Help & Support
If you have questions or need setup assistance:

Nimmy Abraham Chandredath
QA Automation Engineer
📧 nimmysmail@gmail.com
📞 +371 23206334

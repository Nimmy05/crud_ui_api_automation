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
- 🧪 API testing with REST API(Supertest), Postman.

---

## 🛠️ Tech Stack

| Layer         | Technology               |
|---------------|--------------------------|
| Frontend      | React.js                 |
| Backend       | Node.js + Express.js     |
| Database      | MongoDB (Mongoose)       |
| Auth          | JWT                      |
| UI Testing    | Playwright               |
| API Testing   | Postman / REST API / javaScript/ Supertest |
| Dev Tools     | Git, CI/CD GitHub, VS Code     |

---

## 📂 Project Structure
MERN_Todo_App/
.github/
    └── workflows/                     # CI/CD GitHub Actions
        └── ci.yaml
├── client/                            # React frontend
│   ├── public/                        # Static assets
│   ├── src/                           # Frontend source code
│   │   ├── components/                # Reusable React components
│   │   ├── pages/                     # Page-level components (e.g., TodoPage, LoginPage)
│   │   ├── services/                  # API calls using axios or fetch
│   │   ├── App.tsx                    # Root component
│   │   └── main.tsx                   # Entry point
│   ├── package.json                   # Frontend dependencies and scripts
│   └── tsconfig.json                  # TypeScript config for frontend

├── server/                            # Node.js + Express backend
│   ├── controllers/                   # Logic for handling routes (e.g., todos, auth)
│   ├── models/                        # Mongoose models (e.g., User, Todo)
│   ├── routes/                        # Route definitions
│   ├── middleware/                    # Auth, error handlers, etc.
│   ├── config/                        # DB connection, environment setup
│   ├── index.ts                       # Main entry point
│   ├── .env                           # Server environment variables
│   ├── package.json                   # Backend dependencies and scripts
│   └── tsconfig.json                  # TypeScript config for backend

├── tests/                             # Playwright test automation
│   ├── create.config.ts               # Create todo test config
│   ├── update.config.ts               # Update todo test config
│   ├── delete.config.ts               # Delete todo test config
│   ├── utils/                         # Shared utility functions
│   │   ├── baseUtils.ts               # Common actions (click, fill, verify)
│   │   └── locatorUtils.ts            # Locator helpers (e.g., byButtonText)
│   ├── globalConfig/
│   │   └── constants.ts               # App-wide constants
│   └── testData/                      # Static test data

├── playwright.config.ts               # Playwright config
├── tsconfig.json                      # Global TypeScript config
├── .env                               # Root environment variables
├── tsconfig-paths-bootstrap.js        # tsconfig-path alias support for tests
├── README.md                          # Project documentation
├── package.json                       # Root package manager (optional)
└── .github/
    └── workflows/                     # CI/CD GitHub Actions
        └── playwright.yml             # Example CI pipeline for automation

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
    MONGODB_URI=mongodb://localhost:27017/mern_todo_db
    PORT=3001
    JWT_SECRET_KEY=newUITe&t!23

    BASE_URL=http://localhost:3001/api
    USER_EMAIL=test67@gmail.com
    USER_PASSWORD=abc123

4.Start the Aplication
Connect to MongoDB 
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

4. Run single in headed mode:

```bash
npx playwright test tests/testname.spec.ts --headed
✅ Before running UI tests, ensure that both the frontend (http://localhost:3000) and backend (http://localhost:3001) servers are up and running.

🖥️ Open a new terminal window and run the above command to execute the Playwright test.

5.View HTML test report:

```bash
npx playwright show-report
✅ Ensure both frontend (localhost:3000) and backend (localhost:3001) servers are running before executing UI tests.

6. API Tests (REST API)
✅ Scenarios Automated
POST /login
GET /items
POST /items
PUT /items/:id
DELETE /items/:id

```bash
cd server
npm test tests/testname.test.js

🙋 Help & Support
If you have questions or need setup assistance:

Nimmy Abraham Chandredath
QA Automation Engineer
📧 nimmysmail@gmail.com
📞 +371 23206334

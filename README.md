# 👨‍💼 MERN Admin Dashboard - Agent Management & Task Distribution

A full-stack MERN application for admin login, agent creation, list uploads, and dynamic task distribution via CSV/XLSX files.

---

## 🚀 Features

- 🔐 Admin login with JWT authentication
- 🧑‍💼 Add, search, and manage agents
- 📤 Upload CSV/XLSX files and preview before submitting
- 🗂️ Auto-distribute list entries to agents upon upload
- 📋 View tasks assigned to each agent
- ☁️ File upload with Multer (supports local or Cloudinary storage)
- 💡 Protected routes and context-based auth state

---

## 🛠️ Tech Stack

| Layer     | Tech                           |
|-----------|--------------------------------|
| Frontend  | React (Vite), Tailwind CSS     |
| Backend   | Node.js, Express.js            |
| Database  | MongoDB + Mongoose             |
| Auth      | JWT, Context API               |
| File Upload | Multer, xlsx                 |
| Optional  | Cloudinary (if needed)         |

---

## 📁 Folder Structure

project-root/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── utils/
│ └── index.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── index.html
│ └── .env
│
|
├── README.md
└── package.json


---

## 🧑‍💻 Getting Started

### ✅ Prerequisites

- Node.js & npm
- MongoDB (local or cloud)
- Optional: Cloudinary account (if using cloud storage)

---

## 📦 Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
npm install

Create a .env file:
PORT=5000
MONGO_URI=mongodb://localhost:27017/admin-dashboard
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloud_name       # optional
CLOUDINARY_API_KEY=your_key           # optional
CLOUDINARY_API_SECRET=your_secret     # optional

Run the backend server:
npm run dev


Navigate to the frontend folder:
npm install

Update API base URL in src/services/Axios.js:
const API = axios.create({
  baseURL: 'http://localhost:5000',
});

Run the frontend dev server:
npm run dev

Admin Credentials (Default)
Email: admin@gmail.com / admin01@gmail.com
Password: Admin@01

 File Upload Notes
Supports .csv, .xlsx, .xls

Uses multer.memoryStorage() for in-memory parsing

Uses xlsx to preview Excel data

Auto-distributes entries to agents based on logic (e.g., round-robin)

 API Overview
Endpoint	Method	Description
/user/login	POST	Admin login
/agents/create-agent	POST	Create a new agent
/agents/get-agents	GET	Fetch all agents
/lists/upload	POST	Upload CSV/XLSX and distribute
/tasks/get	GET	Get all tasks (optional)

 Developer Notes
⚠️ Cloudinary is optional — not necessary if you're only previewing and processing data, not storing files persistently.

Agents and tasks are stored in MongoDB with relations.

Notes, error handling, and loading indicators are handled for better UX.

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

ASSIGNMENT BY ZAID YARGATTI
Task Manager - Frontend README

# Task Manager - Frontend (React + Vite)

This is the frontend for the Task Manager app, built with React (Vite) and Axios.

# Setup Instructions

# 1. Clone the repository
git clone https://github.com/your_username/task-manager-frontend.git
cd task-manager-frontend/frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

Frontend will run at:  
http://localhost:5173 (default Vite port)

#Features
- Create a task  
- Edit task title/description  
- Toggle completed status  
- Delete a task  

#Notes
- Make sure the backend (Django) is running at `http://127.0.0.1:8000`
- If your backend runs on another port, update `frontend/src/api.js` → `baseURL`

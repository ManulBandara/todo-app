<img width="1390" height="555" alt="image" src="https://github.com/user-attachments/assets/646c8557-90f6-4899-8ecd-918fd9a8d5f1" /># 📝 To-Do Task Web Application  
**Full Stack Engineer / Intern – Take-Home Assessment**

This repository contains the implementation of the **To-Do Task Web Application** developed for the **Full Stack Engineer / Intern Take-Home Assignment**.  
It demonstrates a complete 3-tier application built with **HTML/CSS/JS**, **PHP**, **MySQL**, and **Docker Compose**, following clean architecture and best practices.

---

## 📋 Project Description

This application allows users to:
- ➕ Create new tasks by entering a title and description  
- 📋 View only the **5 most recent** uncompleted tasks  
- ✅ Mark tasks as completed (completed tasks are hidden)  

All data is persisted in a **MySQL database**, and all components are **containerized** using **Docker Compose**.

---

<img width="1888" height="918" alt="Screenshot 2025-10-03 125900" src="https://github.com/user-attachments/assets/0a5f719b-6d11-4d99-b13d-e81df81aacd5" />

<img width="1896" height="925" alt="Screenshot 2025-10-03 125958" src="https://github.com/user-attachments/assets/f5c24502-86a8-44c2-819e-49d19592ff62" />

## 🧱 System Architecture

[Frontend UI - Nginx + HTML/CSS/JS]
⇅ REST API
[Backend API - PHP + Apache]
⇅ PDO
[Database - MySQL 8.0]


---

## 🧰 Technology Stack

| Layer | Technology |
|-------|-------------|
| Frontend | HTML, CSS, Vanilla JavaScript (served via Nginx) |
| Backend | PHP 8 + Apache (REST API) |
| Database | MySQL 8.0 |
| Containerization | Docker & Docker Compose |

---

## 📦 Functional Requirements

| Requirement | Status |
|-------------|--------|
| Create new task (title + description) | ✅ Implemented |
| Show latest 5 uncompleted tasks | ✅ Implemented |
| Mark task as completed | ✅ Implemented |
| Store data in relational database | ✅ Implemented |
| REST API backend | ✅ Implemented |
| Frontend SPA | ✅ Implemented |
| Dockerized components | ✅ Implemented |
| Pretty UI (Dark mode, animation) | ✅ Implemented |

---

## ⚙️ Database Design

**Database:** `todo_app`  
**Table:** `task`

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT AUTO_INCREMENT | Primary key |
| `title` | VARCHAR(255) | Task title |
| `description` | TEXT | Task description |
| `is_done` | TINYINT(1) | Task status (0 = pending, 1 = done) |
| `created_at` | TIMESTAMP | Creation timestamp |
| `completed_at` | TIMESTAMP NULL | Completion timestamp |

> Automatically created via `db/init.sql`

<img width="1390" height="555" alt="Screenshot 2025-10-03 153710" src="https://github.com/user-attachments/assets/6e209482-56aa-4c84-8843-4e3a42ae2fca" />


---

## 🚀 Build & Run Instructions

These are the **exact steps** to **build and run** the project as requested in the assignment.

### 🧰 Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running  
- [Git](https://git-scm.com/) installed  

---

📋 Steps

1️⃣ Clone the repository
bash
git clone https://github.com/<your-username>/todo-app.git
cd todo-app

2️⃣ Build and start all services
docker compose up --build

3️⃣ Access the application
🌐 Frontend: http://localhost:3000
⚙️ Backend API: http://localhost:8080/index.php/tasks

4️⃣ Stop all containers
docker compose down



🌐 API Endpoints
Method	Endpoint	Description
GET	/index.php/tasks	Retrieve latest 5 uncompleted tasks
POST	/index.php/tasks	Create a new task
POST	/index.php/tasks/{id}/done	Mark task as completed

Example Request:
curl -X POST http://localhost:8080/index.php/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Docker", "description": "Finish take-home project"}'

📁 Project Structure

todo-app/
├── backend/
│   ├── index.php          # REST API
│   ├── config.php         # Database config
│   ├── TaskModel.php      # Database operations
│   ├── Dockerfile         # Backend container
├── frontend/
│   ├── index.html         # UI
│   ├── style.css          # Styles + dark mode
│   ├── app.js             # Logic & API calls
│   ├── Dockerfile         # Frontend container
├── db/
│   └── init.sql           # Database schema
├── docker-compose.yml     # Orchestration
└── README.md

## 🧪 Backend Testing

Unit and Integration tests are implemented using **PHPUnit**.

### ▶️ Run Tests
bash
cd backend
./vendor/bin/phpunit

PHPUnit Testing

<img width="1907" height="1018" alt="Screenshot 2025-10-03 151007" src="https://github.com/user-attachments/assets/8384ddb1-479b-43dd-bca1-f6477f8da5ba" />

<img width="1903" height="1012" alt="Screenshot 2025-10-03 151122" src="https://github.com/user-attachments/assets/eccc03a9-45df-4ca6-88d6-cc11dddc2d4f" />

Selenium Testing 

<img width="1918" height="917" alt="Screenshot 2025-10-03 152137" src="https://github.com/user-attachments/assets/3f6c2982-53a4-45a4-a4d8-f00a4ca52dba" />


🐳 Docker Compose Overview

services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: todo_app
    volumes:
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql

  backend:
    build: ./backend
    ports:
      - "8080:80"
    environment:
      - DB_HOST=db
      - DB_NAME=todo_app
      - DB_USER=root
      - DB_PASS=root
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

🎨 UI Highlights

🧊 Modern glassmorphism design

🌗 Dark / Light mode toggle

🎉 Confetti animation for completed tasks

✨ Smooth transitions and hover effects

📱 Responsive design for mobile and desktop


👨‍💻 Author

Manul Bandara
📧 manulbandara@gmail.com
💼 Full Stack Engineer / Intern Candidate


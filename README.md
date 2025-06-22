# 🛠️ Task Management Tool – Microservices Architecture

A scalable and modular Task Management Tool built using a microservices architecture. This application enables users to create, assign, track, and manage tasks with real-time updates, search functionality, and comment support.

## 📌 Features

- Task creation, assignment, status tracking, and progress monitoring
- Microservices: User Service, Task Service, Search Service, Comment Service
- Real-time updates and filtering
- Role-based access control (Admin, Manager, User)
- Responsive UI with clean design using Tailwind CSS

## 🏗️ Tech Stack

### Backend
- **Django REST Framework** – API development
- **PostgreSQL** – Relational database

### Frontend
- **React.js** – Single Page Application (SPA)
- **Tailwind CSS** – Styling and responsive design

## 🧩 Microservices Overview

| Service        | Description                                      |
|----------------|--------------------------------------------------|
| **User Service**   | Manages user registration, login, roles        |
| **Task Service**   | Handles task CRUD operations and assignment    |
| **Search Service** | Implements filtering and full-text task search |
| **Comment Service**| Enables users to comment and collaborate       |

## 🧱 Architecture

[ React Frontend ]
|
[ Gateway / API Layer ]
|
[ User Service ] [ Task Service ] [ Search Service ] [ Comment Service ]
|
[ PostgreSQL DBs ]


## ⚙️ Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/VijayHatte/Microservices.git
cd Microservices
```

2. **Backend Setup**
- Navigate to each service folder (user_service/, task_service/, etc.)
- Create a virtual environment and install dependencies:

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
2. **Frontend Setup**

```bash
cd frontend/
npm install
npm start
```
## 🔍 API Endpoints
- /api/users/ – Register, Login, Profile

- /api/tasks/ – Create, Assign, Update, Delete Tasks

- /api/search/?query= – Search tasks

- /api/comments/ – Add/view comments on tasks

## 📈 Future Improvements
- Notification service (email/SMS updates)

- Kanban Service

- Analytics dashboard

## 🤝 Contributors
Vijay Hatte – Full Stack Developer
(Feel free to contribute or open issues!)

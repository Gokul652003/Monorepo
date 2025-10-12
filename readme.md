# 🧭 Business App Monorepo

Full-stack project built with:
- **Frontend:** React + Vite  
- **Backend:** NestJS  
- **Package Management:** npm workspaces  
- **Runtime Management:** [Volta](https://volta.sh/) (for consistent Node + npm versions)  

All under a single Git repository — clean, efficient, and developer-friendly.

---

## 📁 Folder Structure

business-app/
├── web-app/ # Frontend - React + Vite
├── api/ # Backend - NestJS
├── package.json # Root config (workspaces + Volta)
└── README.md


---

## ⚙️ Requirements

Before starting, make sure you have:

- **Git** – version control  
- **Volta** – to manage Node/npm versions  
- **Node.js 22+** (handled automatically by Volta)  
- **npm 10+**

---

## 🪄 Setup Instructions (for Developers)

### 1️⃣ Clone the repository
```bash
git clone <your_repo_url>
cd business-app

curl https://get.volta.sh | bash

# ⚠️ If you’re on Ubuntu, remove Snap curl first:
sudo snap remove curl
sudo apt update && sudo apt install curl -y
curl https://get.volta.sh | bash

# Then restart your terminal or run:
source ~/.bashrc

volta --version
```

### Install Dependencies

From the project root:
`npm install`

### Run the Development Servers

Frontend only (React + Vite):
`npm run dev:web`


| Command             | Description                                |
| ------------------- | ------------------------------------------ |
| `npm run dev:web`   | Start the frontend in dev mode             |
| `npm run dev:api`   | Start the backend in dev mode              |
| `npm run dev`       | Run both frontend and backend concurrently |
| `npm run build:web` | Build the frontend for production          |
| `npm run build:api` | Build the backend for production           |






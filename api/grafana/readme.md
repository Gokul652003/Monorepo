# Project Setup Guide

Quick guide to get the project running on your machine.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:
- **Docker** & **Docker Compose**
- **Node.js** (v18+)
- **npm**

Check if installed:
```bash
docker --version
docker compose version
node --version
npm --version```


You should see:

✅ grafana (port 3030)
✅ loki (port 3100)
✅ prometheus (port 9090)
✅ promtail (port 9080)


🌐 Access Services
Service	                                    URL	                            Login
Application	                        http://localhost:3000	-
Grafana (Logs & Metrics)	        http://localhost:3030	                    admin / admin
Prometheus	                        http://localhost:9090	-
API Docs	                        http://localhost:3000/swagger	-

## 📊 View Logs in Grafana
Open http://localhost:3030
Login: admin / admin (change password when prompted)
Click Explore (compass icon on left)
Select Loki from dropdown
Query: {app="nestjs"}
Click Run query


# View running containers
docker compose ps

# View logs
docker compose logs -f

# Restart all services
docker compose restart

# Stop all services
docker compose stop

# Remove all (keeps volumes)
docker compose down

# Remove all including data (⚠️ deletes everything)
docker compose down -v

# Rebuild and start
docker compose up -d --build

# Check application logs
npm run start:dev
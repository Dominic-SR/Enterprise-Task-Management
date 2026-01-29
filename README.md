<h1>Enterprises Task Management </h1>


<div align="center">
   <h1>MEAN Stack Jira Clone</h1>
  
  <p>A high-performance Agile Project Management tool built with MongoDB, Express, Angular, and Node.js.</p>

  <div>
    <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  </div>

  <br />

  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#api-endpoints">API Docs</a> •
  <a href="#contributing">Contributing</a>
</div>

<hr />

## 🎯 Project Overview
This project is a functional clone of **Jira**, designed to help software teams manage their workflows. It features a dynamic Kanban board, ticket lifecycle management, and user authentication using the **MEAN** stack.

### 🌟 Key Features
<table>
  <tr>
    <td><b>Interactive Kanban</b></td>
    <td>Drag-and-drop issues across "To Do", "In Progress", and "Done" columns.</td>
  </tr>
  <tr>
    <td><b>Issue Management</b></td>
    <td>Create, update, and prioritize stories, bugs, and tasks.</td>
  </tr>
  <tr>
    <td><b>Team Collaboration</b></td>
    <td>Assign users to tickets and track progress in real-time.</td>
  </tr>
  <tr>
    <td><b>Secure Auth</b></td>
    <td>Full JWT-based authentication with protected routes.</td>
  </tr>
</table>

<hr />

<h2 id="installation">⚙️ Quick Start</h2>

### Prerequisites
* **Node.js**: v18+
* **Angular CLI**: v16+
* **MongoDB**: Local instance or Atlas URI

### 1. Backend Setup
```bash
cd backend
npm install
# Create .env with MONGO_URI and JWT_SECRET
npm run start:dev

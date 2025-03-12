# 📊 Data Viewer Application

![React Version](https://img.shields.io/badge/react-19.0.0-%2361DAFB)
![Node.js Version](https://img.shields.io/badge/node-20.12.2-brightgreen)

A full-stack application for viewing and managing retail planning data.

🌐 **Live Demo**: ([https://gs-060699-harunath-eskuri.vercel.app/])

## 🚀 Features

- Interactive AG-Grid data visualization
- Real-time data updates
- Multi-store management
- Financial metrics calculation
- Responsive UI with Tailwind CSS
- JWT Authentication
- REST API integration

## 📂 Repository Structure
GS060699_Harunath_Eskuri/
├── frontend/ # React + TypeScript client
│ ├── public/
│ ├── src/
│ └── package.json
└── backend/ # Node.js + Express API
├── prisma/
├── src/
└── package.json

Copy

## ⚙️ Technologies Used

| Frontend              | Backend               | Database          |
|-----------------------|-----------------------|-------------------|
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) | ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) |  |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) |  |

## 🛠️ Setup Guide

### Prerequisites

- Node.js >= 20.x
- PostgreSQL >= 15.x
- Git

### 🔌 Frontend Setup

```bash
git clone https://github.com/Harunath/GS060699_Harunath_Eskuri.git
cd GS060699_Harunath_Eskuri/frontend
npm install
npm run dev
Open http://localhost:5173 in your browser

🗃️ Backend Setup
Clone repository 

bash
Copy
git clone https://github.com/Harunath/GS060699_Harunath_Eskuri_backend.git
cd GS060699_Harunath_Eskuri_backend
Environment Setup

bash
Copy
echo "DATABASE_URL=postgresql://youruser:yourpassword@localhost:5432/yourdatabase
JWT_SECRET=your_secret_key" > .env
Database Setup

bash
Copy
npx prisma migrate dev --name init
npx prisma generate
npm run seed
npm run build
npm start
🌍 Deployment
Environment	URL	Notes
Production	Frontend	Hosted on Vercel
API	Backend	⚠️ First load may take 30-60 seconds
🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
Distributed under the MIT License. See LICENSE for more information.

📧 Contact
Harunath Eskuri - @harunath

Project Link: https://github.com/Harunath/GS990606_Harunath_Eskuri

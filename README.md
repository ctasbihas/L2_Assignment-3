# 📚 Library Management API

A fully functional RESTful API for managing books and borrowing operations in a library. Built with **Express.js**, **TypeScript**, and **MongoDB** (Mongoose) — developed as part of Programming Hero’s Assignment 3 for the Next Level Web Development course.

---

## 🚀 Live Links

- 🔗 Live API: [https://l2-assignment3-one.vercel.app](https://l2-assignment3-one.vercel.app)
- 📂 GitHub Repo: [https://github.com/ctasbihas/L2_Assignment-3](https://github.com/ctasbihas/L2_Assignment-3)
- 🎥 Video Demo: [https://your-demo-link.com](https://your-demo-link.com)

---

## 🧰 Tech Stack

- **Backend**: Express.js, TypeScript
- **Database**: MongoDB, Mongoose
- **Runtime**: Node.js
- **Deployment**: Vercel

---

## ✅ Features

- 🔄 Full CRUD operations for Books
- 🔐 Input validation via Mongoose
- 📉 Borrow management with copy deduction logic
- 📊 Borrowed books summary using aggregation pipeline
- 🔧 Filtering, sorting, and pagination for listing books
- 🔁 Instance method for availability update
- ⚙️ Mongoose middleware (pre/post save)
- ❗ Unified error response format

---

## 📁 Folder Structure

\`\`\`
src/
├── app.ts              # Express app setup
├── server.ts           # Server bootstrap
└── app/
    ├── controllers/
    │   ├── book.controller.ts
    │   └── borrow.controller.ts
    ├── interfaces/
    │   └── book.interface.ts
    └── models/
        ├── book.model.ts
        └── borrow.model.ts
\`\`\`

---

## 📦 Getting Started

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/ctasbihas/L2_Assignment-3.git
cd L2_Assignment-3
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Add Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`env
PORT=5000
MONGO_URI=your_mongodb_uri
\`\`\`

### 4. Run the Server

#### Development

\`\`\`bash
npm run dev
\`\`\`

#### Production

\`\`\`bash
npm run build
npm start
\`\`\`
![swoc2024 Banner](./swoc.jpg)

# React Blog - Social Winter of Code 2024 🌟

Welcome to **React Blog**, an exciting application selected for **Social Winter of Code 2024** (SWOC-2024)!

This project is an open-source initiative aimed at building a robust and feature-rich blogging platform. We welcome contributors from all backgrounds to collaborate and make this project a success. If you like what you see, please consider giving this repository a **star**! 💥

---

## Features 🔄
- User authentication and authorization
- Create, edit, and delete blog posts
- Search and filter blogs
- Real-time updates with modern React and MongoDB integration

---

## Tools Used 🛠️
| Tool           | 
|----------------|
| TailwindCSS    | 
| ExpressJS      | 
| ReactJS        | 
| MongoDB        | 
| NodeJS         | 

---

## Getting Started ⚡
Follow these steps to set up the project locally:

### Prerequisites ⚙
Ensure you have the following installed:
- **Node.js** (version 14.0 or higher recommended)
- **MongoDB** (for the database)

### Installation Steps 🔍
1. Clone the repository:
   ```bash
   git clone https://github.com/OkenHaha/react-blog.git
   ```

2. Navigate into the project directory:
   ```bash
   cd react-blog
   ```

3. Install dependencies for both frontend and backend:
   ```bash
   cd front-end
   npm install
   
   cd ../back-end
   npm install
   ```

4. Set up the database connection:
   - Copy your MongoDB connection URL.
   - Create a `.env` file in the `back-end` directory.
   - Add the following line to the `.env` file:
     ```env
     CONNECTION_URL="your-mongodb-connection-url"
     ```
     Example for local testing:
     ```env
     CONNECTION_URL="mongodb://localhost:27017"
     ```

5. Start the development server:
   ```bash
   cd back-end
   npm run dev
   ```
   This command uses **concurrently** to run both frontend and backend servers simultaneously.

6. Open the application in your browser:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

---

## Contribution Guidelines 🔧
We’re thrilled to have you contribute to this project! Please follow these steps to get started:

1. Fork the repository and clone it locally.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b your-branch-name
   ```
3. Make your changes and commit them with clear and concise commit messages.
4. Push your changes to your forked repository:
   ```bash
   git push origin your-branch-name
   ```
5. Create a pull request (PR) from your branch to the `main` branch of this repository.
6. Wait for review and feedback.

### Pro Tips 💡
- Follow the code style and standards outlined in the repository.
- Check the `CONTRIBUTING.md` file for detailed contribution rules.
- Join discussions on issues and share your ideas!


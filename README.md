
**Live Application URL:** <https://todoapp-frontend-s8bf.onrender.com>

# MERN Stack To-Do List Application

This is a full-stack to-do list application built with the MERN (MongoDB, Express, React, Node.js) stack. The project allows users to register and log in to manage their personal to-do lists. It features a secure, token-based authentication system and a clean, two-panel user interface for managing lists and their corresponding items.

## Local Setup and Installation

To run this project on your local machine, you will need to have **Node.js** and **MongoDB** installed.

### 1. Clone the Repository

First, clone the project repository to your local machine.

```

git clone https://github.com/Puffy3/TodoApp.git
cd TodoApp

```

### 2. Backend Setup

The backend server handles all the API logic and database connections.

```

# Navigate to the server directory

cd server

# Install all required dependencies

npm install

# Create a .env file in the /server directory and add your

# MongoDB connection string and a JWT secret. For example:

# MONGO_URI="your-mongodb-connection-string"

# JWT_SECRET="your-secret-key"

# Run the development server

npm run dev

```

The backend will now be running on `http://localhost:5001`.

### 3. Frontend Setup

The frontend is a React application built with Vite.

```

# From the root directory, navigate to the client folder

cd client

# Install all required dependencies

npm install

# Run the development server

npm run dev

```

The frontend application will now be running on `http://localhost:5173` (or another port specified by Vite).





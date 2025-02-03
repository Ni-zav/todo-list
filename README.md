# Todo List Application

A simple web-based todo list application with user authentication. Users can create accounts, manage their tasks, mark them as complete, and delete them.

## Technologies Used

- Node.js & Express.js - Backend framework
- MongoDB - Database
- EJS - Templating engine
- Passport.js - Authentication
- Bootstrap - Frontend styling

## Features

- User registration and login
- Create, update, and delete tasks
- Mark tasks as complete/incomplete
- User-specific todo lists
- Flash messages for user feedback

## Setup and Running

1. Make sure you have Node.js and MongoDB installed on your system

2. Clone the repository and install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with:
```
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

4. Start the application:
```bash
npm start
```

5. Visit `http://localhost:5000` in your browser

## Note

This is a basic todo list application built for learning purposes, demonstrating fundamental concepts of full-stack web development including authentication, CRUD operations, and database management.

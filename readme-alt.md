# Todo List Application

A simple yet functional todo list web application built with Node.js and Express. This application allows users to manage their tasks securely with user authentication.

## Features

- User registration and authentication
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Secure password hashing
- Flash messages for user feedback
- Responsive design using Bootstrap

## Tech Stack

- **Backend**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - Passport.js (Authentication)
  - bcryptjs (Password hashing)

- **Frontend**
  - EJS (Templating)
  - Bootstrap 5
  - HTML/CSS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd todo-list-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/todo-app
SESSION_SECRET=your_session_secret_here
```

4. Start the application:
```bash
npm start
```

The application should now be running at `http://localhost:5000`

## Project Structure

- `config/` - Configuration files (Passport.js, auth middleware)
- `models/` - MongoDB models (User, Todo)
- `routes/` - Express routes
- `views/` - EJS templates
- `app.js` - Main application file

## Learning Outcomes

This project demonstrates understanding of:
- MVC Architecture
- User Authentication & Authorization
- CRUD Operations
- Session Management
- Database Integration
- Error Handling
- Template Engines
- Middleware Implementation

## Contributing

Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open source and available under the [MIT License](LICENSE).
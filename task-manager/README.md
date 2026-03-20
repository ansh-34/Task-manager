# Task Manager

A full-stack web application for managing tasks with user authentication and a modern, responsive UI.

## Features

- 🔐 **JWT Authentication** - Secure user registration and login
- ✅ **CRUD Operations** - Create, read, update, and delete tasks
- 🔍 **Task Filtering** - Filter tasks by status (All, Completed, Pending)
- 🎨 **Modern UI** - Clean and responsive React frontend with Vite
- 💾 **MongoDB Database** - Secure data storage with Mongoose
- ⚡ **Fast API** - Express backend with efficient request handling
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: React 18, Vite, React Router, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens), Bcryptjs
- **Styling**: CSS3 with modern design patterns

## Project Structure

```
task-manager/
├── backend/
│   ├── server.js
│   ├── .env
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   └── middleware/
│       └── auth.js
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   └── components/
│   │       ├── Navbar.jsx
│   │       ├── TaskCard.jsx
│   │       ├── TaskForm.jsx
│   │       └── FilterBar.jsx
├── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (running locally or Atlas connection string)

## Setup Instructions

### 1. Install Dependencies

```bash
npm run install:all
```

This command will:
- Install backend dependencies in the root directory
- Install frontend dependencies in the `frontend` directory

### 2. Configure Environment Variables

Create or edit the `backend/.env` file with your configuration:

```
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

**For MongoDB Atlas**: Replace `MONGO_URI` with your connection string:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager
```

### 3. Run the Backend Server

```bash
npm run dev:backend
```

The server will start on `http://localhost:5000` and display a success message when MongoDB connects.

### 4. Run the Frontend Development Server

In a new terminal, navigate to the frontend directory:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### 5. Open the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## API Endpoints

### Authentication Routes (`/api/auth`)

- **POST** `/api/auth/register`
  - Request: `{ name, email, password }`
  - Response: `{ token, user }`

- **POST** `/api/auth/login`
  - Request: `{ email, password }`
  - Response: `{ token, user }`

### Task Routes (`/api/tasks`) - All require JWT Authentication

- **GET** `/api/tasks`
  - Returns: Array of tasks for logged-in user

- **POST** `/api/tasks`
  - Request: `{ title, description }`
  - Response: Created task object

- **PUT** `/api/tasks/:id`
  - Request: `{ title, description }`
  - Response: Updated task object

- **PATCH** `/api/tasks/:id`
  - Response: Task with toggled `completed` status

- **DELETE** `/api/tasks/:id`
  - Response: Success message

## Usage

1. **Register**: Create a new account with name, email, and password
2. **Login**: Sign in with your credentials
3. **Create Tasks**: Use the form to add new tasks with optional descriptions
4. **Edit Tasks**: Click the Edit button to modify task details
5. **Toggle Status**: Click the checkbox to mark tasks as completed/pending
6. **Filter Tasks**: Use the filter buttons to view All, Completed, or Pending tasks
7. **Delete Tasks**: Remove tasks with the Delete button
8. **Logout**: Click the Logout button to exit your session

## Security Features

- Passwords are hashed using bcryptjs
- JWT tokens are used for secure authentication
- Protected routes require valid authentication
- CORS is configured to allow only the frontend origin
- Environment variables store sensitive information

## Development

### Backend Development

- Backend source: `backend/`
- Main file: `backend/server.js`
- Uses Express.js and Mongoose ORM
- API runs on port 5000

### Frontend Development

- Frontend source: `frontend/src/`
- Built with Vite and React
- React Router for navigation
- Axios for HTTP requests
- Dev server runs on port 5173

## Building for Production

### Build Frontend

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `frontend/dist` directory.

### Preview Production Build

```bash
cd frontend
npm run preview
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running (`mongod` for local installation)
- Check `MONGO_URI` in `.env` file is correct
- For MongoDB Atlas, verify connection string and network access

### Port Already in Use
- Backend: Change `PORT` in `.env` file
- Frontend: Add `--port` flag to vite command

### CORS Error
- Verify frontend URL matches `CORS` origin in `backend/server.js`
- Default: `http://localhost:5173`

### Token Expiration
- Tokens expire after 7 days
- User will be logged out and redirected to login page
- Simply login again to get a new token

## Future Enhancements

- Task due dates and priorities
- Task categories/tags
- Task sharing and collaboration
- Notifications and reminders
- Dark mode theme
- Task attachments
- Advanced search and sorting
- Task history and audit logs

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ using React, Node.js, and MongoDB

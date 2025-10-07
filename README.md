# Task Manager

A personal task management application built with React, Node.js, and PostgreSQL. Features a clean, modern interface with light/dark theme support.

## Features

- ✅ Create, edit, and delete tasks
- 📅 Due date tracking with overdue indicators
- 🏷️ Priority levels (High, Medium, Low)
- 📂 Category organization
- 🔍 Search and filter functionality
- 📊 Task statistics dashboard
- 🌙 Light/Dark theme toggle
- 📱 Responsive design

## Tech Stack

- **Frontend**: React 19.1.0 with JavaScript
- **Backend**: Node.js with Express 4.18.2
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Jotai
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI for accessibility
- **Notifications**: SweetAlert2

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd task-manager
   ```

2. **Set up the database:**
   - Create a PostgreSQL database named `taskmanager`
   - Copy `server/env.example` to `server/.env`
   - Update the `DATABASE_URL` in `.env` with your database credentials

3. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

4. **Set up Prisma:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Install client dependencies:**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the server:**
   ```bash
   cd server
   npm start
   ```
   Server will run on http://localhost:3001

2. **Start the client:**
   ```bash
   cd client
   npm start
   ```
   Client will run on http://localhost:3000

## Project Structure

```
task-manager/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── Atoms.js        # Jotai state management
│   │   └── App.js          # Main app component
│   └── package.json
├── server/                 # Node.js backend
│   ├── prisma/            # Database schema
│   ├── server.js          # Express server
│   └── package.json
└── README.md
```

## API Endpoints

- `GET /api/tasks` - Get all tasks (with optional filtering)
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks/stats` - Get task statistics

## Usage

1. **Home Page**: View task statistics and navigate to task management
2. **Task List**: View, filter, and search all tasks
3. **Create Task**: Click "Add Task" to create a new task
4. **Edit Task**: Click the edit button on any task
5. **Complete Task**: Click "Mark Complete" to toggle completion status
6. **Delete Task**: Click the delete button (with confirmation)
7. **Filter Tasks**: Use the filter panel to narrow down tasks
8. **Theme Toggle**: Click the theme button to switch between light/dark modes

## Development

The application follows a clean, modular architecture with:
- Component-based React structure
- Jotai for global state management
- CSS modules for styling
- RESTful API design
- PostgreSQL with Prisma for data persistence

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License

# LivePoll — Real-Time Polling App

A full-stack MERN application where users can create polls and watch votes update live across all connected browsers using Socket.io.

## Tech Stack

- **Frontend:** React, React Router, Socket.io Client
- **Backend:** Node.js, Express, Socket.io
- **Database:** MongoDB (Mongoose)

## Features

- Create polls with 2–5 options
- Vote on any poll (one vote per browser, persisted in localStorage)
- Live vote count updates via WebSocket — no page refresh needed
- Responsive UI with progress bars and winner highlighting

## Project Structure

```
Real-Time Polling/
├── client/               # React frontend
│   └── src/
│       ├── components/   # Navbar, PollCard
│       ├── pages/        # HomePage, CreatePage, PollPage
│       └── socket.js     # Socket.io client singleton
└── server/               # Express backend
    ├── models/Poll.js    # Mongoose schema
    ├── routes/polls.js   # REST API routes
    ├── db.js             # MongoDB connection
    └── server.js         # Entry point + Socket.io events
```

## Getting Started

### Prerequisites

- Node.js v18+
- A MongoDB Atlas cluster (or local MongoDB)

### 1. Clone the repo

```bash
git clone <repo-url>
cd Real-Time-Polling
```

Available Scripts
From the root directory:
```
npm start — start both frontend and backend
npm run server — start the backend only
npm run client — start the frontend only
npm run build — build the React client
npm run start:prod — build the client and start the backend in production mode
npm run install-all — install dependencies for the root, server, and client ```


Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

Start the server:

```bash
npm run dev      # development (nodemon)
npm start        # production
```

### 3. Set up the client

```bash
cd client
npm install
npm start
```

The React app runs on `http://localhost:3000` and proxies API requests to `http://localhost:5000`.

## API Endpoints

| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| GET    | `/api/polls`          | Get all polls       |
| POST   | `/api/polls`          | Create a new poll   |
| GET    | `/api/polls/:id`      | Get a single poll   |
| POST   | `/api/polls/:id/vote` | Submit a vote (REST)|

## Socket Events

| Event         | Direction         | Payload                        |
|---------------|-------------------|--------------------------------|
| `joinPoll`    | Client → Server   | `pollId`                       |
| `submitVote`  | Client → Server   | `{ pollId, optionIndex }`      |
| `pollUpdated` | Server → Clients  | Updated poll object            |

## Environment Variables

| Variable   | Description                        |
|------------|------------------------------------|
| `PORT`     | Port the server listens on         |
| `MONGO_URI`| MongoDB connection string          |
| `NODE_ENV` | `development` or `production`      |

In production, the server serves the React build from `client/build`. Set `NODE_ENV=production` and run `npm run build` inside `client/` before starting the server.

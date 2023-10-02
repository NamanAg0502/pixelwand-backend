import express from 'express';
import { connect } from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './app/routes/auth.routes.js';
import chatRoutes from './app/routes/chat.routes.js';
import projectRoutes from './app/routes/project.routes.js';
import tasksRoutes from './app/routes/tasks.routes.js';
import eventRoutes from './app/routes/calender.routes.js';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import socketHandler from './app/sockets/socket.handler.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
dotenv.config();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    corsOptions: {
      origin: ['http://localhost:3000'],
    },
  })
);
app.use(cookieParser());

// Cors
app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = ['http://localhost:3000'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, UPDATE');
  next();
});

// Connect to MongoDB
connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Routes
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', tasksRoutes);
app.use('/events', eventRoutes);

// Socket.io Setup
server.listen(8000, function () {
  console.log(`listening on *:` + 8000);
});

io.on('connection', (socket) => {
  socketHandler(socket, io); // Handle socket events in the socketHandler module
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

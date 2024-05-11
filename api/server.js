import express from 'express';
import http from 'http';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/message.js';
import userRoutes from './routes/user.js';
import cookieParser from 'cookie-parser';
const app = express();

const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.json());
app.use(cookieParser());
// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/users', userRoutes);

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});


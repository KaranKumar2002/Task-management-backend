const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');



const app = express();

app.use(cors({
    origin:["http://localhost:5173","https://task-management-frontend-rho-lime.vercel.app/"]
}));
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve PDFs

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

module.exports = app;

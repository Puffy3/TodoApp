import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';


dotenv.config();

//database connection
connectDB();

const app = express();

// Middleware 
app.use(cors());
app.use(express.json());

// API Routes 
app.use('/api/auth', authRoutes);
app.use('/api/todolists', todoRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));

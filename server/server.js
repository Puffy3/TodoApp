import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';

dotenv.config();
connectDB();

const app = express();


if (!process.env.CLIENT_URL) {
    console.error("FATAL ERROR: CLIENT_URL is not set in the environment variables.");
}


app.use(cors({
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200 
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todolists', todoRoutes);
app.get('/test',(req,res)=>{
      res.send("Hello world")
})

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

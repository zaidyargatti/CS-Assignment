import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import  connectDB  from './config/db.config.js';
import authRoutes from './routes/user.routes.js';
import agentRoutes from './routes/agent.routes.js';
import listRoutes from './routes/list.routes.js';
import task from './routes/task.routes.js';

dotenv.config();
connectDB()

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads')); // ✅ serves uploaded images

app.use('/user', authRoutes);
app.use('/agents', agentRoutes);
app.use('/lists', listRoutes);
app.use('/task',task)

const PORT = process.env.PORT || 3000;
app.listen(PORT,  () => {
 console.log(`Server is running on port ${PORT}`);
}
)
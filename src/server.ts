import express from 'express';
import userRoutes from './routes/UserRoutes';
import authRoutes from './routes/AuthRoutes';
import postRoutes from './routes/PostRoutes';
import commentRoutes from './routes/CommentRoutes';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

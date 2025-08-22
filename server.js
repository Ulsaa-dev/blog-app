import express from 'express';
import { router as postRoutes } from './routes/Post.js';
import { router as userRoutes } from './routes/User.js';
import connectDB from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(postRoutes);
app.use('/user', userRoutes);


app.listen(process.env.PORT, () => {
    connectDB();
    console.log("Server started");
});
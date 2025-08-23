import express from 'express';
import { router as postRoutes } from './routes/post.js';
import { router as userRoutes } from './routes/user.js';
import { router as indexRoute } from './routes/index.js';
import connectDB from './db.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/post', postRoutes);
app.use('/user', userRoutes);
app.use(indexRoute);

app.listen(process.env.PORT, () => {
    connectDB();

    mongoose.connection.once('open', function () {
        console.log("MongoDB connected.");
        console.log("Server open.")
    })
});
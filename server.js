import express from 'express';
import { router as postRoutes } from './routes/post.js';
import { router as userRoutes } from './routes/user.js';
import { router as indexRoute } from './routes/index.js';
import connectDB from './mongodb.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authMiddleware from './middleware/auth.js';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});
app.use(authMiddleware)
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
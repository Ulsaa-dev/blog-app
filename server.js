import express from 'express';
import { router } from './routes.js';

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(router);


app.listen(8000, () => {
    console.log("Server started");
});
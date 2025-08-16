import { Router } from 'express';

export const router = Router();

router.get('/add', (req, res) => {
    res.render('add');
});

router.post('/add/submit', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    res.send(`A text titled ${title} <br> ${content}`);
});
import { Router } from 'express';
import { readFile, readdir } from 'fs/promises'

export const router = Router();

router.get('/add', (req, res) => {
    res.render('add');
});

router.post('/add/submit', async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
});



router.get('/post/:title', async (req, res) => {
    try {
        const content = await readFile(`./posts/${req.params.title}`, 'utf-8');
        res.render('post', { 'title': req.params.title, 'content': content });
    } catch {
        console.error("Couldn't read file");
        res.status(500).json("Couldn't read file")
    }
});
import { Router } from 'express';
import { readFile, readdir, writeFile } from 'fs/promises'

export const router = Router();

router.get('/', async (req, res) =>{
    const posts = await readdir('./posts')
    .then(posts => {
        res.render('index', { 'posts': posts })
    })

    // If promise is rejected
    .catch(err => {
        console.log(err)
    })
});

router.get('/add', (req, res) => {
    res.render('add');
});

router.post('/add/submit', async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    try {
        await writeFile(`./posts/${title}`, content);
        console.log('Post created successfully');
        res.render('submit', { 'title': title });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/post/:title', async (req, res) => {
    try {
        let content = await readFile(`./posts/${req.params.title}`, 'utf-8');
        content = content
        .split(/\n+/) // split by blank lines/newlines
        .map(p => `<p>${p}</p>`)
        .join('');
        res.render('post', { 'title': req.params.title, 'content': content });
    } catch {
        console.error("Couldn't read file");
        res.status(500).json("Couldn't read file")
    }
});
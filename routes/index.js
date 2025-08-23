import express from 'express';
import { readdir } from 'fs/promises'

export const router = express.Router();

router.get('/', async (req, res) =>{
    await readdir('./posts')
    .then(posts => {
        res.render('pages/index', { 'posts': posts })
    })

    // If promise is rejected
    .catch(err => {
        console.log(err)
    })
});

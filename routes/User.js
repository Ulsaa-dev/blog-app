import express, { application } from 'express';
import User from '../models/User.js'
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import authMiddleware from '../middleware/auth.js';

export const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.send('User login page');
});

router.post('/register/submit', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username is taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword });
        newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login/submit', async (req, res) => {
    const { username, password } = req.body;


    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Invalid username" });

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        const token = jsonwebtoken.sign({ 
            id: user._id,
            username: user.username,
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
});

router.get("/profile", authMiddleware, async (req, res) => {
    try {
        // req.user comes from the token (step 7)
        const user = await User.findById(req.user.id).select("-password");
        res.json(user); 
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
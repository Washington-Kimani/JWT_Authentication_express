require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const http = require('http');
const PORT = process.env.PORT || 3000;


const app = express();
const server = http.Server(app);

app.use(express.json());

const posts = [
    {
        username: "Filipe",
        title: "post 1"
    },
    {
        username: "Jimm",
        title: "post 2"
    },
    {
        username: "Washington",
        title: "hola!"
    },
]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
};


server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
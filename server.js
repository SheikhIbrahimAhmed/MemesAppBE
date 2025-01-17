require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./src/routes/authRoutes');
const postRouter = require('./src/routes/postRoutes');
const uploadRouter = require('./src/routes/uploadRoutes');
const { connectMongoDB } = require('./connection');
const loginMiddleware = require('./src/middlewares/loginMiddleware');
app.use(bodyParser.json());
app.use(cors());

// app.get("/", (req, res) => res.send("Welcome to car selling API"));

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/post', postRouter);
app.use(express.urlencoded({ extended: true }));
app.get("/validate-token", loginMiddleware, (req, res) => {
    return res.status(200).json({ message: "Token is valid" });
});
connectMongoDB(http, 5000);

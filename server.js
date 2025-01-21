require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const postRouter = require('./src/routes/postRoutes');
const uploadRouter = require('./src/routes/uploadRoutes');
const { connectMongoDB } = require('./connection');
app.use(bodyParser.json());
app.use(cors());


app.use(express.json());


app.use('/api/upload', uploadRouter);
app.use('/api/post', postRouter);
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => { res.send("Express on Vercel"); });
connectMongoDB(http, 5000);
module.exports = app
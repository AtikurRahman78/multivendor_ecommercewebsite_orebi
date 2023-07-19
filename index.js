require('dotenv').config();
const express = require('express');
const dbConnection = require('./confiq/dbConnection');
const cors = require('cors');
const router = require('./routes');
const app = express();
const path = require('path')

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(router);
dbConnection();




app.listen(8000);
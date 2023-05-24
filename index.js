require('dotenv').config();
const express = require('express');
const dbConnection = require('./confiq/dbConnection');
const cors = require('cors');
const router = require('./routes');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(router);
dbConnection();




app.listen(8000);
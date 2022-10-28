const { urlencoded } = require('body-parser');
const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const port = process.env.PORT || 8000;
connectDB();

const app = express();
//use middleware to parse body of request to json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api/matches', require('./routes/matchRoutes'));
app.use('/api/players', require('./routes/playerRoutes'));

app.listen(port, () => console.log(`Server running on port ${port}`));

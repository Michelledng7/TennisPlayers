const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 8000;

app.use('/api/tennis', require('./routes/tennisRoutes'));

app.listen(port, () => console.log(`Server running on port ${port}`));

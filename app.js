const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const routes = require('./routes/child_routes');


const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

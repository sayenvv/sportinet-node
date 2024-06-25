const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler'); // Ensure you have this middleware
const userRoutes = require('./routes/userRoutes'); // Correct path to userRoutes
const databaseConnection = require('../../shared/database/database_config'); // Correct path to databaseConnection

const app = express();

// app.use(cors("*"))
app.use(bodyParser.json()); // Use bodyParser before defining routes
app.use(express.json());

app.use('/api/users', userRoutes); // Use the router from userRoutes

databaseConnection(app); // Connect to the database and start the server

app.use(errorHandler); // Ensure errorHandler middleware is correctly used



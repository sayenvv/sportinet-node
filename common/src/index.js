const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('../../shared/middleware/errorHandler'); // Ensure you have this middleware
const databaseConnection = require('../../shared/database/database_config'); // Correct path to databaseConnection
const {ModuleEnum} = require("../../shared/constants/enums")

const app = express();
const PREFIX = "/api/v0"
// app.use(cors("*"))
app.use(bodyParser.json()); // Use bodyParser before defining routes
app.use(express.json());


databaseConnection(app,ModuleEnum.COMMON); // Connect to the database and start the server

app.use(errorHandler); // Ensure errorHandler middleware is correctly used



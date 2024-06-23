require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("here+++++++++++++++++++");
  app.listen(PORT, () => {
    console.log(`User service listening on port ${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

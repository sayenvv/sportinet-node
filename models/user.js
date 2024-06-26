const mongoose = require('mongoose');
const Model = require('../shared/database/db_model');
const {USER} = require('../user-service/constants/table_names')


const User = new Model(USER,{
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    required: true,
    enum: ['player', 'vendor'],
  },
});

module.exports = {User};

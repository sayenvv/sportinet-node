const Model = require('../shared/database/db_model');
const {USER} = require('../user-service/constants/table_names')
const {UserTypes,AccountTypes} = require('../user-service/constants/enums')

// Instantiate the User model using the Model class

const User = new Model(
  USER,
  {
    username: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      sparse: true, // Allows multiple documents to have no email (optional)
    },
    uid: {
      type: String,
      required: false,
      unique: true,
      sparse: true, // Allows multiple documents to have no uid (optional)
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    user_type: {
      type: String,
      required: true,
      enum: UserTypes.values,
    },
    account_status: {
      type: String,
      required: false,
      default: AccountTypes.PENDING,
      enum: AccountTypes.values,
    },
    temp_otp: {
      type: String,
      required: false,
    },
    created_at: {
      type: Date, // Corrected type to Date
      required:false,
      default: Date.now(), // Default value for creation timestamp
    },
    updated_at: {
      type: Date, // Corrected type to Date
      required:false,
      default: Date.now(), // Default value for creation timestamp
    }
  }
  
).register()



module.exports = User;

const User = require('../../../models/user'); // Correct path to user model

const getUser = async (req, res) => {
  try {
    const user = User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }else{
      res.json({
        message:"success",
        data:user,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password_hash, user_type } = req.body;
    const newUser = await User.create({ username, email, password_hash, user_type });
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

const list_all_users = async (req, res) => {
  try {
    const user_list = await User.find({});
    res.status(200).json({
      status: 'success',
      data: user_list,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};


module.exports = {
  getUser,
  createUser,
  list_all_users
};

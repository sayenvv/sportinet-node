const User = require('../../../models/user'); // Correct path to user model

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  const data = req.body
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

module.exports = {
  getUser,
  createUser
};

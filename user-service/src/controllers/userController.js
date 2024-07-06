const User = require('../../../models/user'); // Correct path to user model

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
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



const list_all_users = async (req, res) => {
  try {
    const user_list = await User.find({}).populate();
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
  list_all_users
};

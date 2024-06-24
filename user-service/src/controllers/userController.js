const User = require('../../../models/user');

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUser,
};

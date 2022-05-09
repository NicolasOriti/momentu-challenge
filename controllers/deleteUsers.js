const { response } = require('express');
const User = require('../models/user');

const deleteUsers = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json({ user });
};

module.exports = {
  deleteUsers,
};

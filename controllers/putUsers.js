const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const putUsers = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json(user);
};

module.exports = {
  putUsers,
};

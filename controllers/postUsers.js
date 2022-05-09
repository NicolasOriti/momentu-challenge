const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const postUsers = async (req, res = response) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  // crypt pass
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // saving
  await user.save();

  res.json({
    user,
  });
};

module.exports = {
  postUsers,
};

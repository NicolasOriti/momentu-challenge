const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../helpers/generateJWT');
const User = require('../models/user');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // verify email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'User / password incorrect - email',
      });
    }

    // verify user
    if (!user.state) {
      return res.status(400).json({
        msg: 'User / password incorrect - state: false',
      });
    }

    // verify pass
    const validPass = bcryptjs.compareSync(password, user.password);
    if (!validPass) {
      return res.status(400).json({
        msg: 'User / password incorrect - password',
      });
    }

    // jwt
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Error in login',
    });
  }
};

module.exports = {
  login,
};

const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verify Email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'Error in email',
      });
    }

    // user active
    if (!user.state) {
      return res.status(400).json({
        msg: 'User state is false',
      });
    }

    // Verify pass
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Password is not correct',
      });
    }

    // Generar el JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Talk with admin',
    });
  }
};

module.exports = {
  login,
};

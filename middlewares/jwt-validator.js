const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'token not found',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: 'Invalid token - user not exist',
      });
    }

    if (!user.state) {
      return res.status(401).json({
        msg: 'Invalid token - state user : false',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'invalid token',
    });
  }
};

module.exports = {
  validateJWT,
};

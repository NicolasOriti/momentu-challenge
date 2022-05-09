const User = require('../models/user');

const existEmail = async (email = '') => {
  // Verify email
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    throw new Error(`The email: ${email}, is already registered`);
  }
};

const existUserForId = async (id) => {
  // Verify Id
  const isUser = await User.findById(id);
  if (!isUser) {
    throw new Error(`The id not exist ${id}`);
  }
};

module.exports = {
  existEmail,
  existUserForId,
};

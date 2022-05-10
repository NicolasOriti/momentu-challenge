const User = require('../models/user');
const Product = require('../models/product');

const existEmail = async (email = '') => {
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    throw new Error(`El email: ${email}, ya está registrado`);
  }
};

const existUserForId = async (id) => {
  const existeUser = await User.findById(id);
  if (!existeUser) {
    throw new Error(`El id no existe ${id}`);
  }
};

const existProductForId = async (id) => {
  const existeProducto = await Product.findById(id);
  if (!existeProducto) {
    throw new Error(`El id no existe ${id}`);
  }
};

module.exports = {
  existEmail,
  existUserForId,
  existProductForId,
};

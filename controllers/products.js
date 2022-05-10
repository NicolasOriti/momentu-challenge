const { response } = require('express');
const Product = require('../models/product');

const obtainProducts = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    products,
  });
};

const obtainProduct = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  res.json(product);
};

const createProduct = async (req, res = response) => {
  const { state, ...body } = req.body;

  const productDB = await Product.findOne({ name: body.name });

  if (productDB) {
    return res.status(400).json({
      msg: `El producto ${productDB.name}, ya existe`,
    });
  }

  const data = {
    ...body,
    name: body.name.toUpperCase(),
  };

  const product = new Product(data);

  await product.save();

  res.status(201).json(product);
};

const updateProduct = async (req, res = response) => {
  const { id } = req.params;
  const { state, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json(product);
};

const deleteProduct = async (req, res = response) => {
  const { id } = req.params;
  const productDeleted = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json(productDeleted);
};

module.exports = {
  createProduct,
  obtainProducts,
  obtainProduct,
  updateProduct,
  deleteProduct,
};

const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validateJWT');
const { fieldsValidate } = require('../middlewares/validateFields');

const {
  createProduct,
  obtainProducts,
  updateProduct,
  deleteProduct,
  obtainProduct,
} = require('../controllers/products');

const { existProductForId } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtainProducts);

router.get(
  '/:id',
  [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existProductForId),
    fieldsValidate,
  ],
  obtainProduct
);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    fieldsValidate,
  ],
  createProduct
);

router.put(
  '/:id',
  [
    validateJWT,
    // check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom(existProductForId),
    fieldsValidate,
  ],
  updateProduct
);

router.delete(
  '/:id',
  [
    validateJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existProductForId),
    fieldsValidate,
  ],
  deleteProduct
);

module.exports = router;

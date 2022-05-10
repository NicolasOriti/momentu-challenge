const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validateJWT');
const { fieldsValidate } = require('../middlewares/validateFields');

const { existEmail, existUserForId } = require('../helpers/db-validators');

const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
} = require('../controllers/users');

const router = Router();

router.get('/', usersGet);

router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserForId),
    fieldsValidate,
  ],
  usersPut
);

router.post(
  '/',
  [
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({
      min: 6,
    }),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(existEmail),
    fieldsValidate,
  ],
  usersPost
);

router.delete(
  '/:id',
  [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserForId),
    fieldsValidate,
  ],
  usersDelete
);

module.exports = router;

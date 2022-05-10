const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidate } = require('../middlewares/validateFields');

const { login } = require('../controllers/auth');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    fieldsValidate,
  ],
  login
);

router.post(
  '/register',
  [
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    fieldsValidate,
  ],
  login
);

module.exports = router;

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/fields-validator');
const { existEmail, existUserForId } = require('../helpers/db-validators');

const { getUsers } = require('../controllers/getUsers');
const { putUsers } = require('../controllers/putUsers');
const { postUsers } = require('../controllers/postUsers');
const { deleteUsers } = require('../controllers/deleteUsers');

const router = Router();

router.get('/', getUsers);

router.put(
  '/:id',
  [
    check('id', 'Id is not validate').isMongoId(),
    check('id').custom(existUserForId),
    validateFields,
  ],
  putUsers
);

router.post(
  '/',
  [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password must be more than 6 letters').isLength({
      min: 6,
    }),
    check('email', 'The email has not been validated').isEmail(),
    check('email').custom(existEmail),
    validateFields,
  ],
  postUsers
);

router.delete(
  '/:id',
  [
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(existUserForId),
    validateFields,
  ],
  deleteUsers
);

module.exports = router;

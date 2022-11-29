const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getUsersMe, patchUsersMe,
} = require('../controllers/users');
const { userSсhema } = require('../utils/joiSchemas');

router.get('/me', getUsersMe);
router.patch('/me', celebrate(userSсhema), patchUsersMe);

module.exports = router;

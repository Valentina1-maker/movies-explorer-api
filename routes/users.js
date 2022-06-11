const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMyInfo, updateProfile } = require('../controllers/users');

router.get('/users/me', getMyInfo);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateProfile);

module.exports = router;

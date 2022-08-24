const router = require('express').Router();
const {
  celebrate, Joi, Segments,
} = require('celebrate');
const { login, createUser } = require('../controllers/users');

router.post(
  '/signin',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  login,
);

router.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8).max(35),
    },
  }),
  createUser,
);

module.exports = router;

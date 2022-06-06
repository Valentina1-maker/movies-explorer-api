const router = require('express').Router();
const { getMyInfo, updateProfile } = require('../controllers/users');

router.get('/users/me', getMyInfo);

router.patch('/users/me', updateProfile);

module.exports = router;

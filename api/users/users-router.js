const router = require('express').Router();
const Users = require('../users/users-model.js');
const { sinirli } = require('../middleware/auth-middleware');

router.get('/', sinirli, async (req, res, next) => {
  try {
    const users = await Users.bul();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

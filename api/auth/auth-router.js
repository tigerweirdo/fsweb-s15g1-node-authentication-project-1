const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model.js');
const {
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
} = require('../middleware/auth-middleware');

router.post('/register', checkUsernameFree, checkPasswordLength, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 8); // 8 is the hashing rounds
    const newUser = { username, password: hash };

    const user = await Users.ekle(newUser);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/login', checkUsernameExists, (req, res, next) => {
  const { password } = req.body;
  if (bcrypt.compareSync(password, req.user.password)) {
    req.session.user = req.user;
    res.json({ message: `Hoşgeldin ${req.user.username}!` });
  } else {
    res.status(401).json({ message: 'Geçersiz kriter!' });
  }
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        next(err);
      } else {
        res.json({ message: 'Çıkış yapildi' });
      }
    });
  } else {
    res.json({ message: 'Oturum bulunamadı!' });
  }
});

module.exports = router;

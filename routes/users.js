const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const controller = require('../controller/users')
// Register
router.post('/register', (req, res, next) => {
  const { firstName, lastName, email, username, phoneNumber, role, password } = req.body
  let newUser = new User({
    firstName,
    lastName,
    email,
    username,
    phoneNumber,
    role: role || "User",
    password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to register user' });
    } else {
      res.json({ success: true, msg: 'User registered' });
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ data: user }, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: `Bearer ${token}`,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          role: user.role,
          phoneNumber: user.phoneNumber

        });
      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({
    id: req.user.id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    username: req.user.username,
    email: req.user.email,
    phoneNumber: req.user.phoneNumber,
  });
  console.log(res)
});

// Update a Note with noteId
router.put('/update/:id', controller.update);
//admin routers
router.post('/addAdmin',controller.AddNewAdmin);
router.get('/getAllAdmin',controller.getAllAdmin);

router.put("/updateAdmin/:id",controller.update)
router.get('/getAdminById/:id',controller.findAdminbyId);
router.delete("/delete/:id",controller.removeAdmin)

module.exports = router;

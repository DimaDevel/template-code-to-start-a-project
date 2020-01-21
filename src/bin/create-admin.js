#!/usr/bin/env node

require('../db/db');
const User = require('../models/User');

const { userRoles } = require('../enums/user');

const admin = new User({
  email: 'admin@admin.com',
  password: 'password',
  userName: 'admin',
  role: userRoles.ADMIN,
  filledAt: Date.now(),
  verifiedAt: Date.now()
});

admin
  .save()
  .then(v => {
    console.log(v);
    process.exit();
  })
  .catch(error => {
    console.log(error.message);
    process.exit();
  });

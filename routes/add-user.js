const routes= require('../controllers/user');
const express = require('express');
const router = express.Router();

router.post('/add-user', routes.addUser);

module.exports = router;
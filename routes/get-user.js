const routes= require('../controllers/user');
const express = require('express');
const router = express.Router();

router.get('/get-user', routes.getUser);

module.exports = router;



const routes= require('../controllers/user');
const express = require('express');
const router = express.Router();

router.delete('/delete-user/:id', routes.deleteUser);

module.exports = router;
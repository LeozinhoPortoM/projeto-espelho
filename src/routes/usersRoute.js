const express = require('express');
const usersControlller = require('../controllers/UsersController');
const router = express.Router();



router.get("/", usersControlller.index);

module.exports = router;
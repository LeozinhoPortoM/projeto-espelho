const express = require('express');
const UsersControlller = require('../controllers/UsersController');
const router = express.Router();



router.get("/", UsersControlller.index);

module.exports = router;
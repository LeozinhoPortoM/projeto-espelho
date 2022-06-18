const express = require('express');
const HomeControlller = require('../controllers/HomeController');
const router = express.Router();



router.get("/", HomeControlller.index);

module.exports = router;
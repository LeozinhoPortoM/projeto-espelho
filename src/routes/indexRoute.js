const express = require('express');
const indexControlller = require('../controllers/IndexController');
const router = express.Router();



router.get("/", indexControlller.index);

module.exports = router;
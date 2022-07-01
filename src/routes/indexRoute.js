const express = require('express');
const IndexControlller = require('../controllers/IndexController');
const router = express.Router();



router.get("/", IndexControlller.index);

module.exports = router;
const express = require('express');
const productControlller = require('../controllers/ProductController');
const router = express.Router();



router.get("/", productControlller.index);

module.exports = router;
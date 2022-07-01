const express = require('express');
const router = express.Router();
const ProductControlller = require('../controllers/ProductController');


router.get("/create", ProductControlller.create);
router.post("/create", ProductControlller.store);

router.get("/edit/:id", ProductControlller.edit);
router.put("/edit/:id", ProductControlller.update);

router.get("/delete/:id", ProductControlller.delete);
router.delete("/delete/:id", ProductControlller.destroy);

router.get("/", ProductControlller.index);
router.get("/:id", ProductControlller.show);

module.exports = router;
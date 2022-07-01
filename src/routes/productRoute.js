const express = require('express');
const router = express.Router();
const ProductControlller = require('../controllers/ProductController');



router.get("/", ProductControlller.index);
router.get("/create", ProductControlller.viewCreateForm);
router.post("/create", ProductControlller.create);
router.put("/edit", ProductControlller.edit);
router.delete("/delete/:id", ProductControlller.delete);
router.get("/:id/edit", ProductControlller.viewEditForm);
router.get("/:id", ProductControlller.show);

module.exports = router;
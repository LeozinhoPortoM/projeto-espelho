const express = require('express');
const router = express.Router();
const ProductControlller = require('../controllers/ProductController');



router.get("/", ProductControlller.index);
// router.get("/:id", ProductControlller.show);
router.get("/create", ProductControlller.viewCreateForm);
router.post("/create", ProductControlller.create);
router.get("/:id/edit", ProductControlller.viewEditForm);
router.put("/edit", ProductControlller.edit);
router.delete("/delete/:id", ProductControlller.delete);

module.exports = router;
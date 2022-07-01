const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();


router.get("/create", UserController.create);
router.post("/create", UserController.store);

router.get("/edit/:id", UserController.edit);
router.put("/edit/:id", UserController.update);



router.get("/delete/:id", UserController.delete);
router.delete("/delete/:id", UserController.destroy);

router.get("/", UserController.index);
router.get('/:id', UserController.show);

module.exports = router;
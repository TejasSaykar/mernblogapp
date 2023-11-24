const express = require("express");
const { updateUserController, deleteUserController, getUserController } = require("../controllers/userController");
const router = express.Router();


router.put('/update/:id', updateUserController);

router.delete("/delete/:id", deleteUserController);

router.get("/get/:id", getUserController)

module.exports = router;
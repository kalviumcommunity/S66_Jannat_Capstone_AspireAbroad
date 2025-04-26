const express = require("express");
const router = express.Router();
const { enroll, login, getUser } = require("../controllers/UserController");
const authenticate = require("../middleware/authenticate");

router.post("/enroll", enroll);
router.post("/stepIn", login);
router.get("/getUser/:id", authenticate, getUser); 


module.exports = router;

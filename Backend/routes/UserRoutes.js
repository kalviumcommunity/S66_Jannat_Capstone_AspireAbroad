const express = require("express");
const router = express.Router();
const { enroll, login, getUser ,getAllUsersWithDetails ,markStep,admin} = require("../controllers/UserController");
const authenticate = require("../middleware/authenticate");

router.post("/enroll", enroll);
router.post("/stepIn", login);
router.get("/getUser/:id", authenticate, getUser);
router.get("/user",getAllUsersWithDetails) 
router.put('/users/:userId/steps', markStep);
router.post('/admin',admin)



module.exports = router;

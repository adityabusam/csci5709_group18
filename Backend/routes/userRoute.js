const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post("/api/v1/register", userController.registerUser);
router.get ("/api/v1/verifyemail/:id", userController.verifyEmail)
router.post ("/api/v1/login", userController.login);
router.post ("/api/v1/forgotpassword", userController.forgotPassword);

module.exports = router;
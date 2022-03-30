const express = require('express');
const userController = require('../controllers/userprofileController');

const router = express.Router();

router.post("/api/v1/changepassword", userController.changePassword);
router.get ("/api/v1/getuserdetails/:id", userController.userDetails)

module.exports = router;
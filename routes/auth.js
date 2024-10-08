const express = require('express');
const router = express.Router();
const userController = require('../controller/userController'); // Adjust path as needed

router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.post('/user/refresh', userController.refresh);

const authController = require('../controller/authController'); // Adjust path as needed
router.post('/admin/register', authController.register);
router.post('/admin/login', authController.login);
router.post('/admin/refresh', authController.refresh);
module.exports = router;




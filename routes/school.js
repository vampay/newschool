const express = require('express');
const router = express.Router();
const School = require('../models/School');
const auth = require('../models/auth');
const {getSchool,getSchoolID,postSchool,updateSchool,deleteSchool,} = require('../controller/SchoolController');
const authenticateToken = require('../middlewares/auth');

router.get('/', getSchool);
router.get('/:id', getSchoolID);
router.post('/', postSchool);
router.put('/:id', updateSchool);
router.delete('/:id', deleteSchool);

module.exports = router;

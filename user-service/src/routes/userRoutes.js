const express = require('express');
const { getUser, createUser, list_all_users } = require('../controllers/userController'); // Correct path to userController

const router = express.Router();

router.get('/list/', (req,res) => {
    list_all_users(req,res)
})
router.get('/:id/', (req,res) => {
    getUser(req,res)

});

module.exports = router;

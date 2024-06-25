const express = require('express');
const { getUser, createUser } = require('../controllers/userController'); // Correct path to userController

const router = express.Router();

router.get('/:id', (req,res) => {
    getUser(req,res)

}); 
router.post('/', (req,res) => {
    createUser(req,res)
});

module.exports = router;

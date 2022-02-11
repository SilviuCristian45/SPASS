const express = require('express');
const router = express.Router()

const authController = require('../controllers/authController');
const loginUser = authController.logUser;
const registerUser = authController.registerUser;

let dbObj;
require('../database').then( db => dbObj = db );

//login 
router.post('/login', (req, res) => {
    loginUser(dbObj, req.body.email, req.body.password).then( result => res.json(result));
})

//register
router.post('/register', (req, res) => {
    registerUser(dbObj, req.body.email, req.body.password).then( result => res.json(result) );
})
 
module.exports = router;
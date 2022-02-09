const express = require('express');
const router = express.Router()

//Database connection
let dbObj;
require('../database').then( db => dbObj = db);

const passwordController = require('../controllers/passwordController');

const getPasswords = passwordController.getPasswords;
const addPassword =  passwordController.addPassword;
const updatePassword = passwordController.updatePassword;

router.get('/', async (req, res) => {
    getPasswords(dbObj).then( (result) => {
        res.send(result);
    })
});

router.post('/add/:userid', (req, res) => {
    addPassword(dbObj, req.body.service, req.body.username, req.body.password, req.params.userid).then( (result) => {
        res.json(result)
    });
});

router.put('/update/:accountID', (req, res) => {
    updatePassword(dbObj,req.params.accountID, "facebook2", "f2", "12345595695959").then( (result) => {
        res.json(result)
    })
})

module.exports = router;
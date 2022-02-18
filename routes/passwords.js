const express = require('express');
const router = express.Router()

//Database connection
let dbObj;
require('../database').then( db => dbObj = db);

const passwordController = require('../controllers/passwordController');

const getPasswords = passwordController.getPasswords;
const addPassword =  passwordController.addPassword;
const updatePassword = passwordController.updatePassword;
const deletePassword = passwordController.deletePassword;

router.get('/:userToken', async (req, res) => {
    getPasswords(dbObj, req.params.userToken).then( (result) => {
        res.send(result);
    })
});

router.post('/add/:userToken', (req, res) => {
    addPassword(dbObj, req.body.service, req.body.username, req.body.password, req.params.userToken).then( (result) => {
        res.json(result)
    });
});

router.put('/update/:accountID', (req, res) => {
    updatePassword(dbObj,req.params.accountID, req.body.service, req.body.username, req.body.password)
        .then( result => res.json(result) ).catch( err => console.log(err) );
})

router.delete('/delete/:accountID', (req, res) => {
    deletePassword(dbObj, req.params.accountID).then( result => res.json(result) )
        .catch(err => res.json(err))
})

module.exports = router;
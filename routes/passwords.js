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

router.get('/:userid', async (req, res) => {
    getPasswords(dbObj, req.params.userid).then( (result) => {
        res.send(result);
    })
});

router.post('/add/:userid', (req, res) => {
    addPassword(dbObj, req.body.service, req.body.username, req.body.password, req.params.userid).then( (result) => {
        res.json(result)
    });
});

router.put('/update/:accountID', (req, res) => {
    updatePassword(dbObj,req.params.accountID, req.body.service, req.body.username, req.body.password)
        .then( (result) => {
            res.json(result.value);
        }
    ).catch( err => console.log(err) );
})

router.delete('/delete/:accountID', (req, res) => {
    deletePassword(dbObj, req.params.accountID).then( result => res.json({message:result.deletedCount}))
    .catch(err => res.json(err))
})

module.exports = router;
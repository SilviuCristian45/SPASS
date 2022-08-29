import express from 'express'
import {db} from '../database'
import {addPassword, getPasswords, updatePassword, deletePassword} from '../controllers/passwordController'

export const router = express.Router()
//Database connection
let dbObj;
db.then( () => dbObj = db).catch( err => console.log(err))

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
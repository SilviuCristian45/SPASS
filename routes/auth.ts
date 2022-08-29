import express from 'express'
export const router = express.Router()

import {logUser as loginUser, registerUser} from '../controllers/authController'

let dbObj: any;
import {db} from '../database' 
db.then(db => dbObj = db).catch(err => console.log(err))

//login 
router.post('/login', (req, res) => {
    loginUser(dbObj, req.body.email, req.body.password).then( result => res.json(result));
})

//register
router.post('/register', (req, res) => {
    registerUser(dbObj, req.body.email, req.body.password).then( result => res.json(result) );
})

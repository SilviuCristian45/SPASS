const express = require('express');
const router = express.Router()

let dbObj;
const con = require('../database');

//AICI SE AFLA RUTELE PT USERI , si am nevoie de CRUD , deci e nevoie de db, gen getUser:id
router.get('/', (req, res) => {
    res.json({message:"users"})
})
 
module.exports = router;
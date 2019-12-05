const router = require('express').Router();
const User = require('../models/user-model');

router.route('/').get((req,res)=>{
    User.find({},(err,data)=>{
        if(err){
            res.status(400).json('Error:'+ err);
        }
        else{
            res.json(data);
        }
    })
})

router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const newUser = new User({username});
    newUser.save((err,data)=>{
        if(err){
            res.status(400).json('Error:'+ err);
        }
        else{
            console.log("user added");
            res.json(data);
        }
    })
})

module.exports = router;
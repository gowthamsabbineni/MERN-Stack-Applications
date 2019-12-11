const router =require('express').Router();
const employeeModel = require('../models/employeeModel');

router.route('/signin').post((req,res)=>{
    const employeeid = req.body.employeeid;
    employeeModel.findOne({employeeid:employeeid})
    .then(data=>{
        if(data.role === 'admin' && data.password === req.body.password){
            res.json({status:'success',employeeObj:data})
        }
        else{
            res.status(400).json({status:'failed',employeeObj:null,Error:'Access Denied or Wrong Password'});
        }
    })
    .catch(err=>{
        res.status(400).json({status:'failed',employeeObj:null, Error:'No User found'});
    })
})
module.exports = router;
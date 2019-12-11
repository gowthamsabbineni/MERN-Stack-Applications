const router =require('express').Router();
const employeeModel = require('../models/employeeModel');


router.route('/').get((req,res)=>{
    employeeModel.find(req.body,(err,data)=>{
        if(err){
            console.log('fetch employees call failed');
            res.status(400).json({Error:err});
        }
        else{
            res.json(data);
        }
    })
})

router.route('/managers').get((req,res)=>{
    employeeModel.find({role:"manager"},(err,data)=>{
        if(err){
            console.log('fetch managers call failed');
            res.status(400).json({Error:err});
        }
        else{
            res.json(data);
        }
    })
})
router.route('/inactiveemployees').get((req,res)=>{
    employeeModel.find({status:"inactive"},(err,data)=>{
        if(err){
            console.log('fetch inactive call failed');
            res.status(400).json({Error:err});
        }
        else{
            res.json(data);
        }
    })
})
router.route('/teammembers').get((req,res)=>{
    employeeModel.find({$and:[{role:{$ne:"manager"}},{role:{$ne:"admin"}}]},(err,data)=>{
        if(err){
            console.log('fetch teammembers call failed');
            res.status(400).json({Error:err});
        }
        else{
            res.json(data);
        }
    })
})

router.route('/:id').get((req,res)=>{
    const id= req.params.id;
    employeeModel.findById(id,(err,data)=>{
        if(err){
            console.log(err);
            console.log('fetch employees call failed');
            res.status(400).json({Error:err});
        }
        else{
            res.json(data);
        }
    })
})
const createEmployeeObj=(reqObj)=>{
    return{
        firstname: reqObj.firstname,
        lastname: reqObj.lastname,
        image:reqObj.image,
        employeeid:Number(reqObj.employeeid),
        email: reqObj.email,
        password: reqObj.password,
        joineddate: Date.parse(reqObj.joineddate),
        role: reqObj.role,
        status: reqObj.status,
        address: {
            location:reqObj.address.location,
            flatnumber: reqObj.address.flatnumber,
            city: reqObj.address.city,
            zipcode: Number(reqObj.address.zipcode),
            state: reqObj.address.state,
            country:reqObj.address.country
        }
    }
}
router.route('/add').post((req,res)=>{
    const employeeObj = createEmployeeObj(req.body);
    const newEmployee = new employeeModel(employeeObj);
    newEmployee.save()
    .then(resp=>{
        console.log('employee added successfully');
        res.json(resp);
    })
    .catch(err=>{
        console.log('new employee call failed');
        res.status(400).json({Error:err});
    })
})

router.route('/update/:id').post((req,res)=>{
    console.log("Update Employee",req.body);
    const id = req.params.id;
    const employeeObj = createEmployeeObj(req.body);
    employeeModel.findByIdAndUpdate(id,employeeObj)
    .then(resp=>{
        console.log('employee updated successfully');
        res.json(resp);
    })
    .catch(err=>{
        console.log("employee update failed");
        res.status(400).json({Error:err});
    })
})

router.route('/delete/:id').post((req,res)=>{
    const id = req.params.id;
    employeeModel.findByIdAndDelete(id)
    .then(resp=>{
        console.log("Employee deleted successfully");
        res.json(resp);
    })
    .catch(err=>{
        console.log("delete failed");
        res.status(400).json({Error:err});
    })
})
module.exports = router;

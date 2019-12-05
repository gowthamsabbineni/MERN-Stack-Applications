const router = require('express').Router();
const Exercise = require('../models/exercise-model');

router.route('/').get((req,res)=>{
    Exercise.find({},(err,data)=>{
        if(err){
            res.status(400).json({Error:err});
        }
        else{
            res.json(data);
        }
    })
    //Other way of writing
    // Exercise.find()
    // .then(exercises =>{resp.json(exercises)})
    // .catch(err =>{resp.state(400).json({Error:err})})
})

router.route('/:id').get((req,res)=>{
    const id = req.params.id;
    Exercise.findById(id,(err,data)=>{
        if(err){
            res.status(400).json({Error:err});
        }
        else{
            res.json(data);
        }
    })
})

router.route('/add').post((req,res)=>{
    const newExercise = new Exercise({
        username:req.body.username,
        description:req.body.description,
        duration:Number(req.body.duration),
        date:Date.parse(req.body.date)
    });
    newExercise.save((err,data)=>{
        if(err){
            res.status(400).json({Error:err});
        }else{
            console.log('exercise added successfully');
            res.json(data);
        }
    })
})

router.route('/update/:id').post((req,res)=>{
    const id = req.params.id;
    Exercise.findById(id,(err,exerciseObj)=>{
        exerciseObj.username = req.body.username;
        exerciseObj.description=req.body.description;
        exerciseObj.duration=Number(req.body.duration);
        exerciseObj.date=Date.parse(req.body.date);
        
        exerciseObj.save((err,data) =>{
            if(err){
                res.status(400).json({Error:err});
            }else{
                console.log('exercise updated successfully');
                res.json(data);
            }
        })
    })
})

router.route('/delete/:id').delete((req,res)=>{
    const id= req.params.id;
    Exercise.findByIdAndDelete(id,(err,data)=>{
        if(err){
            res.status(400).json({Error:err});
        }else{
            console.log('exercise deleted successfully');
            res.json(data);
        }
    })
})

module.exports = router;
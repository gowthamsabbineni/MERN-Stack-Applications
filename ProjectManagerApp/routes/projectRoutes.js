const router =require('express').Router();
const projectModel = require('../models/projectModel');

router.route('/').get((req,res)=>{
    projectModel.find(req.body)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(400).json({Error:err});
    })
})
router.route('/activeprojects').get((req,res)=>{
    console.log('active');
    projectModel.find({status:'active'})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(400).json({Error:err});
    })
})

router.route('/:id').get((req,res)=>{
    const id = req.params.id; 
    projectModel.findById(id)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(400).json({Error:err})
    })
})

router.route('/delete/:id').post((req,res)=>{
    const id= req.params.id;
    projectModel.findByIdAndDelete(id)
    .then(resp=>{
        res.json(resp);
    })
    .catch(err=>{
        res.status(400).json({Error:err})
    })
})

const createProjectObj=(reqObj)=>{
    console.log('create project req backend',reqObj)
    return{
        projectname:reqObj.projectname,
        description:reqObj.description,
        client:reqObj.client,
        startdate:Date.parse(reqObj.startdate),
        status:reqObj.status,
        manager:reqObj.manager,
        projectmembers:reqObj.projectmembers
    }
}

router.route('/createproject').post((req,res)=>{
    const projectObj = createProjectObj(req.body);
    const newProject = new projectModel(projectObj);
    console.log(newProject);
    newProject.save()
    .then(resp=>{
        res.json(resp);
    })
    .catch(err=>{
        res.status(400).json({"Error":err});
    })
})

router.route('/editproject/:id').post((req,res)=>{
    const id= req.params.id;
    console.log("edit project",id,req.body);
    const projectObj = createProjectObj(req.body);
    projectModel.findByIdAndUpdate(id,projectObj)
    .then(resp=>{
        res.json(resp);
    })
    .catch(err=>{
        res.status(400).json({Error:err});
    })
})

module.exports = router;
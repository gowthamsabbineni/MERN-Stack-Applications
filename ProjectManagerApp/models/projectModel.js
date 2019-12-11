const mongoose = require('mongoose');
const schema = mongoose.Schema;

// const ProjectMembersSchema = new schema({
//     email:{Type:String},
//     name:{Type:String},
//     role:{Type:String}
// })
const ProjectSchema = new schema({
    projectname:{type:String, required: true, unique:true },
    description:{type:String},
    client:{type:String},
    startdate:{type:Date},
    status:{type:String},
    manager:{type:String},
    projectmembers:[{
        employeeid:{type:Number},
        name:{type:String},
        role:{type:String}
    }]
}, {
    timestamps:true
}
)

const Projects = mongoose.model('projects',ProjectSchema);

module.exports = Projects;
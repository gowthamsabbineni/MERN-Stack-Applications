const mongoose = require('mongoose');
const schema = mongoose.Schema;

// const addressSchema = new schema({
//     location: { type: String },
//     flatnumber: { type: String },
//     city: { type: String },
//     zipcode: { type: Number },
//     state: { type: String },
//     country:{type:String}
// }) 
const employeeSchema = new schema({
    firstname: { type: String },
    lastname: { type: String},
    image:{type:String},
    employeeid:{ type: Number, unique:true},
    email: { type: String},
    password: { type: String},
    joineddate: { type: Date },
    role: { type: String },
    status:{type: String},
    address: {
        location: { type: String },
        flatnumber: { type: String },
        city: { type: String },
        zipcode: { type: Number },
        state: { type: String },
        country:{type:String}
    }
}, { timestamps: true }
)

const Employee = mongoose.model('employee',employeeSchema);

module.exports = Employee;

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
    firstname: { type: String, required: true, minlength: 3 },
    lastname: { type: String, required: true, minlength: 3 },
    image:{type:String},
    employeeid:{ type: Number, minlength:4, unique:true},
    email: { type: String, required: true, unique:true },
    password: { type: String, minlength: 6 },
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

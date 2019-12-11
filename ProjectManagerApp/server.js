const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,'useFindAndModify':false});
const connection = mongoose.connection;
connection.once('open',(err,resp)=>{
    if(err){
        console.log('Failed to establish connection with mongoDB server');
    }
    else{
        console.log('Connected to MongoDB server');
    }
})
const projectRoutes = require('./routes/projectRoutes');
app.use('/projects',projectRoutes);

const employeeRoutes = require('./routes/employeeRoutes');
app.use('/employees',employeeRoutes);

const authRoutes = require('./routes/authenticationRoutes');
app.use('/auth',authRoutes);

app.listen(port,()=>{
    console.log('app is listening to port '+ port);
})

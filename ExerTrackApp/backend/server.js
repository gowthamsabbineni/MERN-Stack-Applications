const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors()); // CORS middleware
app.use(express.json()); // allows us to parse JSON

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology: true});

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open',(err, resp)=>{
      if(err){
          throw err;
      }
      else{
        console.log("MongoDB database connection established successfully"); 
      }
})
/*
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully"); 
})
*/

//For Routing
const userRouter = require('./routes/users');
const exerciseRouter = require('./routes/exercises');

app.use('/users',userRouter);
app.use('/exercises',exerciseRouter);

app.listen(port,()=>{
    console.log('Server is running on port:', port)
})
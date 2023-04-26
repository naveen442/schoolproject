const express=require('express');
var cors = require('cors')
require('dotenv').config();
const connectDB=require('./config/db');
const port=process.env.PORT ||5000;
const goalroutes=require('./routes/goalRoutes');
const userroutes=require('./routes/userRoutes');
const color=require('colors');
const app=express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use('/api/goals',goalroutes)
app.use('/api/users',userroutes)


app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})
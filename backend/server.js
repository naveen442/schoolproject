const express=require('express');
require('dotenv').config();
const connectDB=require('./config/db');
const port=process.env.PORT ||5000;
const routes=require('./routes/goalRroutes');
const color=require('colors');
const app=express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api/goals',routes)
app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})
const Goal=require('../model/goalsmodel');

const getgoals=async(req,res)=>{
    const getgaols=await Goal.find();
    console.log(`getgoals${getgaols}`)
res.status(201).json(getgaols)
}
const postgoals=async(req,res)=>{
   
    if(!req.body.text){
        res.status(400).json({
            errormessage:"name is empty plz enter the name"
        })
    }  
    else{
        const postgoals= await Goal.create({
            text:req.body.text
            
        })
        console.log(`postgoals${postgoals}`)
        res.status(200).json(postgoals)
    }
   
    }
    const updategoals=async(req,res)=>{
        const updateid=await Goal.findById(req.params.id);
        if(!updateid){
            res.status(400).json({
                message:"goal not found"
            })
        }
     const updategoals=await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true
     })
        res.status(201).json(updategoals)
        }
        const deletegoals=async(req,res)=>{
            const deleteid=await Goal.findById(req.params.id);
            if(!deleteid){
                res.status(400).json({
                    message:"goal not found"
                })
            }
            else{
                const deletegaols=await Goal.findByIdAndRemove(deleteid);
                console.log(deletegaols);
                res.status(201).json(deletegaols)
            }
            
            }
                    
module.exports={
    getgoals,
    postgoals,
    updategoals,  
    deletegoals
}
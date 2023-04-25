const Goal=require('../model/goalsmodel');
const User=require('../model/usermodel');
const getgoals=async(req,res)=>{
    const getgaols=await Goal.find({user:req.user.id});
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
            text:req.body.text,
            user:req.user.id
            
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
       const user=await User.findById(req.user.id)
       if(!user){
res.status(401).json({
    message:"user not found"
})   
       } 
       if(updateid.user.toString() !==user.id){
        res.status(401).json({
            message:"user not authorised"
        })   
       }
        else{
            const updategoals=await Goal.findByIdAndUpdate(req.params.id,req.body,{
                new:true
             })
             console.log(`updategoals ${updategoals}`)
                res.status(201).json(updategoals)
        }
        console.log(`updateid ${updateid}`)
        }
        const deletegoals=async(req,res)=>{
            const deleteid=await Goal.findById(req.params.id);
     
            if(!deleteid){
                res.status(400).json({
                    message:"goal not found"
                })
            }
            const user=await User.findById(req.user.id)
            if(!user){
                res.status(401).json({
                    message:"user not found"
                })   
                       } 
                       if(deleteid.user.toString() !==user.id){
                        res.status(401).json({
                            message:"user not authorised"
                        })   
                       }
            else{
                const deletegaolsoverall=await Goal.findByIdAndRemove(deleteid);
                console.log(`deletegoalsoverall ${ deletegaolsoverall}`);
                res.status(201).json(deletegaolsoverall)
            }
          
            }
         
module.exports={
    getgoals,
    postgoals,
    updategoals,  
    deletegoals
}
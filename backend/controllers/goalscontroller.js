const getgoals=async(req,res)=>{
res.status(201).json({
    message:"get form controller"
})
}
const postgoals=async(req,res)=>{
    console.log(req.body.name);
    if(!req.body.name){
        res.status(400).json({
            errormessage:"name is empty plz enter the name"
        })
    }
    else{
        res.status(200).json({
            message:"post form controller"
        })
    }
   
    }
    const updategoals=async(req,res)=>{
        res.status(201).json({
            message:`update form controller ${req.params.id}`
        })
        }
        const deletegoals=async(req,res)=>{
            res.status(201).json({
                message:`delete form controller ${req.params.id}`
            })
            }
                    
module.exports={
    getgoals,
    postgoals,
    updategoals,
    deletegoals
}
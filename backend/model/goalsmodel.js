const mongoose=require('mongoose');

const goalschema=mongoose.Schema(
    {
        user:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"user",
          required:true
        },
        text:{
            type:String,
            required:[true,'please add a text value'],
        }
    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model('goal',goalschema)
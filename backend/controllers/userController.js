const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const User=require('../model/usermodel');

// const registerUser=async(req,res)=>{
//     const {name,email,password}=req.body;
//     if(!name || !email || !password){
//         res.status(400).json({
//             message:"please add all fields"
//         })
//     }
//    const userExits=await User.findOne({email});
//    if( userExits){
//     res.status(400).json({
//         message:"user already exists"
//     })
//    }
//    const salt=await bcrypt.genSalt(10);
//    const hashpassword=await bcrypt.hash(password,salt);
//   const user=await User.create({
//     name,
//     email,
//     password:hashpassword
//   })
//   if(user){
//     res.status(200).json({
//         _id:user.id,
//         name:user.name,
//         email:user.email,
//         password:user.password
//     })
  
//   }
//   else{
//     res.status(400).json({
//         message:"invalid user data"
//     })
    
//   }
   

// }
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields",
      });
    }
  
    try {
      const userExists = await User.findOne({ email });
  
      if (userExists) {
        return res.status(400).json({
          message: "User with this email already exists",
        });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
  
      const user = await User.create({
        name,
        email,
        password: hashPassword,
      });
  
      return res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        token:generateJWT(user.id),
        message: "User register successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  };
  
// const loginUser=async(req,res)=>{
//     const {email,password}=req.body
//     const user= await User.findone({email});
//     if(user && (await bcrypt.compare(password,user.password))){
//   res.json({
//     name: user.name,
//     email: user.email,
//     password: user.password,
// })
//     }
//     else{
//         res.status(400).json({
//             message:"Invalid credentials"
//         })
//     }
//     res.status(200).json({
//         message:"user login successfully"
//     })
//     }
// const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
  
//     if (user && (await bcrypt.compare(password, user.password))) {
//       res.json({
//         name: user.name,
//         email: user.email,
//         password: user.password,
//       });
//       res.status(200).json({
//         message: "User logged in successfully",
//       });
//     } else {
//       res.status(400).json({
//         message: "Invalid credentials",
//       });
//     }
//   };
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        token:generateJWT(user.id),
        message: "User logged in successfully",
      });
      return;
    } else {
      res.status(400).json({
        message: "Invalid credentials", 
      });
    }
  };
    const getme=async(req,res)=>{
        const {_id,name,email}=await User.findById(req.user.id);
        res.status(200).json({
          id:_id,
          name,
          email
        })
        }

        const generateJWT =(id) =>{
            return jwt.sign({id},process.env.JWT_SECRET,{
                expiresIn:'30d'
            });
        }
module.exports={
    registerUser,
    loginUser,
    getme
}
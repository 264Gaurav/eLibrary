const express=require('express');
const router=express.Router();

const User=require('../models/Person');


router.post('/' , async(req,res)=>{
    try{
        const data=req.body;
        const newUser=new User(data);
        
        //save the new user to DB
        const response=await newUser.save();
        console.log(`data saved in DB  ${response}`);
        res.status(200).json(response);
    }catch(err){
        console.error('Error:', err.message);
        res.status(500).send(`Server Error ${err.message}`);
        return;  // To stop the execution of further code if error occurs.
    }

    // console.log(req.body);
    // res.send('User ROUTE , User LOGIN PAGE');
})


//get users from DB
router.get('/',async(req,res)=>{
    try{
        const response=await User.find();
        res.status(200).json(response);
        console.log('user data fetched.');
    }catch(err){
        console.error('Error:', err.message);
        res.status(500).send(`Server Error while fetching data ${err.message}`);
        return;  // To stop the execution of further code if error occurs.
    }
})


router.get('/:user' , async(req,res)=>{
   try{
      const userType=req.params.user;
      if(userType=='admin' || userType=='author' || userType=='reader'){
        const response=await User.find({user:userType});
        res.status(200).json(response);
        console.log(userType , ' data fetched.');
      }
       else{
        res.status(404).send('Invalid user type');
       }
      
   }catch(err){
    console.error('Error:', err.message);
    res.status(500).send(`Server Error ${err.message}`);
    return;  // To stop the execution of further code if error occurs.
   }
})

router.put('/:id', async(req,res)=>{
    try{
        const userId=req.params.id;  //extract the id from the URL parameters
        const updatedUserData=req.body; //updated data extracting 

        const response=await User.findByIdAndUpdate(userId,updatedUserData,{
            new:true,
            runValidators:true
        });

        if(!response){
            return res.status(404).json({error:'User not found'});
        }
        console.log('user updated');
        res.status(200).json('User profile updated' , response);
    }catch(err){
        console.error('Error:', err.message);
        res.status(500).send(`Server Error ${err.message}`);
    }
})


router.delete('/:id', async(req,res)=>{
    try{
        const userId=req.params.id;  //extract the id from the URL parameters
        const response=await User.findByIdAndDelete(userId);

        if(!response){
            res.status(404).json({error:'User not found'});
        }
        console.log("User account deleted");
        res.status(200).json("User account deleted successfully.");
    }catch(err){
        console.error('Error:', err.message);
        res.status(500).send(`Server Error ${err.message}`);
        return;  // To stop the execution of further code if error occurs.
    }
})






module.exports=router;
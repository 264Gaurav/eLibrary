const express=require('express');
const router=express.Router();

const Notes=require('../models/Notes');


router.get('/', async(req,res)=>{
    try{
        const response=await Notes.find();
        res.status(200).json(response);
    }catch(err){
        console.error('Error:', err.message);
        res.status(500).send(`Server Error while fetching data ${err.message}`);
        return;  // To stop the execution of further code if error occurs.
    }
})


router.post('/', async(req,res)=>{
    try{
        const data=req.body;
        const newNote=new Notes(data);
        
        //save the new note to DB
        const response=await newNote.save();
        console.log(`Notes saved in DB  ${response}`);
        res.status(200).json(response);
    }catch(err){
        console.error('Error:', err.message);
        res.status(500).send(`Server Error ${err.message}`);
        return;  // To stop the execution of further code if error occurs.
    }
})





module.exports=router;
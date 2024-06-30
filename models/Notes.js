const mongoose =require('mongoose');

const NotesSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    des:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: new Date()
    },
    author:{
        type:String
    },
    reference:{
        type:String
    }
})


const Notes=mongoose.model('Notes',NotesSchema);

module.exports=Notes;
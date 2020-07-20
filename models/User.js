const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    chat_id:{
        type:Number,
    },
    name:{
        type:String,
        
    },
    purpose:{
        type:String,
        
    },
    purpose_time:{
        type:String,
        
    },
    guruh_id:{
        type:String,
    },
    step_id:{
        type:Number
    },
    pic_dic:{
        type:String, 
    }
})
module.exports = mongoose.model('user',UserSchema);
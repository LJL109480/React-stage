/**
 * Created by Administrator on 2018/10/31.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    header:String,
    post:String,
    info:String,
    salary:String,
    company:String
});
const Users = mongoose.model('Users',userSchema);
module.exports = Users;
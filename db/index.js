/**
 * Created by Administrator on 2018/10/31.
 */
const mongoose = require('mongoose');
module.exports = new Promise((resolve, reject) =>{
    mongoose.connect('mongodb://localhost:27017/gzhipin', {useNewUrlParser:true});
    mongoose.connection.once('open',err=>{
        if(!err){
            console.log('远程仓库关联成功~');
            resolve()
        }else {
            console.log(err);
            reject()
        }
    })
});

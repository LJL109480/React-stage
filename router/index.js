/**
 * Created by Administrator on 2018/10/31.
 */
const express = require('express');
const md5 = require('blueimp-md5');
const Users = require('../models/users');
//获取路由
const Router = express.Router;
//创建路由对象
const router = new Router();
router.use(express.urlencoded({extended:true}));
router.post('/login', async (req, res) => {
//1.获取用户数据
    const {username, password} = req.body;
// 2. 判断用户输入是否合法
    if(!username || !password) {
        res.json({
            "code": 2,
            "msg": "用户输入不合法"
        });
        return
    }
//3.去数据库中查找数据
    try{
      const data =  await Users.findOne({username, password:md5(password)});
        if(data){
            res.json({
                "code": 0,
                "data": {
                   "_id":data.id,
                    "username":data.username,
                    "type":data.type
                }
            });
        }else{
           //用户名或密码错误
            res.json({
                "code": 1,
                "msg": "用户名为密码错误"
            })
        }
    }catch (err){
        res.json({
            "code": 3,
            "msg": "网络不稳定"
        })
    }


});
router.post('/register', async (req, res) => {
    //1. 获取用户数据
    const {username, password, type} = req.body;
    console.log(username, password, type);
   //2. 判断是否合法
    if(!username || !password || !type) {
       res.json({
           "code": 2,
           "msg": "用户输入不合法"
       })
        return
    }
   //3.去数据库中查找用户名是否存在
   //  Users.findOne({username}, (err, data) => {
   //     if(!err){
   //        if(data){
   //            res.json({
   //                "code": 1,
   //                "msg": "用户已存在"
   //            });
   //        }else {
   //            //4.注册成功，保存用户信息
   //           Users.create({username, password:md5(password), type}, (err, data) => {
   //              if(!err){
   //                   res.json({
   //                       code:0,
   //                       data:{
   //                          _id:data.id,
   //                           username:data.username,
   //                           type:data.type
   //                       }
   //                   })
   //              }else {
   //                 res.json({
   //                     "code":3,
   //                     "msg":"网络不稳定，请刷新后重试"
   //                 });
   //              }
   //           })
   //        }
   //     }else{
   //         res.json({
   //             "code":3,
   //             "msg":"网络不稳定，请刷新后重试"
   //         });
   //     }
   //  })
    try{
       const data = await Users.findOne({username});
       if(data){
           res.json({
               "code": 1,
               "msg": "用户已存在"
           });
       }else{
          const data =await  Users.create({username, password:md5(password), type});
           res.json({
               code:0,
               data:{
                   _id:data.id,
                   username:data.username,
                   type:data.type
               }
           })
       }
    }catch (err){
        res.json({
            "code":3,
            "msg":"网络不稳定，请刷新后重试"
        });
    }
});
module.exports = router;

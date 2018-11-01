/**
 * Created by Administrator on 2018/10/31.
 */
const express = require('express');
const db = require('./db');
const router = require('./router');
const app = express();
(async() =>{
    await db;
    app.use(router);
})();
app.listen(4000, err => {
     if(!err) console.log('服务器开启成功~~');
    else console.log(err)
});
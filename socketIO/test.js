/**
 * Created by Administrator on 2018/11/5.
 */
module.exports = function (server) {
    // 得到IO对象
    const io = require('socket.io')(server);
    // 监视连接(当有一个客户连接上时回调)
    io.on('connection', function (socket) {
        //socket代表当前链接上的客户端对象
        console.log('soketio connected');
        // 绑定sendMsg监听, 接收客户端发送的消息
        socket.on('sendMsg', function (data) {
            console.log('服务器接收到浏览器的消息', data);
            // 向所有客户端发送消息(名称, 数据)
            io.emit('receiveMsg', data.name + '_' + data.date);
            //向当前链接上的客户端发送消息
            // socket.emit('receiveMsg', data.name + '_' + data.date);
            console.log('服务器向浏览器发送消息', data)
        })
    })
};
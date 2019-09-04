const express=require('express')
const socket=require('socket.io')

const app=express()

const server=app.listen('3000')


app.use(express.static('public'))


//socket setup

const io=socket(server)

//on incoming connection    
io.on('connection',(socket)=>{
    console.log('socket connected');

    //sending the chat to all connected users
    socket.on('send_chat',(data)=>{
        io.sockets.emit('rec_chat',data)
    })

})

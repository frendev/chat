const express=require('express')
const socket=require('socket.io')
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chat-ebea6.firebaseio.com"
});
const db=admin.firestore()

const app=express()

const server=app.listen('3000')


app.use(express.static('public'))


//socket setup

const io=socket(server)

//on incoming connection    
io.on('connection',(socket)=>{
    console.log('socket connected');
    //geting chats from database
    let chats=db.collection('event-chatroom')
    chats.get().then(snapshot=>{
        snapshot.docs.forEach(doc=>{
            socket.emit('prev_chats',doc.data())
            // console.log(doc.data())
        })
    })
    . catch(err=>console.log(err))

    //sending the chat to all connected users
    socket.on('send_chat',(data)=>{
        chats.add({
            handle:data.chat_handle,
            message:data.chat_message,
            timestamp:data.chat_timestamp
        })
        io.sockets.emit('rec_chat',data)
    })

})

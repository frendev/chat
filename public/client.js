//Connection to the server
const socket=io.connect('http://localhost:3000/')
const form=document.querySelector('#chat-form')

const handle=document.querySelector('#handle')
const message=document.querySelector('#message')
const sendButton=document.querySelector('#send')
const output=document.querySelector('#output')

//sending message(emitting event)
sendButton.addEventListener('click',(e)=>{
    
    socket.emit('send_chat',{
        chat_handle:handle.value,
        chat_message:message.value,
        chat_timestamp:new Date().toTimeString().slice(0,8)
    })
    
}
)

form.addEventListener('submit',(e)=>{
    e.preventDefault()
})

socket.on('rec_chat',data=>{
    output.innerHTML+='<span id=timestamp>'+data.chat_timestamp+'</span>'+ '<p><strong>'+data.chat_handle+'</strong>'+':'+'<span>'+data.chat_message+'</span></p>'
})
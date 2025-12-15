import http from "node:http"
import {Server} from 'socket.io'
import express from 'express'

const app=express() // this doesn't creates a server
// when we do app.listen --> then a http sever is created bts 

const server=http.createServer(app)

const io= new Server(server,{
    cors: {
        origin: '*',
    },
})

const ROOM="group"

io.on('connection', (socket)=>{
    console.log('a user connected')

    socket.on('joinRoom', async(username)=>{
        console.log(`${username} has joined the group!`);

        await socket.join(ROOM);

        // send to all
        // io.to(ROOM).emit('roomNotice', username)

        // broadcast -> to avaoid sending to own
        socket.to(ROOM).emit('roomNotice', username);
    })

    socket.on('chatMessage', (msg)=>{
        socket.to(ROOM).emit('chatMessage', msg);
    })
})



app.get('/', (req, res)=>{
    res.send('<h1>Hello World</h1>')
})

server.listen(4600, ()=>{
    console.log('server running at http://localhost:4600')
})
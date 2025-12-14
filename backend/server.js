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

io.on('connection', (socket)=>{
    console.log('a user connected')
})



app.get('/', (req, res)=>{
    res.send('<h1>Hello World</h1>')
})

server.listen(4600, ()=>{
    console.log('server running at http://localhost:4600')
})
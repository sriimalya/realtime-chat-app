import {io} from "socket.io-client"

export function conncetWS(){
    return io("http://localhost:4600")
}
import express from 'express'
import { createServer } from 'http'
import * as IO from 'socket.io'
import ProcessData from './ProcessData'
import ProcessDataChat from './ProcessDataChat'

class SocketHelper {
    constructor() {
        this.configSocket()
        this.showConnectFromWeb()
        this.io.on('connection', this.listener)
    }
    configSocket = () => {
        this.mSocket = new ProcessData()
        this.mSocketChat = new ProcessDataChat()
        this.app = express()
        this.server = createServer(this.app)
        this.io = IO.listen(this.server)
        this.mSocketChat.setSocket(this.io)
    }
    showConnectFromWeb = () => {
        this.server.listen(3000,() => {
            console.log('Node app is running on port 3000')
        })
        this.app.get('/', (req, res) => {
            res.send('Chat Server is running on port 3000')
        });
    }
    onDisConnect = (socket) => {
        this.mSocket.onDisconnect(socket)
        this.mSocketChat.onDisconnect()
    }
    listener = (socket) => {
        // console.log(`${socket.handshake.query.model}  join`)
        this.mSocket.setSocket(socket)
        socket.on('call', this.mSocket.onCall)
        socket.on('clearUser', this.mSocket.clearUser)
        socket.on('disconnect', () => this.onDisConnect(socket))
        socket.on('startCall', this.mSocket.startCall)
        socket.on('startAnswer', this.mSocket.startAnswer)
        socket.on('endCall', this.mSocket.onEndCall)
        ///chat
        socket.on('getAllData', this.mSocketChat.emitAllData)
        socket.on('sendmsg', this.mSocketChat.onSendMsg)
        socket.on('disconnect', this.mSocketChat.onDisconnect)
        socket.on('typing', this.mSocketChat.onTyping)
    }
}
module.exports = SocketHelper

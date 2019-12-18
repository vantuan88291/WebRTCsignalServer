
const dataMsg = []
class ProcessDataChat {
    constructor() {
    }

    setSocket = (socket) => {
        this.socket = socket
    }
    onSendMsg = (data) => {
        dataMsg.push(data)
        this.socket.emit("newmsg", data)
        // console.log('msg', dataMsg)

    }
    onDisconnect = () => {

    }
    emitAllData = () => {
        this.socket.emit("allData", dataMsg)
    }
    onTyping = (name) => {
        this.socket.emit("isTyping", name)
    }
}
module.exports = ProcessDataChat

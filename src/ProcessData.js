
class ProcessData {
    constructor() {
        this.socket = []
    }

    setSocket = (socket) => {
        if (this.isExistSocket(socket) < 0) {
            this.socket.push(socket)
        }
    }
    isExistSocket = (socket) => {
        for (let i = 0; i < this.socket.length; i++) {
            if (this.socket[i].handshake.query.model === socket.handshake.query.model) {
                return i
            }
        }
        return -1
    }
    isExistModel = (models) => {
        for (let i = 0; i < this.socket.length; i++) {
            if (this.socket[i].handshake.query.model === models) {
                return i
            }
        }
        return -1
    }
    onCall = async (data) => {
        const jsData = await JSON.parse(data)
        const friend = await this.getFriend(jsData.model)
        if(friend) {
            friend.emit("Received", jsData.dataStream)
        }
    }
    getFriend = (model) => {
        for (let i = 0; i < this.socket.length; i++) {
            if (this.socket[i].handshake.query.model === model) {
                return this.socket[i]
            }
        }
        return null
    }
    clearUser = async (model) => {
        const position = await this.isExistModel(model)
        await this.socket.splice(position, 1)
        console.log(`clear ${model}`)
    }
    startCall = async (data) => {
        const jsData = await JSON.parse(data)
        const friend = this.getFriend(jsData.answer)
        console.log(`${jsData.call} is calling`)
        if(friend) {
            friend.emit("inComing", jsData.call)
        }
    }
    startAnswer = async (data) => {
        const jsData = await JSON.parse(data)
        console.log(`${jsData.answer} is answer`)
        const friend = this.getFriend(jsData.call)
        console.log(`send it to ${friend.handshake.query.model}`)

        if(friend) {
            friend.emit("onAnswerAccept")
        }
    }
    onEndCall = (model) => {
        const friend = this.getFriend(model)
        if(friend) {
            friend.emit("onEndCall")
        }
    }
    onDisconnect = (socket) => {
        this.clearUser(socket.handshake.query.model)
    }
}
module.exports = ProcessData

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dataUser = [];

var ProcessData = function ProcessData() {
    var _this = this;

    _classCallCheck(this, ProcessData);

    this.setSocket = function (socket) {
        console.log('new user join');
        _this.socket = socket;
    };

    this.onSendMsg = function (msg) {
        console.log('msg', msg);
    };

    this.onDisconnect = function () {
        console.log('user left');
    };

    this.addUser = function (data) {
        dataUser.push(data);
        console.log('list user', dataUser);
    };
};

module.exports = ProcessData;
'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _socket = require('socket.io');

var IO = _interopRequireWildcard(_socket);

var _ProcessData = require('./ProcessData');

var _ProcessData2 = _interopRequireDefault(_ProcessData);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SocketHelper = function SocketHelper() {
    var _this = this;

    _classCallCheck(this, SocketHelper);

    this.configSocket = function () {
        _this.mSocket = new _ProcessData2.default();
        _this.app = (0, _express2.default)();
        _this.server = (0, _http.createServer)(_this.app);
        _this.io = IO.listen(_this.server);
    };

    this.showConnectFromWeb = function () {
        _this.server.listen(3000, function () {
            console.log('Node app is running on port 3000');
        });
        _this.app.get('/', function (req, res) {
            res.send('Chat Server is running on port 3000');
        });
    };

    this.listener = function (socket) {
        _this.mSocket.setSocket(socket);
        socket.on('initUser', _this.mSocket.addUser);
        socket.on('sendmsg', _this.mSocket.onSendMsg);
        socket.on('disconnect', _this.mSocket.onDisconnect);
    };

    this.configSocket();
    this.showConnectFromWeb();
    this.io.on('connection', this.listener);
};

module.exports = SocketHelper;
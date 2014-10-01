var SocketProxy = function () {
	this.socket = null;
};

SocketProxy.prototype = {
	broadcast: function () {
		if (this.socket) {
			console.log(arguments);
			this.socket.broadcast.emit('reset');
			console.log('broadcasted');
		}
	}
}

var socket = new SocketProxy();

module.exports = socket;
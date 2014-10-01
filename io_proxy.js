var IoProxy = function () {
	this.io = null;
};

IoProxy.prototype = {
	broadcast: function (message,data) {
		if (this.io) {
			this.io.sockets.emit(message,data);
		}
	}
}

module.exports = new IoProxy();
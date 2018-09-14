var SESSION_KEY = 'WEN_JIAN_BAO_DE_SESSION';

var Session = {
	get: function () {
		return wx.getStorageSync(SESSION_KEY) || null;
	},

	set: function (session) {
		wx.setStorageSync(SESSION_KEY, session);
	},

	clear: function () {
		wx.removeStorageSync(SESSION_KEY);
	},
};

module.exports = Session;
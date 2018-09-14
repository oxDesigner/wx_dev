App({
	onLaunch: function () {},
	onShow: function () {},
	onHide: function () {},
	globalData: {
		hasLogin: false,
		openid: null,
		userId: null,
	},
	setGlobalData: newData => {
		this.globalData = {
			...this.globalData,
			...newData
		}
	},
	getGlobalData: key => {
		if (Array.isArray(key)) {
			const result = {};
			key.forEach(item => {
				result[item] = this.globalData[item]
			});
			return result;
		} else if (typeof key === 'string') {
			return this.globalData[item]
		}
	},
	//主要在fetch方法中使用此封装内容
	showToast: (title, icon = 'none') => {
		wx.showToast({
			title,
			icon,
			duration: 1500,
			mask: false,
		});
	}
})
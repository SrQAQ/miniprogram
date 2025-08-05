Page({
	data: {
			inputValue: '',
			qrCodeUrl: ''
	},
	onInputChange(e) {
			this.setData({
					inputValue: e.detail.value
			});
	},
	generateQRCode() {
			const text = this.data.inputValue;
			if (text) {
					const encodedText = encodeURIComponent(text);
					const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedText}`;
					this.setData({
							qrCodeUrl: apiUrl
					});
			} else {
					wx.showToast({
							title: '请输入文本',
							icon: 'none'
					});
			}
	}
});
	
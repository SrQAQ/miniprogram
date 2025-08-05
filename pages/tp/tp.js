Page({
	data: {
			imagePath: '',
			defaultImage: '../image/JPEG.jpeg',
			formatOptions: ['JPEG'],
			selectedFormat: 'JPEG'
	},
	chooseImage: function () {
			var that = this;
			wx.chooseImage({
					count: 1,
					success: function (res) {
							that.setData({
									imagePath: res.tempFilePaths[0]
							});
					}
			});
	},
	onFormatChange: function (e) {
			this.setData({
					selectedFormat: this.data.formatOptions[e.detail.value]
			});
	},
	saveAndConvertImage: function () {
			var that = this;
			if (!that.data.imagePath) {
					wx.showToast({
							title: '请先选择图片',
							icon: 'none'
					});
					return;
			}
			wx.getImageInfo({
					src: that.data.imagePath,
					success: function (info) {
							var targetFormat = that.data.selectedFormat.toLowerCase();
							var sourceFormat = info.type;
							if (sourceFormat === targetFormat) {
									wx.saveImageToPhotosAlbum({
											filePath: that.data.imagePath,
											success: function () {
													wx.showToast({
															title: '保存成功',
															icon: 'success'
													});
											},
											fail: function () {
													wx.showToast({
															title: '保存失败',
															icon: 'none'
													});
											}
									});
							} else {
									wx.showModal({
											title: '提示',
											content: '当前选择保存为JPEG格式，但原图片不是JPEG格式，无法转换，只能保存原格式图片。',
											confirmText: '保存原格式',
											success: function (res) {
													if (res.confirm) {
															wx.saveImageToPhotosAlbum({
																	filePath: that.data.imagePath,
																	success: function () {
																			wx.showToast({
																					title: '保存成功',
																					icon: 'success'
																			});
																	},
																	fail: function () {
																			wx.showToast({
																					title: '保存失败',
																					icon: 'none'
																			});
																	}
															});
													}
											}
									});
							}
					}
			});
	}
});
Page({
  data: {
    brand: '',
    model: '',
    system: '',
    language: '',
    screenWidth: '',
    screenHeight: '',
    networkType: '',
    pixelRatio: '',
    wechatVersion: ''
  },
  onLoad() {
    // 获取设备信息
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          brand: res.brand,
          model: res.model,
          system: res.system,
          language: res.language,
          screenWidth: res.screenWidth,
          screenHeight: res.screenHeight,
          pixelRatio: res.pixelRatio,
          wechatVersion: res.version
        });
      }
    });
    // 获取网络类型
    wx.getNetworkType({
      success: (res) => {
        this.setData({
          networkType: res.networkType
        });
      }
    });
  }
});
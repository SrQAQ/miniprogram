Page({
  data: {
    time: '12:24',
    speedValue: '0',
    speedMb: '0.00',
    equivalentSpeed: '',
    phoneBrand: '',
    phoneModel: '',
    systemVersion: '',
    wechatVersion: ''
  },
  onLoad() {
    this.getDeviceInfo();
    this.reTest();
  },
  getDeviceInfo() {
    wx.getSystemInfo({
      success: (res) => {
        console.log('获取设备信息成功:', res);
        this.setData({
          phoneBrand: res.brand,
          phoneModel: res.model,
          systemVersion: res.system,
          wechatVersion: res.version
        });
      },
      fail: (err) => {
        console.error('获取设备信息失败:', err);
        wx.showToast({
          title: '获取设备信息失败',
          icon: 'none'
        });
      }
    });
  },
  reTest() {
    const testFileUrl = 'https://www.baidu.com'; // 替换为实际可用于测速的文件地址，文件大小已知
    const fileSizeInBytes = 1024 * 1024; // 假设测试文件1MB，需根据实际文件大小调整
    const startTime = Date.now();
    wx.downloadFile({
      url: testFileUrl,
      success: (res) => {
        const endTime = Date.now();
        const timeTakenInSeconds = (endTime - startTime) / 1000;
        const speedInBytesPerSecond = fileSizeInBytes / timeTakenInSeconds;
        const speedInKbPerSecond = speedInBytesPerSecond / 1024;
        const speedInMbPerSecond = speedInKbPerSecond / 1024;
        let equivalentSpeed = '';
        if (speedInMbPerSecond >= 1000) {
          equivalentSpeed = '1000M宽带及以上';
        } else if (speedInMbPerSecond >= 500) {
          equivalentSpeed = '500M宽带';
        } else if (speedInMbPerSecond >= 100) {
          equivalentSpeed = '100M宽带';
        } else {
          equivalentSpeed = '低于100M宽带';
        }
        this.setData({
          speedValue: Math.round(speedInKbPerSecond),
          speedMb: speedInMbPerSecond.toFixed(2),
          equivalentSpeed: equivalentSpeed
        });
      },
      fail: (err) => {
        console.error('测速失败:', err);
        wx.showToast({
          title: '测速失败，请检查网络',
          icon: 'none'
        });
      }
    });
  }
});    
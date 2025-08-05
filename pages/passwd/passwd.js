Page({
  data: {
    password: '',
    length: 12,
    includesLower: true,
    includesUpper: true,
    includesNumber: true,
    includesSymbol: true
  },
  onLengthChange(e) {
    this.setData({
      length: e.detail.value
    });
  },
  onComplexityChange(e) {
    const values = e.detail.value;
    this.setData({
      includesLower: values.includes('lower'),
      includesUpper: values.includes('upper'),
      includesNumber: values.includes('number'),
      includesSymbol: values.includes('symbol')
    });
  },
  generatePassword() {
    let charset = '';
    if (this.data.includesLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (this.data.includesUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (this.data.includesNumber) charset += '0123456789';
    if (this.data.includesSymbol) charset += '!@#$%^&*';

    let password = '';
    for (let i = 0; i < this.data.length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }

    this.setData({
      password
    });
  },
  copyPassword() {
    wx.setClipboardData({
      data: this.data.password,
      success: () => {
        wx.showToast({
          title: '已复制到剪贴板',
          icon: 'success'
        });
      }
    });
  }
});    
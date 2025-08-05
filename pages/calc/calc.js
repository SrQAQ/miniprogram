Page({
  data: {
    height: '',
    weight: '',
    gender: 'male',
    showResult: false,
    resultMessage: '',
    idealWeight: '',
    bmi: ''
  },
  handleHeightInput(e) {
    this.setData({
      height: e.detail.value
    });
  },
  handleWeightInput(e) {
    this.setData({
      weight: e.detail.value
    });
  },
  handleGenderChange(e) {
    this.setData({
      gender: e.detail.value
    });
  },
  calculateBMI() {
    const height = parseFloat(this.data.height);
    const weight = parseFloat(this.data.weight);
    const gender = this.data.gender;

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      wx.showToast({
        title: '请输入正确的身高和体重',
        icon: 'none'
      });
      return;
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    let resultMessage = '';
    let idealWeight;

    if (gender === 'male') {
      idealWeight = (height - 80) * 0.7;
    } else {
      idealWeight = (height - 70) * 0.6;
    }

    if (bmi < 18.5) {
      resultMessage = '你的体重太轻,要多吃点哟!';
    } else if (bmi < 24) {
      resultMessage = '你的体重正常，继续保持！';
    } else {
      resultMessage = '你的体重偏重，注意饮食和锻炼！';
    }

    this.setData({
      showResult: true,
      resultMessage,
      idealWeight: idealWeight.toFixed(1),
      bmi: bmi.toFixed(2)
    });
  }
});    
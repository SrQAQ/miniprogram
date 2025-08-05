Page({
  data: {
    preTaxSalary: 0,
    publicFundsRate: 5,
    publicFunds: 0,
    socialSecurity: 0,
    personalTax: 0,
    afterTax: 0,
    medical: 0,
    pension: 0,
    unemployment: 0,
    workInjury: 0,
    maternity: 0
  },

  handlePreTaxSalaryInput(e) {
    const preTax = parseFloat(e.detail.value) || 0;
    this.calculate(preTax);
  },

  calculate(preTax) {
    // 计算公积金
    const publicFunds = preTax * (this.data.publicFundsRate / 100);
    // 计算社保总和
    const social = this.data.medical + this.data.pension + this.data.unemployment + this.data.workInjury + this.data.maternity;
    // 简化的个税计算（仅作示例，实际需按税法调整）
    const taxableIncome = preTax - social - publicFunds - 5000; // 假设起征点5000
    const personalTax = taxableIncome > 0 ? taxableIncome * 0.1 : 0; // 简化税率10%
    const afterTax = preTax - social - publicFunds - personalTax;

    this.setData({
      preTaxSalary: preTax,
      publicFunds: publicFunds.toFixed(2),
      socialSecurity: social.toFixed(2),
      personalTax: personalTax.toFixed(2),
      afterTax: afterTax.toFixed(2)
    });
  },

  handleMedicalInput(e) {
    const val = parseFloat(e.detail.value) || 0;
    this.data.medical = val;
    this.calculate(this.data.preTaxSalary);
  },

  handlePensionInput(e) {
    const val = parseFloat(e.detail.value) || 0;
    this.data.pension = val;
    this.calculate(this.data.preTaxSalary);
  },

  handleUnemploymentInput(e) {
    const val = parseFloat(e.detail.value) || 0;
    this.data.unemployment = val;
    this.calculate(this.data.preTaxSalary);
  },

  handleWorkInjuryInput(e) {
    const val = parseFloat(e.detail.value) || 0;
    this.data.workInjury = val;
    this.calculate(this.data.preTaxSalary);
  },

  handleMaternityInput(e) {
    const val = parseFloat(e.detail.value) || 0;
    this.data.maternity = val;
    this.calculate(this.data.preTaxSalary);
  }
});
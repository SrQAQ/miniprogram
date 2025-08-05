Page({
	data: {
			display: '0',
			process: '',
			operand1: null,
			operand2: null,
			operator: null,
			waitingForSecondOperand: false,
			hasCalculated: false
	},

	// 处理数字和小数点输入
	input(e) {
			const { value } = e.currentTarget.dataset;
			const { display, process, waitingForSecondOperand, hasCalculated } = this.data;

			if (hasCalculated) {
					this.setData({
							display: value,
							process: value,
							operand1: null,
							operand2: null,
							operator: null,
							waitingForSecondOperand: false,
							hasCalculated: false
					});
					return;
			}

			if (waitingForSecondOperand) {
					this.setData({
							display: value,
							process: process + value,
							waitingForSecondOperand: false
					});
			} else {
					this.setData({
							display: display === '0'? value : display + value,
							process: process === '0'? value : process + value
					});
			}
	},

	// 清除显示屏和过程
	clear() {
			this.setData({
					display: '0',
					process: '',
					operand1: null,
					operand2: null,
					operator: null,
					waitingForSecondOperand: false,
					hasCalculated: false
			});
	},

	// 删除最后一个字符
	delete() {
			const { display, process } = this.data;
			if (display.length > 1) {
					const newDisplay = display.slice(0, -1);
					const newProcess = process.slice(0, -1);
					this.setData({
							display: newDisplay,
							process: newProcess
					});
			} else {
					this.setData({
							display: '0',
							process: ''
					});
			}
	},

	// 处理运算符输入
	setOperator(e) {
			const { value } = e.currentTarget.dataset;
			const { display, process, operand1, operator, waitingForSecondOperand } = this.data;

			const inputValue = parseFloat(display);

			if (waitingForSecondOperand) {
					this.setData({ operator: value });
					return;
			}

			if (operand1 === null) {
					this.setData({
							operand1: inputValue,
							operator: value,
							process: display + ' ' + value,
							waitingForSecondOperand: true
					});
			} else if (operator) {
					const result = this.calculate(operand1, inputValue, operator);

					this.setData({
							operand1: result,
							display: String(result),
							process: display + ' ' + value,
							operator: value,
							waitingForSecondOperand: true
					});
			}
	},

	// 执行计算
	calculatePress() {
			const { operand1, display, operator, process } = this.data;
			const inputValue = parseFloat(display);

			if (operator && operand1!== null) {
					const result = this.calculate(operand1, inputValue, operator);

					this.setData({
							display: String(result),
							process: process + ' ' +' = ' + result,
							operand1: result,
							operator: null,
							waitingForSecondOperand: false,
							hasCalculated: true
					});
			}
	},

	// 计算函数
	calculate(operand1, operand2, operator) {
			switch (operator) {
					case '+':
							return operand1 + operand2;
					case '-':
							return operand1 - operand2;
					case '*':
							return operand1 * operand2;
					case '/':
							return operand2!== 0? operand1 / operand2 : '错误';
					default:
							return operand2;
			}
	}
});    
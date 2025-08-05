Page({
	data: {
			units: [
					'长度: 米到英尺',
					'长度: 英尺到米',
					'重量: 千克到磅',
					'重量: 磅到千克',
					'温度: 摄氏度到华氏度',
					'温度: 华氏度到摄氏度',
					'体积: 升与加仑',
					'体积: 加仑到升'
			],
			selectedUnit: '长度: 米到英尺',
			inputValue: 0,
			result: ''
	},
	onUnitChange(e) {
			this.setData({
					selectedUnit: this.data.units[e.detail.value]
			});
	},
	onInput(e) {
			this.setData({
					inputValue: parseFloat(e.detail.value)
			});
	},
	convert() {
			const { selectedUnit, inputValue } = this.data;
			let result = '';
			switch (selectedUnit) {
					case '长度: 米到英尺':
							result = `${inputValue} 米 = ${(inputValue * 3.28084).toFixed(2)} 英尺`;
							break;
					case '长度: 英尺到米':
							result = `${inputValue} 英尺 = ${(inputValue / 3.28084).toFixed(2)} 米`;
							break;
					case '重量: 千克到磅':
							result = `${inputValue} 千克 = ${(inputValue * 2.20462).toFixed(2)} 磅`;
							break;
					case '重量: 磅到千克':
							result = `${inputValue} 磅 = ${(inputValue / 2.20462).toFixed(2)} 千克`;
							break;
					case '温度: 摄氏度到华氏度':
							result = `${inputValue} 摄氏度 = ${(inputValue * 9 / 5 + 32).toFixed(2)} 华氏度`;
							break;
					case '温度: 华氏度到摄氏度':
							result = `${inputValue} 华氏度 = ${((inputValue - 32) * 5 / 9).toFixed(2)} 摄氏度`;
							break;
					case '体积: 升与加仑':
							result = `${inputValue} 升 = ${(inputValue * 0.264172).toFixed(2)} 加仑`;
							break;
					case '体积: 加仑到升':
							result = `${inputValue} 加仑 = ${(inputValue / 0.264172).toFixed(2)} 升`;
							break;
			}
			this.setData({
					result
			});
	}
});
	
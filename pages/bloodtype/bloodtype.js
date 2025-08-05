Page({
	data: {
			bloodTypes: ['A', 'B', 'AB', 'O'],
			fatherBlood: 'A',
			motherBlood: 'A',
			resultBlood: ['无']
	},
	onFatherSelect(e) {
			const index = e.detail.value;
			this.setData({
					fatherBlood: this.data.bloodTypes[index]
			}, () => {
					console.log('父亲血型已更新为:', this.data.fatherBlood);
			});
	},
	onMotherSelect(e) {
			const index = e.detail.value;
			this.setData({
					motherBlood: this.data.bloodTypes[index]
			}, () => {
					console.log('母亲血型已更新为:', this.data.motherBlood);
			});
	},
	calculate() {
			console.log('点击了立即计算按钮');
			console.log('开始计算，父亲血型:', this.data.fatherBlood, '母亲血型:', this.data.motherBlood);

			const { fatherBlood, motherBlood } = this.data;
			const alleleMap = {
					A: ['A', 'O'],
					B: ['B', 'O'],
					AB: ['A', 'B'],
					O: ['O']
			};

			const faAlleles = alleleMap[fatherBlood];
			const maAlleles = alleleMap[motherBlood];

			if (!faAlleles || !maAlleles) {
					console.log('无效的血型输入，设置结果为无');
					this.setData({ resultBlood: ['无'] }, () => {
							console.log('结果已更新为:', this.data.resultBlood);
					});
					return;
			}

			const geneCombos = new Set();
			faAlleles.forEach(f => {
					maAlleles.forEach(m => {
							const combo = [f, m].sort().join('');
							geneCombos.add(combo);
					});
			});

			const geneToBlood = {
					AA: 'A', AO: 'A',
					BB: 'B', BO: 'B',
					AB: 'AB',
					OO: 'O'
			};

			const result = [...geneCombos].map(combo => geneToBlood[combo]);
			const uniqueResult = [...new Set(result)].sort();

			console.log('计算结果:', uniqueResult);

			this.setData({
					resultBlood: uniqueResult.length > 0 ? uniqueResult : ['无']
			}, () => {
					console.log('页面数据已更新为:', this.data.resultBlood);
					const resultText = this.data.resultBlood.join(', ') || '无';
					console.log('页面应显示的结果:', resultText);
					// 手动检查数据是否更新到页面
					const page = this;
					setTimeout(() => {
							console.log('延迟后检查页面数据:', page.data.resultBlood);
					}, 1000);
			});
	}
});    
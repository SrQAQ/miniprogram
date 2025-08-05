Page({
  data: {
      tools: [
          { id: 1, name: "计算工具", url: "/pages/calculator/calculator" },
          { id: 2, name: "血型计算", url: "/pages/bloodtype/bloodtype" },
          { id: 3, name: "单位转换", url: "/pages/converter/converter" },
          { id: 4, name: "网络测速", url: "/pages/speedtest/speedtest" },
          { id: 5, name: "用户反馈", url: "/pages/feedback/feedback" },
          { id: 6, name: "身材计算", url: "/pages/calc/calc" },
          { id: 7, name: "密码生成", url: "/pages/passwd/passwd" },
          { id: 8, name: "手机检测", url: "/pages/phone/phone" },
          { id: 9, name: "格式转换", url: "/pages/tp/tp" },
          { id: 10, name: "辈分计算", url: "/pages/kinship/kinship" },
          { id: 11, name: "一键成码", url: "/pages/qrcodeGenerator/qrcodeGenerator" },
          { id: 12, name: "工资计算", url: "/pages/salary-calculator/salary-calculator" }
      ],
      filteredTools: [],
      searchKeyword: ""
  },
  onLoad() {
      this.setData({
          filteredTools: this.data.tools
      });
  },
  onSearchInput(e) {
      this.setData({
          searchKeyword: e.detail.value
      });
  },
  onSearch() {
      const keyword = this.data.searchKeyword;
      const filtered = this.data.tools.filter(tool => tool.name.includes(keyword));
      this.setData({
          filteredTools: filtered
      });
  },
  onCollect(e) {
      const toolId = e.currentTarget.dataset.id;
      const tool = this.data.tools.find(t => t.id === toolId);
      let favorites = wx.getStorageSync('favorites') || [];
      if (!favorites.some(t => t.id === toolId)) {
          favorites.push(tool);
          wx.setStorageSync('favorites', favorites);
          wx.showToast({
              title: '收藏成功',
              icon:'success'
          });
      } else {
          wx.showToast({
              title: '已收藏',
              icon: 'none'
          });
      }
  },
  onToolTap(e) {
      const url = e.currentTarget.dataset.url;
      wx.navigateTo({
          url: url
      });
  }
});    
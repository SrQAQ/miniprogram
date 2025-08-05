Page({
  data: {
      favorites: []
  },
  onLoad() {
      this.loadFavorites();
  },
  onShow() {
      this.loadFavorites();
  },
  loadFavorites() {
      const favorites = wx.getStorageSync('favorites') || [];
      this.setData({
          favorites
      });
  },
  onCancelCollect(e) {
      const toolId = e.currentTarget.dataset.id;
      let favorites = wx.getStorageSync('favorites') || [];
      favorites = favorites.filter(tool => tool.id!== toolId);
      wx.setStorageSync('favorites', favorites);
      this.setData({
          favorites
      });
      wx.showToast({
          title: '取消收藏成功',
          icon:'success'
      });
  },
  onToolTap(e) {
      const url = e.currentTarget.dataset.url;
      wx.navigateTo({
          url: url
      });
  }
});    
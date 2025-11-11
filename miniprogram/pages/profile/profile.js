// pages/profile/profile.js
const app = getApp();

Page({
  data: {
    isDark: false,
    mounted: false
  },

  onLoad() {
    // 检查本地存储的主题设置
    const savedTheme = wx.getStorageSync('theme');
    const shouldBeDark = savedTheme === 'dark';
    
    this.setData({
      isDark: shouldBeDark,
      mounted: true
    });

    // 更新全局主题
    app.globalData.theme = savedTheme || 'light';
  },

  onShow() {
    // 每次显示页面时检查主题
    const savedTheme = wx.getStorageSync('theme');
    const shouldBeDark = savedTheme === 'dark';
    
    if (this.data.isDark !== shouldBeDark) {
      this.setData({
        isDark: shouldBeDark
      });
    }
  },

  // 切换主题
  toggleTheme() {
    const newIsDark = !this.data.isDark;
    
    this.setData({
      isDark: newIsDark
    });

    // 保存到本地存储
    const theme = newIsDark ? 'dark' : 'light';
    wx.setStorageSync('theme', theme);
    app.globalData.theme = theme;

    // 显示提示
    wx.showToast({
      title: newIsDark ? '已切换到深色模式' : '已切换到浅色模式',
      icon: 'success',
      duration: 1500
    });
  }
});


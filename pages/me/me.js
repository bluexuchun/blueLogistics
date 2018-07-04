const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 设备的基础信息
    systemInfo: app.globalData.systemInfo,
    // 底部导航信息
    tabnavs:null,
    mainHeight:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断有没有设置底部导航栏 否则调用全局导航栏
    const tabNavOrign = app.globalData.tabnavs;

    let mainHeight = this.data.systemInfo.windowHeight - tabNavOrign.option.heightPx / (750 / this.data.systemInfo.windowWidth);

    tabNavOrign.navLists[0].isShow = true;
    tabNavOrign.navLists[1].isShow = true;
    tabNavOrign.navLists[2].isShow = true;
    tabNavOrign.navLists[0].isSelected = false;
    tabNavOrign.navLists[1].isSelected = false;
    tabNavOrign.navLists[2].isSelected = true;

    this.setData({
      mainHeight: mainHeight,
      tabnavs: tabNavOrign
    })
  },
})
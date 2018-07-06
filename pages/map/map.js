const app = getApp();

Page({
  data: {
    options:{
      height: app.globalData.systemInfo.windowHeight,
      longitude:0,
      latitude:0
    },
    markers: [{
      iconPath: "/resource/images/icon-biglocation.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 12,
      height: 16
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 获取地图坐标
    const that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        const options = { ...that.data.options};
        options.latitude = res.latitude;
        options.longitude = res.longitude;

        that.setData({
          options: options
        })
      }
    })
  },
})
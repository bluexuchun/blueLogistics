const app = getApp();
import fn from '../../utils/axios.js';

Page({
  data: {
    options:{
      height: 0,
      longitude:0,
      latitude:0
    },
    markers: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.systemInfo);
    let mainHeight = app.globalData.systemInfo.windowHeight;
    // 获取地图坐标
    const that = this;

    // 获取当前地理位置
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
        const options = { ...that.data.options};

        options.latitude = res.latitude;
        options.longitude = res.longitude;
        options.height = mainHeight;

        // 获取所有路线
        const lineLists = fn.ajaxTo('api.php?entry=app&c=lbs&a=lbs', {
          latitude: res.latitude,
          longitude: res.longitude
        });

        lineLists.then(function (res) {
          const data = res.data;
          console.log(data);
          if(res.statusCode == 200){
            const markers = [...that.data.markers];
            if(data.length > 0){
              for(var i = 0;i < data.length;i++){

                // 位置信息
                let locationInfo = {
                  iconPath: "/resource/images/icon-biglocation.png",
                  id: data[i].id,
                  latitude: data[i].latitude,
                  longitude: data[i].longitude,
                  width: 14,
                  height: 20
                }

                markers.push(locationInfo);
              }
            }
            that.setData({
              markers: markers
            })
          }
        })

        that.setData({
          options: options
        })
      }
    })
  },
  markertap:function(e){
    console.log(e);
    const id = e.markerId;
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id,
    })
  }
})
//app.js
var QQMapWX = require('./utils/qqmap-wx-jssdk.js');
var mapInfo = new QQMapWX({
  key:'V4DBZ-RJREV-EULPZ-UR4BK-TOYU6-TXFTK'
});
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // 获取设备信息
    wx.getSystemInfo({
      success: res => {
        console.log(res);
        const that = this;
        that.globalData.systemInfo = res;
      },
    });

    const that = this;

    // 获取位置信息
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        let lonlat = {
          lat: latitude,
          lng: longitude
        }
        that.globalData.locationManage = lonlat
        wx.setStorage({
          key: 'lonlat',
          data: lonlat,
        })
        mapInfo.reverseGeocoder({
          location:{
            latitude: latitude,
            longitude: longitude
          },
          success:function(res){
            if(res.status == 0){
              const locationInfo = res.result.address_component;
              that.globalData.locationInfo = locationInfo;
              wx.setStorage({
                key: 'location',
                data: locationInfo,
              })
            }
          }
        })
      }
    })
  },
  globalData: {
    systemInfo: null,
    userInfo: null,
    locationInfo:null,
    locationManage:{
      lat:0,
      lng:0
    },
    // 底部导航栏的信息
    tabnavs: {
      option: {
        backgroundColor: '#FFFFFF',
        selectedColor: '#298CFF',
        defaultColor: '#888888',
        fontSize: '24',//rpx
        widthPx: '100',//%
        heightPx: '120'//rpx
      },
      navLists: [
        {
          id: '1',
          text: '首页',
          selectedIcon: '/resource/images/icon-tabnav-wuliu-active.png',
          icon: '/resource/images/icon-tabnav-wuliu.png',
          path: 'pages/index/index',
          widthPx: '66',//rpx
          heightPx: '66',//rpx
          mode: 'aspectFit',
          isShow:true,
          isSelected: true
        }, {
          id: '2',
          text: '发布路线',
          selectedIcon: '/resource/images/icon-tabnav-line-active.png',
          icon: '/resource/images/icon-tabnav-line.png',
          path: 'pages/comfrim/comfrim',
          widthPx: '60',//rpx
          heightPx: '60',//rpx
          mode: 'aspectFit',
          isShow: true,
          isSelected: false,
          loginBtn: true,
        }, 
        {
          id: '3',
          text: '发现',
          selectedIcon: '/resource/images/icon-tabnav-line-active.png',
          icon: '/resource/images/icon-tabnav-line.png',
          // path: 'pages/publish/publish',
          widthPx: '60',//rpx
          heightPx: '60',//rpx
          mode: 'aspectFit',
          isShow: true,
          isSelected: false
        }, {
          id: '4',
          text: '我的',
          selectedIcon: '/resource/images/icon-tabnav-me-active.png',
          icon: '/resource/images/icon-tabnav-me.png',
          path: 'pages/me/me',
          widthPx: '60',//rpx
          heightPx: '60',//rpx
          mode: 'aspectFit',
          isShow: true,
          isSelected: false,
          loginBtn:true,
        }
      ]
    }
  }
})
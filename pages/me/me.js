const app = getApp();
import fn from '../../utils/axios.js';
Page({
  data: {
    // 设备的基础信息
    systemInfo: app.globalData.systemInfo,
    userInfo:null,
    // 底部导航信息
    tabnavs:null,
    mainHeight:null,
    status:{
      word:'*未认证',
      color:'#D0021B'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo');
    // 判断有没有设置底部导航栏 否则调用全局导航栏
    const tabNavOrign = app.globalData.tabnavs;

    let mainHeight = this.data.systemInfo.windowHeight - tabNavOrign.option.heightPx / (750 / this.data.systemInfo.windowWidth);

    tabNavOrign.navLists[0].isSelected = false;
    tabNavOrign.navLists[1].isSelected = false;
    tabNavOrign.navLists[2].isSelected = false;
    tabNavOrign.navLists[3].isSelected = true;

    this.setData({
      userInfo: userInfo,
      mainHeight: mainHeight,
      tabnavs: tabNavOrign
    })
  },

  onShow:function(options){
    const that = this;
    const userInfo = wx.getStorageSync('userInfo');
    // 获取用户公司信息
    const result = fn.ajaxTo('api.php?entry=app&c=user&a=user', {
      uid: userInfo.id
    }).then(function (res) {
      const status = {...that.data.status};
      const data = res.data;
      console.log(data.is_checked);
      if(data.is_checked == 0){
        status.word = '正在审核中';
        status.color = '#ffe9cc';
      }else if(data.is_checked == 1){
        status.word = '审核通过';
        status.color = '#E5F8EE';
      }else if(data.is_checked == 2){
        status.word = '审核失败';
        status.color = '#FDE9E5';
      }
      that.setData({
        status:status
      })
    })
  },

  toComfrim:function(){
    const userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      wx.navigateTo({
        url: '/pages/comfrim/comfrim?id=' + userInfo.id,
      })
    }else{
      wx.navigateTo({
        url: '/pages/comfrim/comfrim?id=create',
      })
    }
    
  },

  toPublish:function(){
    wx.navigateTo({
      url: '/pages/publish/publish?id=show',
    })
  }

})
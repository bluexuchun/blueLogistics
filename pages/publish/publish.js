const app = getApp();

Page({
  data: {
    systemInfo:null,
    tabnavs:null,
    array: ['大车', '小车'],
    areaInfo: {
      region: ['北京市', '北京市', '东城区'],
      initArea: '起始地',
      initDetail: null,
      targetArea: '目的地',
      targetDetail: null
    },
  },

  onLoad: function (options) {

    // 改变底部导航栏
    const tabnavs = { ...app.globalData.tabnavs };
    const systemInfo = {...app.globalData.systemInfo};

    tabnavs.navLists[0].isShow = true;
    tabnavs.navLists[1].isShow = true;
    tabnavs.navLists[2].isShow = true;
    tabnavs.navLists[0].isSelected = false;
    tabnavs.navLists[1].isSelected = true;
    tabnavs.navLists[2].isSelected = false;

    this.setData({
      tabnavs: tabnavs
    })

  },
  
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindinitArea: function (e) {
    const areaInfo = { ...this.data.areaInfo };
    areaInfo.initArea = e.detail.value[1];
    areaInfo.initDetail = e.detail.value;
    this.setData({
      areaInfo: areaInfo
    })
  },
  bindtargetArea: function (e) {
    const areaInfo = { ...this.data.areaInfo };
    areaInfo.targetArea = e.detail.value[1];
    areaInfo.targetDetail = e.detail.value;
    this.setData({
      areaInfo: areaInfo
    })
  }


})
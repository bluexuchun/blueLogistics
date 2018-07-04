// pages/search/search.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 设备信息
    systemInfo:app.globalData.systemInfo,

    // 底部导航栏
    tabnavs:app.globalData.tabnavs,

    // 滚动区域的高度
    scrollHeight:0,

    // 区域的信息
    areaInfo:{
      region: ['北京市', '北京市', '东城区'],
      initArea:'起始地',
      initDetail:null,
      targetArea:'目的地',
      targetDetail:null
    },
    
    // 热门路线
    hotlineLists: [{
      id: 1,
      cover: '/resource/images/test.png',
      fromName: '北京',
      toName: '深圳',
      company: '北京远洋物流有限公司',
      location: '北京市大兴区旧宫镇啊啊',
      distance: 20,
      yd: 400,
      yf: 130
    }, {
      id: 2,
      cover: '/resource/images/test.png',
      fromName: '北京',
      toName: '深圳',
      company: '北京远洋物流有限公司',
      location: '北京市大兴区旧宫镇啊啊',
      distance: 20,
      yd: 400,
      yf: 130
    }, {
      id: 3,
      cover: '/resource/images/test.png',
      fromName: '北京',
      toName: '深圳',
      company: '北京远洋物流有限公司',
      location: '北京市大兴区旧宫镇啊啊',
      distance: 20,
      yd: 400,
      yf: 130
    },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 改变底部导航栏
    const tabnavs = { ...app.globalData.tabnavs };

    tabnavs.navLists[0].isShow = true;
    tabnavs.navLists[1].isShow = true;
    tabnavs.navLists[2].isShow = true;
    tabnavs.navLists[0].isSelected = true;
    tabnavs.navLists[1].isSelected = false;
    tabnavs.navLists[2].isSelected = false;

    this.setData({
      tabnavs: tabnavs
    })

    // 底部高度
    const tabnavHeight = app.globalData.tabnavs.option.heightPx;

    // 计算比例
    const ratio = 750 / this.data.systemInfo.windowWidth;

    // 和样式的高度对应 要修改 统一修改
    const headHeight = 430 / ratio;

    // 总高度
    const bodyHeight = this.data.systemInfo.windowHeight;

    // 滚动区域高度
    const scrollHeight = bodyHeight - headHeight - 30 / ratio - tabnavHeight / ratio;
    console.log(scrollHeight);

    this.setData({
      scrollHeight:scrollHeight
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
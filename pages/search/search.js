// pages/search/search.js
const app = getApp();
import fn from '../../utils/axios.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 设备信息
    systemInfo:app.globalData.systemInfo,

    locationInfo:app.globalData.locationInfo,

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
    hotlineLists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const that = this;
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

    // 首页的获取信息
    const hotlineLists = [...this.data.hotlineLists];

    const indexInfo = fn.ajaxTo('api.php?entry=app&c=index&a=index', {});

    indexInfo.then(function (res) {

      const data = res.data.data;

      if (res.statusCode == 200) {

        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            hotlineLists.push(data[i]);
          }
          that.setData({
            hotlineLists: hotlineLists
          })
        }
      }
    })

    // 更改初始位置
    const locationInfo = app.globalData.locationInfo;
    let areaInfo = {...this.data.areaInfo};
    areaInfo.region = [locationInfo.province,locationInfo.city,locationInfo.district];
    areaInfo.initArea = locationInfo.district;
    areaInfo.initDetail = [locationInfo.province, locationInfo.city, locationInfo.district];

    this.setData({
      areaInfo:areaInfo,
      scrollHeight:scrollHeight,
      locationInfo:locationInfo
    })
  },
  bindinitArea: function (e) {
    const areaInfo = { ...this.data.areaInfo };
    areaInfo.initArea = e.detail.value[2];
    areaInfo.initDetail = e.detail.value;
    this.setData({
      areaInfo: areaInfo
    })
  },
  bindtargetArea: function (e) {
    const areaInfo = { ...this.data.areaInfo };
    areaInfo.targetArea = e.detail.value[2];
    areaInfo.targetDetail = e.detail.value;
    this.setData({
      areaInfo: areaInfo
    })
  },
  searchLine: function(){

    const that = this;

    const areaInfo = {...this.data.areaInfo};
    const dataObject = {
      origin_province : areaInfo.initDetail[0],
      origin_city:areaInfo.initDetail[1],
      origin_district:areaInfo.initDetail[2],
      dest_province: areaInfo.targetDetail[0],
      dest_city:areaInfo.targetDetail[1],
      dest_district:areaInfo.targetDetail[2]
    };

    const hotlineLists = [...this.data.hotlineLists];

    // 搜索路线
    const searchResult = fn.ajaxTo('api.php?entry=app&c=route&a=route',dataObject);
    searchResult.then(function(res){
      console.log(res);
      const data = res.data.data;
      if(res.statusCode == 200){
        if(data.length > 0){
          for(var i = 0;i < data.length;i++){
            hotlineLists.push(data[i]);
          }
          
        }
      }
      console.log(hotlineLists);
      that.setData({
        hotlineLists:hotlineLists
      })
    })
  },
  lower:function(e){
    console.log('触碰底部了..');
    console.log(e);
  },
  upper:function(e){
    console.log('触碰顶部了..');
    console.log(e);
  }
})
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

    // 轮播图的信息
    banner: {
      imgUrls: [
        'https://lg-qn90ttes-1257045562.cos.ap-shanghai.myqcloud.com/BANNER-1.jpg',
        'https://lg-qn90ttes-1257045562.cos.ap-shanghai.myqcloud.com/BANNER-2.jpg',
        'https://lg-qn90ttes-1257045562.cos.ap-shanghai.myqcloud.com/BANNER-3.jpg',
        'https://lg-qn90ttes-1257045562.cos.ap-shanghai.myqcloud.com/BANNER-4.jpg'
      ],
      indicatorDots: true,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      imgsInfo: [],
      imgShowHeight: null
    },

    // 区域的信息
    areaInfo:{
      region: ['北京市', '北京市', '东城区'],
      initArea:'起始地',
      initDetail:null,
      targetArea:'目的地',
      targetDetail:null
    },
    
    // 热门路线
    hotlineLists: [],

    // 导航
    hotnavs: {
      actived: 1,
      group: [{
        id: 1,
        type: 'recommend',
        text: '推荐'
      },
      {
        id: 2,
        type: 'near',
        text: '附近'
      },
      {
        id: 3,
        type: 'hot',
        text: '人气'
      }]
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const that = this;
    // 改变底部导航栏
    const tabnavs = { ...app.globalData.tabnavs };

    let mainHeight = this.data.systemInfo.windowHeight - tabnavs.option.heightPx / (750 / this.data.systemInfo.windowWidth);

    tabnavs.navLists[0].isSelected = true;
    tabnavs.navLists[1].isSelected = false;
    tabnavs.navLists[2].isSelected = false;
    tabnavs.navLists[3].isSelected = false;

    this.setData({
      mainHeight:mainHeight,
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
        // 路线
        const route = data.route;
        if (route.length > 0) {
          for (var i = 0; i < route.length; i++) {
            hotlineLists.push(route[i]);
          }
          that.setData({
            hotlineLists: hotlineLists
          })
          console.log(that.data.hotlineLists);
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

  // 动态获取图片信息
  imgInfo: function (e) {

    let imgWidth = e.detail.width;
    // 计算比例（16：9）
    let radio = 16 / 9;
    // 计算高度
    let imgHeight = this.data.systemInfo.windowWidth / radio;

    const imgInfo = {
      id: e.target.dataset.id,
      height: imgHeight
    }
    const imgsList = this.data.banner.imgsInfo;

    imgsList.push(imgInfo);

    this.setData({
      imgsInfo: imgsList,
      imgShowHeight: imgsList[0].height
    });

  },

  // 轮播图计算高度
  swiperChange: function (e) {
    let height = this.data.imgsInfo[e.detail.current].height;
    this.setData({
      imgShowHeight: height
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

    let hotlineLists = [...this.data.hotlineLists];
    hotlineLists = [];

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
  // 切换选中状态
  changeActive: function (e) {
    let currentId = e.target.dataset.id;
    let hotnavs = { ...this.data.hotnavs };

    // 根据点击 加载不同的数据
    switch (currentId) {
      case 1:
        console.log('推荐')
        break;
      case 2:
        console.log('附近')
        break;
      case 3:
        console.log('人气')
        break;
      default:
        return false;
    }

    hotnavs.actived = currentId;
    this.setData({
      hotnavs: hotnavs
    })
  },
  // 触底操作
  reachBottom: function () {
    const that = this;
    if (!this.data.showLoading) {
      that.setData({
        showLoading: true
      })
      // 做操作信息
      setTimeout(() => {
        that.setData({
          showLoading: false
        })
      }, 3000)
    }
  }
})
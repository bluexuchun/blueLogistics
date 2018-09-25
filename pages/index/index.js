//index.js
//获取应用实例
const app = getApp();
import fn from '../../utils/axios.js';

Page({
  data: {
    imgUrl: 'https://blue.widiazine.cn/BLueLogistics',
    // 设备的基础信息
    systemInfo:null,

    // 整体页面高度
    mainHeight:null,

    // 搜索框
    inputShowed: false,
    inputVal: "",

    // 轮播图的信息
    banner:{
      imgUrls: [
        
      ],
      indicatorDots: true,
      autoplay: false,
      interval: 3000,
      duration: 2000,
      imgsInfo:[],
      imgShowHeight:null
    },

    // 导航的信息
    navInfo:{
      indicatorDots: false,
      autoplay: true,
      interval: 6000,
      duration: 3000,
    },

    // 导航栏的信息
    navsLists:[{
      id:1,
      icon:'/resource/images/icon-wuliu.png',
      text:'物流',
      path:'/pages/search/search'
    },{
      id:2,
      icon:'/resource/images/icon-rencai.png',
      text:'人才',
      path:'/pages/index/index'
    },{
      id: 3,
      icon: '/resource/images/icon-baoxian.png',
      text: '保险',
      path: '/pages/index/index'
    },{
      id: 4,
      icon: '/resource/images/icon-shangjia.png',
      text: '商家',
      path: '/pages/store/store'
    }],

    // 左右滑动导航栏
    actLists:[],

    // 推荐企业
    commends:[],

    tabnavs: null,

    hotnavs:{
      actived:1,
      group:[{
        id:1,
        type: 'recommend',
        text: '推荐'
      },
      {
        id:2,
        type: 'near',
        text: '附近'
      },
      {
        id:3,
        type: 'hot',
        text: '人气'
      }]
    },
      

    // 热门路线
    hotlineLists:[],

    // loading
    showLoading: false

  },
  onLoad: function (option) {
    console.log(option)

    const that = this;

    // 判断有没有设置底部导航栏 否则调用全局导航栏
    const tabNavOrign = app.globalData.tabnavs;

    let mainHeight = app.globalData.systemInfo.windowHeight - tabNavOrign.option.heightPx / (750 / app.globalData.systemInfo.windowWidth);

    tabNavOrign.navLists[0].isSelected = true;
    tabNavOrign.navLists[1].isSelected = false;
    tabNavOrign.navLists[2].isSelected = false;
    tabNavOrign.navLists[3].isSelected = false;

    this.setData({
      mainHeight: mainHeight,
      tabnavs: tabNavOrign
    })

    // 判断默认 还是 改变城市后的
    if(option.type == 'change'){
      // 改变城市的
      that.getIndexInfo('city');
    }else{
      // 默认
      let location = app.globalData.locationManage;
      console.log(location);
      // 获取公司列表
      if (location.lat == 0) {
        wx.getLocation({
          success: function (res) {
            location.lat = res.latitude;
            location.lng = res.longitude;
            that.getIndexInfo('default',location.lat, location.lng);
          },
        })
      } else {
        that.getIndexInfo('default',location.lat, location.lng);
      }
    }
  },

  // 获取首页信息
  getIndexInfo:function(type,lat,lng){

    const that = this;

    let location = wx.getStorageSync('location')

    let indexInfo;

    if (type == 'city'){
      
      indexInfo = fn.ajaxTo('api.php?entry=app&c=logistics&a=index', {
        city: location.city,
      });
    }else{
      indexInfo = fn.ajaxTo('api.php?entry=app&c=logistics&a=index', {
        city: location.city,
        lat: lat,
        lng: lng
      });
    }
    indexInfo.then((res) => {
      console.log(res);
      if(res.data.status == 1){

        // 所有公司信息
        let hotlineLists = [...that.data.hotlineLists];
        let lists = res.data.data.company.lists;
        lists ? lists.map((v,i)=>{
          hotlineLists.push(v);
        }) : [];

        // 所有推荐公司信息
        let commends = [...that.data.commends];
        let recom = res.data.data.rec;
        recom ? recom.map((v,i) => {
          commends.push(v);
        }) : []
        
        // banner信息
        let banner = {...that.data.banner};
        let bannerList = res.data.data.banner;
        bannerList ? bannerList.map((v,i) => {
          banner.imgUrls.push(that.data.imgUrl + v.img_path)
        }) : []

        // 导航信息
        let actLists = [...that.data.actLists];
        let navLists = res.data.data.nav;
        navLists ? navLists.map((v,i) => {
          let index = i + 1;
          // 向下取整
          let navId = Math.ceil(index / 4);

          if(actLists[navId - 1] == undefined){
            let item = {
              id:navId,
              list:[v]
            }
            actLists.push(item);
          }else{
            actLists[navId - 1].list.push(v);
          }
        }) : []

        console.log(location);

        that.setData({
          hotlineLists: hotlineLists,
          commends: commends,
          banner:banner,
          actLists: actLists,
          cityName:location.city
        })
      }
    })
  },

  // 动态获取图片信息
  imgInfo: function(e) {

    let imgWidth = e.detail.width;
    // 计算比例（16：9）
    let radio = 16 / 9;
    // 计算高度
    let imgHeight = app.globalData.systemInfo.windowWidth / radio ;

    const imgInfo = {
      id:e.target.dataset.id,
      height: imgHeight
    }
    const imgsList = this.data.banner.imgsInfo;

    imgsList.push(imgInfo);

    this.setData({
      imgsInfo:imgsList,
      imgShowHeight:imgsList[0].height
    });

  },

  // 轮播图计算高度
  swiperChange:function(e){
    let height = this.data.imgsInfo[e.detail.current].height;
    this.setData({
      imgShowHeight:height
    })
  },

  // 前往搜索框
  // moreTab:function(){
  //   wx.navigateTo({
  //     url: '/pages/search/search',
  //   })
  // },

  // 跳转到详情页面
  toDetail:function(e){
    console.log(e);
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id,
    })
  },

  // 打电话
  callTo:function(e){
    const mobile = e.currentTarget.dataset.mobile;
    wx.makePhoneCall({
      phoneNumber: mobile
    })
  },

  // 去地图
  toMap:function(e){
    wx.navigateTo({
      url: '/pages/map/map',
    })
  },

  // 去导航栏
  toNavs:function(e){
    console.log(e);
    const path = e.currentTarget.dataset.path;
    wx.navigateTo({
      url: path,
    })
  },

  // 搜索框
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  // 切换选中状态
  changeActive:function(e){

    const that = this;

    let currentId = e.target.dataset.id;
    let hotnavs = {...this.data.hotnavs};
    let companyType = 'api.php?entry=app&c=logistics&a=index';

    // 根据点击 加载不同的数据
    switch (currentId){
      case 1:
        companyType = companyType + '&do=rec';
        break;
      case 2:
        companyType = companyType + '&do=near';
        break;
      case 3:
        companyType = companyType + '&do=pop';
        break;
      default:
        return false;
    }

    let location = app.globalData.locationManage;

    let companyList = fn.ajaxTo(companyType,{
      lat: location.lat,
      lng: location.lng
    });

    companyList.then((res)=>{
      if(res.data.status == 1){
        let hotlineLists = res.data.data.company.lists;
        that.setData({
          hotlineLists: hotlineLists
        })
      }else{
        wx.showToast({
          icon:'none',
          title: '获取失败，请刷新...',
          duration:2000
        })
      }
      

    })

    hotnavs.actived = currentId;
    this.setData({
      hotnavs:hotnavs
    })
  },

  // 触底操作
  reachBottom:function(){
    const that = this;
    if (!this.data.showLoading){
      that.setData({
        showLoading: true
      })
      // 做操作信息
      setTimeout(() => {
        that.setData({
          showLoading:false
        })
      },3000)
    }
  },


  // 选择城市
  toCity:function(){
    wx.navigateTo({
      url: '/pages/list/list',
    })
  },

  // 搜索详情页
  toSearchDetail:function(){
    wx.navigateTo({
      url: '/pages/detailSearch/detailSearch',
    })
  }
})

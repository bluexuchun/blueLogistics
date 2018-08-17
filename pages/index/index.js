//index.js
//获取应用实例
const app = getApp();
import fn from '../../utils/axios.js';

Page({
  data: {
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
        'https://lg-qn90ttes-1257045562.cos.ap-shanghai.myqcloud.com/BANNER-1.jpg',
        'https://lg-qn90ttes-1257045562.cos.ap-shanghai.myqcloud.com/BANNER-2.jpg',
        'https://lg-qn90ttes-1257045562.cos.ap-shanghai.myqcloud.com/BANNER-3.jpg',
        'https://lg-qn90ttes-1257045562.cos.ap-shanghai.myqcloud.com/BANNER-4.jpg'
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
      path: '/pages/index/index'
    }],

    // 左右滑动导航栏
    actLists:[
      {
        name:'group1',
        list:[
          {
            id: 1,
            icon: '/resource/images/icon-wuliu.png',
            text: '物流',
            path: '/pages/search/search'
          }, {
            id: 2,
            icon: '/resource/images/icon-rencai.png',
            text: '人才',
            path: '/pages/index/index'
          }, {
            id: 3,
            icon: '/resource/images/icon-baoxian.png',
            text: '保险',
            path: '/pages/index/index'
          }, {
            id: 4,
            icon: '/resource/images/icon-shangjia.png',
            text: '商家',
            path: '/pages/index/index'
          }
        ]
      },
      {
        name: 'group2',
        list: [
          {
            id: 1,
            icon: '/resource/images/icon-wuliu.png',
            text: '物流',
            path: '/pages/search/search'
          }, {
            id: 2,
            icon: '/resource/images/icon-rencai.png',
            text: '人才',
            path: '/pages/index/index'
          }, {
            id: 3,
            icon: '/resource/images/icon-baoxian.png',
            text: '保险',
            path: '/pages/index/index'
          }, {
            id: 4,
            icon: '/resource/images/icon-shangjia.png',
            text: '商家',
            path: '/pages/index/index'
          }
        ]
      },
    ],

    // 推荐企业
    commends:[
      {
        id:1,
        title:'上海速辉物流',
        icon:'https://lg-qn90ttes-1257045562.cos.ap-shanghai.myqcloud.com/BANNER-1.jpg'
      }, {
        id: 2,
        title: '上海鸿宇物流',
        icon: 'https://lg-qn90ttes-1257045562.cos.ap-shanghai.myqcloud.com/BANNER-2.jpg'
      }, {
        id: 3,
        title: '上海大鸿物流',
        icon: 'https://lg-qn90ttes-1257045562.cos.ap-shanghai.myqcloud.com/BANNER-3.jpg'
      }
    ],

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
  onLoad: function () {

    const that = this;

    // 判断有没有设置底部导航栏 否则调用全局导航栏
    const tabNavOrign = app.globalData.tabnavs;
    console.log(app.globalData.systemInfo);
    let mainHeight = app.globalData.systemInfo.windowHeight - tabNavOrign.option.heightPx / (750 / app.globalData.systemInfo.windowWidth);

    tabNavOrign.navLists[0].isSelected = true;
    tabNavOrign.navLists[1].isSelected = false;
    tabNavOrign.navLists[2].isSelected = false;
    tabNavOrign.navLists[3].isSelected = false;
    
    this.setData({
      mainHeight:mainHeight,
      tabnavs:tabNavOrign
    })


    // 首页的获取信息
    const hotlineLists = [ ...this.data.hotlineLists];

    const indexInfo = fn.ajaxTo('api.php?entry=app&c=index&a=index', {});

    indexInfo.then(function(res){

      const data = res.data.data;
      console.log(data);

      if(res.statusCode == 200){
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
        // 公司
        const companys = data.company;
        that.setData({
          companys:companys
        })
        console.log(that.data);
        
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
    let currentId = e.target.dataset.id;
    let hotnavs = {...this.data.hotnavs};

    // 根据点击 加载不同的数据
    switch (currentId){
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

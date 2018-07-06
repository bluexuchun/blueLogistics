//index.js
//获取应用实例
const app = getApp();
import fn from '../../utils/axios.js';

Page({
  data: {
    // 设备的基础信息
    systemInfo:app.globalData.systemInfo,

    // 整体页面高度
    mainHeight:null,

    // 轮播图的信息
    banner:{
      imgUrls: [
        '/resource/images/banner.png',
        '/resource/images/banner.png',
        '/resource/images/banner.png'
      ],
      indicatorDots: true,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      imgsInfo:[],
      imgShowHeight:null
    },

    // 导航栏的信息
    navsLists:[{
      id:1,
      icon:'/resource/images/icon-wuliu.png',
      text:'物流',
      path:'pages/index/index'
    },{
      id:2,
      icon:'/resource/images/icon-rencai.png',
      text:'人才',
      path:'pages/index/index'
    },{
      id: 3,
      icon: '/resource/images/icon-baoxian.png',
      text: '保险',
      path: 'pages/index/index'
    },{
      id: 4,
      icon: '/resource/images/icon-shangjia.png',
      text: '商家',
      path: 'pages/index/index'
    }, {
      id: 5,
      icon: '/resource/images/icon-wuliu.png',
      text: '物流',
      path: 'pages/index/index'
    }, {
      id: 6,
      icon: '/resource/images/icon-rencai.png',
      text: '人才',
      path: 'pages/index/index'
    }, {
      id: 7,
      icon: '/resource/images/icon-baoxian.png',
      text: '保险',
      path: 'pages/index/index'
    }, {
      id: 8,
      icon: '/resource/images/icon-shangjia.png',
      text: '商家',
      path: 'pages/index/index'
    }],

    tabnavs: null,

    // 热门路线
    hotlineLists:[]

  },
  onLoad: function () {

    const that = this;

    // 判断有没有设置底部导航栏 否则调用全局导航栏
    const tabNavOrign = app.globalData.tabnavs;
    
    let mainHeight = this.data.systemInfo.windowHeight - tabNavOrign.option.heightPx / (750 / this.data.systemInfo.windowWidth);

    tabNavOrign.navLists[0].isShow = true;
    tabNavOrign.navLists[1].isShow = false;
    tabNavOrign.navLists[2].isShow = true;
    tabNavOrign.navLists[0].isSelected = true;
    tabNavOrign.navLists[1].isSelected = false;
    tabNavOrign.navLists[2].isSelected = false;
    
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

        if(data.length > 0){
          for(var i = 0;i < data.length;i++){
            hotlineLists.push(data[i]);
          }
          that.setData({
            hotlineLists: hotlineLists
          })

          console.log(that.data.hotlineLists);
        }
      }
    })

    
    
  },
  imgInfo: function(e) {

    let imgWidth = e.detail.width;
    // 计算比例（16：9）
    let radio = 16 / 9;
    // 计算高度
    let imgHeight = this.data.systemInfo.windowWidth / radio ;

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

  moreTab:function(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

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
  }
})

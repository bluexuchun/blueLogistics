//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 设备的基础信息
    systemInfo:null,

    // 整体页面高度
    mainHeight:null,

    // 轮播图的信息
    banner:{
      imgUrls: [
        '/resource/images/banner.png',
        '/resource/images/banner.png',
        '/resource/images/banner.png'
      ],
      indicatorDots: false,
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
    hotlineLists:[{
      id:1,
      cover:'/resource/images/test.png',
      fromName:'北京',
      toName:'深圳',
      company:'北京远洋物流有限公司',
      location:'北京市大兴区旧宫镇啊啊',
      distance:20,
      yd:400,
      yf:130
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
    }]

  },
  onLoad: function () {
    // 获取设备的信息
    const that = this;

    // 判断有没有设置底部导航栏 否则调用全局导航栏
    const tabNavOrign = app.globalData.tabnavs;

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          systemInfo:res
        })
      },
    })
    
    let mainHeight = this.data.systemInfo.windowHeight - tabNavOrign.option.heightPx / (750 / this.data.systemInfo.windowWidth);
    tabNavOrign.navLists[1].isShow = false;
    this.setData({
      mainHeight:mainHeight,
      tabnavs:tabNavOrign
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

  // 
  swiperChange:function(e){
    let height = this.data.imgsInfo[e.detail.current].height;
    this.setData({
      imgShowHeight:height
    })
  }
})

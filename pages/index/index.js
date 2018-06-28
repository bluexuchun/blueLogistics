//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 设备的基础信息
    systemInfo:null,
    mainHeight:null,
    // 轮播图的信息
    banner:{
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
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
      id: 2,
      icon: '/resource/images/icon-shangjia.png',
      text: '商家',
      path: 'pages/index/index'
    }],
    // 底部导航栏的信息
    tabnavs:{
      option:{
        backgroundColor:'#FFFFFF',
        selectedColor:'#298CFF',
        defaultColor:'#888888',
        fontSize:'24',//rpx
        widthPx:'100',//%
        heightPx:'120'//rpx
      },
      navLists:[
        {
          id: '1',
          text: '物流',
          selectedIcon: '/resource/images/icon-tabnav-wuliu-active.png',
          icon: '/resource/images/icon-tabnav-wuliu.png',
          path: 'pages/index/index',
          widthPx: '66',//rpx
          heightPx: '66',//rpx
          mode: 'aspectFit',
          isSelected: true
        }, {
          id: '2',
          text: '我的',
          selectedIcon: '/resource/images/icon-tabnav-me-active.png',
          icon: '/resource/images/icon-tabnav-me.png',
          path: 'pages/index/index',
          widthPx: '60',//rpx
          heightPx: '60',//rpx
          mode: 'aspectFit',
          isSelected: false
        }
      ]
    }
  },
  onLoad: function () {
    // 获取设备的信息
    const that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          systemInfo:res
        })
      },
    })
    // console.log(this.data.systemInfo);
    let mainHeight = this.data.systemInfo.windowHeight - this.data.tabnavs.option.heightPx / this.data.systemInfo.pixelRatio;
    this.setData({
      mainHeight:mainHeight
    })
  },
  imgInfo: function(e) {

    let imgWidth = e.detail.width;
    // 计算比例
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
    console.log(imgsList[0].height)

  },
  swiperChange:function(e){
    let height = this.data.imgsInfo[e.detail.current].height;
    this.setData({
      imgShowHeight:height
    })
  }
})

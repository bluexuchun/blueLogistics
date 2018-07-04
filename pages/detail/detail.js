// pages/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systemInfo:app.globalData.systemInfo,
    // 轮播图的信息
    banner: {
      imgUrls: [
        '/resource/images/banner.png',
        '/resource/images/banner.png',
        '/resource/images/banner.png'
      ],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      imgsInfo: [],
      imgShowHeight: null,
      currentPage:1,
      totalPage:1
    },

    // 公司信息
    company: {
      logo:'/resource/images/icon-logo.png',
      title:'北京远洋物流有限公司',
      initArea:'北京',
      targetArea:'深圳',
      name:'刘大壮',
      phone:'176****8225',
      address:'北京市大兴区旧宫镇268号仓库',
      money:'400元/吨 130元/方',
      richText:'图文详情'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

    // 获取id 并请求数据

    // 获取banner图的总数量

    const bannerInfo = {...this.data.banner};
    bannerInfo.totalPage = bannerInfo.imgUrls.length;
    this.setData({
      banner:bannerInfo
    })
  },

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

    const bannerInfo = { ...this.data.banner};

    bannerInfo.imgsInfo = imgsList;
    bannerInfo.imgShowHeight = imgsList[0].height;

    this.setData({
      banner:bannerInfo
    });

  },

  swiperChange:function(e){
    console.log(e);
    const index = e.detail.current + 1;

    const bannerInfo = {...this.data.banner};
    bannerInfo.currentPage = index;

    this.setData({
      banner:bannerInfo
    })

  }
})
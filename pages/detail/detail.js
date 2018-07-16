// pages/detail/detail.js
const app = getApp();
import fn from '../../utils/axios.js';
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systemInfo:app.globalData.systemInfo,
    // 轮播图的信息
    banner: {
      imgUrls: [],
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
    company: null,

    // 路线信息
    lineInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const that = this;

    // 获取id 并请求数据
    const id = options.id;
    const detail = fn.ajaxTo('api.php?entry=app&c=company&a=display',{
      id:id
    });
    detail.then(function(res){
      console.log(res);
      const data = res.data.data;
      if(res.statusCode == 200){

        // banner设置
        const bannerInfo = { ...that.data.banner};
        const bannerLists = data.companyInfo.banner;
        if (bannerLists.length > 0){
          for(var i = 0; i < bannerLists.length; i++){
            bannerInfo.imgUrls.push(bannerLists[i].imgURL);
          }
        };

        const companyRich = data.companyInfo.introduce;
        WxParse.wxParse('content', 'html', companyRich,that, 5);

        that.setData({
          banner:bannerInfo,
          company:data.companyInfo,
          lineInfo:data.routeInfo
        })

        that.calculateBanner();

      }
    })

    
  },

  calculateBanner: function(){
    // 获取banner图的总数量

    const bannerInfo = { ...this.data.banner };
    console.log(bannerInfo);
    bannerInfo.totalPage = bannerInfo.imgUrls.length;
    this.setData({
      banner: bannerInfo
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
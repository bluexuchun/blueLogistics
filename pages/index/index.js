//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
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
      imgsInfo:[]
    }
  },
  onLoad: function () {
    
  },
  imgInfo: function(e) {
    console.log(e); 
    const imgInfo = {
      id:e.target.dataset.id,
      width:e.detail.width,
      height:e.detail.height
    }
    console.log(this.data.banner.imgsInfo);
  }
})

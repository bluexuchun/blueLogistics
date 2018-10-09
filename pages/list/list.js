const app = getApp();
import fn from '../../utils/axios.js';
Page({
  data: {
    // 搜索框
    inputShowed: false,
    inputVal: "",

    // 国内热门城市
    hotCitys:[],
    // 高度
    mainHeight:0,
    letter:[
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ],
    // 目前位置是
    currentId:'A',
    // 所有数据
    dataSource:[],
    // 跳转到指定的Id
    aId:null
  },

  onLoad: function (options) {
    console.log(app.globalData);
    const that = this;
    wx.getSystemInfo({
      success: function(res) {
        // 给scroll-view高度
        that.setData({
          mainHeight: res.windowHeight,
          cityName: app.globalData.locationInfo.city
        })
      },
    })
    // 获取热门城市
    const hotCity = fn.ajaxTo('api.php?entry=app&c=logistics&a=company&do=city_hot',{})
    .then((res) => {
      console.log(res)
      
      this.setData({
        hotCitys:res.data.data
      })
    })
    
    // 获取所有城市
    const cityLists = fn.ajaxTo('api.php?entry=app&c=logistics&a=company&do=city',{})
    .then((res) => {
      let dataSource = [...that.data.dataSource];
      let item;
      // 英文26个字母
      that.data.letter.map((v,i) => {
        if (res.data.data[v]){
          item = {
            name: v,
            group: res.data.data[v]
          }
          dataSource.push(item);
        }
      })
      that.setData({
        dataSource: dataSource
      })
    })
    
  },

  // 滚动
  scrollList:function(e){
    const that = this;

    // 获取所有id的位置
    wx.createSelectorQuery().selectAll('.list-group').boundingClientRect(function (rects) {
      rects.forEach(function (rect) {
        let id = rect.id;
        let top = rect.top;

        // 计算范围值

        let minDir,
            maxDir = 0,
            height = 30;

        let dataSource = [...that.data.dataSource]
        dataSource.map((v,i) => {
          if(v.name == id){
            minDir = -1 * v.group.length * height - 28;
          }
        })
        // console.log('id:'+id + 'top:' + top)
        // // 判断每个元素的位置 如果小于5 到 大于-5之间是符合条件的
        if(top >= minDir && top <= maxDir){
          // 改变当前位置
          that.setData({
            currentId:id
          })
        }
      })
    }).exec()
  },


  // 点击头标签跳到指定的位置
  clickLetter:function(e){
    console.log(e);
    
    let aid = e.target.dataset.id;

    wx.showToast({
      title: aid,
      icon: 'none',
      duration: 2000
    })
    this.setData({
      aId:aid
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
      inputShowed: false,
      citys:[]
    });
  },

  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },

  // 热搜索
  inputTyping: function (e) {
    const that = this;
    let value = e.detail.value;
    // 正则检测英文
    let engReg = new RegExp("[A-Za-z]+");

    let isEng = engReg.test(value);

    if(!isEng && value != ""){
      let result = fn.ajaxTo('api.php?entry=app&c=logistics&a=company&do=seh_city',{
        city:value
      })
      .then((res) => {
        console.log(res);
        if(res.data.status == 1){
          that.setData({
            citys:res.data.data
          })
        }
      })
    }
  },

  // 改变城市
  changeCity: function(e){
    let name = e.currentTarget.dataset.name;
    wx.showModal({
      title: '提示',
      content: '确定要切换到该城市么？',
      success: function (res) {
        if (res.confirm) {
          let location = wx.getStorageSync('location');
          location.city = name;
          wx.setStorageSync('location', location)
          wx.reLaunch({
            url: '/pages/index/index?type=change',
          })
        } else if (res.cancel) {
          console.log('取消了')
        }
      }
    })
    
  }
})
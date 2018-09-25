// pages/seller/seller.js
var app = getApp()
import fn from '../../utils/axios.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    luntext: ['新入', '附近', '热门'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 35,
    currentTab: 0,
    swiperCurrent: 0,
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    refresh_top: false,
    star: [
      {
        img: '/resource/images/xing.png'
      }, {
        img: '/resource/images/xing.png'
      }, {
        img: '/resource/images/xing.png'
      }, {
        img: '/resource/images/xing.png'
      }, {
        img: '/resource/images/xing.png'
      }
    ],
    star1: [
      {
        img: '/resource/images/xing.png'
      }, {
        img: '/resource/images/star_none.png'
      }, {
        img: '/resource/images/star_none.png'
      }, {
        img: '/resource/images/star_none.png'
      }, {
        img: '/resource/images/star_none.png'
      }
    ],
    star2: [
      {
        img: '/resource/images/xing.png'
      }, {
        img: '/resource/images/xing.png'
      }, {
        img: '/resource/images/star_none.png'
      }, {
        img: '/resource/images/star_none.png'
      }, {
        img: '/resource/images/star_none.png'
      }
    ],
    star3: [
      {
        img: '/resource/images/xing.png'
      }, {
        img: '/resource/images/xing.png'
      }, {
        img: '/resource/images/xing.png'
      }, {
        img: '/resource/images/star_none.png'
      }, {
        img: '/resource/images/star_none.png'
      }
    ],
    star4: [
      {
        img: '/resource/images/xing.png'
      }, {
        img: '/resource/images/xing.png'
      }, {
        img: '/resource/images/xing.png'
      }, {
        img: '/resource/images/xing.png'
      }, {
        img: '/resource/images/star_none.png'
      }
    ],
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })

  },
  // sellerinfo: function (e) {
  //   wx: wx.navigateTo({
  //     url: '../sellerinfo/sellerinfo',
  //   })
  // },
  // ————————————热门附近的点击事件——————————————————
  tabClick: function (e) {
    var index = e.currentTarget.id
    console.log(this.data)
    var store = this.data.business
    if (this.data.business != null) {
      if (store.length != 0) {
        var compare = function (a, b) {
          var a = Number(a.distance);
          var b = Number(b.distance);
          if (a < b) {
            return -1
          } else if (a > b) {
            return 1
          } else {
            return 0
          }
        }
        if (index == 0) {
          // this.setData({
          //   store: store
          // })
          this.refresh()
        } else if (index == 1) {
          var store1 = store.sort(compare)
          this.setData({
            store1: store1
          })
        } else if (index == 2) {
          var store2 = []
          for (let i in store) {
            console.log(store);
            if (store[i].score >= 4) {
              store2.push(store[i])
            }
          }
          this.setData({
            store2: store2
          })
        }
      }
    }
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  jumps: function (e) {
    var that = this
    var name = e.currentTarget.dataset.name
    var appid = e.currentTarget.dataset.appid
    var src = e.currentTarget.dataset.src
    var wb_src = e.currentTarget.dataset.wb_src
    var type = e.currentTarget.dataset.type
    if (type == 1) {
      var s1 = src.replace(/[^0-9]/ig, "");
      src = src.replace(/(\d+|\s+)/g, "");
      src = src
      console.log(src)
      console.log(s1)
      console.log()
      wx: wx.navigateTo({
        url: src + Number(s1),
        success: function (res) {
          that.setData({
            averdr: true
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (type == 2) {
      wx: wx.navigateTo({
        url: '../car/car?vr=' + wb_src,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (type == 3) {
      wx.navigateToMiniProgram({
        appId: appid,
        path: '',
        extraData: {
          foo: 'bar'
        },
        envVersion: 'develop',
        success(res) {
          // 打开成功
          that.setData({
            averdr: true
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // wx.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: wx.getStorageSync('color'),
    //   animation: {
    //     duration: 0,
    //     timingFunc: 'easeIn'
    //   }
    // })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    })
    
    // that.setData({
    //   store_name: wx.getStorageSync('System').link_name,
    //   msgList1: wx.getStorageSync('msgList1')
    // })

    that.reload()
    that.refresh()
  },
  reload: function (e) {
    var that = this
    var url = wx.getStorageSync('url')
    that.setData({
      url: url
    })
    // ----------------------------------获取分类的集合----------------------------------
    // app.util.request({
    //   'url': 'entry/wxapp/StoreType',
    //   'cachetime': '0',
    //   success: function (res) {
    //     var store = res.data
    //     // ----------------------------------高度随分类的数量去改变----------------------------------
    //     if (store.length <= 5) {
    //       that.setData({
    //         height: 150
    //       })
    //     } else if (store.length > 5) {
    //       that.setData({
    //         height: 300
    //       })
    //     }
    //     // ----------------------------------把分类以10个位一组分隔开----------------------------------
    //     var nav = []
    //     for (var i = 0, len = store.length; i < len; i += 10) {
    //       nav.push(store.slice(i, i + 10))
    //     }
    //     that.setData({
    //       nav: nav
    //     })
    //   },
    // })

    //---------------------------------- 获取轮播图集合----------------------------------
    // var city = wx.getStorageSync('city')
    // app.util.request({
    //   'url': 'entry/wxapp/Ad',
    //   'cachetime': '0',
    //   data: { cityname: city },
    //   success: function (res) {
    //     var slide = []
    //     for (let i in res.data) {
    //       if (res.data[i].type == 2) {
    //         slide.push(res.data[i])
    //       }
    //     }
    //     that.setData({
    //       slide: slide
    //     })
    //   },
    // })
  },
  refresh: function () {
    console.log(app.globalData);
    var that = this
    var star1 = that.data.star1
    var city = wx.getStorageSync('location')
    console.log('城市为' + city)
    console.log('page数量为' + that.data.page)
    var page = that.data.page
    var business = that.data.business
    if (page == null) {
      page = 1
    }
    if (business == null) {
      business = []
    }
    // ----------------------------------获取商家列表----------------------------------
    let storeLists = fn.ajaxTo('api.php?entry=app&c=store&a=wxapp&do=StoreList',{
      page:page,
      cityname: city.city
    })
    .then((res) => {
      console.log(res)
      if (res.data.data.length == 0) {
        that.setData({
          refresh_top: true
        })
      } else {
        console.log(res)
        that.setData({
          page: page + 1,
          refresh_top: false
        })
        business = business.concat(res.data.data)
        var hash = {};
        var result = [];
        for (var i = 0, len = business.length; i < len; i++) {
          if (!hash[business[i]]) {
            result.push(business[i]);
            hash[business[i]] = true;
          }
        }
        var store1 = []
        var store2 = []
        for (let i in res.data.data) {
          // console.log(res.data.data[i])
          res.data.data[i].star = that.data.star1
          var star = res.data.data[i].star
          res.data.data[i].score = Number(res.data.data[i].score)
          var score = res.data.data[i].score
          var lat = res.data.data[i].coordinates
          var ss = lat ? lat.split(",") : ""
          res.data.data[i].lat2 = Number(wx.getStorageSync('lonlat').lat)
          res.data.data[i].lng2 = Number(wx.getStorageSync('lonlat').lng)
          var lat1 = Number(wx.getStorageSync('lonlat').lat)
          var lng1 = Number(wx.getStorageSync('lonlat').lng)
          var lat2 = ss[0]
          var lng2 = ss[1]
          var radLat1 = lat1 * Math.PI / 180.0;
          var radLat2 = lat2 * Math.PI / 180.0;
          var a = radLat1 - radLat2;
          var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
          var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
          s = s * 6378.137;
          s = Math.round(s * 10000) / 10000;
          var s = s.toFixed(2)
          res.data.data[i].distance = s
        }
        that.setData({
          store: business,
          business: business
        })

        console.log(that.data);
      }
    })
    // app.util.request({
    //   'url': 'entry/wxapp/news',
    //   'cachetime': '0',
    //   data: { cityname: city },
    //   success: function (res) {
    //     var msgList1 = []
    //     for (let i in res.data) {
    //       if (res.data[i].type == 2) {
    //         msgList1.push(res.data[i])
    //       }
    //     }
    //     that.setData({
    //       msgList: msgList1
    //     })
    //   },
    // })
  },

  // -----------------------------------跳转入驻界面-------------------------------
  // sellted: function (e) {
  //   wx: wx.navigateTo({
  //     url: '../settled/settled',
  //     success: function (res) { },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // },
  // -----------------------------------跳转商家详情界面-------------------------------
  store: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../sellerinfo/sellerinfo?id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ----------------------------------发帖----------------------------------
  // notice: function (e) {
  //   var id = e.currentTarget.dataset.id
  //   wx: wx.navigateTo({
  //     url: '../notice/notice?id=' + id,
  //     success: function (res) { },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // },
  // ----------------------------------拨打电话----------------------------------
  phone: function (e) {
    var tel = e.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },
  store_type_id: function (e) {
    var id = e.currentTarget.dataset.id
    wx: wx.navigateTo({
      url: 'business?id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  bindinput: function (e) {
    var that = this
    var value = e.detail.value

    that.setData({
      value: value
    })
  },
  search: function (e) {
    var value = this.data.value
    if (value != '') {
      let result = fn.ajaxTo('api.php?entry=app&c=store&a=wxapp&do=StoreList',{
        keywords:value
      })
      .then((res) => {
        if (res.data.data.length == 0) {
          wx: wx.showModal({
            title: '提示',
            content: '找不到商家',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '',
            confirmText: '确定',
            confirmColor: '',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else {
          wx: wx.navigateTo({
            url: "../sellerinfo/sellerinfo?id=" + res.data.data[0].id,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      first: 1
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // this.setData({
    //   page:1,
    //   business: [],
    //   store: []
    // })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // this.setData({
    //   page: 1,
    //   business: [],
    //   store:[]
    // })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.reload()
    this.setData({
      page: 1,
      business: [],
      store: []
    })
    this.refresh()
    wx.stopPullDownRefresh()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.refresh_top == false) {
      this.refresh()
    } else {

    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
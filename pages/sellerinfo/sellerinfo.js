// pages/sellerinfo/sellerinfo.js
var app = getApp()
var screenWidth = 0
var screenHeight = 0
var screenWidth1 = 0
var screenHeight1 = 0
var screenWidth2 = 0
var screenHeight2 = 0
import fn from '../../utils/axios.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 15,
    comments: false,
    wechat: false,
    share: false,
    // tabs2: ["商家详情", "用户评论"],
    tabs2: ["商家详情"],
    star: [
      {
        img: '/resource/images/star_none.png'
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
    star1: [
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
    index: 0,
    swiperCurrent: 0
  },
  // ---------------------展示老板微信
  comments1: function (e) {
    if (this.data.wechat == false) {
      this.setData({
        wechat: true
      })
    } else {
      this.setData({
        wechat: false
      })
    }

  },
  // ---------------------分享---------------
  comments2: function (e) {
    var that = this

    if (this.data.share == false) {
      this.setData({
        share: true
      })
    } else {
      this.setData({
        share: false
      })
    }
  },
  more: function (e) {
    var store_id = this.data.id
    wx: wx.navigateTo({
      url: 'shop?store_id=' + store_id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  goods_info: function (e) {
    var store_id = this.data.id
    var id = e.currentTarget.id
    wx: wx.navigateTo({
      url: 'good_info?id=' + id + '&store_id=' + store_id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // --------------------------------------------图片预览
  previewImage: function (e) {
    var that = this
    var url = that.data.url
    var urls = []
    var weixin_logo = that.data.store.weixin_logo
    urls.push(url + that.data.store.weixin_logo)
    wx.previewImage({
      current: url + weixin_logo,
      urls: urls
    })
  },
  previewImage3: function (e) {
    var that = this
    var url = that.data.url
    var urls = []
    var weixin_logo = that.data.store.ewm_logo
    urls.push(url + that.data.store.ewm_logo)
    wx.previewImage({
      current: url + weixin_logo,
      urls: urls
    })
  },
  previewImage2: function (e) {
    var that = this
    var url = that.data.url
    var urls = []
    urls.push(that.data.bath)
    wx.previewImage({
      urls: urls
    })
  },
  // --------------------------------------------图片预览
  previewImage1: function (e) {
    var that = this
    var url = that.data.url
    var urls = []
    var inde = e.currentTarget.id
    var pictures = that.data.store.images
    for (let i in pictures) {
      urls.push(url + pictures[i]);
    }
    wx.previewImage({
      current: url + pictures[inde],
      urls: urls
    })

  },
  // 商家详情和评论切换时间
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  Demonstration: function (e) {
    if (this.data.store.vr_link != '') {
      wx: wx.navigateTo({
        url: '../car/car?vr=' + this.data.store.vr_link,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  // 轮播部分
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // wx.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: wx.getStorageSync('color'),
    //   animation: {
    //     duration: 0,
    //     timingFunc: 'easeIn'
    //   }
    // })
    // var scene = decodeURIComponent(options.scene)
    // app.util.request({
    //   'url': 'entry/wxapp/Url',
    //   'cachetime': '0',
    //   success: function (res) {
    //     // ---------------------------------- 异步保存网址前缀----------------------------------
    //     wx.setStorageSync('url', res.data)
    //     that.setData({
    //       url: res.data
    //     })
    //   },
    // })
    // if (options.scene == null) {
    //   var user_info = wx.getStorageSync('users')
    //   var user_id = wx.getStorageSync('users').id
    //   var id = options.id
    // } else {
    //   var id = scene
    //   wx.login({
    //     success: function (res) {
    //       var code = res.code
    //       wx.setStorageSync("code", code)
    //       wx.getUserInfo({
    //         success: function (res) {
    //           // ----------------------------------异步保存用户登录信息----------------------------------
    //           wx.setStorageSync("user_info", res.userInfo)
    //           // ----------------------------------用户登录的名字----------------------------------
    //           var nickName = res.userInfo.nickName
    //           // ----------------------------------用户登录的头像----------------------------------
    //           var avatarUrl = res.userInfo.avatarUrl
    //           app.util.request({
    //             'url': 'entry/wxapp/openid',
    //             'cachetime': '0',
    //             data: { code: code },
    //             success: function (res) {
    //               // 异步保存session-key
    //               wx.setStorageSync("key", res.data.session_key)
    //               //  -------------------------需要上传给后台的值 包括名字和头像----------------------------------
    //               var img = avatarUrl
    //               var name = nickName
    //               // 异步7保存用户openid
    //               wx.setStorageSync("openid", res.data.openid)
    //               var openid = res.data.openid
    //               //---------------------------------- 获取用户登录信息----------------------------------
    //               app.util.request({
    //                 'url': 'entry/wxapp/Login',
    //                 'cachetime': '0',
    //                 data: { openid: openid, img: img, name: name },
    //                 success: function (res) {
    //                   // ----------------------------------异步保存用户信息----------------------------------
    //                   wx.setStorageSync('users', res.data)
    //                   wx.setStorageSync('uniacid', res.data.uniacid)
    //                   that.setData({
    //                     user_id: res.data.id,
    //                     user_info: res.data
    //                   })
    //                 },
    //               })
    //             },
    //           })
    //         }
    //       })
    //     }
    //   })
    // }
    let xcxewm = fn.ajaxTo('api.php?entry=app&c=store&a=wxapp&do=StoreCode',{
      store_id:options.id
    })
    .then((res) => {
      console.log(res);
      that.setData({
        bath: res.data.data
      })
    })
    that.setData({
      id: options.id,
    })
    that.reload()
    wx: wx.getSystemInfo({
      success: function (res) {
        var sys_width = res.windowWidth
        var sys_height = res.windowHeight
        that.setData({
          sys_width: sys_width,
          sys_height: sys_height
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  reload: function (e) {
    var that = this
    var star1 = that.data.star1
    var star3 = that.data.star
    // ----------------------------------获取商家详情列表----------------------------------
    let result = fn.ajaxTo('api.php?entry=app&c=store&a=wxapp&do=StoreInfo',{
      id:that.data.id
    })
    .then((res) => {
      res.data.data.star3 = star3
      res.data.data.store[0].img1 = res.data.data.store[0].ad.split(",")
      res.data.data.store[0].images = res.data.data.store[0].img.split(",")
      res.data.data.store[0].coordinates = res.data.data.store[0].coordinates.split(",")
      res.data.data.store[0].star = star1.slice(0, res.data.data.store[0].score)

      for (let i in res.data.data.pl) {
        res.data.data.pl[i].star = star1
      }

      var score = Number(res.data.data.store[0].score)
      score = parseInt(score)
      var star2 = '/resource/images/xing.png'
      if (score == 0) {
        res.data.data.star3 = that.data.star1
      } else if (score == 1) {
        res.data.data.star3[0].img = star2
      } else if (score == 2) {
        res.data.data.star3[0].img = star2
        res.data.data.star3[1].img = star2
      } else if (score == 3) {
        res.data.data.star3[0].img = star2
        res.data.data.star3[1].img = star2
        res.data.data.star3[2].img = star2
      } else if (score == 4) {
        res.data.data.star3[0].img = star2
        res.data.data.star3[1].img = star2
        res.data.data.star3[2].img = star2
        res.data.data.star3[3].img = star2
      } else if (score == 5) {
        res.data.data.star3[0].img = star2
        res.data.data.star3[1].img = star2
        res.data.data.star3[2].img = star2
        res.data.data.star3[3].img = star2
        res.data.data.star3[4].img = star2
      }
      that.setData({
        score: score,
        star3: res.data.data.star3
      })
      wx.setNavigationBarTitle({
        title: res.data.data.store[0].store_name
      })
      that.setData({
        store: res.data.data.store[0],
        comment: res.data.data.pl
      })
    })
        
    // app.util.request({
    //   'url': 'entry/wxapp/IsCollection',
    //   'cachetime': '0',
    //   data: { store_id: that.data.id, user_id: that.data.user_id },
    //   success: function (res) {
    //     if (res.data == 1) {
    //       that.setData({
    //         Collection: true
    //       })
    //     } else {
    //       that.setData({
    //         Collection: false
    //       })
    //     }
    //   },
    // })

    // -----------------------------------商品列表
    // app.util.request({
    //   'url': 'entry/wxapp/StoreGoodList',
    //   'cachetime': '0',
    //   data: { store_id: that.data.id },
    //   success: function (res) {
    //     for (let i in res.data) {
    //       res.data[i].imgs = res.data[i].imgs.split(",")[0]
    //       res.data[i].lb_imgs = res.data[i].lb_imgs.split(",")
    //     }
    //     var store_good = res.data.slice(0, 4)
    //     that.setData({
    //       store_good: store_good
    //     })
    //   },
    // })
  },
  // 搜集formid
  formid_one: function (e) {
    console.log('搜集第一个formid')
    console.log(e)
    app.util.request({
      'url': 'entry/wxapp/SaveFormid',
      'cachetime': '0',
      data: {
        user_id: wx.getStorageSync('users').id,
        form_id: e.detail.formId,
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {

      },
    })
  },
  // ------------------------------------点击查看商家详细地址
  dizhi: function (e) {
    var that = this
    var lat2 = Number(that.data.store.coordinates[0])
    var lng2 = Number(that.data.store.coordinates[1])
    wx.openLocation({
      latitude: lat2,
      longitude: lng2,
      name: that.data.store.store_name,
      address: that.data.store.address
    })
  },
  // ------------------------------------点击回到首页
  shouye: function (e) {
    wx: wx.reLaunch({
      url: '../index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ------------------------------------点击入驻商家
  fabu: function (e) {
    var that = this
    wx: wx.navigateTo({
      url: '../index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ------------------------------------点击拨打商家电话
  phone: function (e) {
    var that = this
    var tel = that.data.store.tel
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },
  // ------------------------------------点击弹出商家回复
  reply: function (e) {
    var that = this
    var reflex_id = e.currentTarget.dataset.id
    that.setData({
      comments: true,
      relpay: true,
      reflex_id: reflex_id
    })
  },
  // ---------------------------------评论的星级--------------------------
  star: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var star = that.data.star
    var img = '/resource/images/xing.png'
    var img1 = '/resource/images/star_none.png'
    if (index == 0) {
      star[0].img = img
      star[1].img = img1
      star[2].img = img1
      star[3].img = img1
      star[4].img = img1
    } else if (index == 1) {
      star[0].img = img
      star[1].img = img
      star[2].img = img1
      star[3].img = img1
      star[4].img = img1
    } else if (index == 2) {
      star[0].img = img
      star[1].img = img
      star[2].img = img
      star[3].img = img1
      star[4].img = img1
    } else if (index == 3) {
      star[0].img = img
      star[1].img = img
      star[2].img = img
      star[3].img = img
      star[4].img = img1
    } else if (index == 4) {
      star[0].img = img
      star[1].img = img
      star[2].img = img
      star[3].img = img
      star[4].img = img
    }
    that.setData({
      index: index + 1,
      star: star
    })
  },
  // -----------------------------------------------收藏-----------------------------------------------
  Collection: function (e) {
    var that = this
    var store_id = that.data.id
    var user_id = wx.getStorageSync('users').id
    app.util.request({
      'url': 'entry/wxapp/Collection',
      'cachetime': '0',
      data: { store_id: store_id, user_id: user_id },
      success: function (res) {
        if (res.data == 1) {
          that.setData({
            Collection: true
          })
          wx: wx.showToast({
            title: '收藏成功',
            icon: '',
            image: '',
            duration: 2000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else {
          wx: wx.showToast({
            title: '取消收藏成功',
            icon: 'fail',
            image: '',
            duration: 2000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          that.setData({
            Collection: false
          })
        }
      },
    })

  },
  // ---------------------------------获取输入框的内容--------------------------
  textarea: function (e) {
    var value = e.detail.value
    this.setData({
      value: value
    })
  },
  // ---------------------------------点击发表评论弹出评论框--------------------------
  comments: function (e) {
    var that = this
    var user_id = wx.getStorageSync('users').id
    app.util.request({
      'url': 'entry/wxapp/GetUserInfo',
      'cachetime': '0',
      data: { user_id: user_id },
      success: function (res) {
        if (res.data.state == 1) {
          that.setData({
            comments: true,
            relpay: false
          })
        } else {
          wx: wx.showModal({
            title: '提示',
            content: '您的账号异常，请尽快联系管理员',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '',
            confirmText: '确定',
            confirmColor: '',
            success: function (res) {
              // wx: wx.navigateBack({
              //   delta: 1,
              // })
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      },
    })

  },
  // ---------------------------------点击取消隐藏评论框--------------------------
  formid_three: function (e) {
    app.util.request({
      'url': 'entry/wxapp/SaveFormid',
      'cachetime': '0',
      data: {
        user_id: wx.getStorageSync('users').id,
        form_id: e.detail.formId,
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {

      },
    })
    var that = this
    this.setData({
      comments: false
    })
  },
  settled: function (e) {
    wx.navigateTo({
      url: '../settled/settled',
    })
  },
  // ---------------------------------点击完成评论--------------------------
  formid_two: function (e) {
    console.log('点击完成评论')
    app.util.request({
      'url': 'entry/wxapp/SaveFormid',
      'cachetime': '0',
      data: {
        user_id: wx.getStorageSync('users').id,
        form_id: e.detail.formId,
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {

      },
    })
    var that = this
    // 星级
    var index = that.data.index
    var value = that.data.value
    var store_id = that.data.id
    var user_id = wx.getStorageSync('users').id
    var reflex_id = that.data.reflex_id
    function getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
      return currentdate;
    }
    var time = getNowFormatDate()
    function fun_submit(arg) {
      var date1 = new Date();
      var date2 = new Date(date1);
      date2.setDate(date1.getDate() + 7);
      var times = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
      return times
    }
    if (value == null || value == '') {
      wx: wx.showModal({
        title: '提示',
        content: '请输入评论的内容',
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
      if (that.data.relpay == false) {
        if (index == 0) {
          wx: wx.showModal({
            title: '提示',
            content: '小主，给个评分吧',
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
          app.util.request({
            'url': 'entry/wxapp/StoreComments',
            'cachetime': '0',
            data: { store_id: store_id, user_id: user_id, details: value, score: index },
            success: function (res) {
              console.log('评论完成')
              console.log(res)
              that.setData({
                comments: false
              })
              wx: wx.showToast({
                title: '发表成功',
                icon: '',
                image: '',
                duration: 2000,
                mask: true,
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
              setTimeout(function () {
                that.reload()
              }, 2000)
              var pl_id = res.data
              // 搜索formid
              app.util.request({
                'url': 'entry/wxapp/GetFormid',
                'cachetime': '0',
                data: { user_id: that.data.store.user_id },
                success: function (res) {
                  console.log('搜索form_id')
                  console.log(res)
                  var formid_array = []
                  for (let i in res.data) {
                    res.data[i].hours = res.data[i].time.slice(10, 19)
                    res.data[i].time = fun_submit(res.data[i].time, 7) + res.data[i].hours
                    if (time <= res.data[i].time) {
                      formid_array.push(res.data[i])
                    } else {
                      app.util.request({
                        'url': 'entry/wxapp/DelFormid',
                        'cachetime': '0',
                        data: {
                          user_id: res.data[i].id,
                          form_id: res.data[i].form_id
                        },
                        success: function (res) {
                          console.log('删除form_id')
                          console.log(res)
                        },
                      })
                    }
                  }
                  // 发送模板消息
                  app.util.request({
                    'url': 'entry/wxapp/StorehfMessage',
                    'cachetime': '0',
                    data: {
                      pl_id: pl_id,
                      form_id: formid_array[0].form_id,
                      user_id: formid_array[0].user_id,
                      openid: formid_array[0].openid
                    },
                    success: function (res) {
                      console.log('发送模板消息')
                      console.log(res)
                      app.util.request({
                        'url': 'entry/wxapp/DelFormid',
                        'cachetime': '0',
                        data: {
                          form_id: formid_array[0].form_id,
                          user_id: formid_array[0].user_id,
                        },
                        success: function (res) {
                          console.log('删除已经使用的模板消息')
                          console.log(res)
                        },
                      })
                    },
                  })
                },
              })
            },
          })
        }
      } else {
        app.util.request({
          'url': 'entry/wxapp/reply',
          'cachetime': '0',
          data: { id: reflex_id, reply: value },
          success: function (res) {
            if (res.data == 1) {
              that.setData({
                reply: false,
                comments: false
              })
              that.reload()
            }
          },
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.reload()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this
    var user_id = wx.getStorageSync('users').id
    var name = that.data.store.store_name
    var store_id = that.data.store.id
    return {
      title: name,
      path: '/zh_tcwq/pages/sellerinfo/sellerinfo?user_id=' + user_id + '&id=' + store_id + '&type=' + 1,
      success: function (res) {
        app.util.request({
          'url': 'entry/wxapp/StoreFxNum',
          'cachetime': '0',
          data: { store_id: store_id },
          success: function (res) {
            that.reload()
          },
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})
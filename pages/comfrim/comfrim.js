import fn from '../../utils/axios.js';
Page({

  data: {
    ajaxUrl:'api.php?entry=app&c=authenticate&a=authenticate&do=add'
  },

  onLoad: function (options) {
    const that = this;
    const id = options.id;
    const infoList = fn.ajaxTo('api.php?entry=app&c=authenticate&a=authenticate&do=display',{
      uid:id
    }).then(function(res){
      if(res.data.length == 0){

      }else{
        let ajaxUrl = 'api.php?entry=app&c=authenticate&a=authenticate&do=edit';
        that.setData({
          ajaxUrl:ajaxUrl,
          ...res.data
        })
        console.log(that.data);
      }
    })
  },

  //改变input内容 自动赋值给data 
  changeForm:function(e){
    console.log(e)

    const name = e.currentTarget.dataset.name;

    const value = e.detail.value;

    this.setData({
      [name]:value
    })

    console.log(this.data);
  },

  // 扫一扫名片
  scanCard:function(){
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res);
        var tempFilePaths = res.tempFilePaths;
        wx.showLoading({
          title: '识别中...',
        })

        wx.uploadFile({
          url: 'https://blue.widiazine.cn/BLueLogistics/api.php?entry=app&c=business_card&a=business_card', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'img',
          success: function (res) {
            console.log(res);
            if(res.statusCode == 200){
              const data = JSON.parse(res.data);
              that.setData({
                linkman : data[0].content,
                phone : data[2].content,
                company : data[3].content,
                address : data[4].desc == "地址" ? data[4].content : data[5].content
              })
              console.log(that.data);
              wx.hideLoading();
            }
          }
        })
      }
    })
  },

  // 上传图片
  uploadImg:function(e){
    const that = this;
    const name = e.currentTarget.dataset.name;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.showLoading({
          title: '正在上传中...',
        });
        wx.uploadFile({
          url: 'https://blue.widiazine.cn/BLueLogistics/api.php?entry=sys&c=upload&a=upload',
          filePath: tempFilePaths[0],
          name: 'filename',
          success: function (res) {
            console.log(res);
            if (res.statusCode == 200) {
              const data = JSON.parse(res.data);
              that.setData({
                [name]:data.imgURL
              })
              wx.hideLoading();
            }
          }
        })
      }
    })
  },

  // 提交信息
  submitForm:function(){
    let userInfo = wx.getStorageSync('userInfo');
    let data = {...this.data};
    // 删除多余的
    delete data.infoList;
    data = {...data,...this.data.infoList,uid:userInfo.id};

    // 获取动态的接口api
    const ajaxUrl = this.data.ajaxUrl;

    const result = fn.ajaxTo(ajaxUrl,data);
    result.then(function(res){
      console.log(res)
      const data = res.data;
      if(res.statusCode == 200){
        if(data.status == 1){
          userInfo.company_id = data.data;
          wx.setStorage({
            key: 'userInfo',
            data: userInfo,
          })
          setTimeout(() => {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })
            // 2s后返回到我的页面
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 2000)
          },1000)
          
          
        }
      }
    })
  }

})
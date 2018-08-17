Page({
  data: {
    category:[
      '专线',
      '商家',
      '店铺'
    ],
    index:null
  },
  onLoad: function (options) {
  
  },

  // 分类选择
  bindPickerChange:function(e){
    let value = e.detail.value;
    this.setData({
      index:value
    })
  }
})
import fn from '../../utils/axios.js';
Page({
  data: {
    category:[
      '专线',
      '公司',
    ],
    index:0
  },
  onLoad: function (options) {
  
  },

  // 分类选择
  bindPickerChange:function(e){
    let value = e.detail.value;
    this.setData({
      index:value
    })
  },

  //热搜索
  searchInput:function(e){
    const that = this;
    let value = e.detail.value;

    // 正则检测英文
    let engReg = new RegExp("[A-Za-z]+");

    let isEng = engReg.test(value);

    if(!isEng && value != ""){
      let result = fn.ajaxTo('api.php?entry=app&c=logistics&a=company&do=search',{
        type:Number(that.data.index) + 1,
        company:value
      })
      .then((res) => {
        if(res.data.status == 1){
          that.setData({
            lists:res.data.data.lists
          })
        }
      })
    }
  } 
})
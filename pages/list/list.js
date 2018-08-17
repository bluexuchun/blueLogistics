const app = getApp();
Page({
  data: {
    // 搜索框
    inputShowed: false,
    inputVal: "",

    // 国内热门城市
    hotCitys:[
      '上海',
      '北京',
      '杭州',
      '广州',
      '成都',
      '苏州',
    ],
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
    dataSource:[
      {
        name:'A',
        group:[
          '啊',
          '阿',
          '吖',
          '嗄',
          '锕',
          '啊',
          '阿',
          '吖',
          '嗄',
          '锕',
          '啊',
          '阿',
          '吖',
          '嗄',
          '锕',
          '啊',
          '阿',
          '吖',
          '嗄',
          '锕'
        ]
      },
      {
        name:'B',
        group:[
          '吧',
          '把',
          '呗',
          '不',
          '半',
          '吧',
          '把',
          '呗',
          '不',
          '半',
          '吧',
          '把',
          '呗',
          '不',
          '半',
          '吧',
          '把',
          '呗',
          '不',
          '半',
        ]
      },
      {
        name:'C',
        group:[
          '从',
          '吃',
          '车',
          '传',
          '次',
          '从',
          '吃',
          '车',
          '传',
          '次',
          '从',
          '吃',
          '车',
          '传',
          '次'
        ]
      },
      {
        name: 'D',
        group: [
          '从',
          '吃',
          '车',
          '传',
          '次',
          '从',
          '吃',
          '车',
          '传',
          '次'
        ]
      },
      {
        name: 'E',
        group: [
          '从',
          '吃',
          '车',
          '传',
          '次', 
          '从',
          '吃',
          '车',
          '传',
          '次'
        ]
      }
    ],
    // 跳转到指定的Id
    aId:null
  },

  onLoad: function (options) {
    const that = this;
    wx.getSystemInfo({
      success: function(res) {
        // 给scroll-view高度
        that.setData({
          mainHeight: res.windowHeight
        })
      },
    })
    
  },

  // 滚动
  scrollList:function(e){
    console.log(e);
    const that = this;

    // 获取所有id的位置
    wx.createSelectorQuery().selectAll('.list-group').boundingClientRect(function (rects) {
      rects.forEach(function (rect) {
        let id = rect.id;
        let top = rect.top;

        // 计算范围值

        let minDir,
            maxDir = 5,
            height = 35;

        let dataSource = [...that.data.dataSource]
        dataSource.map((v,i) => {
          if(v.name == id){
            minDir = -1 * v.group.length * height;
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
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
})
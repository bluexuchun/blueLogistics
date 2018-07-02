// components/common-tabnav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabnavs: {
      type: Object,
      observer: function (newData, oldData) {
        this._propertyChange(newData, oldData);
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navWidth:100,
    tabnavLists:[]
  },
  attached:function(){
    if(this.properties.tabnavs != null){
      let length = this.properties.tabnavs.navLists.length;
      let navWidth = (100 / length).toFixed(1);
      this.setData({
        navWidth: navWidth,
        tabnavLists: this.properties.tabnavs.navLists
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    navigateTo:function(e){
      const url = e.currentTarget.dataset.url;
      // 获取当前路由
      const p = getCurrentPages();
      const route = p.pop().__route__;
      if(url != route){
        wx.navigateTo({
          url: url,
        })
      }
    },
    _propertyChange: function (newVal, oldVal) {
      const newLists = newVal.navLists;
      let navlists = [];
      newLists.map((v,i)=>{
        if(v.isShow){
          navlists.push(v);
        }
      })
      this.setData({
        tabnavLists:navlists
      })
    }
  }
})

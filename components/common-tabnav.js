// components/common-tabnav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabnavs: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    navWidth:100
  },
  attached:function(){
    console.log(this.properties.tabnavs);

    let length = this.properties.tabnavs.navLists.length;
    let navWidth = (100 / length).toFixed(1);
    this.setData({
      navWidth:navWidth
    })
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
    }
  }
})

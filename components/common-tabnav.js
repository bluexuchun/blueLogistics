// components/common-tabnav.js
const app = getApp();
import fn from '../utils/axios.js';
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
      console.log(this.properties.tabnavs);
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
      console.log(e);
      // 如果id为1的话 则用navigateTo
      let id = e.currentTarget.dataset.id;
      let url = e.currentTarget.dataset.url;
      // 获取当前路由
      const p = getCurrentPages();
      const route = p.pop().__route__;
      if(id == 1){
        if (url != route) {
          url = '/' + url;
          wx.navigateTo({
            url: url,
          })
        }
      }else{
        if (url != route) {
          url = '/' + url;
          wx.reLaunch({
            url: url,
          })
        }
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
      console.log(this.data.tabnavLists)
    },
    
    onGotUserInfo:function(e){
      console.log(e);
      let userDetail = wx.getStorageSync('userInfo');
      let userInfo = e.detail.userInfo;
      let url = e.currentTarget.dataset.url;
      let id = e.currentTarget.dataset.id;
      if(!userDetail){
        if (userInfo != undefined) {
          // 获取code
          wx.login({
            success: function (res) {
              const code = res.code;
              const userId = fn.ajaxTo('api.php?entry=app&c=login&a=app_wechat_login', {
                code: code
              });

              userId.then(function (res) {
                console.log(res);
                const data = res.data;
                // 获取openid
                const openidInfo = {
                  'openid': data.openid,
                  'session_key': data.session_key
                };
                userInfo = { ...userInfo, ...openidInfo };

                // 保存用户信息
                const result = fn.ajaxTo('api.php?entry=app&c=user&a=user&do=login', userInfo);
                result.then(function (res) {
                  console.log(res);
                  const data = res.data.data;

                  if (res.statusCode == 200) {
                    // 将用户信息赋给全局变量
                    app.globalData.userInfo = userInfo;
                    userInfo = { ...userInfo, id: data.id, company_id: data.company_id }

                    // 将用户信息设置成缓存
                    wx.setStorage({
                      key: 'userInfo',
                      data: userInfo
                    })

                    // 保存用户信息 并跳转我的页面
                    // 获取当前路由
                    const p = getCurrentPages();
                    const route = p.pop().__route__;
                    if(id == 1){
                      if (url != route) {
                        url = '/' + url;
                        wx.navigateTo({
                          url: url,
                        })
                      }
                    }else{
                      if (url != route) {
                        url = '/' + url;
                        wx.reLaunch({
                          url: url,
                        })
                      }
                    }
                  }
                })
              })
            }
          });
        }
      }else{
        // 获取当前路由
        const p = getCurrentPages();
        const route = p.pop().__route__;
        if(id == 1){
          if (url != route) {
            url = '/' + url;
            wx.navigateTo({
              url: url,
            })
          }
        }else{
          if (url != route) {
            url = '/' + url;
            wx.reLaunch({
              url: url,
            })
          }
        }
        
      }
    }
  }
})

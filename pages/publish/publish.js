const app = getApp();
import fn from '../../utils/axios.js';
Page({
  data: {
    systemInfo:null,
    tabnavs:null,
    areaInfo: {
      region: ['北京市', '北京市', '东城区'],
      initArea: '起始地',
      initDetail: null,
      targetArea: '目的地',
      targetDetail: null
    },
  },

  onLoad: function (options) {
    const that = this;
    let userInfo = wx.getStorageSync('userInfo');
    const showType = options.id;

    // 点击我的发布
    if(showType == 'show'){
      const content = fn.ajaxTo('api.php?entry=app&c=route&a=route&do=show',{
        company_id:userInfo.company_id
      }).then((res)=>{
        const data = res.data.data;
        if(res.statusCode == 200){
          if(res.data.status == 1){
            console.log(data.weight_price);
            const inputData = {
              weight_price: data.weight_price,
              area_price: data.area_price,
              vehicle_type: data.vehicle_type
            };
            console.log(inputData);
            const areaInfo = {
              initArea: data.origin_district,
              initDetail: [data.origin_province, data.origin_city, data.origin_district],
              targetArea: data.dest_district,
              targetDetail: [data.dest_province, data.dest_city, data.dest_district]
            }
            that.setData({
              ...inputData,
              areaInfo:areaInfo
            })
          }
        }
      })
    } 

    // 改变底部导航栏
    const tabnavs = { ...app.globalData.tabnavs };
    const systemInfo = {...app.globalData.systemInfo};

    tabnavs.navLists[0].isShow = true;
    tabnavs.navLists[1].isShow = true;
    tabnavs.navLists[2].isShow = true;
    tabnavs.navLists[0].isSelected = false;
    tabnavs.navLists[1].isSelected = true;
    tabnavs.navLists[2].isSelected = false;

    this.setData({
      tabnavs: tabnavs
    })

  },

  onShow:function(options){
    const that = this;
    const userInfo = wx.getStorageSync('userInfo');
    // 获取用户公司信息
    const result = fn.ajaxTo('api.php?entry=app&c=user&a=user', {
      uid: userInfo.id
    }).then(function (res) {
      const status = { ...that.data.status };
      const data = res.data;
      console.log(data.is_checked);
      if (data.is_checked == 0) {
        status.word = '正在审核中,还不能发布路线噢';
        status.value = 0;
      } else if (data.is_checked == 1) {
        status.word = '审核通过';
        status.value = 1;
      } else if (data.is_checked == 2) {
        status.word = '由于审核失败,不能发布路线,请重新审核公司信息';
        status.value = 2;
      }
      that.setData({
        status: status
      })
    })
    
  },
  
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindinitArea: function (e) {
    const areaInfo = { ...this.data.areaInfo };
    areaInfo.initArea = e.detail.value[2];
    areaInfo.initDetail = e.detail.value;
    this.setData({
      areaInfo: areaInfo
    })
  },
  bindtargetArea: function (e) {
    const areaInfo = { ...this.data.areaInfo };
    areaInfo.targetArea = e.detail.value[2];
    areaInfo.targetDetail = e.detail.value;
    this.setData({
      areaInfo: areaInfo
    })
  },
  changeForm:function(e){
    let name = e.currentTarget.dataset.name;
    let value = e.detail.value;
    this.setData({
      [name]:value
    });
  },
  submitForm:function(){
    let userInfo = wx.getStorageSync('userInfo');
    let stateData = {...this.data};
    let areaInfo = stateData.areaInfo;

    // 判断审核是否通过
    if(stateData.status.value != 1){
      wx.showToast({
        title: stateData.status.word,
        icon: 'none',
        duration: 1500,
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/me/me',
        })
      },1500);
      return false;
    }

    // 判断信息是否填写
    if(areaInfo.initDetail == null || areaInfo.targetDetail == null){
      wx.showToast({
        title: '请选择起始地或目的地',
        icon:'none',
        duration:2000
      })
      return false;
    }
    areaInfo = {
      origin_province: areaInfo.initDetail[0],
      origin_city: areaInfo.initDetail[1],
      origin_district: areaInfo.initDetail[2],
      dest_province: areaInfo.targetDetail[0],
      dest_city: areaInfo.targetDetail[1],
      dest_district: areaInfo.targetDetail[2]
    }
    delete stateData.systemInfo;
    delete stateData.tabnavs;
    delete stateData.areaInfo;
    const data = {
      ...stateData,
      ...areaInfo,
      'company_id':userInfo.company_id
    }
    const result = fn.ajaxTo('api.php?entry=app&c=route&a=route&do=add',data)
    .then((res) => {
      const data = res.data
      if(res.statusCode == 200){
        if(data.status == 1){
          setTimeout( () => {
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000
            });
            setTimeout(() => {
              wx.reLaunch({
                url: '/pages/index/index'
              })
            }, 1000);
          },1000)
        }
      }
    })
  }
})
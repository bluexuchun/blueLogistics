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
    // 选择 公斤&斤
    unit:{
      index:0,
      array:['公斤','斤']
    },
    //重货价
    weightPrice:[
      {
        yl:'',
        price:''
      }
    ],
    //轻货价
    lightPrice: [
      {
        yl: '',
        price: ''
      }
    ],
    // 发车频率
    carNum:{
      day:'',
      num:''
    }
  },

  onLoad: function (options) {
    const that = this;
    let mainHeight = app.globalData.systemInfo.windowHeight - (app.globalData.tabnavs.option.heightPx) / (750 / app.globalData.systemInfo.windowWidth);
    console.log(mainHeight);
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

    tabnavs.navLists[0].isSelected = false;
    tabnavs.navLists[1].isSelected = true;
    tabnavs.navLists[2].isSelected = false;
    tabnavs.navLists[3].isSelected = false;

    this.setData({
      tabnavs: tabnavs,
      mainHeight:mainHeight
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
    console.log(stateData);
    // 判断审核是否通过
    // if(stateData.status.value != 1){
    //   wx.showToast({
    //     title: stateData.status.word,
    //     icon: 'none',
    //     duration: 1500,
    //   })
    //   setTimeout(() => {
    //     wx.reLaunch({
    //       url: '/pages/me/me',
    //     })
    //   },1500);
    //   return false;
    // }

    // 判断信息是否填写
    // if(areaInfo.initDetail == null || areaInfo.targetDetail == null){
    //   wx.showToast({
    //     title: '请选择起始地或目的地',
    //     icon:'none',
    //     duration:2000
    //   })
    //   return false;
    // }
    // areaInfo = {
    //   origin_province: areaInfo.initDetail[0],
    //   origin_city: areaInfo.initDetail[1],
    //   origin_district: areaInfo.initDetail[2],
    //   dest_province: areaInfo.targetDetail[0],
    //   dest_city: areaInfo.targetDetail[1],
    //   dest_district: areaInfo.targetDetail[2]
    // }
    // delete stateData.systemInfo;
    // delete stateData.tabnavs;
    // delete stateData.areaInfo;
    // const data = {
    //   ...stateData,
    //   ...areaInfo,
    //   'company_id':userInfo.company_id
    // }
    // const result = fn.ajaxTo('api.php?entry=app&c=route&a=route&do=add',data)
    // .then((res) => {
    //   const data = res.data
    //   if(res.statusCode == 200){
    //     if(data.status == 1){
    //       setTimeout( () => {
    //         wx.showToast({
    //           title: '发布成功',
    //           icon: 'success',
    //           duration: 2000
    //         });
    //         setTimeout(() => {
    //           wx.reLaunch({
    //             url: '/pages/index/index'
    //           })
    //         }, 1000);
    //       },1000)
    //     }
    //   }
    // })
  },
  // 增加价格区间
  addLine:function(e){
    let name = e.currentTarget.dataset.name;
    let newLists;
    let newAry = {
      yl: '',
      price: ''
    };
    switch(name){
      case 'weightPrice':
        newLists = [...this.data.weightPrice];
        newLists.push(newAry);
        break;
      case 'lightPrice':
        newLists = [...this.data.lightPrice];
        newLists.push(newAry);
        break;
      default:
        return false;
    }

    this.setData({
      [name]:newLists
    })
  },

  // 删除价格区间
  deleteLine:function(e){
    let name = e.currentTarget.dataset.name;
    let newLists;
    switch (name) {
      case 'weightPrice':
        newLists = [...this.data.weightPrice];
        if(newLists.length <= 1){
          wx.showToast({
            title: '不能删除最后一个价格区间!',
            icon: 'none',
            duration: 2000
          });
          return false;
        }
        newLists.pop();
        break;
      case 'lightPrice':
        newLists = [...this.data.lightPrice];
        if (newLists.length <= 1) {
          wx.showToast({
            title: '不能删除最后一个价格区间!',
            icon: 'none',
            duration: 2000
          });
          return false;
        }
        newLists.pop();
        break;
      default:
        return false;
    }

    this.setData({
      [name]: newLists
    })
  },

  // input价格区间 改变
  inputChange:function(e){
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let parent = e.currentTarget.dataset.parent;
    let name = e.currentTarget.dataset.name;
    let value = e.detail.value;
    let newAry;

    switch (parent){
      case 'weightPrice':
        newAry = [...this.data.weightPrice];
        newAry[index][name] = value;
        break;
      case 'lightPrice':
        newAry = [...this.data.lightPrice];
        newAry[index][name] = value;
        break;
      default:
        return false;
    }

    this.setData({
      [parent]:newAry
    })
  },

  // 发车频率填写
  carNum:function(e){
    let name = e.currentTarget.dataset.name;
    let value = e.detail.value;

    let carNum = {...this.data.carNum};
    carNum[name] = value;
    this.setData({
      carNum:carNum
    })
  },
  //单位转化
  bindPickerChange:function(e){
    let value = e.detail.value;
    let unit = {...this.data.unit};
    unit.index = value;
    this.setData({
      unit:unit
    })
  } 
})
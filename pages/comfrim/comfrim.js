import fn from '../../utils/axios.js';
Page({

  data: {
    imgUrl:'https://blue.widiazine.cn/BLueLogistics',
    ajaxUrl:'api.php?entry=app&c=authenticate&a=authenticate&do=add',
    // 公司性质
    propties:{
      index:"0",
      group:['专线','仓库','冷链','危化','网点']
    },
    // 公司电话
    phonelits:[
      {
        phone:'',
        address:''
      }
    ],
    // 专线
    lineLists:[
      {
        areaInfo:{
          init: null,
          initArea: '请选择起始地',
          target: null,
          targetArea: '请选择目的地'
        },
        line_company:'',
        line_name:'',
        line_phone:'',
        line_address:'',
        landline:[{
          label:'',
          number:''
        }],
        lineContact:[{
          name:'',
          phone:''
        }],
        // 选择 公斤&斤
        unit: {
          index: 0,
          array: ['公斤', '斤']
        },
        //重货价
        weight_price: [
          {
            yl: '',
            price: ''
          }
        ],
        //轻货价
        light_price: [
          {
            yl: '',
            price: ''
          }
        ],
        // 发车频率
        car_num: {
          day: '',
          num: ''
        },
        low_price:'',
        tran_time:'',
        id:''
      }
    ],

    // 联系人
    contactLists:[
      {
        linkman:'',
        phone:''
      }
    ],
    // 门头照片
    mt_picture:[],
    // 办公照片
    bg_picture:[],
    // 场地照片
    cd_picture:[],
    // 其他照片
    other_picture:[]

  },

  onLoad: function (options) {
    const that = this;
    let id = options.id;
    let company_id = wx.getStorageSync('userInfo')['company_id'];
    if(!id){
      id = wx.getStorageSync('userInfo')['id'];
    }
    console.log(id);
    const infoList = fn.ajaxTo('api.php?entry=app&c=authenticate&a=authenticate&do=display',{
      uid:id
    }).then(function(res){
      console.log(res);
      if(!company_id){

      }else{
        let ajaxUrl = 'api.php?entry=app&c=authenticate&a=authenticate&do=edit';

        res.data.bg_picture = res.data.bg_picture ? res.data.bg_picture : [];
        res.data.cd_picture = res.data.cd_picture ? res.data.cd_picture : [];
        res.data.mt_picture = res.data.mt_picture ? res.data.mt_picture : [];
        res.data.other_picture = res.data.other_picture ? res.data.other_picture : [];

        res.data.contactLists = res.data.contactLists ? res.data.contactLists : [
          {
            linkman: '',
            phone: ''
          }
        ];

        res.data.phonelits = res.data.phonelits ? res.data.phonelits : [
          {
            phone: '',
            address: ''
          }
        ];

        res.data.lineLists = res.data.lineLists.length > 0 ? res.data.lineLists : [
          {
            areaInfo: {
              init: null,
              initArea: '请选择起始地',
              target: null,
              targetArea: '请选择目的地'
            },
            line_company: '',
            line_name: '',
            line_phone: '',
            line_address: '',
            landline: [{
              label: '',
              number: ''
            }],
            lineContact: [{
              name: '',
              phone: ''
            }],
            // 选择 公斤&斤
            unit: {
              index: 0,
              array: ['公斤', '斤']
            },
            //重货价
            weight_price: [
              {
                yl: '',
                price: ''
              }
            ],
            //轻货价
            light_price: [
              {
                yl: '',
                price: ''
              }
            ],
            // 发车频率
            car_num: {
              day: '',
              num: ''
            },
            low_price: '',
            tran_time: '',
            id: ''
          }
        ];


        res.data.propties = {
          index: res.data.propties - 1,
          group: ['专线', '仓库', '冷链', '危化', '网点']
        }

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
    console.log(e);

    const index = e.currentTarget.dataset.index;

    const name = e.currentTarget.dataset.name;

    const value = e.detail.value;

    // 区分是数组 还是 单个Input表单的填写
    if(index == undefined){
      this.setData({
        [name]: value
      })
    }else{
      let lineLists = [...this.data.lineLists];
      lineLists[index][name] = value;
      this.setData({
        lineLists: lineLists
      })
    }
    console.log(this.data);
  },

  // 数组中的数组修改（因为只需要修改第一条数据 其余不显示 不修改）
  changeFormAry:function(e){
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let name = e.currentTarget.dataset.name;
    let label = e.currentTarget.dataset.label;
    let lineLists = [...this.data.lineLists];
    let value = e.detail.value;
    switch(name){
      case 'landline':
        lineLists[index][name][0][label] = value;
        break;
      case 'lineContact':
        lineLists[index][name][0][label] = value;
        break;
      default:
        return false;
    }
    this.setData({
      lineLists:lineLists
    })
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
              let imgUrl = that.data.imgUrl + data.imgURL;
              that.setData({
                [name]: imgUrl
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
    const that = this;
    let userInfo = wx.getStorageSync('userInfo');
    let data = {...this.data};
    data.propties = Number(data.propties.index) + 1;

    console.log(data.bg_picture);

    // data.areaInfo = JSON.stringify(data.areaInfo);
    // data.bg_picture = JSON.stringify(data.bg_picture);
    // data.cd_picture = JSON.stringify(data.cd_picture);
    // data.mt_picture = JSON.stringify(data.mt_picture);
    // data.other_picture = JSON.stringify(data.other_picture);
    data.contactLists = JSON.stringify(data.contactLists);
    data.phonelits = JSON.stringify(data.phonelits);
    // data.lineLists = JSON.stringify(data.lineLists);

    console.log(data.bg_picture);
    // 删除多余的
    delete data.infoList;
    data = {...data,...this.data.infoList,uid:userInfo.id};

    console.log(data);
    // 获取动态的接口api
    const ajaxUrl = this.data.ajaxUrl;

    // wx.navigateTo({
    //   url: '/pages/comfrim/next?type=' + that.data.propties.index,
    // })

    const result = fn.ajaxTo(ajaxUrl,data);
    console.log(data);
    result.then(function(res){
      console.log(res);
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
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
            // wx.navigateTo({
            //   url: 'pages/comfrim/next?id='+data.data,
            // })
          },1000)
        }
      }
    })
  },

  // 选择企业性质
  bindPickerChangePro:function(e){
    let name = e.target.dataset.name;
    let chooseId = e.detail.value;
    let propties = {...this.data.propties};
    let data = {...this.data}
    delete data.cc_area,
           data.cc_type,
           data.go_phone,
           data.mass_goods,
           data.ll_area,
           data.ll_type,
           data.wh_area,
           data.wh_type;
    
    propties.index = chooseId;
    // 每次切换的时候 清楚专线 以及 其他独特的信息
    this.setData({
      propties: propties,
      [name]:propties.group[chooseId]
    })
    console.log(this.data);
  },

  // 地址选择
  bindArea:function(e){
    console.log(e);
    let index = e.target.dataset.index;
    // 判断类型
    let type = e.target.dataset.name;

    let lineLists = [...this.data.lineLists ];
    // 获取市
    let city = e.detail.value[0];
    // 详细信息
    let detail = e.detail.value;
    

    if(type == 'init'){
      lineLists[index].areaInfo.init = city;
      lineLists[index].areaInfo.initArea = detail;
    }else{
      lineLists[index].areaInfo.target = city;
      lineLists[index].areaInfo.targetArea = detail;
    }
    
    this.setData({
      lineLists: lineLists
    })
    
    console.log(this.data);
    
  },

  // 增加专线
  addLineLists:function(){
    let lineLists = [...this.data.lineLists];
    let newLine = {
      areaInfo: {
        init: null,
        initArea: '请选择起始地',
        target: null,
        targetArea: '请选择目的地'
      },
      line_company: '',
      line_name: '',
      line_phone: '',
      line_address: '',
      landline: [{
        label: '',
        number: ''
      }],
      lineContact: [{
        name: '',
        phone: ''
      }],
      // 选择 公斤&斤
      unit: {
        index: 0,
        array: ['公斤', '斤']
      },
      //重货价
      weight_price: [
        {
          yl: '',
          price: ''
        }
      ],
      //轻货价
      light_price: [
        {
          yl: '',
          price: ''
        }
      ],
      // 发车频率
      car_num: {
        day: '',
        num: ''
      },
      low_price: '',
      tran_time: '',
      id: ''
    }
    lineLists.push(newLine);
    this.setData({
      lineLists: lineLists
    }) 
  },

  // 删除专线
  deleteLineLists:function(){
    let lineLists = [...this.data.lineLists];
    // 获取数组的长度 如果小于1则提示不能删除
    let areaLength = lineLists.length;
    if (areaLength <= 1){
      wx.showToast({
        title: '不能删除最后一个专线!',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    lineLists.pop();
    this.setData({
      lineLists: lineLists
    })
  },

  // 照片数组的管理
  uploadPic:function(e){
    const that = this;
    let name = e.currentTarget.dataset.name;
    // 上传图片
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
              let imgUrl = that.data.imgUrl + data.imgURL
              that.addPic(name, imgUrl);
              wx.hideLoading();
            }
          }
        })
      }
    })
  },
    
  // 图片添加
  addPic:function(name,imgUrl){
    let dataAry;
    switch (name) {
      case 'mt_picture':
        dataAry = [...this.data.mt_picture];
        dataAry.push(imgUrl);
        this.setData({
          mt_picture: dataAry
        })
        break;
      case 'bg_picture':
        dataAry = [...this.data.bg_picture];
        dataAry.push(imgUrl);
        this.setData({
          bg_picture: dataAry
        })
        break;
      case 'cd_picture':
        dataAry = [...this.data.cd_picture];
        dataAry.push(imgUrl);
        this.setData({
          cd_picture: dataAry
        })
        break;
      case 'other_picture':
        dataAry = [...this.data.other_picture];
        dataAry.push(imgUrl);
        this.setData({
          other_picture: dataAry
        })
        break;
      default:
        return false;
    }
  },

  //删除照片
  deletePic:function(e){
    let index = e.target.dataset.index;
    let name = e.target.dataset.name;
    let dataAry;

    switch(name){
      case 'mt_picture':
        dataAry = [...this.data.mt_picture];
        dataAry.splice(index,1);
        this.setData({
          mt_picture: dataAry
        })
        break;
      case 'bg_picture':
        dataAry = [...this.data.bg_picture];
        dataAry.splice(index, 1);
        this.setData({
          bg_picture: dataAry
        })
        break;
      case 'cd_picture':
        dataAry = [...this.data.cd_picture];
        dataAry.splice(index, 1);
        this.setData({
          cd_picture: dataAry
        })
        break;
      case 'other_picture':
        dataAry = [...this.data.other_picture];
        dataAry.splice(index, 1);
        this.setData({
          other_picture: dataAry
        })
        break;
      default:
        return false;
    }
  },

  // 选择公斤&斤
  bindPickerChange: function (e) {

    const index = e.currentTarget.dataset.index;

    const value = e.detail.value;

    let lineLists = [...this.data.lineLists];
    lineLists[index].unit.index = value;

    this.setData({
      lineLists: lineLists
    })
  },

  // input价格区间 改变
  inputChange: function (e) {
    console.log(e);
    let index = e.currentTarget.dataset.pindex;
    let pindex = e.currentTarget.dataset.index;
    let parent = e.currentTarget.dataset.parent;
    let name = e.currentTarget.dataset.name;
    let value = e.detail.value;
    let lineLists = [...this.data.lineLists];

    switch (parent) {
      case 'weight_price':
        lineLists[index]['weight_price'][pindex][name] = value;
        break;
      case 'light_price':
        lineLists[index]['light_price'][pindex][name] = value;
        break;
      default:
        return false;
    }

    this.setData({
      lineLists: lineLists
    })
    console.log(this.data);
  },

  // 增加价格区间
  addLine: function (e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let name = e.currentTarget.dataset.name;

    let lineLists;
    let newAry = {
      yl: '',
      price: ''
    };
    switch (name) {
      case 'weight_price':
        lineLists = [...this.data.lineLists];
        lineLists[index][name].push(newAry);
        break;
      case 'light_price':
        lineLists = [...this.data.lineLists];
        lineLists[index][name].push(newAry);
        break;
      default:
        return false;
    }
    
    this.setData({
      lineLists: lineLists
    })

    console.log(this.data)
  },

  // 删除价格区间
  deleteLine: function (e) {
    let index = e.currentTarget.dataset.index;
    let name = e.currentTarget.dataset.name;
    let lineLists = [...this.data.lineLists];
    let newLists;
    if (lineLists[index][name].length <= 1) {
      wx.showToast({
        title: '不能删除最后一个价格区间!',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    lineLists[index][name].pop();
        

    this.setData({
      lineLists: lineLists
    })
  },

  // 发车频率填写
  carNum: function (e) {
    let index = e.currentTarget.dataset.index;
    let name = e.currentTarget.dataset.name;
    let value = e.detail.value;

    let lineLists = [...this.data.lineLists];
    lineLists[index]['car_num'][name] = value; 
    this.setData({
      lineLists: lineLists
    })
    console.log(this.data);
  },

  // 增加联系人
  addcontact:function(){
    let contactLists = [...this.data.contactLists];
    let newItem = {
      linkman: '',
      phone: ''
    };
    contactLists.push(newItem);
    this.setData({
      contactLists: contactLists
    })
  },

  // 删除联系人
  deletecontact:function(){
    let contactLists = [...this.data.contactLists];
    if (contactLists.length <= 1) {
      wx.showToast({
        title: '不能删除最后一个联系人!',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    contactLists.pop();
    this.setData({
      contactLists: contactLists
    })
  },

  // 联系人input输入
  changeConForm:function(e){

    let index = e.currentTarget.dataset.index;

    let name = e.currentTarget.dataset.name;

    let value = e.detail.value;

    let contactLists = [...this.data.contactLists];

    contactLists[index][name] = value;

    this.setData({
      contactLists: contactLists
    })

    console.log(this.data);
  },

  // 公司电话
  changeCompanyPhone:function(e){
    let index = e.currentTarget.dataset.index;
    let name = e.currentTarget.dataset.name;
    let value = e.detail.value;
    let phonelits = [...this.data.phonelits];
    phonelits[index][name] = value;
    this.setData({
      phonelits: phonelits
    })
  },
  // 增加公司电话
  addCompanyPhone:function(e){
    let phonelits = [...this.data.phonelits];
    phonelits.push({
      phone:''
    });
    this.setData({
      phonelits: phonelits
    })
  },
  // 删除公司电话
  deleteCompanyPhone:function(e){
    let phonelits = [...this.data.phonelits];
    if(phonelits.length <= 1){
      wx.showToast({
        title: '不能删除最后一个公司电话!',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    phonelits.pop();
    this.setData({
      phonelits: phonelits
    })
  }
})
Page({

  data: {
    // 本地联系方式
    bd_contact:[{
      text:''
    }],
    // 本地地址
    bd_address:[{
      text:''
    }],
    // 电话
    lo_phone:[{
      text:''
    }],
    // 手机
    mobile:[{
      text:''
    }],
    // 传真
    fax:[{
      text:''
    }],
    // 外地联系方式
    wd_contact:[{
      text:''
    }],
    // 外地地址
    wd_address:[{
      text:''
    }],
    // 外地电话
    wd_phone:[{
      text:''
    }],
    // 外地手机
    wd_mobile:[{
      text:''
    }],
    // 外地传真
    wd_fax:[{
      text:''
    }]
  },

  onLoad: function (options) {
    console.log(options)
    let type = options.type;
    this.setData({
      type:type
    })
    console.log(this.data);
  },

  // input改变
  changeForm:function(e){
    let index = e.target.dataset.index;
    let name = e.target.dataset.name;
    let value = e.detail.value;
    let dataAry;

    // 判断是哪一个系列
    switch(name){
      case 'bd_contact':
        dataAry = [...this.data.bd_contact];
        dataAry[index].text = value;
        break;
      case 'bd_address':
        dataAry = [...this.data.bd_address];
        dataAry[index].text = value;
        break;
      case 'phone':
        dataAry = [...this.data.phone];
        dataAry[index].text = value;
        break;
      case 'mobile':
        dataAry = [...this.data.mobile];
        dataAry[index].text = value;
        break;
      case 'fax':
        dataAry = [...this.data.fax];
        dataAry[index].text = value;
        break;
      case 'wd_contact':
        dataAry = [...this.data.wd_contact];
        dataAry[index].text = value;
        break;
      case 'wd_address':
        dataAry = [...this.data.wd_address];
        dataAry[index].text = value;
        break;
      case 'wd_phone':
        dataAry = [...this.data.wd_phone];
        dataAry[index].text = value;
        break;
      case 'wd_mobile':
        dataAry = [...this.data.wd_mobile];
        dataAry[index].text = value;
        break;
      case 'wd_fax':
        dataAry = [...this.data.wd_fax];
        dataAry[index].text = value;
        break;
      default:
        this.setData({
          [name]: value
        })
        console.log(this.data);
        return value;
    }
    this.setData({
      [name]: dataAry
    })
    console.log(this.data);
  },

  // 增加input
  addLine:function(e){
    console.log(e);
    let name = e.currentTarget.dataset.name;
    let dataAry;
    let newAry = {
      text: ''
    }

    switch(name){
      case 'bd_contact':
        dataAry = [...this.data.bd_contact];
        dataAry.push(newAry);
        break;
      case 'bd_address':
        dataAry = [...this.data.bd_address];
        dataAry.push(newAry);
        break;
      case 'phone':
        dataAry = [...this.data.phone];
        dataAry.push(newAry);
        break;
      case 'mobile':
        dataAry = [...this.data.mobile];
        dataAry.push(newAry);
        break;
      case 'fax':
        dataAry = [...this.data.fax];
        dataAry.push(newAry);
        break;
      case 'wd_contact':
        dataAry = [...this.data.wd_contact];
        dataAry.push(newAry);
        break;
      case 'wd_address':
        dataAry = [...this.data.wd_address];
        dataAry.push(newAry);
        break;
      case 'wd_phone':
        dataAry = [...this.data.wd_phone];
        dataAry.push(newAry);
        break;
      case 'wd_mobile':
        dataAry = [...this.data.wd_mobile];
        dataAry.push(newAry);
        break;
      case 'wd_fax':
        dataAry = [...this.data.wd_fax];
        dataAry.push(newAry);
        break;
      default:
        return false;
    }

    this.setData({
      [name]: dataAry
    })
  },

  // 删除line
  deleteLine:function(e){
    console.log(e);
    let name = e.currentTarget.dataset.name;
    let dataAry;
    let newAry = {
      text: ''
    }

    switch (name) {
      case 'bd_contact':
        dataAry = [...this.data.bd_contact];
        // 判断长度是否小于1
        if(dataAry.length <= 1){
          wx.showToast({
            title: '不能删除最后一个!',
            icon: 'none',
            duration: 2000
          });
          return false;
        }
        dataAry.pop();
        break;
      case 'bd_address':
        dataAry = [...this.data.bd_address];
        // 判断长度是否小于1
        if (dataAry.length <= 1) {
          wx.showToast({
            title: '不能删除最后一个!',
            icon: 'none',
            duration: 2000
          });
          return false;
        }
        dataAry.pop();
        break;
      case 'phone':
        dataAry = [...this.data.phone];
        // 判断长度是否小于1
        if (dataAry.length <= 1) {
          wx.showToast({
            title: '不能删除最后一个!',
            icon: 'none',
            duration: 2000
          });
          return false;
        }
        dataAry.pop();
        break;
      case 'mobile':
        dataAry = [...this.data.mobile];
        // 判断长度是否小于1
        if (dataAry.length <= 1) {
          wx.showToast({
            title: '不能删除最后一个!',
            icon: 'none',
            duration: 2000
          });
          return false;
        }
        dataAry.pop();
        break;
      case 'fax':
        dataAry = [...this.data.fax];
        // 判断长度是否小于1
        if (dataAry.length <= 1) {
          wx.showToast({
            title: '不能删除最后一个!',
            icon: 'none',
            duration: 2000
          });
          return false;
        }
        dataAry.pop();
        break;
      case 'wd_contact':
        dataAry = [...this.data.wd_contact];
        // 判断长度是否小于1
        if (dataAry.length <= 1) {
          wx.showToast({
            title: '不能删除最后一个!',
            icon: 'none',
            duration: 2000
          });
          return false;
        }
        dataAry.pop();
        break;
      case 'wd_address':
        dataAry = [...this.data.wd_address];
        // 判断长度是否小于1
        if (dataAry.length <= 1) {
          wx.showToast({
            title: '不能删除最后一个!',
            icon: 'none',
            duration: 2000
          });
          return false;
        }
        dataAry.pop();
        break;
      case 'wd_phone':
        dataAry = [...this.data.wd_phone];
        // 判断长度是否小于1
        if (dataAry.length <= 1) {
          wx.showToast({
            title: '不能删除最后一个!',
            icon: 'none',
            duration: 2000
          });
          return false;
        }
        dataAry.pop();
        break;
      case 'wd_mobile':
        dataAry = [...this.data.wd_mobile];
        // 判断长度是否小于1
        if (dataAry.length <= 1) {
          wx.showToast({
            title: '不能删除最后一个!',
            icon: 'none',
            duration: 2000
          });
          return false;
        }
        dataAry.pop();
        break;
      case 'wd_fax':
        dataAry = [...this.data.wd_fax];
        // 判断长度是否小于1
        if (dataAry.length <= 1) {
          wx.showToast({
            title: '不能删除最后一个!',
            icon: 'none',
            duration: 2000
          });
          return false;
        }
        dataAry.pop();
        break;
      default:
        return false;
    }

    this.setData({
      [name]: dataAry
    })
  }

})
// 默认地址
const baseUrl = 'https://blue.widiazine.cn/BLueLogistics/';


function ajaxTo(url,data){
  const newurl = baseUrl + url;
  wx.showLoading({
    title: '加载中...',
  })
  return new Promise(function(resolve,reject){
    wx.request({
      url: newurl,
      data: data,
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        setTimeout(()=>{
          wx.hideLoading();
        },1000);
        
        resolve(res)
      },
      fail:function(res){
        reject(res);
      }
    })
  })
}


module.exports = {
  ajaxTo: ajaxTo
}
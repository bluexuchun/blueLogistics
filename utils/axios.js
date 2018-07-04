// 默认地址
const baseUrl = 'https://blue.widiazine.cn/';


function ajaxTo(url,data){
  const newurl = baseUrl + url;
  return new Promise(function(resolve,reject){
    wx.request({
      url: newurl,
      data: data,
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res);
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
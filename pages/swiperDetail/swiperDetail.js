var time = require('../../utils/util.js');
Page({
  data: {
    current: 0,
    nodes:'',
    title:'',
    time:''
  },
  onLoad: function (options) {
   console.log(options);
    var id = options.id;
    var that = this;
    wx.request({
      url: 'http://116.62.139.166:8080/ccdm/news/getNewsById',
      data: {
        id:id
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        that.setData({
          nodes: res.data.newsXwnr,
          title:res.data.newsXwbt,
          time: time.formatDate(res.data.newsFbsj) 
        })
      },
      fail: function (res) {  },
      complete: function (res) {  },
    });
  },
  onReady: function () {
    
  }
});

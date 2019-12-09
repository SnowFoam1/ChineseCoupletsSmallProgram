// pages/purchaseHistory/purchaseHistory.js
var userAccount = '13873642162'
var utils = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: []
  },

  //下拉函数
  upper: function() {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    
  },
 //刷新函数
  refresh:function(){
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000,
    });

  },
  //使用本地 fake 数据实现继续加载效果
  nextLoad: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 4000
    })
    var next = util.getNext();
    console.log("continueload");
    var nextData = next.data;
    this.setData({
      feed: this.data.feed.concat(nextData),
      feedLength: this.data.feedLength + nextData.length
    });
    setTimeout(function () {
      wx.showToast({
        title: '加载成功',
        icon: 'success',
        duration: 2000
      })
    }, 3000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('onload');
    userAccount = options.userAccount;
    var that = this
    wx.request({
      url: 'http://106.54.206.129:8080/user/getMessagesByReceiverId',
      data: {
        id: userAccount
      },
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        userAccount = options.userAccount;
        var result = res.data;
        console.log(result)
        for(var i=0; i<result.length; i++){
            result[i].messageTime=utils.formatTime(result[i].messageTime,'Y/M/D h:m')
        }
        that.setData({
          items: result,
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
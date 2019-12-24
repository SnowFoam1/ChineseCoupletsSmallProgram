// pages/wxlogin/wxlogin.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'',
    btntxt:'授权登录',
    userAccount:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.login({
      success: function (res) {
        console.log(res)
        that.setData({
          code: res.code
        });
      },
      fail: function () {
        console.log("失败2");
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getUser:function(e)
  {
    console.log(e)
    /*this.setData({
      btntxt:"登录"
    })*/
    if (e.detail.errMsg == 'getUserInfo:fail auth deny')
    {
      console.log("错误");
    }
    else if(e.detail.userInfo != '')
    {
      console.log(e.detail.userInfo);
      var that = this;
      wx.request({
        url: 'http://106.54.206.129:8080/user/loginByWx?code&nickName&image',
        data: {
          code:that.data.code,
          nickName:e.detail.userInfo.nickName,
          image:e.detail.userInfo.avatarUrl
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res);
          app.globalData.isLogin = true;
          app.globalData.userAccountId = res.data;
          wx.switchTab({
            url: '/pages/my/my',
          })
        },
        fail: function (res) {
          console.log("failllll");
        },
        complete: function (res) {
          
        },
      });
      /*wx.switchTab({
        url: '/pages/my/my',
      })*/
    }
    /*wx.switchTab({
      url: '/pages/my/my',
    })*/
  },
  
})
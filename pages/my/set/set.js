// pages/set/set.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAccount: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userAccount = options.userAccount;
    this.setData({
      userAccount: userAccount
    })

  },

  changePassword: function () {
    wx.navigateTo({
      url: '/pages/findpassword/index?type=' + 2,
    })
  },

  openPage: function (a) {
    var e = a.currentTarget.dataset.url;
    wx.navigateTo({
      url: e + '?userAccount=' + this.data.userAccount
    });
  },
  clearStorage:function()
  {
    wx.clearStorageSync();
    wx.showToast({
      title: '清除成功！',
    })
  },

  unLogin:function(){
    console.log("ssss"); 
    console.log(app.globalData.isLogin)
    wx.showModal({
      title: '提示',
      content: '您确定要退出登录吗？',
      showCancel: true,
      success:function(res)
      {
        if(res.confirm)
        {
          app.globalData.isLogin = false;
          wx.switchTab({
            url: '/pages/home/index',
          })
        }
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

  }
})
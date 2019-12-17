// pages/my/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAccount: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userAccount = options.userAccount;
    that.setData({
      userAccount: userAccount
    });
    console.log(this.data.userAccount);
  },

  formSubmit: function (event) {
    if (event.detail.value.userLabel == "") {
      wx.showToast({
        title: '请输入反馈',
        duration: 2000,
        image: '/icons/fail.png',
      })
    }
    else {
      var id = this.data.userAccount;
      var that = this;

      wx.request({
        url: 'http://106.54.206.129:8080/user/setLabel',
        data: {
          id: id,
          label: label
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function (res) {
          console.log(res)
        }
      })

      wx.showToast({
        title: '提交成功',
        duration: 1000,
        icon: "success"
      })
      wx.navigateBack({
        url: '/pages/my/information/information'
      })
    }

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
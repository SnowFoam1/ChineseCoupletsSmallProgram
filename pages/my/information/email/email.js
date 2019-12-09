// pages/my/information/email/email.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAccount: '',
    userEmail: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var userAccount = options.userAccount;
    that.setData({
      userAccount: userAccount
    });
    console.log(this.data.userAccount);
  },

  formSubmit: function(event) {

    this.setData({
      userEmail: event.detail.value.userEmail
    })
    var id = this.data.userAccount;
    var email = this.data.userEmail;
    var that = this;
    var thatt = this;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面

    wx.request({
      url: 'http://106.54.206.129:8080/user/setEmail',
      data: {
        id: id,
        email: email
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function(res) {
        console.log(res);
        if (res.data == '请输入正确的邮箱' || event.detail.value.userEmail=="") {
          wx.showToast({
            title: '请输入正确邮箱',
            duration: 2000,
            image: '/icons/fail.png',
          })
        } else {
          wx.showToast({
            title: '提交成功',
            duration: 2000,
            image: '/icons/success.png',
          })
          prevPage.setData({
            userEmail: thatt.data.userEmail
          });
          wx.navigateBack({
            url: '/pages/my/information/information',
          })
        }
      }
    })
  },
})
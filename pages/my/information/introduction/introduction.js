// pages/my/information/introduction/introduction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userLabel: "",
    userAccount: ""
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
    if (event.detail.value.userLabel == "") {
      wx.showToast({
        title: '请输入个性签名',
        duration: 2000,
        image: '/icons/fail.png',
      })
    } 
    else {
      this.setData({
        userLabel: event.detail.value.userLabel
      })

      var id = this.data.userAccount;
      var label = this.data.userLabel;
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
        success: function(res) {
          console.log(res)
        }
      })

      wx.showToast({
        title: '提交成功',
        duration: 1000,
        icon: "success"
      })
      var that = this;
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面
      prevPage.setData({
        userLabel: that.data.userLabel
      });
      wx.navigateBack({
        url: '/pages/my/information/information'
      })
    }

  },
})
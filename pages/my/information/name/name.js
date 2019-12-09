// pages/my/information/name/name.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
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
    if (event.detail.value.userName==""){
      wx.showToast({
        title: '请输入姓名',
        duration: 2000,
        image: '/icons/fail.png',
      })
    }
    else{
      this.setData({
        userName: event.detail.value.userName
      })
      var id = this.data.userAccount;
      var name = this.data.userName;
      var that = this;

      wx.request({
        url: 'http://106.54.206.129:8080/user/setName',
        data: {
          id: id,
          name: name
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
        duration: 2000,
        image: '/icons/fail.png'
      })
      var that = this;
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面
      prevPage.setData({
        userName: that.data.userName
      });
      wx.navigateBack({
        url: '/pages/my/information/information'
      })
    }
    
  },
})
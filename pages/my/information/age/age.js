// pages/my/information/age/age.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userAge: '',
    userAccount: ''
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
    if (event.detail.value.userAge == "") {
      wx.showToast({
        title: '请输入年龄',
        duration: 2000,
        image: '/icons/fail.png',
      })
    } 
    else {
      this.setData({
        userAge: event.detail.value.userAge
      })
      var id = this.data.userAccount;
      var age = this.data.userAge;
      var that = this;

      wx.request({
        url: 'http://106.54.206.129:8080/user/setAge',
        data: {
          id: id,
          age: age
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
        icon: 'success'
      })
      var that = this;
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面
      prevPage.setData({
        userAge: that.data.userAge
      });
      wx.navigateBack({
        url: '/pages/my/information/information'
      })
    }
  },

})
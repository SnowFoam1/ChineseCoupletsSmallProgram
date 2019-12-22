// pages/my/information/birthday/birthday.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userAge: '',
    userBirthday: '请选择', //格式化日期
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var userAccount = options.userAccount;
    var userBirthday = options.userBirthday;
    that.setData({
      userAccount: userAccount,
      userBirthday: userBirthday
    });
    console.log(this.data.userAccount);
  },

  //  点击日期组件确定事件  
  bindDateChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      userBirthday: e.detail.value
    })
  },

  formSubmit: function(event) {
    this.setData({
      userBirthday: event.detail.value.userBirthday
    })
    var id = this.data.userAccount;
    var birthday = this.data.userBirthday;
    var that = this;
    console.log(birthday);
    if (birthday == null) {
      wx.showToast({
        title: '请选择生日',
        duration: 2000,
        image: '/icons/fail.png',
      })
      that.setData({
        userBirthday: '请选择您的生日'
      })
    } else {
      wx.request({
        url: 'http://106.54.206.129:8080/user/setBirthday',
        data: {
          id: id,
          birthday: birthday
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
        duration: 2000,
        icon: 'success'
      })
      var that = this
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面
      prevPage.setData({
        userBirthday: that.data.userBirthday
      });
      wx.navigateBack({
        url: '/pages/my/information/information'
      })
    }
  },
})
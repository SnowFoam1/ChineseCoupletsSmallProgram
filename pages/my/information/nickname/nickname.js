// pages/my/information/nickname/nickname.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userNickname: '',
    userAccount: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    //prevPage.onLoad();
    var userAccount = options.userAccount;
    that.setData({
      userAccount: userAccount
    });
    console.log(this.data.userAccount);
  },

  formSubmit: function(event) {
    if (event.detail.value.userNickname == "") {
      wx.showToast({
        title: '请输入昵称',
        duration: 2000,
        image: '/icons/fail.png',
      })
    } 
    else {
      this.setData({
        userNickname: event.detail.value.userNickname
      })
      var id = this.data.userAccount;
      var nickname = this.data.userNickname;
      console.log(this.data.userAccount);
      var that = this;

      wx.request({
        url: 'http://106.54.206.129:8080/user/setNickName',
        data: {
          id: id,
          nickname: nickname
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
      var that = this
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面
      prevPage.setData({
        userNickname: that.data.userNickname
      });
      wx.navigateBack({
        url: '/pages/my/information/information'
      })
    }
  },
})
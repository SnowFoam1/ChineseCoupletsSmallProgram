// pages/my/my.js
var e = require("../../../utils/util.js"),
  time = require('../../../utils/util.js');
Page({
  data: {
    userAccount: "",
    userName: "",
    userNickname: "ssss",
    userLabel: "",
    userAge: "",
    userBirthday: "",
    userEmail: "fjfj",
    userLocation: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var that = this;
    var userAccount = options.userAccount;
    that.setData({
      userAccount: userAccount,
    });
    console.log(this.data.userAccount);
    var id = this.data.userAccount;
    wx.request({
      url: 'http://106.54.206.129:8080/user/retUser',
      data: {
        id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function(res) {
        console.log(res)
        var userBirthday = time.formatDate(res.data.userBirthday);
        that.setData({
          userName: res.data.userName,
          userNickname: res.data.userNickname,
          userLabel: res.data.userLabel,
          userAccount: res.data.userAccount,
          userAge: res.data.userAge,
          userBirthday: userBirthday,
          userLocation: res.data.userLocation,
          userEmail: res.data.userEmail,
        })
        //console.log(that.data.userBirthday)
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    let userNickname = currPage.data.userNickname;
    let userName = currPage.data.userName;
    let userLabel = currPage.data.userLabel;
    let userAge = currPage.data.userAge;
    let userBirthday = currPage.data.userBirthday;
    let userLocation = currPage.data.userLocation;
    let userEmail = currPage.data.userEmail;
    this.setData({
      userNickname: userNickname,
      userName: userName,
      userLabel: userLabel,
      userAge: userAge,
      userBirthday: userBirthday,
      userLocation: userLocation,
      userEmail: userEmail,
    })
  },

  onReady: function() {

  },

  onUnload: function() {
    var that = this;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.setData({
      userNickname: that.data.userNickname,
      userLabel: that.data.userLabel
    });
    // wx.navigateBack({
    //   delta: 1
    // })
  },

  openPage: function(a) {
    var e = a.currentTarget.dataset.url;
    wx.navigateTo({
      url: e + '?userAccount=' + this.data.userAccount + '&userBirthday=' + this.data.userBirthday
    });
  },
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()
    this.onLoad()
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 1000);
  },


})
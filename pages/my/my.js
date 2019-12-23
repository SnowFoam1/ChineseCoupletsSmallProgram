// pages/my/my.js
var e = require('../../utils/util.js')
var updateFile = require('../../utils/updateFile.js')
var app = getApp()

Page({

  data: {
    vip: true,
    userNickname: '柠檬你个lemon',
    userScore: 0,
    userLabel: '红红火火恍恍惚惚',
    userAccount: '',
    LoginBtnTxt: "登录",
    LoginBtnBgBgColor: "#ff9900",
    btnLoading: false,
    disabled: false,
    phone: '',
    pass: '',
    flag: false,
    signFlag: 0,
    userPortrait: '',
    userVip: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  change: function(a) {
    this.setData({
      flag: a,
      userAccount: app.globalData.userAccountId
    })
  },
  onLoad: function() {
    console.log("5555")
    if (app.globalData.isLogin == true) 
    {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#c21327',
      });
      this.change(app.globalData.isLogin);
      console.log(app.globalData.isLogin);
      var that = this;
      console.log(this.data.userAccount);
      //var id = this.userAccount;
      wx.request({
        url: 'http://106.54.206.129:8080/user/retUser',
        data: {
          id: app.globalData.userAccountId
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function(res) {
          var result = res.data;
          console.log(res)
          if (result.userPortrait == "" || result.userPortrait == null) {
            result.userPortrait = '/icons/saber.jpg'
          }
          if (result.userLabel == "" || result.userLabel == null) {
            result.userLabel = "这个人没有签名哦~"
          }
          if (result.userScore == "" || result.userScore == null) {
            result.userScore = 0;
          }
          that.setData({
            userNickname: result.userNickname,
            userPortrait: result.userPortrait,
            userLabel: result.userLabel,
            userScore: result.userScore,
            userVip: result.userVip,
          })
        }
      })

      wx.request({
        url: 'http://106.54.206.129:8080/sign/judgeSign',
        data: {
          account: app.globalData.userAccountId
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function(res) {
          console.log(res)
          if (res.data == '今日已签到') {
            that.setData({
              signFlag: 1
            })
          }
        }
      })
    }
    else{
      this.change(app.globalData.isLogin);
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff',
      })
    }
  },

  onShow: function() {
    console.log(app.globalData.isLogin)
    /*this.setData({
      isLogin:app.globalData.isLogin
    })*/
    this.onLoad();
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    let userNickname = currPage.data.userNickname;
    let userLabel = currPage.data.userLabel;
    let userPortrait = currPage.data.userPortrait
    this.setData({
      userNickname: userNickname,
      userLabel: userLabel,
      userPortrait: userPortrait,
    })
  },

  signin: function() {
    var that = this;
    console.log(this.data.userAccount);
    if (this.data.signFlag == 0) {
      wx.request({
        url: 'http://106.54.206.129:8080/score/addSignScore',
        data: {
          account: this.data.userAccount,
          score: 5,
          source: 5
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function(res) {
          console.log(res);
          wx.showToast({
            title: '积分 up 5 ~~~',
          })
          that.setData({
            signFlag: 1
          })
          that.onLoad();
        }
      })
    }
  },

  openPage: function(a) {
    var e = a.currentTarget.dataset.url;
    wx.navigateTo({
      url: e + '?userAccount=' + this.data.userAccount
    });
  },
  changePassword: function() {
    wx.navigateTo({
      url: '/pages/findpassword/index?type=' + 2,
    })
  },

  toLogin: function() {
    wx.redirectTo({
      url: '/pages/login/index',
    })
  },

  aboutUs: function () {
    wx.navigateTo({
      url: '/pages/my/about/about',
    })
  },

})
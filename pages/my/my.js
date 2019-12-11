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
    //console.log(app.globalData.isLogin)
    //this.data.test = app.globalData.isLogin
    if (app.globalData.isLogin == true) {

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
          console.log(res)
          that.setData({
            userScore: res.data.userScore,
            userNickname: res.data.userNickname,
            userLabel: res.data.userLabel,
            userPortrait: res.data.userPortrait,
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
  },

  onShow: function() {
    //console.log(app.globalData.isLogin)
    /*this.setData({
      isLogin:app.globalData.isLogin
    })*/
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
        url: 'http://106.54.206.129:8080/score/addScore',
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
  previewImage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['更换头像'],
      success: function (res) {
        console.log(res);
        if (res.tapIndex === 0) {
          wx.chooseImage({
            success: function (res) {
              var tempFilePath = res.tempFilePaths;
              console.log(tempFilePath);
              console.log(that.data.userAccount)
              updateFile.uploadFile('', tempFilePath[0], 'file', { 'userId': that.data.userAccount }, function (res) {
                console.log(res);
                if (true == res) {
                  // that.setData({
                  //   userPortrait: 'http://106.54.206.129:8080/pictures/'+that.data.userAccount+'.jpg'
                  // })
                  that.onLoad();
                  // console.log(that.data.userAccount)
                } else {
                  // 显示消息提示框
                  wx.showToast({
                    title: '上传失败',
                    icon: 'error',
                    duration: 2000
                  })
                }
                that.onLoad();
              });
            },
          })
        }
      }
    })
  }
})
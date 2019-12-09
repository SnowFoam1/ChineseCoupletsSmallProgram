// pages/my/my.js
var e = require('../../utils/util.js')
var updateFlie = require('../../utils/updateFile.js')
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
    flag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  change:function(a)
  {
    this.setData({
      flag:a,
      userAccount:app.globalData.userAccountId
    })
  },
  onLoad: function () {
    //console.log(app.globalData.isLogin)
    //this.data.test = app.globalData.isLogin
    if(app.globalData.isLogin == true)
    {
      
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
        success: function (res) {
          console.log(res)
          that.setData({
            userScore: res.data.userScore,
            userNickname: res.data.userNickname,
            userLabel: res.data.userLabel,
          })
        }
      })
    }
    
  },

  onShow: function () {
    //console.log(app.globalData.isLogin)
    /*this.setData({
      isLogin:app.globalData.isLogin
    })*/
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    let userNickname = currPage.data.userNickname;
    let userLabel = currPage.data.userLabel;
    this.setData({
      userNickname: userNickname,
      userLabel: userLabel,
    })
  },

  openPage: function(a) {
    var e = a.currentTarget.dataset.url;
    wx.navigateTo({
      url: e + '?userAccount=' + this.data.userAccount
    });
  },
  changePassword:function()
  {
    wx.navigateTo({
      url: '/pages/findpassword/index?type='+2,
    })
  },
  toLogin:function()
  {
    wx.redirectTo({
      url: '/pages/login/index',
    })
  },
  previewImage: function(){
    var that = this;
    wx.showActionSheet({
      itemList: ['更换头像'],
      success: function (res) {
        console.log(res);
        if (res.tapIndex === 0) {
          wx.chooseImage({
            count: 1,
            sizeType:['original'],
            sourceType: ['album','camera'],
            success: function(res) {
              var tempFilePath = res.tempFilePaths[0];
              console.log(tempFilePath);
            },
          })
        }
      }
    })
  }
})
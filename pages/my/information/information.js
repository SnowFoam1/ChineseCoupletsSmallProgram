// pages/my/my.js
var e = require("../../../utils/util.js"),
  time = require('../../../utils/util.js');
var uploadFile = require('../../../utils/updateFile.js')
var app = getApp()
Page({
  data: {
    userAccount: "",
    userName: "默认姓名",
    userNickname: "默认昵称",
    userLabel: "请输入个性签名",
    userAge: "请输入年龄",
    userBirthday: "请选择生日",
    userEmail: "请输入",
    userLocation: "请输入",
    userPortrait: '',
    changeFlag: false,
    src: '',
    width: 250, //宽度
    height: 250, //高度
    max_width: 400,
    max_height: 400,
    disable_rotate: true, //是否禁用旋转
    disable_ratio: true, //锁定比例
    limit_move: true, //是否限制移动
    finalUrl: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.cropper = that.selectComponent("#imageCropper");
    console.log(that);
    var userAccount = app.globalData.userAccountId;
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
      success: function (res) {
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
          userPortrait: res.data.userPortrait,
        })
        //console.log(that.data.userBirthday)
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    let userNickname = currPage.data.userNickname;
    let userName = currPage.data.userName;
    let userLabel = currPage.data.userLabel;
    let userAge = currPage.data.userAge;
    let userBirthday = currPage.data.userBirthday;
    let userLocation = currPage.data.userLocation;
    let userEmail = currPage.data.userEmail;
    let userPortrait = currPage.data.userPortrait;
    this.setData({
      userNickname: userNickname,
      userName: userName,
      userLabel: userLabel,
      userAge: userAge,
      userBirthday: userBirthday,
      userLocation: userLocation,
      userEmail: userEmail,
      userPortrait: userPortrait,
    })
  },

  onReady: function () {

  },

  onUnload: function () {
    var that = this;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.setData({
      userNickname: that.data.userNickname,
      userLabel: that.data.userLabel,
      userPortrait: that.data.userPortrait
    });
    // wx.navigateBack({
    //   delta: 1
    // })
  },

  openPage: function (a) {
    var e = a.currentTarget.dataset.url;
    wx.navigateTo({
      url: e + '?userAccount=' + this.data.userAccount + '&userBirthday=' + this.data.userBirthday
    });
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.onLoad()
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 1000);
  },
  previewImage: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['更换头像'],
      success: function(res) {
        console.log(res);
        if (res.tapIndex === 0) {
          wx.chooseImage({
            success: function(res) {
              var tempFilePath = res.tempFilePaths;
              console.log(tempFilePath);
              console.log(that.data.userAccount)
              //开始裁剪
              that.setData({
                src: tempFilePath,
                changeFlag: true,
              });
              that.cropper = that.selectComponent("#imageCropper");
              console.log(that.cropper)
            },
          })
        }
      }
    })
  },
  cropperload(e) {
    console.log("cropper初始化完成");
  },
  loadimage(e) {
    console.log("图片加载完成", e.detail);
    wx.hideLoading();
    //重置图片角度、缩放、位置
    this.cropper.imgReset();
  },
  clickcut(e) {
    console.log(e.detail);
    //点击裁剪框阅览图片
    this.setData({
      finalUrl: e.detail.url
    })
    wx.previewImage({
      current: e.detail.url, // 当前显示图片的http链接
      urls: [e.detail.url] // 需要预览的图片http链接列表
    })
  },
  confirmImage() {
    var that = this
    this.cropper.getImg((obj) => {
      console.log("obj", obj)
      that.data.finalUrl = obj.url
      uploadFile.uploadFile('', that.data.finalUrl, 'file', {
        'userId': that.data.userAccount
      }, function (res) {
        console.log(res);
        if (true == res) {
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
      });
      that.setData({
        changeFlag: false
      })
    });
  }
})
//app.js
import touch from './utils/touch.js'

App({
  
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    /*wx.login({
      success: function (res) {
        console.log(res);
        wx.getUserInfo({
          success: function (res) {
            console.log(res);
            that.globalData.userInfo = res.userInfo
            //typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
      }
    })*/
  },

  globalData: {
    isLogin: false,
    userAccountId:"15574925109",
    isRoot: "0"
  },
  touch: new touch()
})
// pages/othersSpace/othersSpace.js
var userAccount = '1';
var utils = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    labels: [
      "楹联鉴赏",
      "发布楹联",
      "凤求凰",
    ],
    items: [],
    userNickname: '',
    userPortrait: '',
    userLabel: '',
    userScore: ''
  },

  //具体信息页面跳转
  bindPersonalTap: function () {
    wx.navigateTo({
      url: '',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userAccount=options.thisUserAccount;
    console.log("onload")
    var that = this
    wx.request({
      url: 'http://106.54.206.129:8080/post/getPostsByAuthorId',
      data: {
        id: userAccount
      },
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        var result = res.data;
        for(var i=0; i<result.length; i++){
          result[i].postTime = utils.formatTime(result[i].postTime, 'Y-M-D h:m')
        }
        console.log(result)
        that.setData({
          items: result
        })
      }
    })
    wx.request({
      url: 'http://106.54.206.129:8080/user/retUser',
      data: {
        id: userAccount
      },
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        var result = res.data;
        console.log(res)
        if(result.userPortrait == ""){
          result.userPortrait = '/icons/saber.jpg'
        }
        if(result.userLabel ==""){
          result.userLabel = "这个人没有签名哦~"
        }
        that.setData({
          userNickname : result.userNickname,
          userPortrait : result.userPortrait,
          userLabel : result.userLabel,
          userScore : result.userScore
        })
        wx.setNavigationBarTitle({
          title: result.userNickname + '的空间',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
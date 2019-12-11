// pages/collect/collect.js

var userAccount = '2';
var utils = require('../../../utils/util.js');
var app = getApp();

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
    userPortrait: ''
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
    console.log("onload")
    userAccount = app.globalData.userAccountId;
    var that = this
    wx.request({
      url: 'http://106.54.206.129:8080/collection/getCollectionList',
      data: {
        account: userAccount
      },
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        var result = res.data;
        for (var i = 0; i < result.length; i++) {
          if (result[i].userPortrait == "") {
            result[i].userPortrait = '/icons/saber.jpg'
          }
          result[i].postTime = utils.formatTime(result[i].postTime, 'Y-M-D h:m')
        }
        console.log(result)
        that.setData({
          items: result
        })
      }
    })
    
  },

  bindItemTap: function (e) {
    var postId = e.currentTarget.dataset.id;
    var account = e.currentTarget.dataset.account;
    var title = e.currentTarget.dataset.title;
    var content = e.currentTarget.dataset.content;
    var label = e.currentTarget.dataset.label;
    var userlabel = e.currentTarget.dataset.userlabel;
    var nickname = e.currentTarget.dataset.nickname;
    var like = e.currentTarget.dataset.like;
    var comment = e.currentTarget.dataset.comment;

    console.log(e.currentTarget.dataset.id);
    console.log(e.currentTarget.dataset.label);
    wx.navigateTo({
      url: '/pages/postsDisplay/postdetial/postdetail?account=' + account + '&postId=' + postId + '&title=' + title + '&content=' + content + '&label=' + label + '&nickname=' + nickname + '&userlabel=' + userlabel + '&like=' + like + '&comment=' + comment,
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
  onShow: function (options) {
    this.onLoad(options)
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
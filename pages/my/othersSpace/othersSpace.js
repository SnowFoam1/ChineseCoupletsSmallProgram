// pages/othersSpace/othersSpace.js
var userAccount = '1';
var utils = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userNickname: '',
    userPortrait: '',
    userLabel: '',
    userScore: '',
    userEmail: '',
    userLocation: '',
    userBirthday: '',
    userPlace: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userAccount=options.thisUserAccount;
    console.log("onload")
    var that = this
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
        if (result.userPortrait == "" || result.userPortrait == null){
          result.userPortrait = '/icons/saber.jpg'
        }
        if (result.userLabel == "" || result.userLabel == null){
          result.userLabel = "这个人没有签名哦~"
        }
        if (result.userScore == "" || result.userScore == null){
          result.userScore = 0;
        }
        if (result.userEmail == "" || result.userEmail == null) {
          result.userEmail = "暂无";
        }
        if (result.userLocation == "" || result.userLocation == null) {
          result.userLocation = "暂无";
        }
        if (result.userBirthday == "" || result.userBirthday == null) {
          result.userBirthday = "暂无";
        }else{
          result.userBirthday = utils.formatTime(result.userBirthday, 'Y-M-D')
        }
        if (result.userPlace == "" || result.userPlace == null) {
          result.userPlace = "暂无";
        }
        that.setData({
          userNickname : result.userNickname,
          userPortrait : result.userPortrait,
          userLabel : result.userLabel,
          userScore : result.userScore,
          userBirthday : result.userBirthday,
          userPlace : result.userPlace,
          userEmail : result.userEmail,
          userLocation : result.userLocation
        })
        wx.setNavigationBarTitle({
          title: result.userNickname,
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

  },
  openPage: function(){
    wx.navigateTo({
      url: '/pages/my/othersSpace/othersPostsDetials/othersPostsDetials?thisUserAccount=' + userAccount,
    })
  }
})
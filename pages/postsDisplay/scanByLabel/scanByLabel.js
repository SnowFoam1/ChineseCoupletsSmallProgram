// pages/postsDisplay/scanByLabel/scanByLabel.js
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    label: '',
    userPortrait: [],
    userNickname: [],
    userlabel: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      label: options.label
    })
    console.log(this.data.label);
    wx.request({
      url: 'http://106.54.206.129:8080/search/searchPost',
      data: {
        searchContent: this.data.label
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function(res) {
        var result = res.data;
        console.log(result);
        for (var i = 0; i < result.length; i++) {
          result[i].postTime = utils.formatTime(result[i].postTime, 'Y-M-D h:m');
        }
        console.log(result);
        that.setData({
          items: result,
        })

      }
    })
  },

  //具体信息页面跳转
  bindItemTap: function(e) {

    var postId = e.currentTarget.dataset.id;
    var account = e.currentTarget.dataset.account;
    var title = e.currentTarget.dataset.title;
    var content = e.currentTarget.dataset.content;
    var label = this.data.label;
    var userlabel = e.currentTarget.dataset.userlabel;
    var nickname = e.currentTarget.dataset.nickname;
    var like = e.currentTarget.dataset.like;
    var comment = e.currentTarget.dataset.comment;

    console.log(e.currentTarget.dataset.id);
    console.log(e.currentTarget.dataset.userlabel);
    wx.navigateTo({
      url: '/pages/postsDisplay/postdetial/postdetail?account=' + account + '&postId=' + postId + '&title=' + title + '&content=' + content + '&label=' + label + '&nickname=' + nickname + '&userlabel=' + userlabel + '&like=' + like + '&comment=' + comment,
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
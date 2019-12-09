// pages/postsDisplay/postsDisplay.js

var utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    labels: [
      "楹联鉴赏",
      "发布楹联",
      "凤求凰",
    ],
    postsNumber: 0,
    finalGroup: false
  },

  //具体信息页面跳转
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
    console.log(e.currentTarget.dataset.userlabel);
    wx.navigateTo({
      url: '/pages/postsDisplay/postdetial/postdetail?account='+ account +'&postId=' + postId+'&title='+ title +'&content='+ content +'&label='+ label+'&nickname='+ nickname + '&userlabel='+ userlabel + '&like=' + like + '&comment=' + comment,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload");
    var that = this
    that.setData({
      postsNumber : 0,
      finalGroup : false
    })
    wx.request({
      url: 'http://106.54.206.129:8080/post/getTenPostsWithAuthor',
      data: {
        num: that.data.postsNumber
      },
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        console.log(that.data.postsNumber)
        var result = res.data;
        console.log(result);
        for (var i = 0; i < result.length; i++) {
          result[i].postTime = utils.formatTime(result[i].postTime, 'Y-M-D h:m')
          if (result[i].userPortrait == "" || result[i].userPortrait == null) {
            result[i].userPortrait = '/icons/saber.jpg'
          }
        }
        that.setData({
          items: result,
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
  onShow: function (options) {
    this.onLoad(options);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this
    that.setData({
      postsNumber: 0,
      finalGroup: false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this
    that.setData({
      postsNumber: 0,
      finalGroup: false
    })
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
    // console.log("onReachBottom")
    var that = this
    // console.log(that.data.finalGroup)
    if (that.data.finalGroup == false) {
      var value = that.data.postsNumber + 10;
      // console.log(value);
      wx.request({
        url: 'http://106.54.206.129:8080/post/getTenPostsWithAuthor',
        data: {
          num: value
        },
        header: {
          "Content-Type": "applciation/json"
        },
        method: 'GET',
        success: function (res) {
          var result = res.data;
          if (result.length < 10) {
            that.setData({
              finalGroup: true,
            })
          } else {
            that.setData({
              postsNumber: value
            })
          }
          for (var i = 0; i < result.length; i++) {
            result[i].postTime = utils.formatTime(result[i].postTime, 'Y-M-D h:m')
            if (result[i].userPortrait == "" || result[i].userPortrait == null) {
              result[i].userPortrait = '/icons/saber.jpg'
            }
          }
          // console.log(result)
          that.setData({
            items: that.data.items.concat(result),
          })
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
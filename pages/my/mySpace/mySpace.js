// pages/mySpace/mySpace.js
var userAccount = "1"
var utils = require('../../../utils/util.js');
const App = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ["动态", "回复", "点赞"],
    currentNavtab: "0",
    replys:[],
    labels: [
      "楹联鉴赏",
      "发布楹联",
      "凤求凰",
    ],
    imgUrls: [],
    items: [],
    feed: [],
    feedLength: 0
  },
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload");
    userAccount = App.globalData.userAccountId;
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
        for (var i = 0; i < result.length; i++) {
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
        if (result.userPortrait == "") {
          result.userPortrait = '/icons/saber.jpg'
        }
        that.setData({
          userNickname: result.userNickname,
          userPortrait: result.userPortrait
        })
      }
    })
    wx.request({
      url: 'http://106.54.206.129:8080/userSpace/getMyReplyInfoList',
      data: {
        userId: userAccount
      },
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function (res) {
        var result = res.data;
        console.log(res)
        for(var i=0; i<result.length; i++){
          if (result[i].userPortrait == "") {
            result[i].userPortrait = '/icons/saber.jpg'
          }
          result[i].replyTime = utils.formatTime(result[i].replyTime, 'Y-M-D h:m')
        }
        that.setData({
          replys : result
        })
      }
    })
  },
  //手指触摸动作开始 记录起点X坐标
  touchStart: function (e) {
    //开始触摸时 重置所有删除
    let data = App.touch._touchstart(e, this.data.items)
    this.setData({
      items: data
    })
  },
  //滑动事件处理
  touchMove: function (e) {
    let data = App.touch._touchmove(e, this.data.items)
    this.setData({
      items: data
    })
  },
  // touchEnd :function(e){
  //   var item = this.data.data[e.currentTarget.dataset.index]
  //   if (item.right >= this.data.delBtnWidth / 2) {
  //     item.right = this.data.delBtnWidth
  //     this.setData({
  //       isScroll: true,
  //       data: this.data.data,
  //     })
  //   } else {
  //     item.right = 0
  //     this.setData({
  //       isScroll: true,
  //       data: this.data.data,
  //     })
  //   }
  // },
  delItem: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认要删除此条动态吗？',
      success: function (res) {
        var postId = that.data.items[e.currentTarget.dataset.index].postId;
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'http://106.54.206.129:8080/post/deletePostById',
            data: {
              id: postId
            },
            header: {
              "Content-Type": "applciation/json"
            },
            method: 'GET',
            success: function (res) {
              that.setData({
                items: that.data.items
              })
              that.onLoad();
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
    wx.wx.showToast({
      title: 'loading....',
      icon: 'loading'
    })
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
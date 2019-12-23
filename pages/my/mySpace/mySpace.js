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
    replys: [],
    labels: [
      "楹联鉴赏",
      "发布楹联",
      "凤求凰",
    ],
    imgUrls: [],
    items: [],
    feed: [],
    likes: [],
    feedLength: 0,
    userLabel: '',
    userNickname: '',
    userPortrait: '',
    scrollFlag: true,
    delBtnWidth: 180,
    tapFlag: true,
  },
  switchTab: function(e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
      success: function(res) {
        console.log(res);
        var result = res.data;
        for (var i = 0; i < result.length; i++) {
          result[i].postTime = utils.formatTime(result[i].postTime, 'Y-M-D h:m')
          result[i].postContent = that.entitiesToUtf16(result[i].postContent)
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
      success: function(res) {
        var result = res.data;
        console.log(res)
        if (result.userPortrait == "") {
          result.userPortrait = '/icons/saber.jpg'
        }
        that.setData({
          userNickname: result.userNickname,
          userPortrait: result.userPortrait,
          userLabel: result.userLabel,
          userPortrait: result.userPortrait,
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
      success: function(res) {
        var result = res.data;
        console.log(res)
        for (var i = 0; i < result.length; i++) {
          if (result[i].userPortrait == "") {
            result[i].userPortrait = '/icons/saber.jpg'
          }
          result[i].replyTime = utils.formatTime(result[i].replyTime, 'Y-M-D h:m')
          result[i].replyContent = that.entitiesToUtf16(result[i].replyContent)
        }
        that.setData({
          replys: result
        })
      }
    })
    wx.request({
      url: 'http://106.54.206.129:8080/post/getUserLikeList',
      data: {
        account: userAccount
      },
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      success: function(res) {
        console.log(res);
        var result = res.data;
        for (var i = 0; i < result.length; i++) {
          if (result[i].userPortrait == "") {
            result[i].userPortrait = '/icons/saber.jpg'
          }
          result[i].postTime = utils.formatTime(result[i].postTime, 'Y-M-D h:m')
          result[i].postContent = that.entitiesToUtf16(result[i].postContent)
        }
        console.log(result)
        that.setData({
          likes: result
        })
      }
    })

  },
  //手指触摸动作开始 记录起点X坐标
  touchStart: function(e) {
    //开始触摸时 重置所有删除
    let data = App.touch._touchstart(e, this.data.items)
    this.setData({
      items: data,
      // scrollFlag: false
    })
  },
  //滑动事件处理
  touchMove: function(e) {
    let data = App.touch._touchmove(e, this.data.items)
    this.setData({
      items: data,
      // scrollFlag: false
    })
  },

  delItem: function(e) {
    var that = this
    that.setData({
      tapFlag : false
    })
    wx.showModal({
      title: '提示',
      content: '确认要删除此条动态吗？',
      success: function(res) {
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
            success: function(res) {
              that.setData({
                items: that.data.items
              })
              that.onLoad();
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
        that.setData({
          tapFlag : true
        })
      }
    })
  },
  bindItemTap: function(e) {
    if(this.data.tapFlag == true){
      var postId = e.currentTarget.dataset.id;
      var account = e.currentTarget.dataset.account;
      var title = e.currentTarget.dataset.title;
      var content = e.currentTarget.dataset.content;
      var label = e.currentTarget.dataset.label;
      var userlabel = this.data.userLabel;
      var nickname = this.data.userNickname;
      var like = e.currentTarget.dataset.like;
      var comment = e.currentTarget.dataset.comment;
      var userportrait = this.data.userPortrait;

      console.log(e.currentTarget.dataset);
      wx.navigateTo({
        url: '/pages/postsDisplay/postdetial/postdetail?account=' + account + '&postId=' + postId + '&title=' + title + '&content=' + content + '&label=' + label + '&nickname=' + nickname + '&userlabel=' + userlabel + '&like=' + like + '&comment=' + comment + '&userportrait=' + userportrait,
      })
    }
  },

  bindlikeTap: function(e) {
    var postId = e.currentTarget.dataset.id;
    var account = e.currentTarget.dataset.account;
    var title = e.currentTarget.dataset.title;
    var content = e.currentTarget.dataset.content;
    var label = e.currentTarget.dataset.label;
    var userlabel = e.currentTarget.dataset.userlabel;
    var nickname = e.currentTarget.dataset.nickname;
    var like = e.currentTarget.dataset.like;
    var comment = e.currentTarget.dataset.comment;
    var userportrait = e.currentTarget.dataset.userportrait;

    console.log(e.currentTarget.dataset.id);
    console.log(e.currentTarget.dataset.label);
    wx.navigateTo({
      url: '/pages/postsDisplay/postdetial/postdetail?account=' + account + '&postId=' + postId + '&title=' + title + '&content=' + content + '&label=' + label + '&nickname=' + nickname + '&userlabel=' + userlabel + '&like=' + like + '&comment=' + comment + "&userportrait=" + userportrait,
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
  onShow: function(options) {
    this.onLoad(options);
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
    // wx.showToast({
    //   title: 'loading....',
    //   icon: 'loading'
    // })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // wx.showToast({
    //   title: 'loading....',
    //   icon: 'loading'
    // })
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

  },

  entitiesToUtf16: function (str) {
    return str.replace(/&#(\d+);/g, function (match, dec) {
      let H = Math.floor((dec - 0x10000) / 0x400) + 0xD800;
      let L = Math.floor(dec - 0x10000) % 0x400 + 0xDC00;
      return String.fromCharCode(H, L);
    });
  }
})
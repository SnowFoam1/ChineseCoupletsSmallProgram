// pages/postsDisplay/postsDisplay.js
var app = getApp();
var utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectShow: false,
    selectItem: ['按时间', '按热度'],
    index: 0,
    items: [],
    labels: [
      "楹联鉴赏",
      "发布楹联",
      "凤求凰",
    ],
    postsNumber: 0,
    finalGroup: false,
    tapFlag: true
  },
  selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    })
  },
  optionTap: function(e) {
    this.setData({
      index: e.currentTarget.dataset.index,
      selectShow: !this.data.selectShow
    })
    this.onLoad()
  },
  goLogin: function(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '请登录后查看帖子详情',
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/login/index?page=postdetial',
            /*url: '/pages/my/my?page=postdetial',*/
          })
        } else if (res.cancel) {
          console.log("cancal login")
        }
      }
    })
  },
  //具体信息页面跳转
  bindItemTap: function(e) {
    if (app.globalData.isLogin == false) {
      this.goLogin();
    } else if (this.data.tapFlag == true) {
      var postId = e.currentTarget.dataset.id;
      var account = e.currentTarget.dataset.account;
      var title = e.currentTarget.dataset.title;
      var content = e.currentTarget.dataset.content;
      var label = e.currentTarget.dataset.label;
      var userlabel = e.currentTarget.dataset.userlabel;
      var nickname = e.currentTarget.dataset.nickname;
      var like = e.currentTarget.dataset.like;
      var comment = e.currentTarget.dataset.comment;
      var userPortrait = e.currentTarget.dataset.userportrait;

      console.log(e.currentTarget.dataset);
      wx.navigateTo({
        url: '/pages/postsDisplay/postdetial/postdetail?account=' + account + '&postId=' + postId + '&title=' + title + '&content=' + content + '&label=' + label + '&nickname=' + nickname + '&userlabel=' + userlabel + '&like=' + like + '&comment=' + comment + '&userportrait=' + userPortrait,
      })
    }
  },

  Search: function() {
    wx.navigateTo({
      url: '/pages/search/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("onload");
    var that = this
    that.setData({
      postsNumber: 0,
      finalGroup: false
    })
    if (that.data.index == 1) {
      wx.request({
        url: 'http://106.54.206.129:8080/post/getTenPostsWithAuthor',
        data: {
          num: that.data.postsNumber
        },
        header: {
          "Content-Type": "applciation/json"
        },
        method: 'GET',
        success: function(res) {
          console.log(that.data.postsNumber)
          var result = res.data;
          console.log(result);
          for (var i = 0; i < result.length; i++) {
            result[i].postTime = utils.formatTime(result[i].postTime, 'Y-M-D h:m')
            if (result[i].userPortrait == "" || result[i].userPortrait == null) {
              result[i].userPortrait = '/icons/saber.jpg'
            }
            result[i].postContent = that.entitiesToUtf16(result[i].postContent)
          }
          that.setData({
            items: result,
          })
        }
      })
    } else if (that.data.index == 0) {
      wx.request({
        url: 'http://106.54.206.129:8080/post/getTenPostsWithAuthorByDate',
        data: {
          num: that.data.postsNumber
        },
        header: {
          "Content-Type": "applciation/json"
        },
        method: 'GET',
        success: function(res) {
          console.log(that.data.postsNumber)
          var result = res.data;
          console.log(result);
          for (var i = 0; i < result.length; i++) {
            result[i].postTime = utils.formatTime(result[i].postTime, 'Y-M-D h:m')
            if (result[i].userPortrait == "" || result[i].userPortrait == null) {
              result[i].userPortrait = '/icons/saber.jpg'
            }
            result[i].postContent = that.entitiesToUtf16(result[i].postContent)
          }
          that.setData({
            items: result,
          })
        }
      })
    }
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
    console.log("ceshi");
    this.onLoad(options);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    var that = this
    that.setData({
      postsNumber: 0,
      finalGroup: false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    var that = this
    that.setData({
      postsNumber: 0,
      finalGroup: false
    })
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
    // console.log("onReachBottom")
    var that = this
    // console.log(that.data.finalGroup)
    if (that.data.finalGroup == false) {
      var value = that.data.postsNumber + 10;
      // console.log(value);
      if (that.data.index == 0) {
        wx.request({
          url: 'http://106.54.206.129:8080/post/getTenPostsWithAuthor',
          data: {
            num: value
          },
          header: {
            "Content-Type": "applciation/json"
          },
          method: 'GET',
          success: function(res) {
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
              result[i].postContent = that.entitiesToUtf16(result[i].postContent)
            }
            console.log(result)
            if (result.length != 0) {
              that.setData({
                items: that.data.items.concat(result),
              })
            }
          }
        })
      } else if (that.data.index == 1) {
        wx.request({
          url: 'http://106.54.206.129:8080/post/getTenPostsWithAuthorByDate',
          data: {
            num: value
          },
          header: {
            "Content-Type": "applciation/json"
          },
          method: 'GET',
          success: function(res) {
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
              result[i].postContent = that.entitiesToUtf16(result[i].postContent)
            }
            // console.log(result)
            if (result.length != 0) {
              that.setData({
                items: that.data.items.concat(result),
              })
            }
          }
        })
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  entitiesToUtf16: function(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
      let H = Math.floor((dec - 0x10000) / 0x400) + 0xD800;
      let L = Math.floor(dec - 0x10000) % 0x400 + 0xDC00;
      return String.fromCharCode(H, L);
    });
  },

  delete: function(e) {
    var that = this
    console.log(app.globalData.isRoot);
    if (app.globalData.isRoot == '1') {
      that.setData({
        tapFlag: false
      })
      wx.showModal({
        title: '提示',
        content: '确认要删除此条动态吗？',
        success: function(res) {
          var id = e.currentTarget.dataset.id;
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: 'http://106.54.206.129:8080/post/deletePostById',
              data: {
                id: id
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
            tapFlag: true
          })
        }
      })
    }
  }
})
// pages/postdetial/postdetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    label: "凤求凰",
    title: "找对象",
    userNickname: "lemon",
    userLabel: "我不是一个喜欢发帖子的人",
    content: "给我的楹联找个伴",
    like: 56,
    comment: 39,
    comcontent: '', //评论内容
    focus: false, //回复时聚焦
    islike: false,
    julike: '',
    iscollection: false,
    jucollection: '',
    issend: false,
    userAccount: '', //发帖人id
    postId: '',
    userId: app.globalData.userAccountId, //用户id
    replys: [],
    noreply: false,
    judgeFollow: '',
    followFlag: '',
    userPortrait: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options)
    that.setData({
      userAccount: options.account,
      userLabel: options.userlabel,
      userNickname: options.nickname,
      label: options.label,
      title: options.title,
      content: options.content,
      postId: options.postId,
      like: options.like,
      comment: options.comment,
      userId: app.globalData.userAccountId,
      userPortrait: options.userportrait
    })
    if (options.userlabel == "" || options.userlabel == null) {
      if (that.data.userAccount != app.globalData.userAccountId) {
        that.setData({
          userLabel: "这个人没有昵称哦~"
        })
      } else {
        that.setData({
          userLabel: "你还没有昵称哦~"
        })
      }
    }
    // console.log(that.data.userId)
    // console.log(app.globalData.userAccountId)
    that.judgeFollowFunction()
  },
  onShow: function() {
    var that = this;

    wx.request({
      url: 'http://106.54.206.129:8080/post/judgeUserLike',
      data: {
        userId: this.data.userId,
        postId: this.data.postId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function(res) {
        // console.log(res);
        that.setData({
          julike: res.data
        })
        // console.log(that.data.julike);
        if (that.data.julike == '未点赞') {
          that.setData({
            islike: false
          })
        } else if (that.data.julike == '已点赞') {
          that.setData({
            islike: true
          })
        }
      }
    })

    wx.request({
      url: 'http://106.54.206.129:8080/collection/judgeCollection',
      data: {
        account: this.data.userId,
        postId: this.data.postId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function(res) {
        console.log(res);
        that.setData({
          jucollection: res.data
        })
        console.log(that.data.jucollection);
        if (that.data.jucollection == '未收藏') {
          that.setData({
            iscollection: false
          })
        } else if (that.data.jucollection == '已收藏') {
          that.setData({
            iscollection: true
          })
        }
      }
    })
  },

  doCollection: function() {
    var that = this;
    if (this.data.jucollection == '未收藏') {
      that.setData({
        iscollection: true,
        jucollection: '已收藏'
      })
      wx.request({
        url: 'http://106.54.206.129:8080/collection/addCollection',
        data: {
          account: this.data.userId,
          postId: this.data.postId
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function(res) {
          console.log(res)
        }
      })
    } else if (this.data.jucollection == '已收藏') {
      that.setData({
        iscollection: false,
        jucollection: '未收藏'
      })
      wx.request({
        url: 'http://106.54.206.129:8080/collection/deleteCollection',
        data: {
          account: this.data.userId,
          postId: this.data.postId
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function(res) {
          console.log(res)
        }
      })
    }
    console.log(this.data.jucollection);
    console.log(this.data.iscollection);
  },

  doLike: function() {
    var that = this;
    var likeNum = this.data.like;
    if (this.data.julike == '未点赞') {
      likeNum++;
      that.setData({
        islike: true,
        like: likeNum,
        julike: '已点赞'
      })
      wx.request({
        url: 'http://106.54.206.129:8080/post/like',
        data: {
          userId: this.data.userId,
          postId: this.data.postId
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function(res) {

        }
      })
    } else if (this.data.julike == '已点赞') {
      likeNum--;
      that.setData({
        islike: false,
        like: likeNum,
        julike: '未点赞'
      })
      wx.request({
        url: 'http://106.54.206.129:8080/post/cancelLike',
        data: {
          userId: this.data.userId,
          postId: this.data.postId
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function(res) {

        }
      })
    }
    console.log(this.data.julike);
    console.log(this.data.islike);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    wx.request({
      url: 'http://106.54.206.129:8080/post/getPostReplyByPostId',
      data: {
        id: this.data.postId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function(res) {
        console.log(res)
        that.setData({
          replys: res.data
        })
        if (res.data.length == 0) {
          that.setData({
            noreply: true
          })
        } else {
          that.setData({
            noreply: false
          })
        }
      }
    })
  },

  doreply: function(e) {
    var that = this;
    that.setData({
      focus: true
    })
  },

  send: function(event) {
    console.log(event);
    var that = this;
    var comment = this.data.comment;
    that.setData({
      focus: false,
    })
    console.log(that.data.focus);
    console.log(that.data.comcontent + "1111111111");
    wx: wx.request({
      url: 'http://106.54.206.129:8080/post/reply',
      data: {
        userId: this.data.userId,
        postId: this.data.postId,
        content: this.data.comcontent
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function(res) {
        console.log(res);
        comment++;
        that.setData({
          comcontent: '',
          issend: true,
          comment: comment
        })
        that.onReady()
      }
    })
  },

  delete: function(e) {
    var that = this;
    var replyId = e.currentTarget.dataset.replyid;
    var comment = this.data.comment;
    console.log(replyId + "111111")
    if (this.data.userId == this.data.userAccount || this.data.userId == e.currentTarget.dataset.userid) {
      wx.showModal({
        title: '提示',
        content: '确定要删除此条回复？',
        success: function(res) {
          console.log(res);
          if (res.confirm) {
            console.log('点击确定了');
            wx: wx.request({
              url: 'http://106.54.206.129:8080/post/cancelReply',
              data: {
                replyId: replyId
              },
              method: 'GET',
              header: {
                'content-type': 'application/json' //默认值
              },
              success: function(res) {
                console.log(res);
                comment--;
                that.setData({
                  comment: comment
                })
                that.onReady()
              }
            })
          } else if (res.cancel) {
            console.log('点击取消了');
            return false;
          }
        }
      })
    }
  },

  foucus: function(e) {
    var that = this;
    that.setData({
      bottom: e.detail.height
    })
  },

  //失去聚焦
  blur: function(e) {
    console.log("shijiao");
    /*var that = this;
    that.setData({
      bottom: 0,
     // comcontent: e.detail.value
    })*/
    this.setData({
      bottom: 0,
    })
    console.log(this.data.comcontent)
  },

  input: function(e) {
    console.log(e);
    this.setData({
      comcontent: e.detail.value
    })
    console.log(this.data.comcontent)
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
    var that = this
    if (that.data.followFlag == -1 && that.data.judgeFollow == 1) {
      wx.request({
        url: 'http://106.54.206.129:8080/unfollow?id=' + that.data.userId + '&followId=' + that.data.userAccount,
        header: {
          "Content-Type": "applciation/json"
        },
        method: 'GET',
      })
    } else if (that.data.followFlag == 1 && that.data.judgeFollow == -1) {
      wx.request({
        url: 'http://106.54.206.129:8080/follow?id=' + that.data.userId + '&followId=' + that.data.userAccount,
        header: {
          "Content-Type": "applciation/json"
        },
        method: 'GET',
      })
    }
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
  onShareAppMessage: function(options) {
    console.log(options)
    // url: decodeURIComponent(decodeURIComponent(''))
    wx.showShareMenu({
      withShareTicket: true,
    })
    // 官方取消回调函数
    // success: function () {
    //   wx.showToast({
    //     title: '转发成功',
    //     duration: 2000,
    //     icon: 'success'
    //   })
    // },
    // fail: function (res) {
    //   wx.showToast({
    //     title: '转发失败',
    //     duration: 2000,
    //     image: '/icons/fail.png',
    //   })
    // }
  },
  judgeFollowFunction: function() {
    var that = this;
    wx.request({
      url: 'http://106.54.206.129:8080/judgeFollow?id=' + that.data.userId + '&followId=' + that.data.userAccount,
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function(res) {
        // console.log(that.data.userId)
        // console.log(that.data.userAccount)
        // console.log(res)
        that.setData({
          judgeFollow: res.data
        })
        if (that.data.userId == null || that.data.userId == "") {
          that.setData({
            judgeFollow: 2
          })
        }
        that.setData({
          followFlag: that.data.judgeFollow
        })
        console.log(that.data.followFlag)
      }
    })
  },
  addFollow: function(e) {
    this.setData({
      followFlag: 1
    })
  },
  deleteFollow: function(e) {
    this.setData({
      followFlag: -1
    })
  },

  toScanByLabel: function() {
    wx.navigateTo({
      url: '/pages/postsDisplay/scanByLabel/scanByLabel?label=' + this.data.label
    })
  },
  toSpace: function() {
    var page = getCurrentPages()
    if (page.length >= 5) {
      // var prevPage = page[page.length - 2];
      wx.navigateBack({

      })
    } else {
      if (this.data.judgeFollow == 0) {
        wx.switchTab({
          url: '/pages/my/my',
        })
        // console.log(page)
      } else {
        var thisUserAccount = this.data.userAccount
        wx.navigateTo({
          url: '/pages/my/othersSpace/othersSpace?thisUserAccount=' + thisUserAccount,
        })
        // console.log(page)
      }
    }
  }
})
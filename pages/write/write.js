// pages/write/write.js
var app = getApp();
Page({
  data: {
    note: {
      id: "",
    },

    label: "",
    isNew: false,
    focus: false,
    height: "",//data里面增加height属性
    userAccount: "",
    title: "在此输入标题",
    content: "在等你畅所欲言哦",
    ispost: "false",
    
  },

  popSelect: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['楹联鉴赏', '发布楹联', '凤求凰'],
      success: function (res) {
        console.log(res);
        if (res.tapIndex === 0) {
          that.setData({
            label: '楹联鉴赏'
          })
        }
        else if (res.tapIndex === 1) {
          that.setData({
            label: '发布楹联'
          })
        }
        else if (res.tapIndex === 2) {
          that.setData({
            label: '凤求凰'
          })
        }
      }
    })
  },

  onSubmit: function (event) {
    if(event.detail.target.id == "发布")
    {
      this.send(event)
    }
    else if (event.detail.target.id == "草稿")
    {
      this.cancel(event)
    }
  },


  send:function(event)
  {
    console.log("发布");
    console.log(event);
    if(app.globalData.isLogin == false)
    {
      wx.showModal({
        title: '提示',
        content: '您尚未登录，请先前往个人中心登录',
      })
    }
    else
    {
      if (this.data.label == "") {
        wx.showToast({
          title: '请选择标签',
          duration: 2000,
          image: '/icons/fail.png',
        })
      }
      else if (event.detail.value.title == "") {
        wx.showToast({
          title: '请输入标题',
          duration: 2000,
          image: '/icons/fail.png',
        })
      }
      else if (event.detail.value.content == "") {
        wx.showToast({
          title: '请输入发布内容',
          duration: 2000,
          image: '/icons/fail.png',
        })
      }
      else {
        this.setData({
          title: event.detail.value.title,
          content: event.detail.value.content
        })
        var userId = app.globalData.userAccountId;
        var title = this.data.title;
        var content = this.data.content;
        var label = this.data.label;
        console.log(this.data.userAccount);
        var that = this;

        wx.request({
          url: 'http://106.54.206.129:8080/post/releasePost',
          data: {
            userId: userId,
            title: title,
            content: content,
            label: label
          },
          method: 'GET',
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            console.log(res);
            that.setData({
              content: '',
              title: '',
              label: ''
            })
          }
        })

        wx.showToast({
          title: '发布成功',
          duration: 2000,
          icon: 'success'
        })
        wx.switchTab({
          url: '/pages/postsDisplay/postsDisplay',
        })
      }
    }
  },

  cancel:function(e)
  {
    console.log(e);
    var that = this;
    wx.setStorage({
      key:'label',
      data:that.data.label,
    });

    wx.setStorage({
      key:'title', 
      data:e.detail.value.title,
    });

    wx.setStorage({
      key:'content', 
      data:e.detail.value.content,
      success:function()
      {
        wx.showToast({
          title: "保存成功",
          icon: '',
          duration: 2000
        });
        /*that.setData({
          isStoreDraft:true
        })*/
        //app.globalData.isStoreDraft = true;
      },
      fail:function()
      {
        wx.showToast({
          title: "保存失败，请重新尝试",
          icon: "none",
          duration: 2000
        });
        //console.log("error")
      }
    });

  },
  onLoad:function()
  {

    console.log("load");
      var l = wx.getStorageSync('label');
      var t = wx.getStorageSync('title');
      var c = wx.getStorageSync('content');
      console.log(wx.getStorage('label'));
      console.log(l);
      console.log(t);
      console.log(c);
      this.setData({
        label: l,
        title: t,
        content: c,
      })
    //}
    
  },
  /**
   * 页面渲染事件
   */
  onShow: function () {
    var that = this;

    let id = "#textareawrap";
    let query = wx.createSelectorQuery(); //创建查询对象
    query.select(id).boundingClientRect(); //获取view的边界及位置信息
    query.exec(function (res) {
      that.setData({
        height: res[0].height + "px"
      });
    });
    
    /*if (app.globalData.isLogin == false) {
      wx.showModal({
        title: '提示',
        content: '您尚未登录，请先前往个人中心登录',
      })
    }*/
    console.log("load");
    var l = wx.getStorageSync('label');
    var t = wx.getStorageSync('title');
    var c = wx.getStorageSync('content');
    console.log(wx.getStorage('label'));
    console.log(l);
    console.log(t);
    console.log(c);
    this.setData({
      label: l,
      title: t,
      content: c,
    })
  },
  onHide: function () {
    this.setData({
      label: '',
      title: '',
      content: '',
    })
    console.log("==onHide==");
  },
  onUnload: function () {
    console.log("==onUnload==");
  }
});
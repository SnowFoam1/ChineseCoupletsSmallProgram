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
    canWrite:true
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
    console.log("hhhhhh");
    console.log(event);
    console.log("hhhhh");
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
          content: this.utf16toEntities(event.detail.value.content)
        })
        console.log(this.data.content)
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
            wx.removeStorage({
              key: 'label',
              success: function(res) {},
            })
            wx.removeStorage({
              key: 'title',
              success: function (res) { },
            })
            wx.removeStorage({
              key: 'content',
              success: function (res) { },
            })
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
    if(e.detail.value.content == '')
    {
      wx.showToast({
        icon: "none",
        title: '当前内容未空',
      })
    }
    else
    {
      wx.setStorage({
        key: 'label',
        data: that.data.label,
      });

      wx.setStorage({
        key: 'title',
        data: e.detail.value.title,
      });

      wx.setStorage({
        key: 'content',
        data: e.detail.value.content,
        success: function () {
          wx.showToast({
            title: "保存成功",
            icon: '',
            duration: 2000
          });
        },
        fail: function () {
          wx.showToast({
            title: "保存失败，请重新尝试",
            icon: "none",
            duration: 2000
          });
          //console.log("error")
        }
      });
    }

  },
  onLoad:function()
  {
    console.log("load");
      var l = wx.getStorageSync('label');
      var t = wx.getStorageSync('title');
      var c = wx.getStorageSync('content');
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

    if (app.globalData.isLogin == false) {
      wx.showModal({
        title: '提示',
        content: '您尚未登录，请先前往个人中心登录',
        success:function(res)
        {
          if(res.confirm)
          {
            wx.switchTab({
              url: '/pages/my/my',
            })
          }
          if(res.cancel)
          {
            console.log(that.data.canWrite)
            that.setData({
              canWrite: false
            })
            console.log(that.data.canWrite)
          }
        }
      })
    }
    var l = wx.getStorageSync('label');
    var t = wx.getStorageSync('title');
    var c = wx.getStorageSync('content');
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
  },
  utf16toEntities: function (str) {
    var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则  
    return str.replace(patt, function (char) {
      var H, L, code;
      if (char.length === 2) {
        H = char.charCodeAt(0); // 取出高位  
        L = char.charCodeAt(1); // 取出低位  
        code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法  
        return "&#" + code + ";";
      } else {
        return char;
      }
    });
  }
});
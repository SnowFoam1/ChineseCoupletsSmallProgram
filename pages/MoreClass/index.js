var app=getApp()
Page({
  data: {
    currentTab: 1,  //对应样式变化
    scrollTop: 0,  //用作跳转后右侧视图回到顶部
    classArray: [
      { classId: 1, className: "春联" },
      { classId: 2, className: "挽联" },
      { classId: 3, className: "山水" },
      { classId: 4, className: "园林" },
      { classId: 5, className: "古建" },
      { classId: 6, className: "宗教" },
      { classId: 7, className: "居室" },
      { classId: 8, className: "行业" },
      { classId: 9, className: "题赠" },
      { classId: 10, className: "巧对" },
      { classId: 11, className: "集句" },
      { classId: 12, className: "文艺" },
      { classId: 13, className: "救灾" },
      { classId: 14, className: "族谱" },
    ], //左侧导航栏内容
    class_Id: "",  //后台查询需要的字段
    coupletsArray: [], //右侧内容
  },

  onLoad: function (options) {
    wx.request({
      url: 'http://106.54.206.129:8080/coupletsExisted/getClassificationList',
      data: {
        
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        
        that.setData({
          coupletsArray: couplet.concat(result)
        })
      },
      fail: function (res) { },
      complete: function (res) { console.log("请求完成") },
    });

    this.setData({
      coupletsArray: [],
      class_Id:options.id
    });
    if(options.id == "8")
    {
      this.setData({
        class_Id: "1"
      });
    }
    var title = options.title;
    this.setData({
      currentTab: this.data.class_Id,   //按钮CSS变化
      scrollTop: 0,   //切换导航后，控制右侧滚动视图回到顶部
    });
    var that = this;
    wx.request({
      url: 'http://106.54.206.129:8080/coupletsExisted/getCoupletsByClassificationId',
      data: {
        id: that.data.class_Id
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        var result = res.data;
        var couplet = that.data.coupletsArray;
        console.log(couplet);
        that.setData({
          coupletsArray: couplet.concat(result)
        })
      },
      fail: function (res) { },
      complete: function (res) { console.log("请求完成")},
    })
  },


  navbarTap: function (e) {
    this.setData({
      coupletsArray:[]
    });
    var that = this;
    console.log(e);
    this.setData({
      currentTab: e.currentTarget.id,   //按钮CSS变化
      class_Id: e.currentTarget.dataset.classid,
      scrollTop: 0,   //切换导航后，控制右侧滚动视图回到顶部
    });
    console.log(this.data.class_Id);
    wx.request({
      url: 'http://106.54.206.129:8080/coupletsExisted/getCoupletsByClassificationId',
      data: {
        id: that.data.class_Id
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        var result = res.data;
        var couplet = that.data.coupletsArray;
        console.log(couplet);
        that.setData({
          coupletsArray: couplet.concat(result)
        })
      },
      fail: function (res) { 
        wx.showModal({
          title: '提示',
          content: '获取对联失败，请稍后重新尝试',
        })
      },
      complete: function (res) { console.log("请求完成")},
    })
  },
  
  GetDetail:function(e){
    //console.log(e);
    if(app.globalData.isLogin)
    {
      var coupletId = e.currentTarget.dataset.coupletid;
      console.log(coupletId);
      wx.navigateTo({
        url: "/pages/detail/index?coupletId=" + coupletId,
      })
    }
    else
    {
      wx.showModal({
        title: '提示',
        content: '请前往个人中心登录后查看楹联详细信息',
        showCancel:false
      })
    }
  },
  /*onUnload:function()
  {
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
    });
    console.log("asdasdadadasd")
  }*/
})

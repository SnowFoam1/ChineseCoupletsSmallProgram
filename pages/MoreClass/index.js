var app=getApp()
Page({
  data: {
    currentTab: 1,  //对应样式变化
    scrollTop: 0,  //用作跳转后右侧视图回到顶部
    classArray: [
      { classId: 1, className: "春联" },
      { classId: 2, className: "挽联" },
      { classId: 3, className: "风景" },
      { classId: 4, className: "名胜" },
      { classId: 5, className: "人物" },
      { classId: 6, className: "巧对" },
      { classId: 7, className: "抒情" },
      { classId: 8, className: "春联" },
      { classId: 9, className: "春联" },
      { classId: 10, className: "春联" },
      { classId: 11, className: "春联" },
      { classId: 12, className: "春联" },
    ], //左侧导航栏内容
    class_Id: "",  //后台查询需要的字段
    coupletsArray: [], //右侧内容
  },

  onLoad: function (options) {
    this.setData({
      coupletsArray: [],
      class_Id:options.id
    });
    console.log(options);
    //var classId = options.id;
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
  }
})
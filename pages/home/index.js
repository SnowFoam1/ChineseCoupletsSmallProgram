var app = getApp()
Page({
  data: {
    background: ['green', 'red', 'yellow'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    page: 0,
    couplets: [

    ],
    swipers: [],
    logos: [{
        image: "/images/spring.png",
        title: "春联"
      },
      {
        image: "/images/ye.png",
        title: "行业"
      },
      {
        image: "/images/shan.png",
        title: "山水"
      },
      {
        image: "/images/yuan.png",
        title: "园林"
      },
      {
        image: "/images/gu.png",
        title: "古建"
      },
      {
        image: "/images/zong.png",
        title: "宗教"
      },
      {
        image: "/images/ju.png",
        title: "居室"
      },
      {
        image: "/images/geng.png",
        title: "更多"
      }
    ]
  },

  onLoad: function() {
    this.setData({
      swipers: [{
          id: "1",
          up: "潘潘潘潘潘潘",
          down: "亮亮亮亮亮亮潘潘潘潘潘潘"
        },
        {
          id: "2",
          up: "哈哈哈哈哈",
          down: "呼呼呼呼呼"
        }
      ]
    })

    var that = this;
    wx.request({
      url: 'http://116.62.139.166:8080/ccdm/news/getFiveNews',
      data: {},
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res);
        that.setData({
          swipers: res.data
        })
        console.log(that.data.swipers);
      },
      fail: function(res) {
        console.log(that.data.swipers);
      },
      complete: function(res) {
        console.log(that.data.swipers);
      },
    });
    this.GetMore(that.data.page);
  },

  MoreInfo: function(e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    if (app.globalData.isLogin) {
      wx.navigateTo({
        url: "/pages/swiperDetail/swiperDetail?id=" + id,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请前往个人中心登录后查看新闻详细信息',
        showCancel: false
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("到底啦");
    wx.showLoading({
      title: '加载更多',
    })
    var that = this;
    this.GetMore(that.data.page);
    console.log(this.data.couplets);
    wx.hideLoading();
    /*wx.request({
      url: '',
      data: {
        number:0
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        var i = 0;
        var l = res.data.length;
        for (i = 0; i < l; i++) {
          var str1 = "couplets[" + i + "].up"
          var str2 = "couplets[" + i + "].down"
          var str3 = "couplets[" + i + "].id"
          that.setData({
            [str1]: res.data[i].coupletsexistedUpcouplets,
            [str2]: res.data[i].coupletsexistedDowncouplets,
            [str3]: res.data[i].coupletsexistedId
          })
        }
      },
      fail: function(res) {

      },
      complete: function(res) {},
    })*/

  },

  MoreClass: function(e) {
    //console.log(e);
    var a = parseInt(e.currentTarget.dataset.index);
    var b = a + 1;
    console.log(b);
    var id = this.data.logos[a].title;
    console.log(id);
    wx.navigateTo({
      url: '/pages/MoreClass/index?title=' + this.data.logos[a].title + '&id=' + b
    })

  },

  MoreDetail: function(e) //需要获取楹联id
  {
    console.log(e);
    if (app.globalData.isLogin) {
      var coupletId = e.currentTarget.dataset.coupletid;
      console.log(coupletId);
      wx.navigateTo({
        url: "/pages/detail/index?coupletId=" + coupletId,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请前往个人中心登录后查看楹联详细信息',
        showCancel: false
      })
    }

  },

  GetMore: function(page) {
    //console.log(page);
    var that = this;
    if (page > '0') {
      wx.showLoading({
        title: ' 加载中',
        mask: false,
      });
      setTimeout(function() {
        //console.log(' ')
        wx.hideLoading();
      }, 1000);
    }
    wx.request({
      url: 'http://106.54.206.129:8080/coupletsExisted/getTenCouplets',
      method: 'GET',
      data: {
        num: page * 50
      },
      header: {},
      success: function(res) {
        console.log(res.data);
        if (res.data == '') {

          wx.showModal({
            title: '提示',
            content: '没有更多对联了',
            showCancel: false
          })
        } else {
          var result = res.data;
          if (that.data.page > 0) {
            var couplet = that.data.couplets;
            console.log(couplet);
            that.setData({
              couplets: couplet.concat(result),
              page: page + 1
            })
          } else {
            that.setData({
              couplets: result,
              page: page + 1
            })
          }
        }
      },
      fail: function() {
        wx.showModal({
          title: '错误',
          content: '获取对联失败，请稍后重新尝试',
          showCancel: false
        })
        //wx.hideLoading();
      },
      complete: function() {
        if (page >= 1) {
          //wx.hideLoading()
        }
      }
    });
    //console.log("初始请求完成"); 
  },
  Search: function() {
    wx.navigateTo({
      url: '/pages/search/index',
    })
  },

  ChangeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  ChangeVertical: function(e) {
    this.setData({
      vertical: !this.data.vertical
    })
  },

  ChangeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  IntervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  DurationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  }
})
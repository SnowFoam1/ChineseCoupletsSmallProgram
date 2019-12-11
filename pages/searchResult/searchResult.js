// pages/test/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchWord:'',
    currentData:0,
    coupletList:'',
    userList:[1,2,3,4,5,6,7,8,9,10,11,12,13,15,14,16,18,20,19,1,1,1,1,1,1,1,1,1,1,11,1,1,1,1,1,1,1,1
    ],
    postList:'',
    top:0
  },

  /**
  
  * 生命周期函数--监听页面加载
  
  */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      searchWord:options.word
    });
    console.log(this.data.iniWord);
    var that = this ;
    wx.request({//搜索楹联
      url: 'http://106.54.206.129:8080/search/searchCouplets',
      data: {
        searchContent:that.data.searchWord
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        //console.log(res);
        that.setData({
          coupletList:res.data
        })
        console.log(that.data.coupletList);
      },
      fail: function (res) {
      },
      complete: function (res) { },
    });

    wx.request({//搜索用户
      url: 'http://106.54.206.129:8080/search/searchUser',
      data: {
        searchContent:that.data.searchWord
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        //console.log(res);
       /* that.setData({
          userList: res.data
        })*/
        console.log(that.data.userList);
      },
      fail: function (res) {
      },
      complete: function (res) { },
    });

    wx.request({//搜索帖子
      url: 'http://106.54.206.129:8080/search/searchPost',
      data: {
      searchContent:that.data.searchWord
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        //console.log(res);
        that.setData({
          postList: res.data
        })
        console.log(that.data.postList);
      },
      fail: function (res) {
      },
      complete: function (res) { },
    });

  },

  scrollTopFun(e)
  {
    let that = this ;
    that.top = e.detail.scrollTop;
    that.$apply();
  },

  /**
  
  * 生命周期函数--监听页面初次渲染完成
  
  */

  onReady: function () {

   

  },

  checkCurrent(e) {
    if (this.data.currentData == e.target.dataset.current) 
    {
      return 
    }
    else 
    {
      this.setData({
        currentData: e.target.dataset.current
      })
    }
  },

  moreDetail: function (e)//需要获取楹联id
  {
    console.log(e);
    if (app.globalData.isLogin) {
      var coupletId = e.currentTarget.dataset.coupletid;
      console.log(coupletId);
      wx.navigateTo({
        url: "/pages/detail/index?coupletId=" + coupletId,
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请前往个人中心登录后查看楹联详细信息',
        showCancel: false
      })
    }

  },

})
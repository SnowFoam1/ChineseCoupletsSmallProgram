//const app = getApp()
var time = require('../../utils/util.js');
Page({
  data: {
    coupletId: '',
    currentData: 0,
    detail:{},
    thisIndex: -1,
    page: 1,
    num: 1,
    logged: false,
    openId: '',
    isCollect: false,
    isDown: true,
    loading: false,
    isExist: true,

    haveIntro:false,
    haveAuthor:false,
    haveJS:false,
    //detail2:{}
    date:''
  },

  onLoad: function (options) {
    console.log(options.coupletId);
    var couId = options.coupletId;
    var that = this;
    wx.request({
      url: 'http://106.54.206.129:8080/coupletsExisted/getCoupletDetailById',
      data: {
        id:couId
        //id:9
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        var inDate = time.formatDate(res.data.coupletsexistedInputdate);
        var m_haveIntro = that.checkIntro(res);
        var m_haveAuthor = that.checkAuthor(res);
        var m_haveJS = that.checkJS(res);
        console.log(m_haveIntro);
        that.setData({
          detail: res.data,
          haveIntro:m_haveIntro,
          haveAuthor:m_haveAuthor,
          haveJS:m_haveJS,
          date:inDate
        })
        console.log(that.data.detail);
      },
      fail: function (res) {
      },
      complete: function (res) { },
    });
    
  },

  //点击切换 Tab
  checkCurrent(e) {
    if (this.data.currentData === e.target.dataset.current) 
    {
      return false
    } 
    else 
    {
      this.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  
  checkIntro:function(m_detail)
  {
    console.log(m_detail);
    if(m_detail.data.coupletintroImage == null &&
       m_detail.data.coupletintroName == null && 
       m_detail.data.coupletintroOrigin == null)
    {
      return false;
    }
    else return true;
  },

  checkAuthor: function (m_detail) {
    if (m_detail.data.coupletsanthorDynasty == null &&
     m_detail.data.coupletsauthorId == null && 
      m_detail.data.coupletsauthorName == null && 
      m_detail.data.coupletsauthorRemarks == null &&
      m_detail.data.coupletsauthorSex == null &&
      m_detail.data.coupletsauthorStyle == null) 
    {
      return false;
    }
    else return true;
  },

  checkJS: function (m_detail) {
    if (m_detail.data.coupletintroJSNR == null) 
    {
      return false;
    }
    else return true;
  },
  onBackhome() {
    wx.switchTab({
      //url: `/pages/index/index`,
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})
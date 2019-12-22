// pages/knowledge/charpter/charpter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookid: '',
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var bookid = options.studyid;
    this.setData({
      bookid: bookid
    })
    var that = this;
    wx.request({
      url: 'http://106.54.206.129:8080/study/getCharpterList',
      data :{
        bookId: bookid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success:function(res){
        console.log(res);
        var result = res.data;
        that.setData({
          items: result
        })
      }
    })
  },

  openPage: function (a) {
    var e = a.currentTarget.dataset.url;
    var bookid = this.data.bookid;
    var charpterid = a.currentTarget.dataset.charpternumber;
    var charptername = a.currentTarget.dataset.charptername;
    console.log(charpterid+ "111111");
    wx.navigateTo({
      url: e + '?bookid=' + bookid + '&charpterid=' + charpterid + '&charptername=' + charptername
    }); 
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
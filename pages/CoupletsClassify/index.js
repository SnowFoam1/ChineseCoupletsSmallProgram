
Page({
  /**
   * 页面的初始数据
   */
  data: {
      //test:"hello",
      classify:"春联",
    couplets: 
    [
      { couCoupletsexistedId: "", coupletsexistedBrosecount: "", coupletsexistedDowncouplets: "sss",              coupletsexistedInputdate: "", coupletsexistedTitle: "", coupletsexistedUpcouplets: "sss"},
      { couCoupletsexistedId: "", coupletsexistedBrosecount: "", coupletsexistedDowncouplets: "sss", coupletsexistedInputdate: "", coupletsexistedTitle: "", coupletsexistedUpcouplets: "sss" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) 
  {
    var s = parseInt(options.id)
    var id=s+1;
    var title=options.title;
    this.setData({
      classify:title
    })
      //console.log(id,title);
    wx.setNavigationBarTitle({
      title: title,
    })
    var that=this;
    wx.request({
      url: 'http://106.54.206.129:8080/ccdm_war_exploded/coupletsExisted/getCoupletsByClassificationId',
      data:{
        id:id
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) 
      {
        var result = res.data
        console.log(result);
        var couplet=that.data.couplets;
        that.setData({
          couplets:couplet.concat(result)
        })
        console.log(that.data.couplets);
        /*var i=0;
        var l=res.data.length;
        for(i=0;i<l;i++)
        {
          var str="couplets["+i+"].up"
          that.setData({
            [str]: res.data[i].coupletsexistedUpcouplets
          })
        }*/
      },
      fail: function (res) { },
      complete: function (res) {},
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
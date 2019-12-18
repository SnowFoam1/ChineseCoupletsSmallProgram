// pages/my/myFans/myFans.js
var userAccount = '1';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    myFollow: [],
    followFlagOrigin: [],
    followFlag: [],
    followState: [
      "+关注",
      "已互关"
    ]
  },

  //具体信息页面跳转
  bindPersonalTap: function (e) {
    var thisUserAccount = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/my/othersSpace/othersSpace?thisUserAccount=' + thisUserAccount,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userAccount = options.userAccount;
    var that = this
    wx.request({
      url: 'http://106.54.206.129:8080/user/getMyFollowingsById',
      data:{
        id:userAccount
      },
      header:{
        "Content-Type":"application/json"
      },
      method:'GET',
      success: function(res){
        var resultRes = res.data;
        that.setData({
          myFollow : resultRes
        })
        wx.request({
          url: 'http://106.54.206.129:8080/user/getMyFansById',
          data: {
            id: userAccount
          },
          header: {
            "Content-Type": "application/json"
          },
          method:'GET',
          success:function(res){
            var result = res.data;
            for(var i=0;i<result.length;i++){
              if (result[i].userLabel == "" || result[i].userLabel == null){
                result[i].userLabel = "这个人没有签名";
              }
              if (result[i].userPortrait == "" || result[i].userPortrait == null){
                result[i].userPortrait = "/icons/saber.jpg";
              }
              that.setData({
                followFlag : that.data.followFlag.concat(0),
                followFlagOrigin : that.data.followFlagOrigin.concat(0)
              })
              var followStateF = 'followFlag[' + i +']';
              var followStateFO = 'followFlagOrigin[' + i + ']';
              for(var j=0; j<that.data.myFollow.length;j++){
                if(that.data.myFollow[j].userAccount == result[i].userAccount){
                  that.setData({
                    [followStateF] : 1,
                    [followStateFO] : 1
                  })
                  break;
                }
              }
            }
            that.setData({
              items : result
            })
          }
        })
      }
    })
  },


  changeFollowState: function (e) {
    // console.log(e.currentTarget.dataset)
    var string = 'followFlag[' + e.currentTarget.dataset.index + ']'
    if (e.currentTarget.dataset.key == 0) {
      this.setData({
        [string]: 1
      })
    } else if (e.currentTarget.dataset.key == 1) {
      this.setData({
        [string]: 0
      })
    }
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
    var that = this
    console.log("onUnload")
    console.log(that.data.followFlag)
    console.log(that.data.followFlagOrigin)
    var temp = this.data.followFlag
    var tempOrigin = this.data.followFlagOrigin
    for (var i = 0; i < temp.length; i++) {
      if (temp[i] == 0 && temp[i] != tempOrigin[i]) {
        var thisFollowId = this.data.items[i].userAccount
        console.log(i + " now remove " + thisFollowId)
        wx.request({
          url: 'http://106.54.206.129:8080/unfollow?id=' + userAccount + '&followId=' + thisFollowId,
          header: {
            "Content-Type": "applciation/json"
          },
          method: 'GET',
        })
      } else if (temp[i] == 1 && temp[i] != tempOrigin[i]) {
        var thisFollowId = this.data.items[i].userAccount
        console.log(i + " now remove " + thisFollowId)
        wx.request({
          url: 'http://106.54.206.129:8080/follow?id=' + userAccount + '&followId=' + thisFollowId,
          header: {
            "Content-Type": "applciation/json"
          },
          method: 'GET',
        })
      }
    }
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

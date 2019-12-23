Page({
  data: {
    current: 0,
    id: 0
  },
  onLoad: function (options) {
   console.log(options);
  },
  onReady: function () {
    console.log(this.data.id);
    wx.setNavigationBarTitle({
      title: '西甲-巴萨3-4客负 皇马1-1丢榜首'
    });
  }
});

// pages/test/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    windowHeight: 0,//记录界面高度

    containerHeight: 0,//记录未固定整体滚动界面的高度

    containerBottomHeight: 0,//记录未固定整体滚动界面距离底部高度

    keyboardHeight: 0,//键盘高度

    isIphone: false//是否为苹果手机，因苹果手机效果与Android有冲突，所以需要特殊处理

  },

/**

* 生命周期函数--监听页面加载

*/

onLoad: function (options) {

    var that = this

    //获取屏幕高度以及设备信息（是否为苹果手机）

    wx.getSystemInfo({

      success: function (res) {

        that.data.windowHeight = res.windowHeight

        that.data.isIphone = res.model.indexOf("iphone") >= 0 || res.model.indexOf("iPhone") >= 0

        // console.error(res)

      }

    });

  },

/**

* 生命周期函数--监听页面初次渲染完成

*/

onReady: function () {

    var that = this

    setTimeout(() => {

      //界面初始化渲染需要初始化获取整体界面的高度以及距离信息
      console.log("aaa")

     that.refreshContainerHeight()
      console.log("aaa")

    }, 1000);

  },

/**

* 刷新整体界面高度、距离等信息，如列表有上划加载数据，需要在数据加载过后调用此方法进行高度以及间距的刷新

*/

refreshContainerHeight: function () {

    var that = this

    var query = wx.createSelectorQuery().in(this)

    query.select('.container').boundingClientRect()
 
    //query.exec.call({ pag: this });

    query.exec((res) => {

      //container为整体界面的class的样式名称
      console.log(res)
      console.log(res[0])
      that.data.containerHeight = res[0].height;
      

      that.data.containerBottomHeight = res[0].bottom

    })

  },

/**

* 界面滚动监听

*/

onPageScroll: function (e) {

    var that = this

    // 界面滚动刷新整体界面高度以及间距

    that.refreshContainerHeight()

  },

/**

* 评论框焦点获取监听

*/

inputCommentsFocus: function (e) {

    var that = this

    if (!that.data.isIphone) {

      var keyboardHeight = e.detail.height

      var windowHeight = that.data.windowHeight

      var containerHeight = that.data.containerHeight

      var containerBottomHeight = that.data.containerBottomHeight

      //整体内容高度大于屏幕高度，才动态计算输入框移动的位置；

      if (containerHeight > windowHeight) {

        if ((containerBottomHeight - windowHeight) > keyboardHeight) {

          //距离底部高度与屏幕高度的差值大于键盘高度，则评论布局上移键盘高度；

          that.setData({

            keyboardHeight: e.detail.height

          })

        } else {

          //距离底部高度与屏幕高度的差值小于键盘高度，则评论布局上移距离底部高度与屏幕高度的差值；

          var newHeight = containerBottomHeight - windowHeight

          that.setData({

            keyboardHeight: newHeight

          })

        }

      } else {

        that.setData({

          keyboardHeight: 0

        })

      }

    } else {

      that.setData({

        keyboardHeight: 0

      })

    }

  },



  /**
  
  * 评论框焦点失去监听
  
  */

  inputCommentsBlur: function (e) {

    var that = this

    that.setData({

      keyboardHeight: 0

    })

  }

})
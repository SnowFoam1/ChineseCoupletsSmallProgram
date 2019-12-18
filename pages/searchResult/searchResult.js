// pages/test/index.js
import * as wxSearch from '../../component/wxSearch/wxSearch';
import { getStorage, setStorage } from '../../utils/util';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    //searchWord:'',
    currentData:0,
    coupletList:'',
    userList:'',
    postList:'',
    top:0,

    searchList: getStorage('searchList'),
    tabs: ['院校优先', '专业优先', '更多筛选'],
    hotsSearch: ['数学与应用数学', '信息与计算科学', '网络工程', '应用化学', '应用化学', '计算机科学与技术', '数学与应用数学', '信息与计算科学', '网络工程'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    searchIsHidden: true,
    searchAllShow: false,//全部搜索记录
    inputVal: ''
    
  },

  /**
  
  * 生命周期函数--监听页面加载
  
  */
  onLoad: function (options) {
    //wxSearch.init(this);
    console.log(options);
    this.setData({
      inputVal:options.word
    });
    var that = this ;
    wx.request({//搜索楹联
      url: 'http://106.54.206.129:8080/search/searchCouplets',
      data: {
        searchContent:that.data.inputVal
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
        searchContent: that.data.inputVal
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
       that.setData({
          userList: res.data
        })
        console.log(that.data.userList);
      },
      fail: function (res) {
      },
      complete: function (res) { },
    });

    wx.request({//搜索帖子
      url: 'http://106.54.206.129:8080/search/searchPost',
      data: {
        searchContent: that.data.inputVal
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

  bindPersonalTap: function (e) {
    var thisUserAccount = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/my/othersSpace/othersSpace?thisUserAccount=' + thisUserAccount,
    })
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
    else 
    {
      wx.showModal({
        title: '提示',
        content: '请前往个人中心登录后查看楹联详细信息',
        showCancel: false
      })
    }

  },


  bindSearchAllShow: function (e) {
    this.setData({
      searchAllShow: true
    })
  },

  bindInputSearchWord: function (e) {
    /*console.log(e);
    wxSearch.bindInputSearchWord(e, this)*/
    var val = e.detail.value;
    this.matchStroage(val)
  },

  bindGoSearch: function (e) {
    /*console.log(e);
    wxSearch.bindGoSearch(e, this)*/
    let searchList_stroage = getStorage('searchList') || [];
    const inputVal = this.data.inputVal;

    searchList_stroage.push(inputVal)

    setStorage('searchList', searchList_stroage)

    this.setData({
      inputVal: ''
    })
    this.goSchool(inputVal)
    //this.onLoad(inputVal);
  },

  bindClearSearch: function () {
    //wxSearch.updataLog(this, [])
    setStorage('searchList', [])
    this.setData({
      searchList: []
    })
  },

  /*bindGoSchool(e) {
    let val = e.currentTarget.dataset.item;
    //wxSearch.goSchool(val)
    this.onLoad(val);
  },*/

  bindDelLog(e) {
    let val = e.currentTarget.dataset.item;
    let searchList_stroage = getStorage('searchList') || [];
    let index = searchList_stroage.indexOf(val);
    searchList_stroage.splice(index, 1)
    this.updataLog(searchList_stroage)
  },

  bindShowLog(e) {
    //wxSearch.bindShowLog(e, this)
    this.showlog();
  },

  showlog() {
    let searchList_stroage = getStorage('searchList') || [];
    let searchList = []
    if (typeof (searchList_stroage) != undefined && searchList_stroage.length > 0) {
      for (var i = 0, len = searchList_stroage.length; i < len; i++) {
        searchList.push(searchList_stroage[i])
      }
    }
    else {
      searchList = searchList_stroage
    }
    this.setData({
      searchIsHidden: false,
      searchAllShow: false,
      searchList
    })
  },

  bindHideLog(e) {
    this.setData({
      searchIsHidden: true
    })
  },

  bindSearchHidden() {
    //wxSearch.bindSearchHidden(this)
    this.setData({
      searchIsHidden: true
    })
  },

  updataLog(list) {
    setStorage('searchList', list)
    this.setData({
      searchList: list
    })
  },
  matchStroage(val) {//匹配历史搜索
    let searchList_stroage = getStorage('searchList') || [];
    console.log(searchList_stroage)
    let searchList = []
    if (typeof (val) != undefined && val.length > 0 && typeof (searchList_stroage) != undefined && searchList_stroage.length > 0) {
      for (var i = 0, len = searchList_stroage.length; i < len; i++) {
        if (searchList_stroage[i].indexOf(val) != -1) //
        {
          searchList.push(searchList_stroage[i])
        }
      }
    }
    else 
    {
      searchList = searchList_stroage
    }
    console.log(searchList);
    this.setData({
      inputVal: val,
      searchList
    })
  },

  bindGoSchool(e) {
    let val = e.currentTarget.dataset.item;
    this.goSchool(val)
  },

  goSchool(val) {
    /*wx.showModal({
      title: '调往搜索页面',
      content: `你的传值是${val}，带上它去新页面`,
    })*/
    console.log(val)
    /*wx.navigateTo({
      url: '/pages/searchResult/searchResult?word=' + val,
    })*/
    //this.onLoad(val);
    wx.redirectTo({
      url: `/pages/searchResult/searchResult?word=`+val
    })
  }

})
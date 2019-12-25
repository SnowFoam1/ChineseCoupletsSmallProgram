import * as wxSearch from '../../component/wxSearch/wxSearch';
import { getStorage, setStorage } from '../../utils/util';
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabData: {
      
      searchList: getStorage('searchList'),
      //tabs: ['院校优先', '专业优先', '更多筛选'],
      hotsSearch: '', 
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0,
      searchIsHidden: false,
      searchAllShow: false,
      inputVal: '',
      showlist:false
    }
  },
  onLoad: function (options) {
    //初始渲染-读取storage的历史记录
    //console.log(this);
    wxSearch.init(this);
    //console.log(this);
    var that = this;
    wx.request({
      url: 'http://106.54.206.129:8080/hotSearch',
      method: 'GET',
      data: {
      },
      header: {},
      success: function (res) {
        console.log(res);
        that.setData({
          tabData: {
            hotsSearch: res.data,
          }
        })
      },
      fail: function () {
        
      },
      complete: function () {
       
      }
    });
  },
  onShow:function()
  {
    var that = this;
    wx.request({
      url: 'http://106.54.206.129:8080/hotSearch',
      method: 'GET',
      data: {
      },
      header: {},
      success: function (res) {
        console.log(res);
        that.setData({
          tabData: {
            hotsSearch: res.data,
          }
        })
      },
      fail: function () {

      },
      complete: function () {

      }
    });
  },
  bindSearchAllShow: function (e) {
    wxSearch.bindSearchAllShow(e, this)
  },

  bindInputSearchWord: function (e) {
    console.log(e);
    wxSearch.bindInputSearchWord(e, this)
  },

  bindGoSearch: function (e) {
    console.log(e);
    wxSearch.bindGoSearch(e, this)
  },

  bindClearSearch: function () {
    wxSearch.updataLog(this, [])
  },

  bindGoSchool(e) {
    let val = e.currentTarget.dataset.item;
    wxSearch.goSchool(val)
  },

  bindDelLog(e) {
    wxSearch.bindDelLog(e, this)
  },

  bindShowLog(e) {
    wxSearch.bindShowLog(e, this)
  },

  bindHideLog(e) {
    wxSearch.bindHideLog(e, this)
  },

  bindSearchHidden() {
    wxSearch.bindSearchHidden(this)
  }
})
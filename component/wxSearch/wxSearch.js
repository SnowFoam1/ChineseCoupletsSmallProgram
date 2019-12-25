import { getStorage, setStorage, setData } from '../../utils/util';
// component/wxSearch.js
module.exports = {
  init(that) {
    this._setData(that, {
      'searchList': getStorage('searchList') || []
    })
  },

  bindShowLog(e, that) {
    this.showlog(that)
  },

  bindHideLog(e, that) {
    this._setData(that, {
      'searchIsHidden': true
    })
  },

  bindInputSearchWord(e, that) {
    var val = e.detail.value;
    this.matchStroage(that, val)
    //console.log(val);
    this._setData(that, {
      inputVal: val
    })
  },

  bindSearchAllShow(e, that) {
    this._setData(that, {
      showlist: false
    })
  },

  /*checkWordIsInStorage:function(searchHistory,word)
  {
    var l = searchList_stroage.length;
    for (var i = 0; i < l; i++) 
    {
      //console.log(searchList_stroage[i]);
      if(searchHistory[i] == word)
      {
        return true;
      }
    }
    return false;
  },*/
  bindGoSearch(e, that) {
    let searchList_stroage = getStorage('searchList') || [];
    const inputVal = that.data.tabData.inputVal;

    if (inputVal == '' || inputVal == undefined) {
      wx.showToast({
        title: '搜索内容为空',
        icon: "none",
      })
    }
    else
    {
      if(!that.checkWordIsInStorage(searchList_stroage,inputVal)) //不在缓存
      {
        searchList_stroage.push(inputVal)
      }
      //searchList_stroage.push(inputVal)
      setStorage('searchList', searchList_stroage)
      this._setData(that, {
        inputVal: ''
      })
      console.log(inputVal);
      this.goSchool(inputVal)
    }
  },

  bindDelLog(e, that) {
    let val = e.currentTarget.dataset.item;
    let searchList_stroage = getStorage('searchList') || [];
    let index = searchList_stroage.indexOf(val);
    searchList_stroage.splice(index, 1)
    this.updataLog(that, searchList_stroage)
  },

  bindSearchHidden(that) {
    this._setData(that, {
      searchIsHidden: true
    })
  },

  showlog(that) 
  {
    let searchList_stroage = getStorage('searchList') || [];
    let searchList = []
    if (typeof (searchList_stroage) != undefined && searchList_stroage.length > 0) 
    {
      for (var i = 0, len = searchList_stroage.length; i < len; i++) {
        searchList.push(searchList_stroage[i])
      }
    } 
    else 
    {
      searchList = searchList_stroage
    }
    this._setData(that, {
      searchIsHidden: false,
      searchAllShow: true,
      showlist: true,
      searchList
    })
  },

 
  matchStroage(that, val) {//匹配历史搜索
    let searchList_stroage = getStorage('searchList') || [];
    let searchList = []
    if (typeof (val) != undefined && val.length > 0 && typeof (searchList_stroage) != undefined && searchList_stroage.length > 0) 
    {
      for (var i = 0, len = searchList_stroage.length; i < len; i++) 
      {
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
    this._setData(that, {
      inputVal: val,
      searchList
    })
  },

  _setData(that, param) {
    let tabData = that.data.tabData;
    for (var key in param) {
      tabData[key] = param[key];
    }
    that.setData({
      tabData
    })
  },

  updataLog(that, list) {
    setStorage('searchList', list)
    this._setData(that, {
      searchList: list
    })
  },

  goSchool(val) {
    console.log(val)
    /*if(val =='' ||val == undefined)
    {
      wx.showToast({
        title: '搜索内容为空',
        icon:"none",
      })
    }*/
    //else
    //{
      wx.navigateTo({
        url: '/pages/searchResult/searchResult?word=' + val,
      })
    //}
  }
}
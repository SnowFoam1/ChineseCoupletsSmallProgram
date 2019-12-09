function formatTime(number, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));
  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));
  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
function formatDate(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  return y + '-' + m + '-' + d;

};
// 导出
module.exports = {
  formatDate: formatDate,
  regexConfig: regexConfig,
  formatTime: formatTime,
  getStorage: getStorage,
  setStorage: setStorage
};

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function  getStorage (key)  {
  try {
    var v = wx.getStorageSync(key);
    return v;
  } catch (e) {
    return [];
  }
}
function setStorage  (key, cont) {
  wx.setStorage({
    key:  key,
    data: cont
  })
}

function regexConfig(){
  var reg = {
    email:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    phone:/^1(3|4|5|7|8)\d{9}$/
  }
  return reg;
};

/*module.exports = {
  formatTime: formatTime,
  regexConfig:regexConfig
}*/

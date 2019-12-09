function uploadFile(url, filePath, name, formData, cb) {
  console.log('a=' + filePath)
  wx.uploadFile({
    url: rootDocment + url,
    filePath: filePath,
    name: name,
    header: {
      'content-type': 'multipart/form-data'
    }, // 设置请求的 header
    formData: formData, // HTTP 请求中其他额外的 form data
    success: function (res) {
      if (res.statusCode == 200 && !res.data.result_code) {
        return typeof cb == "function" && cb(res.data)
      } else {
        return typeof cb == "function" && cb(false)
      }
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}
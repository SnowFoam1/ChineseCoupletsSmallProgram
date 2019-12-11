function uploadFile(url, filePath, name, formData, cb) {
  console.log('a=' + filePath)
  wx.uploadFile({
    url: 'http://106.54.206.129:8080/upload/uploadImage',
    filePath: filePath,
    name: name,
    header: {
      'content-type': 'multipart/form-data'
    }, // 设置请求的 header
    formData: formData, // HTTP 请求中其他额外的 form data
    success: function (res) {
      console.log(res)
      console.log("success")
      if (res.statusCode == 200 && !res.data.result_code) {
        return typeof cb == "function" && cb(true)
      } else {
        return typeof cb == "function" && cb(false)
      }
    },
    fail: function (res) {
      console.log(res)
      console.log("fail")
      return typeof cb == "function" && cb(false)
    }
  })
}
module.exports = {
  uploadFile: uploadFile
};
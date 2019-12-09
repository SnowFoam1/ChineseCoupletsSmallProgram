var util = require("../../utils/util.js");

Page({
  data: {
    RegistBtnTxt: "找回密码",
    RegistBtnBgBgColor: "#ff9900",
    GetSmsCodeBtnTxt: "获取验证码",
    GetSmsCodeBtnColor: "#ff9900",
    // GetSmsCodeBtnTime:60,
    btnLoading: false,
    RegistDisabled: false,
    smsCodeDisabled: false,
    phone: '',
    pass: '',
    code: '',
    test: '00'
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    if(options.type == '1')
    {
      console.log("忘记密码找回密码");
      this.setData({
        RegistBtnTxt:"找回密码"
      })
      wx.setNavigationBarTitle({
        title: this.data.RegistBtnTxt,
      })
    }
    else if(options.type == '2')
    {
      console.log("修改密码");
      this.setData({
        RegistBtnTxt: "修改密码"
      })
      wx.setNavigationBarTitle({
        title: this.data.RegistBtnTxt,
      })
    }
  },

  onReady: function () {
    // 页面渲染完成

  },

  onShow: function () {
    // 页面显示

  },

  onHide: function () {
    // 页面隐藏

  },

  onUnload: function () {
    // 页面关闭

  },

  FormSubmit: function (e) {
    console.log(e);
    var param = e.detail.value;
    this.Regi(param);
  },

  GetSmsCode: function () {
    var phoneNum = this.data.phone;
    var that = this;
    var count = 60;
    if (this.CheckUserName(phoneNum)) {
      wx.request({
        url: 'http://106.54.206.129:8080/user/getIdentifyCode',
        data: {
          phone: phoneNum
        },
        success: function (res) {
          console.log(res);
          /*if (res.data == "该号码已注册") {
            wx.showModal({
              title: '提示',
              content: '该号码已注册，请点击登录账号或者忘记密码',
            })
            count = 0;
          }*/
          if (res.data == "手机号不存在") {
            wx.showModal({
              title: '提示',
              content: '该手机号未注册、请注册',
            })
          }
          else {
            that.setData({
              code: res.data
            })
          }
        }
      })
      var si = setInterval(function () {
        if (count > 0) {
          count--;
          that.setData({
            GetSmsCodeBtnTxt: count + ' s',
            GetSmsCodeBtnColor: "#999",
            smsCodeDisabled: true
          });
        }
        else {
          that.setData({
            GetSmsCodeBtnTxt: "获取验证码",
            GetSmsCodeBtnColor: "#ff9900",
            smsCodeDisabled: false
          });
          count = 60;
          clearInterval(si);
        }
      }, 1000);
    }
  },

  Regi: function (param) {
    var flag = this.CheckUserName(param.username) && this.CheckPassword(param) && this.CheckSmsCode(param);
    var that = this;
    if (flag) {
      console.log("修改中");
      this.SetRegistData1();
      console.log(that.data.pass);
      wx.request({
        url: 'http://106.54.206.129:8080/user/setPassword',
        data: {
          id: that.data.phone,
          password: that.data.pass
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data == '修改密码成功')
          {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1500
            });
            that.SetRegistData2();
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/home/index',
              })
              
            }, 2000);
          }
          else 
          {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '修改失败，请重新尝试'
            });
          }
        },
        fail: function () {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '修改失败，请重新尝试'
          });
        }
      })
    }
  },

  GetPhoneNum: function (e) {
    console.log(e)
    var value = e.detail.value;
    this.setData({
      phone: value
    });
  },

  GetNewPass: function (e) {
    console.log(e)
    var value = e.detail.value;
    this.setData({
      pass: value
    });
    console.log(this.data.pass);
  },
  SetRegistData1: function () {
    this.setData({
      RegistBtnTxt: "修改中",
      RegistDisabled: !this.data.RegistDisabled,
      RegistBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },

  SetRegistData2: function () {
    this.setData({
      RegistBtnTxt: "找回密码",
      RegistDisabled: !this.data.RegistDisabled,
      RegistBtnBgBgColor: "#ff9900",
      btnLoading: !this.data.btnLoading
    });
  },

  CheckUserName: function (param) {
    var phone = util.regexConfig().phone;
    var inputUserName = param.trim();
    if (phone.test(inputUserName)) 
    {
      return true;
    }
    else 
    {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的手机号码'
      });
      return false;
    }
  },

  CheckPassword: function (param) {
    var userName = param.username.trim();
    var password = param.password.trim();
    if (password.length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请设置密码'
      });
      return false;
    }
    else if (password.length < 6 || password.length > 20) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '密码长度为6-20位字符'
      });
      return false;
    }
    else {
      return true;
    }
  },

  CheckSmsCode: function (param) {
    var smsCode = param.smsCode.trim();
    console.log("check", smsCode);
    console.log("check", this.data.code);
    if (smsCode != this.data.code) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '验证码错误'
      });
      return false;
    }
    else if (smsCode == '')
    {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入验证码'
      });
      return false;
    }
    else return true;
  },

  RedirectTo: function (param) {
    //需要将param转换为字符串
    param = JSON.stringify(param);
    wx.redirectTo({
      url: '../home/index?param=' + param//参数只能是字符串形式，不能为json对象
    })
  }

})
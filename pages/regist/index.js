var util = require("../../utils/util.js");
var app = getApp();
Page({
  data:{
    RegistBtnTxt:"注册",
    RegistBtnBgBgColor:"#ff9900",
    GetSmsCodeBtnTxt:"获取验证码",
    GetSmsCodeBtnColor:"#ff9900",
    // GetSmsCodeBtnTime:60,
    btnLoading:false,
    RegistDisabled:false,
    smsCodeDisabled:false,
    phone: '',
    pass: '',
    code: '',
    test:'00',
    temp:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
  },

  onReady:function(){
    // 页面渲染完成
    
  },

  onShow:function(){
    // 页面显示
    
  },

  onHide:function(){
    // 页面隐藏
    
  },

  onUnload:function(){
    // 页面关闭
    
  },

  FormSubmit:function(e)
  {
    var param = e.detail.value;
    this.Regi(param);
  },

  GetSmsCode: function () 
  {
    var phoneNum = this.data.phone;
    var that = this;
    var count = 60;
    if (this.CheckUserName(phoneNum)) {
      wx.request({
        url: 'http://106.54.206.129:8080/user/register',
        data:{
          phone:phoneNum
        },
        success:function(res){
          console.log(res);
          if(res.data=="该号码已注册")
          {
            wx.showModal({
              title: '提示',
              content: '该号码已注册，请点击登录账号或者忘记密码',
            })
            count=0;
          }
          else if (res.data == "请输入正确的手机号")
          {
            wx.showModal({
              title: '提示',
              content: '请输入正确的手机号',
            })
          }
          else 
          {
            that.setData({
              code: res.data,
              temp:phoneNum
            })
          }
        }
      })
      var si = setInterval(function () 
      {   
        if (count > 0) {
          count--;
          that.setData({
            GetSmsCodeBtnTxt: count + ' s',
            GetSmsCodeBtnColor: "#999",
            smsCodeDisabled: true
          });
        }
        else
        {
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

  Regi:function(param){
    var flag = this.CheckUserName(param.username) && this.CheckPassword(param) && this.CheckSmsCode(param) && this.checkPhone();
    this.setData({
      pass:param.password
    })
    var that = this;
    if(flag)
    {
      console.log("注册中");
      this.SetRegistData1();
      wx.request({
        url: 'http://106.54.206.129:8080/user/register2',
        data: {
          phone: that.data.phone,
          pass: that.data.pass
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) 
        {
          if(res.data=='注册成功')
          {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1500

            });
            that.SetRegistData2();
            app.globalData.isLogin = true;
            app.globalData.userAccountId = that.data.phone;
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
              content: '验证码错误'
            });
          }
        },
        fail:function()
        {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '注册失败，请重新尝试'
          });
          that.SetRegistData2();
        }
      })
    }  
  },
  
  GetPhoneNum:function(e)
  {
    console.log(e.detail.value);
    var value  = e.detail.value;
    this.setData({
      phone: value     
    });
  },

  SetRegistData1:function()
  {
    this.setData({
      RegistBtnTxt:"注册中",
      RegistDisabled: !this.data.RegistDisabled,
      RegistBtnBgBgColor:"#999",
      btnLoading:!this.data.btnLoading
    });
  },

  SetRegistData2:function()
  {
    this.setData({
      RegistBtnTxt:"注册",
      RegistDisabled: !this.data.RegistDisabled,
      RegistBtnBgBgColor:"#ff9900",
      btnLoading:!this.data.btnLoading
    });
  },

  CheckUserName:function(param)
  { 
    var phone = util.regexConfig().phone;
    var inputUserName = param.trim();
    if(phone.test(inputUserName))
    {
      return true;
    }
    else
    {
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请输入正确的手机号码'
      });
      return false;
    }
  },

  checkPhone:function()
  {
    if(this.data.temp != this.data.phone)
    {
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '手机号与验证码不匹配',
      })
      return false;
    }
    else return true
  },

  CheckPassword:function(param)
  {
    var userName = param.username.trim();
    var password = param.password.trim();
    if(password.length<=0)
    {
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请设置密码'
      });
      return false;
    }
    else if(password.length<6||password.length>18)
    {
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '密码长度为6-18位字符,要求包含字母和数字'
      });
      return false;
    }
    else if (password.length >= 6 && password.length <= 18)
    {
      if (this.isContainLetter(password) && this.isContainNumber(password))
      {
        return true;
      }
      else
      {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '密码长度为6-18位字符,要求包含字母和数字'
        });
        return false;
      }
    }
    else
    {
      return true;
    }
  },
  isContainLetter:function(pass){
    var l = pass.length;
    for(var i = 0;i<l;i++)
    {
      console.log(pass[i]);
      if ((pass[i] <= 'Z' && pass[i] >= 'A') || (pass[i] <= 'z' && pass[i] >= 'a'))
      {
        return true;
      }
    }
    return false;
  },

  isContainNumber: function (pass) {
    var l = pass.length;
    for (var i = 0; i < l; i++) 
    {
      console.log(pass[i]);
      if ((pass[i] <= '9' && pass[i] >= '0')) 
      {
        return true;
      }
    }
    return false;
  },
  CheckSmsCode:function(param)
  {
    var smsCode = param.smsCode.trim();
    console.log("check1",smsCode);
    console.log("check2", this.data.code);
    if(smsCode != this.data.code)
    {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '验证码错误'
      });
      return false;
    }
    else if (smsCode == '') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入验证码'
      });
      return false;
    }
    else return true;
  },

  RedirectTo:function(param){
    //需要将param转换为字符串
    param = JSON.stringify(param);
    wx.redirectTo({
      url: '../home/index?param='+ param//参数只能是字符串形式，不能为json对象
    })
  }

})
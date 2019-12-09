var util = require("../../utils/util.js");
var app = getApp()
Page({
  data:{
    LoginBtnTxt:"登录",
    LoginBtnBgBgColor:"#ff9900",
    btnLoading:false,
    disabled:false,
    phone:'',
    pass:'',
    page:''
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    //console.log("廖旋");
    this.data.page = options.page
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
    //console.log(e.detail.value.username + e.detail.value.password),
    this.setData({
      phone:e.detail.value.username,
      pass:e.detail.value.password
    })
    this.Login();
    //console.log(this.data.phone);
  },

  SetLoginData1: function () 
  {
    this.setData({
      LoginBtnTxt: "登录中",
      disabled: !this.data.disabled,
      LoginBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },

  SetLoginData2: function () {
    this.setData({
      LoginBtnTxt: "登录",
      disabled: !this.data.disabled,
      LoginBtnBgBgColor: "#ff9900",
      btnLoading: !this.data.btnLoading
    });
  },

  Login:function()
  {
    //console.log(e.detail.value);
    var that = this;
    //console.log(this.data.phone);
    if ((this.data.phone == '' )||( this.data.pass == '') )
    {
      //console.log('999');
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入账号密码'
      });
    }
    else 
    {
      this.SetLoginData1();
      wx.request({
        url: 'http://106.54.206.129:8080/user/login',
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
          console.log(res.data)//打印到控制台
          var Login1 = res.data
          if (Login1 == "密码错误") 
          {
            var toastText = '登陆失败,密码错误';
            wx.showToast({
              title: toastText,
              icon: 'none',
              duration: 2000
            });
            that.SetLoginData2();
          }
          else if (Login1 == that.data.phone) 
          {
            //var text = '登陆成功'
            getApp().globalData.isLogin = true;
            getApp().globalData.userAccountId = that.data.phone;
            console.log(that.data.phone);
            console.log(app.globalData.userAccountId);
            // console.log(that.data.page)
            if(that.data.page == "postdetial"){
              var pages = getCurrentPages();
              var beforePage = pages[pages.length - 2];
              wx.navigateBack({
                // success: function(){
                //   beforePage.onLoad()
                // }
              })
            }else{
              wx.showToast({
                title: "登录成功",
                icon: '',
                duration: 2000
              });
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/home/index',
                })
              }, 2000);
            }
          }
          else if (Login1 == "账户不存在") 
          {
            var text = '账号不存在，请注册'
            wx.showToast({
              title: toastText,
              icon: 'none',
              duration: 2000
            });
            that.SetLoginData2();
          }
        }
      });

    }
  },
  
  /*mysubmit:function (param){
    var flag = this.checkUserName(param)&&this.checkPassword(param)
    if(flag){
        this.SetLoginData1();
        this.checkUserInfo(param);
    } 
  },

  SetLoginData1:function(){
    this.setData({
      LoginBtnTxt:"登录中",
      disabled: !this.data.disabled,
      LoginBtnBgBgColor:"#999",
      btnLoading:!this.data.btnLoading
    });
  },

  SetLoginData2:function(){
    this.setData({
      LoginBtnTxt:"登录",
      disabled: !this.data.disabled,
      LoginBtnBgBgColor:"#ff9900",
      btnLoading:!this.data.btnLoading
    });
  },

  checkUserName:function(param){
    var email = util.regexConfig().email; 
    var phone = util.regexConfig().phone;
    var inputUserName = param.username.trim();
    if(email.test(inputUserName)||phone.test(inputUserName)){
      return true;
    }
    else
    {
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请输入正确的邮箱或者手机号码'
      });
      return false;
    }
  },

  checkPassword:function(param){
    var userName = param.username.trim();
    var password = param.password.trim();
    if(password.length<=0){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请输入密码'
      });
      return false;
    }
    else
    {
      return true;
    }
  },

  checkUserInfo:function(param){
    var username = param.username.trim();
    var password = param.password.trim();
    var that = this;
    if((username=='admin@163.com'||username=='18500334462')&&password=='000000'){
        setTimeout(function(){
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1500
          });
          that.SetLoginData2();
          that.redirectTo(param);
        },2000);
    }
    else
    {
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '用户名或密码有误，请重新输入'
      });
      this.SetLoginData2();
    }
  },
  
  redirectTo:function(param){
    //需要将param转换为字符串
    param = JSON.stringify(param);
    wx.redirectTo({
      url: '../main/index?param='+ param//参数只能是字符串形式，不能为json对象
    })
  }*/
})
import cookies from './../../../utils/cookies';
import request from './../../../utils/request';

export default {
  'data': false,
  // {
  //   'bindEmailTime': 1484529221000,
  //   'birthday': "1989-06-01",
  //   'digest': "00000000-0000-0000-0000-00000000",
  //   'email': "123456798@divingtime.asia",
  //   'forgetPsState': null,
  //   'forgetPsTime': null,
  //   'gender': 1,
  //   'genderCount': null,
  //   'isDelete': "N",
  //   'isUseBind': "Y",
  //   'lastIp': "192.168.0.101",
  //   'lastLogin': 1515355000000,
  //   'mobile': "18511111111",
  //   'nickname': "18511111111",
  //   'passwd': null,
  //   'qq': null,
  //   'regTime': 1484189501000,
  //   'salt': null,
  //   'status': 1,
  //   'telephone': null,
  //   'token': "6fafefe0-0000-0000-0000-00000000",
  //   'userId': 70,
  //   'userName': "某某某",
  //   'validateCode': "bbbbb13b5c81e982dcde40c7205f0fc8",
  //   'visitCount': null,
  //   'webchat': null,
  // },
  'username': '', // 账号
  'password': '', // 密码

  'isModalShow': false, // 模态框 是否显示
  'isPasswordShow': false, // 密码 是否显示
  'isLogining': false, // 是否 正在登录
  'isRememberCookie': false, // 是否 记住密码

  'isOutDropdown': false, // 是否 离开下拉菜单
  'dropdownSetTimeout': null, // NodeJS.Timer

  init: function(SelectedNumString) {
    const _this = this;

    this.litUpContentSelected(SelectedNumString);

    this.bindjQueryEvent();

    this.setOptionCookie();

    this.getUserInfo()
    .then(val => {
      if (val.result === 1) {
        _this.data = val.data;
        $('.login-true').show();
      } else {
        if (val.result === 3) {
          console.log(val.message);
        }
        $('.login-false').show();
  
        $('#login-show').click(() => {
          _this.loginModalShow();
        });
      }
    }, error => alert(error));
  },

  loginModalShow: function() {
    this.isModalShow = true;
    $("#Modal-login").modal('show');
  },

  loginModalHide: function() {
    this.isModalShow = false;
    $($('.input-username label')[0]).html('');
    $($('.input-password label')[0]).html('');
    $('#input-password').val('');
  },

  bindjQueryEvent: function() {
    const _this = this;

    // 隐藏模态框
    $('#login-hiden').click(() => {
      $("#Modal-login").modal('hide');
    });
    $("#Modal-login").on('hidden.bs.modal', e => {
      _this.loginModalHide();
    });

    // 显示隐藏密码
    $('#password-eye').click(() => {
      if (_this.isPasswordShow) {
        $('#password-eye').removeClass('eye-show');
        $('#input-password').attr('type','password');
        _this.isPasswordShow = false;
      } else {
        $('#password-eye').addClass('eye-show');
        $('#input-password').attr('type','text');
        _this.isPasswordShow = true;
      }
    });

    // 输入账号
    $('#input-username').bind('input propertychange', function(event) {
      _this.username = $(this).val();
      _this.checkUserName();
    });

    // 输入密码
    $('#input-password').bind('input propertychange', function(event) {
      _this.password = $(this).val();
      _this.checkPassword();
    });

    // 记住密码
    $('#option-cookie').click(function(event) {
      if (_this.isRememberCookie) {
        $(this).attr("checked", false);
        _this.isRememberCookie = false;
      } else {
        $(this).attr("checked", true);
        _this.isRememberCookie = true;
      }
    });

    // 登录
    $('#login-subimt').click(function(event) {
      _this.optionloginsubimt();
    });

    // 退出 登出
    $('#droplist-logout').click(function(event) {
      cookies.removeItem('token', '/');
      cookies.removeItem('digest', '/');

      $('.login-false').show();
      $('.login-true').hide();
    });

    // 下拉框移入 显示
    $('.login-droplist').mouseenter(function(event) {
      _this.isOutDropdown = false;
      _this.dropdownSetTimeout = setTimeout(function() {
        if (_this.isOutDropdown === false) {
          $('.login-user').dropdown('toggle');
        }
      }, 500);
    });
    $('.login-droplist').mouseleave(function(event) {
      _this.isOutDropdown = true;
      clearTimeout(_this.dropdownSetTimeout);
    });
    $('#dLabel').click(function(event) {
      _this.isOutDropdown = true;
      clearTimeout(_this.dropdownSetTimeout);
    });
  },

  optionloginsubimt: function () {
    const _this = this;

    if (this.isLogining) { return false }

    if (
      this.checkUserName().result !== 1 ||
      this.checkPassword().result !== 1
    ) {
      return false
    }
    
    let myDom = $(this);
    myDom.text('正在提交');
    this.isLogining = true;

    this.subimtLogin()
    .then(val => {
      if (val.result === 1) {
        _this.data = val.data;

        _this.SaveCookie();
        $("#Modal-login").modal('hide');

        $('.login-false').hide();
        $('.login-true').show();
      } else if (val.result == '-9') {
        $($('.input-username label')[0]).html(
          '<div class="danger">您的账号尚未激活</div>'
        );
      } else if (val.result == '-5') {
        $($('.input-username label')[0]).html(
          '<div class="danger">此账号不存在</div>'
        );
      } else if (val.result == '-6') {
        $($('.input-password label')[0]).html(
          '<div class="danger">您输入的密码是错误, 请输入正确的密码！</div>'
        );
      }

      myDom.text('登录');
      _this.isLogining = false;
    }, error => {
      myDom.text('登录');
      _this.isLogining = false;
      alert(error);
    });
  },

  setOptionCookie: function() {
    let rememberCookie = localStorage.getItem('remember-cookie');

    if (rememberCookie) {
      rememberCookie = JSON.parse(rememberCookie);
      this.isRememberCookie = true;
      $('#option-cookie').attr("checked", true);

      this.username = rememberCookie.username;
      $('#input-username').val(rememberCookie.username);

      this.password = rememberCookie.password;
      $('#input-password').val(rememberCookie.password);
    }
  },

  SaveCookie: function() {
    let SevenDayLater = new Date( Date.parse(new Date()) + (86400000 * 7) );
    
    cookies.setItem('token', this.data.token, SevenDayLater, '/');
    cookies.setItem('digest', this.data.digest, SevenDayLater, '/');

    if (this.isRememberCookie) {
      localStorage.setItem('remember-cookie', JSON.stringify({
        username: this.username,
        password: this.password,
      }))
    } else {
      localStorage.removeItem('remember-cookie');
    }
  },

  checkUserName: function () {
    let usernameLabel = $($('.input-username label')[0]);

    if (this.username === '') {
      usernameLabel.html('<div>请输入用户名</div>');
      return request.error('用户名为空');
    }

    // 既不是邮箱账号, 也不是手机账号
    if (
      /^1[34578]\d{9}$/.test(this.username) === false &&
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.username) === false
    ) {
      usernameLabel.html('<div class="warning">请输入正确手机或邮箱格式的账号</div>');
      return request.error('账号格式有误');
    }

    usernameLabel.html('');
    return request.success();
  },

  checkPassword: function () {
    let passwordLabel = $($('.input-password label')[0]);

    if (this.password === '') {
      passwordLabel.html('<div>请输入密码</div>');
      return request.error('密码为空');
    }

    // 密码小于 8 位
    if (this.password.length < 8) {
      passwordLabel.html('<div class="warning">输入的密码不能小于8位长度</div>');
      return request.error('密码格式有误');
    }

    passwordLabel.html('');
    return request.success();
  },

  subimtLogin: function () {
    const _this = this;
    let subimtData;

    if (/^1[34578]\d{9}$/.test(this.username)) {
      subimtData = {
        'mobile': this.username,
        'passwd': this.password
      };
    } else {
      subimtData = {
        'email': this.username,
        'passwd': this.password
      };
    }

    return new Promise((resolve, reject) => {
      fetch(`${appConfig.version}/user/login.do`,{
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        body: JSON.stringify(subimtData)
      }).then(
        response => response.json(),
        error => ({'result':'1', 'message': error})
      ).then(val => {
        if (val.result === '0') {
          resolve(request.success(val.data));
        } else if (val.result == '-9') {
          resolve(request.error('您的账号尚未激活', '-9'));
        } else if (val.result == '-5') {
          resolve(request.error('此账号不存在', '-5'));
        } else if (val.result == '-6') {
          resolve(request.error('您输入的密码是错误, 请输入正确的密码', '-6'));
        } else {
          reject(`请求服务器成功, 但是用户登录信息有误! 原因: ${val.message}`);
        }
      }).catch(error => {
        reject(`请求出错 , 向服务器发起请求用户登录失败, 原因: ${error}`);
      })
    });
  },

  getUserInfo: () => new Promise((resolve, reject) => {
    $.ajax({
      'type': "GET", 
      'url': `${appConfig.version}/user/getUserInfo.do`, 
      'contentType': "application/json; charset=utf-8", 
      'headers': {
        'token': cookies.getItem('token'),
        'digest': cookies.getItem('digest')
      },
      success: val => {
        if (val.result === '0') {
          resolve(request.success(val.data));
        } else if (val.result === '401') {
          resolve(request.error('你尚未登录!', 2));
        } else {
          resolve(request.error(`请求服务器成功, 但是用户信息有误! 原因: ${val.message}`, 3));
        }
      },
      error: (XMLHttpRequest, textStatus, errorThrown) => {
        reject(`请求用户信息出错, 状态码: ${XMLHttpRequest.status}. 原因: ${errorThrown}`)
      }
    });
  }),

  litUpContentSelected(SelectedNumString) {
    if (SelectedNumString) {
      $($('.header-content a')[SelectedNumString]).addClass('content-selected');
    }
  }
}

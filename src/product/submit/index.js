import cookies from './../../../utils/cookies';
import convertDate from './../../../utils/convertDate';

window.onload = function () {
  if (utilities.isSupport() === false) { return }

  myData.init();
  customerInfo.init();
}

let myData = {
  'data': {
    // 'apartment': "邦邦 沙滩屋",
    // 'apartmentNum': 1,
    // 'bedType': "大床",
    // 'brandId': 25,
    // 'clickCount': null,
    // 'createBy': 23,
    // 'createTime': 1484004647000,
    // 'isDelete': "N",
    // 'isNew': "Y",
    // 'isOnsale': "Y",
    // 'period': 3,
    // 'productBrief': "未经雕琢的天然小岛--邦邦岛",
    // 'productDesc': "未经雕琢的天然小岛--邦邦岛，安静的她坐落于辽阔的斯里伯斯海域。择一岛终老，携一人至此，面朝大海，春暖花开。邦邦同时具备有水上屋和海岛风情，您可以漫步沙滩听海浪拍打的声音抑或走在水上木板上任海风拂过。另外度假村配备健身房、休息室、潜水中心和蔬菜花园等，非常适合蜜月/闺蜜行。",
    // 'productId': 64,
    // 'productImg': "/source/image/product/thum/thum_34867ce5-d61a-4576-b4fb-060365c7d638.jpg",
    // 'productName': "天然小岛邦邦 3天2晚蜜月/闺蜜行",
    // 'productPrice': 5700,
    // 'productSn': "000006",
    // 'productThumb': "/source/image/product/thum/thum_34867ce5-d61a-4576-b4fb-060365c7d638.jpg",
    // 'productType': "package",
    // 'productView': null,
    // 'promoteEndTime': 0,
    // 'promotePrice': 0,
    // 'promoteStartTime': 0,
    // 'refundRuleId': 30,
    // 'updateBy': 23,
    // 'updateTime': 1485194651000
  },
  'submitData': {
    'userInfoList': [],
    'address': {}
  },
  'productId': null,
  'departureDate': null,
  'productNum': null,

  init() {
    const _this = this;
    let productId = utilities.loadPageVar('productId');
    let departureDate = utilities.loadPageVar('departureDate');
    let productNum = utilities.loadPageVar('productNum');

    if (!productId || !departureDate || !productNum) {
      return alert('此订单数据有误, 请检查您的操作或者联系客服!');
    }

    this.productId = productId;
    this.departureDate = parseInt(departureDate);
    this.productNum = parseInt(productNum);
    this.getProduct()
    .then(val => {
      document.getElementById('main').setAttribute('style', 'display: block;');
      _this.data = val;
      _this.renderOrders();
    }, error => alert(error))
  },

  renderOrders() {
    document.getElementById('orders-title').innerHTML = `${this.data.productName}`;
    document.getElementById('departureDate').innerHTML = `出发日期: ${convertDate.dateToFormat(new Date(this.departureDate))}`;
    document.getElementById('productNum').innerHTML = `&nbsp&nbsp ${this.productNum}`;
    document.getElementById('totalPrice').innerHTML = this.TotalPrice();
  },

  TotalPrice() {
    const nowTimestamp = Date.parse(new Date()),
      promotePrice = this.data.promotePrice,
      promoteEndTimestamp = this.data.promoteEndTime,
      promoteStartTimestamp = this.data.promoteStartTime;

    // 表示促销
    if (promotePrice != null && promotePrice != 0) {
      // 当前时间 大于等于 促销开始时间
      // 并且
      // 当前时间 小于等于 促销结束时间
      if (
        nowTimestamp >= promoteStartTimestamp && 
        nowTimestamp <= promoteEndTimestamp
      ) {
        return this.data.promotePrice * this.productNum;
      }
    }

    // 表示不促销
    return this.data.productPrice * this.productNum;
  },

  chackIsPromote() {
  },

  submitProduct() {
    const _this = this;
    let fetchbody = JSON.stringify(this.submitData)
    let url = `${appConfig.version}/order/${this.productId}/${this.productNum}/${convertDate.dateToYYYYmmNumber(new Date(this.departureDate))}/reserve.do`

    return new Promise((resolve, reject) => {
      fetch(url, {
        'method': 'POST',
        'headers':{
          'Content-Type': 'application/json; charset=utf-8',
          'token': cookies.getItem('token'),
          'digest': cookies.getItem('digest')
        },
        'body': fetchbody 
      }).then(
        response => ( response.json() ),
        error => ({'result': '1', 'message': error})
      ).then((json) => {
        if (json.result === '0') {
          resolve();
        } else {
          reject(`请求服务器成功, 但是返回的预订信息有误! 原因: ${json.message}`);
        }
      }).catch(error => {
        reject(`向服务器发起请求预订信息失败, 原因: ${error}`);
      })
    });
  },

  getProduct() {
    const _this = this;

    return new Promise((resolve, reject) => {
      fetch(`${appConfig.version}/product/${_this.productId}/get.do`, {
        'method': "GET",
        'contentType': 'application/json; charset=utf-8'
      }).then(
        response => response.json(),
        error => ({'result': '1', 'message': error})
      ).then((json) => {
        if (json.result === '0') {
          resolve(json.data);
        } else {
          reject(`请求服务器成功, 但是返回的订单信息有误! 原因: ${json.message}`);
        }
      }).catch(error => {
        reject(`向服务器发起请求订单信息失败, 原因: ${error}`);
      })
    });
  }
}

var customerInfo = {
  data: [
    // {
    //   age: 1,
    //   birthday: 1485964800000,
    //   chineseName: "阿萨啊啊",
    //   divingCount: 1,
    //   divingRank: 1,
    //   email: "445445@qq.com",
    //   gender: 1,
    //   isDelete: "N",
    //   mobile: "15976713287",
    //   passportNo: "12312321",
    //   pinyinName: "ASaAA",
    //   userId: null,
    //   userinfoId: 3
    // }
  ],
  myVue: {},

  init: function () {
    var _this = this;

    this.fetchCustomerData()
      .then(function (response) {
        return response.json();
      }, function (error) {
        alert('非常抱歉，获取顾客信息出错！原因: ' + error);
        return false;
      })
      .then(function (val) {
        if (val === false) { return }
        if (val.result === '0') {
          _this.data = val.data;
          _this.myVue = _this.initVue();
        } else {
          alert('非常抱歉，获取顾客信息出错！原因: ' + val.message);
        }
      });
  },

  // 获取 旅客信息方法
  fetchCustomerData: function () {
    var token = cookies.getItem('token'),
      digest = cookies.getItem('digest');

    return fetch(`${appConfig.version}/user/userinfo/findByUserId.do`, {
      method: 'GET',
      headers: {
        'token': token,
        'digest': digest
      }
    });
  },

  // 更新 旅客信息方法
  updateCustomerData: function (data, type) {
    var _this = this,
      url = '',
      token = cookies.getItem('token'),
      digest = cookies.getItem('digest');

    if (type === 'add') {
      url = `${appConfig.version}/user/userinfo/add.do`;
    } else {
      url = `${appConfig.version}/user/userinfo/update.do`;
    }

    return new Promise(function(resolve, reject){
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'token': token,
          'digest': digest
        },
        body: JSON.stringify(data)
      }).then(function (response) {
        return response.json()
      },function (error) {
        reject('数据提交发生错误, 原因:' + error);
      }).then(function(val) {
        if (val.result === '0') {
          _this.fetchCustomerData()
            .then(function (response) {
              return response.json();
            }, function (error) {
              reject('数据提交成功, 但获取顾客信息出错！原因:' + error);
              return false;
            })
            .then(function (fetchValue) {
              if (fetchValue === false) { return }

              if (fetchValue.result === '0') {
                _this.data = fetchValue.data;
                resolve(fetchValue.data);
              } else {
                reject('数据提交成功, 但获取顾客信息出错！原因:' + fetchValue.message);
              }
            });
        } else {
          reject('数据提交发生错误, 原因:' + val.message);
        }
      });
    });
  },

  // 初始化 Vue 旅客信息 列表(空)数据 方法
  dataToVueList: function (data) {
    var myData = data || this.data,
      vueList = [];

    for (var i = 0; i < myData.length; i++) {
      var vueListitem = {
        id: i,
        isSelect: false,
        name: myData[i].chineseName,
        age: myData[i].age,
        gender: (myData[i].gender === 1 ? '女' : '男'),
        mobile: myData[i].mobile
      };
      vueList.push(vueListitem);
    }

    return vueList;
  },

  // 初始化 Vue 旅客信息 项目(空)数据 方法
  createVueItem: function () {
    return {
      chineseName: '',
      chineseNameError: '',

      pinyinName: '',
      pinyinNameError: '',

      passportNo: '',

      gender: 1,

      birthday: '',
      birthdayError: '',

      age: '',

      mobile: '',
      mobileError: '',

      email: '',
      emailError: '',
      
      divingCount: '',

      divingRank: '',
      divingRankError: ''
    };
  },

  initVue: function () {
    var _this = this,
      defaultInspect = true,
      isSubmit = false,
      selectID = 0;

    return new Vue({
      'el': '#customerInfo',

      'data': {
        listModalIsShow: false,
        list: _this.dataToVueList(),

        itemModalIsShow: false,
        itemType: 'add', // update
        itemBTN: '保存',
        item: _this.createVueItem(),

        chineseName: '',
        chineseNameError: '',
        pinyinName: '',
        pinyinNameError: '',

        submitBTN: '确认订单',
        renderList: [
          // {
          //   'id': 0,
          //   'listId': 0,
          //   'passportNo': '',
          //   'chineseName': '曾杰杰',
          //   'pinyinName': 'Rejiejay',
          //   'gender': 1,
          //   'birthday': 1485964800000,
          //   'age': 24,
          //   'mobile': 159767132587,
          //   'email': '454766952@qq.com',
          //   'divingRank': 1,
          //   'divingCount': 0
          // }
        ]
      },

      watch: {
        chineseName: function (val, oldVal) {
          // 如果 默认的检测 是 不检测.
          if (defaultInspect === false) {
            // 则终止此次的检测.
            defaultInspect = true;
            return
          }
          if (val === '') {
            this.chineseNameError = '姓名不能为空';
          } else if (/^[\u2E80-\u9FFF]+$/.test(val) === false) {
            this.chineseNameError = '姓名只能为中文';
          } else {
            // this.pinyinName = ConvertPinyin(val);
            this.pinyinName = ConvertPinyin(val);
            this.chineseNameError = '';
          }
        },
        pinyinName: function (val, oldVal) {
          // 如果 默认的检测 是 不检测.
          if (defaultInspect === false) {
            // 则终止此次的检测.
            defaultInspect = true;
            return
          }
          if (val === '') {
            this.pinyinNameError = '拼音不能为空';
          } else if (/^[a-zA-Z]{0,10000}$/.test(val) === false) {
            this.pinyinNameError = '拼音格式错误';
          } else {
            this.pinyinNameError = '';
          }
        },

        item: {
          handler: function (val, oldVal) {
            var data = oldVal;

            // 如果 默认的检测 是 不检测.
            if (defaultInspect === false) {
              // 则终止此次的检测.
              defaultInspect = true;
              return
            }
  
            if (data.birthday === null || data.birthday === '') {
              this.item.birthdayError = '请选择出生日期';
            }else {
              var nowDate = Date.parse(new Date());
              var selectTimestamp = convertDate.YYYYMMDDFormatToTimestamp(data.birthday);
              this.item.age = Math.ceil((nowDate - selectTimestamp) / 31536000000);
              this.item.birthdayError = '';
            }
  
            if (data.mobile === '') {
              this.item.mobileError = '手机号码不能为空';
            } else if (/^1[34578]\d{9}$/.test(data.mobile) === false) {
              this.item.mobileError = '手机号码格式不正确';
            } else {
              this.item.mobileError = '';
            }
  
            if (data.email === '') {
              this.item.emailError = '邮箱不能为空';
            } else if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(data.email) === false) {
              this.item.emailError = '邮箱格式不正确';
            } else {
              this.item.emailError = '';
            }
  
            if (data.divingRank !== '' && data.divingRank !== null) {
              if (/^[0-9]*$/.test(data.divingRank) === false) {
                this.item.divingRankError = '请输入数字';
              } else if ( parseInt(data.divingRank) >= 100) {
                this.item.divingRankError = '请填写100一下的次数';
              } else {
                this.item.divingRankError = '';
              }
            }

          },
          deep: true
        }
      },

      methods: {
        showAddItem: function() {
          this.itemModalIsShow = true;
          this.itemType = 'add';
          defaultInspect = false;
          this.item = _this.createVueItem();
        },

        showModifyItem: function (id) {
          var data = _this.data[id];

          selectID = id;
          this.itemModalIsShow = true;
          this.itemType = 'update';
          this.chineseName = data.chineseName;
          this.chineseNameError = '';
          this.pinyinName = data.pinyinName;
          this.pinyinNameError = '';
          this.item = {
            // 'chineseName': data.chineseName,
            // 'chineseNameError': '',
      
            // 'pinyinName': data.pinyinName,
            // 'pinyinNameError': '',
      
            'passportNo': data.passportNo,
      
            'gender': data.gender,
      
            'birthday': convertDate.dateToFormat(new Date(data.birthday)),
            'birthdayError': '',
      
            'age': data.age,
      
            'mobile': data.mobile,
            'mobileError': '',
      
            'email': data.email,
            'emailError': '',
            
            'divingCount': data.divingCount,
      
            'divingRank': data.divingRank,
            'divingRankError': ''
          };
        },

        saveItem: function (type) {
          var data = this.item;
          
          if (this.chineseName === '') {
            this.chineseNameError = '姓名不能为空';
            return
          } else if (/^[\u2E80-\u9FFF]+$/.test(this.chineseName) === false) {
            this.chineseNameError = '姓名只能为中文';
            return
          } else {
            this.chineseNameError = '';
          }

          if (this.pinyinName === '') {
            this.pinyinNameError = '拼音不能为空';
            return
          } else if (/^[a-zA-Z]{0,10000}$/.test(this.pinyinName) === false) {
            this.pinyinNameError = '拼音格式错误';
            return
          } else {
            this.pinyinNameError = '';
          }
          
          if (data.birthday === null || data.birthday === '') {
            data.birthdayError = '请选择出生日期';
            return
          }else {
            data.birthdayError = '';
          }

          if (data.mobile === '') {
            data.mobileError = '手机号码不能为空';
            return
          } else if (/^1[34578]\d{9}$/.test(data.mobile) === false) {
            data.mobileError = '手机号码格式不正确';
            return
          } else {
            data.mobileError = '';
          }

          if (data.email === '') {
            data.emailError = '邮箱不能为空';
            return
          } else if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(data.email) === false) {
            data.emailError = '邮箱格式不正确';
            return
          } else {
            data.emailError = '';
          }

          if (data.divingRank !== '' && data.divingRank !== null) {
            if (/^[0-9]*$/.test(data.divingRank) === false) {
              data.divingRankError = '请输入数字';
              return
            } else if ( parseInt(data.divingRank) >= 100) {
              data.divingRankError = '请填写100一下的次数';
              return
            } else {
              data.divingRankError = '';
            }
          }

          this.itemBTN = '正在提交...';

          var submitData = {
            'chineseName': this.chineseName,
            'pinyinName': this.pinyinName,
            'passportNo': data.passportNo,
            'gender': data.gender,
            'birthday': data.birthday,
            'age': data.age,
            'mobile': data.mobile,
            'email': data.email,
            'divingRank': data.divingRank,
            'divingCount': data.divingCount,
          }

          if (type === 'update') {
            submitData.userinfoId = _this.data[selectID].userinfoId;
          }

          var thisVue = this;

          _this.updateCustomerData(submitData, type)
            .then(function (data) {
              thisVue.list = _this.dataToVueList(data);
              thisVue.item = _this.createVueItem();
              thisVue.itemBTN = '保存';
              thisVue.listModalIsShow = true;
              thisVue.itemModalIsShow = false;
            }, function (error) {
              thisVue.itemBTN = '保存';
              alert(error);
            });
        },

        addRenderList: function () {
          var selectCount = 0,
            mySelectList = this.list,
            myRenderList = [];

          for (var i = 0; i < mySelectList.length; i++) {
            if (mySelectList[i].isSelect) {
              var myId = myRenderList.length,
                mySelectItemData = _this.data[mySelectList[i].id],
                divingRank = '';

              selectCount++;
              if (mySelectItemData.divingRank === 1) {
                divingRank = 'OW(初级潜水员)';
              } else if (mySelectItemData.divingRank === 2) {
                divingRank = 'AOW及以上';
              }
              myRenderList.push({
                'id': myId,
                'listId': mySelectList[i].id,
                'passportNo': mySelectItemData.passportNo,
                'chineseName': mySelectItemData.chineseName,
                'pinyinName': mySelectItemData.pinyinName,
                'gender': mySelectItemData.gender,
                'birthday': convertDate.dateToFormat(new Date(mySelectItemData.birthday)),
                'age': mySelectItemData.age,
                'mobile': mySelectItemData.mobile,
                'email': mySelectItemData.email,
                'divingRank': divingRank,
                'divingCount': mySelectItemData.divingCount
              });
            }
          }

          if (selectCount === 0) {
            alert('至少选择一人信息!');
            return
          }

          this.renderList = myRenderList;
          this.listModalIsShow = false;
        },

        removeRenderitem: function (id) {
          var _this = this;
  
          if(window.confirm('你确定要删除吗?')){
            _this.renderList.splice(id, 1);
          }
        },

        submit: function () {
          var Vuethis = this,
            userInfoList = [];

          if (isSubmit) { return }

          if (this.renderList.length === 0) {
            alert('至少提供一旅客信息!');
            return
          }

          for (var i = 0; i < this.renderList.length; i++) {
            var myUserInfoItem = _this.data[this.renderList[i].listId];
            userInfoList.push({
              'relId': null,
              'orderId': null,
              'chineseName': myUserInfoItem.chineseName,
              'pinyinName': myUserInfoItem.pinyinName,
              'gender': myUserInfoItem.gender,
              'passportNo': myUserInfoItem.passportNo,
              'email': myUserInfoItem.email,
              'divingCount': myUserInfoItem.divingCount,
              'divingRank': myUserInfoItem.divingRank,
              'birthday': myUserInfoItem.birthday,
              'age': myUserInfoItem.age,
              'mobile': myUserInfoItem.mobile
            });

            myData.submitData.userInfoList = userInfoList;

            isSubmit = true;
            this.submitBTN = '正在提交...';

            myData.submitProduct()
            .then(val => {
              alert('恭喜你提交成功! 请在30分钟内付定金!');
              isSubmit = false;
              Vuethis.submitBTN = '确认订单';
              window.location = './../../user/account.html#Orders';
            }, error => {
              alert(error);
              isSubmit = false;
              Vuethis.submitBTN = '确认订单';
            })
          }
        }
      },

      components: { datepicker }
    });
  }
}

// 工具类
let utilities = {

  isSupport() {
    if (isIE(6) || isIE(7) || isIE(8)) {
      alert('因为IE8（及以下）由于存在安全风险，已被本站禁止，请升级到IE11或使用Chrome浏览器。')
      return false
    }

    let storage = window.localStorage;
    try {
      storage.setItem('test', 'testValue');
      storage.removeItem('test');
    } catch (error) {
      alert('非常抱歉，暂不支持此浏览器，请更换您的浏览器或联系客服。');
      return false
    }
    return true

    function isIE(ver) {
      let b = document.createElement('b');
      b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->';
      return b.getElementsByTagName('i').length === 1;
    }
  },

  loadPageVar: function(sVar) {
    return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }
}

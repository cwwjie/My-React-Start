/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nav_bottom_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nav_header_js__ = __webpack_require__(2);



__WEBPACK_IMPORTED_MODULE_0__nav_bottom_js__["a" /* default */].init();
__WEBPACK_IMPORTED_MODULE_1__nav_header_js__["a" /* default */].init();

$(document).ready(function() {
  carousel();
  renderMain();
  // 公告
});
// 渲染(轮播图)
function carousel() {
  function renderCarousel(message) {
      var inner = "",
          indicators = "";
      for (var i = 0; i < message.length; i++) {
          if (i == 0) {
              inner += "<div class='item active'><a href='" + message[i].leadUrl + "' target='_Blank'><img src=" + URLbase + message[i].carouselUrl + "></a><div class='carousel-caption'></div></div>"
              indicators += "<li data-target='#carousel-example-generic' data-slide-to=" + i + " class='active'></li>"
          } else {
              inner += "<div class='item'><a href='" + message[i].leadUrl + "' target='_Blank'><img src=" + URLbase + message[i].carouselUrl + "></a><div class='carousel-caption'></div></div>"
              indicators += "<li data-target='#carousel-example-generic' data-slide-to=" + i + "></li>"
          }
      }
      $("#carousel").html(inner);
      $(".carousel-indicators").html(indicators);
  }
  $.ajax({
      type: "GET",
       
      url: appConfig.findByElement,
       
      contentType: "application/json; charset=utf-8",
       
      success: function(message) {
          renderCarousel(message.data);
      }
  });
}
// 渲染主页面
function renderMain() {
  function renderProduct(data) {
      var stringOut = "";
      for (var i = 0; i < data.length; i++) {

          // 大标题部分
          stringOut += [
              "<div class='"+ ((i % 2 == 0) ? 'block' : 'block interval') + "'>",
                  "<h2>" + data[i].catName + "<span>",
                      "<a href='https://divet.taobao.com/?spm=a1z10.1-c.0.0.8cxl3q' target='_blank'>更多</a>",
                  "</span></h2>",
              "<div class='blockContain'>"
          ].join("");

          // 标题下方内容部分
          var thing = data[i].productList;
          for (var j = 0; j < thing.length; j++) {

              if (thing.length % 3 == 0) {
                  stringOut += productItemString('isLineThree', thing, j);
              } else if (thing.length % 3 == 2) {
                  if (j < (thing.length - 2)) {
                      stringOut += productItemString('isLineThree', thing, j);
                  } else {
                      stringOut += productItemString('isLineTow', thing, j);
                  }
              } else if (thing.length % 3 == 1) {
                  if (j < (thing.length - 4)) {
                      stringOut += productItemString('isLineThree', thing, j);
                  } else {
                      stringOut += productItemString('isLineTow', thing, j);
                  }
              }
          }
          stringOut += "</div></div>";
      }
      $("#mainContent").html(stringOut);

      // 渲染每个Item
      function productItemString(isLineTow, thing, j) {
          return [
              (isLineTow === 'isLineTow' ? "<div class='line separate2'>" : "<div class='line separate3'>"),
                  "<a href='./page/index.html?productId=" + thing[j].productId + "'>",
                      "<div class='img'>",
                          "<div class='Masking'></div>",
                          "<img src='" + URLbase + thing[j].productThumb + "' />",
                          "<div class='imgContain'>",
                              "<div class='title'>" + thing[j].productName + "</div>",
                              "<div class='Content'>",
                                  "<div class='cover " + label(thing[j].isNew, thing[j].promoteEndTime, thing[j].promoteStartTime, thing[j].promotePrice) + "</div>",
                                  "<div class='price'>" + newproMotPriTOP(thing[j].promotePrice, thing[j].productPrice, thing[j].promoteEndTime, thing[j].promoteStartTime) + "RMB</div>",
                              "</div>",
                          "</div>",
                      "</div>",
                  "</a>",
                  "<div class='Text'>",
                      "<div class='TextT'>",
                          "<a href='./page/index.html#" + thing[j].productId + "'>",
                              "<div class='left' title='" + thing[j].productName + "'>" + thing[j].productName + "</div>",
                          "</a>",
                          "<div class='right'>" + newproMotPriTOP(thing[j].promotePrice, thing[j].productPrice, thing[j].promoteEndTime, thing[j].promoteStartTime) + " RMB</div>",
                      "</div>",
                      "<div class='TextB'>",
                          "<div class='left'>" + (thing[j].productType === "package" ? thing[j].apartment : '') + "</div>",
                          "<div class='right' " + newlineThrough(thing[j].promoteEndTime, thing[j].promoteStartTime, thing[j].productPrice) + ">" + newproMotPriBOT(thing[j].promotePrice, thing[j].productPrice, thing[j].promoteEndTime, thing[j].promoteStartTime) + "</div>",
                      "</div>",
                  "</div>",
              "</div>",
          ].join("");
      }

      // 促销价(data:promotePrice) => 空(null) ? 返回CSS横线
      function lineThrough(data) {
          if (data == null) {
              return ""
          } else {
              return "style='text-decoration:line-through;'"
          }
      }
      /*
       * 判断是否促销 (横线)
       * 是 促销 那么加 横线
       */
      function newlineThrough(EndTime, StartTime, Promote) {
          var timestamp = Date.parse(new Date());
          if (Promote == null || Promote == 0) {} else {
              if (timestamp >= StartTime && timestamp <= EndTime) {
                  // 此时是促销
                  return "style='text-decoration:line-through;'"
              }
          }
          // 其他情况都不是促销
          return ""
      }
      // 标签(New:'Y'or'N',EndTime:'促销结束时间') => "cover3'>限时促销"or"cover2'>新品"or"cover1'>度假套餐"
      function label(New, EndTime, StartTime, Promote) {
          var timestamp = Date.parse(new Date());
          if (Promote == null || Promote == 0) {} else {
              // 当前时间 大于 促销开始时间 小于等于 促销结束时间
              if (timestamp >= StartTime && timestamp <= EndTime) {
                  return "cover3'>限时促销"
              }
          }
          if (New == "Y") {
              return "cover2'>新品"
          } else {
              return "cover1'>度假套餐"
          }
      }
      /*
       * 判断是否促销 (价格)
       */
      function proMotPri(Promote, Price) {
          if (Promote == null) {
              return Price
          } else if (Promote == 0) {
              return Price
          } else {
              return Promote
          }
      }
      /*
       * 上方 判断是否促销 (价格)
       * 是促销 显示 促销
       */
      function newproMotPriTOP(Promote, Price, EndTime, StartTime) {
          var timestamp = Date.parse(new Date());
          if (Promote == null || Promote == 0) {} else {
              if (timestamp >= StartTime && timestamp <= EndTime) {
                  // 此时是促销
                  return Promote
              }
          }
          // 其他情况都不是促销
          return Price
      }
      /*
       * 下方 判断是否促销 (价格)
       * 是促销 显示 原价 否则不显示
       */
      function newproMotPriBOT(Promote, Price, EndTime, StartTime) {
          var timestamp = Date.parse(new Date());
          if (Promote == null || Promote == 0) {} else {
              if (timestamp >= StartTime && timestamp <= EndTime) {
                  // 此时是促销
                  return Price
              }
          }
          // 其他情况都不是促销
          return ""
      }
  }
  $.ajax({
      type: "GET",
       
      url: "" + URLbase + URLversion + "/product/listWithCat.do",
       
      contentType: "application/json; charset=utf-8",
       
      success: function(message) {
          renderProduct(message.data);
      }
  });
}




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  init: () => {
    var FFFhomeURL = $("#FFFhomeURL").attr('data-homeURL');

    $(document).ready(function() {
      $("i").css('background-image',"url("+FFFhomeURL+"dist/img/ico.png)");
      scrollTop();
    });

    // 滚动到顶部
    function scrollTop() {
      var timer = null,
        Show_top = false,
        scrollTop;
      window.onscroll=function(){
        scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        if (scrollTop > 600) {
          if (Show_top == false) {
            Show_top = true;
            $("#scroll_Top").css('visibility', 'visible');
            $("#scroll_Top").animate({opacity:"1"},500)
          }
        }else if (scrollTop < 600) {
          if (Show_top == true) {
            Show_top = false;
            $("#scroll_Top").animate({opacity:"0"},500);
            setTimeout(function(){
              $("#scroll_Top").css('visibility', 'hidden');
            },500)
          }
        }
        return scrollTop;
      }
      $("#scroll_Top").click(function(){
        clearInterval(timer);
        timer=setInterval(function(){
          var now=scrollTop;
          var speed=(0-now)/10;
          speed=speed>0?Math.ceil(speed):Math.floor(speed);
          if(scrollTop==0){
            clearInterval(timer);
          }
          document.documentElement.scrollTop=scrollTop+speed;
          document.body.scrollTop=scrollTop+speed;
        }, 10);
      });
      // 侧边栏
      $("#Taobao_customer_service").click(function(){
        $(".Sidebar").animate({right:'0'},70);
      })
      var _clientWidth=document.body.clientWidth;
      if (_clientWidth < 500) {
        $(".Sidebar").css("right","-"+(_clientWidth+10)+"px");
        $(".Sidebar").css("width",(_clientWidth+10)+"px");
      }
      $("#closeSidebar").click(function(){
        if (_clientWidth < 500) {
          $(".Sidebar").animate({right:"-"+(_clientWidth+10)+"px"},70);
        }else{
          $(".Sidebar").animate({right:'-330px'},70);
        }
      })
      // 渲染SVG
      var _string = "<svg  class='svg_1' viewBox='0 0 1024 1024' width='32' height='32'><path d='M291.127652 378.034087c-27.781565 10.841043-40.269913 20.880696-46.881391 52.001391-8.926609 41.538783 12.354783 107.675826 48.929391 103.980522 51.600696-5.097739 59.258435-102.466783 30.586435-139.642435C316.104348 384.422957 305.39687 381.618087 291.127652 378.034087zM515.383652 378.034087c-27.38087 10.685217-40.136348 20.390957-46.881391 50.977391-9.171478 41.805913 12.221217 108.699826 48.929391 105.004522 52.513391-5.209043 62.330435-113.552696 25.510957-144.762435C535.28487 382.753391 526.870261 381.106087 515.383652 378.034087zM919.863652 313.566609c-78.358261-137.104696-214.817391-226.927304-433.241043-223.254261-15.293217 1.402435-30.586435 2.693565-45.879652 4.096-27.136 5.743304-54.405565 11.597913-81.563826 17.341217C229.086609 152.509217 130.82713 233.182609 82.921739 356.396522 56.653913 423.66887 64.556522 523.464348 90.045217 583.724522c52.379826 123.859478 158.386087 201.750261 298.696348 237.545739 58.88 15.048348 159.922087 23.062261 222.252522 4.073739 44.966957 43.453217 137.48313 83.72313 220.182261 87.663304-14.647652-27.514435-29.184-55.05113-43.831652-82.565565-7.123478-20.390957-14.269217-40.781913-21.392696-61.17287 19.745391-13.623652 39.357217-27.136 59.102609-40.781913 52.112696-40.381217 90.35687-97.480348 116.224-164.129391C971.998609 484.975304 954.145391 373.448348 919.863652 313.566609zM710.90087 741.732174c1.513739 37.197913 16.294957 70.455652 27.514435 99.906783-26.37913-8.281043-51.244522-21.414957-72.370087-35.706435-7.791304-6.099478-15.693913-12.221217-23.462957-18.342957-5.097739-5.476174-10.195478-10.818783-15.293217-16.294957-12.599652 2.671304-25.110261 5.476174-37.732174 8.147478-35.417043 7.012174-84.858435 10.818783-123.347478 4.096-96.456348-16.962783-166.177391-39.891478-229.376-87.663304-47.771826-36.196174-90.223304-89.466435-110.102261-152.909913-41.538783-132.274087 30.586435-252.193391 103.980522-308.891826 43.453217-33.52487 93.651478-59.770435 152.909913-77.467826 22.038261-4.452174 44.210087-8.815304 66.270609-13.245217 11.597913-1.024 23.062261-2.048 34.660174-3.072 187.814957-0.512 313.58887 65.469217 384.333913 181.448348 13.000348 21.147826 22.906435 46.636522 30.564174 72.370087C949.693217 562.064696 811.564522 693.693217 710.90087 741.732174z' p-id='3942' fill='#ffffff'></path></svg>";
        _string +=  "<svg  class='svg_2' viewBox='0 0 1024 1024' width='32' height='32'><path d='M291.127652 378.034087c-27.781565 10.841043-40.269913 20.880696-46.881391 52.001391-8.926609 41.538783 12.354783 107.675826 48.929391 103.980522 51.600696-5.097739 59.258435-102.466783 30.586435-139.642435C316.104348 384.422957 305.39687 381.618087 291.127652 378.034087zM515.383652 378.034087c-27.38087 10.685217-40.136348 20.390957-46.881391 50.977391-9.171478 41.805913 12.221217 108.699826 48.929391 105.004522 52.513391-5.209043 62.330435-113.552696 25.510957-144.762435C535.28487 382.753391 526.870261 381.106087 515.383652 378.034087zM919.863652 313.566609c-78.358261-137.104696-214.817391-226.927304-433.241043-223.254261-15.293217 1.402435-30.586435 2.693565-45.879652 4.096-27.136 5.743304-54.405565 11.597913-81.563826 17.341217C229.086609 152.509217 130.82713 233.182609 82.921739 356.396522 56.653913 423.66887 64.556522 523.464348 90.045217 583.724522c52.379826 123.859478 158.386087 201.750261 298.696348 237.545739 58.88 15.048348 159.922087 23.062261 222.252522 4.073739 44.966957 43.453217 137.48313 83.72313 220.182261 87.663304-14.647652-27.514435-29.184-55.05113-43.831652-82.565565-7.123478-20.390957-14.269217-40.781913-21.392696-61.17287 19.745391-13.623652 39.357217-27.136 59.102609-40.781913 52.112696-40.381217 90.35687-97.480348 116.224-164.129391C971.998609 484.975304 954.145391 373.448348 919.863652 313.566609zM710.90087 741.732174c1.513739 37.197913 16.294957 70.455652 27.514435 99.906783-26.37913-8.281043-51.244522-21.414957-72.370087-35.706435-7.791304-6.099478-15.693913-12.221217-23.462957-18.342957-5.097739-5.476174-10.195478-10.818783-15.293217-16.294957-12.599652 2.671304-25.110261 5.476174-37.732174 8.147478-35.417043 7.012174-84.858435 10.818783-123.347478 4.096-96.456348-16.962783-166.177391-39.891478-229.376-87.663304-47.771826-36.196174-90.223304-89.466435-110.102261-152.909913-41.538783-132.274087 30.586435-252.193391 103.980522-308.891826 43.453217-33.52487 93.651478-59.770435 152.909913-77.467826 22.038261-4.452174 44.210087-8.815304 66.270609-13.245217 11.597913-1.024 23.062261-2.048 34.660174-3.072 187.814957-0.512 313.58887 65.469217 384.333913 181.448348 13.000348 21.147826 22.906435 46.636522 30.564174 72.370087C949.693217 562.064696 811.564522 693.693217 710.90087 741.732174z' p-id='3942' fill='#01b969'></path></svg>";
      $("._SVG").html(_string);
    }
  }
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  init: () => {
    // 入口
    $(document).ready(function() {
      judgLogin();
      login();
      // 高亮 导航 选中方法
      highlightSelected();
    });

    var homeURL = $("#login").attr('data-home');
    var _binglogin = true;
    // 登出方法
    function Logout() {
      homeURL = $("#login").attr('data-home');
      $.ajax({
        type: "POST", 
        url: appConfig.logout, 
        contentType: "application/json; charset=utf-8", 
        headers: {
          'token':$.cookie('token'),
          'digest':$.cookie('digest')
        },
        success: function (message) {
          if (message.result == "0" ) {
            $.cookie('token',null,{path: '/' });
            $.cookie('digest',null,{path: '/' });
            $("#login").addClass('login')
            $("#login").html(
              "<div><a href='"+homeURL+"user/signup.html' target='_blank'>注册</a>"//
              +"</div><div><a href='JavaScript:;' onclick='log_fun.Show()' target='_self'>登录</a></div>");
          }
        }
      });
    }
    // 判断是否登录的方法
    function judgLogin() {
      homeURL = $("#login").attr('data-home');
      $.ajax({
        type: "GET", 
        url: appConfig.getUserInfo, 
        contentType: "application/json; charset=utf-8", 
        headers: {
          'token':$.cookie('token'),
          'digest':$.cookie('digest')
        },
        success: function (message) {
          if (message.result == "0" ) {
            $("#login").removeClass('login');
            $("#login").html("<div class='Center'><i class='left'></i><span>"//
              +message.data.nickname+"</span><i class='right'></i><div class='dropdown'>"//
              +"<ul><a href='"+homeURL+"user/account.html#Person' onclick='window.location.reload()'>"//
              +"<li class='First'><i style='background-position:-216px -185px;'></i>个人中心</li></a><a href='"+homeURL+"user/account.html#Orders' onclick='window.location.reload()'>"//
              +"<li><i style='background-position:-248px -185px;'></i>商城订单</li></a><a href='"+homeURL+"user/account.html#taobao' onclick='window.location.reload()'>"//
              +"<li><i style='background-position:-408px -185px;'></i>淘宝订单</li></a><a href='"+homeURL+"user/account.html#Accoun' onclick='window.location.reload()'>"//
              +"<li><i style='background-position:-280px -185px;'></i>账号中心</li></a><a href='"+homeURL+"user/account.html#Addres' onclick='window.location.reload()'>"//
              +"<li  style='display: none;'><i style='background-position:-344px -185px;'></i>收货地址</li></a>"//
              +"<a href='"+homeURL+"user/account.html#Client' onclick='window.location.reload()'><li><i style='background-position:-376px -185px;'></i>旅客信息</li></a>"//
              +"<a onclick='Logout();'><li><i style='background-position:-312px -185px;'></i>退出登录</li></a></ul></div></div>")
            $("i").css('background-image',"url("+homeURL+"dist/img/ico.png)");
          }
        }
      });
    }
    // 模态框清空数据
    var log_fun ={
      Show:function () {
        $("#loginModal").modal('show');
        $(".input1 input").val("");
        $(".input2 input").val("");
        $(".input1 i").removeClass("correcticon");
        $(".input1 i").removeClass("mistakeicon");
        $(".input2 i").removeClass("correcticon");
        $(".input2 i").removeClass("mistakeicon");
        $(".input1 span").text("");
        $(".input2 span").text("");
      },
      hide:function () {
        $("#loginModal").modal('hide');
        $(".input1 input").val("");
        $(".input2 input").val("");
        $(".input1 i").removeClass("correcticon");
        $(".input1 i").removeClass("mistakeicon");
        $(".input2 i").removeClass("correcticon");
        $(".input2 i").removeClass("mistakeicon");
        $(".input1 span").text("");
        $(".input2 span").text("");
      }
    }
    // 登录(功能)
    function login() {
      if (_binglogin == true) {
        _binglogin = false;
      }else {
        return
      }
      function LoginFun() {
        // 显示隐藏模态框(登录)
        this.Show = function() {
          $("#loginModal").modal('show');
          $(".input1 input").val("");
          $(".input2 input").val("");
        }
        this.hide = function() {
          $("#loginModal").modal('hide');
          $(".input1 input").val("");
          $(".input2 input").val("");
        }
        // 验证(登录)
        this.checkUser = function() {
          if(!(/^1[34578]\d{9}$/.test($("#User").val())) && !(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($("#User").val()))){
            $(".input1 i").removeClass("correcticon");
            $(".input1 i").addClass("mistakeicon");
            $(".input1 span").text("请输入正确格式邮箱或手机");
            return false
          }else {
            $(".input1 i").removeClass("mistakeicon");
            $(".input1 i").addClass("correcticon");
            $(".input1 span").text("输入正确");
            return true
          }
        }
        // 验证(密码)
        this.checkPassword = function() {
          if ($("#password").val().length < 8) {
            $(".input2 i").removeClass("correcticon");
            $(".input2 i").addClass("mistakeicon");
            $(".input2 span").text("密码必须大于8位数字");
            return false
          }else if(/\s/.test($("#password").val())){
            $(".input2 i").removeClass("correcticon");
            $(".input2 i").addClass("mistakeicon");
            $(".input2 span").text("密码不能有空格");
            return false
          }else{
            $(".input3").css("display","block")
            $(".input2 i").removeClass("mistakeicon");
            $(".input2 i").removeClass("correcticon");
            $(".input2 span").text("");
            return true
          }
        }
      }
      function loginPush() {
        var RememberCookie,
          json,
          date = new Date();
        // json(手机登录or邮箱登录)
        if ((/^1[34578]\d{9}$/.test($("#User").val()))) {
          json = {"mobile" : $("#User").val(),"passwd" : $("#password").val()};
        }else if ((/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($("#User").val()))) {
          json = {"email" : $("#User").val(),"passwd" : $("#password").val()};
        }
        $.ajax({ 
          type: "POST", 
          url: appConfig.logurl, 
          contentType: "application/json; charset=utf-8", 
          data: JSON.stringify(json), 
          dataType: "json", 
          success: function (message) {
            $("#loginBtn").attr("title","ready");
            $("#loginBtn").text("登录");
            if (message.result == "0") {
              if ($("#RememberCookie").is(':checked')) {
                $.cookie('token', message.data.token,{
                  expires:7,
                  path:'/'
                });
                $.cookie('digest', message.data.digest,{
                  expires:7,
                  path:'/'
                });
              }else{
                $.cookie('token', message.data.token,{
                  path:'/'
                });
                $.cookie('digest', message.data.digest,{
                  path:'/'
                });
              }
              var loginTem = new LoginFun();
              loginTem.hide();
              judgLogin();
            }else if (message.result == -9) {
              $(".input1 i").removeClass("correcticon");
              $(".input1 i").addClass("mistakeicon");
              $(".input1 span").text("账号未激活");
              $(".input2 i").removeClass("mistakeicon");
              $(".input2 i").removeClass("correcticon");
              $(".input2 span").text("");
              return
            }else if (message.result == -6){
              $(".input1 i").removeClass("mistakeicon");
              $(".input1 i").addClass("correcticon");
              $(".input1 span").text("用户名正确");
              $(".input2 i").removeClass("correcticon");
              $(".input2 i").addClass("mistakeicon");
              $(".input2 span").text("密码错误");
              return
            }else if (message.result == -9){
              $(".input1 i").addClass("mistakeicon");
              $(".input1 i").removeClass("correcticon");
              $(".input1 span").text("账户未激活");
              $(".input2 i").removeClass("correcticon");
              $(".input2 i").removeClass("mistakeicon");
              $(".input2 span").text("");
              return
            }else if (message.result == -5){
              $(".input1 i").addClass("mistakeicon");
              $(".input1 i").removeClass("correcticon");
              $(".input1 span").text("账号不存在");
              $(".input2 i").removeClass("correcticon");
              $(".input2 i").removeClass("mistakeicon");
              $(".input2 span").text("");
              return
            }else {
              $(".input1 i").addClass("mistakeicon");
              $(".input1 i").removeClass("correcticon");
              $(".input1 span").text(message.message);
              $(".input2 i").removeClass("correcticon");
              $(".input2 i").removeClass("mistakeicon");
              $(".input2 span").text("");
              return
            }
          }
        });
      }
      function Bindevents() {
        var log = new LoginFun();
        $("#User").change(function(){
          log.checkUser();
        });
        $("#password").change(function(){
          log.checkPassword();
        });
        $("#ShowPassword").click(function(){
          if ($("#password").attr('type') == "password") {
            $("#password").attr('type','text');
            $(".ShowPassword").addClass("Show");
            $(".ShowPassword").removeClass("hiden");
            return
          }else if ($("#password").attr('type') == "text") {
            $("#password").attr('type','password');
            $(".ShowPassword").addClass("hiden");
            $(".ShowPassword").removeClass("Show");
            return
          }
        });
        $("#loginBtn").click(function(){
          if ($("#loginBtn").attr("title") == "loading") {
            return
          }
          if (log.checkUser() == false) {
            return
          }else if (log.checkPassword() == false) {
            return
          }
          $("#loginBtn").text("正在登录");
          $("#loginBtn").attr("title","loading");
          loginPush();
        });
      }
      Bindevents();
    }
    
    function highlightSelected() {
      var myUrl = window.location.pathname;

      if (
        myUrl === '/index.html' || 
        myUrl === '/' || 
        myUrl === '/Dvt-web/index.html' || 
        myUrl === '/Dvt-web/'
      ) {
        $('#headerHome').addClass('isSelected');
      } else if (
        myUrl === '/village/index.html' || 
        myUrl === '/village' || 
        myUrl === '/village/' || 
        myUrl === '/Dvt-web/village/index.html' || 
        myUrl === '/Dvt-web/village' || 
        myUrl === '/Dvt-web/village/'
      ) {
        $('#headerVillage').addClass('isSelected');
      }
    }
  }
});

/***/ })
/******/ ]);
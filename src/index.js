import bottom from "./nav/bottom.js"
import header from "./nav/header.js"

bottom.init();
header.init();

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



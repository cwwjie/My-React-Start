import header from './Component/Navigation-Bar/index.js';
import ScrollTop from './Component/ScrollTop/index.js';

$(document).ready(() => {

  header.init('0');
  carousel.init();
  product.init();
  ScrollTop.init();
});

let carousel = {
  'data': [
    // {
    //   'carouselDesc': "疯狂旅拍包含宝贝，亲子，情侣三种系列",
    //   'carouselId': 20,
    //   'carouselTitle': "疯狂旅拍",
    //   'carouselUrl': "/source/image/carousel/4123b41f-aa2c-4664-ad34-43eef571c326.png",
    //   'createBy': 23,
    //   'createTime': 1492969464000,
    //   'isDelete': "N",
    //   'isShow': "Y",
    //   'leadUrl': "http':/divet.taobao.com/p/rd938859.html",
    //   'sortOrder': 0,
    //   'updateBy': 29,
    //   'updateTime': 1508118166000
    // }
  ],

  init() {
    const _this = this;

    this.getCarousel()
    .then(val => {
      _this.data = val;
      _this.renderCarousel();
    }, error => alert(error))
  },

  renderCarousel() {
    $('#carousel').html([
      '<div class="carousel slide" data-ride="carousel">',
        '<ol class="carousel-indicators">',
        this.data.map((val, key) => {
          return key === 0 ?
          '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>' :
          `<li data-target="#carousel-example-generic" data-slide-to="${key}"></li>`;
        }).join(''),
        '</ol>',
        '<div class="carousel-inner" role="listbox" id="carousel">',
        this.data.map((val, key) => {
          return key === 0 ? [
            '<div class="item active">',
              `<a href="${val.leadUrl}">`,
                `<img src="${appConfig.urlBase}${val.carouselUrl}">`,
                '<div class="carousel-caption"></div>',
              '</a>',
            '</div>',
          ].join('') : [
            '<div class="item">',
              `<a href="${val.leadUrl}">`,
                `<img src="${appConfig.urlBase}${val.carouselUrl}">`,
                '<div class="carousel-caption"></div>',
              '</a>',
            '</div>',
          ].join('');
        }).join(''),
        '</div>',
        '<a id="carousel-left" class="left carousel-control" role="button" data-slide="prev">',
          '<span class="sr-only">Previous</span>',
          '<span class="glyphicon glyphicon-chevron-left"></span>',
          '<i class="left-btn allbtn"></i>',
        '</a>',
        '<a id="carousel-right" class="right carousel-control" role="button" data-slide="next">',
          '<span class="sr-only">Next</span>',
          '<span class="glyphicon glyphicon-chevron-right"></span>',
          '<i class="right-btn allbtn"></i>',
        '</a>',
      '</div>',
    ].join(''));

    $('.carousel').carousel();
    $('#carousel-left').click(() => {
      $('.carousel').carousel('prev')
    });
    $('#carousel-right').click(() => {
      $('.carousel').carousel('next')
    });
  },

  getCarousel() {
    return new Promise((resolve, reject) => {
      $.ajax({
        'type': 'GET',
        'url': `${appConfig.version}/system/carousel/findByElement.do`,
        'contentType': 'application/json; charset=utf-8',
        success: val => {
          if (val.result === '0') {
            resolve(val.data);
          } else {
            reject(`请求服务器成功, 但是轮播图数据有误, 原因: ${val.message}`);
          }
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
          reject(`请求轮播图出错, 状态码: ${XMLHttpRequest.status}. 原因: ${errorThrown}`);
        }
      });

    })
  }
}

let product = {
  'data': [
    // {
    //   'catDesc': null,
    //   'catId': 13,
    //   'catName': "潜游双人套餐",
    //   'createBy': null,
    //   'createTime': null,
    //   'isDelete': null,
    //   'isShow': null,
    //   'parentId': null,
    //   'sortOrder': null,
    //   'updateBy': null,
    //   'updateTime': null,
    //   'productList': [
    //     {
    //       'apartment': "邦邦 沙滩屋",
    //       'apartmentNum': 1,
    //       'bedType': null,
    //       'brandId': null,
    //       'clickCount': null,
    //       'createBy': null,
    //       'createTime': null,
    //       'isDelete': null,
    //       'isNew': "Y",
    //       'isOnsale': null,
    //       'period': 3,
    //       'productBrief': "未经雕琢的天然小岛--邦邦岛",
    //       'productDesc': null,
    //       'productId': 64,
    //       'productImg': "/source/image/product/thum/thum_34867ce5-d61a-4576-b4fb-060365c7d638.jpg",
    //       'productName': "天然小岛邦邦 3天2晚蜜月/闺蜜行",
    //       'productPrice': 5700,
    //       'productSn': "000006",
    //       'productThumb': "/source/image/product/thum/thum_34867ce5-d61a-4576-b4fb-060365c7d638.jpg",
    //       'productType': "package",
    //       'productView': null,
    //       'promoteEndTime': 0,
    //       'promotePrice': 0,
    //       'promoteStartTime': 0,
    //       'refundRuleId': null,
    //       'updateBy': null,
    //       'updateTime': null,
    //     }
    //   ],
    // }
  ],

  init() {
    const _this = this;

    this.getProduct()
    .then(val => {
      _this.data = val;
      _this.renderProduct();
    }, error => alert(error))
  },

  renderProduct() {
    const _this = this;
    let isinterval = false;

    $('#product').html(
      this.data.map((list, key) => {
        // 交换间隔
        isinterval = isinterval ? false : true;

        let productLength = list.productList.length;

        return [
          `<div class="product-list${isinterval ? ' list-interval' : ''}">`,
            `<h2>${list.catName} <a href="https://divet.taobao.com/?spm=a1z10.1-c.0.0.8cxl3q" target='_blank'>更多</a></h2>`,

            '<div class="list-content">',
              list.productList.map((val, itemKey) => {
                let isLineThree = true; // 默认 三行

                if (productLength % 3 === 0) { // 正好整除
                  isLineThree = true;
                } else if (productLength % 3 == 2) { // 余 2
                  ( itemKey < (productLength - 2) ) ? isLineThree = true : isLineThree = false;
                } else if (productLength % 3 == 1) { // 余 1
                  ( itemKey < (productLength - 4) ) ? isLineThree = true : isLineThree = false;
                }

                return [
                  `<div class="item${isLineThree ? '' : ' item-big'}">`,
                    '<div class="item-content">',
                      `<a href="./product/index.html?productId=${val.productId}">`,
                        '<div class="item-img">',
                          `<img src="${appConfig.urlBase}${val.productThumb}" />`,
                          '<div class="img-label">',
                            _this.renderLabel(val),
                          '</div>',
                        '</div>',
                      '</a>',
                      '<div class="item-detail">',
                        '<div class="detail-NameAndPrice">',
                          '<div class="detail-productName">',
                            `<a href="./product/index.html?productId=${val.productId}">${val.productName}</a>`,
                          '</div>',
                          _this.renderPrice(val),
                        '</div>',
                        '<div class="detail-apartmentAndPromote">',
                          `<div class="detail-apartment">${
                            val.productType === "package" ? val.apartment : ''
                          }</div>`,
                          _this.renderPromote(val),
                        '</div>',
                      '</div>',
                    '</div>',
                  '</div>'
                ].join("");
              }).join(''),
            '</div>',
          '</div>'
        ].join('');
      }).join('')
    );
  },

  renderPromote(item) {
    const nowTimestamp = Date.parse(new Date()),
      promoteEndTimestamp = item.promoteEndTime,
      promoteStartTimestamp = item.promoteStartTime,
      promotePrice = item.promotePrice,
      productPrice = item.productPrice;

    // 如果促销
    if (promotePrice != null && promotePrice != 0) {
      // 当前时间 大于等于 促销开始时间
      // 并且
      // 当前时间 小于等于 促销结束时间
      if (
        nowTimestamp >= promoteStartTimestamp && 
        nowTimestamp <= promoteEndTimestamp
      ) {
        return `<div class="detail-promote">${productPrice}</div>`
      }
    }

    // 其他情况都不是促销
    return ""
  },

  renderPrice(item) {
    const promotePrice = item.promotePrice,
      productPrice = item.productPrice,
      promoteEndTimestamp = item.promoteEndTime,
      promoteStartTimestamp = item.promoteStartTime,
      nowTimestamp = Date.parse(new Date());

    // 如果促销
    if (promotePrice != null && promotePrice != 0) {
      // 当前时间 大于等于 促销开始时间
      // 并且
      // 当前时间 小于等于 促销结束时间
      if (
        nowTimestamp >= promoteStartTimestamp && 
        nowTimestamp <= promoteEndTimestamp
      ) {
        return `<div class="detail-price">${promotePrice} RMB</div>`
      }
    }

    // 其他情况都不是促销
    return `<div class="detail-price">${productPrice} RMB</div>`
  },

  renderLabel(item) {
    const isNew = item.isNew, // 'Y' 'N'
      promotePrice = item.promotePrice,
      promoteEndTimestamp = item.promoteEndTime,
      promoteStartTimestamp = item.promoteStartTime,
      nowTimestamp = Date.parse(new Date());

    // 如果促销
    if (promotePrice != null && promotePrice != 0) {
      // 当前时间 大于等于 促销开始时间
      // 并且
      // 当前时间 小于等于 促销结束时间
      if (
        nowTimestamp >= promoteStartTimestamp && 
        nowTimestamp <= promoteEndTimestamp
      ) {
        return '<div class="label-promote">限时促销</div>'
      }
    }

    // 如果不促销
    return isNew === 'Y' ? 
    '<div class="label-isNew">新品</div>' : 
    '<div class="label-product">度假套餐</div>';
  },

  getProduct() {
    return new Promise((resolve, reject) => {
      $.ajax({
        'type': 'GET',
        'url': `${appConfig.version}/product/listWithCat.do`,
        'contentType': 'application/json; charset=utf-8',
        success: val => {
          if (val.result === '0') {
            resolve(val.data);
          } else {
            reject(`请求服务器成功, 但是产品数据有误, 原因: ${val.message}`);
          }
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
          reject(`请求产品出错, 状态码: ${XMLHttpRequest.status}. 原因: ${errorThrown}`);
        }
      });

    })
  }
}

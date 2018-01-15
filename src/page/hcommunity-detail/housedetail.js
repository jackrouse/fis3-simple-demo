// $(function() {
//   // lookAndlook();
//   // lookandseeInfo();
//   // developInfo();
//   // developerOtherInfo();
//   $('.hs-share')
//     .eq(0)
//     .attr('data-url', document.URL)
// })
// // //看了又看
// // function lookAndlook(){
// //     var bid = $('#bid').val();
// //     var realUrl = "//"+window.location.hostname;
// //     $.ajax({
// //         url:"//"+window.location.hostname+"/portal/getScannedHouse2",
// //         type:'GET',
// //         async: false,
// //         data: {
// //             housebid: bid,
// //             realUrl: realUrl
// //         },
// //         success:function(data){
// //             $('#lookAndSee').html(data);
// //         }
// //     });
// // }
// // //加载猜你喜欢
// // function lookandseeInfo(){
// //     var propertyParentName = $('#propertyParentName').val();
// //     $.ajax({
// //         url:"//"+window.location.hostname+"/houseResource/getDataYouLike",
// //         type:'GET',
// //         async: false,
// //         data: {
// //             propertyParentName: propertyParentName,
// //         },
// //         success:function(data){
// //             $('#guessYouLike').html(data);
// //         }
// //     });
// // }
// //开发商信息
// // function developInfo(){
// //     $.ajax({
// //         url:"http://"+window.location.hostname+"/houseResource/getDeveloper",
// //         type:'GET',
// //         async: false,
// //         data: {
// //             bid: $('#bid').val(),
// //         },
// //         success:function(data){
// //             $('#developcompanymsg').html($(data).siblings().html());
// //         }
// //     });
// // }
// //开发商其它小区和热门房源
// // function developerOtherInfo(){
// //     $.ajax({
// //         url:"http://"+window.location.hostname+"/houseResource/getDeveloperOtherBuilding",
// //         type:'GET',
// //         async: false,
// //         data: {
// //             bid: $('#bid').val(),
// //         },
// //         success:function(data){
// //             $('#developcompanymsg').after(data);
// //         }
// //     });
// // }
// $('#detail_around_house li').click(function() {
//   $(this)
//     .addClass('on')
//     .siblings()
//     .removeClass('on')
//   if ($('#near_houses_div_id').hasClass('active')) {
//     $('#near_houses_div_id').removeClass('active')
//   } else {
//     $('#near_houses_div_id').addClass('active')
//   }
//   if ($('#sameprice_houses_div_id').hasClass('active')) {
//     $('#sameprice_houses_div_id').removeClass('active')
//   } else {
//     $('#sameprice_houses_div_id').addClass('active')
//   }
// })

// $('.houseResourcePic').click(function() {
//   var imgSrc = $(this)
//     .find('.img-lazy')
//     .attr('src')
//   var houseTypeId = $(this)
//     .find('.img-lazy')
//     .attr('data-imgTypeId')
//   var imgType = $(this)
//     .find('.img-lazy')
//     .attr('data-imgType')
//   $('#houseResourceBigPic')
//     .attr('src', imgSrc + '@430w_304h_1e_1c')
//     .attr('data-imgTypeId', houseTypeId)
//     .attr('data-imgType', imgType)
// })
// $('.houseDetailImgClick').click(function() {
//   var _this = $(this)
//   $(this)
//     .parent()
//     .addClass('cur')
//     .siblings()
//     .removeClass('cur')
//   var houseTypeId = _this.attr('data-houseTypeId')
//   var imgType = _this.attr('data-imgType')
//   updatePicData(houseTypeId, imgType)
// })
// var downPaymentRatio = parseFloat(0.3)
// $.getJSON(
//   '/resource/getdownpaymentratiobybid2',
//   { bid: $('#bid').val() },
//   function(result) {
//     if (result != null) {
//       downPaymentRatio = parseFloat(result.downPaymentRatio)
//       var totalPrice = $('.totalprice').val()
//       if (totalPrice != null && totalPrice != '' && totalPrice != undefined) {
//         var totalprice = parseFloat($('.totalprice').val())
//         // $.ajaxSettings.async = false;
//         // $.ajaxSettings.async = true;
//         var sf = totalprice * downPaymentRatio //首
//         var bj = totalprice * (1 - downPaymentRatio) //贷
//         var yll = parseFloat(0.0325) / 12 //月利率
//         var everymonthpay =
//           parseFloat(bj) *
//           parseFloat(yll) *
//           Math.pow(1 + parseFloat(yll), parseInt(360)) /
//           (Math.pow(1 + parseFloat(yll), parseInt(360)) - 1) *
//           10000
//         $('.firstPay').text(
//           '约' + sf.toFixed(2) + '万' + '月供约' + everymonthpay + '元'
//         )
//       }
//     }
//   }
// )
// $('.detail-bigimg').on('click', '#houseResourceBigPic', function() {
//   var houseTypeId = $(this).attr('data-imgTypeId')
//   var imgType = $(this).attr('data-imgType')
//   updatePicData(houseTypeId, imgType)
// })

// function updatePicData(houseTypeId, imgType) {
//   var liArr = $('.imgnav li')
//   for (var i = 0; i < liArr.length; i++) {
//     var imgTypeTemp = $(liArr[i])
//       .find('a')
//       .attr('data-imgType')
//     if (imgTypeTemp == imgType) {
//       $(liArr[i])
//         .addClass('cur')
//         .siblings()
//         .removeClass('cur')
//     }
//   }
//   $.ajax({
//     url: '//' + window.location.hostname + '/resource/houseTypeImg',
//     type: 'GET',
//     async: false,
//     data: {
//       houseTypeId: houseTypeId,
//       imgType: imgType
//     },
//     success: function(data) {
//       var imgBox = $('.swiper-wrapper')

//       var html = ''
//       for (var i = 0; i < data.length; i++) {
//         var imgName = ''
//         if (
//           data[i].imgName != null &&
//           data[i].imgName != '' &&
//           data[i].imgName != undefined
//         ) {
//           imgName = data[i].imgName
//         }
//         // if(i == 0) {
//         //     var tempHtml = '<div class="swiper-slide swiper-slide-visible swiper-slide-active">'  //swiper-slide
//         //         + '<img src="' + data[i].imgSrc + '" alt="">'
//         //         + '<div class="picinfo"><span>' + imgName + '</span>'
//         //         + '<a href="javascript:;" class="seedetail">查看详情</a>'
//         //         + '</div>'
//         //         + '<div class="swiper-lazy-preloader"></div>'
//         //         + '</div>';
//         // }else{
//         var tempHtml =
//           '<div class="swiper-slide">' + //swiper-slide
//           '<img src="' +
//           data[i].imgSrc +
//           '" alt="">' +
//           '<div class="picinfo"><span>' +
//           imgName +
//           '</span>' +
//           '<a href="javascript:;" class="seedetail">查看详情</a>' +
//           '</div>' +
//           '<div class="swiper-lazy-preloader"></div>' +
//           '</div>'
//         // }
//         html = html + tempHtml
//       }
//       imgBox.html(html)
//       // $('.pagination-total').html(data.length);

//       var imgList = $('.imglistbox')
//       var imgHtml = ''
//       for (var i = 0; i < data.length; i++) {
//         if (i == 0) {
//           var tempImgHtml =
//             '<li class="f-l cur"><img src="' + data[i].imgSrc + '"/></li>'
//         } else {
//           var tempImgHtml =
//             '<li class="f-l"><img src="' + data[i].imgSrc + '"/></li>'
//         }
//         imgHtml += tempImgHtml
//       }
//       imgList.html(imgHtml)
//       console.log(data.length)
//       console.log(imgSwiper)
//       // imgSwiper.update();

//       imgSwiper.reInit()
//       imgSwiper.swipeTo(0, 0, false)
//       $('.pagination-total').html(data.length)
//       $('.pagination-cur').html(1)
//       // imgSwiper.update();
//     }
//   })
// }

// /* ###############  秒杀，闪订，报名弹框及保存 ！  ############### */
// $(function() {
//   // 异步加载“周边楼盘”和“同价位楼盘”
//   $.ajax({
//     url: '/portal/loadNearHousesAndSamePriceHouses',
//     type: 'GET',
//     data: {
//       bid: $('#bid').val()
//     },
//     success: function(data) {
//       // 查询结果作为整体html字符串，拼接到dom中
//       $('#detail_around_other_pic').html($(data))
//       Echo.init({
//         offset: 500, //距离可视区
//         throttle: 50 //延迟时间
//       })
//     }
//   })

//   var BASE_URL = window.location.protocol + '//' + window.location.host + '/'

//   if (
//     typeof $('#serviceTypeDefault').val() != 'undefined' &&
//     !$('.reservation-room').hasClass('disabled')
//   ) {
//     showDialog($('#serviceTypeDefault').val())
//   }

//   //订房
//   $('.reservation-room').on('click', function() {
//     if ($(this).hasClass('disabled')) {
//       return
//     }
//     showDialog('df')
//   })

//   function showDialog(type) {
//     var gid
//     if ('df' == type) {
//       gid = $('#orderGid').val()
//     } else if ('ms' == type) {
//       gid = $('#miaoshaGid').val()
//     } else if ('sd' == type) {
//       gid = $('#shandingGid').val()
//     } else if ('freecall' == type) {
//       //gid = $('#shandingGid').val();
//       common_dialog.showDialog($('#freecall'))
//       return
//     } else {
//       return
//     }
//     $('#serviceType').val(type)
//     $('#dialoghiddenid').val(gid)
//     common_dialog.showDialog($('#shanding'))
//     if ($('#orginNum').val() != '') {
//       $('#loginRegist').hide()
//     } else {
//       $('#loginRegist').show()
//     }
//   }



//   // 在线咨询
//   $('body').on('click', '.teacherall', function() {
//     $('.allteacher')
//       .stop(true, true)
//       .fadeIn()
//   })

//   // “在线咨询” 楼盘置业顾问
//   $.ajax({
//     url: $('#proContextPath').val() + '/portal/getHouseAdvisors',
//     type: 'get',
//     data: {
//       housebid: $('#houseId').val()
//     },
//     datatype: 'json',
//     success: function(res) {
//       var advisorArray = res.advisorDatas
//       if (advisorArray != null && advisorArray.length > 0) {
//         var oneElmHtml = $('.advisorCls').prop('outerHTML')
//         var htmlStr = ''
//         var consultList = ''
//         for (var i = 0; i < advisorArray.length; i++) {
//           if (i < 6) {
//             // 最多展示六个！
//             var _thisElm = $(oneElmHtml)
//             _thisElm.show()
//             _thisElm.find('.advisor_name_cls').text(advisorArray[i].nickName)
//             if (advisorArray[i].headImg) {
//               _thisElm
//                 .find('.advisor_photo_cls')
//                 .attr('src', advisorArray[i].headImg.replace(/http:/, ''))
//             }
//             _thisElm
//               .find('.user_star_level')
//               .addClass('level' + Math.round(advisorArray[i].starLevel))
//             _thisElm.find('.infofoot').append(advisorArray[i].phone)
//             if (advisorArray[i].isWebim == '1') {
//               _thisElm.find('.commonadvisorclass').attr('onlineflag', 'online')
//               _thisElm
//                 .find('.commonadvisorclass')
//                 .attr('advisorUserId', advisorArray[i].userid)
//               _thisElm
//                 .find('.commonadvisorclass')
//                 .attr('advisorPhone', advisorArray[i].phone)
//               _thisElm
//                 .find('.commonadvisorclass')
//                 .attr('advisorStatus', advisorArray[i].onlineStatus)
//               if (advisorArray[i].onlineStatus != '1') {
//                 _thisElm.find('.commonadvisorclass').addClass('askoffline')
//               }
//               _thisElm
//                 .find('.commonadvisorclass')
//                 .attr('qqNumber', advisorArray[i].qq)
//               _thisElm
//                 .find('.commonadvisorclass')
//                 .attr('advisorNickName', advisorArray[i].nickName)
//               _thisElm
//                 .find('.commonadvisorclass')
//                 .attr('isWebIm', advisorArray[i].isWebim)
//               if (
//                 '' == advisorArray[i].headImg ||
//                 null == advisorArray[i].headImg
//               ) {
//                 _thisElm
//                   .find('.commonadvisorclass')
//                   .attr('advisorImg', advisorArray[i].headImg)
//               } else {
//                 _thisElm
//                   .find('.commonadvisorclass')
//                   .attr(
//                     'advisorImg',
//                     advisorArray[i].headImg.replace(/http:/, '')
//                   )
//               }
//               _thisElm
//                 .find('.commonadvisorclass')
//                 .attr('buildId', $('#houseId').val())
//               _thisElm
//                 .find('.commonadvisorclass')
//                 .attr('residentialName', $('#residentialName').val())
//             } else {
//               _thisElm
//                 .find('.commonadvisorclass')
//                 .attr('isWebIm', advisorArray[i].isWebim)
//               _thisElm
//                 .find('.commonadvisorclass')
//                 .attr('qqNumber', advisorArray[i].qq)
//               _thisElm.find('.commonadvisorclass').attr('onlineflag', 'qq')
//               _thisElm.find('.commonadvisorclass').text('QQ咨询')
//             }
//             htmlStr += _thisElm.prop('outerHTML')
//           }
//           consultList += '<li class="consult-item cf"><div class="f-l">'
//           if (
//             null != advisorArray[i].headImg &&
//             '' != advisorArray[i].headImg
//           ) {
//             consultList +=
//               '<img class="consult-photo"  src="' +
//               advisorArray[i].headImg.replace(/http:/, '') +
//               '">'
//           } else {
//             consultList +=
//               '<img class="consult-photo"  src="//static.fdc.com.cn/usercenter/img/default-user.png">'
//           }
//           consultList +=
//             '</div><div class="f-l consult-right"><div class="consult-name"><span class="name">' +
//             advisorArray[i].nickName +
//             '</span>'
//           if (advisorArray[i].isWebim == '1') {
//             consultList += '<a href="javascript:void(0);" class="askinline '
//             if (advisorArray[i].onlineStatus != '1') {
//               consultList += 'askoffline'
//             }
//             var headImg = advisorArray[i].headImg
//             if (
//               null != advisorArray[i].headImg &&
//               '' != advisorArray[i].headImg
//             ) {
//               headImg = advisorArray[i].headImg.replace(/http:/, '')
//             }
//             consultList +=
//               ' commonadvisorclass" id="online"' +
//               'onlineflag="online" advisorUserId="' +
//               advisorArray[i].userid +
//               '" advisorPhone="' +
//               advisorArray[i].phone +
//               '" advisorStatus="' +
//               advisorArray[i].onlineStatus +
//               '" qqNumber="' +
//               advisorArray[i].qq +
//               '" advisorNickName="' +
//               advisorArray[i].nickName +
//               '" isWebIm="' +
//               advisorArray[i].isWebim +
//               '" advisorImg="' +
//               headImg +
//               '" buildId="' +
//               $('#houseId').val() +
//               '" residentialName="' +
//               $('#residentialName').val() +
//               '">在线咨询</a>'
//           } else {
//             consultList +=
//               '<a href="javascript:void(0);" isWebIm="' +
//               advisorArray[i].isWebim +
//               '" qqNumber="' +
//               advisorArray[i].qq +
//               '" class="askinline commonadvisorclass"' +
//               ' id="online" onlineflag="qq">QQ咨询</a>'
//           }
//           consultList +=
//             '</div><div class="level user_star_level level' +
//             Math.round(advisorArray[i].starLevel) +
//             '"><em></em></div>' +
//             '<div class="consult-tel"><em></em>400-027-1717<span>转</span>' +
//             advisorArray[i].phone +
//             '</div></div></li>'
//         }
//         $('.consultonline-box').html(consultList)
//         $('.advisorListCls').append(htmlStr)
//       } else {
//         $('.advisorListCls')
//           .prev()
//           .hide()
//         $('.advisorListCls')
//           .next()
//           .hide()
//         $('.advisorListCls').hide()
//       }
//     },
//     error: function() {
//       $('.advisorListCls')
//         .prev()
//         .hide()
//       $('.advisorListCls')
//         .next()
//         .hide()
//       $('.advisorListCls').hide()
//     }
//   })

//   //关注
//   $('.collect-sign').click(function() {
//     if ($(this).hasClass('uc-attention-check')) {
//       return
//     }
//     var houseResourceId = $('#attentionId').val()
//     $.ajax({
//       type: 'GET',
//       url: BASE_URL + 'collectHouse?houseResourceId=' + houseResourceId,
//       success: function(data) {
//         $('#collectionCount').val = $('#collectionCount').val() + 1
//         $('.collect-num').html(
//           '已有' + (Number($('#collectionCount').val()) + 1) + '人收藏'
//         )
//       },
//       error: function() {
//         $('.collect-num').html(
//           '已有' + (Number($('#collectionCount').val()) + 1) + '人收藏'
//         )
//         console.log('连接原因，关注失败')
//       }
//     })
//   })
// })
// $('body').on('click', '.lc-seemore', function() {
//   common_dialog.showDialog($('#consultonline'))
// })
// $('body').on('click', '.commonadvisorclass', function() {
//   common_dialog.closeDialog($(this))
// })
// $('li.hi-item.active').click()

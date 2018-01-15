var htmlmb = $('#infowinmb').html(),
  htmlmb2 = $('#infowinmb2').html()
fBMap.config.infoBoxmb = htmlmb
fBMap.config.infoBoxmb2 = htmlmb2
// fBMap.init({ data: $('.aroundHouseData').val() })



$.ajax({
  url: "https://xcjyc.wh.fdc.com.cn/homeportalweb/portal/getAroundMap",
  type:'GET',
  data: {
      bid: $('#houseId').val()
  },
  success:function(res){
      // 查询结果作为整体html字符串，拼接到dom中
      var aroundHouse = res.aroundHouse;
      // console.log(aroundHouse)
      // $('#aroundHouseData').val(aroundHouse);
      $('#aroundHouseData').val(aroundHouse);
      fBMap.init({data:aroundHouse});
  }
});

// 点击放大地图
var $arroundContent = $('#arroundContent')
var $arroundContentR = $('.arround__content-r')
var $arroundListNav = $('.arround__list-nav')
var $arroundScroll = $('.arround__scroll')
var scrollTop
$('.arround__nav-icon--screen').click(function() {
  var screenW = $(window).width()
  var screenH = $(window).height()
  var posH = screenH - $arroundListNav.height()

  if ($(this).text() == '取消全屏') {
    $arroundContent
      .removeClass('arround__wrapper--fixed')
      .addClass('container-main')
      .css({
        height: 445
      })
    $('#bmap').css({
      width: 754,
      height: 435
    })
    $arroundScroll.css({
      height: 401
    })
    $('#resplane').css({
      height: 401
    })
    $(this).text('全屏')
    // $('body').removeClass('scrollFixed')
    $(window).scrollTop(scrollTop)
  } else {
    $arroundContent
      .addClass('arround__wrapper--fixed')
      .removeClass('container-main')
      .css({
        height: posH
      })
    scrollTop = $(window).scrollTop()
    $('#bmap').css({
      width: screenW - $arroundContentR.width(),
      height: posH
    })
    $arroundScroll.css({
      height: posH
    })
    $('#resplane').css({
      height: posH
    })
    // $('body').addClass('scrollFixed')
    $(this).text('取消全屏')
  }
  // $('#resplane')
  //   .data('yw.easybar')
  //   .update()
})

// 鼠标测距
$('.arround__nav-icon--distance').click(function() {
  // fBMap.init()
  var myDis = fBMap.disTool()
  myDis.open()
})

// 搜索区域 点击label
$('.arround__nav').on('click', 'li', function() {
  $('.arround__nav-item').removeClass('arround__nav-item--active')
  $(this).addClass('arround__nav-item--active')
})

// 点击 公交 和驾车

// $('.arround__nav-icon--bus,.arround__nav-icon--car').click(function() {
//   console.log(11)
// })

// 周边配套和周边街景事件点击
$('#arroundContent').on('click', '.mapItem', function() {
  var index = $(this).index()
  if (index == 1) {
    $(this).css({
      color: '#367dff'
    })
    $('.arroudLabel').hide()
    $('.arround__content').hide()
    var setX = $('#bmap').attr('data-lng')
    var setY = $('#bmap').attr('data-lat')
    //console.log(setX);
    //console.log(setY);
    setPos(setX, setY)
    //根据经纬度坐标展示全景图
    function setPos(x, y) {
      
      var panorama = new BMap.Panorama('panorama')
      panorama.setPov({ heading: -40, pitch: 6 })
      panorama.setPosition(new BMap.Point(x , y ))
    }
  }
  if (index == 0) {
    $('.mapItem').eq(1).css({
      color: '#191919'
    })
    $('.arroudLabel').show()
    $('.arround__content').hide()
  }
  $('.arround__content')
    .eq(index)
    .show()
})

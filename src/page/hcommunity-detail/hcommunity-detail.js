// __inline('./compoinents/')
var curpage = 1
var viewModel = {
  houseTypeData: ko.observableArray([]), // 户型图数据
  houseTypeDataDetail: ko.observableArray([]),
  replyList: ko.observableArray([]), //回复内容
  houseListData: ko.observableArray([]), //周边楼盘
  samePriceHouse: ko.observableArray([]), // 同价位楼盘
  lookedHouseData: ko.observableArray([]), //看了又看楼盘数据
  isExit: ko.observable(false)
}
ko.applyBindings(viewModel)

$(function() {
  __inline('./components/maparound/maparound.js')
  __inline('/src/js/hcommunityDialog.js')
  var hcomunity = {
    init: function() {
      this.controlBannerScroll()
      this.operateSandPicLabel()
      this.setNavFloat()
      this.getSandPicScroll()

      this.changeTypeTab()
      this.getSelected()
      this.openOrderDialog()
      this.getCommentsReply()
      this.makePraise()
      this.getHouseTypeLoadMore()
      this.makeComments()
      this.getHouseTypeList()
      // this.likeHouseScroll()
      this.getHouseListData()
      this.changeNearAndPrceTab()
      this.getLookedHouseData()
      this.checkLoginForTxtarea()
      this.getScrollAreaHeight()
    },
    // 头部下方图片滑动
    controlBannerScroll: function() {
      var $imgsWrap = $('.content__pic-small')
      var $lis = $imgsWrap.find('.content__pic-item')
      var imgW = $lis.eq(0).outerWidth()
      var dis = imgW + 5
      var $bigImg = $('.content__pic-big').find('img')
      $imgsWrap.css({
        width: imgW * ($lis.size() + 1)
      })
      $('.content__pic-arrow--right').click(function() {
        var left = parseInt($imgsWrap.css('left'))
        if (
          left <
          -($imgsWrap.width() - $('.content__pic-small--wrap').width() - imgW)
        )
          return
        $imgsWrap.animate({
          left: '-=' + dis
        })
      })
      $('.content__pic-arrow--left').click(function() {
        var flag = false

        var left = parseInt($imgsWrap.css('left'))
        if (left > -imgW) return
        $imgsWrap.animate({
          left: '+=' + dis
        })
      })
      $lis.click(function() {
        var imgSrc = $(this)
          .find('img')
          .attr('src')
        $bigImg.attr('src', imgSrc)
      })
    },
    // 沙盘图右侧nav 移动
    operateSandPicLabel: function() {
      var $liWraps = $('.sand__floor-item--wrap')
      var $lis = $liWraps.find('.sand__floor-item')
      var liW = $lis.eq(0).outerWidth()
      $liWraps.css({
        width: liW * $lis.size() + 44
      })
      $('.sand__floor-arrow--right').click(function() {
        var left = parseInt($liWraps.css('left'))

        if (
          left < -($liWraps.width() - $('.sand__floor-wrapper').width() - liW)
        )
          return
        $liWraps.animate({
          left: '-=' + liW
        })
      })
      $('.sand__floor-arrow--left').click(function() {
        var left = parseInt($liWraps.css('left'))
        if (left > -liW) return
        $liWraps.animate({
          left: '+=' + liW
        })
      })
      $lis.click(function() {
        $lis.removeClass('sand__floor-item--active')
        $(this).addClass('sand__floor-item--active')
      })
    },
    // 头部导航悬浮
    setNavFloat: function() {
      var $navFloat = $('#navFloat')
      var top = $navFloat.offset().top
      $(window).on('scroll', function() {
        if ($(this).scrollTop() >= top) {
          $navFloat
            .removeClass('header__wrapper--default')
            .addClass('header__wrapper--float')
        } else {
          $navFloat
            .addClass('header__wrapper--default')
            .removeClass('header__wrapper--float')
        }
      })
    },
    getScrollAreaHeight:function(){
      var height = $('.baseContent__l').outerHeight();
      $('.baseContent__r,.active__wrapper').height(height-10)
    },
    getSandPicScroll: function() {
      var _move = false
      var _y
      //图片的高度
      var imgh
      var count = 0
      var boxHeight = $('.sandMap__wrapper').height()
      var imgmove = function() {
        $('.HouseMarked-box')
          .mousedown(function(e) {
            _move = true
            _y = e.pageY - parseInt($(this).css('top'))
            // console.log(_y)
          })
          .mouseup(function() {
            _move = false
          })
        $('.HouseMarked-box')
          .mousemove(function(e) {
            if (_move) {
              var y = e.pageY - _y
              if (y >= 0) {
                y = 0
              } else if (y <= boxHeight - imgh) {
                y = boxHeight - imgh
              }
              $('.HouseMarked-box').css('top', y)
            }
          })
          .mouseleave(function() {
            _move = false
          })
      }
      //图片加载完成时获取图片高度
      var getimgheight = setInterval(function() {
        imgh = $('.HouseMarked-box img').height()
        if (imgh > 0) {
          clearInterval(getimgheight)
          $('.sandMap__mask').height(imgh)
          imgmove()
        }
      }, 300)
    },
    getSelected: function() {
      $('.select__options-wrap').on('click', 'li', function() {
        $(this)
          .parents()
          .siblings('.select__chose')
          .text($(this).text())
      })
    },
    openOrderDialog: function() {
      $('.aside__btn-order').click(function() {
        tool.initImgCode($('#shanding .img-check'))
        common_dialog.showDialog($('#shanding'))
      })
    },
    // 获取当前评论的回复内容
   // 获取当前评论的回复内容
   getCommentsReply: function() {
    $('.reviewList__content-footer').on(
      'click',
      '.reviewList__rewNum',
      function() {
        var $reviewWrap = $(this).parents('.reviewList__item').find('.reviewList__detail')
          
        var $numWrap = $(this).find('.reviewList__content-count')

        var cid = $(this).data('cid')
          var $txtarea = $reviewWrap.find('.reviewList__input')
          $txtarea.attr('placeholder','回复'+$(this).data('commentuser'))
         
          $('.reviewList__rewNum').each(function(){
            var num = $(this).data('num');
            $(this).find('.reviewList__content-count').text(num)

          })

          
          if($reviewWrap.css('display') == 'none'){
            $('.reviewList__detail').hide()
            
            $reviewWrap.show()
            
            $numWrap.text('收起评论')
          }else{
            $('.reviewList__detail').hide()
            $numWrap.text($(this).data('num'))
          }
          // if($numWrap.text() == '收起评论'){
            
          //   viewModel.replyList([])
          //   $numWrap.text($(this).data('num'))
          //   $reviewWrap.hide()
          // }else{
          //   $numWrap.text('收起评论')

          // }
         
        
          // if( $reviewWrap[0].style.display == 'block'){

          //     // var num = Number($reviewWrap.find('.reviewList__listNum').find('span').text())

          //     // $reviewWrap.hide()
          //     // $numWrap.text(num)

          // }else{

          //     ajaxMethods.getReplyList(cid, function(data) {
          //         console.log(data)
          //         if (data && data.datalist.length) {
          //             viewModel.replyList(data.datalist)


          //         }
          //     })
          //     // $reviewWrap.show()

          //     $numWrap.text('收起评论')

          // }
      }
    )
  },

    // 发表评论
    makeComments: function() {
      var toUserId
      var replyType = 1
      $('body').on('click', '.makeComents', function() {
        var userId = configTool.getLoginUid()
        if (typeof userId == 'undefined') {
          //未登录
          dialoglogin.creatlogin()
          return
        }
        var $wrap = $(this).parents('.reviewList__item')
        var $txtarea = $wrap.find('.reviewList__input')

        var cid = $wrap.find('.reviewList__rewNum').data('cid') // 当前帖子id
        var content = $txtarea.val() // 评论内容
        var params = {
          cid: cid,
          content: content,
          userid:
            uc_cookie.Get('uc_userInfo') || '979A8DECBE423DA54F90CB8029DEF0CF',
          replyType: replyType,
          toUserId: toUserId
        }
        ajaxMethods.reply(params, function(data) {
          if (data && data.success) {
            ajaxMethods.getReplyList(cid, function(list) {
              if (list && list.datalist.length) {
                viewModel.replyList(list.datalist)
                $txtarea.val('')
              }
            })
          }
          if (data && data.msg) {
            dialog.showMsg('error', data.msg)
          }
        })
        console.log(params)
      })

      $('body').on('click', '.reviewList__reply', function() {
        var $wrap = $(this).parents('.reviewList__review-item')

        toUserId = $(this).attr('toUserId')
        // toUserId = $(this).attr('thisrpluserid')
        $(this)
          .parents('.reviewList__item')
          .find('.reviewList__input')
          .attr(
            'placeholder',
            '回复' +
              $wrap
                .find('.reviewList__review-name')
                .eq(0)
                .text()
          )

        if (toUserId) {
          replyType = 2
        }
      })
    },
    // 点赞操作
    makePraise: function() {
      var userId = configTool.getLoginUid()
      var params = {
        userid:'',
        cid:'',
        updateCount:'',
        pinyin:$('#pinyin').val(),
        toUserid:'',
        bid:''
      }
      $('.reviewList__content-footer').on(
        'click',
        '.reviewList__prasize',
        function() {
          if (typeof userId == 'undefined') {
            //未登录
            dialoglogin.creatlogin()
            return
          } else {
            var $prise = $(this).find('i')
            var $numWrap = $(this).find('span')
            var num = $numWrap.text()
            if ($prise.hasClass('reviewList__content-attention--active')) {
              // 取消点赞
              params.updateCount = 0
              num--
              $prise.removeClass('reviewList__content-attention--active')
            } else {
              // 点赞
              params.updateCount = 1
              $prise.addClass('reviewList__content-attention--active')
              num++
            }

            $numWrap.text(num)
          }
        }
      )
    },
    // 评论框聚焦验证登陆
    checkLoginForTxtarea:function(){
      $('.reviewList__input').focus(function(){
        var userId = configTool.getLoginUid()
        if (typeof userId == 'undefined') {
          //未登录
          dialoglogin.creatlogin()
          return
        }
      })
    },
    // 户型图查看更多
    getHouseTypeLoadMore: function() {
      // $('houseTypeContent.listType__loadMore span').click(function() {
      //   // ajaxMethods.getTypeList(viewModel.houseTypeData)

      // })
      $('#houseTypeContent').on(
        'click',
        '.listType__loadMore span',
        function() {
          // $('#houseTypeContent').find('')
          var $tabNav = $('#houseTypeContent').find('.list__nav-item--active')
          var $typeNav = $('#houseTypeContent').find(
            '.listType__nav-item--active'
          )
          if ($tabNav.index() == 0) {
            var roomId = $typeNav.data('roomId')
            if (roomId == 'all') {
              ajaxMethods.getTypeListMore(viewModel.houseTypeData, roomId)
            } else {
              ajaxMethods.getTypeListMore(viewModel.houseTypeDataDetail, roomId)
            }
          } else {
          }
        }
      )

      // function loadMore() {}
    },
    // 户型图一室二室三室点击
    getHouseTypeList: function() {
      $('#houseTypeContent').on('click', '.listType__nav-item', function() {
        $('#houseTypeContent .listType__nav-item').removeClass(
          'listType__nav-item--active'
        )
        curpage = 1
        $(this).addClass('listType__nav-item--active')
        var roomId = $(this).data('roomId')
        if (roomId == 'all') {
          $('#roomType').hide()
          $('#listType__listWrap').show()
          $('#netHouse__wrapper').hide()
          return
        }

        // var page = 1;
        $('#roomType').show()
        $('#listType__listWrap').hide()
        $('#netHouse__wrapper').hide()
        ajaxMethods.getTypeList(roomId)
      })
    },
    // 户型图tab切换
    changeTypeTab: function() {
      $('#houseTypeContent').on('click', '.list__nav-item', function() {
        $(this)
          .addClass('list__nav-item--active')
          .siblings('.list__nav-item')
          .removeClass('list__nav-item--active')
        var $listTypeNav = $('#houseTypeContent').find('.listType__nav')
        var index = $(this).index()
        if (index == 0) {
          $('#listType__listWrap').show()
          $('#roomType').hide()
          $('#netHouse__wrapper').hide()
          $listTypeNav.show()
          $('.netHouse__more').hide()
        }
        if (index == 1) {
          $('#roomType').hide()
          $('#listType__listWrap').hide()
          $('#netHouse__wrapper').show()
          $listTypeNav.hide()
          $('.netHouse__more').show()
          // $listTypeNav.find('span').removeClass('listType__nav-item--active')
        }
        $listTypeNav.find('span').removeClass('listType__nav-item--active')
        $listTypeNav
          .find('span')
          .eq(0)
          .addClass('listType__nav-item--active')
      })
    },
    // 周边楼盘和同价位楼盘tab切换
    changeNearAndPrceTab: function() {
      $('#nearAndPriceHouse').on('click', '.relate__header-item', function() {
        $('#nearAndPriceHouse .relate__header-item').removeClass(
          'relate__header-item--active'
        )
        $(this).addClass('relate__header-item--active')
        var index = $(this).index()
        $('#nearAndPriceHouse')
          .find('.relate__list')
          .hide()
          .eq(index)
          .show()
      })
    },
    // 获取周边楼盘和同价位楼盘
    getHouseListData: function() {
      ajaxMethods.fetchHouseList(function(data) {
        if(data.residentialNearList){
          viewModel.houseListData(data.residentialNearList)
        }
        if (data.residentialSamePriceList) {
          viewModel.samePriceHouse(data.residentialSamePriceList)
        }
        $(".superslide-box2").slide({
            mainCell:".superslide-list2",
            trigger:"click",
            prevCell:".navPrev",
            nextCell:".navNext",
            effect:"left",
            vis:5,
            scroll:1,
            delayTime:0,
            autoPage:true,
            pnLoop:false
          })
      })
    },
    // 获取 看了还看过楼盘数据
    getLookedHouseData: function() {
      ajaxMethods.fetchLookedHouseList(function(data) {
        console.log(data, '看了又看')
        viewModel.lookedHouseData(data.data)
        $(".superslide-box1").slide({
            mainCell:".superslide-list1",
            trigger:"click",
            prevCell:".navPrev",
            nextCell:".navNext",
            effect:"left",
            vis:5,
            scroll:1,
            delayTime:0,
            autoPage:true,
            pnLoop:false
          })
      })
    }
  }
  hcomunity.init()
})

var ajaxMethods = {
  // 获取评论列表
  getReplyList: function(cid, callback) {
    // 拼接HTML
    $.ajax({
      type: 'GET',
      url:
        'http://lgyjc.wh.portaldev.fdc.com.cn/comment/getReplyJson?curpage' +
        1 +
        '&cid=' +
        cid +
        '&pagesize=4',

      success: function(data) {
        if (data) {
          callback(data)
        } else {
        }
      },
      error: function() {}
    })
  },
  // 评论
  reply: function(params, callback) {
    $.ajax({
      type: 'GET',
      data: params,
      url:
        'http://lgyjc.wh.portaldev.fdc.com.cn/homeportalweb/comment/replyCritique',
      success: function(data) {
        if (data) {
          callback(data)
        } else {
        }
      },
      error: function() {}
    })
  },
  // 点击tab获取户型图列表
  getTypeList: function(roomId) {
    viewModel.isExit(false)
    $.ajax({
      type: 'GET',
      url:
        '//192.168.1.154:8081/homeportalweb/portal/getHouseTypeDataByRoom?curryPage=' +
          1 +
          '&bid=' +
          $('#bid').val() +
          '&pageSize=4&stageId=' +
          $('#stageId').val() +
          '&roomId=' +
          roomId || '',
      success: function(data) {
        // 插入数据到页面，放到最后面
        if (data) {
          if (data.length) {
            viewModel.isExit(true)
          } else {
            $('.listType__noneData').show()
          }
          viewModel.houseTypeDataDetail(data)
          // for (var i = 0; i < data.data.length; i++) {
          //   dataArr.push(data.data[i])
          //   console.log(data)
          // }
        } else {
        }
      },
      error: function() {}
    })
  },
  // 获取户型图加载更多数据
  getTypeListMore: function(dataArr, roomId) {
    curpage++
    $.ajax({
      type: 'GET',
      url:
        '//192.168.1.154:8081/homeportalweb/portal/getOtherHouseTypeData?curryPage=' +
          curpage +
          '&bid=' +
          $('#bid').val() +
          '&pageSize=4&stageId=' +
          $('#stageId').val() +
          '&roomId=' +
          roomId || '',
      success: function(data) {
        // 插入数据到页面，放到最后面
        if (data) {
          // viewModel.houseTypeDataDetail(data)
          for (var i = 0; i < data.length; i++) {
            dataArr.push(data[i])
            console.log(data)
          }
        } else {
        }
      },
      error: function() {}
    })
  },
  // 获取周边楼盘和同价位楼盘
  fetchHouseList: function(callback) {
    $.ajax({
      type: 'GET',
      url:
        '//192.168.1.154:8081/homeportalweb/portal/loadNearHousesAndSamePriceHouses?bid=' +
        $('#bid').val(),
      success: function(data) {
        if (data) {
          callback && callback(data)
          console.log(data)
        }
      },
      error: function() {}
    })
  },
  // 获取看过此楼盘还看过的数据
  fetchLookedHouseList: function(callback) {
    $.ajax({
      type: 'GET',
      url:
        '//192.168.1.154:8081/homeportalweb/portal/getScannedHouse2?housebid=' +
        $('#bid').val() +
        '&realUrl=http://' +
        window.location.hostname +
        '/',
      success: function(data) {
        // 插入数据到页面，放到最后面
        if (data) {
          // viewModel.houseTypeDataDetail(data)
          callback && callback(data)
        } else {
        }
      },
      error: function() {}
    })
  },
  // 点赞
  getPrasized: function(params, callback) {
    $.ajax({
      type: 'GET',
      url: 'https://gxwhc.wh.fdc.com.cn/homeportalweb/comment/addCommentsLike',
      success: function(data) {
        // 插入数据到页面，放到最后面
        if (data) {
          // viewModel.houseTypeDataDetail(data)
          callback && callback(data)
        }
      }
    })
  }
}

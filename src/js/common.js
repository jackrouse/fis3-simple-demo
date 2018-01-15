// __inline('./dialog.js')
__inline('../components/menu/menu.js')
__inline('../components/search/search.js')
__inline('../components/rank/rank.js')
__inline('../components/share/share.js')

/**
 * @description 通用方法
 * @author zhangchang
 * @date    2016-07-11
 * @依赖 jquery
 */

//扩展trim方法
String.prototype.trim = function() {
  return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
}
//计算字符串的长度
String.prototype.len = function() {
  return this.replace(/^[\u4e00-\u9fa5]+$/g, 'aa').length / 2
}
var uc_cookie = {
  //读取COOKIES,n为COOKIE名
  Get: function(n) {
    var re = new RegExp(n + '=([^;]*);?', 'gi')
    var r = re.exec(document.cookie) || []
    return r.length > 1 ? r[1] : null
  },
  Get1: function(n) {
    var re = new RegExp(n + '=([^;]*);?', 'gi')
    var r = re.exec(document.cookie) || []
    return unescape(r.length > 1 ? r[1] : null)
  },
  //写入COOKIES,n为Cookie名，v为value
  Set: function(n, v, e, p, d, s) {
    var t = new Date()
    p = p || '/'
    d = d || '.fdc.com.cn'
    // e = e || 30;
    if (e) {
      // 8.64e7 一天 3.6e6 一小时
      t.setTime(t.getTime() + e * 8.64e7)
    }
    document.cookie =
      n +
      '=' +
      v +
      '; ' +
      (!e ? '' : '; expires=' + t.toUTCString()) +
      (!p ? '' : '; path=' + p) +
      (!d ? '' : '; domain=' + d) +
      (!s ? '' : '; secure') // Set cookie
  },
  Set1: function(n, v, e, p, d, s) {
    var t = new Date()
    p = p || '/'
    d = d || '.fdc.com.cn'
    e = e || 12
    if (e) {
      // 8.64e7 一天 3.6e6 一小时
      t.setTime(t.getTime() + e * 2.592e9)
    }
    document.cookie =
      n +
      '=' +
      escape(v) +
      '; ' +
      (!e ? '' : '; expires=' + t.toUTCString()) +
      (!p ? '' : '; path=' + p) +
      (!d ? '' : '; domain=' + d) +
      (!s ? '' : '; secure') // Set cookie
  },
  Del: function(n, p, d) {
    var t = uc_cookie.Get(n)
    p = p || '/'
    d = d || '.fdc.com.cn'
    document.cookie =
      n +
      '=' +
      (!p ? '' : '; path=' + p) +
      (!d ? '' : '; domain=' + d) +
      '; expires=Thu, 01-Jan-70 00:00:01 GMT'
    return t
  }
}
var common_dialog = {
  /**
   * 信息提示,sDuration毫秒后消失
   * @param  {[string]} type [分三种信息提示,"error":表示错误信息;"success":表示成功信息;"info":表示提示信息]
   * @param  {[string]} msg  [信息的内容]
   * @param  {[int]} sDuration  [信息提示框的展示时间(单位毫秒),默认2000毫秒]
   */
  showMsg: function(type, msg, callback, sDuration) {
    if ($('.dialog-warp').length > 0) {
      $('.dialog-warp').remove()
    }
    var iconClass
    switch (type) {
      case 'error':
        iconClass = 'ico-error'
        break
      case 'success':
        iconClass = 'ico-success'
        break
      case 'info':
        iconClass = 'ico-info'
        break
      default:
        return
    }
    var sDuration = sDuration || 2000
    var d = $(
      '<div class="dialog-warp"><div class="dialog-body"><i class="info-ico ' +
        iconClass +
        '"></i><p class="info-msg">' +
        msg +
        '</p></div></div>'
    ).appendTo('body')
    setTimeout(function() {
      d.remove()
      if (callback) {
        callback()
      }
    }, sDuration)
  },
  /**
   * 模态确认提示框
   * @param  {[string]}   msg      [确认提示信息]
   * @param  {Function} callback [确认后的回调方法]
   * @param  {Function} callback2 [取消后的回调方法]
   */
  confirm: function(msg, callback, callback2) {
    var confirm_html = '<div class="confirm-warp">'
    confirm_html += '<div class="confirm-mask"></div>'
    confirm_html += '<div class="confirm-body">'
    confirm_html += '<div class="confirm-head">'
    confirm_html += '<span class="confirm-headtx">确认提示</span>'
    confirm_html += '<i class="confirm-cancel">×</i>'
    confirm_html += '</div>'
    confirm_html += '<div class="confirm-content">' + msg + '</div>'
    confirm_html += '<div class="confirm-footer">'
    confirm_html += '<button class="confirm-btn confirm-ok">确认</button>'
    confirm_html += '<button class="confirm-btn confirm-cancel">取消</button>'
    confirm_html += '</div>'
    confirm_html += '</div>'
    confirm_html += '</div>'
    var d = $(confirm_html).appendTo('body')
    $('.confirm-cancel').click(function(event) {
      /* Act on the event */
      d.remove()
      if (callback2) callback2()
    })
    $('.confirm-ok').click(function(event) {
      /* Act on the event */
      d.remove()
      if (callback) {
        callback()
      } else {
      }
    })
  },
  loading: {
    /**
     * 模拟加载中
     * @param  {[string]}   etag      [需要添加加载中的元素，为空就是body]
     * @param  {int} sDuration [提示时长，默认5s后自动消失]
     */
    show: function(etag, sDuration) {
      var _top, _style
      if (etag && etag.selector != 'body') {
        _top = $(etag).height() / 2 - 21
        _style = {
          'padding-top': _top + 'px',
          height: _top + 42 + 'px'
        }
      } else {
        etag = 'body'
        _top = document.documentElement.clientHeight / 2 - 21
        _style = {
          'padding-top': _top + 'px',
          position: 'fixed',
          width: '100%',
          height: '100%',
          left: '0',
          top: '0'
        }
      }
      var d = $(
        '<div class="loading-warp"><span class="loading-content"></span>加载中…</div>'
      )
      d.css(_style).appendTo(etag)
      setTimeout(function() {
        d.remove()
      }, sDuration || 5000)
    },
    /**
     * 模拟关闭加载中
     * @param  {[string]}   etag      [需要移除加载中的元素，为空就是body]
     */
    close: function(etag) {
      etag = etag || 'body'
      $(etag)
        .find('.loading-warp')
        .remove()
    }
  },
  /**
   * input错误提示,sDuration毫秒后消失
   * @param  {[elemelt]} ele dom对象
   * @param  {[string]} msg  [信息的内容]
   * @param  {[color]} bordercolor  [信息提示框的展示时间(单位毫秒),默认2000毫秒]
   */
  showAlert: function(ele, msg) {
    var ele = ele.parent()
    var html = ''
    html += '<div class="show-log">'
    html += '<div class="alertcontent">'
    html += '<div class="main-txt">'
    html += '<span class="icon"></span>'
    html += '<span>' + msg + '</span>'
    html += '<span class="closeicon"></span>'
    html += '</div>'
    html += '<div class="layer-arrow">'
    html += '<i class="s-line3"></i>'
    html += '<em class="s-bg2br"></em></div></div></div>'
    ele.find('.show-log').remove()
    ele.append(html)
    var _width = ele.find('.show-log').css('width')
    ele.find('.show-log').css('margin-left', -parseInt(_width) / 2)
    ele.find('.show-log .closeicon').click(function() {
      ele
        .find('.show-log')
        .fadeOut(200)
        .remove()
    })
    setTimeout(function() {
      ele
        .find('.show-log')
        .fadeOut(200)
        .remove()
    }, 3000)
  },
  /**
   * 报名弹窗弹出与关闭
   * @param  {[elemelt]} ele [dom对象]
   * @return {[type]}     [description]
   */
  showDialog: function(ele) {
    ele.show()
    var h = ele.find('.dialogbox').height()
    ele.find('.dialogbox').css('margin-top', -h / 2 + 'px')
    setTimeout(function() {
      ele.find('.dialogbox').addClass('open')
    }, 300)
  },
  closeDialog: function(ele) {
    var boxele = ele.closest('.dialogbox')
    boxele.removeClass('open')
    setTimeout(function() {
      boxele.parent().hide()
    }, 300)
  }
}

$('.dialogbox .close').click(function() {
  common_dialog.closeDialog($(this))
})

/**
 * 弹出层input校验
 */
var valid = {
  //校验一个 input
  //ele：input框
  check: function(ele) {
    var type, msg
    //判断输入框类别
    if (ele.hasClass('inputname')) {
      type = 1
      msg = '姓名'
    } else if (ele.hasClass('inputnum')) {
      type = 2
      msg = '人数'
    } else if (ele.hasClass('inputphone')) {
      type = 3
      msg = '手机号'
    } else if (ele.hasClass('inputcode')) {
      type = 4
      msg = '验证码'
    } else if (ele.hasClass('inputhouse')) {
      type = 5
      msg = '意向楼盘'
    } else if (ele.hasClass('inputtitle')) {
      type = 6
      msg = '标题'
    } else if (ele.hasClass('inputimgcode')) {
      type = 7
      msg = '图形验证码'
    } else {
      type = 0
      msg = '内容'
    }
    //判断输入框长度
    if (ele.val()) {
      var val = ele.val().trim()
    } else {
      var val = ''
    }
    if (val.length == 0) {
      common_dialog.showAlert(ele, msg + '不能为空')
      return false
    } else {
      //判断验证码长度
      if (type == 4 && val.length != 6) {
        common_dialog.showAlert(ele, '验证码长度不足6')
        return false
      } else if (type == 7 && val.length != 4) {
        common_dialog.showAlert(ele, '图形验证码长度不足4')
        return false
      } else if (type == 3) {
        //验证手机号
        return valid.validphone(ele)
        //验证人数是否为数字
      } else if (type == 2) {
        return valid.isPositiveNum(ele)
        //验证姓名是否为汉字和字母
      } else if (type == 1) {
        return valid.validname(ele)
      } else {
        return true
      }
    }
  },
  //多个校验
  //ele：包裹住要校验的所有input框的元素
  checkall: function(ele) {
    var flag = true
    ele.find('input').each(function(index, eleDom) {
      var that = $(this)
      //跳过隐藏input框
      if (
        that
          .closest('.inputitems')
          .find('input')
          .is(':visible') &&
        flag == true
      ) {
        flag = valid.check(that)
      }
    })
    return flag
  },
  //判断手机号
  validphone: function(ele) {
    var phoneRegex = /^1[3|4|5|7|8][0-9]{8}\d+$/
    var phone = ele.val().trim()
    if (phoneRegex.test(phone)) {
      return true
    } else {
      common_dialog.showAlert(ele, '请输入11位有效手机号码')
      return false
    }
  },
  //校验文本中是否存在电话广告
  checkPhoneAd: function(str) {
    //手机号的正则表达式
    // var regTelPhone = /^.*1(3|4|5|8)[0-9]\\d{8}.*$/g;
    // var regTelPhone = /^1[3|4|5|7|8][0-9]{8}\d+$/;
    var regTelPhone = /1[34578]\d{9}/
    //电话号码的正则表达式
    // var regPhone=/^.*(\\(\\d{3,4}\\)|\\d{3,4}-|\\s)?\\d{7,14}.*$/g;
    var regPhone = /\d{3}-\d{8}|\d{4}-\d{7}/
    //去除空格
    str = str.replace(/\s/g, '')
    //将中文数字转化为阿拉伯数字
    // 壹,贰,叁,肆,伍,陆,柒,捌,玖,拾,零
    str = str
      .replace(/\一/g, 1)
      .replace(/\壹/g, 1)
      .replace(/\二/g, 2)
      .replace(/\贰/g, 2)
      .replace(/\三/g, 3)
      .replace(/\叁/g, 3)
      .replace(/\四/g, 4)
      .replace(/\肆/g, 4)
      .replace(/\五/g, 5)
      .replace(/\伍/g, 5)
      .replace(/\六/g, 6)
      .replace(/\陆/g, 6)
      .replace(/\七/g, 7)
      .replace(/\柒/g, 7)
      .replace(/\八/g, 8)
      .replace(/\捌/g, 8)
      .replace(/\九/g, 9)
      .replace(/\玖/g, 9)
      .replace(/\十/g, 9)
      .replace(/\拾/g, 9)
      .replace(/\零/g, 0)
    var istelnum = regTelPhone.test(str),
      isphone = regPhone.test(str)
    return istelnum || isphone
  },
  //判断正整数
  isPositiveNum: function(ele) {
    var re = /^[0-9]*[1-9][0-9]*$/
    var num = ele.val().trim()
    if (re.test(num)) {
      return true
    } else {
      common_dialog.showAlert(ele, '请输入正整数')
      var val = ele.val() != null ? ele.val().replace(/\D/g, '') : null
      ele.val(val)
      return false
    }
  },
  checkPosNum: function(ele) {
    //var re = /^[0-9]*[1-9][0-9]*$/ ;
    var re = /^([1-9]+\d*)|0{1}$/
    var num = ele.val().trim()
    if (re.test(num)) {
      return true
    } else {
      common_dialog.showMsg('error', '请输入正整数')
      return false
    }
  },
  //判断姓名是否为汉字或字母
  validname: function(ele) {
    var re = /^[a-zA-Z\u4e00-\u9fa5]+$/g
    var name = ele.val().trim()
    if (re.test(name)) {
      return true
    } else {
      common_dialog.showAlert(ele, '请输入汉字或拼音')
      return false
    }
  }
}
/**
 * 弹出层点击事件通用方法
 * @return {[type]} [description]
 */
var dialogFunc = function() {
  //看房团弹出层高度居中
  // var initmiddle = function(ele){
  //   var h = ele.find(".dialogbox").height();
  //   ele.find(".dialogbox").css("margin-top",-h/2 + "px");
  // }
  //看房团弹出层弹出
  // $(".joinbtnbox .joinbtn").click(function(){
  //   $("#joinviewhouse").show();
  //   initmiddle($("#joinviewhouse"));
  // })
  //降价通知、为我鉴房提交弹出层弹出
  // $(".pricedown,.choosebtn").click(function(){
  //   $("#changeprice").show();
  //   initmiddle($("#changeprice"));
  // })
  //亿合团弹层
  // $(".actjoin").click(function(){
  //   $("#yihe").show();
  //   initmiddle($("#yihe"));
  // })
  //免费通话
  // $(".freecall").click(function(){
  //   $("#freecall").show();
  //   initmiddle($("#freecall"));
  // })
  //关闭弹出层
  // $("#joinviewhouse,#changeprice,#yihe,#freecall,#freecallsuccess").find(".close").click(function(){
  //   $(this).parent().parent().hide();
  // })
  //点击获取验证码倒计时
  // $('body').on('click', '.getcode', function() {
  //   var that = $(this)
  //   //定位手机号输入框

  //   var inputphone = that
  //     .closest('.dialogbox,.reg-formlist')
  //     .find('.inputphone')
  //   var inputimgDom = that
  //     .closest('.dialogbox,.reg-formlist')
  //     .find('.inputimgcode')
  //   var codeImgDom = that.closest('.dialogbox,.reg-formlist').find('.img-check')
  //   var phonevalue = inputphone.val()
  //   var codeId = codeImgDom.attr('codeid')
  //   var uid = codeImgDom.attr('uid')
  //   var code = inputimgDom.val()

  //   var inputphonecheck = valid.check(inputphone)
  //   var inputimgDomcheck = valid.check(inputimgDom)

  //   if (!that.hasClass('disabled') && inputphonecheck && inputimgDomcheck) {
  //     tool.sendCode(
  //       phonevalue,
  //       code,
  //       codeId,
  //       'picgif.secuity.inter.sms.send2',
  //       uid
  //     )
  //     if (tool.ImgcodeFlag) {
  //       var time = 60
  //       that.addClass('disabled')
  //       var count = function() {
  //         if (time == 0) {
  //           that.removeClass('disabled')
  //           that.html('发送验证码')
  //         } else {
  //           that.html('重新发送(<em>' + time + '</em>)')
  //           time--
  //           setTimeout(count, 1000)
  //         }
  //       }
  //       count()
  //     }
  //   }
  // })
  //弹出错误提示demo
  // $(".dialogbox input").focus(function(){
  //   var eleDom = $(this);
  //   dialog.showAlert(eleDom,"11111111111");
  // })
  // 校验demo
  $('.dialogbox input,.reg-formlist input').blur(function() {
    var that = $(this)
    valid.check(that)
  })
  $('.inputnum,.inputcode').keyup(function() {
    var that = $(this)
    valid.isPositiveNum(that)
  })
  // $(".joinin").click(function(){
  //   var that = $(this).closest(".dialogbox,.reg-formlist");
  // })
}

dialogFunc()

//滚动悬浮订阅通知
/**
 * 滚动悬浮订阅通知
 * @param  {[type]} eleDom [显示隐藏的临界结点]
 * @return {[type]}        [description]
 * zhangchang 2016.11.23
 */
var noticesuspend = function(eleDom) {
  var scroll_H = $(window).scrollTop()
  var floatH = eleDom.offset().top + eleDom.height()
  if (scroll_H > floatH) {
    $('.noticesuspend').slideDown()
  } else {
    $('.noticesuspend').slideUp()
  }
}
/**
 * 全局使用的一些通用方法
 * shunzizhan 20160113
 * @type {Object}
 */
var tool = {
  ImgcodeFlag: false,
  getImgcode: function(callback) {
    var userInfo = decodeURIComponent(uc_cookie.Get('uc_userInfo'))
    userInfo =
      userInfo != 'null'
        ? userInfo
        : '31876A45A48B440D2C166E2C479A68B5DE03975AE4CE842C189A37A25219A296'
    $.ajax({
      // url: '//test.uc.fdc.com.cn/router/rest',
      url: '//gw.fdc.com.cn/router/rest',
      type: 'GET',
      dataType: 'jsonp',
      jsonp: 'uccallback',
      data: {
        uid: userInfo,
        method: 'ucaction.create.identifycode'
      },
      success: function(res) {
        var data = res.create_identifycode_response.data
        if (data) {
          var imgurl = data.imgUrl
          var codeId = data.id
          callback&&callback(data,userInfo)
          // $('#subscribe .img-check').attr('src', imgurl)
          // $('#subscribe .img-check').attr('codeid', codeId)
          // $('#subscribe .img-check').attr('uid', userInfo)
          // $('#subscribe .img-check').attr('src', imgurl)
          // $('#subscribe .img-check').attr('codeid', codeId)
          // $('#subscribe .img-check').attr('uid', userInfo)
          // $('#yihe .img-check').attr('src', imgurl)
          // $('#yihe .img-check').attr('codeid', codeId)
          // $('#yihe .img-check').attr('uid', userInfo)
          // $('#freecall .img-check').attr('src', imgurl)
          // $('#freecall .img-check').attr('codeid', codeId)
          // $('#freecall .img-check').attr('uid', userInfo)
        }
      }
    })
  },
  initImgCode:function($ele){
    this.getImgcode(function(data,userInfo){
      $ele.attr('src', data.imgUrl)
      $ele.attr('codeid', data.id)
      $ele.attr('uid', userInfo)
    });
  },
  // //发送验证码
  // sendCode: function(phoneNum, code, codeid, method, uid) {
  //   var params = {
  //     phoneNum: phoneNum,
  //     codeid: codeid,
  //     code: code,
  //     method: method,
  //     uid: uid
  //   }
  //   $.ajax({
  //     url: '//' + window.location.hostname + '/sendSmsCodePortal',
  //     // url: "http://house.wh.portaltest.fdc.com.cn/sendSmsCodePortal",
  //     data: params,
  //     type: 'GET',
  //     success: function(data, textStatus, jqXHR) {
  //       if (data.smsCode) {
  //         common_dialog.showMsg(
  //           'success',
  //           '验证码已成功发送请注意查收!',
  //           function() {},
  //           1000
  //         )
  //         tool.ImgcodeFlag = true
  //       } else if (data.error) {
  //         common_dialog.showMsg('error', data.error)
  //         // tool.getImgcode();
  //       } else {
  //         common_dialog.showMsg('error', '发送验证码失败!')
  //         tool.getImgcode()
  //       }
  //     },
  //     error: function() {}
  //   })
  // },
  //发送验证码
  sendCode: function(phoneNum, code, codeid, method, uid, callback) {
    var params = {
      phoneNum: phoneNum,
      codeid: codeid,
      code: code,
      method: method,
      uid: uid
    }
    $.ajax({
      url: '//' + window.location.hostname + '/sendSmsCodePortal',
      // url: "http://house.wh.portaltest.fdc.com.cn/sendSmsCodePortal",
      data: params,
      type: 'GET',
      success: function(data, textStatus, jqXHR) {
        if (data.smsCode) {
          common_dialog.showMsg(
            'success',
            '验证码已成功发送请注意查收!',
            function() {},
            1000
          )
          tool.ImgcodeFlag = true
        } else if (data.error) {
          common_dialog.showMsg('error', data.error)
          if (data.error == '图片验证码已过期!') {
            tool.getImgcode()
          }
          tool.ImgcodeFlag = false
        } else {
          tool.ImgcodeFlag = false
          common_dialog.showMsg('error', '发送验证码失败!')
          tool.getImgcode()
        }
        if (callback) {
          callback()
        }
      },
      error: function() {}
    })
  },
  // baseUrl :" http://192.168.1.61:8888/ucaction",
  /**
   * 发送请求方法
   * @param  {[string]}   url      [接口地址]
   * @param  {[string]}   type     [请求的类型]
   * @param  {[object]}   data     [发送的数据]
   * @param  {Function} callback   [回调方法]
   */
  ajax: function(url, type, data, callback) {
    //    data = $.extend(data , {invaliddata:new Date().getTime()});
    var isasync = data.async || true
    delete data.async
    $.ajax({
      type: type || 'Get',
      url: url,
      data: data,
      dataType: 'json',
      async: isasync,
      // crossDomain:true,
      success: function(res) {
        //        if(res.status != 1){
        //          tool.showMsg("error", res.msg);
        //        }
        if (callback) {
          callback(res)
        }
      },
      error: function(res) {
        common_dialog.confirm(res.responseText)
      }
    })
  },
  //jsonp
  ajaxJsonp: function(method, type, params, callback) {
    params = $.extend(params, {
      method: method,
      v: '1.0.0',
      timestamp: tool.getFullDate(new Date().getTime())
    })
    var successResponse = tool.getSuccessMethod(method)
    if (params.requrl) {
      var url = params.requrl
      var jsonpcallback = params.jsonpcallback
      delete params.requrl
      delete params.jsonpcallback
    }
    $.ajax({
      async: false,
      type: type,
      url: url || tool.homeUrl,
      data: params,
      dataType: 'jsonp',
      jsonp: jsonpcallback || 'yfcallback',
      success: function(res) {
        if (callback) {
          callback(res, successResponse)
        }
      },
      error: function(res) {}
    })
  },
  /**
   * shunzizhan 20160215
   * @param  {[string]} method [接口名称 形式为a.b.c]
   * @return {[type]}        [description]
   */
  getSuccessMethod: function(method) {
    var str_tempmethod = method.substring(method.indexOf('.') + 1)
    str_tempmethod = str_tempmethod.replace(/\./g, '_')
    str_tempmethod += '_response'
    return str_tempmethod
  },
  /**
   * shunzizhan 20160215
   * 请求的通用方法
   * @param  {[string]}   method   [请求的接口名称]
   * @param  {[string]}   type     [请求的类型，默认为get]
   * @param  {[obj]}   params   [请求的参数]
   * @param  {Function} callback [回调函数]
   * @return {[type]}            [description]
   */
  ajax1: function(method, type, params, callback) {
    params = $.extend(params, {
      method: method,
      timestamp: tool.getFullDate(new Date().getTime())
    })
    params.v = params.v || 1000
    var successResponse = tool.getSuccessMethod(method)
    if (params.requrl) {
      var url = params.requrl
      delete params.requrl
    }
    $.ajax({
      type: type || 'Get',
      url: url,
      data: params,
      //crossDomain: true,
      dataType: 'json',
      success: function(res) {
        // if(callback && res[successResponse]){
        //   callback(res[successResponse]);
        // }else{
        //   tool.confirm("错误码：" + res.error_response.code+"<br/>"+ res.error_response.msg + res.error_response.sub_code);
        // }
        if (callback) {
          callback(res, successResponse)
        }
      },
      error: function(res) {}
    })
  },
  /**
   * 根据时间戳(秒)生成时间 1436412956699 -> 2015-07-09 12:00
   * @param  {[int]} d [时间戳]
   */
  getDate: function(d) {
    if (typeof d != 'number') {
      d = parseInt(d) * 1000
    }
    return d ? new Date(d).Format('yyyy-MM-dd hh:mm') : '0000-00-00 00:00'
  },
  getDate1: function(d) {
    if (typeof d != 'number') {
      d = parseInt(d) * 1000
    }
    return d ? new Date(d).Format('yyyy-MM-dd') : '0000-00-00'
  },
  getDate2: function(d) {
    if (typeof d != 'number') {
      d = parseInt(d) * 1000
    }
    return d ? new Date(d).Format('hh:mm') : '00:00'
  },
  /**
   * shunzizhan 20160122
   * 解析缓存，获取参数
   * @type {Object}
   */
  getParams: {
    /**
     * 获取数组
     * @param  {[str]} str 类似[a=123&b=456,a=789&b=956]
     * @return {[type]}    【[{a:123,b:456},{a:789,b:956}]]】
     */
    arr: function(str) {
      var mParams = str.split(',') || []
      var params = []
      for (var i = 0; i < mParams.length; i++) {
        params.push(tool.getParams.obj(mParams[i]))
      }
      return params
    }, //
    /**
     * 获取对象
     * @param  {[str]} str [a=123&b=456]
     * @return {[type]}     [{a:123,b:456}]
     */
    obj: function(str) {
      var myobj = {}
      var ss = str.split('&') || []
      for (var j = 0; j < ss.length; j++) {
        var tt = ss[j].split('=') || []
        if (tt.length >= 2) {
          myobj[tt[0]] = decodeURIComponent(tt[1])
        }
      }
      return myobj
    }
  },
  /**
   * 根据时间戳(秒)生成时间 1436412956699 -> 2015-07-09 12:00:00
   * @param  {[int]} d [时间戳]
   */
  getFullDate: function(d) {
    if (typeof d != 'number') {
      d = parseInt(d) * 1000
    }
    return d ? new Date(d).Format('yyyy-MM-dd hh:mm:ss') : '0000-00-00 00:00:00'
  },
  /**
   * 将数字转化成百分比 -> 2015-08-07 zhangchang
   * @param num 数字
   */
  toPercent: function(num) {
    return (Math.round(num * 10000) / 100).toFixed(2) + '%'
  },
  /**
   * 将整数价格格式化成999,999,999的格式
   * @param  {[int]} price [原始价格]
   * @return {[type]}       [格式化之后的价格]
   */
  formatPrice: function(price) {
    var newprice = price.toString().split('.')[0],
      newArray = newprice.split(''),
      remainder = newprice.length % 3,
      commaNum = 0
    if (newprice.length > 3) {
      for (var i = 0; i < newprice.length; i++) {
        if (i % 3 == remainder && i != 0) {
          newArray.splice(i + commaNum, 0, ',')
          commaNum++
        }
      }
      return newArray.join('')
    } else {
      return price
    }
  },
  /**
   * 阻止事件冒泡
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  cancelPropagation: function(event) {
    event = window.event || event
    if (document.all) {
      event.cancelBubble = true
    } else {
      event.stopPropagation()
    }
  },
  // 头部滚动
  tagRoll: function() {
    var speed = 2000, //数字越大速度越慢
      box = $('#keywordsList'),
      ulobj = $('.keywords-list'),
      tabH = parseInt(box.height()),
      ulH = parseInt(ulobj.height()),
      time = 1,
      clonelist = $('.clonelist')
    clonelist.html(ulobj.html())
    function Marquee() {
      var topV = parseInt(ulobj.css('marginTop'))
      if (-topV == ulH) {
        ulobj.css({ marginTop: '0' })
        clonelist.animate({ marginTop: -tabH })
        clonelist.hide()
        ulobj.animate({ marginTop: -tabH })
        time = 1
      } else {
        var value = time * tabH
        ulobj.animate({ marginTop: -value + 'px' })
        time++
        clonelist.show()
        clonelist.css({ marginTop: '0' })
      }
    }
    if (ulH > tabH) {
      var MyMar = setInterval(Marquee, speed)
      $('#keywordsList').mouseover(function() {
        clearInterval(MyMar)
      }) //鼠标移上时清除定时器达到滚动停止的目的
      $('#keywordsList').mouseout(function() {
        MyMar = setInterval(Marquee, speed)
      }) //鼠标移开时重设定时器
    }
  },
  getLocaleTime: function(nS) {
    var time = new Date(nS)
    var h = time.getHours()
    var mm = time.getMinutes()
    var s = time.getSeconds()
    return h + ':' + mm + ':' + s
  },
  getLocaleDate: function(nS) {
    var time = new Date(nS)
    var y = time.getFullYear()
    var m = time.getMonth() + 1
    var d = time.getDate()
    return y + '-' + m + '-' + d
  },
  checkIsLogin: function(gotologin, callback) {
    var curUrl = window.location.href,
      id_app = curUrl.split('/id')[1] ? 'id' + curUrl.split('/id')[1] : '',
      token = uc_cookie.Get('uc_token')
        ? decodeURIComponent(uc_cookie.Get('uc_token'))
        : id_app,
      name = $('#pinyin').val()
    if (token !== 'null' && token !== '') {
      //是否执行回调函数
      if (callback) {
        callback()
      } else {
        return true
      }
    } else {
      //是否跳转登录
      if (gotologin) {
        uc_cookie.Set('ucm_curUrl', curUrl, null, null, null, null)
        common.applyErrorDialog('请先登录！')
        setTimeout(function() {
          window.location.href = uc_login
        }, 2000)
      } else {
        return false
      }
    }
  }
}

/**
 * n cookie名称
 * v 值
 * e 失效时间
 * p 路径
 * d 域名
 * s 大小
 * @type {Object}
 */
var cookie = {
  //读取COOKIES,n为COOKIE名
  Get: function(n) {
    var re = new RegExp(n + '=([^;]*);?', 'gi')
    var r = re.exec(document.cookie) || []
    return r.length > 1 ? r[1] : null
  },
  Get1: function(n) {
    var re = new RegExp(n + '=([^;]*);?', 'gi')
    var r = re.exec(document.cookie) || []
    return unescape(r.length > 1 ? r[1] : null)
  },
  //写入COOKIES,n为Cookie名，v为value
  Set: function(n, v, e, p, d, s) {
    var t = new Date()
    d = d || '.fdc.com.cn'
    if (e) {
      // 8.64e7 一天 3.6e6 一小时
      t.setTime(t.getTime() + e * 3.6e6)
    }
    document.cookie =
      n +
      '=' +
      v +
      '; ' +
      (!e ? '' : '; expires=' + t.toUTCString()) +
      (!p ? '' : '; path=' + p) +
      (!d ? '' : '; domain=' + d) +
      (!s ? '' : '; secure') // Set cookie
  },
  Set1: function(n, v, e, p, d, s) {
    var t = new Date()
    p = p || '/'
    d = d || '.fdc.com.cn'
    if (e) {
      // 2.592e9一个月  8.64e7 一天 3.6e6 一小时
      t.setTime(t.getTime() + e * 8.64e7)
    }
    // 设置当前域名下cookies
    document.cookie =
      n +
      '=' +
      escape(v) +
      '; ' +
      (!e ? '' : '; expires=' + t.toUTCString()) +
      (!p ? '' : '; path=' + p) +
      (!s ? '' : '; secure') // Set cookie
    // 设置fdc.com.cn下的cookies
    document.cookie =
      n +
      '=' +
      escape(v) +
      '; ' +
      (!e ? '' : '; expires=' + t.toUTCString()) +
      (!p ? '' : '; path=' + p) +
      (!d ? '' : '; domain=' + d) +
      (!s ? '' : '; secure') // Set cookie
  },
  Del: function(n, p, d) {
    var t = cookie.Get(n)
    p = p || '/'
    d = d || '.fdc.com.cn'
    document.cookie =
      n +
      '=' +
      (!p ? '' : '; path=' + p) +
      (!d ? '' : '; domain=' + d) +
      '; expires=Thu, 01-Jan-70 00:00:01 GMT'
    return t
  }
}

/**
 * 节流函数
 * @param  {Function} fn           [执行的回调函数]
 * @param  {[type]}   delay        [执行回调函数的时间间隔]
 * @param  {[type]}   mustRunDelay [必然触发执行的时间间隔]
 * window.onresize = throttle(myFunc, 50, 100);
 * $(".test").click(throttle(myFunc, 50, 100));
 */
var throttle = function(fn, delay, mustRunDelay) {
  var timer = null
  var t_start
  var delay = delay || 100
  return function() {
    var context = this,
      args = arguments,
      t_curr = +new Date()
    clearTimeout(timer)
    if (!t_start) {
      t_start = t_curr
      fn.apply(context, args)
    }
    if (mustRunDelay && t_curr - t_start >= mustRunDelay) {
      fn.apply(context, args)
      t_start = t_curr
    } else {
      timer = setTimeout(function() {
        fn.apply(context, args)
      }, delay)
    }
  }
}

var createPage

/**
 * 模拟placeholder
 * jQuery EnPlaceholder plug
 * EnPlaceholder是一个跨浏览器实现placeholder效果的jQuery插件
 * version 1.0
 * by Frans.Lee <dmon@foxmail.com>  http://www.ifrans.cn
 *
 * 修正无placeholder显示undefined问题（lqy--http://fanshuyao.iteye.com/）
 * var defaultValue = $(_this).attr('placeholder');
 * if(defaultValue != null && typeof(defaultValue) != "undefined"){
 *
 * }
 */
;(function($) {
  $.fn.extend({
    placeholder: function(options) {
      options = $.extend(
        {
          placeholderColor: '#ACA899',
          isUseSetinterval: true, //为了兼容ie9，使用定时器
          isUseSpan: true, //是否使用插入span标签模拟placeholder的方式,默认false,默认使用value模拟
          onInput: true //使用标签模拟(isUseSpan为true)时，是否绑定onInput事件取代focus/blur事件
        },
        options
      )

      $(this).each(function() {
        var _this = this
        var supportPlaceholder =
          'placeholder' in document.createElement('input')
        if (!supportPlaceholder) {
          var defaultValue = $(_this).attr('placeholder')
          //修正无placeholder时，显示undefined问题
          if (defaultValue != null && typeof defaultValue != 'undefined') {
            var defaultColor = $(_this).css('color')
            if (options.isUseSpan == false) {
              var pattern = new RegExp('^' + defaultValue + '$|^$')
              $(_this)
                .focus(function() {
                  pattern.test($(_this).val()) &&
                    $(_this)
                      .val('')
                      .css('color', defaultColor)
                })
                .blur(function() {
                  if ($(_this).val() == defaultValue) {
                    $(_this).css('color', defaultColor)
                  } else if ($(_this).val().length == 0) {
                    $(_this)
                      .val(defaultValue)
                      .css('color', options.placeholderColor)
                  }
                })
                .trigger('blur')
            } else {
              var $imitate = $(
                '<span class="wrap-placeholder" style="position:absolute; display:inline-block; overflow:hidden; color:' +
                  options.placeholderColor +
                  '; width:' +
                  $(_this).outerWidth() +
                  'px; height:' +
                  $(_this).outerHeight() +
                  'px;">' +
                  defaultValue +
                  '</span>'
              )
              $imitate.css({
                'margin-left': $(_this).css('margin-left'),
                'margin-top': $(_this).css('margin-top'),
                'font-size': $(_this).css('font-size'),
                'font-family': $(_this).css('font-family'),
                'font-weight': $(_this).css('font-weight'),
                left: '0',
                top: '0',
                'padding-left':
                  parseInt($(_this).css('padding-left')) + 2 + 'px',
                'line-height':
                  _this.nodeName.toLowerCase() == 'textarea'
                    ? $(_this).css('line-weight')
                    : $(_this).outerHeight() + 'px',
                'padding-top':
                  _this.nodeName.toLowerCase() == 'textarea'
                    ? parseInt($(_this).css('padding-top')) + 2
                    : 0
              })
              $(_this).before(
                $imitate.click(function() {
                  $(_this).trigger('focus')
                })
              )

              $(_this).val().length != 0 && $imitate.hide()

              if (options.onInput) {
                //绑定oninput/onpropertychange事件
                var inputChangeEvent =
                  typeof _this.oninput == 'object' ? 'input' : 'propertychange'
                var initplaceholder = function() {
                  $imitate[0].style.display =
                    $(_this).val().length != 0 ? 'none' : 'inline-block'
                }
                $(_this).bind(inputChangeEvent, initplaceholder)
                // $(_this).bind("keyup", initplaceholder);
                setInterval(initplaceholder, 1000)
              } else {
                $(_this)
                  .focus(function() {
                    $imitate.hide()
                  })
                  .blur(function() {
                    ;/^$/.test($(_this).val()) && $imitate.show()
                  })
              }
            }
          }
        }
      })
      return this
    }
  })
})(jQuery)
;(function($) {
  'use strict'

  //底部indexlink外链同区域楼盘显示详细楼盘信息
  $('.region-item .snav a').hover(function() {
    $(this)
      .parents('.region-item')
      .find('.clip .item')
      .eq($(this).index())
      .show()
      .siblings()
      .hide()
  })

  //手机号input输入时校验是否为数字
  $('.inputitems .inputphone').keyup(function() {
    var re = /^[0-9]*[1-9][0-9]*$/
    var num = $(this)
      .val()
      .trim()
    if (!re.test(num)) {
      common_dialog.showAlert($(this), '手机号只允许输入整数')
    }
    var val =
      $(this).val() != null
        ? $(this)
            .val()
            .replace(/\D/g, '')
        : null
    $(this).val(val)
  })
  /*
   *楼层input只允许输入数字
   *zhangchang
   *2016.8.25
   */
  $('.pagenum').keyup(function() {
    var val =
      $(this).val() != null
        ? $(this)
            .val()
            .replace(/\D/g, '')
        : null
    $(this).val(val)
  })
  /**
   * input在ie下模拟placeholder
   * zhangchang
   * 2016.8.26
   */
  $('.inputbox input,.nav-searchipt').placeholder()

  /**
   *顶部登录注册埋spm码
   */
  $('.top_uc_login').attr('data-spmcode', 'fdc01.1000.pctop.a0002xxx')
  $('.top_uc_regist').attr('data-spmcode', 'fdc01.1000.pctop.a0001xxx')

  // 对Date的扩展，将 Date 转化为指定格式的String
  // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
  // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
  // 例子：
  // (new Date()).Format("yyyy-MM-dd hh:mm:s=s.S") ==> 2006-07-02 08:09:04.423
  // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  Date.prototype.Format = function(fmt) {
    var o = {
      'M+': this.getMonth() + 1, //月份
      'd+': this.getDate(), //日
      'h+': this.getHours(), //小时
      'm+': this.getMinutes(), //分
      's+': this.getSeconds(), //秒
      'q+': Math.floor((this.getMonth() + 3) / 3), //季度
      S: this.getMilliseconds() //毫秒
    }
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (this.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
    return fmt
  }

  /**
   * 分页page自动填充，翻页控制
   */
  function createPage(ele) {
    var cur = ele.attr('data-cur')
    var count = ele.attr('data-count')
    var status = ele.attr('data-status')
    //status为0，则显示上一页，下一页文本；否则就显示左右箭头文本
    var firstCtx = status ? '&lt' : '上一页'
    var lastCtx = status ? '&gt' : '下一页'
    //个数小于2就不显示分页栏
    if (parseInt(count) < 2) {
      ele.html('')
      //修复不显示搜索条数bug
      //zhangchang 2017.2.9
      if (ele.prev().hasClass('searchtotal')) {
        ele.next().hide()
      } else {
        ele.parent().show()
      }
      return
    }
    var disable = ele.attr('data-disable')
    var html = '<li data-page="prev">' + firstCtx + '</li>'
    if (cur == undefined || count == undefined || disable == 'true') {
      return false
    }
    if (parseInt(count) > 10) {
      if (parseInt(cur) - 5 > 0) {
        if (parseInt(cur) - 5 >= 2 && parseInt(cur) < parseInt(count) - 3) {
          html += '<li data-page=1>1</li><li>···</li>'
          for (var key = parseInt(cur) - 3; key <= parseInt(cur) + 2; key++) {
            html +=
              '<li class="' +
              (key == cur ? 'cur' : '') +
              '" data-page=' +
              key +
              '>' +
              key +
              '</li>'
          }
          html += '<li>···</li><li data-page=' + count + '>' + count + '</li>'
        } else if (parseInt(cur) - 5 < 2) {
          for (var key = 1; key <= 8; key++) {
            html +=
              '<li class="' +
              (key == cur ? 'cur' : '') +
              '" data-page=' +
              key +
              '>' +
              key +
              '</li>'
          }
          html += '<li>···</li><li data-page=' + count + '>' + count + '</li>'
        } else if (parseInt(cur) >= parseInt(count) - 3) {
          html += '<li data-page=1>1</li><li>···</li>'
          for (var key = parseInt(count) - 7; key <= count; key++) {
            html +=
              '<li class="' +
              (key == cur ? 'cur' : '') +
              '" data-page=' +
              key +
              '>' +
              key +
              '</li>'
          }
        }
      } else {
        for (var key = 1; key <= 8; key++) {
          html +=
            '<li class="' +
            (key == cur ? 'cur' : '') +
            '" data-page=' +
            key +
            '>' +
            key +
            '</li>'
        }
        html += '<li>···</li><li data-page=' + count + '>' + count + '</li>'
      }
    } else {
      for (var key = 1; key <= count; key++) {
        html +=
          '<li class="' +
          (key == cur ? 'cur' : '') +
          '" data-page=' +
          key +
          '>' +
          key +
          '</li>'
      }
    }
    html += '<li data-page="next">' + lastCtx + '</li>'
    ele.html(html)
  }
  $('.otherpage').each(function(index, el) {
    createPage($(this))
  })

  $('.otherpage').delegate('li', 'click', function(e) {
    var page = $(this).attr('data-page'),
      cur = $(this)
        .parent('.page')
        .attr('data-cur'),
      count = $(this)
        .parent('.page')
        .attr('data-count')
    if (page == undefined) {
      return false
    }
    if (page == 'prev') {
      if (parseInt(cur) == 1) {
        return false
      } else {
        $(this)
          .parent('.page')
          .attr('data-cur', parseInt(cur) - 1)
        createPage($(this).parent('.page'))
        return false
      }
    }
    if (page == 'next') {
      if (parseInt(cur) == count) {
        return false
      } else {
        $(this)
          .parent('.page')
          .attr('data-cur', parseInt(cur) + 1)
        createPage($(this).parent('.page'))
        return false
      }
    }
    $(this)
      .parent('.page')
      .attr('data-cur', page)
    createPage($(this).parent('.page'))
  })
  /**
   * 扩展更新分页方法
   */
  $.fn.extend({
    updataPage: function(status) {
      createPage($(this), status)
    }
  })

  $('#qq, #wechat, #weibo').click(function(event) {
    /* Act on the event */
    var url = 'ucaction.login.third.' + $(this).attr('id') + '.pass'
    var uid = decodeURIComponent(cookie.Get('userInfo'))
    var tempUrl = decodeURIComponent(cookie.Get('curUrl'))
    var myparams = {
      userid: uid != 'null' ? uid : undefined,
      curUrl: tempUrl != 'null' ? tempUrl : 'home.html',
      invaliddata: new Date().getTime()
    }
    tool.ajax1(url, 'Get', myparams, function(res, success) {
      if (res[success]) {
        window.location.href = res[success].data.url
      } else {
        tool.showError(res)
      }
    })
  })

  $('#login-out').click(function(event) {
    /* Act on the event */
    cookie.Del('userInfo')
    cookie.Del('token')
    // window.location.href = decodeURIComponent(cookie.Get("curUrl"));
    window.location.reload() //刷新当前页面.
  })

  /**
   * 首页导航滑块滑动效果
   * zhangchang 2017.1.3
   */
  //  if($(".navigation-link").length > 0){
  //    var blockwidth,
  //        blockleft,
  //        curindex = $(".navigation-link .cur").index();
  //    /**
  //     * 获取当前li的定位及宽度
  //     * @param  {[type]} index [当前导航的索引值]
  //     * @return {[type]}       [description]
  //     */
  //    var getblockinfo = function(index){
  //      var eleDom = $(".navigation-link li").eq(index);
  //      blockwidth = eleDom.width();
  //      blockleft = eleDom.offset().left - $(".navigation-link").offset().left;
  //    }
  //    //初始化滑块位置
  //    getblockinfo(curindex);
  //    $(".navigation-con .moveblock").css({"width":blockwidth,"left":blockleft});
  //    //$(".navigation-link .bgmask").remove()
  //    //鼠标移进移出时滑块事件
  //    $(".navigation-link li").mouseover(function(){
  //      var index = $(this).index();
  //      getblockinfo(index);
  //      $(".navigation-con .moveblock").stop(true,true).animate({
  //        "width":blockwidth,
  //        "left":blockleft
  //      },300);
  //    })
  //    $(".navigation-link").mouseleave(function(){
  //      /*getblockinfo(curindex);
  //      $(".navigation-con .moveblock").stop(true,true).animate({
  //        "width":blockwidth,
  //        "left":blockleft
  //      },500);*/
  //    $(".navigation-con .moveblock").stop(true,true).animate({"width":0},300);
  //    });
  //  }
  /**
   * 为我鉴房快速入口
   * zhangchang 2017.1.16
   */
  if ($('.housechoose-card').length > 0) {
    //显示隐藏下拉列表
    $('.housechoose-card .selectwrap')
      .click(function() {
        $(this).addClass('open')
      })
      .mouseleave(function() {
        $(this).removeClass('open')
      })
    //点击列表选项
    $('.housechoose-card').on('click', '.chooselist li', function() {
      $(this)
        .addClass('cur')
        .siblings()
        .removeClass('cur')
      $(this)
        .closest('.selectwrap')
        .removeClass('open')
        .find('.selectedbox')
        .text($(this).text())
      if ($(this).text() == '不限') {
        $(this)
          .parent()
          .prev()
          .removeClass('selected')
      } else {
        $(this)
          .parent()
          .prev()
          .addClass('selected')
      }
      return false
    })
    //获取跳转链接
    //issignup 是否直接报名 0:否 1:是
    var getChooseLink = function(issignup) {
      var dictitem = $('.housechoose-card .chooselist')
          .eq(0)
          .find('.cur')
          .attr('value'),
        housearea = $('.housechoose-card .chooselist')
          .eq(1)
          .find('.cur')
          .attr('value'),
        houseprice = $('.housechoose-card .chooselist')
          .eq(2)
          .find('.cur')
          .attr('value'),
        url =
          $('#nhIndexUrl').val() +
          '/advice?dictitemshortkey=' +
          dictitem +
          '&houseareashortkey=' +
          housearea +
          '&housepriceid=' +
          houseprice +
          '&issignup=' +
          issignup
      if (!dictitem && !housearea && !houseprice) {
        common_dialog.showMsg('error', '至少选择一项选房意向！')
      } else {
        window.open(url)
      }
    }
    //直接提交
    $('.housechoose-card .choosebtn').click(function() {
      // getChooseLink(1);
      getChooseLink(0)
    })
    //更多要求
    $('.housechoose-card .tiplink').click(function() {
      getChooseLink(0)
    })
  }
})(jQuery)

//懒加载
/*!
*  Echo v1.4.0
*  Lazy-loading with data-* attributes, offsets and throttle options
*  Project: https://github.com/toddmotto/echo
*  by Todd Motto: http://toddmotto.com
*  Copyright. MIT licensed.
*/
window.Echo = (function(window, document, undefined) {
  var store = [],
    offset,
    throttle,
    poll

  var _inView = function(el) {
    var coords = el.getBoundingClientRect()
    return (
      (coords.top >= 0 && coords.left >= 0 && coords.top) <=
      (window.innerHeight || document.documentElement.clientHeight) +
        parseInt(offset)
    )
  }

  var _pollImages = function() {
    for (var i = store.length; i--; ) {
      var self = store[i]
      if (_inView(self)) {
        self.src = self.getAttribute('data-echo')
        store.splice(i, 1)
      }
    }
  }

  var _throttle = function() {
    clearTimeout(poll)
    poll = setTimeout(_pollImages, throttle)
  }

  var init = function(obj) {
    var nodes = document.querySelectorAll('[data-echo]')
    var opts = obj || {}
    var target = obj.target || window
    offset = opts.offset || 0
    throttle = opts.throttle || 250

    for (var i = 0; i < nodes.length; i++) {
      store.push(nodes[i])
    }

    _throttle()

    if (document.addEventListener) {
      target.addEventListener('scroll', _throttle, false)
    } else {
      target.attachEvent('onscroll', _throttle)
    }
  }

  return {
    init: init,
    render: _throttle
  }
})(window, document)
;(function($) {
  /**
   * 字符串截取方法
   * $(".test2").wordLimit(24); 截取字符数，值为大于0的整数，这里表示class为test2的标签内字符数最多24个
   */
  $.fn.wordLimit = function(num) {
    this.each(function() {
      var text = $(this).text()
      var nativecode = text.split('')
      var len = 0
      var tempval = ''
      for (var i = 0; i < nativecode.length; i++) {
        var code = Number(nativecode[i].charCodeAt(0))
        if (code > 127) {
          len += 2
        } else {
          len++
        }
        if (num - len / 2 >= 0) {
          tempval += nativecode[i]
        } else {
          tempval = tempval + '...'
          $(this).text(tempval)
          return
        }
      }
    })
  }
  /**
   * 倒计时
   * $(".test").countDown();
   * test节点上要有data-time时间戳,节点里面根据需求要有day、hour、minute子节点
   * 可以传入60,代表是一分钟刷新一次
   */
  $.fn.countDown = function(num) {
    this.each(function() {
      var displayTime
      var endTime = $(this).data('time')
      var speed = num * 1000 || 100
      var _this = $(this)
      function showTime() {
        var closeTime = endTime - new Date().getTime()
        var day = Math.floor(closeTime / (1000 * 60 * 60 * 24))
        var hou = Math.floor(closeTime / 3600000) - day * 24
        var min = Math.floor(closeTime / 60000) - day * 24 * 60 - hou * 60
        var sec =
          Math.floor(closeTime / 1000) -
          day * 24 * 60 * 60 -
          hou * 60 * 60 -
          min * 60
        min = min > 0 ? min : 0
        sec = sec > 0 ? sec : 0
        _this.find('.day').text(day)
        _this.find('.hour').text(hou)
        _this.find('.minute').text(min)
        _this.find('.second').text(sec)
        if (closeTime < 0) {
          clearInterval(displayTime)
          return true
        }
      }
      showTime()
      displayTime = setInterval(function() {
        showTime()
      }, speed)
    })
  }

  var getSearchData = function(name, callback) {
    var paramdata = {
      requrl: $('#oldHouseRouterRestURL_id').val(),
      from: 99,
      name: name
    }
    // 地图找房，需要排除掉已售罄的楼盘！！！
    var sourcePage = $('.nav-searchipt').attr('sourcePage')
    if (sourcePage && sourcePage == 'ditu') {
      // 地图找房
      paramdata['issaleout'] = 1
    }
    tool.ajaxJsonp(
      'homeoldapi.restful.inter.keyword.getResidential',
      'get',
      paramdata,
      function(res, success) {
        if (res[success]) {
          var searchdata = res[success].data
          if (searchdata) {
            if (callback) callback(searchdata)
          }
        } else {
          $('.select-position-wrap .select-wrap').empty()
        }
      }
    )
  }

  $('.nav-searchipt').on('keyup', function(e) {
    //监听按建，如果案件是上下键，则不发送请求，不重新生成节点
    //zhangchang 2016.10.14
    var ev = e || event,
      key = ev.keyCode || ev.which
    if (key == 38 || key == 40) return false
    var sourcePage = $(this).attr('sourcePage')
    var input_width = 0
    var isIndex = 'true'
    var indexUrl = $('#houseIndexUrl').val()
    indexUrl = indexUrl.replace('//house.', '')
    indexUrl = indexUrl.replace('//local.', '')
    /*
      var indexUrl=$("#portalIndexURL").val();
      indexUrl=indexUrl.replace("http://house.","");
      indexUrl=indexUrl.replace("http://local.","");
      */
    if (sourcePage && sourcePage == 'ditu') {
      // 地图找房
      input_width = 378
    } else {
      // 默认
      input_width = $(this).outerWidth()
    }
    getSearchData($(this).val(), function(data) {
      autoMenu.init('.searchlistbox', {
        data: data,
        name: 'residentialName',
        id: 'id',
        pinyin: 'pinyin',
        width: input_width,
        isIndex: isIndex,
        indexUrl: indexUrl
      })
    })
  })

  // 新版底部标签切换
  $('.footer__label-wrap').on('click', '.footer__label-item', function() {
    var index = $(this).index()
    $('.footer__label-item').removeClass('footer__label-item--active')
    $(this).addClass('footer__label-item--active')
    $('.footer__content-wrap')
      .find('.footer__content-item')
      .hide()
      .eq(index)
      .show()
  })

  

  //   //动态订阅
  //   $('.dynamicSubscription').on('click', function(){
  //     common_dialog.showDialog($("#subscribe"));
  //     // 先清除所有原来的选项
  //     $('.checkwrap span.uncheck').removeClass('checked');
  //     // 再默认选中“新动态通知”
  //     $('.checkwrap li[data-type="nh_order_06"] span').addClass('checked');
  //     var userId = configTool.getLoginUid();
  //     if (typeof(userId) == "undefined") {//未登录
  //         $("#subscribeCodeChar").show();//显示
  //         $("#subscribeInoutCode").show();//显示
  //         $(".inputimgcode").closest(".inputitems").show();
  //     } else {//已经登录
  //         $(".inputimgcode").closest(".inputitems").hide();
  //         $("#subscribeCodeChar").hide();//隐藏
  //         $("#subscribeInoutCode").hide();//隐藏
  //         $("#suspendSubscribeSignOrRegistry").hide();
  //         var phone = $("#hiddenPhoneNumber").attr("value");
  //         $("#subscribeInputPhone").val(phone);
  //     }
  // });

  // //订阅更改电话
  // $("#subscribeInputPhone").blur(function () {
  //   var num = $("#subscribeInputPhone").val();
  //   var realNum = $("#hiddenPhoneNumber").attr("value");
  //   if (num != realNum) {
  //     $("#subscribeCodeChar").show();
  //     $("#subscribeInoutCode").show();
  //   } else {
  //     $("#subscribeCodeChar").hide();
  //     $("#subscribeInoutCode").hide();
  //   }
  // })
})(jQuery)

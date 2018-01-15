// 小区门户页面弹窗的相关jS 


//点击获取验证码倒计时
$('body').on('click', '.getcode', function() {
  var that = $(this)
  //定位手机号输入框
  var inputphone = that
    .closest('.dialogbox,.reg-formlist')
    .find('.inputphone')
  var inputimgDom = that
    .closest('.dialogbox,.reg-formlist')
    .find('.inputimgcode')
  var codeImgDom = that.closest('.dialogbox,.reg-formlist').find('.img-check')
  var phonevalue = inputphone.val()
  var codeId = codeImgDom.attr('codeid')
  var uid = codeImgDom.attr('uid')
  var code = inputimgDom.val()

  var inputphonecheck = valid.check(inputphone)
  var inputimgDomcheck = valid.check(inputimgDom)

  if (!that.hasClass('disabled') && inputphonecheck && inputimgDomcheck) {
    tool.sendCode(
      phonevalue,
      code,
      codeId,
      'picgif.secuity.inter.sms.send2',
      uid,
      countLess
    )
    function countLess() {
      if (tool.ImgcodeFlag) {
        var time = 60
        that.addClass('disabled')
        var count = function() {
          if (time == 0) {
            that.removeClass('disabled')
            that.html('发送验证码')
          } else {
            that.html('重新发送(<em>' + time + '</em>)')
            time--
            setTimeout(count, 1000)
          }
        }
        count()
      } else {
        common_dialog.showAlert($('.inputimgcode'), '验证码输入错误！')
      }
    }
  }
})
$('body').on('click', '.pricetx', function() {
  common_dialog.showDialog($('#subscribe'))
  tool.initImgCode($('#subscribe .img-check'))
  // 先清除所有原来的选项
  $('.checkwrap span.uncheck').removeClass('checked')
  // 再默认选中“变价提醒”
  $('.checkwrap li[data-type="nh_order_02"] span').addClass('checked')
  var userId = configTool.getLoginUid()
  if (typeof userId == 'undefined') {
    //未登录
    $('#subscribeCodeChar').show() //显示
    $('#subscribeInoutCode').show() //显示
  } else {
    //已经登录
    $('#subscribeCodeChar').hide() //隐藏
    $('#subscribeInoutCode').hide() //隐藏
    $('#suspendSubscribeSignOrRegistry').hide()
    var phone = $('#hiddenPhoneNumber').attr('value')
    $('#subscribeInputPhone').val(phone)
  }
})
// 弹出框中“订阅消息”复选框，选中or取消
$('#subscribe .checkwrap span').on('click', function() {
  if ($(this).hasClass('checked')) {
    $(this).removeClass('checked')
  } else {
    $(this).addClass('checked')
  }
})
$('body').on('click', '#subscribeSubmit', function() {
  var nodeLength = $('#subscribe .checkwrap span.checked').length
  var allType = ''
  var allTypeName = ''
  if (nodeLength <= 0) {
    common_dialog.showMsg('error', '订阅失败，请至少勾选一项服务')
  } else {
    for (var i = 0; i < nodeLength; i++) {
      var element = $('#subscribe .checkwrap span.checked').eq(i)
      var everyType = element.parent().data('type')
      var typeName = element.text()
      allType += everyType + ','
      allTypeName += typeName + ','
    }
    /*向后台推送数据*/
    var housename = $('#houseName').val()
    var houseid = $('#houseId').val()
    var districtId = $('#districtId_id').val()
    var districtName = $('#districtName_id').val()
    var districtSubId = $('#districtSubId').val()
    var districtSubName = $('#districtSubName').val()
    var re = /^1[3|4|5|7|8]\d{9}$/
    var phoneNum = $('#subscribeInputPhone').val()
    var smsCode = $('#suspendSubsribeCode').val()
    var num = phoneNum.trim()
    if (!re.test(num)) {
      common_dialog.showMsg(
        'error',
        '订阅失败，你填写的手机号不正确，请重新输入'
      )
      return
    }
    if (typeof configTool.getLoginUid() == 'undefined') {
      //未登录
      if (smsCode == '') {
        common_dialog.showMsg(
          'error',
          '订阅失败，你填写的验证码不正确，请重新输入'
        )
        return
      }
    }
    var params = {
      bid: houseid,
      baseName: housename,
      districtId: districtId,
      districtName: districtName,
      districtSubId: districtSubId,
      districtSubName: districtSubName,
      phoneNumber: phoneNum,
      smsCode: smsCode,
      allType: allType,
      allTypeName: allTypeName
    }
    fdcLog($(this).data('spm'))
    $.ajax({
      url: '//' + window.location.hostname + '/orderServicePortal',
      data: params,
      type: 'POST',
      success: function(res) {
        if (res.msg == 'success') {
          if (res.registMsg != null && res.registMsg.is_passed == 1) {
            fdcUserTransform(res.registMsg.userid, function() {
              uc_cookie.method.set('uc_userInfo', res.registMsg.userid, 12)
              uc_cookie.method.set('uc_token', res.registMsg.token, 12)
              uc_cookie.method.set('uc_bind', 'zhbdl1kdsndDSEFGfd', 12)
              common_dialog.closeDialog($('#subscribe').find('.close'))
              common_dialog.showDialog($('#subscribesuccess'))
              $('.dialogbox .close').click(function() {
                common_dialog.closeDialog($(this))
                window.location.reload()
              })
            })
          } else if (res.registMsg != null && res.registMsg.is_passed == 0) {
            fdcUserTransform(res.registMsg.userid, function() {
              uc_cookie.method.set('uc_userInfo', res.registMsg.userid, 12)
              uc_cookie.method.set('uc_token', res.registMsg.token, 12)
              common_dialog.closeDialog($('#subscribe').find('.close'))
              common_dialog.showDialog($('#subscribesuccess'))
              $('.dialogbox .close').click(function() {
                common_dialog.closeDialog($(this))
                window.location.href =
                  'http:' +
                  configTool.ucpageurl +
                  '/phonebind.html?userid=' +
                  res.registMsg.userid
              })
            })
          } else {
            common_dialog.closeDialog($('#subscribe').find('.close'))
            common_dialog.showDialog($('#subscribesuccess'))
            $('.dialogbox .close').click(function() {
              common_dialog.closeDialog($(this))
              window.location.reload()
            })
          }
        } else {
          common_dialog.showMsg('error', res.msg)
        }
      },
      error: function() {}
    })
  }
})


$('#shanding .close').on('click', function() {
  common_dialog.closeDialog($(this))
})
$('#joinGroupPhone').bind('propertychange input change', function() {
  var orginNum = $('#orginNum').val()
  var newNum = $('#joinGroupPhone').val()
  if ('' == orginNum || newNum != orginNum) {
    $('#checkCodeFiled').show()
  } else {
    $('#checkCodeFiled').hide()
  }
})
$('#joinGroupPhone').change()
// 秒杀闪订报名：防止重复提交
var flag = true
// 秒杀闪订报名：提交弹出层
$('#joinGroupSubmit').click(function() {
  if (flag) {
    flag = false
    // fdcLog($(this).data("spm"));
    signUpChooseHouse(flag)
    setTimeout(function() {
      flag = true
    }, 1000)
  }
})

function signUpChooseHouse(flag) {
  var userPhone = $('#orginNum').val()
  var dialogTelephone = $('#joinGroupPhone').val()
  var username = $('#joinGroupName')
    .val()
    .trim()
  var phoneRegex = /^1[3|4|5|7|8][0-9]{8}\d+$/
  var urlFrom = '//' + window.location.hostname + window.location.pathname
  var validstatus = valid.checkall($('#shanding'))
  if (
    userPhone == dialogTelephone &&
    dialogTelephone != '' &&
    dialogTelephone != null
  ) {
    if (username == null || username == '') {
      common_dialog.showMsg(
        'error',
        '报名失败，你填写的姓名不正确，请重新输入'
      )
      flag = true
      return
    }
    if (!phoneRegex.test(dialogTelephone)) {
      common_dialog.showMsg(
        'error',
        '报名失败，你填写的手机号不正确，请重新输入'
      )
      flag = true
      return
    }
    if (validstatus) {
      $.ajax({
        type: 'POST',
        url: BASE_URL + 'signUpInterestedHouseWithoutSmscode',
        data:
          $.param({ urlFrom: urlFrom }) +
          '&' +
          $('#yhtDialogRegForm').serialize(),
        success: function(data) {
          if (data.msg == '报名成功!') {
            // $("#yihe").hide();
            common_dialog.closeDialog($('#shanding').find('.close'))
            if (data.userinfo != '' && data.userinfo != null) {
              //将用户id token存在缓存
              uc_cookie.method.set('uc_userInfo', data.userinfo.userid, 12)
              uc_cookie.method.set('uc_token', data.userinfo.token, 12)
              uc_cookie.method.set(
                'uc_userTokenId',
                data.userinfo.userTokenId,
                12
              )
              uc_cookie.method.set('uc_roleId', data.userinfo.roleId, 12)
            }
            if ($('#serviceType').val() == 'df') {
              $('.hs-quick-order').html(
                '已有' + (Number($('#preOrderCount').val()) + 1) + '人订过'
              )
              $('#preOrderCount').val(Number($('#preOrderCount').val()) + 1)
            }
            common_dialog.showDialog($('#miaoshasuccess'))
          } else {
            $('#shanding').show()
            common_dialog.showMsg('error', data.msg)
            flag = true
          }
        },
        error: function() {
          common_dialog.showMsg('error', '报名失败！')
          flag = true
        }
      })
    }
  } else {
    if (username == null || username == '') {
      common_dialog.showMsg(
        'error',
        '报名失败，你填写的姓名不正确，请重新输入'
      )
      flag = true
      return
    }
    if (!phoneRegex.test(dialogTelephone)) {
      common_dialog.showMsg(
        'error',
        '报名失败，你填写的手机号不正确，请重新输入'
      )
      flag = true
      return
    }
    if (validstatus) {
      $.ajax({
        type: 'POST',
        // url: BASE_URL + 'signUpInterestedHouse',
        url:   '/signUpInterestedHouse',
        data:
          $.param({ urlFrom: urlFrom }) +
          '&' +
          $('#yhtDialogRegForm').serialize(),
        success: function(data) {
          if (data.msg == '报名成功!') {
            // $("#yihe").hide();
            common_dialog.closeDialog($('#shanding').find('.close'))
            if (data.userinfo != '' && data.userinfo != null) {
              //将用户id token存在缓存
              uc_cookie.method.set('uc_userInfo', data.userinfo.userid, 12)
              uc_cookie.method.set('uc_token', data.userinfo.token, 12)
              uc_cookie.method.set(
                'uc_userTokenId',
                data.userinfo.userTokenId,
                12
              )
              uc_cookie.method.set('uc_roleId', data.userinfo.roleId, 12)
            }
            if ($('#serviceType').val() == 'df') {
              $('.hs-quick-order').html(
                '已有' + (Number($('#preOrderCount').val()) + 1) + '人订过'
              )
              $('#preOrderCount').val(Number($('#preOrderCount').val()) + 1)
            }
            if (data.userinfo.is_passed == 1) {
              uc_cookie.method.set('uc_bind', 'zhbdl1kdsndDSEFGfd', 12)
              common_dialog.showDialog($('#miaoshasuccess'))
              $('.dialogbox .close').click(function() {
                common_dialog.closeDialog($(this))
                window.location.reload()
              })
            } else if (data.userinfo.is_passed == 0) {
              common_dialog.showDialog($('#miaoshasuccess'))
              $('.dialogbox .close').click(function() {
                common_dialog.closeDialog($(this))
                window.location.href =
                  'http:' +
                  configTool.ucpageurl +
                  '/phonebind.html?userid=' +
                  data.userinfo.userid
              })
            }
          } else {
            // $("#yihe").show();
            common_dialog.showDialog($('#shanding'))
            common_dialog.showMsg('error', data.msg)
            flag = true
          }
        },
        error: function() {
          common_dialog.showMsg('error', '报名失败！')
          flag = true
        }
      })
    }
  }
}
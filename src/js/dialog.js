var dialog = {
 /**
  * 信息提示,sDuration毫秒后消失
  * @param  {[string]} type [分三种信息提示,"error":表示错误信息;"success":表示成功信息;"info":表示提示信息]
  * @param  {[string]} msg  [信息的内容]
  * @param  {[int]} sDuration  [信息提示框的展示时间(单位毫秒),默认2000毫秒]
  */
  showMsg: function(type, msg, callback, sDuration){
    if($('.dialog-warp').length>0){
      $('.dialog-warp').remove();
    }
    var iconClass;
    switch(type){
      case "error":
        iconClass = "ico-error";
        break;
      case "success":
        iconClass = "ico-success";
        break;
      case "info":
        iconClass = "ico-info";
        break;
      default:
        return;
    }
    var sDuration = sDuration || 2000;
    var d = $('<div class="dialog-warp"><div class="dialog-body"><i class="info-ico ' + iconClass + '"></i><p class="info-msg">' + msg + '</p></div></div>').appendTo('body');
    setTimeout(function () {
      d.remove();
      if(callback){
        callback();
      }
    }, sDuration);
  },
  /**
   * 模态确认提示框
   * @param  {[string]}   msg      [确认提示信息]
   * @param  {Function} callback [确认后的回调方法]
   * @param  {Function} callback2 [取消后的回调方法]
   */
  confirm: function(msg, callback, callback2){
    var confirm_html = '<div class="confirm-warp">';
        confirm_html +='<div class="confirm-mask"></div>';
        confirm_html +='<div class="confirm-body">';
        confirm_html +='<div class="confirm-head">';
        confirm_html +='<span class="confirm-headtx">确认提示</span>';
        confirm_html +='<i class="confirm-cancel">×</i>';
        confirm_html +='</div>';
        confirm_html +='<div class="confirm-content">'+msg+'</div>';
        confirm_html +='<div class="confirm-footer">';
        confirm_html +='<button class="confirm-btn confirm-ok">确认</button>';
        confirm_html +='<button class="confirm-btn confirm-cancel">取消</button>';
        confirm_html +='</div>';
        confirm_html +='</div>';
        confirm_html +='</div>';
    var d = $(confirm_html).appendTo('body');
    $('.confirm-cancel').click(function(event) {
      /* Act on the event */
      d.remove();
      if(callback2)callback2();
    });
    $('.confirm-ok').click(function(event) {
      /* Act on the event */
      d.remove();
      if(callback){
        callback();
      }else{
        console.log('您没有提供回调函数');
      }
    });
  },
  loading:{
    /**
     * 模拟加载中
     * @param  {[string]}   etag      [需要添加加载中的元素，为空就是body]
     * @param  {int} sDuration [提示时长，默认5s后自动消失]
     */
    show:function(etag,sDuration){
      var _top,_style;
      if(etag && etag.selector != 'body'){
        _top = $(etag).height()/2-21;
        _style ={
          "padding-top":_top+"px",
          "height": _top+42+"px"
        }
      }else{
        etag = 'body';
        _top = document.documentElement.clientHeight/2-21;
        _style ={
          "padding-top":_top+"px",
          "position": "fixed",
          "width": "100%",
          "height": "100%",
          "left": "0",
          "top": "0"
        }
      }
      var d = $('<div class="loading-warp"><span class="loading-content"></span>加载中…</div>');
      d.css(_style).appendTo(etag);
      setTimeout(function () {
        d.remove();
      }, sDuration || 5000);
    },
    /**
     * 模拟关闭加载中
     * @param  {[string]}   etag      [需要移除加载中的元素，为空就是body]
     */
    close:function(etag){
      etag = etag || 'body';
      $(etag).find('.loading-warp').remove();
    }
  },
  /**
   * input错误提示,sDuration毫秒后消失
   * @param  {[elemelt]} ele dom对象
   * @param  {[string]} msg  [信息的内容]
   * @param  {[color]} bordercolor  [信息提示框的展示时间(单位毫秒),默认2000毫秒]
   */
  showAlert: function(ele,msg){
    var ele = ele.parent();
    var html = '';
    html += '<div class="show-log">';
    html += '<div class="alertcontent">';
    html += '<div class="main-txt">';
    html += '<span class="icon"></span>';
    html += '<span>'+msg+'</span>';
    html += '<span class="closeicon"></span>';
    html += '</div>';
    html += '<div class="layer-arrow">';
    html += '<i class="s-line3"></i>';
    html += '<em class="s-bg2br"></em></div></div></div>';
    ele.find('.show-log').remove();
    ele.append(html);
    var _width = ele.find(".show-log").css("width");
    ele.find(".show-log").css("margin-left",-parseInt(_width)/2);
    ele.find(".show-log .closeicon").click(function(){
      ele.find('.show-log').fadeOut(200).remove();
    });
    setTimeout(function(){
      ele.find('.show-log').fadeOut(200).remove();
    },3000);
  },
  /**
   * 报名弹窗弹出与关闭
   * @param  {[elemelt]} ele [dom对象]
   * @return {[type]}     [description]
   */
  showDialog: function(ele){
    ele.show();
    var h = ele.find(".dialogbox").height();
    ele.find(".dialogbox").css("margin-top", -h / 2 + "px");
    setTimeout(function(){
      ele.find(".dialogbox").addClass("open");
    },300);
  },
  closeDialog: function(ele){
    var boxele = ele.closest('.dialogbox');
    boxele.removeClass('open');
    setTimeout(function(){
      boxele.parent().hide();
    },300);
  }
}
/**
 * 弹出层input校验
 */
var valid = {
  //校验一个 input
  //ele：input框
  check:function(ele){
    var type,msg;
    //判断输入框类别
    if(ele.hasClass("inputname")){
      type = 1;
      msg = "姓名";
    }else if(ele.hasClass("inputnum")){
      type = 2;
      msg = "人数";
    }else if(ele.hasClass("inputphone")){
      type = 3;
      msg = "手机号";
    }else if(ele.hasClass("inputcode")){
      type = 4;
      msg = "验证码";
    }else if(ele.hasClass("inputhouse")){
      type = 5;
      msg = "意向楼盘";
    }else if(ele.hasClass("inputtitle")){
      type = 6;
      msg = "标题";
    }else{
      type = 0;
      msg = "内容";
    }
    //判断输入框长度
    var val = ele.val().trim();
    if(val.length == 0){
      dialog.showAlert(ele,msg+"不能为空");
      return false;
    }else{
      //判断验证码长度
      if(type == 4 && val.length != 6){
        dialog.showAlert(ele,"验证码长度不足6");
        return false;
      //验证手机号
      }else if(type == 3){
        return valid.validphone(ele);
      //验证人数是否为数字
      }else if(type == 2){
        return valid.isPositiveNum(ele);
      //验证姓名是否为汉字和字母
      }else if(type == 1){
        return valid.validname(ele);
      }else{
        return true;
      }
    }
  },
  //多个校验
  //ele：包裹住要校验的所有input框的元素
  checkall:function(ele){
    var flag = true;
    ele.find("input").each(function(index,eleDom){
      var that = $(this);
      //跳过隐藏input框
      if(that.closest(".inputitems").find("input").is(':visible') && flag == true){
        flag = valid.check(that);
      }
    })
    return flag;
  },
  //判断手机号
  validphone:function(ele){
    var phoneRegex = /^1[3|4|5|7|8][0-9]{8}\d+$/;
    var phone = ele.val().trim();
    if (phoneRegex.test(phone)) {
      return true;
    } else {
      dialog.showAlert(ele,"请输入11位有效手机号码");
      return false;
    }
  },
  //校验文本中是否存在电话广告
  checkPhoneAd: function(str){
    //手机号的正则表达式
    // var regTelPhone = /^.*1(3|4|5|8)[0-9]\\d{8}.*$/g;
    // var regTelPhone = /^1[3|4|5|7|8][0-9]{8}\d+$/;
    var regTelPhone = /1[34578]\d{9}/;
    //电话号码的正则表达式
    // var regPhone=/^.*(\\(\\d{3,4}\\)|\\d{3,4}-|\\s)?\\d{7,14}.*$/g;
    var regPhone=/\d{3}-\d{8}|\d{4}-\d{7}/;
    //去除空格
    str = str.replace(/\s/g, "");
    //将中文数字转化为阿拉伯数字
    // 壹,贰,叁,肆,伍,陆,柒,捌,玖,拾,零
    str = str.replace(/\一/g,1).replace(/\壹/g,1)
            .replace(/\二/g,2).replace(/\贰/g,2)
            .replace(/\三/g,3).replace(/\叁/g,3)
            .replace(/\四/g,4).replace(/\肆/g,4)
            .replace(/\五/g,5).replace(/\伍/g,5)
            .replace(/\六/g,6).replace(/\陆/g,6)
            .replace(/\七/g,7).replace(/\柒/g,7)
            .replace(/\八/g,8).replace(/\捌/g,8)
            .replace(/\九/g,9).replace(/\玖/g,9)
            .replace(/\十/g,9).replace(/\拾/g,9)
            .replace(/\零/g,0);
    var istelnum = regTelPhone.test(str),
        isphone = regPhone.test(str);
    return istelnum || isphone;
  },
  //判断正整数
  isPositiveNum:function(ele){
    var re = /^[0-9]*[1-9][0-9]*$/ ;
    var num = ele.val().trim();
    if(re.test(num)){
      return true;
    }else{
      dialog.showAlert(ele,"请输入正整数");
      var val = ele.val() != null ? ele.val().replace(/\D/g,"") : null;
      ele.val(val);
      return false;
    }
  },
  checkPosNum:function(ele){
    //var re = /^[0-9]*[1-9][0-9]*$/ ;
    var re = /^([1-9]+\d*)|0{1}$/ ;
    var num = ele.val().trim();
    if(re.test(num)){
      return true;
    }else{
      dialog.showMsg("error","请输入正整数");
      return false;
    }
  },
  //判断姓名是否为汉字或字母
  validname:function(ele){
    var re = /^[a-zA-Z\u4e00-\u9fa5]+$/g;
    var name = ele.val().trim();
    if(re.test(name)){
      return true;
    }else{
      dialog.showAlert(ele,"请输入汉字或拼音");
      return false;
    }
  }
}

/**
 * 弹出层点击事件通用方法
 * @return {[type]} [description]
 */
// var dialogFunc = function(){
//   //点击获取验证码倒计时
// /*  $(".getcode").click(function(){
//     var that = $(this);
//     //定位手机号输入框
//     var inputphone = that.closest(".dialogbox,.reg-formlist").find(".inputphone");
//     if(!that.hasClass("disabled") && valid.check(inputphone)){
//       var time = 60;
//       that.addClass("disabled");
//       tool.sendCode(inputphone.val());
//       var count = function(){
//         if(time == 0){
//           that.removeClass("disabled");
//           that.html("发送验证码");
//         }else{
//           that.html("重新发送(<em>"+time+"</em>)");
//           time--;
//           setTimeout(count,1000);
//         }
//       }
//       count();
//     }
//   })*/
//   //弹出错误提示demo
//   // $(".dialogbox input").focus(function(){
//   //   var eleDom = $(this);
//   //   dialog.showAlert(eleDom,"11111111111");
//   // })
//   // 校验demo
//   $(".dialogbox input,.reg-formlist input").blur(function(){
//     var that = $(this);
//     valid.check(that);
//   })
//   $(".inputnum,.inputcode").keyup(function(){
//     var that = $(this);
//     valid.isPositiveNum(that);
//   })
//   // $(".joinin").click(function(){
//   //   var that = $(this).closest(".dialogbox,.reg-formlist");
//   //   console.log(valid.checkall(that));
//   // })
// }

// //校验方法
// dialogFunc();

//调用弹窗
/* $(".msg-btn").click(function(){
   dialog.showDialog($("#subscribe"));
 })*/

//关闭弹窗
$(".dialogbox .close").click(function(){
   dialog.closeDialog($(this));
})

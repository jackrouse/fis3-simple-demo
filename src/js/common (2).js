// var dialog = {
//  /**
//   * 信息提示,sDuration毫秒后消失
//   * @param  {[string]} type [分三种信息提示,"error":表示错误信息;"success":表示成功信息;"info":表示提示信息]
//   * @param  {[string]} msg  [信息的内容]
//   * @param  {[int]} sDuration  [信息提示框的展示时间(单位毫秒),默认2000毫秒]
//   */
//   showMsg: function(type, msg, callback, sDuration){
//     if($('.dialog-warp').length>0){
//       $('.dialog-warp').remove();
//     }
//     var iconClass;
//     switch(type){
//       case "error":
//         iconClass = "ico-error";
//         break;
//       case "success":
//         iconClass = "ico-success";
//         break;
//       case "info":
//         iconClass = "ico-info";
//         break;
//       default:
//         return;
//     }
//     var sDuration = sDuration || 2000;
//     var d = $('<div class="dialog-warp"><div class="dialog-body"><i class="info-ico ' + iconClass + '"></i><p class="info-msg">' + msg + '</p></div></div>').appendTo('body');
//     setTimeout(function () {
//       d.remove();
//       if(callback){
//         callback();
//       }
//     }, sDuration);
//   },
//   /**
//    * 模态确认提示框
//    * @param  {[string]}   msg      [确认提示信息]
//    * @param  {Function} callback [确认后的回调方法]
//    * @param  {Function} callback2 [取消后的回调方法]
//    */
//   confirm: function(msg, callback, callback2){
//     var confirm_html = '<div class="confirm-warp">';
//         confirm_html +='<div class="confirm-mask"></div>';
//         confirm_html +='<div class="confirm-body">';
//         confirm_html +='<div class="confirm-head">';
//         confirm_html +='<span class="confirm-headtx">确认提示</span>';
//         confirm_html +='<i class="confirm-cancel">×</i>';
//         confirm_html +='</div>';
//         confirm_html +='<div class="confirm-content">'+msg+'</div>';
//         confirm_html +='<div class="confirm-footer">';
//         confirm_html +='<button class="confirm-btn confirm-ok">确认</button>';
//         confirm_html +='<button class="confirm-btn confirm-cancel">取消</button>';
//         confirm_html +='</div>';
//         confirm_html +='</div>';
//         confirm_html +='</div>';
//     var d = $(confirm_html).appendTo('body');
//     $('.confirm-cancel').click(function(event) {
//       /* Act on the event */
//       d.remove();
//       if(callback2)callback2();
//     });
//     $('.confirm-ok').click(function(event) {
//       /* Act on the event */
//       d.remove();
//       if(callback){
//         callback();
//       }else{
//         console.log('您没有提供回调函数');
//       }
//     });
//   },
//   loading:{
//     /**
//      * 模拟加载中
//      * @param  {[string]}   etag      [需要添加加载中的元素，为空就是body]
//      * @param  {int} sDuration [提示时长，默认5s后自动消失]
//      */
//     show:function(etag,sDuration){
//       var _top,_style;
//       if(etag && etag.selector != 'body'){
//         _top = $(etag).height()/2-21;
//         _style ={
//           "padding-top":_top+"px",
//           "height": _top+42+"px"
//         }
//       }else{
//         etag = 'body';
//         _top = document.documentElement.clientHeight/2-21;
//         _style ={
//           "padding-top":_top+"px",
//           "position": "fixed",
//           "width": "100%",
//           "height": "100%",
//           "left": "0",
//           "top": "0"
//         }
//       }
//       var d = $('<div class="loading-warp"><span class="loading-content"></span>加载中…</div>');
//       d.css(_style).appendTo(etag);
//       setTimeout(function () {
//         d.remove();
//       }, sDuration || 5000);
//     },
//     /**
//      * 模拟关闭加载中
//      * @param  {[string]}   etag      [需要移除加载中的元素，为空就是body]
//      */
//     close:function(etag){
//       etag = etag || 'body';
//       $(etag).find('.loading-warp').remove();
//     }
//   },
//   /**
//    * input错误提示,sDuration毫秒后消失
//    * @param  {[elemelt]} ele dom对象
//    * @param  {[string]} msg  [信息的内容]
//    * @param  {[color]} bordercolor  [信息提示框的展示时间(单位毫秒),默认2000毫秒]
//    */
//   showAlert: function(ele,msg){
//     var ele = ele.parent();
//     var html = '';
//     html += '<div class="show-log">';
//     html += '<div class="alertcontent">';
//     html += '<div class="main-txt">';
//     html += '<span class="icon"></span>';
//     html += '<span>'+msg+'</span>';
//     html += '<span class="closeicon"></span>';
//     html += '</div>';
//     html += '<div class="layer-arrow">';
//     html += '<i class="s-line3"></i>';
//     html += '<em class="s-bg2br"></em></div></div></div>';
//     ele.find('.show-log').remove();
//     ele.append(html);
//     var _width = ele.find(".show-log").css("width");
//     ele.find(".show-log").css("margin-left",-parseInt(_width)/2);
//     ele.find(".show-log .closeicon").click(function(){
//       ele.find('.show-log').fadeOut(200).remove();
//     });
//     setTimeout(function(){
//       ele.find('.show-log').fadeOut(200).remove();
//     },3000);
//   }
// };


/**
* 分页page自动填充，翻页控制
*/
// function createPage(ele) {
//   var cur = ele.attr('data-cur');
//   var count = ele.attr('data-count');
//   var status = ele.attr('data-status');
//   //status为0，则显示上一页，下一页文本；否则就显示左右箭头文本
//   var firstCtx = status?"&lt":"上一页";
//   var lastCtx = status?"&gt":"下一页";
//   //个数小于2就不显示分页栏
//   if(parseInt(count)<2){
//     ele.html("");
//     //修复不显示搜索条数bug
//     //zhangchang 2017.2.9
//     if(ele.prev().hasClass('searchtotal')){
//       ele.next().hide();
//     }else{
//       ele.parent().show();
//     }
//     return;
//   }
//   var disable = ele.attr('data-disable');
//   var html = '<li data-page="prev">'+ firstCtx +'</li>';
//   if (cur == undefined || count == undefined || disable == 'true') {
//     return false;
//   }
//   if (parseInt(count) > 10) {
//     if ((parseInt(cur) - 5) > 0) {
//       if ((parseInt(cur) - 5) >= 2 && parseInt(cur) < (parseInt(count) -
//           3)) {
//         html += '<li data-page=1>1</li><li>···</li>';
//         for (var key = (parseInt(cur) - 3); key <= (parseInt(cur) + 2); key++) {
//           html += '<li class="' + (key == cur ? 'cur' : '') +
//             '" data-page=' + key + '>' + key + '</li>';
//         }
//         html += '<li>···</li><li data-page=' + count + '>' + count +
//           '</li>';
//       } else if ((parseInt(cur) - 5) < 2) {
//         for (var key = 1; key <= 8; key++) {
//           html += '<li class="' + (key == cur ? 'cur' : '') +
//             '" data-page=' + key + '>' + key + '</li>';
//         }
//         html += '<li>···</li><li data-page=' + count + '>' + count +
//           '</li>';
//       } else if (parseInt(cur) >= (parseInt(count) - 3)) {
//         html += '<li data-page=1>1</li><li>···</li>';
//         for (var key = (parseInt(count) - 7); key <= count; key++) {
//           html += '<li class="' + (key == cur ? 'cur' : '') +
//             '" data-page=' + key + '>' + key + '</li>';
//         }
//       }
//     } else {
//       for (var key = 1; key <= 8; key++) {
//         html += '<li class="' + (key == cur ? 'cur' : '') +
//           '" data-page=' + key + '>' + key + '</li>';
//       }
//       html += '<li>···</li><li data-page=' + count + '>' + count +
//         '</li>';
//     }

//   } else {
//     for (var key = 1; key <= count; key++) {
//       html += '<li class="' + (key == cur ? 'cur' : '') + '" data-page=' +
//         key + '>' + key + '</li>';
//     }
//   }
//   html += '<li data-page="next">'+ lastCtx +'</li>';
//   ele.html(html);
// }

// $('.otherpage').each(function(index, el) {
//   createPage($(this));
// });

// $('.otherpage').delegate('li', 'click', function(e) {
//     var page = $(this).attr('data-page'),
//       cur = $(this).parent('.page').attr('data-cur'),
//       count = $(this).parent('.page').attr('data-count');
//     if (page == undefined) {
//       return false;
//     }
//     if (page == 'prev') {
//       if (parseInt(cur) == 1) {
//         return false;
//       } else {
//         $(this).parent('.page').attr('data-cur', (parseInt(cur) - 1));
//         createPage($(this).parent('.page'));
//         return false;
//       }
//     }
//     if (page == 'next') {
//       if (parseInt(cur) == count) {
//         return false;
//       } else {
//         $(this).parent('.page').attr('data-cur', (parseInt(cur) + 1));
//         createPage($(this).parent('.page'));
//         return false;
//       }
//     }
//     $(this).parent('.page').attr('data-cur', page);
//     createPage($(this).parent('.page'));
// })
  /**
   * 扩展更新分页方法
   */
// $.fn.extend({
//   updataPage: function(status) {
//     createPage($(this),status);
//   }
// })


/**
 * @func 字数统计
 * @target 需要统计的节点dom对象
 * @maxLength 最大字数限制
 * @callback 回调函数
 */
wordcount={
  oldval : "",
  checkLength : function(target,maxLength,callback){
    var targetLength = wordcount.native2ascii(target.val(),maxLength);
    target.parents(".replyarea").find(".wordcount .num").text(Math.floor(targetLength/2));
    if(maxLength - targetLength/2 < 0){
      target.parents(".replyarea").find(".wordcount .num").addClass("error");
      target.addClass("error");
      if(callback)callback();
    }else{
      target.removeClass("error");
      target.parents(".replyarea").find(".wordcount .num").removeClass("error");
    }
  },
  limitLength : function(target,maxLength){
    var maxLength = maxLength;
    var targetLength = wordcount.native2ascii(target.val(),maxLength);
    var leftLength = maxLength - targetLength/2;
    if(leftLength < 0){
      leftLength = 0;
      target.val(wordcount.oldval)
      dialog.showMsg("error","超过"+maxLength+"个字！");
    }
    wordcount.oldval = target.val();
  },
  native2ascii : function(value,maxlength){
    var nativecode = value.split("");
    var len = 0;
    var tempval = "";
    for ( var i = 0; i < nativecode.length; i++){
      var code = Number (nativecode[i].charCodeAt(0));
      if (code > 127){
        len += 2;
      }else{
        len ++;
      }
      if(maxlength - len/2 >=0){
        tempval += nativecode[i];
      }
    }
    wordcount.oldval = tempval;
    return len;
  }
}



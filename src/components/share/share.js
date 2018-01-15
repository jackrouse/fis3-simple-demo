
window._bd_share_config = {
    common : {    
      bdText : '亿房网',  
      bdDesc : '买房就上亿房网',  
      bdUrl : 'www.fdc.com.cn',   
      onBeforeClick : function(cmd,config){
        return{
          bdText : bdstitle,  
          bdDesc : bdssummary,  
          bdUrl : bdsurl
        }
      }
    },
    share : [{
        "tag" : "share_1"
    }]
}

with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='//bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];


//with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='//bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
var bdstitle="亿房网";
var bdsurl="www.fdc.com.cn";
var bdssummary="买房就上亿房网";
;(function(){
  var oleft=null;
  var otop=null;
  $("body").on("click",".hs-share",function(event){
    event.stopPropagation();
    oleft=$(this).offset().left;
    otop=$(this).offset().top;
    bdstitle=$(this).attr("data-title")?$(this).attr("data-title"):"亿房网";
    bdsurl=$(this).attr("data-url")?$(this).attr("data-url"):"www.fdc.com.cn";
    bdssummary=$(this).attr("data-summary")?$(this).attr("data-summary"):"买房就上亿房网";
    $(this).addClass("cur");
    $("#hs-sharelist").show().offset({left:oleft,top:otop+40});
  });
  $(window).scroll(function(){ 
    $("#hs-sharelist").offset({left:oleft,top:otop+40});
  });
  
  $("body").click(function(){
    $("#hs-sharelist").hide();
    $(".hs-share").removeClass("cur");
  });
})();
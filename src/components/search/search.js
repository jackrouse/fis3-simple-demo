var tagRoll=function(){
    var speed=2000, //数字越大速度越慢
        box=$("#keywordsList"),
        ulobj=$(".keywords-list"),
        tabH=parseInt(box.height()),
        ulH = parseInt(ulobj.height()),
        time = 1,
        clonelist = $(".clonelist");
    clonelist.html(ulobj.html());
    function Marquee(){
      var topV=parseInt(ulobj.css("marginTop"));
      if(-topV == ulH){
        ulobj.css({marginTop:"0"});
        clonelist.animate({marginTop:-tabH});
        clonelist.hide();
        ulobj.animate({marginTop:-tabH});
        time = 1;
      }else{
        var value = time * tabH;
        ulobj.animate({marginTop:-value+"px"});
        time++;
        clonelist.show();
        clonelist.css({marginTop:"0"});
      }
    }
    if(ulH > tabH){
      var MyMar=setInterval(Marquee,speed);
      $("#keywordsList").mouseover(function(){
        clearInterval(MyMar);
      });//鼠标移上时清除定时器达到滚动停止的目的
      $("#keywordsList").mouseout(function(){
        MyMar=setInterval(Marquee,speed);
      });//鼠标移开时重设定时器
    }
  };
tagRoll();

var nhWebURL_house = $('#houseIndexUrl').val();
	
$.ajax({
  url:"//"+window.location.hostname+"/newhouseindex/getRecommentHouses",
  type:'GET',
  success:function(data){
    var htmlStr="";
    for(var i=0;i<data.searchRecommendList.length;i++) {
      htmlStr += '<li class="cf" bid='+data.searchRecommendList[i].id+' to-url="//'+data.searchRecommendList[i].pinyin+"."+nhWebURL_house+'">';
      htmlStr += '<div class="houseinfo f-l"><span class="housename">'+data.searchRecommendList[i].residentialName+'</span>';
      htmlStr += '<span>'+data.searchRecommendList[i].districtName+'</span><span>'+data.searchRecommendList[i].districtSubName+'</span></div>';
      htmlStr += '<div class="houseprice f-r">';
      if(data.searchRecommendList[i].averagePrice>0){
        htmlStr +='<span>均价</span><span>'+data.searchRecommendList[i].averagePrice+'元/平米</span></div></li>';}
      else{
        htmlStr +='<span>价格待定</span></div></li>';
      }
    }
    $("#rmss").html(htmlStr);
  }
});


$('body').on('click', '.rbt-month li', function(){
  var this_year = $('.rbt-year').text();
  var thisMonthStr = $(this).text();
  var this_month = thisMonthStr.substring(0, thisMonthStr.length-1);
  $.ajax({
        url: $('#proContextPath').val() + "/portal/getHouseIndexHotNewCurMonthList",
        type:'GET',
        data: {
          type: 'curMonth',
          year: this_year,
          month: this_month
        },
        success:function(data){
            // $("#hot_new_curmonth_houselist_div").html($(data).html());
            var curMonth_html_str = $(data).find('#curMonth_ul_id').html();
            $('#curMonth_ul_id').html(curMonth_html_str);
            // 拼接右侧的“全部”链接
            var yearmonthStr = '';
        if(this_month<10){
           yearmonthStr = this_year.toString() + '0' + this_month.toString();
        }
        else{
           yearmonthStr = this_year.toString() + this_month.toString();
        }
        $('#kaipan_to_all_link').attr('href', $('#portalIndexURL').val()+'/area/k'+yearmonthStr);
        }
    });
});


$('.nav-searchipt').keyup(function(event){
  if(event.keyCode == "13"){
    search($(this));
  }
});
$('.hbtn-search').click(function(){
  search($(this));
});

var search = function(_this){
  var nhIndexUrl = $('#nhIndexUrl').val();
  var input = _this.parent().find('input').val();
  input = input.trim();
  var currentUrl =window.location.href;
  if(input==null || input==undefined || input==""){
    if(currentUrl.indexOf("subway")!=-1){
      window.location.href = nhIndexUrl+"/subway";
    }else if(currentUrl.indexOf("area")!=-1){
      window.location.href = nhIndexUrl+"/area";
    }else if(currentUrl.indexOf("ditu")!=-1){
      window.location.href = nhIndexUrl+"/ditu";
    }else{
      window.location.href = nhIndexUrl;
    }
    return;
  }
  if(currentUrl.indexOf("subway")!=-1){
    window.location.href = nhIndexUrl+"/subway/"+"k9"+input;
  }
  else if(currentUrl.indexOf("area")!=-1){
    window.location.href = nhIndexUrl+"/area/"+"k9"+input;
  }
  else if(currentUrl.indexOf("ditu")!=-1){
    window.location.href = nhIndexUrl+"/ditu/"+"k9"+input;
  }
  else{
    window.location.href = nhIndexUrl+"/area/"+"k9"+input;
  }
}
$('body').on('click', '.searchlist-ul li', function(){
  window.open($(this).attr('to-url'));
})
//*******************pl:2016.09.09 从houseInfo.js 中抽取过来*********************
var searchlist = {
  showhothouse:function(){
    $(".searchlistbox .hothouse-list").slideDown();
  },
  hidesearchlist:function(){
    $(".searchlistbox .hothouse-list").slideUp();
  },
}
$(".searchlistbox .nav-searchipt").focus(function(){
  if($.trim($(this).val()).length == 0 ){
    searchlist.showhothouse();
  }else{
    searchlist.hidesearchlist();
  }
})
$(".searchlistbox .nav-searchipt").keyup(function(){
  if($.trim($(this).val()).length == 0 ){
    searchlist.showhothouse();
  }else{
    searchlist.hidesearchlist();
  }
})
//搜索框失去焦点时，隐藏下拉列表
$(".searchlistbox .nav-searchipt").blur(function(){
  setTimeout(function(){
    searchlist.hidesearchlist()
  },200);
})
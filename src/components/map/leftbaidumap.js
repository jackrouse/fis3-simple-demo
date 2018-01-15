/*周边配套*/
//地图初始化
$(function () {
  //console.log(eval("("+$(".aroundHouseData").val()+")"));
	var htmlmb = $("#infowinmb").html(),
	htmlmb2 = $("#infowinmb2").html();
	fBMap.config.infoBoxmb = htmlmb;
	fBMap.config.infoBoxmb2 = htmlmb2;
	// fBMap.init({data:$(".aroundHouseData").val()});
})
//街景切换
$(".around-tab h3").click(function(){
  var $mapState=$(".bmap-box .mapState").eq($(this).index());
  $(this).addClass("active").siblings().removeClass("active");
  $mapState.addClass('cur').siblings('.mapState').removeClass('cur');
  if($mapState.attr("id")=="panorama"){
    var setX=$("#bmap").attr("data-lng");
    var setY=$("#bmap").attr("data-lat");
    //console.log(setX);
    //console.log(setY);
    setPos(setX,setY);
    //根据经纬度坐标展示全景图
    function setPos(x,y){
      var panorama = new BMap.Panorama('panorama'); 
      panorama.setPov({heading: -40, pitch: 6});
      panorama.setPosition(new BMap.Point(x || 120.320032, y || 31.589666));
    }
    $(".search-box").hide();
  }else{
    $(".search-box").show();
  }
});

/*周边配套 end*/

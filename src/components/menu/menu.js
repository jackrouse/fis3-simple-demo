/**
 * 首页导航滑块滑动效果
 * zhangchang 2017.4.21
 */
+(function(){
	if ($(".navigation-link").length > 0) {
		var blockwidth,
			blockleft,
			curindex = $(".navigation-link .cur").index();
		/**
		 * 获取当前li的定位及宽度
		 * @param  {[type]} index [当前导航的索引值]
		 * @return {[type]}       [description]
		 */
		var getblockinfo = function (index) {
			var eleDom = $(".navigation-link .first-menu").eq(index);
			blockwidth = eleDom.width();
			blockleft = eleDom.offset().left - $(".navigation-link").offset().left;
		}
		//初始化滑块位置
		getblockinfo(curindex);
		$(".navigation-con .moveblock").css({
			"width": blockwidth,
			"left": blockleft
		});
		//$(".navigation-link .bgmask").remove()
		//鼠标移进移出时滑块事件
		$(".navigation-link .first-menu").mouseover(function () {
			var _this = $(this),
					index = _this.index();
			getblockinfo(index);
			//如果有二级菜单,展示
			if(_this.find(".header-second-title li").length > 0){
				_this.find(".second-header-container").show();
				_this.find(".first-title em").show();
			}
			$(".navigation-con .moveblock").stop(true, true).animate({
				"width": blockwidth,
				"left": blockleft
			}, 300);
		}).mouseleave(function(){
			var _this = $(this);
			_this.find(".second-header-container").hide();
			_this.find(".first-title em").hide();
		})
		$(".navigation-link").mouseleave(function () {
			/*getblockinfo(curindex);
			$(".navigation-con .moveblock").stop(true,true).animate({
					"width":blockwidth,
					"left":blockleft
			},500);*/
			$(".navigation-con .moveblock").stop(true, true).animate({
				"width": 0
			}, 300);
		});
	}
})();
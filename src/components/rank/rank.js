var rankfn={
	info:function(){
		this.timeSelect();
	},
	getYears:function(){
		return new Date().getFullYear()*1;
	},
	getMon:function(){
		return new Date().getMonth()+1;
	},
	timeSelect:function(){
		var arr=[-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6];
		var str="";
		var _this=this;
		for(var i=0;i<arr.length;i++){
			arr[i]+=this.getMon();
			if(arr[i]<=0){
				arr[i]+=12;
				str+="<li years='"+(this.getYears()-1)+"'>"+arr[i]+"</li>";
			}
			else if(arr[i]>=13){
				arr[i]-=12;
				str+="<li years='"+(this.getYears()+1)+"'>"+arr[i]+"月</li>";
			}
			else if(i==6){
				str+="<li class='active'>"+arr[i]+"月</li>";
			}else{
				str+="<li>"+arr[i]+"月</li>";
			}
		}
		$(".rbt-month").html(str);
		$(".rbt-year").html(_this.getYears());
		var $li=$(".rbt-month li");
		$li.click(function(){
			$(this).addClass("active").siblings().removeClass("active");
			if($(this).attr("years")){
				$(".rbt-year").html($(this).attr("years"))
			}else{
				$(".rbt-year").html(_this.getYears());
			}
		})
		$(".rbt-pre").click(function(){
			$(".rbt-month").animate({left:0})
		})
		
		$(".rbt-next").click(function(){
			$(".rbt-month").animate({left:-144})
		})
	}
}
rankfn.info();
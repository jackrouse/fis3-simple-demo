// $(function(){
	
//   // 楼盘评论详情
//   var comments_details = function(){
	  
// 	  /**
// 		 * 加载点评列表
// 		 * type: "house"-楼盘点评，"layout"-户型点评，"dec"-装修点评 
// 		 */
// 		var getHouseCommentsList = function(type, firstEnter, onlySeePic, queryParamStr, curpage, pagesize, reInvoke){
// 			var req_param = {
// 					bid: $('#houseId').val(),
// 					type: type,
// 					queryParamStr: queryParamStr, // 户型点评:具体户型id， 装修点评:装修类型参数
// 					page: curpage,
// 					pageSize: pagesize 
// 				};
// 			if(firstEnter == 'yes'){
// 				req_param.firstEnter = 'yes';
// 			}
// 			if(onlySeePic){
// 				req_param.hasImg = onlySeePic; // 只看有图的评论 
// 			}
// 			if(type == 'house'){
// 				req_param.commentType = 1;
// 			}
// 			if(type == 'layout'){
// 				req_param.commentType = 3;
// 			}
// 			$.ajax({
// 				url: $('#proContextPath').val() + "/comment/getHouseCommentsList",
// 				type:'GET',
// 				data: req_param,
// 				datatype: "json",
// 				success:function(data){
// 					if(type == 'house'){
// 						if(req_param.firstEnter == 'yes'){
// 							var avgScoreMap = data.avgScoreMap;
// 							if(avgScoreMap){
// 								// 总均分，各个分项平均分
// 								$('#house_koubei_id').find('.average-garde').text(avgScoreMap.avg_score_float+'分');
// 								$('#house_koubei_id').find('#house_star_id').addClass('star'+parseInt(avgScoreMap.avg_score_float)); 
// 								$('#house_koubei_id').find('#price_star_id').addClass('star'+parseInt(avgScoreMap.avg_price_score)); 
// 								$('#house_koubei_id').find('#area_star_id').addClass('star'+parseInt(avgScoreMap.avg_area_score)); 
// 								$('#house_koubei_id').find('#traff_star_id').addClass('star'+parseInt(avgScoreMap.avg_traffic_score)); 
// 								$('#house_koubei_id').find('#supp_star_id').addClass('star'+parseInt(avgScoreMap.avg_support_score)); 
// 								$('#house_koubei_id').find('#envi_star_id').addClass('star'+parseInt(avgScoreMap.avg_env_score)); 
// 							}
// 							else{
// 								$('#house_koubei_id').find('.average-garde').text('暂无');
// 							}
// 							// 这些评论亮了
// 							var nhsHotCritiqueList = data.nhsHotCritiqueList;
// 							var hot_cretique_html_str = '';
// 							var thisHotCritiqueDomHTML = $('#comment_lignt_demo_id').prop('outerHTML');
// 							// $('#comment_lignt_list_id').html('');
// 							$('#comment_lignt_demo_id').siblings().remove();
// 							if(nhsHotCritiqueList && nhsHotCritiqueList.length>0){
// 								for(var i=0;i<nhsHotCritiqueList.length;i++){
// 									var thisHotCritiqueDom = $(thisHotCritiqueDomHTML);
// 									thisHotCritiqueDom.removeAttr('id');
// 									thisHotCritiqueDom.show();
// 									var thisHotCretique = nhsHotCritiqueList[i];
// 									thisHotCritiqueDom.attr('id', thisHotCretique.id);
// 									if(thisHotCretique.userInfo && thisHotCretique.userInfo.headImageUrl){
// 										thisHotCritiqueDom.find('.comment_user_head_img').attr('data-echo', thisHotCretique.userInfo.headImageUrl);
// 									}
// 									thisHotCritiqueDom.find('.usernickname').text(thisHotCretique.userInfo?thisHotCretique.userInfo.nickName:'亿房网友');
// 									if(thisHotCretique.score){
// 										thisHotCritiqueDom.find('.bluestar').addClass('star'+parseInt(thisHotCretique.score));
// 										thisHotCritiqueDom.find('.price_star_cls').text(thisHotCretique.price_score);
// 										thisHotCritiqueDom.find('.area_star_cls').text(thisHotCretique.area_score);
// 										thisHotCritiqueDom.find('.traff_star_cls').text(thisHotCretique.traffic_score);
// 										thisHotCritiqueDom.find('.support_star_cls').text(thisHotCretique.support_score);
// 										thisHotCritiqueDom.find('.envi_star_cls').text(thisHotCretique.env_score);
// 									}
// 									thisHotCritiqueDom.find('.hot_comment_content').text(thisHotCretique.content);
// 									if(thisHotCretique.imgs){
// 										var hotImgs_str = '';
// 										for(var ii=0;ii<thisHotCretique.imgs.length;ii++){
// 											if(ii==3){
// 												break;
// 											}
// 											var thisHotImg = thisHotCretique.imgs[ii];
// 											hotImgs_str += '<li><img class="img-lazy f-l" src="//static.fdc.com.cn/nh/images/ico/loding.jpg" ';
// 											hotImgs_str += 'data-echo="'+thisHotImg.url+'" ';
// 											hotImgs_str += 'onerror="this.src=\'//static.fdc.com.cn/nh/images/ico/onerror.jpg\';event.srcElement.onerror=null;"/></li>';
// 										}
// 										thisHotCritiqueDom.find('.hot_imgs_list').html(hotImgs_str);
// 									}
// 									else{
// 										thisHotCritiqueDom.remove('.hot_imgs_list');
// 									}
// 									thisHotCritiqueDom.find('.rpflor-time li').eq(0).text(tool.getLocaleDate(thisHotCretique.gmt_created));
// 									thisHotCritiqueDom.find('.rpflor-time li').eq(1).text(tool.getLocaleTime(thisHotCretique.gmt_created));
// 									thisHotCritiqueDom.find('.rpflor-time li').eq(2).text('来自'+thisHotCretique.terminal);
// 									thisHotCritiqueDom.find('.rpflor-ope a').eq(0).text(thisHotCretique.like_count>0?thisHotCretique.like_count:0);
// 									if(thisHotCretique.isPraise=='1'){
// 										thisHotCritiqueDom.find('.rpflor-ope a').eq(0).addClass('cur');
// 									}
// 									thisHotCritiqueDom.find('.rpflor-ope a').eq(1).text(thisHotCretique.reply_count>0?thisHotCretique.reply_count:0);
// 									thisHotCritiqueDom.find('.rpflor-ope a').eq(0).attr('data-cid', thisHotCretique.id).attr('data-commentuser', thisHotCretique.created_by);
// 									thisHotCritiqueDom.find('.rpflor-ope a').eq(1).attr('data-cid', thisHotCretique.id);
// 									if(thisHotCretique.userInfo){
// 										var thisCommentUser = '';
// 										if(thisHotCretique.userInfo.nickName){
// 											thisCommentUser = thisHotCretique.userInfo.nickName;
// 										}
// 										else{
// 											thisCommentUser = thisHotCretique.userInfo.userName;
// 										}
// 										thisHotCritiqueDom.find('.rpflor-ope a').eq(1).attr('data-commentuser', thisCommentUser);
// 										thisHotCritiqueDom.find('.rpflor-ope a').eq(1).attr('data-commentuserid', thisHotCretique.userInfo.userId);
// 									}
// 									thisHotCritiqueDom.attr('id', thisHotCretique.id);
// 									hot_cretique_html_str += thisHotCritiqueDom.prop('outerHTML');
// 								}
// 								$('#comment_lignt_title_id').show();
// 								$('#comment_lignt_list_id').show();
// 								$('#comment_lignt_list_id').append(hot_cretique_html_str);
// 							}
// 							else{
// 								//hot_cretique_html_str = '<li class="emptyshow" style="padding-bottom:5px;"><em></em>暂无评论，快点来抢沙发~ </li>';
// 								$('#comment_lignt_title_id').hide();
// 								$('#comment_lignt_list_id').hide();
// 							}
// 							//$('#comment_lignt_list_id').append(hot_cretique_html_str);
// 						}
// 						// 显示最新评论列表 
// 						var commentsList = data.comments.content;
// 						var commentHTML = $('#house_comment_demo_id').prop('outerHTML');
// 						var comment_list_html_str = '';
// 						if(commentsList && commentsList.length>0){
// 							for(var k=0;k<commentsList.length;k++){
//                                 if(commentsList[k].imgs && commentsList[k].imgs.length == 0 && onlySeePic) {
//                                 	continue;
//                                 }
// 								var thisCommentDom = $(commentHTML);
// 								thisCommentDom.removeAttr('id');
// 								thisCommentDom.show();
// 								var thisComment = commentsList[k];
// 								if(thisComment.userInfo){
// 									if(thisComment.userInfo.headImageUrl){
// 										thisCommentDom.find('.head_img_cls').attr('data-echo', thisComment.userInfo.headImageUrl);
// 									}
// 									if(thisComment.userInfo.nickName){
// 										thisCommentDom.find('.usernickname').text(thisComment.userInfo?thisComment.userInfo.nickName:'亿房网友');
// 									}
// 								}
// 								if(thisComment.star_score){
// 									thisCommentDom.find('.bluestar').addClass('star'+parseInt(thisComment.star_score));
// 									thisCommentDom.find('.price_star_cls').text(thisComment.price_score);
// 									thisCommentDom.find('.area_star_cls').text(thisComment.area_score);
// 									thisCommentDom.find('.traff_star_cls').text(thisComment.traffic_score);
// 									thisCommentDom.find('.support_star_cls').text(thisComment.support_score);
// 									thisCommentDom.find('.envi_star_cls').text(thisComment.env_score);
// 								}
// 								thisCommentDom.find('.new_comment_content').text(thisComment.content);
// 								if(thisComment.imgs){
// 									var newImgs_str = '';
// 									for(var ii=0;ii<thisComment.imgs.length;ii++){
// 										var thisNewImg = thisComment.imgs[ii];
// 										newImgs_str += '<li><img class="img-lazy f-l" src="//static.fdc.com.cn/nh/images/ico/loding.jpg" ';
// 										newImgs_str += 'data-echo="'+thisNewImg.url+'" ';
// 										newImgs_str += 'onerror="this.src=\'//static.fdc.com.cn/nh/images/ico/onerror.jpg\';event.srcElement.onerror=null;"/></li>';
// 									}
// 									thisCommentDom.find('.new_comment_img_list').html(newImgs_str).show();
// 								}
// 								else{
// 									thisCommentDom.find('.new_comment_img_list').remove()
// 								}
// 								thisCommentDom.find('.rpflor-time li').eq(0).text(tool.getLocaleDate(thisComment.gmt_created));
// 								thisCommentDom.find('.rpflor-time li').eq(1).text(tool.getLocaleTime(thisComment.gmt_created));
// 								thisCommentDom.find('.rpflor-time li').eq(2).text('来自'+thisComment.terminal);
// 								thisCommentDom.find('.rpflor-ope a').eq(0).text(thisComment.like_count>0?thisComment.like_count:0);
// 								if(thisComment.isPraise=='1'){
// 									thisCommentDom.find('.rpflor-ope a').eq(0).addClass('cur');
// 								}
// 								thisCommentDom.find('.rpflor-ope a').eq(0).attr('data-cid', thisComment.id);
// 								thisCommentDom.find('.rpflor-ope a').eq(0).attr('data-commentuser', thisComment.created_by);
// 								thisCommentDom.find('.rpflor-ope a').eq(1).text(thisComment.reply_count>0?thisComment.reply_count:0);
// 								thisCommentDom.find('.rpflor-ope a').eq(1).attr('data-cid', thisComment.id);
// 								if(thisComment.userInfo){
// 									var thisCommentUser = '';
// 									if(thisComment.userInfo.nickName){
// 										thisCommentUser = thisComment.userInfo.nickName;
// 									}
// 									else{
// 										thisCommentUser = thisComment.userInfo.userName;
// 									}
// 									thisCommentDom.find('.rpflor-ope a').eq(1).attr('data-commentuser', thisCommentUser);
// 									thisCommentDom.find('.rpflor-ope a').eq(1).attr('data-commentuserid', thisComment.userInfo.userId);
// 								}
// 								thisCommentDom.attr('id', thisComment.id);
// 								comment_list_html_str += thisCommentDom.prop('outerHTML');
// 							}
// 							if(curpage == 1){
// 								var totalCount = data.comments.totalCount;
// 								$('#total_page_num').val(Math.ceil(totalCount/10));
// 								if(Math.ceil(totalCount/10)>1){
// 									$('#house_koubei_id .morecomment').show();
// 								}
// 								else{
// 									$('#house_koubei_id .morecomment').hide();
// 								}
// 								$('#house_comment_demo_id').nextAll().remove();
// 								$('#house_new_comment_list_id').append(comment_list_html_str);
//                                 $('#house_comment_demo_id').hide();
// 							}
// 							else{
// 								if(commentsList.length == 10){
// 									$('#house_koubei_id .morecomment').show();
// 								}
// 								else{
// 									$('#house_koubei_id .morecomment').hide();
// 								}
// 								$('#house_new_comment_list_id').append(comment_list_html_str);
// 							}
// 							// 数据加载成功后，才设置“当前页”curpage值
// 							$('#house_comment_page_hdn_id').val(curpage);
// 						}
// 						else{ // 无返回数据
// 							if(curpage == 1){
// 								$('#house_koubei_id .morecomment').hide();
// 								$('#house_comment_demo_id').nextAll().remove();
// 								var no_comment_html_str = '<li class="emptyshow" style="padding-bottom:5px;"><em></em>暂无评论，快点来抢沙发~ </li>';
// 								$('#house_new_comment_list_id').append(no_comment_html_str);
// 							}
// 							else{
// 								$('#house_koubei_id .morecomment').hide();
// 							}
// 						}
// 					}
// 					if(type == 'layout'){
// 						// 显示最新评论列表 
// 						var commentsList = data.comments.content;
// 						var commentHTML = $('#layout_comment_demo_id').prop('outerHTML');
// 						var comment_list_html_str = '';
// 						if(commentsList && commentsList.length>0){
// 							for(var k=0;k<commentsList.length;k++){
// 								var thisCommentDom = $(commentHTML);
// 								thisCommentDom.removeAttr('id');
// 								thisCommentDom.show();
// 								var thisComment = commentsList[k];
// 								if(thisComment.userInfo){
// 									if(thisComment.userInfo.headImageUrl){
// 										thisCommentDom.find('.head_img_cls').attr('data-echo', thisComment.userInfo.headImageUrl);
// 									}
// 									if(thisComment.userInfo.nickName){
// 										thisCommentDom.find('.usernickname').text(thisComment.userInfo?thisComment.userInfo.nickName:'亿房网友');
// 									}
// 								}
// 								if(thisComment.star_score){
// 									thisCommentDom.find('.bluestar').addClass('star'+thisComment.star_score);
// 								}
// 								thisCommentDom.find('.layout_obj_name').text(thisComment.apartment_name);
// 								thisCommentDom.find('.new_comment_content').text(thisComment.content);
// 								if(thisComment.imgs){
// 									var newImgs_str = '';
// 									for(var ii=0;ii<thisComment.imgs.length;ii++){
// 										var thisNewImg = thisComment.imgs[ii];
// 										newImgs_str += '<li><img class="img-lazy f-l" src="//static.fdc.com.cn/nh/images/ico/loding.jpg" ';
// 										newImgs_str += 'data-echo="'+thisNewImg.url+'" ';
// 										newImgs_str += 'onerror="this.src=\'//static.fdc.com.cn/nh/images/ico/onerror.jpg\';event.srcElement.onerror=null;"/></li>';
// 									}
// 									thisCommentDom.find('.new_comment_img_list').html(newImgs_str);
// 								}
// 								else{
// 									thisCommentDom.find('.new_comment_img_list').remove()
// 								}
// 								thisCommentDom.find('.rpflor-time li').eq(0).text(tool.getLocaleDate(thisComment.gmt_created));
// 								thisCommentDom.find('.rpflor-time li').eq(1).text(tool.getLocaleTime(thisComment.gmt_created));
// 								thisCommentDom.find('.rpflor-time li').eq(2).text('来自'+thisComment.terminal);
// 								thisCommentDom.find('.rpflor-ope a').eq(0).text(thisComment.like_count>0?thisComment.like_count:0);
// 								if(thisComment.isPraise=='1'){
// 									thisCommentDom.find('.rpflor-ope a').eq(0).addClass('cur');
// 								}
// 								thisCommentDom.find('.rpflor-ope a').eq(0).attr('data-cid', thisComment.id);
// 								thisCommentDom.find('.rpflor-ope a').eq(0).attr('data-commentuser', thisComment.created_by);
// 								thisCommentDom.find('.rpflor-ope a').eq(1).text(thisComment.reply_count>0?thisComment.reply_count:0);
// 								thisCommentDom.find('.rpflor-ope a').eq(1).attr('data-cid', thisComment.id);
// 								if(thisComment.userInfo){
// 									var thisCommentUser = '';
// 									if(thisComment.userInfo.nickName){
// 										thisCommentUser = thisComment.userInfo.nickName;
// 									}
// 									else{
// 										thisCommentUser = thisComment.userInfo.userName;
// 									}
// 									thisCommentDom.find('.rpflor-ope a').eq(1).attr('data-commentuser', thisCommentUser);
// 									thisCommentDom.find('.rpflor-ope a').eq(1).attr('data-commentuserid', thisComment.userInfo.userId);
// 								}
// 								thisCommentDom.attr('id', thisComment.id);
// 								comment_list_html_str += thisCommentDom.prop('outerHTML');
// 							}
// 							if(curpage == 1){
// 								var totalCount = data.comments.totalCount;
// 								$('#total_page_num').val(Math.ceil(totalCount/10));
// 								if(Math.ceil(totalCount/10)>1){
// 									$('#layout_koubei_id .morecomment').show();
// 								}
// 								else{
// 									$('#layout_koubei_id .morecomment').hide();
// 								}
// 								$('#layout_comment_demo_id').nextAll().remove();
// 								$('#layout_new_comment_list_id').append(comment_list_html_str);
// 							}
// 							else{
// 								if(commentsList.length == 10){
// 									$('#layout_koubei_id .morecomment').show();
// 								}
// 								else{
// 									$('#layout_koubei_id .morecomment').hide();
// 								}
// 								$('#layout_new_comment_list_id').append(comment_list_html_str);
// 							}
// 							// 数据加载成功后，才设置“当前页”curpage值
// 							$('#layout_comment_page_hdn_id').val(curpage);
// 						}
// 						else{ // 无返回数据
// 							if(curpage == 1){
// 								$('#layout_koubei_id .morecomment').hide();
// 								$('#layout_comment_demo_id').nextAll().remove();
// 								var no_comment_html_str = '<li class="emptyshow" style="padding-bottom:5px;"><em></em>暂无评论，快点来抢沙发~ </li>';
// 								$('#layout_new_comment_list_id').append(no_comment_html_str);
// 							}
// 							else{
// 								$('#layout_koubei_id .morecomment').hide();
// 							}
// 						}
// 					}
// 					if(type == 'dec'){
// 						if(req_param.firstEnter == 'yes'){
// 							var dec_work_step_dictlist = data.dec_work_step_dictlist;
// 							var dec_work_step_htmlStr = '';
// 							for(var m=0;m<dec_work_step_dictlist.length;m++){
// 								var this_step_elm = dec_work_step_dictlist[m];
// 								dec_work_step_htmlStr += '<a href="javascript:;" class="ds-check" data-tag="'+this_step_elm.code+'">'+this_step_elm.name+'</a>'; 
// 							}
// 							$('#dec_step_all').nextAll().remove();
// 							$('#dec_step_all').after(dec_work_step_htmlStr);
// 							var dec_design_space_dictlist = data.dec_design_space_dictlist;
// 							var dec_design_spacep_htmlStr = '';
// 							for(var m=0;m<dec_design_space_dictlist.length;m++){
// 								var this_space_elm = dec_design_space_dictlist[m];
// 								dec_design_spacep_htmlStr += '<a href="javascript:;" class="ds-check" data-tag="'+this_space_elm.code+'">'+this_space_elm.name+'</a>'; 
// 							}
// 							$('#dec_space_all').nextAll().remove();
// 							$('#dec_space_all').after(dec_design_spacep_htmlStr);
// 						}
// 						var decTotalCount = data.decTotalCount;
// 						var dec_comment_list = data.dec_comment_list;
// 						var commentHTML = $('#dec_comment_demo_id').prop('outerHTML');
// 						var comment_list_html_str = '';
// 						if(decTotalCount && dec_comment_list){
// 							for(var k=0;k<dec_comment_list.length;k++){
// 								var thisCommentDom = $(commentHTML);
// 								thisCommentDom.removeAttr('id');
// 								thisCommentDom.show();
// 								var thisComment = dec_comment_list[k];
// 								thisCommentDom.find('.head_img_cls').attr('data-echo', thisComment.userImgUrl);
// 								thisCommentDom.find('.usernickname').text(thisComment.userNickName);
// 								var dec_comment_title_str = thisComment.title ;
// 								if(thisComment.decLink){ // 装修环节
// 									dec_comment_title_str += '/'+thisComment.decLink;
// 								}
// 								if(thisComment.decSpace){ // 装修空间
// 									dec_comment_title_str += '/'+thisComment.decSpace;
// 								}
// 								thisCommentDom.find('.rpflor-mark-tit').text(dec_comment_title_str);
// 								thisCommentDom.find('.rpflor-txt span').text(thisComment.content);
// 								if(thisComment.imgs && thisComment.imgs.length>0){
// 									var newImgs_str = '';
// 									for(var ii=0;ii<thisComment.imgs.length;ii++){
// 										var thisImgURL = thisComment.imgs[ii];
// 										newImgs_str += '<li><img class="img-lazy f-l" src="//static.fdc.com.cn/nh/images/ico/loding.jpg" ';
// 										newImgs_str += 'data-echo="'+thisImgURL+'" ';
// 										newImgs_str += 'onerror="this.src=\'//static.fdc.com.cn/nh/images/ico/onerror.jpg\';event.srcElement.onerror=null;"/></li>';
// 									}
// 									thisCommentDom.find('.comment_img_list').html(newImgs_str);
// 								}
// 								else{
// 									thisCommentDom.find('.comment_img_list').remove();
// 								}
// 								comment_list_html_str += thisCommentDom.prop('outerHTML');
// 							}
// 							if(curpage == 1){
// 								$('#total_page_num').val(Math.ceil(decTotalCount/10));
// 								// $('#dec_koubei_id .morecomment').show();
// 								$('#dec_comment_demo_id').nextAll().remove();
// 								$('#dec_new_comment_list_id').append(comment_list_html_str);
// 							}
// 							else{
// 								$('#dec_new_comment_list_id').append(comment_list_html_str);
// 							}
// 							// 数据加载成功后，才设置“当前页”curpage值
// 							$('#dec_comment_page_hdn_id').val(curpage);
// 							if(dec_comment_list.length == 10){ // 等于10条时，才显示“更多”按钮
// 								$('#dec_koubei_id .morecomment').show();
// 							}
// 							else{
// 								$('#dec_koubei_id .morecomment').hide();
// 							}
// 						}
// 						else{
// 							$('#dec_comment_demo_id').nextAll().remove();
// 							$('#dec_koubei_id .morecomment').hide();
// 							var no_comment_html_str = '<li class="emptyshow" style="padding-bottom:5px;"><em></em>暂无评论，快点来抢沙发~ </li>';
// 							$('#dec_new_comment_list_id').append(no_comment_html_str);
							
// 						}
// 					}
// 					// 懒加载
// 		        	Echo.init({
// 		        		  offset: 500, //距离可视区
// 		        		  throttle: 50 //延迟时间
// 		        	});
// 		        	buildcomment.reputlist();
// 		        	// 调用回调函数，处理其他页面跳转过来需要定位的逻辑
// 		        	if(reInvoke){
// 		        		reInvoke();
// 		        	}
// 				}
// 			});
// 		}
		
		
// 		var gotoanchor = function(){
// 		    if (window.location.hash && window.location.hash != null) {
// 			    var anchor = window.location.hash.replace("#", "");
// 			    var isReply = $("#isReply").val();
// 			    if(isReply=="1"){
// 			      $('html').animate({scrollTop:$('#'+anchor).offset().top-200}, 800);
// 			      commentReply($("#"+anchor).find(".rpflor-pl"), anchor); //回复
// 			    }else if(isReply=="0"){
			    	
// 			    }else{
// 			    	if(anchor){
//                         $('html').animate({scrollTop:$('#'+anchor).offset().top-200}, 800);
//                         commentAttention($('#'+anchor).find('.rpflor-dz')); //点赞
// 					}
// 			    }
// 		    }
// 		}
		

		
// 		// 删除“户型选择tab”
// 		$('.houst-type-condition .close').on('click', function(){
// 	    	$('#layout_apartment_id').val('');
// 	    	$('#layout_housing_type_name').val('');
// 	    	$('#layout_house_style_name').val('');
// 	    	$('#layout_housing_type_acreage').val('')
// 	    	$('.houst-type-condition').hide();
// 	    	getHouseCommentsList('layout', null, null, null, 1, 10);
// 		});
		
// 		// 点击tab页，切换列表展示
// 		$('.tag_change_list').on('click', 'li', function(){
// 			var tagType = $(this).attr('tagType');
// 			$('.tag_change_list').nextAll().hide();
// 			// 切换后，查询列表数据
// 			$('#'+tagType+'_id').show();
// 			var query_type = tagType.split('_')[0];
// 			if(query_type == 'dec'){ // 清空“装修评论”的查询条件
// 				$('#dec_step_all').addClass('cur').siblings().removeClass('cur');
// 				$('#dec_space_all').addClass('cur').siblings().removeClass('cur');
// 				$('#dec_from_all').addClass('cur').siblings().removeClass('cur');
// 			}
// 			// 点击标签tab后，清空户型参数
// 			$('#layout_apartment_id').val('');
// 			$('#layout_housing_type_name').val('');
// 			$('#layout_house_style_name').val('');
// 			$('#layout_housing_type_acreage').val('')
// 			$('.houst-type-condition a').text('');
// 			$('.houst-type-condition').hide();
// 			// 查询结果列表
//             if(query_type == 'house'){

//             } else {
//                 getHouseCommentsList(query_type, 'yes', null, null, 1, 10);
// 			}
// 		});
		
		
		
// 		// “楼盘点评”只看有图？
// 		$('#house_onlyseeimg_id').on('click', function(){
// 			if($(this).hasClass('cur')){ // 取消“只看有图”
// 				$(this).removeClass('cur');
// 				getHouseCommentsList('house', null, null, null, 1, 10);
// 			}
// 			else{ // 添加“只看有图”
// 				$(this).addClass('cur');
// 				getHouseCommentsList('house', null, 1, null, 1, 10);
// 			}
// 		});
		
// 		// “户型点评”只看有图？
// 		$('#layout_onlyseeimg_id').on('click', function(){
// 			// 是否有“选择具体户型”，若有，则添加此参数
// 			var layout_apartment_id = null;
// 			if($('#layout_apartment_id').val()){
// 				layout_apartment_id = $('#layout_apartment_id').val();
// 			}
// 			if($(this).hasClass('cur')){ // 取消“只看有图”
// 				$(this).removeClass('cur');
// 				getHouseCommentsList('layout', null, null, layout_apartment_id, 1, 10);
// 			}
// 			else{ // 添加“只看有图”
// 				$(this).addClass('cur');
// 				getHouseCommentsList('layout', null, 1, layout_apartment_id, 1, 10);
// 			}
// 		});
		
		
// 		// “楼盘点评” 加载更多！
// 		$('#house_koubei_id .morecomment').on('click', function(){
// 			var cur_page = $('#house_comment_page_hdn_id').val();
// 			var onlyShowImg = $('#house_onlyseeimg_id').hasClass('cur')?1:null
// 			var this_max_page_num = $('#total_page_num').val();
// 			if(parseInt(cur_page)+1 > this_max_page_num){
// 				$('#house_koubei_id .morecomment').hide();
// 			}
// 			else{
// 				getHouseCommentsList('house', null, onlyShowImg, null, parseInt(cur_page)+1, 10);
// 			}
// 		});
		
// 		// “户型点评” 加载更多！
// 		$('#layout_koubei_id .morecomment').on('click', function(){
// 			var cur_page = $('#layout_comment_page_hdn_id').val();
// 			var onlyShowImg = $('#layout_onlyseeimg_id').hasClass('cur')?1:null;
// 			// 是否有“选择具体户型”，若有，则添加此参数
// 			var layout_apartment_id = null;
// 			if($('#layout_apartment_id').val()){
// 				layout_apartment_id = $('#layout_apartment_id').val();
// 			}
// 			var this_max_page_num = $('#total_page_num').val();
// 			if(parseInt(cur_page)+1 > this_max_page_num){
// 				$('#layout_koubei_id .morecomment').hide();
// 			}
// 			else{
// 				getHouseCommentsList('layout', null, onlyShowImg, layout_apartment_id, parseInt(cur_page)+1, 10);
// 			}
// 		});
		
		
// 		// “装修口碑”加载更多
// 		$('#dec_koubei_id .morecomment').on('click', function(){
// 			var cur_page = $('#dec_comment_page_hdn_id').val();
// 			var this_query_param = '';
// 			var dec_step_value = $('#dec_step_div a.cur').data('tag');
// 			var dec_space_value = $('#dec_space_div a.cur').data('tag');
// 			//var dec_from_value = $('#dec_from_div a.cur').data('tag');
// 			if(!(dec_step_value==''&&dec_space_value=='')){
// 				this_query_param += (dec_step_value==''?'N':dec_step_value)+'_';
// 				this_query_param += (dec_space_value==''?'N':dec_space_value);
// 				//this_query_param += (dec_from_value==''?'N':dec_from_value);
// 			}
// 			var this_max_page_num = $('#total_page_num').val();
// 			if(parseInt(cur_page)+1 > this_max_page_num){
// 				$('#dec_koubei_id .morecomment').hide();
// 			}
// 			else{
// 				getHouseCommentsList('dec', null, null, this_query_param, parseInt(cur_page)+1, 10);
// 			}
// 		});
		
// 		// 点击“装修口碑”的条件tag，切换查询
// 		$('#dec_koubei_id').on('click', '.ds-check', function(){
// 			$(this).addClass('cur').siblings().removeClass('cur');
// 			var this_query_param = '';
// 			var dec_step_value = $('#dec_step_div a.cur').data('tag');
// 			var dec_space_value = $('#dec_space_div a.cur').data('tag');
// 			//var dec_from_value = $('#dec_from_div a.cur').data('tag');
// 			if(!(dec_step_value==''&&dec_space_value=='')){
// 				this_query_param += (dec_step_value==''?'N':dec_step_value)+'_';
// 				this_query_param += (dec_space_value==''?'N':dec_space_value);
// 				//this_query_param += (dec_from_value==''?'N':dec_from_value);
// 			}
// 			getHouseCommentsList('dec', null, null, this_query_param, 1, 10);
// 		});
		
		
// 		/*  评论“点赞”  */
// 		$('#house_koubei_id,#layout_koubei_id').on('click', '.rpflor-dz', function(){
// 			commentAttention($(this));
// 		});
		
// 		// 输入框的聚焦事件
// 		$('body').on('focus', 'textarea.ctx', function(){
// 			$(this).next('p.remind').hide();
// 		});
		
// 		/*  查看评论“回复列表”  */
// 		$('#house_koubei_id,#layout_koubei_id').on('click', '.rpflor-pl', function(){
// 			if($(this).closest('.rpflor-buttom').next('.rp-replybox').html()){
// 				$(this).closest('.rpflor-buttom').nextAll().remove();
// 			}
// 			else{
// 				// 关闭掉其他的评论列表
// 				$('.rp-replybox.replyarea').remove();
// 				// 展示自己的评论列表
// 				var this_cid = $(this).data('cid');
// 				var this_commentuser = $(this).data('commentuser');
// 				var this_commentuserid = $(this).data('commentuserid');
// 				var cur_this_dom = $(this);
// 				getReplyList(this_cid, 1, 5, this_commentuserid, this_commentuser, function(res){
// 					cur_this_dom.closest('.rpflor-buttom').nextAll().remove();
// 					cur_this_dom.closest('.rpflor-buttom').after(res);
// 					cur_this_dom.closest('.rpflor-buttom').next('.replyarea').find('textarea.ctx').attr('toUserId', this_commentuserid);
// 					// 重新init分页插件
// 					cur_this_dom.closest('.rpflor-buttom').next('.replyarea').find('.pageReply').updataPage();
// 					// 懒加载
// 		        	Echo.init({
// 		        		  offset: 500, //距离可视区
// 		        		  throttle: 50 //延迟时间
// 		        	});
// 				});
// 			}
// 		});

//       /*回复*/
//       var commentReply = function(eleDom, num){
//           var userId = configTool.getLoginUid();
//           if (typeof(userId) == "undefined") {//未登录
//               dialoglogin.creatlogin();
//           } else {//已登录
//               eleDom.click();
//           }
//       }

//       // init 加载“楼盘点评”
//       if($('#layout_apartment_id').val()){ // 如果传了“户型参数”
//           $('.tag_change_list li[tagType="layout_koubei"]').addClass('active').siblings().removeClass('active');
//           $('.tag_change_list').nextAll().hide();
//           // 切换后，查询列表数据
//           $('#layout_koubei_id').show();
//           if($('#layout_housing_type_name').val()){
//               var house_type_choice_txt = $('#layout_housing_type_name').val() + ' ' + $('#layout_house_style_name').val() + ' ' + $('#layout_housing_type_acreage').val()+'平米';
//               $('.houst-type-condition a').text(house_type_choice_txt);
//               $('.houst-type-condition').show();
//           }
//           getHouseCommentsList('layout', null, null, $('#layout_apartment_id').val(), 1, 10, gotoanchor);
//       } else {
//           gotoanchor();
//       }
//       // else{
//       // 	getHouseCommentsList('house', 'yes', null, null, 1, 10, gotoanchor);
//       // }

// 		$('body').on('click','.btn-rpreply',function(){
// 			if($('textarea.ctx').val().trim() == ''){
// 				common_dialog.showMsg("error","输入内容不能为空！");
// 				return false;
// 			}
// 			if(!buildcomment.wordcount.wordcountState){
// 				common_dialog.showMsg("error","输入内容不能超过120个字符！");
// 				return false;
// 			}
// 		    var userId = configTool.getLoginUid();
// 		    // userId = '58eaf42788b95830258fee2c';
// 		    if (typeof(userId) == "undefined") {//未登录
// 		        dialoglogin.creatlogin();
// 		    } else { //已登录
// 		    	var reply_content = $(this).closest('.replyarea').find('.ctx').val();
// 		    	var reply_cid = $(this).closest('.replyarea').find('.ctx').data('cid');
// 		    	var reply_url = $(this).closest('.replyarea').find('.ctx').data('url');
// 		    	var to_userid = $(this).closest('.replyarea').find('.ctx').attr('toUserId');
// 		    	var replyType = $(this).closest('.replyarea').find('.ctx').attr('replyType');
// 		    	var cur_reply_div_dom = $(this).closest('.replyarea');
// 		    	// 调用“回复”方法
// 		        to_reply(userId, reply_cid, reply_content, reply_url, to_userid, replyType, function(){ // 回调函数
// 		        	common_dialog.showMsg("success","回复成功");
// 		        	var old_reply_count =cur_reply_div_dom.prev('.rpflor-buttom').find('.rpflor-pl').text();
// 		        	cur_reply_div_dom.prev('.rpflor-buttom').find('.rpflor-pl').text(parseInt(old_reply_count)+1)
// 					var this_commentuser = cur_reply_div_dom.prev('.rpflor-buttom').find('.rpflor-pl').data('commentuser');
// 					var this_commentuserid = cur_reply_div_dom.prev('.rpflor-buttom').find('.rpflor-pl').data('commentuserid');
// 					// 回复成功后，需要拼接参数，回调“查询回复列表”的方法
// 					getReplyList(reply_cid, 1, 5, this_commentuserid, this_commentuser, function(res){ // 回调函数
// 						var this_criq_dom = cur_reply_div_dom.prev('.rpflor-buttom');
// 						this_criq_dom.nextAll().remove();
// 						this_criq_dom.after(res);
// 						this_criq_dom.next('.replyarea').find('textarea.ctx').attr('toUserId', this_commentuserid);
// 						this_criq_dom.next('.replyarea').find('.pageReply').updataPage();
// 						// 懒加载
// 			        	Echo.init({
// 			        		  offset: 500, //距离可视区
// 			        		  throttle: 50 //延迟时间
// 			        	});
// 					});
		        	
// 		        });
// 		    }
// 		    return false;
// 		  });
		
		
// 		$('body').on('click', '.pageReply li', function(){
// 			if(!$(this).hasClass('cur')){
// 				// 处理查询列表参数！
// 				var rpflor_dom = $(this).closest('.replyarea').prev('.rpflor-buttom').find('.rpflor-pl');
// 				var this_cid = rpflor_dom.data('cid');
// 				var this_commentuser = rpflor_dom.data('commentuser');
// 				var this_commentuserid = rpflor_dom.data('commentuserid');
// 				// 处理分页数据！
// 				var this_page = $(this).attr('data-page');
// 				var cur_page = $(this).closest('.pageReply').attr('data-cur');
// 				var max_page = $(this).closest('.pageReply').attr('data-count');
// 				if(this_page=='prev'){
// 					if(cur_page == 1){
// 						return;
// 					}
// 					else{
// 						getReplyList(this_cid, parseInt(cur_page)-1, 5, this_commentuserid, this_commentuser, function(res){
// 							rpflor_dom.closest('.rpflor-buttom').nextAll().remove();
// 							rpflor_dom.closest('.rpflor-buttom').after(res);
// 							rpflor_dom.closest('.rpflor-buttom').next('.replyarea').find('textarea.ctx').attr('toUserId', this_commentuserid);
// 							// 重新init分页插件
// 							rpflor_dom.closest('.rpflor-buttom').next('.replyarea').find('.pageReply').updataPage();
// 							// 懒加载
// 				        	Echo.init({
// 				        		  offset: 500, //距离可视区
// 				        		  throttle: 50 //延迟时间
// 				        	});
// 						});
						
// 					}
// 				}
// 				else if(this_page=='next'){
// 					if(cur_page == max_page){
// 						return;
// 					}
// 					else{
// 						getReplyList(this_cid, parseInt(cur_page)+1, 5, this_commentuserid, this_commentuser, function(res){
// 							rpflor_dom.closest('.rpflor-buttom').nextAll().remove();
// 							rpflor_dom.closest('.rpflor-buttom').after(res);
// 							rpflor_dom.closest('.rpflor-buttom').next('.replyarea').find('textarea.ctx').attr('toUserId', this_commentuserid);
// 							// 重新init分页插件
// 							rpflor_dom.closest('.rpflor-buttom').next('.replyarea').find('.pageReply').updataPage();
// 							// 懒加载
// 				        	Echo.init({
// 				        		  offset: 500, //距离可视区
// 				        		  throttle: 50 //延迟时间
// 				        	});
// 						});
// 					}
// 				}
// 				else{
// 					getReplyList(this_cid, this_page, 5, this_commentuserid, this_commentuser, function(res){
// 						rpflor_dom.closest('.rpflor-buttom').nextAll().remove();
// 						rpflor_dom.closest('.rpflor-buttom').after(res);
// 						rpflor_dom.closest('.rpflor-buttom').next('.replyarea').find('textarea.ctx').attr('toUserId', this_commentuserid);
// 						// 重新init分页插件
// 						rpflor_dom.closest('.rpflor-buttom').next('.replyarea').find('.pageReply').updataPage();
// 						// 懒加载
// 			        	Echo.init({
// 			        		  offset: 500, //距离可视区
// 			        		  throttle: 50 //延迟时间
// 			        	});
// 					});
// 				}
				
// 			}
// 		});
		
// 		// 对“评论的回复”做“回复”
// 		$('body').on('click', '.reply_rpl_cls', function(){
// 			var to_user_name = $(this).closest('.rpreply-ctx').find('.nickname-info').find('em').eq(0).text();
// 			$(this).closest('.replyarea').find('.remind').text('回复'+to_user_name+'：最多输入500字');
// 			var to_user_id = $(this).closest('.rpreply-ctx').find('.nickname-info').attr('thisRplUserid');
// 			$(this).closest('.replyarea').find('.ctx').attr('toUserId', to_user_id);
// 			$(this).closest('.replyarea').find('.ctx').attr('replyType', 2);
// 			$(this).closest('.replyarea').find('.remind').show();
// 		});
		
// 		// 是否需要默认进入“户型评论”tab页
// 		if($('#tagtype_default').val()){
// 			var tagtype_default = $('#tagtype_default').val();
// 			$('li[tagtype="'+tagtype_default+'"]').trigger('click');
// 		}
		
		
// 		//  ###################################  “页面公共部分”  ###################################
		
// 		/**
// 		 * 口碑排名及评分（小区门户右侧）
// 		 */
// 		$.ajax({
// 	        url: $('#proContextPath').val() + "/portal/getGoodWordHouseList",
// 	        type:'GET',
// 	        data: {
// 	        	bid: $('#houseId').val()
// 	        },
// 	        success:function(data) {
// 	            var thisBid = $('#houseId').val();
// 	            var districtName = data.districtName;
// 	            var thisHouseScore = data.thisHouseScore;
// 	            $('#koubei_score_id').text(thisHouseScore);
// 	            $('#koubei_star_id').addClass('star' + parseInt(thisHouseScore));
// 	            $('#koubei_area_name_id').text(districtName + '小区用户口碑TOP5');
// 	            var htmlElm = $('#koubei_list_title_id').next();
// 	            if (data.goodWordHouseList) {
// 	                var goodWordHouseList = data.goodWordHouseList;
// 	                var html_str = '';
// 	                for (var i = 0; i < goodWordHouseList.length; i++) {
// 	                    var thisHouseElm = goodWordHouseList[i];
// 	                    if (thisHouseElm.bid == thisBid) {
// 	                        htmlElm.find('.rank-num').before('<div class="ranktop"><span>本小区排名第' + thisHouseElm.sort + '</span></div>');
// 	                    }
// 	                    else {
// 	                        if (htmlElm.find('.rank-num').prev()) {
// 	                            htmlElm.find('.rank-num').prev().remove();
// 	                        }
// 	                    }
// 	                    htmlElm.find('.rank-num').text(thisHouseElm.sort);
// 	                    htmlElm.find('.rank-houseName').text(thisHouseElm.residentialName);
// 	                    // var this_avg_sorce = thisHouseElm.avgScore.avg_score_float;
// 	                    var this_avg_sorce = thisHouseElm.avg_score;
// 	                    htmlElm.find('.score-bar-grad').css('width', ((this_avg_sorce / 5).toFixed(2)) * 100 + '%');
// 	                    htmlElm.find('.score-bar-num').text(this_avg_sorce.toFixed(1) + '分');
// 	                    if (thisHouseElm.avgScore) {
// 	                        htmlElm.find('.single-group li').eq(0).find('.bold').text(thisHouseElm.avgScore.avg_price_score.toFixed(1) + '分'); // 价格
// 	                        htmlElm.find('.single-group li').eq(1).find('.bold').text(thisHouseElm.avgScore.avg_area_score.toFixed(1) + '分'); // 地段
// 	                        htmlElm.find('.single-group li').eq(2).find('.bold').text(thisHouseElm.avgScore.avg_traffic_score.toFixed(1) + '分'); // 交通
// 	                        htmlElm.find('.single-group li').eq(3).find('.bold').text(thisHouseElm.avgScore.avg_support_score.toFixed(1) + '分'); // 配套
// 	                        htmlElm.find('.single-group li').eq(4).find('.bold').text(thisHouseElm.avgScore.avg_env_score.toFixed(1) + '分'); // 环境
// 	                    }
// 	                    else {
// 	                        htmlElm.find('.single-group li').eq(0).find('.bold').text('暂无'); // 价格
// 	                        htmlElm.find('.single-group li').eq(1).find('.bold').text('暂无'); // 地段
// 	                        htmlElm.find('.single-group li').eq(2).find('.bold').text('暂无'); // 交通
// 	                        htmlElm.find('.single-group li').eq(3).find('.bold').text('暂无'); // 配套
// 	                        htmlElm.find('.single-group li').eq(4).find('.bold').text('暂无'); // 环境
// 	                    }
// 	                    html_str += htmlElm.prop('outerHTML');
// 	                }
// 	                $('#koubei_list_title_id').nextAll().remove();
// 	                $('#koubei_list_title_id').after(html_str);
// 	            }
// 	        }
// 		});
		
// 		var scrollAutoMove_this = function(){
// 			var speed=80; //数字越大速度越慢
// 		    var tab=document.getElementById("rpswiper-auto");
// 		    var tab1=document.getElementById("curlist1");
// 		    var tab2=document.getElementById("curlist2");
// 		    tab2.innerHTML=tab1.innerHTML;
// 		    //初始化延时加载图片
// 		    Echo.init({
// 		      offset: 500,  //距离可视区
// 		      throttle: 50  //延迟时间
// 		    });

// 		    function Marquee(){
// 		      if(tab2.offsetTop-tab.scrollTop<=tab.offsetTop){
// 		        tab.scrollTop-=tab1.offsetHeight;
// 		      }else{
// 		        tab.scrollTop++;
// 		      }
// 		    }
// 		    var MyMar=setInterval(Marquee,speed);
// 		    tab.onmouseover=function() {clearInterval(MyMar)};//鼠标移上时清除定时器达到滚动停止的目的
// 		    tab.onmouseout=function() {MyMar=setInterval(Marquee,speed)};//鼠标移开时重设定时器

			
// 		}
		
// 		// 获取“同区域小区实时口碑”
// 		var getCommentListData = function(){
// 		    var regionId = $('#districtShortKey').val();
// 		    var housebid=$('#houseId').val();
// 		    $.ajax({
// 		      url: $('#proContextPath').val() + "/queryNhsCritiqueWithRegional",
// 		      type:'GET',
// 		      data: {regionId:regionId,bid:housebid,v:new Date().getTime()},
// 		      success: function (data) {
// 		         var commentList = data.content;
// 		         var comment_list_html_str = '';
// 		         var comment_demo_dom_html = $('#same_area_koubei_demo_li').prop('outerHTML');
// 		         for(var i=0;i<commentList.length;i++){
// 		        	 var demo_dom = $(comment_demo_dom_html).removeAttr('id').show();
// 		        	 var this_comment = commentList[i];
// 		        	 if(this_comment.userInfo && this_comment.userInfo.headImageUrl){
// 		        		 demo_dom.find('.comment_head_img_cls').attr('data-echo', this_comment.userInfo.headImageUrl);
// 		        	 }
// 		        	 else{
// 		        		 demo_dom.find('.comment_head_img_cls').attr('data-echo', '//static.fdc.com.cn/nh/images/default-user.png');
// 		        	 }
// 		        	 var userNickName = '';
// 		        	 if(this_comment.userInfo){
// 		        		 userNickName = this_comment.userInfo.nickName || this_comment.userInfo.userName || '亿房网友';
// 		             }else{
// 		            	 userNickName = '亿房网友';
// 		             }
// 		        	 demo_dom.find('.comment_user_nickname').text(userNickName);
// 		        	 demo_dom.find('.comment_time').text(this_comment.intervalTime);
// 		        	 demo_dom.find('.comment_house_name').text(this_comment.base_name)
// 		        	 demo_dom.find('.comment_house_name').attr('href', this_comment.houseCommentUrl)
// 		        	 demo_dom.find('.mystar').addClass('star'+parseInt(this_comment.star_score));
// 		        	 demo_dom.find('.comment_content').text(this_comment.content);
// 		        	 if(this_comment.imgs){
// 		        		 var comment_img_html_str = '';
// 		        		 for(var k=0;k<this_comment.imgs.length;k++){
// 		        			 var thisImg = this_comment.imgs[k];
// 		        			 comment_img_html_str += '<li><img class="img-lazy f-l" src="//static.fdc.com.cn/nh/images/ico/loding.jpg" ';
// 		        			 comment_img_html_str += 'data-echo="'+thisImg.url+'" ';
// 		        			 comment_img_html_str += 'onerror="this.src=\'//static.fdc.com.cn/nh/images/ico/onerror.jpg\';event.srcElement.onerror=null;"/></li>';
// 		        		 }
// 		        		 demo_dom.find('.comment_img_list').html(comment_img_html_str);
// 		        	 }
// 		        	 else{
// 		        		 demo_dom.find('.comment_img_list').remove();
// 		        	 }
		        	 
// 		        	 comment_list_html_str += demo_dom.prop('outerHTML');
// 		         }
// 		         $('#same_area_koubei_demo_li').remove();
// 		         $('#curlist1').append(comment_list_html_str);
// 		         scrollAutoMove_this();
// 		         // 懒加载
// 		         Echo.init({
// 		        	 offset: 500, //距离可视区
// 		        	 throttle: 50 //延迟时间
// 		         });
// 		      }
// 		    });
// 		}
		
// 		getCommentListData();
		
		
		
// 		// 获取“小区门户"底部"楼盘列表"（最新楼盘，最热楼盘，本月开盘）
// 		$.ajax({
// 			url: $('#proContextPath').val() + "/portal/getHouseIndexHotNewCurMonthList",
// 			type:'GET',
// 			data: {
// 				type: 'all'
// 			},
// 			success:function(data){
// 				$("#hot_new_curmonth_houselist_div").html($(data).html());
// 				// 取当前月份，查询“开盘列表”
// 			    var thisDate = new Date();
// 			    var y = thisDate.getFullYear();
// 			    var m = thisDate.getMonth()+1;
// 			    var yearmonthStr = '';
// 			    if(m<10){
// 			       yearmonthStr = y.toString() + '0' + m.toString();
// 			    }
// 			    else{
// 			       yearmonthStr = y.toString() + m.toString();
// 			    }
// 			    $('#kaipan_to_all_link').attr('href', $('#portalIndexURL').val()+'/area/k'+yearmonthStr);
// 			    // 加载下面月份插件
//                 try {
//                     rankfn.info();
//                 }catch (e){
//                     console.log(e);
//                 }
// 			}
// 		});
	  
//   }
  
  
  
  
//   // #################### 进入评论列表页  ####################
//   if($('#thisPageTypeHdn').val() == 'comments'){
// 	  comments_details();
//   }
  
  
  
// });



// /*点赞*/
// function commentAttention(eleDom){
//   var userId = configTool.getLoginUid();
//   // var userId = '58eaf42788b95830258fee2c';
//   if (typeof(userId) == "undefined") {//未登录
//     dialoglogin.creatlogin();
//   } else {//已登录
//     var commentId=eleDom.data("cid");
//     var commentUser=eleDom.data("commentuser");
//     var likeCount=eleDom.text();
//     // likeCount=likeCount.substring(1,likeCount.length-1);
// 	if(eleDom.hasClass("like")){
//         if(eleDom.find(".comment-attention").hasClass("attentioned")){
//             likeCount=parseFloat(likeCount)-1;
//         }else{
//             likeCount=parseFloat(likeCount)+1;
// 		}
// 	}else{
//         if(eleDom.hasClass("cur")){//已经点赞
//             likeCount=parseFloat(likeCount)-1;
//         }else{
//             likeCount=parseFloat(likeCount)+1;
//         }
// 	}
//     var domNode=eleDom;
//     var pinyin=$("#pinyin").val();
//     var bid=$("#houseId").val();
//     $.ajax({
//       url: $('#proContextPath').val() + "/comment/addCommentsLike",
//       type: 'POST',
//       data: {userid:userId,cid:commentId,updateCount:likeCount,pinyin:pinyin,toUserid:commentUser,bid:bid},
//       success: function (data, textStatus, jqXHR) {
//         if(data.success){
// 			if(domNode.hasClass("like")){
//                 if(domNode.find(".comment-attention").hasClass("attentioned")){
//                     common_dialog.showMsg("success","取消成功");
//                 }else{
//                     common_dialog.showMsg("success","点赞成功");
//                 }
//                 domNode.find(".comment-attention").html("<em></em>"+likeCount);
//                 domNode.find(".comment-attention").toggleClass("attentioned");
// 			}else{
//                 if(domNode.hasClass("cur")){
//                     common_dialog.showMsg("success","取消成功");
//                 }else{
//                     common_dialog.showMsg("success","点赞成功");
//                 }
//                 domNode.text(likeCount);
//                 domNode.toggleClass("cur");
// 			}
//         }else{
//         	common_dialog.showMsg("error",data.msg);
//         }
//       },
//       error: function () {
//         if(domNode.hasClass("cur")){
//         	common_dialog.showMsg("error","取消失败");
//         }else{
//         	common_dialog.showMsg("error","点赞失败");
//         }
//       }
//     });
//   }
// }

// /** 回复的评论列表 */
// var getReplyList = function(id, pageIndex, pageSize, userid, nickname, reInvokeFun){
// 	  var reply_to_user_text = '';
// 	  if(nickname!=null && nickname!=""){
// 		  reply_to_user_text = "回复 "+nickname+"：最多输入120字";
// 	  }
// 	  else{
// 		  reply_to_user_text = "回复亿房网友 ：最多输入120字";
// 	  }
// 	  $.ajax({
// 	    url: $('#proContextPath').val() + "/comment/getReplyByCid",
// 	    data: {cid:id, curpage:pageIndex, pagesize:pageSize, timestamp:new Date()},
// 	    success: function (data) {
// 	    	var thisCommentReplysDom = $(data);
// 	    	thisCommentReplysDom.find('p.remind').text(reply_to_user_text);
// 	    	var comment_url = '//'+$('#pinyin').val()+'.'+$('#houseIndexUrl').val();
// 	    	comment_url += '/comment?isReply=1&page='+thisCommentReplysDom.find('.pageReply').data('cur');
// 	    	comment_url += '&randNum'+Math.floor(Math.random()*10)+'#'+id;
// 	    	thisCommentReplysDom.find('.ctx').attr('data-url', comment_url);
// 	    	reInvokeFun(thisCommentReplysDom.prop('outerHTML'));
// 	    },
// 	    error: function () {
	    	
// 	    }
// 	  });
// }


// // 评论or回复（对回复做回复）
// var to_reply =function(reuserId, cid, content, url, to_userid, replyType, reInvokeFun){
// 	  content=content.trim();
// 	  if(content==null||content==""){
// 		  common_dialog.showMsg("error","回复内容不能为空");
// 	    return;
// 	  }
// 	  $.ajax({
// 	    url: $('#proContextPath').val() + "/comment/replyCritique",
// 	    data: {cid:cid,content:content,url:url,userid:reuserId,replyType:replyType,toUserId:to_userid},
// 	    success: function (data, textStatus, jqXHR) {
// 	      if(data.success){
// 	        // critiqueData(param);
// 	    	reInvokeFun();
// 	        // dialog.showMsg("success","回复成功");
// 	      }else{
// 	    	  common_dialog.showMsg("error", data.msg);
// 	      }
// 	    },
// 	    error: function () {

// 	    }
// 	  });
// }
		
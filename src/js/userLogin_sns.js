// #############################  弹窗登录方法    ################################

/**
	 *弹出层登录
	 */
	var dialoglogin = {
		/**
	   * shunzizhan 20160121
	   * 创建弹出下拉登录
	   * @param  {[int]} x [面板距离浏览器左边的距离]
	   * @param  {[int]} y [面板距离浏览器顶部的距离]
	   * @return {[type]}   [description]
	   */
		creatlogin:function(){
	    var buildstr='<div class="dialoglogin">'
		    						+'<div class="dialog-login">'
		    							+'<i class="closeicon"></i>'
		                  +'<div class="group-item">'
		                  +'  <input type="text" class="dropdown-user" required>'
		                  +'  <span class="dropdown-placeholder">请输入手机号/会员名/邮箱</span>'
		                  +'</div>'
		                  +'<div class="group-item">'
		                  +'  <input type="password" class="dropdown-pwd" required>'
		                  +'  <span class="dropdown-placeholder">请输入密码</span>'
		                  +'</div>'
		                  +'<div class="group-item login-tips">'
		                  +'  <a href="//uc.fdc.com.cn/regmain.html#method=statistics&spm=fdc01.1014.pcxxx.a0005xxx" class="f-l">注册帐号</a>'
		                  +'  <a href="//uc.fdc.com.cn/reggetpwd.html">忘记密码?</a>'
		                  +'  <span class="error"></span>'
		                  +'</div>'
                          +'<div class="group-item"><button class="btn-dialog-login">登录</button></div>'
		                  +'<div class="group-item">'
		                  +'  <p>您还可以通过其他快捷方式登录</p>'
		                  +'  <a class="dropdown-3rd dropdown-QQ" id="qq"></a>'
		                  +'  <a class="dropdown-3rd dropdown-WX" id="wechat"></a>'
		                  +'  <a class="dropdown-3rd dropdown-WB" id="weibo"></a>'
		                  +'</div>'
		                +'</div>'
		                +'<div class="dialogmark"></div>'
	                +'</div>';
	    $("body").append(buildstr);
	    $(".dropdown-login").remove();
		}
	}

$(function(){

	$("body").on("click",".dialoglogin .closeicon",function(){
		$(".dialoglogin").remove();
	})
	/**
   * 张畅 20160329
   * 输入用户名、密码时，错误提示消失
   */
  $("body").on('keyup, focus, blur','.dialog-login input',function(){
    if($(this).val().length>0){
      $('.dialog-login .error').text("");
    }
  });
  /**
   * 张畅 20160329
   * 解决placeholder在ie中的兼容性问题
   * @return {[type]}     [description]
   */
  $("body").on('focus','.dialog-login input',function(){
    // $(".dropdown-placeholder").removeClass('dropdown-hide');
    $(this).siblings('span').addClass('dropdown-hide');
  });
  $("body").on('blur','.dialog-login input',function(){
    if($(this).val().length >1){
      $(this).siblings('span').addClass('dropdown-hide');
    }else{
      $(this).siblings('span').removeClass('dropdown-hide');
    }
  });
  $("body").on('click','.dialog-login .dropdown-placeholder',function(){
    // $(this).addClass('dropdown-hide');
    $(this).siblings('input').focus();
  });
  /**
   * 张畅 20160329
   * 第三方登录
   */
  $("body").on("click",".dialog-login #qq, .dialog-login #wechat, .dialog-login #weibo",function(){
    var url="ucaction.login.third." + jQuery(this).attr("id") +".pass";
    // var url=baseUrl +"login/third/pass";
    var uid=decodeURIComponent(cookie.Get("uc_userInfo")),
        tempUrl=decodeURIComponent(cookie.Get("uc_curUrl")),
        token=decodeURIComponent(cookie.Get("uc_token"));
    var myparams={
      userid:uid != "null" ? uid : undefined,
      //curUrl:tempUrl != "null" ? tempUrl:BASE_URL+"sns/index",
      curUrl:tempUrl != "null" ? tempUrl:BASE_URL,
      // invaliddata:new Date().getTime(),
      token:token !="null" ? token : ""
    }
    fdcLog("fdc01.1015.pcxxx.a0005xxx");
    configTool.ajax1(url,"Get",myparams,function(res,success){
      if(res[success]){
        console.log("第三方登录成功……");
        window.location.href=res[success].data.url;
      }else{
        configTool.showError(res);
      }
    })
  })
  /**
   * 张畅 20160330
   * 点击登录按钮进行登录
   */
  $("body").on("click",".dialoglogin .btn-dialog-login",function(){
    var paramsdata={
      loginType:4,
      loginName:jQuery('.dialoglogin .dropdown-user').val(),
      userPasswd:jQuery('.dialoglogin .dropdown-pwd').val(),
      autoLogin:1,
      anomymousId:decodeURIComponent(uc_cookie.Get("uc_userInfo"))
    }
    if(paramsdata.loginName == '' || paramsdata.loginName == undefined || paramsdata.userPasswd == '' || paramsdata.userPasswd == undefined) {
      jQuery('.dialoglogin .dialog-login .error').text("用户名或密码不能为空");
      // return false;
    }else{
      fdcLog("fdc01.1016.pcxxx.a0005xxx");
    	optionUserInfo.getUserInfo(paramsdata);
    }
  })
  $("body").on('keyup','.dialog-login input',function(e){
    // var e= window.event || event;
    if(e.keyCode == 13){
      // console.log(111);
      optionUserInfo.loginFun();
    }
  })

})

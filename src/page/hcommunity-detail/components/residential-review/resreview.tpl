<div class="container-main space__top review__wrapper" id="commentContent">
  <div class="review__header cf">
    <h3 class="f-l review__tit">武汉恒大城悦湖公馆小区点评</h3>
    <span class="f-l review__order review__order--active">按时间顺序</span>
    <span class="f-l review__order">按热度顺序</span>
    <a class="list__nav-item--more">更多</a>
  </div>
  <div class="review__total bg-main cf">
    <span class="review__total-score">综合评分</span>
    <span class="review__total-num">4.0分</span>
    <span class="mystar star1">
      <span class="fullstar"></span>
    </span>
    <span class="review__total-house">
      位置好(245) | 户型好(836) | 绿化多(630) | 交通方便(730)
    </span>
    <span class="review__total-write f-r"><i></i>写评论</span>
  </div>
  <div class="reviewList__wrapper">
    <ul>
      <li class="reviewList__item cf">
        <div class="reviewList__info f-l">
          <img src="" alt="" class="reviewList__info-img bbs-placeholder-img">
          <div class="reviewList__info-head">
            <span class="reviewList__info-name">戴恩与月亮</span>
            <span class="reviewList__info-class">小学6年级</span>
          </div>
          <div class="reviewList__info-bottom">
            <ul class="cf reviewList__info-count">
              <li>
                <div>帖子</div>
                <div>22</div>
              </li>
              <li>
                <div>帖子</div>
                <div>22</div>
              </li>
              <li>
                <div>帖子</div>
                <div>22</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="reviewList__content f-l">
          <div class="reviewList__content-head cf">
            <span class="reviewList__content-score">4.0分</span>
            <span class="mystar star1">
              <span class="fullstar"></span>
            </span>
            <!-- <span class="reviewList__content-score"></span> -->
            <span class="reviewList__content-num">
              <span>地段 4.8</span>
              <span>价格 4.8</span>
              <span>配套 4.8</span>
              <span>环境 4.8</span>
            </span>
            <span class="f-r btn-review-friend">已加友好</span>
          </div>
          <div class="reviewList__content-des">
            我一直以为赛洛城挺偏僻的，没想到6号线开通了。还挺方便的，在金银湖公园站下了坐个公交车，没几站就到了，周边还有一个湖，小区绿化做的挺好，环境还不错。了解了一下，感觉中建比周边的楼盘好像贵那么一点点，但是毕竟开发商的口碑在那里。我觉得到时买的也会放心一些吧
          </div>
          <div class="reviewList__content-imgList cf">
            <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
            <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
            <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
            <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
            <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
            <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
            <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
            <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
            <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
          </div>
          <div class="reviewList__content-footer cf">
            <span class="reviewList__content-date f-l">2017-02-23 18:00:19</span>
            <div class="f-r">
              <span class="reviewList__content-action f-l reviewList__prasize">
                <i class="reviewList__content-attention reviewList__content-attention--active"></i>
                <span class="reviewList__content-count">30</span>
              </span>
              <span class="reviewList__content-action f-l reviewList__rewNum" data-num="30" data-cid="5a1b625e5da307278a9f299a" data-commentuser="小一一bhx">
                <i class="reviewList__content-coments"></i>
                <span class="reviewList__content-count">30</span>
              </span>
            </div>
          </div>
          <div class="reviewList__detail hide">
            <div class="reviewList__areaWrap " data-bind="css:{'reviewList__areaWrap--border':viewModel.replyList().length>0}">
              <div class="reviewList__listNum">56条评论</div>
              <div class="reviewList__inputWrap">
                <textarea class="reviewList__input"  data-bind="attr: { placeholder: '回复老王' }"></textarea>
                <span class="reviewList__cancle">取消</span>
                <span class="btn-review--publish makeComents">评论</span>
              </div>
            </div>
            <div class="reviewList__review-wrap">
              <!-- ko if:viewModel.replyList().length -->
              <!-- ko foreach:{data:viewModel.replyList(),as:"value"} -->
              <div class="reviewList__review-item cf">
                <img class="f-l reviewList__review-img" data-bind="attr: { src: value.imgSrc }" alt="">
                <div class="f-l  reviewList__review-r">
                  <div class="reviewList__review-head">
                    <span class="reviewList__review-name" data-bind="text:value.usernickname"></span>
                     <!-- ko if: value.tousernickname -->
                    <span>回复</span>
                    <span class="reviewList__review-name" data-bind="text:value.tousernickname"></span>
                     <!-- /ko  -->
                  </div>

                  <div class="reviewList__review-content" data-bind="text:value.content"></div>
                  <div class="reviewList__content-footer cf">
                    <span class="reviewList__content-date f-l" data-bind="text:value.gmtModifyFormat"></span>
                    <div class="f-r">
                      <span class="reviewList__reply" data-bind="attr:{thisrpluserid:value.thisRplUserid,toUserId:value.userId}">回复</span>
                      <!-- <span class="reviewList__content-action f-l">
                        <i class="reviewList__content-attention reviewList__content-attention--active"></i>
                        <span class="reviewList__content-count">30</span>
                      </span>
                      <span class="reviewList__content-action f-l">
                        <i class="reviewList__content-coments"></i>
                        <span class="reviewList__content-count">30</span>
                      </span> -->
                    </div>
                  </div>
                </div>
              </div>
              <!-- /ko -->
              <!-- /ko  -->
            </div>
            <div class="reviewList__more">
              <span class="btn-review--more">查看更多评论</span>
            </div>
          </div>
        </div>
      </li>
      <li class="reviewList__item reviewList__item--last cf">
        <div class="reviewList__info f-l">
          <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="" class="reviewList__info-img">
          <div class="reviewList__info-head">
            <span class="reviewList__info-name">戴恩与月亮</span>
            <span class="reviewList__info-class">小学6年级</span>
          </div>
          <div class="reviewList__info-bottom">
            <ul class="cf reviewList__info-count">
              <li>
                <div>帖子</div>
                <div>22</div>
              </li>
              <li>
                <div>帖子</div>
                <div>22</div>
              </li>
              <li>
                <div>帖子</div>
                <div>22</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="reviewList__content f-l">
          <div class="reviewList__content-head cf">
            <span class="reviewList__content-score">4.0分</span>
            <span class="mystar star1">
              <span class="fullstar"></span>
            </span>
            <!-- <span class="reviewList__content-score"></span> -->
            <span class="reviewList__content-num">地段 4.8 价格 4.8 配套 4.8 环境 4.8</span>
            <span class="f-r btn-review--white">加好友</span>
          </div>
          <div class="reviewList__content-des">
            我一直以为赛洛城挺偏僻的，没想到6号线开通了。还挺方便的，在金银湖公园站下了坐个公交车，没几站就到了，周边还有一个湖，小区绿化做的挺好，环境还不错。了解了一下，感觉中建比周边的楼盘好像贵那么一点点，但是毕竟开发商的口碑在那里。我觉得到时买的也会放心一些吧
          </div>
          <div class="reviewList__content-imgList cf">
            <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
            <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
            <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
            <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
            <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
            <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
            <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
            <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
            <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
          </div>
          <div class="reviewList__content-footer cf">
            <span class="reviewList__content-date f-l">2017-02-23 18:00:19</span>
            <div class="f-r">
              <span class="reviewList__content-action f-l reviewList__prasize">
                <i class="reviewList__content-attention"></i>
                <span class="reviewList__content-count">30</span>
              </span>
              <span class="reviewList__content-action f-l reviewList__rewNum" data-num="30" data-cid="5a1b625e5da307278a9f299a" data-commentuser="小一一bhx">
                <i class="reviewList__content-coments"></i>
                <span class="reviewList__content-count">30</span>
              </span>
            </div>
          </div>

        </div>
      </li>
    </ul>
  </div>
  <div class="reviewList__wrapper" style="display:none;">
      <ul>
        <li class="reviewList__item cf">
          <div class="reviewList__info f-l">
            <img src="" alt="" class="reviewList__info-img bbs-placeholder-img">
            <div class="reviewList__info-head">
              <span class="reviewList__info-name">按热度排序</span>
              <span class="reviewList__info-class">小学6年级</span>
            </div>
            <div class="reviewList__info-bottom">
              <ul class="cf reviewList__info-count">
                <li>
                  <div>帖子</div>
                  <div>22</div>
                </li>
                <li>
                  <div>帖子</div>
                  <div>22</div>
                </li>
                <li>
                  <div>帖子</div>
                  <div>22</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="reviewList__content f-l">
            <div class="reviewList__content-head cf">
              <span class="reviewList__content-score">4.0分</span>
              <span class="mystar star1">
                <span class="fullstar"></span>
              </span>
              <!-- <span class="reviewList__content-score"></span> -->
              <span class="reviewList__content-num">地段 4.8 价格 4.8 配套 4.8 环境 4.8</span>
              <span class="f-r  btn-review--white">加好友</span>
            </div>
            <div class="reviewList__content-des">
              我一直以为赛洛城挺偏僻的，没想到6号线开通了。还挺方便的，在金银湖公园站下了坐个公交车，没几站就到了，周边还有一个湖，小区绿化做的挺好，环境还不错。了解了一下，感觉中建比周边的楼盘好像贵那么一点点，但是毕竟开发商的口碑在那里。我觉得到时买的也会放心一些吧
            </div>
            <div class="reviewList__content-imgList cf">
              <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
              <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
              <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
              <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
              <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
              <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
              <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
              <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
              <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
            </div>
            <div class="reviewList__content-footer cf">
              <span class="reviewList__content-date f-l">2017-02-23 18:00:19</span>
              <div class="f-r">
                <span class="reviewList__content-action f-l reviewList__prasize">
                  <i class="reviewList__content-attention"></i>
                  <span class="reviewList__content-count">30</span>
                </span>
                <span class="reviewList__content-action f-l reviewList__rewNum" data-num="30" data-cid="5a1b625e5da307278a9f299a" data-commentuser="小一一bhx">
                  <i class="reviewList__content-coments"></i>
                  <span class="reviewList__content-count">30</span>
                </span>
              </div>
            </div>
            <div class="reviewList__detail hide">
              <div class="reviewList__areaWrap">
                <div class="reviewList__listNum">56条评论</div>
                <div class="reviewList__inputWrap">
                  <textarea class="reviewList__input"  data-bind="attr: { placeholder: '回复老王' }"></textarea>
                  <span class="reviewList__cancle">取消</span>
                  <span class="btn-review--publish makeComents">评论</span>
                </div>
              </div>
              <div class="reviewList__review-wrap">
                <!-- ko if:viewModel.replyList().length -->
                <!-- ko foreach:{data:viewModel.replyList(),as:"value"} -->
                <div class="reviewList__review-item cf">
                  <img class="f-l reviewList__review-img" data-bind="attr: { src: value.imgSrc }" alt="">
                  <div class="f-l  reviewList__review-r">
                    <div class="reviewList__review-head">
                      <span class="reviewList__review-name" data-bind="text:value.usernickname"></span>
                       <!-- ko if: value.tousernickname -->
                      <span>回复</span>
                      <span class="reviewList__review-name" data-bind="text:value.tousernickname"></span>
                       <!-- /ko  -->
                    </div>
  
                    <div class="reviewList__review-content" data-bind="text:value.content"></div>
                    <div class="reviewList__content-footer cf">
                      <span class="reviewList__content-date f-l" data-bind="text:value.gmtModifyFormat"></span>
                      <div class="f-r">
                        <span class="reviewList__reply" data-bind="attr:{thisrpluserid:value.thisRplUserid,toUserId:value.userId}">回复</span>
                        <!-- <span class="reviewList__content-action f-l">
                          <i class="reviewList__content-attention reviewList__content-attention--active"></i>
                          <span class="reviewList__content-count">30</span>
                        </span>
                        <span class="reviewList__content-action f-l">
                          <i class="reviewList__content-coments"></i>
                          <span class="reviewList__content-count">30</span>
                        </span> -->
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /ko -->
                <!-- /ko  -->
              </div>
              <div class="reviewList__more">
                <span class="btn-review--more">查看更多评论</span>
              </div>
            </div>
          </div>
        </li>
        <li class="reviewList__item reviewList__item--last cf">
          <div class="reviewList__info f-l">
            <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="" class="reviewList__info-img">
            <div class="reviewList__info-head">
              <span class="reviewList__info-name">戴恩与月亮</span>
              <span class="reviewList__info-class">小学6年级</span>
            </div>
            <div class="reviewList__info-bottom">
              <ul class="cf reviewList__info-count">
                <li>
                  <div>帖子</div>
                  <div>22</div>
                </li>
                <li>
                  <div>帖子</div>
                  <div>22</div>
                </li>
                <li>
                  <div>帖子</div>
                  <div>22</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="reviewList__content f-l">
            <div class="reviewList__content-head cf">
              <span class="reviewList__content-score">4.0分</span>
              <span class="mystar star1">
                <span class="fullstar"></span>
              </span>
              <!-- <span class="reviewList__content-score"></span> -->
              <span class="reviewList__content-num">地段 4.8 价格 4.8 配套 4.8 环境 4.8</span>
              <span class="f-r  btn-review--white">加好友</span>
            </div>
            <div class="reviewList__content-des">
              我一直以为赛洛城挺偏僻的，没想到6号线开通了。还挺方便的，在金银湖公园站下了坐个公交车，没几站就到了，周边还有一个湖，小区绿化做的挺好，环境还不错。了解了一下，感觉中建比周边的楼盘好像贵那么一点点，但是毕竟开发商的口碑在那里。我觉得到时买的也会放心一些吧
            </div>
            <div class="reviewList__content-imgList cf">
              <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
              <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
              <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
              <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
              <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
              <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
              <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
              <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
              <img src="http://upload.fdc.com.cn/2017/1212/1513063799738.jpg" alt="">
            </div>
            <div class="reviewList__content-footer cf">
              <span class="reviewList__content-date f-l">2017-02-23 18:00:19</span>
              <div class="f-r">
                <span class="reviewList__content-action f-l reviewList__prasize">
                  <i class="reviewList__content-attention"></i>
                  <span class="reviewList__content-count">30</span>
                </span>
                <span class="reviewList__content-action f-l reviewList__rewNum">
                  <i class="reviewList__content-coments"></i>
                  <span class="reviewList__content-count">30</span>
                </span>
              </div>
            </div>
  
          </div>
        </li>
      </ul>
    </div>
</div>
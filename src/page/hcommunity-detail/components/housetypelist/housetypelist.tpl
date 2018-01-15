<div class="container-main bg-main space__top" id="houseTypeContent">
  <div class="list__nav cf">
    <span class="list__nav-item list__nav-item--active">户型图 </span>
    <span class="list__nav-item list__nav-netHouse">网上售楼处</span>
    <div class="listType__nav">
      <span class="listType__nav-item listType__nav-item--active" data-room-id="all">全部</span>
      <span class="listType__nav-item" data-room-id="g301">一室</span>
      <span class="listType__nav-item" data-room-id="g302">二室</span>
      <span class="listType__nav-item" data-room-id="g303">三室</span>
      <span class="listType__nav-item" data-room-id="g304">四室</span>
      <a class="list__nav-item--more">更多</a>
      
    </div>
    <a class="list__nav-item--more netHouse__more">更多</a>
    <!-- <span class="list__nav-item">三室</span>
    <span class="list__nav-item">四室</span> -->
  </div>
  <div class="content__wrapper cf">

    <div class="listType__listWrap  f-l" id="listType__listWrap">
      <a href="" class="listType__listItem cf">
        <div class="f-l listItem__pic">
          <img src="" alt="" class="house-placeholder-img">
          <span class="listItem__sale-on houseType__label">在售</span>
        </div>
        <div class="listItem__baseInfo f-l">
          <div class="listItem__wrapper cf">
            <span class="listItem__type">A2户型/3室2厅1厨1卫</span>
            <span class="listItem__attention">
              <i class="listItem__attention-icon"></i>

              34567
            </span>
            <span class="listItem__price f-r">
              <span class="listItem__num-red numFont">23700</span>元/m²
            </span>
          </div>
          <div class="listItem__wrapper">
            <span class="listItem__count">套内面积:208.6㎡</span>
            <span class="listItem__count">套数:共130套</span>
            <span class="listItem__count">套数:共130套</span>

          </div>
          <div class="listItem__wrapper listItem__comment">
            <span>户型点评：</span>
            <span class="listItem__comment-des"> 房间大小适中，双厅大，所有房间都朝南。还有个 小书房，公摊面试小。
            </span>

          </div>
          <div class="cf">
            <div class="listItem__label f-l">
              <span class="house__label-item--small">南北通透</span>
              <span class="house__label-item--small">南北通透</span>
              <span class="house__label-item--small">南北通透</span>
              <span class="house__label-item--small">南北通透</span>
            </div>
            <div class="listItem__view f-r btn-primary">
              查看该户型房源
            </div>
          </div>
          <span class="listItem__houseNum">
            <span class="listItem__num-red numFont">23700</span>万/套
          </span>
        </div>
      </a>
      <a href="" class="listType__listItem cf">
        <div class="f-l listItem__pic">
          <img src="https://static.fdc.com.cn/avatar/homebase/5a274329a093c0093bb8668c_giqsT.jpg@132w_88h" alt="">
          <span class="listItem__sale-out">在售</span>
        </div>
        <div class="listItem__baseInfo f-l">
          <div class="listItem__wrapper cf">
            <span class="listItem__type">A2户型/3室2厅1厨1卫</span>
            <span class="listItem__attention">
              <i class="listItem__attention-icon"></i>

              34567
            </span>
            <span class="listItem__price f-r">
              <span class="listItem__num-red numFont">23700</span>元/m²
            </span>
          </div>
          <div class="listItem__wrapper">
            <span class="listItem__count">套内面积:208.6㎡</span>
            <span class="listItem__count">套数:共130套</span>
            <span class="listItem__count">套数:共130套</span>

          </div>
          <div class="listItem__wrapper listItem__comment">
            <span>户型点评：</span>
            <span class="listItem__comment-des"> 房间大小适中，双厅大，所有房间都朝南。还有个 小书房，公摊面试小。
            </span>

          </div>
          <div class="cf">
            <div class="listItem__label f-l">
              <span class="house__label-item--small">南北通透</span>
              <span class="house__label-item--small">南北通透</span>
              <span class="house__label-item--small">南北通透</span>
              <span class="house__label-item--small">南北通透</span>
            </div>
            <div class="listItem__view f-r btn-primary">
              查看该户型房源
            </div>
          </div>
          <span class="listItem__houseNum">
            <span class="listItem__num-red numFont">23700</span>万/套
          </span>
        </div>
      </a>
      <!-- ko if:viewModel.houseTypeData().length -->
      <!-- ko foreach:{data:viewModel.houseTypeData(),as:"value"} -->
      <a href="" class="listType__listItem cf">
        <div class="f-l listItem__pic">
          <img data-bind="attr:{src:value.imgs[0].imgSrc}" src="" alt="">
          <!-- ko if: value.sellStatus =='x201' || value.sellStatus =='x203' -->
          <span class="listItem__sale-on">在售</span>
          <!-- /ko -->
          <!-- ko if: value.sellStatus =='x202' -->
          <span class="listItem__sale-ready">待售</span>
          <!-- /ko -->
          <!-- ko if: value.sellStatus =='x204' -->
          <span class="listItem__sale-out">售罄</span>
          <!-- /ko -->
        </div>
        <div class="listItem__baseInfo f-l">
          <div class="listItem__wrapper cf">
            <span class="listItem__type" data-bind="text: value.imgs[0].imgName"></span>
            <!-- <span class="listItem__attention">
                <i class="listItem__attention-icon"></i>
  
                34567
              </span> -->
            <span class="listItem__price f-r">
              <span class="listItem__num-red numFont" data-bind="text:value.avagPrice">23700</span>元/m²
            </span>
          </div>
          <div class="listItem__wrapper">
            <span class="listItem__count" data-bind="text:'建筑面积:'+value.coveredArea+'㎡'"></span>
            <span class="listItem__count" data-bind="text:'套内面积:'+value.insideSpace+'㎡'"></span>
            <span class="listItem__count" data-bind="text:'套数:共'+value.totalNumber+'套'">套数:共130套</span>

          </div>
          <div class="listItem__wrapper listItem__comment">
            <span>户型点评：</span>
            <span class="listItem__comment-des" data-bind="text: value.imgs[0].imgDesc"></span>

          </div>
          <div class="cf">
            <div class="listItem__label f-l">
              <!-- ko if:value.houseTypeTag -->
              <!-- ko foreach:{data:value.houseTypeTag,as:"label"} -->
              <span class="house__label-item--small" data-bind="text:label.labelDesc">南北通透</span>
              <!-- /ko -->
              <!-- /ko  -->
            </div>
            <div class="listItem__view f-r btn-primary">
              查看该户型房源
            </div>
          </div>
          <span class="listItem__houseNum">
            <span class="listItem__num-red numFont">23700</span>万/套
          </span>
        </div>
      </a>
      <!-- /ko -->
      <!-- /ko  -->
      <div class="reviewList__more listType__loadMore">
        <span class="btn-review--more">查看更多</span>
      </div>
    </div>

    <div class="listType__listWrap f-l" id="netHouse__wrapper" style="display:none;">
        <ul class="netHouseSale__title cf">
            <li class="netHouseSale__title--img">户型</li>
            <li class="netHouseSale__title--content">序号</li>
            <li class="netHouseSale__title--content">平方</li>
            <li class="netHouseSale__title--content">备案价</li>
            <li class="netHouseSale__title--content">推荐理由</li>
        </ul>
        <div class="cf netHouseSale__box">
            <div class="netHouseSale__img f-l">
                <div class="netHouse__list-l">
                  <span class="listItem__sale-on ">在售</span>
                  <span class="netHouse__total">共129套，均价10885元/m²</span>
                  <img src="" alt="" class="netHouse__pic house-placeholder-img">
                  <span class="netHouse__type">3室2厅2卫8号楼K-93</span>
                  <div class="netHouse__baseInfo">
                    <span class="netHouse__baseInfo-item">全朝南 | </span>
                    <span class="netHouse__baseInfo-item">全朝南 | </span>
                    <span class="netHouse__baseInfo-item">全朝南</span>
                  </div>
                  <div class="listItem__view  btn-primary">
                    查看该户型房源
                  </div>
                </div>
            </div>
            <ul class="netHouseSale__content f-l">
                <li><span>8栋1单元2层03号</span></li>
                <li><span>93m²</span></li>
                <li><span>1111m²/95万/套</span></li>
                <li title="送阳台，户型好，优惠多"><span class="netHouseSale__content--reason">送阳台，户型好，优惠多</span></li>
            </ul>
            <ul class="netHouseSale__content f-l">
                <li><span>8栋1单元2层03号</span></li>
                <li><span>93m²</span></li>
                <li><span>1111m²/95万/套</span></li>
                <li><span class="netHouseSale__content--reason">送阳台，户型好，优惠多</span></li>
            </ul>
            <ul class="netHouseSale__content f-l">
                <li><span>8栋1单元2层03号</span></li>
                <li><span>93m²</span></li>
                <li><span>1111m²/95万/套</span></li>
                <li><span class="netHouseSale__content--reason">送阳台，户型好，优惠多</span></li>
            </ul>
        </div>
        <div class="cf netHouseSale__box">
            <div class="netHouseSale__img f-l">
                <div class="netHouse__list-l">
                  <span class="listItem__sale-on">在售</span>
                  <span class="netHouse__total">共129套，均价10885元/m²</span>
                  <img src="" alt="" class="netHouse__pic house-placeholder-img">
                  <span class="netHouse__type">3室2厅2卫8号楼K-93</span>
                  <div class="netHouse__baseInfo">
                    <span class="netHouse__baseInfo-item">全朝南 | </span>
                    <span class="netHouse__baseInfo-item">全朝南 | </span>
                    <span class="netHouse__baseInfo-item">全朝南</span>
                  </div>
                  <div class="listItem__view  btn-primary">
                    查看该户型房源
                  </div>
                </div>
            </div>
            <ul class="netHouseSale__content f-l">
                <li><span>8栋1单元2层03号</span></li>
                <li><span>93m²</span></li>
                <li><span>1111m²/95万/套</span></li>
                <li><span class="netHouseSale__content--reason">送阳台，户型好，优惠多</span></li>
            </ul>
            <ul class="netHouseSale__content f-l">
                <li><span>8栋1单元2层03号</span></li>
                <li><span>93m²</span></li>
                <li><span>1111m²/95万/套</span></li>
                <li><span class="netHouseSale__content--reason">送阳台，户型好，优惠多</span></li>
            </ul>
            <ul class="netHouseSale__content f-l">
                <li><span>8栋1单元2层03号</span></li>
                <li><span>93m²</span></li>
                <li><span>1111m²/95万/套</span></li>
                <li><span class="netHouseSale__content--reason">送阳台，户型好，优惠多</span></li>
            </ul>
        </div>
      </div>

    <!-- <div class="listType__listWrap f-l" id="netHouse__wrapper">
      <table class="netHouse__table" cellspacing="0">
        <tr class="netHouse__head--box">
          <th class="netHouse__head--img">户型</th>
          <th class="netHouse__head">序号</th>
          <th class="netHouse__head">平方</th>
          <th class="netHouse__head">备案价</th>
          <th class="netHouse__head">推荐理由</th>
        </tr>
        <tr>
          <td rowspan="3">
            <div class="netHouse__list-l f-l">
              <span class="listItem__sale-on">在售</span>
              <span class="netHouse__total">共129套，均价10885元/m²</span>
              <img src="" alt="" class="netHouse__pic house-placeholder-img">
              <span class="netHouse__type">3室2厅2卫8号楼K-93</span>
              <div class="netHouse__baseInfo">
                <span class="netHouse__baseInfo-item">全朝南 | </span>
                <span class="netHouse__baseInfo-item">全朝南 | </span>
                <span class="netHouse__baseInfo-item">全朝南</span>
              </div>
              <div class="listItem__view  btn-primary">
                查看该户型房源
              </div>
            </div>
          </td>
          <td>8栋1单元2层03号</td>
          <td>93m²</td>
          <td>1111m²/95万/套</td>
          <td>送阳台，户型好，优惠多</td>
        </tr>
        <tr>
          <td>8栋1单元2层03号</td>
          <td>93m²</td>
          <td>1111m²/95万/套</td>
          <td>送阳台，户型好，优惠多</td>
        </tr>
        <tr>
          <td>8栋1单元2层03号</td>
          <td>93m²</td>
          <td>1111m²/95万/套</td>
          <td>送阳台，户型好，优惠多</td>
        </tr>
      </table>
    </div> -->
    <div class="listType__listWrap  f-l" id="roomType" style="display:none;">
      <!-- ko if:viewModel.houseTypeDataDetail().length -->
      <!-- ko foreach:{data:viewModel.houseTypeDataDetail(),as:"value"} -->
      <a href="" class="listType__listItem cf">
        <div class="f-l listItem__pic">
          <img data-bind="attr:{src:value.imgs[0].imgSrc}" src="" alt="">
          <!-- ko if: value.sellStatus =='x201' || value.sellStatus =='x203' -->
          <span class="listItem__sale-on">在售</span>
          <!-- /ko -->
          <!-- ko if: value.sellStatus =='x202' -->
          <span class="listItem__sale-ready">待售</span>
          <!-- /ko -->
          <!-- ko if: value.sellStatus =='x204' -->
          <span class="listItem__sale-out">售罄</span>
          <!-- /ko -->
        </div>
        <div class="listItem__baseInfo f-l">
          <div class="listItem__wrapper cf">
            <span class="listItem__type" data-bind="text: value.imgs[0].imgName"></span>
            <!-- <span class="listItem__attention">
              <i class="listItem__attention-icon"></i>

              34567
            </span> -->
            <span class="listItem__price f-r">
              <span class="listItem__num-red numFont" data-bind="text:value.avagPrice">23700</span>元/m²
            </span>
          </div>
          <div class="listItem__wrapper">
            <span class="listItem__count" data-bind="text:'建筑面积:'+value.coveredArea+'㎡'"></span>
            <span class="listItem__count" data-bind="text:'套内面积:'+value.insideSpace+'㎡'"></span>
            <span class="listItem__count" data-bind="text:'套数:共'+value.totalNumber+'套'">套数:共130套</span>

          </div>
          <div class="listItem__wrapper listItem__comment">
            <span>户型点评：</span>
            <span class="listItem__comment-des" data-bind="text: value.imgs[0].imgDesc"></span>

          </div>
          <div class="cf">
            <div class="listItem__label f-l">
              <!-- ko if:value.houseTypeTag -->
              <!-- ko foreach:{data:value.houseTypeTag,as:"label"} -->
              <span class="house__label-item--small" data-bind="text:label.labelDesc">南北通透</span>
              <!-- /ko -->
              <!-- /ko  -->
            </div>
            <div class="listItem__view f-r btn-primary">
              查看该户型房源
            </div>
          </div>
          <span class="listItem__houseNum">
            <span class="listItem__num-red numFont">23700</span>万/套
          </span>
        </div>
      </a>
      <!-- /ko -->
      <!-- /ko  -->
    
      <div class="listType__noneData">
        <img src="/src/images/no-data.png" alt="">
      </div>
      <!-- ko if:viewModel.houseTypeDataDetail().length&&viewModel.houseTypeDataDetail().length>=4 -->
      <div class="reviewList__more listType__loadMore">
        <span class="btn-review--more">查看更多</span>
      </div>
      <!-- /ko  -->
    </div>
    <div class="content__aside f-r">
      <link rel="import" href="../aside/recaside.tpl?__inline">
    </div>
  </div>

</div>
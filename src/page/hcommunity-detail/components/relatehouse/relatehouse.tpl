<div class="container-main space__top">
  <div class="relate__header">
    <span class="relate__header-item relate__header-item--active">看过此楼盘还看过</span>

  </div>
  <!-- <div id="mayLikeHouse"> -->
  <div class="relate__list-wrapper superslide-box1">
    <div class="relate__list cf">
      <!-- ko if:viewModel.lookedHouseData().length -->
      <ul class="superslide-list1">
      <!-- ko foreach:{data:viewModel.lookedHouseData(),as:"value"} -->
      <li class="relate__list-itembox">
        <a href="" data-bind="attr:{src:value.url}" class="relate__list-item">
          <img class="relate__list-img" data-bind="attr:{src:value.scannedImg}" alt="">
          <div class="relate__list-name" data-bind="text:value.houseName">海莲时代广场</div>
          <div class="relate__list-price">均价：
            <!-- ko if: !value.price-->
            <span class="relate__list-price--red">待定</span>
            <!-- /ko -->
            <!-- ko if: value.price-->
            <span class="relate__list-price--red" data-bind="text:value.scannedPrice"></span>
            元/m²
            <!-- /ko -->
          </div>
        </a>
      </li>
      <!-- /ko -->
      </ul>
      <!-- ko if: viewModel.lookedHouseData().length>5 -->
      <span class="relate__list-arrow--pre navPrev"></span>
      <span class="relate__list-arrow--next navNext"></span>
      <!-- /ko -->
      <!-- /ko -->
    </div>



  </div>

  <!-- </div> -->

</div>

<div class="container-main space__top" id="nearAndPriceHouse">
  <div class="relate__header">
    <span class="relate__header-item relate__header-item--active">周边楼盘</span>
    <!-- ko if:viewModel.samePriceHouse().length -->
    <span class="relate__header-item">同价位楼盘</span>
     <!-- /ko -->
  </div>
  <div class="relate__list relate__list--relative superslide-box2 cf">
    <!-- ko if:viewModel.houseListData().length -->
    <ul class="superslide-list2">
    <!-- ko foreach:{data:viewModel.houseListData(),as:"value"} -->
    <li class="relate__list-itembox">
      <a href="" class="relate__list-item" data-bind="attr:{src:value.titleurl}">
        <img class="relate__list-img" data-bind="attr:{src:value.img}" alt="">
        <div class="relate__list-name" data-bind="value.residentialName"></div>
        <div class="relate__list-price">均价：
          <!-- ko if: value.price == '待定'-->
          <span class="relate__list-price--red" data-bind="text:value.price"></span>
          <!-- /ko -->
          <!-- ko if: value.price != '待定'-->
          <span class="relate__list-price--red" data-bind="text:value.price"></span>
          元/m²
          <!-- /ko -->
        </div>
      </a>
    </li>
    <!-- /ko -->
    </ul>
    <!-- ko if: viewModel.houseListData().length>5 -->
    <span class="relate__list-arrow--pre navPrev"></span>
    <span class="relate__list-arrow--next navNext"></span>
    <!-- /ko -->
    <!-- /ko -->
  </div>
  <!-- ko if:viewModel.samePriceHouse().length -->
  <div class="relate__list relate__list--relative superslide-box2 cf" style="display:none">
    <ul class="superslide-list2">
    <!-- ko foreach:{data:viewModel.samePriceHouse(),as:"value"} -->
    <li class="relate__list-itembox">
    <a href="" class="relate__list-item" data-bind="attr:{src:value.titleurl}">
      <img class="relate__list-img" data-bind="attr:{src:value.cover_img}" alt="">
      <div class="relate__list-name" data-bind="value.residential_name"></div>
      <div class="relate__list-price">均价：
        <!-- ko if: value.average_price == 0-->
        <span class="relate__list-price--red">待定</span>
        <!-- /ko -->
        <!-- ko if: value.average_price != 0-->
        <span class="relate__list-price--red" data-bind="text:value.average_price"></span>
        元/m²
        <!-- /ko -->
      </div>
    </a>
    </li>
    <!-- /ko -->
  </ul>
  <!-- ko if: viewModel.samePriceHouse().length>5 -->
  <span class="relate__list-arrow--pre navPrev"></span>
  <span class="relate__list-arrow--next navNext"></span>
  <!-- /ko -->
  </div>
  <!-- /ko -->
</div>
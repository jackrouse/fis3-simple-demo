/*
 * 名称 ： 百度地图控制组件
 * 开发 ： 邹春波
 * 时间 ： 2015-5-25
 * 依赖 ： jquery、api.map2.0
 */

;(function() {
  var fBMap = {
    //参数配置
    config: {
      div: 'bmap',
      option: {
        city: '武汉'
      },
      infoBoxmb:
        "<div id='info{i}' index='{i}'>{title}<br>地址：{address}<br>电话：{tell}</div>" +
        "<div><a href='{titleurl}' target='_blank'><img src='{img}'></a></div>",
      postUrl: ''
    },

    //得到地址栏信息
    getUrlMes: function() {
      var locationStr = window.location.href,
        urlMes = undefined,
        argname = ['city', 'lng', 'lat', 'title', 'price'],
        city = '',
        lng = '',
        lat = '',
        title = '',
        price = ''
      if (locationStr && locationStr.length >= 0) {
        var locationStrArr0 = locationStr.split('?')
        if (locationStrArr0[1] && locationStrArr0[1].length > 0) {
          var locationStrArr1 = locationStrArr0[1].split('&')
          for (var i = 0; i < locationStrArr1.length; i++) {
            var argArr = locationStrArr1[i].split('=')
            if (argArr[1] && argArr[1].length > 0) {
              if (argArr[0].indexOf(argname[0]) > -1) {
                city = decodeURI(argArr[1])
                if (typeof urlMes == 'undefined') urlMes = {}
                urlMes.city = city
              }
              if (argArr[0].indexOf(argname[1]) > -1) {
                lng = argArr[1]
                if (typeof urlMes == 'undefined') urlMes = {}
                urlMes.lng = lng
              }
              if (argArr[0].indexOf(argname[2]) > -1) {
                lat = argArr[1]
                if (typeof urlMes == 'undefined') urlMes = {}
                urlMes.lat = lat
              }
              if (argArr[0].indexOf(argname[3]) > -1) {
                title = decodeURI(argArr[1])
                if (typeof urlMes == 'undefined') urlMes = {}
                urlMes.title = title
              }
              if (argArr[0].indexOf(argname[4]) > -1) {
                price = decodeURI(argArr[1])
                if (typeof urlMes == 'undefined') urlMes = {}
                urlMes.price = price
              }
            }
          }
        }
      }
      return urlMes
    },

    //获取埋在页面中该楼盘信息值
    //zhangchang 2016.8.24
    getHouseMes: function() {
      var houseMsg = {}
      var ele = $('#bmap')
      if (ele.data('city')) {
        houseMsg.city = ele.data('city')
      }
      if (ele.data('lng')) {
        houseMsg.lng = ele.data('lng')
      }
      if (ele.data('lat')) {
        houseMsg.lat = ele.data('lat')
      }
      if (ele.data('title')) {
        houseMsg.title = ele.data('title')
      }
      if (ele.data('price')) {
        houseMsg.price = ele.data('price')
      }
      return houseMsg
    },

    //地址右侧滑动菜单控制
    toggleSearch: function() {
      if ($('.search-box').hasClass('open')) {
        $('.search-box')
          .removeClass('open')
          .addClass('close')
      } else {
        $('.search-box')
          .removeClass('close')
          .addClass('open')
      }
    },

    //创建地图对象
    creatMapObj: function(div, option) {
      var option = option || {},
        lng = option.lng,
        lat = option.lat,
        city = option.city,
        map = new BMap.Map(div, { enableMapClick: false }),
        point = new BMap.Point(lng, lat)
      if (lng && lat) {
        map.centerAndZoom(point, 13)
      } else {
        map.centerAndZoom(city, 13)
      }
      map.enableScrollWheelZoom()
      map.addControl(new BMap.NavigationControl())
      map.setMinZoom(12)
      return map
    },

    //初始化
    init: function(config) {
      var _this = this,
        //urlMes = _this.getUrlMes();
        urlMes = _this.getHouseMes()

      $.extend(_this.config.option, urlMes)
      var nowconfig = config
        ? $.extend(true, _this.config, config)
        : _this.config
      var map = _this.creatMapObj(nowconfig.div, nowconfig.option)
      if (typeof map == 'object') {
        _this.selfAdd(map, nowconfig.option)
        _this.getServiceData(
          nowconfig.option,
          function(data) {
            _this.localSearch(map, data, nowconfig.option)
          },
          config.data
        )
      }
      _this.config = nowconfig
      _this.config.map = map
      //_this.zoomend(map);
    },

    transit: {},
    driving: {},

    //驾车线路查询
    driSearch: function(start, end, flag) {
      var _this = this,
        start = start ? start : _this.config.option.title,
        map = _this.config.map

      _this.driving = new BMap.DrivingRoute(map, {
        renderOptions: {
          map: map,
          autoViewport: true
        }
      })
      _this.driving.setSearchCompleteCallback(function(results) {
        //console.log(results);
        var result = results,
          count = result.getNumPlans(),
          tansitHtml = []
        if (count > 0) {
          var plan = result.getPlan(0)
          var time = parseInt(plan.getDuration(false))
          var distance = parseFloat(plan.getDistance(false) / 1000)
          distance = Math.round(distance * 10) / 10
          var thisnum = 0
          tansitHtml.push(
            '<div class="map_line_tit">约' +
              distance +
              '公里/' +
              parseInt(time / 60) +
              '分钟</div>'
          )
          tansitHtml.push(
            '<dl class="map_line_way drive"><dt class="start"><strong>' +
              start +
              '</strong></dt>'
          )
          if (plan.getNumRoutes() > 0) {
            var routes = plan.getRoute(0)
            var l = routes.getNumSteps()
            for (var m = 0; m < l; m++) {
              thisnum = m + 1
              tansitHtml.push(
                '<dd><i>' +
                  thisnum +
                  '.</i><div class="info">' +
                  routes.getStep(m).getDescription(false) +
                  '</div></dd>'
              )
            }
          }
          tansitHtml.push(
            '<dt class="end"><strong>' + end + '</strong></dt></dl>'
          )
        } else {
          tansitHtml.push('<div class="lzbcxb" id="lzbcxb">')
          tansitHtml.push(
            '<div class="title">请选择准确的起点、途经点或终点</div>'
          )
          tansitHtml.push('<div class="content">')
          tansitHtml.push('<div class="seltop">')
          tansitHtml.push('<div class="s3"></div>')
          tansitHtml.push(
            '<div class="name">起点：<strong>' + start + '</strong></div>'
          )
          tansitHtml.push('</div>')
          tansitHtml.push('<div class="seltop mart5">')
          tansitHtml.push('<div class="s3"></div>')
          tansitHtml.push('<div class="name">终点：<strong>' + end)
          tansitHtml.push('</div>')
          tansitHtml.push(
            '<div class="info">未找到相关地点。<br />您可以修改搜索内容。</div>'
          )
          tansitHtml.push('</div>')
          tansitHtml.push('</div>')
        }
        $('#resplane').html(tansitHtml.join(''))
        $('.search-result .title .in ul li')
          .removeClass('set')
          .eq(0)
          .addClass('set')
      })
      //逆解析输入的地址，判断是否有这个地址
      //如果输入的地址能获取到经纬度，再执行搜索方法
      //zhangchang   2016.10.19
      //判断输入的是开始地址还是结束地址
      var address
      if (flag == 1) {
        address = start
      } else if (flag == 2) {
        address = end
      }
      // 创建地址解析器实例
      var myGeo = new BMap.Geocoder()
      // 将地址解析结果显示在地图上,并调整地图视野
      myGeo.getPoint(
        address,
        function(point) {
          if (point) {
            if (flag == 1) {
              _this.driving.search(point, end)
            } else if (flag == 2) {
              _this.driving.search(start, point)
            }
          } else {
            dialog.showMsg('error', '请输入准确的地名！')
          }
        },
        '武汉'
      )
    },

    //公车线路查询
    busSearch: function(start, end, flag) {
      var _this = this,
        start = start ? start : _this.config.option.title,
        map = _this.config.map

      _this.transit = new BMap.TransitRoute(map, {
        renderOptions: {
          map: map,
          autoViewport: true
        }
      })
      _this.transit.setSearchCompleteCallback(function(results) {
        var result = results,
          count = result.getNumPlans(),
          tansitHtml = ''
        if (count > 0) {
          map.clearOverlays()
          tansitHtml += '<div id="dv_scroll">'
          for (var i = 0; i < count; i++) {
            var plan = result.getPlan(i)
            var linesnum = plan.getNumLines()
            var num = i + 1
            tansitHtml += '<div class="map_line" >'
            tansitHtml +=
              '<div class="map_line_tit" onclick="fBMap.show_line(\'buswarp\',' +
              i +
              ',' +
              count +
              ');fBMap.drawLine(' +
              i +
              ')">'
            tansitHtml +=
              '<strong><span class="hcard">' + num + '.&nbsp;</span>'
            for (var j = 0; j < linesnum; j++) {
              var zhandian = plan.getLine(j).title
              var zhandianarr = zhandian.split('(')
              tansitHtml += zhandianarr[0]
              if (j < linesnum - 1) {
                tansitHtml += '<span class="rarr">→</span>'
              }
            }
            var time = parseInt(plan.getDuration(false))
            var distance = parseFloat(plan.getDistance(false) / 1000)
            distance = Math.round(distance * 10) / 10
            tansitHtml +=
              '</strong><em>约' +
              parseInt(time / 60) +
              '分钟/' +
              distance +
              '公里</em>'
            tansitHtml += '</div>'
            if (0 == i) {
              tansitHtml += '<div id="buswarp' + i + '">'
            } else {
              tansitHtml += '<div id="buswarp' + i + '" style="display:none">'
            }
            tansitHtml += '<dl class="map_line_way">'
            tansitHtml +=
              '<dt class="start"><strong>' + start + '</strong></dt>'
            var stationcount = plan.getNumLines()
            for (var m = 0; m < stationcount; m++) {
              var routs = plan.getRoute(m)
              var lines = plan.getLine(m)
              if ('0' != routs.getDistance(false)) {
                tansitHtml += '<dd>'
                tansitHtml += '<i class="walk">&nbsp;</i>'
                tansitHtml +=
                  '<div class="info">步行至&nbsp;<a href="javascript:void(0)" >' +
                  lines.getGetOnStop().title +
                  '</a></div>'
                tansitHtml += '</dd>'
              }
              tansitHtml += '<dd>'
              if (lines.title.indexOf('地铁') > 0) {
                tansitHtml += '<i class="bus">&nbsp;</i>'
              } else {
                tansitHtml += '<i class="bus">&nbsp;</i>'
              }
              var ztitle = lines.title.split('(')
              tansitHtml +=
                '<div class="info">乘坐&nbsp;<strong>' +
                ztitle[0] +
                '</strong>,&nbsp;在&nbsp;<a class="ks" href="javascript:void(0)" >' +
                lines.getGetOffStop().title +
                '</a>&nbsp;下车</div>'
              tansitHtml += '</dd>'
            }
            var routs = plan.getRoute(stationcount + 1)
            if (null != routs && '0' != routs.getDistance(false)) {
              tansitHtml += '<dd>'
              tansitHtml += '<i class="walk">&nbsp;</i>'
              tansitHtml +=
                '<div class="info">步行至&nbsp;<a class="ks" href="javascript:void(0)" >' +
                lines.getGetOnStop().title +
                '</a></div>'
              tansitHtml += '</dd>'
            }
            tansitHtml += '<dt class="end" ><strong>' + end + '</strong></dt>'
            tansitHtml += '</dl>'
            tansitHtml += '</div>'
            tansitHtml += '</div>'
          }
          tansitHtml += '</div>'
        } else {
          tansitHtml += '<div class="lzbcxb" id="lzbcxb">'
          tansitHtml +=
            '<div class="title">请选择准确的起点、途经点或终点</div>'
          tansitHtml += '<div class="content">'
          if ('s' == _this.transit.tag) {
            tansitHtml += '<div class="seltop  no2">'
            tansitHtml += '<div class="s4"></div>'
            tansitHtml +=
              '<div class="name1">起点：<strong>' + start + '</strong></div>'
            tansitHtml += '</div>'
          } else {
            tansitHtml += '<div class="seltop  mart5">'
            tansitHtml += '<div class="s3"></div>'
            tansitHtml +=
              '<div class="name">起点：<strong>' + start + '</strong></div>'
            tansitHtml += '</div>'
          }
          if ('e' == _this.transit.tag) {
            tansitHtml += '<div class="seltop no2">'
            tansitHtml += '<div class="s4"></div>'
            tansitHtml +=
              '<div class="name1">起点：<strong>' + end + '</strong></div>'
            tansitHtml += '</div>'
          } else {
            tansitHtml += '<div class="seltop mart5">'
            tansitHtml += '<div class="s3"></div>'
            tansitHtml +=
              '<div class="name">终点：<strong>' + end + '</strong></div>'
            tansitHtml += '</div>'
          }
          tansitHtml +=
            '<div class="info">未找到相关地点。<br />您可以修改搜索内容。</div>'
          tansitHtml += '</div>'
          tansitHtml += '</div>'
        }
        $('#resplane').html(tansitHtml)
        $('.search-result .title .in ul li')
          .removeClass('set')
          .eq(0)
          .addClass('set')
        //              if(!($(".search-result").is(":visible"))){
        //              	$(".search-list").hide();
        //					$(".search-result").show();
        //					_this.menuReturn();
        //				}
      })
      //逆解析输入的地址，判断是否有这个地址
      //如果输入的地址能获取到经纬度，再执行搜索方法
      //zhangchang   2016.10.19
      //判断输入的是开始地址还是结束地址
      var address
      if (flag == 1) {
        address = start
      } else if (flag == 2) {
        address = end
      }
      // 创建地址解析器实例
      var myGeo = new BMap.Geocoder()
      // 将地址解析结果显示在地图上,并调整地图视野
      myGeo.getPoint(
        address,
        function(point) {
          if (point) {
            if (flag == 1) {
              _this.transit.search(point, end)
            } else if (flag == 2) {
              _this.transit.search(start, point)
            }
          } else {
            dialog.showMsg('error', '请输入准确的地名！')
          }
        },
        '武汉'
      )
    },

    //线路显示与隐藏
    show_line: function(div, index, count) {
      for (i = 0; i < count; i++) {
        $('#' + div + i).hide()
        //console.log("#"+div+i);
      }
      $('#' + div + index).show()
    },

    //绘制公交线路
    drawLine: function(index) {
      var _this = this,
        map = _this.config.map
      var results = _this.transit.getResults()
      var opacity = 0.45
      var planObj = results.getPlan(index)
      var bounds = new Array()
      var addMarkerFun = function(point, imgType, index, title) {
        var url, width, height, myIcon
        // imgType:1的场合，为起点和终点的图；2的场合为过程的图形
        if (imgType == 1) {
          url = '//map.baidu.com/image/dest_markers.png'
          width = 42
          height = 34
          myIcon = new BMap.Icon(url, new BMap.Size(width, height), {
            offset: new BMap.Size(14, 32),
            imageOffset: new BMap.Size(0, 0 - index * height)
          })
        } else {
          url = '//map.baidu.com/image/trans_icons.png'
          width = 22
          height = 25
          var d = 25,
            cha = 0,
            jia = 0
          if (index == 2) {
            d = 21
            cha = 5
            jia = 1
          }
          myIcon = new BMap.Icon(url, new BMap.Size(width, d), {
            offset: new BMap.Size(10, 11 + jia),
            imageOffset: new BMap.Size(0, 0 - index * height - cha)
          })
        }

        var marker = new BMap.Marker(point, { icon: myIcon })
        if (title != null && title != '') marker.setTitle(title)
        // 起点和终点放在最上面
        if (imgType == 1) marker.setTop(true)
        map.addOverlay(marker)
      }
      var addPoints = function(points) {
        for (var i = 0; i < points.length; i++) bounds.push(points[i])
      }

      map.clearOverlays()
      // 绘制驾车步行线路
      //console.log(planObj);
      for (var i = 0; i < planObj.getNumRoutes(); i++) {
        var route = planObj.getRoute(i)
        if (route.getDistance(false) > 0) {
          map.addOverlay(
            new BMap.Polyline(route.getPath(), {
              strokeStyle: 'dashed',
              strokeColor: '#30a208',
              strokeOpacity: 0.75,
              strokeWeight: 4,
              enableMassClear: true
            })
          )
        }
      }
      // 绘制公交线路
      for (i = 0; i < planObj.getNumLines(); i++) {
        var line = planObj.getLine(i)
        addPoints(line.getPath())

        if (line.type == BMAP_LINE_TYPE_BUS) {
          addMarkerFun(
            line.getGetOnStop().point,
            2,
            2,
            line.getGetOnStop().title
          )

          addMarkerFun(
            line.getGetOffStop().point,
            2,
            2,
            line.getGetOffStop().title
          )
        } else if (line.type == BMAP_LINE_TYPE_SUBWAY) {
          addMarkerFun(
            line.getGetOnStop().point,
            2,
            3,
            line.getGetOnStop().title
          )

          addMarkerFun(
            line.getGetOffStop().point,
            2,
            3,
            line.getGetOffStop().title
          )
        }
        map.addOverlay(
          new BMap.Polyline(line.getPath(), {
            strokeColor: '#0030ff',
            strokeOpacity: opacity,
            strokeWeight: 6,
            enableMassClear: true
          })
        )
      }
      map.setViewport(bounds)
      addMarkerFun(results.getEnd().point, 1, 1)
      addMarkerFun(results.getStart().point, 1, 0)
    },

    //公交线路点击
    busClick: function(i) {
      var _this = this,
        start = $('#resplane')
          .find('#sstartname')
          .val(),
        end = $('#resplane')
          .find('#sendname')
          .val()
      if (end == '' || end == '请输入终点') {
        dialog.showMsg('error', '没有输入终点')
        return false
      }
      if (i == 0) {
        _this.busSearch(start, end)
      }
      if (i == 1) {
        _this.driSearch(start, end)
      }
    },

    //公交按钮点击
    busBot: function() {
      var _this = this,
        title = _this.config.option.title
      $('.search-list').hide()
      $('.search-result').show()
      $('.search-result .title .in ul li')
        .removeClass('set')
        .eq(0)
        .addClass('set')
      $('#resplane').html('')
      $('#resplane').html(
        "<ul class='map_ipt' style='display: block;'>" +
          "<li><input type='text' class='ipt_txt' name='' id='sstartname' value='" +
          title +
          '\' onfocus=\'this.className="ipt_txt_focus"; if(this.value=="请输入起点" || this.value=="请输入终点")this.value="";\' onblur=\'this.className="ipt_txt"; if(this.value=="")this.value="请输入起点";\'></li>' +
          '<li><input type=\'text\' class=\'ipt_txt\' name=\'\' id=\'sendname\' value=\'请输入终点\' onfocus=\'this.className="ipt_txt_focus"; if(this.value=="请输入起点" || this.value=="请输入终点")this.value="";\' onblur=\'this.className="ipt_txt"; if(this.value=="")this.value="请输入终点";\'></li>' +
          "<li><input type='button' class='ipt_btn' value='获取线路' onclick='fBMap.busClick(0);'></li>" +
          "<li class='change'><a href='javascript:void(0)' onclick='fBMap.busChang();'></a></li></ul>"
      )

      //_this.menuReturn();
    },

    //驾车按钮点击
    driBot: function() {
      var _this = this,
        title = _this.config.option.title
      $('.search-list').hide()
      $('.search-result').show()
      $('.search-result .title .in ul li')
        .removeClass('set')
        .eq(0)
        .addClass('set')
      $('#resplane').html('')
      $('#resplane').html(
        "<ul class='map_ipt' style='display: block;'>" +
          "<li><input type='text' class='ipt_txt' name='' id='sstartname' value='" +
          title +
          '\' onfocus=\'this.className="ipt_txt_focus"; if(this.value=="请输入起点" || this.value=="请输入终点")this.value="";\' onblur=\'this.className="ipt_txt"; if(this.value=="")this.value="请输入起点";\'></li>' +
          '<li><input type=\'text\' class=\'ipt_txt\' name=\'\' id=\'sendname\' value=\'请输入终点\' onfocus=\'this.className="ipt_txt_focus"; if(this.value=="请输入起点" || this.value=="请输入终点")this.value="";\' onblur=\'this.className="ipt_txt"; if(this.value=="")this.value="请输入终点";\'></li>' +
          "<li><input type='button' class='ipt_btn' value='获取线路' onclick='fBMap.busClick(1);'></li>" +
          "<li class='change'><a href='javascript:void(0)' onclick='fBMap.busChang();'></a></li></ul>"
      )

      //_this.menuReturn();
    },

    //线路切换
    busChang: function() {
      var s_val = $('#sstartname').val(),
        e_val = $('#sendname').val()
      $('#sstartname').val(e_val)
      $('#sendname').val(s_val)
    },

    //点击事件的样式变化
    c_style: function(e) {
      var tag = e.tagName,
        index = $(e)
          .parent()
          .find(tag)
          .index(e)
      $(e)
        .parent()
        .find(tag)
        .removeClass('set')
        .eq(index)
        .addClass('set')
    },

    //周边楼盘
    nearHouse: function(e) {
      var _this = this,
        _thise = e,
        map = _this.config.map,
        option = _this.config.option
      _this.clearAll()
      _this.selfAdd(map, option)
      // console.log(option);
      _this.getServiceData(
        option,
        function(data) {
          _this.localSearch(map, data, option)
          //$(".search-list").hide();
          //$(".search-result").show();
          //_this.menuReturn();
          _this.c_style(_thise)
        },
        _this.config.data
      )
    },

    //周边搜索
    nearbySearch: function(e, main, keys, reload, lng, lat, title, radius) {
      var _this = this,
        _thise = e,
        _main = main,
        _map = _this.config.map,
        _radius = radius || 5000,
        _reload = reload,
        _html = _this.config.infoBoxmb2,
        _keys = keys,
        _option = _this.config.option,
        _title = title ? title : _option.title ? _option.title : '武汉中心',
        _lng = lng ? lng : _option.lng ? _option.lng : 114.301252,
        _lat = lat ? lat : _option.lat ? _option.lat : 30.56591,
        _point = new BMap.Point(_lng, _lat)
      //console.log(_this.config);

      //交通附近移除电话
      if ((_main = '交通')) {
        _html = _html.replace(/电话：暂无/g, '')
      }
      var _options = {
        onSearchComplete: function(results) {
          var reArr = []
          if ($.type(results) == 'object') {
            reArr.push(results)
          } else {
            reArr = results
          }

          $('.search-result .title .in span').html(_title + '周边' + _main)
          $('.search-result .con').html('')
          for (var k = 0; k < reArr.length; k++) {
            var res = [],
              str_s =
                "<div index='" +
                k +
                "' class='mb10'><dt>" +
                reArr[k].keyword +
                '</dt></div>'
            for (var p = 0; p < reArr[k].getCurrentNumPois(); p++) {
              res.push(reArr[k].getPoi(p))
            }

            //计算距离
            for (var j = 0; j < res.length; j++) {
              var distance = _this.getShortDistance(
                _lng,
                _lat,
                res[j].point.lng,
                res[j].point.lat
              )
              res[j].distance = distance
            }
            _this.shellSort(res) //按距离排序
            $('.search-result .con').append(str_s)

            for (var i = 0; i < res.length; i++) {
              var _ki = k.toString() + i.toString()
              res[i].i = _ki

              //交通变‘地址’为‘停靠交通’、‘轨道交通’
              var _newhtml = _html
              if (reArr[k].keyword == '公交') {
                _newhtml = _html.replace(/地址/g, '停靠交通')
              }
              if (reArr[k].keyword == '地铁') {
                _newhtml = _html.replace(/地址/g, '轨道交通')
              }

              BMapLib.InfoBox.prototype.addresult = function(div, con) {
                $(div).append(con)
              }
              var point = new BMap.Point(res[i].point.lng, res[i].point.lat),
                content = _this.formatTemplate(res[i], _newhtml),
                opts = {
                  boxStyle: {
                    width: '356px'
                    //height: "250px"
                  },
                  offset: new BMap.Size(0, 10),
                  closeIconUrl: '//static.fdc.com.cn/nh/images/close0.gif',
                  enableAutoPan: true
                },
                indiv = '.search-result .con div:eq(' + k + ')',
                ddcon1 =
                  "<dd class='clearfix' onMouseOver=\"fBMap.RMover['" +
                  _ki +
                  '\']()" onMouseOut="fBMap.RMout[\'' +
                  _ki +
                  '\']()" onClick="fBMap.RMclick[\'' +
                  _ki +
                  '\']()" index=' +
                  i +
                  ' lng=' +
                  res[i].point.lng +
                  ' lat=' +
                  res[i].point.lat +
                  ' ><a href="javascript:void(0)" title="' +
                  res[i].title +
                  '" ><span class="d1">' +
                  res[i].distance +
                  "米</span><span class='d4'>" +
                  res[i].title +
                  '</span></a></dd>',
                ddcon2 =
                  "<dd class='clearfix' onMouseOver=\"fBMap.RMover['" +
                  _ki +
                  '\']()" onMouseOut="fBMap.RMout[\'' +
                  _ki +
                  '\']()" onClick="fBMap.RMclick[\'' +
                  _ki +
                  '\']()" style="display:none" index=' +
                  i +
                  ' lng=' +
                  res[i].point.lng +
                  ' lat=' +
                  res[i].point.lat +
                  ' ><a href="javascript:void(0)" title="' +
                  res[i].title +
                  '" ><span class="d1">' +
                  res[i].distance +
                  "米</span><span class='d4'>" +
                  res[i].title +
                  '</span></a></dd>',
                ddcon = i > 4 ? ddcon2 : ddcon1,
                infoW = new BMapLib.InfoBox(_map, content, opts)
              infoW.addresult(indiv, ddcon)
              _this.addMarker(_map, point, infoW, k, i, _ki)
            }
            if (res.length > 5) {
              var morestr =
                "<span class='mscother'><span class='mscomore'><a href='javascript:void(0)'>更多</a></span><span class='mscoputup'><a href='javascript:void(0)'>收起</a></span></span>"
              $('.search-result .con div[index=' + k + ']').append(morestr)
            }
          }
          _this.moreUp()
          if (_reload) {
            //$(".search-list").hide();
            $('.search-result').show()
            //_this.menuReturn();
            _this.c_style(_thise)
          } else {
            $('#resplane dt:eq(0)').prepend(_title + '周边')
          }
        }
      }
      var localSearch = new BMap.LocalSearch(_map, _options)
      _this.clearAll()
      $('.arround__scroll')
        .data('yw.easybar')
        .update()
      _this.selfAdd(_map, _this.config.option)
      localSearch.searchNearby(_keys, _point, radius)
    },

    //菜单返回按钮
    menuReturn: function() {
      $('.search-result .title .in a').click(function() {
        $('.search-list').show()
        $('.search-result').hide()
      })
    },

    //结果面板更多收起
    moreUp: function() {
      $('.mscother').click(function() {
        //$(this).unbind("click");
        if (
          $(this)
            .find('.mscomore')
            .is(':visible')
        ) {
          $(this)
            .find('.mscomore')
            .hide()
          $(this)
            .find('.mscoputup')
            .show()
          $(this)
            .parent()
            .find('dd')
            .show()
          //$(this).bind("click");
        } else {
          $(this)
            .find('.mscomore')
            .show()
          $(this)
            .find('.mscoputup')
            .hide()
          $(this)
            .parent()
            .find('dd')
            .hide()
          for (i = 0; i < 5; i++) {
            $(this)
              .parent()
              .find('dd:eq(' + i + ')')
              .show()
          }
          //$(this).bind("click");
        }
      })
    },

    //清除的覆盖物
    clearAll: function() {
      var _this = this
      //如果地图已经初始化了，并且地图上覆盖物的数量大于0，清除所有覆盖物
      //2016.9.11 zhangchang
      if (_this.config.map) {
        if (_this.config.map.getOverlays().length > 0)
          _this.config.map.clearOverlays()
      }
    },

    //信息窗内容底部切换
    idownLi_click: function(e) {
      var parent_div = $(e)
          .parent()
          .parent(),
        index = $(parent_div)
          .find('li')
          .index(e)
      $(parent_div)
        .find('li')
        .attr('class', '')
      $(parent_div)
        .find('li')
        .eq(index)
        .addClass('set' + index)
      $(parent_div)
        .find('.inp')
        .hide()
      $(parent_div)
        .find('.inp')
        .eq(index)
        .show()
    },

    //远程数据渲染地图标注及信息窗
    localSearch: function(map, data, option) {
      var _this = this,
        option = option || {},
        lng = option.lng,
        lat = option.lat,
        title = option.title,
        html = _this.config.infoBoxmb,
        infoWobj = {}

      if (data && lng && lat) {
        var k = 0
        $('.search-result .title .in span').html(title + '周边楼盘')
        $('.search-result .con').html('')
        for (key in data) {
          var str_s =
            "<div index='" + k + "' class='mb10'><dt>" + key + '</dt></div>'
          $('.search-result .con').append(str_s)

          for (var i = 0; i < data[key].length; i++) {
            var _ki = k.toString() + i.toString()
            data[key][i].i = _ki
            BMapLib.InfoBox.prototype.addresult = function(div, con) {
              $(div).append(con)
            }
            var price =
              data[key][i].price == '待定'
                ? '<em>待定</em>'
                : '<em>' + data[key][i].price + '</em>元/平方米'
            var point = new BMap.Point(data[key][i].lng, data[key][i].lat),
              content = _this.formatTemplate(data[key][i], html),
              opts = {
                boxStyle: {
                  width: '356px',
                  height: '250px'
                },
                offset: new BMap.Size(0, 10),
                closeIconUrl: '//static.fdc.com.cn/nh/images/close0.gif',
                enableAutoPan: true
              },
              indiv = '.search-result .con div:eq(' + k + ')',
              ddcon1 =
                "<dd class='clearfix' onMouseOver=\"fBMap.RMover['" +
                _ki +
                '\']()" onMouseOut="fBMap.RMout[\'' +
                _ki +
                '\']()" onClick="fBMap.RMclick[\'' +
                _ki +
                '\']()" index=' +
                i +
                ' lng=' +
                data[key][i].lng +
                ' lat=' +
                data[key][i].lat +
                " ><a href='javascript:void(0)' title='" +
                data[key][i].title +
                "' ><span class='d1'>" +
                data[key][i].distance +
                "米</span><span class='d2'>" +
                price +
                "</span><span class='d3'><em>" +
                (i + 1) +
                '</em>' +
                data[key][i].title +
                '</span></a></dd>',
              //ddcon2 = "<dd class='clearfix' onMouseOver=\"fBMap.RMover[\'"+_ki+"\']()\" onMouseOut=\"fBMap.RMout[\'"+_ki+"\']()\" onClick=\"fBMap.RMclick[\'"+_ki+"\']()\" style='display:none' index="+i+" lng="+data[key][i].lng+" lat="+data[key][i].lat+" ><a href='javascript:void(0)' title='"+data[key][i].title+"' ><span class='d1'>"+data[key][i].distance+"米</span><span class='d2'><em>"+data[key][i].price+"</em>元/平方米</span><span class='d3'><em>"+(i+1)+"</em>"+data[key][i].title+"</span></a></dd>",
              //ddcon = i>4?ddcon2:ddcon1,
              ddcon = ddcon1,
              infoW = new BMapLib.InfoBox(map, content, opts)
            infoW.addresult(indiv, ddcon)
            _this.addMarker(map, point, infoW, k, i, _ki)
          }

          // if(data[key].length>5){
          // 	var morestr="<span class='mscother'><span class='mscomore'><a href='javascript:void(0)'>更多</a></span><span class='mscoputup'><a href='javascript:void(0)'>收起</a></span></span>";
          // 	$(".search-result .con div[index="+k+"]").append(morestr);
          // }
          k += 1
        }
        //_this.moreUp();
      } else if (lng && lat) {
        //如果没有远程数据
        _this.nearbySearch('', '楼盘', '小区', true, lng, lat, title, 5000)
      } else {
        //如果URL地址中没有经纬度，设置成搜索武汉中心城区的小区
        //nearbySearch:function(main,keys,reload,lng,lat,title,radius)
        _this.nearbySearch('', '楼盘', '小区', true, '', '', '武汉中心', 10000)
      }
    },

    //中心楼盘的标注
    selfAdd: function(mp, option) {
      function ComplexCustomOverlay(point, text, mouseoverText) {
        this._point = point
        this._text = text
        this._overText = mouseoverText
      }
      ComplexCustomOverlay.prototype = new BMap.Overlay()
      ComplexCustomOverlay.prototype.initialize = function(map) {
        this._map = map
        var div = (this._div = document.createElement('div'))
        // div.style.position = "absolute";
        div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat)
        div.className = 'centerpoint'
        // div.style.backgroundColor = "#EE5D5B";
        // div.style.border = "1px solid #BC3B3A";
        // div.style.color = "white";
        // div.style.height = "18px";
        // div.style.padding = "2px 8px";
        // div.style.lineHeight = "18px";
        // div.style.whiteSpace = "nowrap";
        // div.style.MozUserSelect = "none";
        // div.style.fontSize = "12px"
        var span = (this._span = document.createElement('span'))
        div.appendChild(span)
        span.appendChild(document.createTextNode(this._text))
        var that = this

        var arrow = (this._arrow = document.createElement('div'))
        arrow.className = 'centerarrow'
        // arrow.style.background = "url(//map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
        // arrow.style.position = "absolute";
        // arrow.style.width = "11px";
        // arrow.style.height = "10px";
        // arrow.style.top = "22px";
        arrow.style.left = '20px'
        // arrow.style.overflow = "hidden";
        div.appendChild(arrow)

        div.onmouseover = function() {
          // this.style.backgroundColor = "#6BADCA";
          // this.style.borderColor = "#4e97b7";
          this.getElementsByTagName('span')[0].innerHTML = that._overText
          // arrow.style.backgroundPosition = "0px -20px";
          this.className += ' centerpointhover'
        }
        div.onmouseout = function() {
          // this.style.backgroundColor = "#EE5D5B";
          // this.style.borderColor = "#BC3B3A";
          this.getElementsByTagName('span')[0].innerHTML = that._text
          // arrow.style.backgroundPosition = "0px 0px";
          this.className = 'centerpoint'
        }
        div.onclick = function(){
          alert("dslgsdg")
          // debugger
          console.log("aldlkgjs")
        }
        mp.getPanes().labelPane.appendChild(div)
        return div
      }
      ComplexCustomOverlay.prototype.draw = function() {
        var map = this._map
        var pixel = map.pointToOverlayPixel(this._point)
        this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + 'px'
        this._div.style.top = pixel.y - 30 + 'px'
      }

      var option = option || {},
        lng = option.lng,
        lat = option.lat,
        title = option.title,
        price = option.price

      mouseoverTxt = price ? title + ' ' + price : title + ' 房价待定'
      if (lng && lat) {
        var myCompOverlay = new ComplexCustomOverlay(
          new BMap.Point(lng, lat),
          title,
          mouseoverTxt
        )
        mp.addOverlay(myCompOverlay)
      }
    },

    //post数据
    getServiceData: function(option, callback, mapdata) {
      var _this = this,
        option = option || {},
        lng = option.lng,
        lat = option.lat
      // if (typeof(_this.config.postUrl) != "") {
      // 	$.ajax({
      // 		type: "get",
      // 		url: _this.config.postUrl,
      // 		data: "",
      // 		contentType: "application/x-www-form-urlencoded",
      // 		dataType: "html",
      // 		success: function(data) {
      // 			data = $.parseJSON(data);
      //                      console.log(data);
      // 			for(key in data){

      // 				for (var i = 0; i < data[key].length; i++) {
      // 					var distance = _this.getShortDistance(lng, lat, data[key][i].lng, data[key][i].lat);
      // 					data[key][i].distance = distance;
      // 				}
      // 				_this.shellSort(data[key]);
      // 			}

      // 			if ($.type(callback) == "function") {
      // 				callback(data);
      // 			}
      // 		},
      // 		error: function(mes) {
      // 			callback();//远程出错的话，就搜索附近小区
      // 			console.log(mes);
      // 		}
      // 	});
      // }
      // var data = $.parseJSON(data);
      //从页面隐藏域中获取周边楼盘数据
      //var data = $.parseJSON($(".aroundHouseData").val());
      var data = eval('(' + mapdata + ')')
      // console.log(data);
      for (key in data) {
        for (var i = 0; i < data[key].length; i++) {
          var distance = _this.getShortDistance(
            lng,
            lat,
            data[key][i].lng,
            data[key][i].lat
          )
          data[key][i].distance = distance
        }
        _this.shellSort(data[key])
      }

      if ($.type(callback) == 'function') {
        callback(data)
      }
    },
    overmarker: function(marker, k, i, bi, ki) {
      var _this = this
      var focusInfoWinFun = function() {
        $('#point' + ki).addClass('cur')
        $(".search-result .con div[index='" + k + "']")
          .find('dd:eq(' + i + ') a')
          .addClass('cur')
        var _index = $('#point' + ki)
          .parent()
          .css('z-index')
        $('#point' + ki)
          .parent()
          .css('z-index', Math.abs(_index))
      }
      marker.addEventListener('mouseover', focusInfoWinFun)
      return focusInfoWinFun
    },

    outmarker: function(marker, info, k, i, bi, ki) {
      var _this = this
      var focusInfoWinFun = function() {
        if (
          info._isOpen &&
          $('#info' + ki)
            .parent()
            .is(':visible')
        ) {
          return
        } else {
          $('#point' + ki).removeClass('cur')
          $(".search-result .con div[index='" + k + "']")
            .find('dd:eq(' + i + ') a')
            .removeClass('cur')
          var _index = $('#point' + ki)
            .parent()
            .css('z-index')
          $('#point' + ki)
            .parent()
            .css('z-index', -Math.abs(_index))
        }
      }
      marker.addEventListener('mouseout', focusInfoWinFun)
      return focusInfoWinFun
    },

    clickmarker: function(marker, point, info, k, i, bi, ki) {
      var _this = this
      var focusInfoWinFun = function() {
        $('.infoBox').hide()
        $('.pointicon').removeClass('cur')
        $('.search-result .con div')
          .find('dd a')
          .removeClass('cur')
        info.open(point)
        $('.infoBox')
          .find('.ib_down ul li')
          .click(function() {
            _this.idownLi_click($(this))
          })
        $('#point' + ki).addClass('cur')
        $(".search-result .con div[index='" + k + "']")
          .find('dd:eq(' + i + ') a')
          .addClass('cur')
        //去掉多余的关闭按钮
        //2016.9.27 zhangchang
        $('.infoBox>img').remove()
        //处理价格待定
        var price = $('.infoBox .left_box .price').text()
        if (price == '待定' || price == '') {
          $('.infoBox .left_box .price')
            .parent()
            .html('<span class="price">待定</span>')
        }
        // $(".infoBox").find(".close").mouseover(function(){
        // 	$(this).css("background-image","url(img/close1.gif)")
        // });
        // $(".infoBox").find(".close").mouseout(function(){
        // 	$(this).css("background-image","url(//static.fdc.com.cn/nh/images/close0.gif)")
        // });
        $('.infoBox')
          .find('.close')
          .click(function() {
            info.close()
            $('#point' + ki).removeClass('cur')
            $(".search-result .con div[index='" + k + "']")
              .find('dd:eq(' + i + ') a')
              .removeClass('cur')
            var _index = $('#point' + ki)
              .parent()
              .css('z-index')
            $('#point' + ki)
              .parent()
              .css('z-index', -Math.abs(_index))
          })

        $('.infoBox')
          .find('.inp_submit')
          .click(function() {
            _this.infoclick($(this))
          })
      }
      marker.addEventListener('click', focusInfoWinFun)
      return focusInfoWinFun
    },

    //弹窗上按钮点击函数
    infoclick: function(e) {
      var _this = this,
        leibe = e.attr('leibe')

      switch (leibe) {
        case '11':
          if (e.prevAll('input').val() == '') {
            dialog.showMsg('error', '没有输入内容哦')
            return false
          }
          var start = e.prev('input').val(),
            end = e.attr('end')
          _this.busSearch(start, end, 1)
          break

        case '12':
          if (e.prevAll('input').val() == '') {
            dialog.showMsg('error', '没有输入内容哦')
            return false
          }
          var start = e.prevAll('input').val(),
            end = e.attr('end')
          _this.driSearch(start, end, 1)
          break

        case '21':
          if (e.prevAll('input').val() == '') {
            dialog.showMsg('error', '没有输入内容哦')
            return false
          }
          var end = e.prevAll('input').val(),
            start = e.attr('start')
          _this.busSearch(start, end, 2)
          break

        case '22':
          if (e.prevAll('input').val() == '') {
            dialog.showMsg('error', '没有输入内容哦')
            return false
          }
          var end = e.prevAll('input').val(),
            start = e.attr('start')
          _this.driSearch(start, end, 2)
          break

        case '31':
          if (e.prevAll('input').val() == '') {
            dialog.showMsg('error', '没有输入内容哦')
            return false
          }
          var keys = e.prevAll('input').val(),
            main = keys,
            lng = e.attr('lng'),
            lat = e.attr('lat'),
            title = e.attr('title')
          _this.nearbySearch(main, keys, true, lng, lat, title)
          break

        default:
          return
      }
    },
    RMover: [],
    RMout: [],
    RMclick: [],
    RRmove: [],
    //新增标注
    addMarker: function(map, point, info, k, i, ki) {
      var _this = this,
        bi = i,
        myIcondiv =
          "<div class='pointicon' id='point" +
          ki +
          "' k='" +
          k +
          "' i='" +
          i +
          "'>" +
          (i + 1) +
          '</div>'
      if (i > 9) {
        bi = 10
      }
      var myRichMarker = new BMapLib.RichMarker(myIcondiv, point, {
        anchor: new BMap.Size(-9.5, 0),
        enableDragging: false
      })

      _this.RMover[ki] = _this.overmarker(myRichMarker, k, i, bi, ki)
      _this.RMout[ki] = _this.outmarker(myRichMarker, info, k, i, bi, ki)
      _this.RMclick[ki] = _this.clickmarker(
        myRichMarker,
        point,
        info,
        k,
        i,
        bi,
        ki
      )

      map.addOverlay(myRichMarker)
    },

    //计算距离
    getShortDistance: function(lon1, lat1, lon2, lat2) {
      var DEF_PI = 3.14159265359
      var DEF_2PI = 6.28318530712
      var DEF_PI180 = 0.01745329252
      var DEF_R = 6370693.5
      var ew1, ns1, ew2, ns2, dx, dy, dew, distance

      ew1 = lon1 * DEF_PI180
      ns1 = lat1 * DEF_PI180
      ew2 = lon2 * DEF_PI180
      ns2 = lat2 * DEF_PI180

      dew = ew1 - ew2

      if (dew > DEF_PI) dew = DEF_2PI - dew
      else if (dew < -DEF_PI) dew = DEF_2PI + dew
      dx = DEF_R * Math.cos(ns1) * dew
      dy = DEF_R * (ns1 - ns2)

      distance = Math.sqrt(dx * dx + dy * dy)
      return parseInt(distance)
    },

    //按距离排序
    shellSort: function(arr) {
      for (var step = arr.length >> 1; step > 0; step >>= 1) {
        for (var i = 0; i < step; ++i) {
          for (var j = i + step; j < arr.length; j += step) {
            var k = j,
              value = arr[j].distance,
              tmp = arr[j]
            while (k >= step && arr[k - step].distance > value) {
              arr[k] = arr[k - step]
              k -= step
            }
            arr[k] = tmp
          }
        }
      }
      return arr
    },

    //模板填充
    formatTemplate: function(dta, tmpl) {
      var format = {
        name: function(x) {
          return x
        }
      }
      return tmpl.replace(/{(\w+)}/g, function(m1, m2) {
        if (!m2) return ''
        return format && format[m2] ? format[m2](dta[m2]) : dta[m2]
      })
    },

    //测距
    disTool: function() {
      var _this = this,
        map = _this.config.map,
        myDis = new BMapLib.DistanceTool(map)
      return myDis
    },

    //监听地图的缩放
    zoomend: function(map) {
      var _this = this,
        map = map || _this.config.map,
        _centerPoint = map.getCenter()
      if ($.type(map) == 'object') {
        map.addEventListener('zoomend', function() {
          var nowzoom = map.getZoom()
          if (nowzoom <= 12) {
            map.setZoom(12)
            map.setCenter(_centerPoint)
          }
        })
      }
    }
  }

  window.fBMap = fBMap
})()

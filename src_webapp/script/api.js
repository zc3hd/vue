(function($, window) {
  var root_path = '/cors-mot';
  // var root_path = '';

  var error_path = root_path + "/login.html";

  function API() {
    var me = this;
  };

  API.prototype = {
    // 
    v2: {
      // ------------------------------------卫星
      satellite: function(obj) {
        return $.ajax({
          url: root_path + "/satellite/status/findAll1.do",
          dataType: "json",
          type: "POST",
          data: obj
        });
      },
      // -----------------------------------系统流程
      flow: {
        // 图形
        ec: function(obj) {
          return $.ajax({
            url: root_path + "/flowchart/findAll_v2.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 行业
        hy: function(obj) {
          return $.ajax({
            url: root_path + "/flowchart/findIndustrySourceInfo.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 集群
        jq: function(obj) {
          return $.ajax({
            url: root_path + "/flowchart/findClusterInfo.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 数据预处理
        yuchuli: function(obj) {
          return $.ajax({
            url: root_path + "/flowchart/findProcessInfo.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 算法
        suanfa: function(obj) {
          return $.ajax({
            url: root_path + "/flowchart/findAlgorithm_v2.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 播发
        bofa: function(obj) {
          return $.ajax({
            url: root_path + "/flowchart/findBroadcastInfo.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 最后的服务
        fuwu: function(obj) {
          return $.ajax({
            url: root_path + "/flowchart/findProductInfo.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 
        line: function(obj) {
          return $.ajax({
            url: root_path + "/flowchart/findLineInfo.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
      // -----------------------------------服务评估
      service: {
        // 
        list: function(obj) {
          return $.ajax({
            url: root_path + "/assessment/findAll.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 区域详情
        info: function(obj) {
          return $.ajax({
            url: root_path + "/assessment/findByModuleId.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },

      // --------------------------------------------------------------
      //在线统计
      onLineCountData: {
        //基准网站系统下拉框功能
        moduleByType: function(obj) {
          return $.ajax({
            url: root_path + "/stationOnlineCount/findAllModuleByType.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 在线统计数据
        allData: function(obj) {
          return $.ajax({
            url: root_path + "/stationOnlineCount/findPageStationOnLine.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 根据时间请求在线率
        lineReport: function(obj) {
          return $.ajax({
            url: root_path + "/stationOnlineCount/findPageOnLineReport.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
      //基站列表
      stationList: {
        list: function(obj) {
          return $.ajax({
            url: root_path + "/stationRealTimeInfo/findPageStationRealTimeInfo.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        province: function(obj) {
          return $.ajax({
            url: root_path + "/stationRealTimeInfo/findAllProvince.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        moduleByType: function(obj) {
          return $.ajax({
            url: root_path + "/stationRealTimeInfo/findAllModuleByType.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        }
      },
    },
    // 
    v1: {
      // ------------------------------------路网
      show_map: {
        // 测试接口
        test: function(obj) {
          return $.ajax({
            url: root_path + "/assessment/findAll.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 全部站点
        cors: function(obj) {
          return $.ajax({
            url: root_path + "/station/findAllPoints.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 站点数据
        cors_info: function(obj) {
          return $.ajax({
            url: root_path + "/starChart/findSatelliteNumBySid.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
      // ------------------------------------cors基站列表
      point: {
        // 运行转台列表
        run_list: function() {
          return root_path + "/runstat/findPageAll.do";
        },
        // 区域名称搜索
        area_search: function(obj) {
          return $.ajax({
            url: root_path + "/area/findAreaFenceByAreaName.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 所有省级的数据
        ad_data: function(obj) {
          return $.ajax({
            url: root_path + "/area/findAllAdcode.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 
        to_area: function(obj) {
          return $.ajax({
            url: root_path + "/area/findByPAdcode.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 
        to_cors: function(obj) {
          return $.ajax({
            url: root_path + "/area/findStationsByAreaId.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
      // ------------------------------------cors基站列表
      // 地图搜索--已全部转换
      cors_map: {
        // 全部站点
        cors: function(obj) {
          return $.ajax({
            url: root_path + "/station/findAllPoints.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 站点聚合
        cors_cluster: function(obj) {
          return $.ajax({
            url: root_path + "/station/findAllTogether.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 按基站搜索
        search: function(obj) {
          return $.ajax({
            url: root_path + "/station/findStationsByStationName.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
      cors_list: {
        // 列表
        list: function() {
          return root_path + "/station/findPageAll.do";
        },
        // 保存图片地址
        img: function() {
          return root_path + "/upload.do";
        },
        // 新增
        add: function(obj) {
          return $.ajax({
            url: root_path + "/station/save.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 修改
        upd: function(obj) {
          return $.ajax({
            url: root_path + "/station/update.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 
        del: function(obj) {
          return $.ajax({
            url: root_path + "/station/deleteById.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 
        // 基准站坐标
        stable: function(obj) {
          return $.ajax({
            url: root_path + "/base/stationc/findAllByStationId.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // -----------------------------------------
        // 已选择的站点的列表
        sel_list: function() {
          return root_path + "/area/findAllByAreaId.do";
        },
        // 确认选择的站点
        sel_add: function(obj) {
          return $.ajax({
            url: root_path + "/area/saveAreaStation.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 删除已选站点--没有URL
        sel_del: function(obj) {
          return $.ajax({
            url: root_path + "/area/deleteAreaStation.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
      // 报警删除
      cors_alarm: {
        // 列表
        list: function() {
          return root_path + "/station/alarm/findPageAll.do";
        },
        // 
        del: function(obj) {
          return $.ajax({
            url: root_path + "/station/alarm/deleteByIds.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 
        pie: function(obj) {
          return $.ajax({
            url: root_path + "/station/alarm/findTypePrecent.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 
        area: function(obj) {
          return $.ajax({
            url: root_path + "/area/findAllForSelect.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
      },
      // ---------------------------------------用户
      user: {
        // 列表
        list: function() {
          return root_path + "/userinfo/findPageAll.do";
        },
        // 新增
        add: function(obj) {
          return $.ajax({
            url: root_path + "/userinfo/save.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 修改
        upd: function(obj) {
          return $.ajax({
            url: root_path + "/userinfo/update.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 
        del: function(obj) {
          return $.ajax({
            url: root_path + "/userinfo/deleteByIds.do",
            dataType: "json",
            type: "POST",
            data: obj
          });

          // ids: '1,2'
        },
        // on 
        onoff: function(obj) {
          // body...
          return $.ajax({
            url: root_path + "/userinfo/updateStatus.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // pos 
        pos: function(obj) {
          // body...
          return $.ajax({
            url: root_path + "/userinfo/findLastestLocationByUserNO.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 查询时间段的
        times: function(obj) {
          // body...
          return $.ajax({
            url: root_path + '/userinfo/findAllTimePeriods.do',
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 查询具体的轨迹点的
        line: function(obj) {
          // body...
          return $.ajax({
            url: root_path + "/userinfo/findUserLocus1.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },

      },
      // ---------------------------------------完好性检测
      status: {
        // 电离层
        electron: function(obj) {
          return $.ajax({
            url: root_path + "/tecu/info/findByCreateTime.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 卫星ec版
        satellite: function(obj) {
          return $.ajax({
            url: root_path + "/satellite/status/findAll.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },

        // rtd-增强服务性能
        rtd_strengthen: function(obj) {
          return $.ajax({
            url: root_path + "/obs/analay/findByStationId.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
      // ---------------------------------------主页
      main: {
        // 延时
        delay: function(obj) {
          return $.ajax({
            url: root_path + "/obs/analay/findAllDelay.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 报警日志
        alarm: function(obj) {
          return $.ajax({
            url: root_path + "/station/log/findLastLog.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 全部站点
        cors: function(obj) {
          return $.ajax({
            url: root_path + "/station/findAllPoints.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 站点数据
        cors_info: function(obj) {
          return $.ajax({
            url: root_path + "/starChart/findSatelliteNumBySid.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 完好
        good: function(obj) {
          return $.ajax({
            url: root_path + "/multipath/findAllLossData.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // RT
        RT: function() {
          return $.ajax({
            url: root_path + "/home/findCurrentUserNum.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 顶部信息
        top_info: function() {
          return $.ajax({
            url: root_path + "/home/findSummary.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
      },
      // --------------------------------------区域设置
      // 区域设置
      area: {
        // 列表
        list: function() {
          return root_path + "/area/findPageAll.do";
        },
        // 新增
        add: function(obj) {
          return $.ajax({
            url: root_path + "/area/save.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 删除
        del: function(obj) {
          return $.ajax({
            url: root_path + "/area/deleteById.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
      // 区域设置的地图
      area_map: {
        // ids--找到站点
        cors: function(obj) {
          return $.ajax({
            url: root_path + "/area/findAllStationByIds.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 单个ID--已经选择的区域数据
        area: function(obj) {
          return $.ajax({
            url: root_path + "/area/findAreaFenceByAreaId.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // ids--已经选择的区域数据
        areas: function(obj) {
          return $.ajax({
            url: root_path + "/area/findAreaFenceByAreaIds.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 新增
        add: function(obj) {
          return $.ajax({
            url: root_path + "/area/saveAreaFence.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 更新
        upd: function(obj) {
          return $.ajax({
            url: root_path + "/area/updateAreaFenceByAreaId.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
    },
  };
  conf.module["API"] = API;
  // 测试
  FN.test_ajax(root_path, new conf.module.API().test);
})(jQuery, window);

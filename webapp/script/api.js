(function($, window) {
  var root_path = '/cors-mot';
  // var root_path = '';

  var error_path = root_path + "/login.html";

  function API() {
    var me = this;
  };

  API.prototype = {
    test: [

      //   500
      // {
      //   name:'cors-list',
      //   url:'/station/findAll.do',
      //   // data:{

      //   // },
      // }


      // 
    ],
    // 模块三
    v3: {
      // -----------------------------------监测站
      show_jiance: {
        // 测试接口
        test: function(obj) {
          return $.ajax({
            url: root_path + "/assessment/findAll.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
      },
      // -----------------------------------用户展示
      show_user: {
        test: function(obj) {
          return $.ajax({
            url: root_path + "/assessment/findAll.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        pos: function(obj) {
          return $.ajax({
            url: root_path + "/userinfo/findLastestLocationByUserNO.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
    },
    // 
    v2: {
      // ------------------------------------行业与集群
      hj: {

        h_list: function() {
          return $.ajax({
            url: root_path + "/industry/source/findAll.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        h_add: function(obj) {
          return $.ajax({
            url: root_path + "/industry/source/save.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 编辑行业
        h_upd: function(obj) {
          return $.ajax({
            url: root_path + "/industry/source/update.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 
        h_del: function(obj) {
          return $.ajax({
            url: root_path + "/industry/source/deleteById.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 保存行业与集群
        h_j: function(obj) {
          return $.ajax({
            url: root_path + "/industry/source/saveIndustrySourceCluster.do ",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // -------------------------------------------------
        // 
        j_add: function(obj) {
          return $.ajax({
            url: root_path + "/cluster/save.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        j_upd: function(obj) {
          return $.ajax({
            url: root_path + "/cluster/update.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 
        j_del: function(obj) {
          return $.ajax({
            url: root_path + "/cluster/deleteById.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 未选集群
        j_un_sel: function(obj) {
          return $.ajax({
            url: root_path + "/cluster/findAllUndistributed.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 
        j_list: function(argument) {
          return $.ajax({
            url: root_path + "/cluster/findAll.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // ------------------------------------------------
        s_list: function() {
          return $.ajax({
            url: root_path + "/receiver/findAllUndistributed.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        s_sure: function(obj) {
          return $.ajax({
            url: root_path + "/cluster/saveClusterReceiver.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
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
      // -----------------------------------报警统计
      alarm_tongji: {
        // 所有报警的列表
        list: function(obj) {
          return $.ajax({
            url: root_path + "/alert/findAll.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 处理报警
        upd: function(obj) {
          return $.ajax({
            url: root_path + "/alert/update.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
      // --------------------------------------------------------------
      //在线统计
      onLineCountData:{
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
      stationList:{
    	  list:function(obj) {
              return $.ajax({
                url: root_path + "/stationRealTimeInfo/findPageStationRealTimeInfo.do",
                dataType: "json",
                type: "POST",
                data: obj
              });
            },
            province:function(obj){
            	return $.ajax({
                    url: root_path + "/stationRealTimeInfo/findAllProvince.do",
                    dataType: "json",
                    type: "POST",
                    data: obj
                  });
            },
            moduleByType:function(obj){
            	return $.ajax({
                    url: root_path + "/stationRealTimeInfo/findAllModuleByType.do",
                    dataType: "json",
                    type: "POST",
                    data: obj
                  });
            }
      },
      // $$$$$$$$$$$$$$--用户列表--转换完成
      user: {
        // 
        list: function(obj) {
          // 
          return $.ajax({
            url: root_path + "/userinfo/findPageAll.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // add
        add: function(obj) {
          return $.ajax({
            url: root_path + "/userinfo/save.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        upd: function(obj) {
          return $.ajax({
            url: root_path + "/userinfo/update.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 
        live: function(obj) {
          return $.ajax({
            url: root_path + "/userinfo/updateStatus.do",
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
        },
        // 
        pos: function(obj) {
          return $.ajax({
            url: root_path + "/userinfo/findLastestLocationByUserNO.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 
        history: function(obj) {
          return $.ajax({
            url: root_path + "/userinfo/findUserLocus1.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
      // -----------------------------------报警选择
      alarm_sel: {
        // 所有基站的列表
        list: function(obj) {
          return $.ajax({
            url: root_path + "/alert/conf/findAll.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 
        set: function(obj) {
          return $.ajax({
            url: root_path + "/alert/conf/update.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
      // -----------------------------------通讯设置
      email: {
        // 所有基站的列表
        list: function(obj) {
          return $.ajax({
            url: root_path + "/sysuser/findAll.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 
        add: function(obj) {
          return $.ajax({
            url: root_path + "/sysuser/save.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // upd 
        upd: function(obj) {
          return $.ajax({
            url: root_path + "/sysuser/update.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // del 
        del: function(obj) {
          return $.ajax({
            url: root_path + "/sysuser/deleteById.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 
        live: function(obj) {
          return $.ajax({
            url: root_path + "/sysuser/updateValid.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 获取发件人
        send_get: function() {
          return $.ajax({
            url: root_path + "/sysuser/findSender.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 保存发件人
        send_upd: function(obj) {
          return $.ajax({
            url: root_path + "/sysuser/saveOrUpdateSender.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
      // -----------------------------------服务器
      server: {
        // 获取报警
        get: function(obj) {
          return $.ajax({
            url: root_path + "/server/findDefaultSetting.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 设置报警
        set: function(obj) {
          return $.ajax({
            url: root_path + "/server/updateDefaultSetting.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 
        list: function(obj) {
          return $.ajax({
            url: root_path + "/server/findAll.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // upd 
        upd: function(obj) {
          return $.ajax({
            url: root_path + "/server/updateSettingByServerId.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
      // -------------------------------------算法
      method: {
        // 获取报警
        get: function(obj) {
          return $.ajax({
            url: root_path + "/algorithm/findDefaultConfAndSetting.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 设置报警
        set: function(obj) {
          return $.ajax({
            url: root_path + "/algorithm/updateDefaultConfAndSetting.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        list: function(obj) {
          return $.ajax({
            url: root_path + "/algorithm/findAll.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 
        upd: function(obj) {
          return $.ajax({
            url: root_path + "/algorithm/updateConfAndSetting.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
      // ------------------------------------基站
      cors: {
        // 获取报警
        get: function(obj) {
          return $.ajax({
            url: root_path + "/station/findDefaultSetting.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 设置报警
        set: function(obj) {
          return $.ajax({
            url: root_path + "/station/updateDefaultSetting.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 所有基站的列表
        list: function(obj) {
          return $.ajax({
            url: root_path + "/station/findPageAll.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 
        img: function() {
          return root_path + "/upload.do";
        },
        // 
        add: function(obj) {
          return $.ajax({
            url: root_path + "/station/save.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // upd 
        upd: function(obj) {
          return $.ajax({
            url: root_path + "/station/update.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // del 
        del: function(obj) {
          return $.ajax({
            url: root_path + "/station/deleteById.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
      // $$$$$$ -----------------------------------详情数据
      cors_detail: {
        // 详细信息
        info: function(obj) {
          return $.ajax({
            url: root_path + "/station/findById.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 
        xk: function(obj) {
          return $.ajax({
            url: root_path + "/starChart/findAllByStationId.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 信噪比
        xzb: function(obj) {
          return $.ajax({
            url: root_path + "/snr/findAllByStationId.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
      // ------------------------------------区段下选择基站
      area_cors: {
        // 所有基站的列表
        all: function(obj) {
          return $.ajax({
            url: root_path + "/station/findAll.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 保存多个基站
        save: function(obj) {
          return $.ajax({
            url: root_path + "/station/saveModuleStations.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },

        // ------------------------------------
        // 所有基站的列表
        sel: function(obj) {
          return $.ajax({
            url: root_path + "/station/findAllByModuleId.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },

        del: function(obj) {
          return $.ajax({
            url: root_path + "/station/deleteByModuleIdAndStationId.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
      },
      // ------------------------------------数据源
      area: {
        // 获取报警
        get: function(obj) {
          return $.ajax({
            url: root_path + "/module/datasource/findDefaultSetting.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 设置报警
        set: function(obj) {
          return $.ajax({
            url: root_path + "/module/datasource/updateDefaultSetting.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 
        list: function(obj) {
          return $.ajax({
            url: root_path + "/module/datasource/findAll.do",
            dataType: "json",
            type: "POST",
            // data: obj
          });
        },
        // 
        add: function(obj) {
          return $.ajax({
            url: root_path + "/module/datasource/save.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // upd 
        upd: function(obj) {
          return $.ajax({
            url: root_path + "/module/datasource/update.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
        // 
        del: function(obj) {
          return $.ajax({
            url: root_path + "/module/deleteById.do",
            dataType: "json",
            type: "POST",
            data: obj
          });
        },
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
    // 其他
    main: {
      // 登录
      in : function(obj) {
        return $.ajax({
          url: root_path + "/login.do",
          dataType: "json",
          type: "POST",
          data: obj
        });
      },
      // 
      out: function(obj) {
        return $.ajax({
          url: root_path + "/logout.do",
          dataType: "json",
          type: "POST",
          // data: obj
        });
      },
    },
  };
  conf.module["API"] = API;
  // 测试
  FN.test_ajax(root_path, new conf.module.API().test);
})(jQuery, window);

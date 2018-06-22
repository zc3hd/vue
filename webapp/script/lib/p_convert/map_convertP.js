/**
 * Item Name  : 
 *Creator         :cc
 *Email            :cc
 *Created Date:
 *@pararm     :
 */
//坐标转换
/**
 * Created with JetBrains WebStorm.
 * User: zhaojunyan
 * Date: 13-9-2
 * Time: 下午3:19
 * To change this template use File | Settings | File Templates.
 */

//
// Krasovsky 1940
//
// a = 6378245.0, 1/f = 298.3
// b = a * (1 - f)
// ee = (a^2 - b^2) / a^2;


// WGS84坐标系：即地球坐标系，国际上通用的坐标系。设备一般包含GPS芯片或者北斗芯片获取的经纬度为WGS84地理坐标系,谷歌地图采用的是WGS84地理坐标系（中国范围除外）;
// GCJ02坐标系：即火星坐标系，是由中国国家测绘局制订的地理信息系统的坐标系统。由WGS84坐标系经加密后的坐标系。谷歌中国地图和搜搜中国地图采用的是GCJ02地理坐标系; 
// BD09坐标系：即百度坐标系，GCJ02坐标系经加密后的坐标系;


// 坐标转换
var convert = {
  // wgs-baidu
  wgs_bd09: function(oLnglat) {
    var lnglat = {};
    var corG = convertWgsToGcj02(oLnglat.lng, oLnglat.lat);
    if (corG != false) {
      var corP = convertGcj02ToBd09(corG.longitude, corG.latitude);
      lnglat = { lng: corP.longitude, lat: corP.latitude };
    } else {
      lnglat = oLnglat;
    }
    return lnglat;
  },
  // GD
  wgs_gcj02: function(oLnglat) {
    var lnglat = {};
    var corG = convertWgsToGcj02(oLnglat.lng, oLnglat.lat);
    if (corG != false) {
      // var corP = convertGcj02ToBd09(corG.longitude, corG.latitude);
      lnglat = { lng: corG.longitude, lat: corG.latitude };
    } 
    else {
      lnglat = oLnglat;
    }
    return lnglat;
  },
};

var x_pi = 3.14159265358979324 * 3000.0 / 180.0;

var casm_rr = 0;
var casm_t1 = 0;
var casm_t2 = 0;
var casm_x1 = 0;
var casm_y1 = 0;
var casm_x2 = 0;
var casm_y2 = 0;
var casm_f = 0;

/**
 * Convert GCJ02 to BD09
 *
 * @param gg_lat
 * @param gg_lon
 * @return
 */
function convertGcj02ToBd09(gg_lon, gg_lat) {
  var x = gg_lon,
    y = gg_lat;
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);

  var p = {};
  p.longitude = z * Math.cos(theta) + 0.0065;
  p.latitude = z * Math.sin(theta) + 0.006;

  return p;
}

/**
 * Convert BD09 to GCJ02
 *
 * @param bd_lat
 * @param bd_lon
 * @return
 */
function convertBd09ToGcj02(bd_lon, bd_lat) {
  var x = bd_lon - 0.0065,
    y = bd_lat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);

  var p = {};
  p.longitude = z * Math.cos(theta);
  p.latitude = z * Math.sin(theta);

  return p;
}

/**
 * Convert WGS to GCJ02
 * @param x
 * @param y
 * @return
 */
function convertWgsToGcj02(x, y) {
  var x1, tempx, y1, tempy;
  x1 = x * 3686400.0;
  y1 = y * 3686400.0;
  var gpsWeek = 0;
  var gpsWeekTime = 0;
  var gpsHeight = 0;

  var point = wgtochina_lb(1, Math.floor(x1), Math.floor(y1), Math.floor(gpsHeight),
    Math.floor(gpsWeek), Math.floor(gpsWeekTime));
  if (point == null) {
    return false
  } else {
    tempx = point.x;
    tempy = point.y;
    tempx = tempx / 3686400.0;
    tempy = tempy / 3686400.0;

    point.longitude = tempx;
    point.latitude = tempy;
    return point;
  }
}

//百度地图坐标到gps坐标（误差较小）
function convertBd09ToWgs(bdLon, bdLat) {

  var a = convertWgsToGcj02(bdLon, bdLat);
  var b = convertGcj02ToBd09(a.longitude, a.latitude);

  //result
  x = (2 * bdLon - b.longitude).toFixed(14);
  y = (2 * bdLat - b.latitude).toFixed(14);

  return { lng: x*1, lat: y*1 }
}

function getEncryCoord(coord, flag) {
  if (flag) {
    var x = coord.split(",")[0];
    var y = coord.split(",")[1];
    var point = {};
    var x1, tempx;
    var y1, tempy;
    x1 = x * 3686400.0;
    y1 = y * 3686400.0;
    var gpsWeek = 0;
    var gpsWeekTime = 0;
    var gpsHeight = 0;
    point = wgtochina_lb(1, Math.floor(x1), Math.floor(y1),
      Math.floor(gpsHeight), Math.floor(gpsWeek), Math.floor(gpsWeekTime));
    tempx = point.x;
    tempy = point.y;
    tempx = tempx / 3686400.0;
    tempy = tempy / 3686400.0;
    return tempx + "," + tempy;
  } else {
    return "";
  }
}

function yj_sin2(x) {
  var tt;
  var ss;
  var ff;
  var s2;
  var cc;
  ff = 0;
  if (x < 0) {
    x = -x;
    ff = 1;
  }

  cc = Math.floor(x / 6.28318530717959);

  tt = x - cc * 6.28318530717959;
  if (tt > 3.1415926535897932) {
    tt = tt - 3.1415926535897932;
    if (ff == 1) {
      ff = 0;
    } else if (ff == 0) {
      ff = 1;
    }
  }
  x = tt;
  ss = x;
  s2 = x;
  tt = tt * tt;
  s2 = s2 * tt;
  ss = ss - s2 * 0.166666666666667;
  s2 = s2 * tt;
  ss = ss + s2 * 8.33333333333333E-03;
  s2 = s2 * tt;
  ss = ss - s2 * 1.98412698412698E-04;
  s2 = s2 * tt;
  ss = ss + s2 * 2.75573192239859E-06;
  s2 = s2 * tt;
  ss = ss - s2 * 2.50521083854417E-08;
  if (ff == 1) {
    ss = -ss;
  }
  return ss;
}

function Transform_yj5(x, y) {
  var tt;
  tt = 300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.sqrt(x * x));
  tt = tt + (20 * yj_sin2(18.849555921538764 * x) + 20 * yj_sin2(6.283185307179588 * x)) * 0.6667;
  tt = tt + (20 * yj_sin2(3.141592653589794 * x) + 40 * yj_sin2(1.047197551196598 * x)) * 0.6667;
  tt = tt + (150 * yj_sin2(0.2617993877991495 * x) + 300 * yj_sin2(0.1047197551196598 * x)) * 0.6667;
  return tt;
}

function Transform_yjy5(x, y) {
  var tt;
  tt = -100 + 2 * x + 3 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.sqrt(x * x));
  tt = tt + (20 * yj_sin2(18.849555921538764 * x) + 20 * yj_sin2(6.283185307179588 * x)) * 0.6667;
  tt = tt + (20 * yj_sin2(3.141592653589794 * y) + 40 * yj_sin2(1.047197551196598 * y)) * 0.6667;
  tt = tt + (160 * yj_sin2(0.2617993877991495 * y) + 320 * yj_sin2(0.1047197551196598 * y)) * 0.6667;
  return tt;
}

function Transform_jy5(x, xx) {
  var n;
  var a;
  var e;
  a = 6378245;
  e = 0.00669342;
  n = Math.sqrt(1 - e * yj_sin2(x * 0.0174532925199433) * yj_sin2(x * 0.0174532925199433));
  n = (xx * 180) / (a / n * Math.cos(x * 0.0174532925199433) * 3.1415926);
  return n;
}

function Transform_jyj5(x, yy) {
  var m;
  var a;
  var e;
  var mm;
  a = 6378245;
  e = 0.00669342;
  mm = 1 - e * yj_sin2(x * 0.0174532925199433) * yj_sin2(x * 0.0174532925199433);
  m = (a * (1 - e)) / (mm * Math.sqrt(mm));
  return (yy * 180) / (m * 3.1415926);
}

function r_yj() {
  // int casm_a = 314159269;
  // int casm_c = 453806245;
  return 0;
}

function random_yj() {
  var t;
  var casm_a = 314159269;
  var casm_c = 453806245;
  casm_rr = casm_a * casm_rr + casm_c;
  t = Math.floor(casm_rr / 2);
  casm_rr = casm_rr - t * 2;
  casm_rr = casm_rr / 2;
  return (casm_rr);
}

function IniCasm(w_time, w_lng, w_lat) {
  var tt;
  casm_t1 = w_time;
  casm_t2 = w_time;
  tt = Math.floor(w_time / 0.357);
  casm_rr = w_time - tt * 0.357;
  if (w_time == 0)
    casm_rr = 0.3;
  casm_x1 = w_lng;
  casm_y1 = w_lat;
  casm_x2 = w_lng;
  casm_y2 = w_lat;
  casm_f = 3;
}

function wgtochina_lb(wg_flag, wg_lng, wg_lat, wg_heit, wg_week, wg_time) {
  var x_add;
  var y_add;
  var h_add;
  var x_l;
  var y_l;
  var casm_v;
  var t1_t2;
  var x1_x2;
  var y1_y2;
  var point = null;
  if (wg_heit > 5000) {
    return point;
  }
  x_l = wg_lng;
  x_l = x_l / 3686400.0;
  y_l = wg_lat;
  y_l = y_l / 3686400.0;
  if (x_l < 72.004) {
    return point;
  }
  if (x_l > 137.8347) {
    return point;
  }
  if (y_l < 0.8293) {
    return point;
  }
  if (y_l > 55.8271) {
    return point;
  }
  if (wg_flag == 0) {
    IniCasm(wg_time, wg_lng, wg_lat);
    point = {};
    point.latitude = wg_lng;
    point.longitude = wg_lat;
    return point;
  }
  casm_t2 = wg_time;
  t1_t2 = (casm_t2 - casm_t1) / 1000.0;
  if (t1_t2 <= 0) {
    casm_t1 = casm_t2;
    casm_f = casm_f + 1;
    casm_x1 = casm_x2;
    casm_f = casm_f + 1;
    casm_y1 = casm_y2;
    casm_f = casm_f + 1;
  } else {
    if (t1_t2 > 120) {
      if (casm_f == 3) {
        casm_f = 0;
        casm_x2 = wg_lng;
        casm_y2 = wg_lat;
        x1_x2 = casm_x2 - casm_x1;
        y1_y2 = casm_y2 - casm_y1;
        casm_v = Math.sqrt(x1_x2 * x1_x2 + y1_y2 * y1_y2) / t1_t2;
        if (casm_v > 3185) {
          return (point);
        }
      }
      casm_t1 = casm_t2;
      casm_f = casm_f + 1;
      casm_x1 = casm_x2;
      casm_f = casm_f + 1;
      casm_y1 = casm_y2;
      casm_f = casm_f + 1;
    }
  }
  x_add = Transform_yj5(x_l - 105, y_l - 35);
  y_add = Transform_yjy5(x_l - 105, y_l - 35);
  h_add = wg_heit;
  x_add = x_add + h_add * 0.001 + yj_sin2(wg_time * 0.0174532925199433) + random_yj();
  y_add = y_add + h_add * 0.001 + yj_sin2(wg_time * 0.0174532925199433) + random_yj();
  point = {};
  point.x = (x_l + Transform_jy5(y_l, x_add)) * 3686400;
  point.y = (y_l + Transform_jyj5(y_l, y_add)) * 3686400;
  return point;
}

function isValid(validdays) {
  // long standand = 1253525356;
  var h = 3600;
  var currentTime = new Date();
  return !(currentTime.getTime() / 1000 - 1253525356 >= validdays * 24 * h);
}

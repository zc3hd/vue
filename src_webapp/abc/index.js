(function($, window) {
  function CC() {
    var me = this;


    me.conf = {
      // ============================
      // 复习总数
      review_sum: 6,

      // 复习模式
      // review_mode: {
      //   // 艾宾浩斯(H.Ebbinghaus)
      //   'Ebbinghaus': 6,
      // },


      // 复习的天数间隔
      review_plan: [],

      // 时间字符串数组
      _str_arr: [],
      // 时间chuo数组
      _chuo_arr: [],


      // ============================
      // 每个项目的字符串数组收集
      _str_obj: {},


      // ============================
      // 今天的日期
      _str_now: '',
    };

  };
  CC.prototype = {
    init: function() {
      var me = this;

      me._bind();

      me._init();

    },
    _bind: function() {
      var me = this;
      var fn = {
        _init: function() {

          me._now();
          // 初始化title
          me._title();

          // 初始化每条数据
          me._list();





        },
        // ======================================
        _now: function() {
          var ser = new Date();
          var miao = Date.parse(ser);
          me.conf._str_now = FN.f_miao_str(miao, true);
        },

        // ======================================
        _list: function() {
          for (var item in me.conf._str_obj) {
            // console.log(item,me.conf._str_obj[item]);
            // me.data=$.extend(true, {}, data); 
            me._list_one(item, me.conf._str_obj[item]);
          }

          $('#table').niceScroll({
            cursorcolor: '#ccc',
            autohidemode: false,
            cursorborder: '1px solid #ccc'
          });

          console.log(me.conf._str_obj);
        },
        _list_one: function(name, arr) {
          var new_arr = $.extend(true, [], me.conf._str_arr);
          var key = null;

          var str = `<span class='title'>${name}</span>`;

          var now_class = '';

          new_arr.forEach(function(ele, index) {
            key = arr.indexOf(ele);
            // 大数组中没有这个元素
            if (key == -1) {
              str += `<span></span>`;
            }
            // 有这个元素
            else {
              // 
              if (ele == me.conf._str_now) {
                now_class = "now";
              }
              // 
              else {
                now_class = "";
              }
              str += `<span class=${now_class}>${name}</span>`;

            }
          });

          $('#table').append(`
            <div class="item" style='width:${(me.conf._str_arr.length + 1)*120}px'>
              ${str}
            </div>`);
        },


        // ======================================
        // 标题初始化
        _title: function() {

          // 初始化复习的天数周期
          me._jiange_days();

          // 初始化所有的数据
          me._title_data();

          // 渲染
          me._title_init();
        },

        // 间隔天数
        _jiange_days: function() {
          var day = 1;
          for (var i = 0; i < me.conf.review_sum; i++) {
            me.conf.review_plan.push(day);
            day = day * 2;
            switch (day) {
              case 8:
                day = 7;
                break;
              case 14:
                day = 15;
                break;
            }
          }


        },


        // 所有项目的初始化
        _title_data: function() {

          // 
          plans_data.forEach(function(ele, index) {
            me._one_item_days(ele.name, FN.f_str_miao(ele.date));
          });
        },
        // 项目的戳和日期的收集
        _one_item_days: function(name, chuo) {
          // 新的戳
          var new_chuo = 0;
          var new_str = '';
          // 新元素的下标
          var new_index = -1;
          // 单独一个项目字符串串数组
          var new_str_arr = [];


          // 戳在大数组中的标识
          var chuo_key = null;


          // 收集
          me.conf.review_plan.forEach(function(ele, index) {
            new_chuo = 0;
            new_str = '';
            new_index = -1;

            // ===========================================
            // 新的戳
            new_chuo = chuo + 24 * 3600000 * (ele - 1);
            // 新日期
            new_str = FN.f_miao_str(new_chuo, true);


            // ===========================================
            // 新的字符串数组
            new_str_arr.push(new_str);



            // ===========================================
            // 新戳是否在大数组内部
            chuo_key = me.conf._chuo_arr.indexOf(new_chuo);
            // 没有这个元素
            if (chuo_key == -1) {

              // 第一次加元素
              if (me.conf._chuo_arr.length == 0) {
                // 加去
                me.conf._chuo_arr.push(new_chuo);
                me.conf._str_arr.push(new_str);

              }
              // 数组中已经有元素了,通过比较后进行放入
              else {
                // 新元素要添加的之前的下标
                new_index = me._one_item_days_index(new_chuo);

                me.conf._chuo_arr.splice(new_index + 1, 0, new_chuo);
                me.conf._str_arr.splice(new_index + 1, 0, new_str);
              }
            }
          });


          // 全局挂载
          me.conf._str_obj[name] = new_str_arr;
        },
        // 新戳的新下标的确认
        _one_item_days_index: function(new_chuo) {
          var new_index = -1;
          me.conf._chuo_arr.forEach(function(ele, index) {
            if (new_chuo > ele) {
              new_index = index;
              return;
            }
          });
          return new_index;
        },


        _title_init: function() {
          var str = '<span>item</span>';
          var now_class = "";
          me.conf._str_arr.forEach(function(ele, index) {
            if (ele == me.conf._str_now) {
              now_class = "now";
            } else {
              now_class = "";
            }
            str += `<span class=${now_class}>${ele}</span>`;

          });
          $('#title')
            .css('width', (me.conf._str_arr.length + 1) * 120 + 'px')
            .html(str);
        },


























      };
      for (var k in fn) {
        me[k] = fn[k];
      };
    },
  };
  window.CC = CC;
})(jQuery, window);

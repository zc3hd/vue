var vm = new Vue({
  // 可以为class dom 
  el: '#app',
  // 数据
  data: {
    info: 'w-vue',
    // ================================================
    obj: {
      a: 'admin',
      b: 'bdmin',
      c: 'cdmin',
      d: 'ddmin',
    },



    // ================================================
    arr: arr,
    // 用户的对象体
    user_obj: {
      // 整体弹窗的现实
      show: false,

      // 信息体
      title: '',
      name: '',
      // 当前点击的ID
      ac_id: null,

      // 添加那条的显示
      show_add: true,
      // 删除那条隐藏
      show_del: false,
      // upd 那条隐藏
      show_upd: false,

    },
  },
  // 方法
  methods: {
    // 关闭弹窗
    _layer_close: function() {
      var me = this;

      me.user_obj.title = '';
      me.user_obj.name = '';

      me.user_obj.show = false;
    },
    // 保存数据
    _layer_save: function() {
      var me = this;

      // add 
      if (me.user_obj.show_add) {
        if (me.user_obj.name == '') {
          layer.msg('the user`s name should be not empty!');
          return
        }
        var id = me.arr.length + "_" + Math.random();
        me.arr.push({
          id: id,
          name: me.user_obj.name,
        });

      }
      // del
      else if (me.user_obj.show_del) {
        var ac_index = 0;
        me.arr.forEach(function(ele, index) {
          if (ele.id == me.user_obj.ac_id) {
            ac_index = index;
          }
        });
        me.arr.splice(ac_index, 1);



      }
      // upd
      else if (me.user_obj.show_upd) {
        if (me.user_obj.name == '') {
          layer.msg('the user`s name should be not empty!');
          return
        }
        me.arr.forEach(function(ele, index) {
          if (ele.id == me.user_obj.ac_id) {
            ele.name = me.user_obj.name;
          }
        });

      }



      // 关闭弹窗的方法
      me._layer_close();
    },
    // ======================================
    // add
    _layer_add: function() {
      var me = this;

      me.user_obj.show = true;
      // add
      me.user_obj.show_add = true;
      // del
      me.user_obj.show_del = false;
      // upd
      me.user_obj.show_upd = false;

      // 标题
      me.user_obj.title = 'add item';
      // 初始化名称
      me.user_obj.name = '';
    },
    // 删除
    _layer_del: function(id) {
      var me = this;
      // 记录ID
      me.user_obj.ac_id = id;

      me.user_obj.show = true;

      // add
      me.user_obj.show_add = false;
      // del
      me.user_obj.show_del = true;
      // upd
      me.user_obj.show_upd = false;
    },
    _layer_upd: function(id) {
      var me = this;
      // 记录ID
      me.user_obj.ac_id = id;
      // 大框
      me.user_obj.show = true;

      // add
      me.user_obj.show_add = false;
      // del
      me.user_obj.show_del = false;
      // upd
      me.user_obj.show_upd = true;

      me.user_obj.title = 'upd item';
      me.arr.forEach(function(ele, index) {
        if (ele.id == me.user_obj.ac_id) {
          me.user_obj.name = ele.name;
        }
      });
    },





  }
});


var vm = new Vue({
  // 可以为class dom 
  el: '#app_2',
  // 数据
  data: {
    info: 'w-vue',
    // ================================================
    obj: {
      a: 'admin',
      b: 'bdmin',
      c: 'cdmin',
      d: 'ddmin',
    },



    // ================================================
    arr: [
      {
        name:1,
        id:1,
      },
      {
        name:2,
        id:2,
      },
    ],
    // 用户的对象体
    user_obj: {
      // 整体弹窗的现实
      show: false,

      // 信息体
      title: '',
      name: '',
      // 当前点击的ID
      ac_id: null,

      // 添加那条的显示
      show_add: true,
      // 删除那条隐藏
      show_del: false,
      // upd 那条隐藏
      show_upd: false,

    },
  },
  // 方法
  methods: {
    // 关闭弹窗
    _layer_close: function() {
      var me = this;

      me.user_obj.title = '';
      me.user_obj.name = '';

      me.user_obj.show = false;
    },
    // 保存数据
    _layer_save: function() {
      var me = this;

      // add 
      if (me.user_obj.show_add) {
        if (me.user_obj.name == '') {
          layer.msg('the user`s name should be not empty!');
          return
        }
        var id = me.arr.length + "_" + Math.random();
        me.arr.push({
          id: id,
          name: me.user_obj.name,
        });

      }
      // del
      else if (me.user_obj.show_del) {
        var ac_index = 0;
        me.arr.forEach(function(ele, index) {
          if (ele.id == me.user_obj.ac_id) {
            ac_index = index;
          }
        });
        me.arr.splice(ac_index, 1);



      }
      // upd
      else if (me.user_obj.show_upd) {
        if (me.user_obj.name == '') {
          layer.msg('the user`s name should be not empty!');
          return
        }
        me.arr.forEach(function(ele, index) {
          if (ele.id == me.user_obj.ac_id) {
            ele.name = me.user_obj.name;
          }
        });

      }



      // 关闭弹窗的方法
      me._layer_close();
    },
    // ======================================
    // add
    _layer_add: function() {
      var me = this;

      me.user_obj.show = true;
      // add
      me.user_obj.show_add = true;
      // del
      me.user_obj.show_del = false;
      // upd
      me.user_obj.show_upd = false;

      // 标题
      me.user_obj.title = 'add item';
      // 初始化名称
      me.user_obj.name = '';
    },
    // 删除
    _layer_del: function(id) {
      var me = this;
      // 记录ID
      me.user_obj.ac_id = id;

      me.user_obj.show = true;

      // add
      me.user_obj.show_add = false;
      // del
      me.user_obj.show_del = true;
      // upd
      me.user_obj.show_upd = false;
    },
    _layer_upd: function(id) {
      var me = this;
      // 记录ID
      me.user_obj.ac_id = id;
      // 大框
      me.user_obj.show = true;

      // add
      me.user_obj.show_add = false;
      // del
      me.user_obj.show_del = false;
      // upd
      me.user_obj.show_upd = true;

      me.user_obj.title = 'upd item';
      me.arr.forEach(function(ele, index) {
        if (ele.id == me.user_obj.ac_id) {
          me.user_obj.name = ele.name;
        }
      });
    },





  }
});

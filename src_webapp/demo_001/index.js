var vm = new Vue({
  // 可以为class dom 
  el: '#app',
  // 数据
  data: {
    // ----------------------------------------------基础学习
    obj: {
      a: 'admin',
      b: 'bdmin',
      c: 'cdmin',
      d: 'ddmin',
    },
    arr: [1, 1, 1, 3, 4],
    // 按钮控制的显示
    key: false,



    // ------------------------------------------------案例
    list: [
      { info: "xxx", id: 1 },
      { info: "qqq", id: 2 },
      { info: "eee", id: 3 },
    ],
    // 
    one: {
      // 整体弹窗的现实
      key: false,

      // 弹窗显示内容
      info: "",

      // 标识从哪里发起的弹窗
      str: "",

      // 修改的数据ID
      id: "",
    },
  },
  // 方法
  methods: {
    btn_ck: function() {
      // console.log(this);
      this.key = !this.key;
    },

    // -----------------------------------------------
    // add
    _layer_show: function() {
      // 显示
      this.one.key = true;
      // 
      this.one.info = '';

      // 从新增出点击进入
      this.one.str = "add";
    },
    // 关闭弹窗
    _layer_close: function() {
      // 
      this.one.key = false;
      // 
      this.one.info = '';
    },
    // 保存数据
    _layer_sure: function() {


      // 新增
      if (this.one.str == "add") {
        var id = this.list.length + "_" + Math.random();
        this.list.unshift({
          id: id,
          info: this.one.info,
        });
      }
      // upd
      else if (this.one.str == "upd") {
        // 找到信息
        this.list.some(function(ele) {
          if (ele.id == this.one.id) {
            ele.info = this.one.info;
            return true;
          }
        }.bind(this));
      }


      this._layer_close();
    },

    _layer_upd: function(id) {

      // 显示弹出
      this.one.key = true;

      this.one.id = id;

      // 找到信息
      this.list.some(function(ele) {
        if (ele.id == id) {
          this.one.info = ele.info;
          return true;
        }
      }.bind(this));

      // 标识
      this.one.str = "upd";
    },

    // 删除
    _layer_del: function(id) {
      this.list.some(function(ele, index) {
        if (ele.id == id) {
          this.list.splice(index, 1);
          return true;
        }
      }.bind(this));
    },






  }
});
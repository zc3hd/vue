(function($, window) {
  function Nav(opts) {};
  Nav.prototype = {
    init: function() {
      var me = this;


      me._bind();

      me._init();
    },
    _bind: function() {
      var me = this;
      var fn = {
        _init: function() {

          me._chuxing();
        },
        // 第一个雏形
        _chuxing: function() {



          // 弹窗ipt组件
          var cp_layer_ipt = Vue.extend({
            template: `
              <!-- x -->
              <div class="close" v-on:click="_close()">X</div>
              <!-- box -->
              <div class="main">
                <div class='layer_core'>
                  <div class="title">
                    {{title}}
                  </div>
                  <div class="box">
                    <!-- 添加  -->
                    <div class="add_item">
                      <div class="title">name</div>
                      <div class="info">
                        <input type="text" id="name" v-model="name_info">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- save -->
              <div class="yes" v-on:click="_save()">save :)</div>
            `,
            data: function() {
              return {
                // title: '',
                // name_info: '',
              };
            },
            props: {
              title: String,
              name_info: String,
            },
            methods: {
              _save: function() {
                var me = this;
                me.$emit('save', me.name_info);
              },
              _close:function () {
                var me = this;
                me.$emit('close', 1);
              },
            },
          });


          // 弹窗del组件
          var cp_layer_del = Vue.extend({
            template: `
              <!-- x -->
              <div class="close" v-on:click="_close()">X</div>
              <!-- box -->
              <div class="main">
                <div class='layer_core'>
                  <div class="title">
                    {{title}}
                  </div>
                  <div class="box">

                    <!-- del  -->
                    <div class="del_item"'>
                      will u delete this one ?
                    </div>

                  </div>
                </div>
              </div>
              <!-- save -->
              <div class="yes" v-on:click="_yes()">yes :)</div>
            `,
            data: function() {
              return {};
            },
            props: {
              id: String,
            },
            methods: {
              _yes: function() {
                var me = this;
                me.$emit('del', me.id);
              },
              _close:function () {
                var me = this;
                me.$emit('close', 1);
              },
            },
          });





          // 父组件
          var vm_main = new Vue({
            // 可以为class dom 
            el: '#app',
            // 数据
            data: {
              // ================================================
              arr: arr,

              // 弹窗的信息体
              layer_obj: {
                show: false,
                title: 'add',
                name_info: 'name_info',

                // 用户ID
                id: null,


                // 删除的显示
                show_del: false,
              },
            },
            components: {
              cp_layer_ipt: cp_layer_ipt,
              // 删除组件
              cp_layer_del: cp_layer_del,
            },
            // 方法
            methods: {
              // ======================================
              // add
              _layer_add: function() {
                var me = this;
                me.layer_obj.show = true;
                me.layer_obj.title = 'add';
                me.layer_obj.name_info = 'name_info';
              },
              // 编辑
              _layer_upd: function(id) {
                var me = this;

                // 记录ID
                me.layer_obj.id = id;


                me.layer_obj.show = true;
                me.layer_obj.title = 'edit';
                me.arr.forEach(function(ele, index) {
                  if (ele.id == id) {
                    me.layer_obj.name_info = ele.name;
                    return;
                  }

                });
              },

              // 得到数据
              _layer_save: function(name_info) {
                var me = this;

                me.layer_obj.show = false;


                switch (me.layer_obj.title) {
                  case "add":
                    var id = me.arr.length + "_" + Math.random();
                    me.arr.push({
                      id: id,
                      name: name_info,
                    });
                    break;
                  case "edit":
                    me.arr.forEach(function(ele, index) {
                      if (ele.id == me.layer_obj.id) {
                        ele.name = name_info;
                        return;
                      }
                    });
                    break;
                }
              },


              // 得到数据
              _layer_del: function(id) {
                var me = this;

                me.layer_obj.show_del = true;

                // 记录ID
                me.layer_obj.id = id;


              },
              // 得到ID
              _layer_del_sure: function(id) {
                var me = this;
                var ac_index = 0;
                me.arr.forEach(function(ele, index) {
                  if (ele.id == id) {
                    ac_index = index;
                  }
                });
                me.arr.splice(ac_index, 1);

                // 隐藏
                me.layer_obj.show_del = false;
              },

              _layer_close:function (key) {
                
                var me = this;
                // 隐藏
                me.layer_obj.show_del = false;
                me.layer_obj.show = false;
              }
            },


          });





        },
















      };
      for (var k in fn) {
        me[k] = fn[k];
      };
    },
  };
  window.Nav = Nav;
})(jQuery, window);

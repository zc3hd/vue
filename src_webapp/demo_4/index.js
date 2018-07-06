(function($, window) {
  function Nav(opts) {};
  Nav.prototype = {
    init: function() {
      var me = this;

      me._bind();

      me._init();

      console.log(1);
    },
    _bind: function() {
      var me = this;
      var fn = {
        _init: function() {

          me._demo();
        },
        // 第一个雏形
        _demo: function() {
          // 全局组件
          var new_span = Vue.extend({
            template: `#cp_1`,
            data: function() {
              return {
                msg: 'jubu component:new_span_msg--',
              }
            },
            methods: {
              ck: function() {
                var me = this;
                console.log(me.msg);
              },
            },
          });

          // 全局注册方式
          // Vue.component('new_span',new_span);

          // 第二种方式
          // Vue.component('new_span', {
          //   template: `<span>new 组件</span>`
          // });


          var cp_span_1 = Vue.extend({
            template: `<span class='info'>{{msg}}</span>`,
            data: function() {
              return {
                msg: 'span_1',
              }
            },
          });
          var cp_span_2 = Vue.extend({
            template: `<span class='info'>{{msg}}</span>`,
            data: function() {
              return {
                msg: 'span_2',
              }
            },
          });
          var cp_span_3 = Vue.extend({
            template: `<span class='info'>{{msg}}</span>`,
            data: function() {
              return {
                msg: 'span_3',
              }
            },
          });


          // ================================================
          // 用于传数据的子组件
          var cp_send_to_son = Vue.extend({
            template: `
              <span class='info'>{{msg}}</span>
              </br>
              <span class='blue'>{{c_data}}</span>
              </br>
              <span class='blue'>{{c_obj.a}}</span>
            `,
            data: function() {
              return {
                msg: `
                i am a son component of father,
                i recive a data from my father:
                `,
                // c_data:'aa',
              }
            },
            created: function() {
              // alert('vm实力创建完成--初始化data methods')
              console.log("son_1");
            },
            // 编译之前 寻找模板 指令 
            beforeCompile: function() {
              /* body... */
              // alert('编译之前 寻找模板 指令')
              console.log("son_2");
            },
            // 编译之后 替换为我们的数据
            compiled: function() {
              /* body... */
              // alert('编译之后 替换为我们的数据')
              console.log("son_3");
            },
            ready: function() {

              console.log("son_4");

            },
            // props:['c_data'],
            props: {
              c_data: String,
              c_obj: Object,
            },
          });

          // ================================================
          // 用于传数据的子组件
          var cp_send_to_f = Vue.extend({
            template: `
              <span class='info' @click='send_to_f'>{{msg}}</span>
            `,
            data: function() {
              return {
                msg: `i am a son data`,
              }
            },
            methods: {
              send_to_f: function() {
                var me = this;
                me.$emit('ev_send_to_f', me.msg);
              },
            },
            ready: function() {
              var me = this;
              setTimeout(function() {
                me.$emit('ev_send_to_f', "xxxxxxxxxxxxxxx-ready");
              }, 1000);

            },
          });



          // 实例化一个对当前DOM数组件
          var vm = new Vue({
            // 可以为class dom 
            el: '#app',
            // 数据
            data: {
              transition_key: false,
              animate_key: false,

              // ===================
              box_2_level: 0,
              box_2_class: '',

              // ===================
              table_name: 'span_1',

              // ===================
              // 用于父传子的数据
              c_data: 'i am a data of father',
              c_obj: {
                a: 1
              },


              // =====================
              // 用于接收的数据
              f_son_msg: '--'
            },

            // 方法
            methods: {
              transition: function() {
                var me = this;
                me.transition_key = !me.transition_key;
              },
              animate: function(key) {
                var me = this;
                // ==========================================
                // 老师的
                // me.animate_key = !me.animate_key;

                // if (me.animate_key) {
                //   me.box_2_class = 'zoomInLeft';
                // }
                // else {
                //   me.box_2_class = 'zoomOutRight';
                // }

                // ==========================================
                // 我自己的--单个变化
                // me.box_2_class = 'rubberBand';

                // setTimeout(function () {
                //   me.box_2_class = '';
                // },1100);


                // ==========================================
                // 我自己的--分级变化
                me.box_2_level++;
                if (me.box_2_level == 6) {
                  me.box_2_level = 1;
                }

                switch (me.box_2_level) {
                  case 1:
                    me.box_2_class = 'demo_animated_box_1';
                    console.log(1, key);
                    break;
                  case 2:
                    me.box_2_class = 'demo_animated_box_2';
                    break;
                  case 3:
                    me.box_2_class = 'demo_animated_box_3';
                    break;
                  case 4:
                    me.box_2_class = 'demo_animated_box_2';
                    break;
                  case 5:
                    me.box_2_class = 'demo_animated_box_4';
                    break;
                }


                // setTimeout(function () {
                //   me.animate();
                // },900)


                // setTimeout(function() {
                //   me.box_2_class = '';
                // }, 1100);
              },

              // 从子组件接收数据
              get_from_s: function(msg) {
                var me = this;
                me.f_son_msg = msg;
              },
            },

            // 局部组件
            components: {
              new_span: new_span,

              // ======================
              span_1: cp_span_1,
              span_2: cp_span_2,
              span_3: cp_span_3,

              // ======================
              cp_send_to_son: cp_send_to_son,

              // ======================
              cp_send_to_f: cp_send_to_f,
            },

            // transitions: {
            //   bounce: {
            //     enterClass: 'zoomInLeft',
            //     leaveClass: 'zoomOutRight'
            //   }
            // },

            // 生命周期
            // vm实力创建完成--初始化data methods
            created: function() {
              // alert('vm实力创建完成--初始化data methods')
              console.log(1);

            },
            // 编译之前 寻找模板 指令 
            beforeCompile: function() {
              /* body... */
              // alert('编译之前 寻找模板 指令')
              console.log(2);
            },
            // 编译之后 替换为我们的数据
            compiled: function() {
              /* body... */
              // alert('编译之后 替换为我们的数据')
              console.log(3);
            },
            // 真实的把数据插入DOM节点中
            ready: function() {
              // alert('真实的把数据插入DOM节点中')
              console.log(4);

            },

            // 销毁之前
            beforeDestroy: function() {
              /* body... */
            },
            // 销毁之后
            destroyed: function() {
              /* body... */
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

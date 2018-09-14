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

          me._demo();
        },
        // 第一个雏形
        _demo: function() {
          Vue.directive("red", function() {
            // console.log(this.el);
            this.el.style.backgroundColor = 'red';

            $(this.el).on('click',function (e) {
              // console.log(e);
            });
          });
          var vm = new Vue({
            // 可以为class dom 
            el: '#app',
            // 数据
            data: {
              infos: [
                "你好，你在哪里？",
                "他是谁，他又在上面地方",
                "你和他的关系怎么样",
                "现在的时间是什么时候",
                "我也是这个时间",
              ],
            },
            obj: {
              name: "c",
            },
            // 方法
            methods: {
              add: function() {
                // vm.a++;
                // vm.b = vm.a + 1;
              },
            },

            // 生命周期
            // vm实力创建完成--初始化data methods
            // created: function() {
            //   alert('vm实力创建完成--初始化data methods')
            //   // console.log(1);
            // },
            // // 编译之前 寻找模板 指令 
            // beforeCompile: function() {
            //   /* body... */
            //   alert('编译之前 寻找模板 指令')
            //   // console.log(2);
            // },
            // // 编译之后 替换为我们的数据
            // compiled: function() {
            //   /* body... */
            //   alert('编译之后 替换为我们的数据')
            //   // console.log(3);
            // },
            // // 真实的把数据插入DOM节点中
            // ready: function() {
            //   alert('真实的把数据插入DOM节点中')
            //   // console.log(4);
            // },

            // 销毁之前
            beforeDestroy: function() {
              /* body... */
            },
            // 销毁之后
            destroyed: function() {
              /* body... */
            },
          });

          // 执行销毁
          // vm.$destroy();

          





        },
















      };
      for (var k in fn) {
        me[k] = fn[k];
      };
    },
  };
  window.Nav = Nav;
})(jQuery, window);
